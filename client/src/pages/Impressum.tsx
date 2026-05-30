import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Impressum() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
          >
            <ChevronLeft className="w-5 h-5" />
            Zurück
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Impressum</h1>
          <div className="w-12"></div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Impressum</h1>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
              <p className="text-gray-900 dark:text-white font-semibold mb-2">SMS Car Shipping GmbH</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Mühldorfer Str. 26<br />
                85661 Forstinning<br />
                Deutschland
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Kontaktdaten:</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Telefon:</strong> +49 178 1838448
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>E-Mail:</strong> info@sms-carshipping.com
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>WhatsApp:</strong> <a href="https://wa.me/491781838448" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">+49 178 1838448</a>
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-4">Handelsregister:</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Registergericht:</strong> Amtsgericht München
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Registernummer:</strong> HRB 298707
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Branche:</strong> Spedition, Fahrzeugversand und internationale Transporte
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-4">Geschäftsführender Gesellschafter:</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Mike Songhorzadeh
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Haftung für Inhalte</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 des TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Haftung für Links</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Unsere Website enthält Links zu externen Websites. Wir haben keinen Einfluss auf den Inhalt dieser externen Seiten und können daher keine Gewähr für deren Richtigkeit übernehmen. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Urheberrecht</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Urhebers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Datenschutz</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Informationen zu unserer Datenschutzerklärung finden Sie <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">hier</a>.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Streitbeilegung</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">https://ec.europa.eu/consumers/odr/</a>. Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Haftungsausschluss</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Wir übernehmen keine Haftung für Schäden, die durch die Nutzung unserer Website entstehen, insbesondere nicht für Datenverluste, Betriebsunterbrechungen oder entgangene Gewinne, auch wenn wir auf die Möglichkeit solcher Schäden hingewiesen wurden.
            </p>

            <p className="text-gray-600 dark:text-gray-400 mt-8 text-sm">
              Zuletzt aktualisiert: Mai 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
