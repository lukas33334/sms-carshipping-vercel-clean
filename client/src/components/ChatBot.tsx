import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Loader } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  language: 'de' | 'en' | 'ar';
}

const GREETINGS = {
  de: 'Hallo! 👋 Ich bin der SMS Car Shipping Support-Bot. Ich beantworte alle deine Fragen zu Fahrzeugversand, Logistik, Kosten, Versicherung und mehr. Was möchtest du wissen?',
  en: 'Hello! 👋 I\'m the SMS Car Shipping Support Bot. I answer all your questions about vehicle shipping, logistics, costs, insurance, and more. What would you like to know?',
  ar: 'مرحبا! 👋 أنا روبوت دعم SMS Car Shipping. أجيب على جميع أسئلتك حول شحن المركبات والخدمات اللوجستية والتكاليف والتأمين والمزيد. ماذا تريد أن تعرف؟',
};

export default function ChatBot({ language }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: GREETINGS[language],
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.chat.ask.useMutation({
    onSuccess: (data) => {
      const responseText = typeof data.response === 'string' ? data.response : 'Keine Antwort erhalten';
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    },
    onError: (error) => {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'de' 
          ? 'Es gab einen Fehler. Bitte versuche es später erneut oder kontaktiere uns über WhatsApp: +49 178 1838448'
          : language === 'en'
          ? 'There was an error. Please try again later or contact us via WhatsApp: +49 178 1838448'
          : 'حدث خطأ. يرجى المحاولة لاحقاً أو التواصل معنا عبر WhatsApp: +49 178 1838448',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput('');

    const systemPrompts = {
      de: `Du bist ein hilfreicher Support-Bot für SMS Car Shipping. Du beantwortest ALLE Fragen zu Fahrzeugversand, Logistik, Transportmethoden, Versicherung, Routen, Ablauf und mehr - ABER KEINE PREISE!

Wichtig:
1. GEBE NIEMALS PREISE AN - sage stattdessen: "Für aktuelle Preise nutze bitte unseren Preisrechner auf der Website oder kontaktiere uns über WhatsApp: +49 178 1838448"
2. Wenn eine Frage NICHTS mit Logistik/Fahrzeugversand zu tun hat, antworte: "Das kann ich leider nicht beantworten, da ich nur für SMS Car Shipping und Logistik-Fragen zuständig bin. Aber ich beantworte gerne alle deine Fragen zu Fahrzeugversand und Logistik!"
3. Antworte freundlich, professionell und hilfreich auf Deutsch.
4. Beantworte Fragen zu: Transportmethoden (Container, RoRo, Luftfracht, Straße), Versicherung, Routen, Ablauf, Dokumentation, Fahrzeugzustände, etc.`,
      en: `You are a helpful support bot for SMS Car Shipping. You answer ALL questions about vehicle shipping, logistics, transport methods, insurance, routes, process and more - BUT NO PRICES!

Important:
1. NEVER GIVE PRICES - instead say: "For current prices please use our price calculator on the website or contact us via WhatsApp: +49 178 1838448"
2. If a question has NOTHING to do with logistics/vehicle shipping, respond: "I'm sorry, I can't answer that because I'm only responsible for SMS Car Shipping and logistics questions. But I'm happy to answer all your questions about vehicle shipping and logistics!"
3. Respond in a friendly, professional and helpful manner in English.
4. Answer questions about: Transport methods (Container, RoRo, Air Freight, Road), Insurance, Routes, Process, Documentation, Vehicle conditions, etc.`,
      ar: `أنت روبوت دعم مفيد لـ SMS Car Shipping. تجيب على جميع الأسئلة حول شحن المركبات والخدمات اللوجستية وطرق النقل والتأمين والمسارات والعملية والمزيد - لكن بدون أسعار!

مهم:
1. لا تعطِ أسعاراً أبداً - قل بدلاً من ذلك: "للحصول على الأسعار الحالية، يرجى استخدام حاسبة الأسعار على الموقع أو التواصل معنا عبر WhatsApp: +49 178 1838448"
2. إذا كان السؤال لا علاقة له بالخدمات اللوجستية/شحن المركبات، رد: "آسف، لا يمكنني الإجابة على ذلك لأنني مسؤول فقط عن أسئلة SMS Car Shipping والخدمات اللوجستية. لكنني سعيد بالإجابة على جميع أسئلتك حول شحن المركبات والخدمات اللوجستية!"
3. رد بطريقة ودية واحترافية ومفيدة باللغة العربية.
4. أجب على الأسئلة حول: طرق النقل (الحاويات، RoRo، الشحن الجوي، الطرق)، التأمين، المسارات، العملية، التوثيق، حالة المركبات، إلخ.`,
    };

    chatMutation.mutate({
      message: userInput,
      language: language,
      systemPrompt: systemPrompts[language],
    });
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-8 left-8 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl transition-all transform hover:scale-110"
          title="Chat Support"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>
      


      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 left-8 z-40 w-96 max-w-[calc(100vw-32px)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">SMS Car Shipping</h3>
              <p className="text-sm text-blue-100">Support-Bot • Online</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-700 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">
                    {language === 'de' ? 'Wird bearbeitet...' : language === 'en' ? 'Processing...' : 'جاري المعالجة...'}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 dark:border-gray-700 p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'de' ? 'Deine Frage...' : language === 'en' ? 'Your question...' : 'سؤالك...'}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              disabled={chatMutation.isPending}
              autoFocus
            />
            <button
              type="submit"
              disabled={chatMutation.isPending || !input.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
