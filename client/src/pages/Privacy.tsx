import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Privacy() {
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
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Datenschutz</h1>
          <div className="w-12"></div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Datenschutzerklärung</h1>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Verantwortlicher</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              SMS Car Shipping GmbH<br />
              Muehldorfer Str. 26<br />
              85661 Forstinning<br />
              Deutschland<br />
              Telefon: +49 178 1838448<br />
              E-Mail: info@sms-carshipping.com<br />
              Geschaeftsfuehrender Gesellschafter: Mike Songhorzadeh<br />
              <br />
              <strong>Handelsregister:</strong><br />
              Registergericht: Amtsgericht München<br />
              Registernummer: HRB 298707<br />
              Branche: Spedition, Fahrzeugversand und internationale Transporte
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Wir erheben und verarbeiten personenbezogene Daten nur, wenn Sie diese uns freiwillig über unser Kontaktformular mitteilen. Dies umfasst:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Name</li>
              <li>Fahrzeuginformationen</li>
              <li>Abhol- und Lieferadresse</li>
              <li>Transportart und weitere Anfrageinformationen</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Zweck der Datenverarbeitung</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme verwendet. Wir geben Ihre Daten nicht an Dritte weiter, außer wenn dies für die Erfüllung Ihrer Anfrage notwendig ist.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Speicherdauer</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ihre Daten werden nur so lange gespeichert, wie dies für die Bearbeitung Ihrer Anfrage erforderlich ist. Nach Abschluss werden die Daten gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Ihre Rechte</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Sie haben das Recht, Auskunft über Ihre gespeicherten Daten zu erhalten, diese zu berichtigen oder zu löschen. Kontaktieren Sie uns unter den oben angegebenen Daten.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Cookies und Tracking</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Unsere Website verwendet keine Cookies oder Tracking-Technologien zur Verfolgung Ihres Verhaltens.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. Externe Links</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Unsere Website enthält Links zu externen Websites. Wir sind nicht verantwortlich für die Datenschutzpraktiken dieser Websites. Bitte lesen Sie deren Datenschutzerklärungen.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">8. Kontakt</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Bei Fragen zu dieser Datenschutzerklärung kontaktieren Sie uns bitte unter:<br />
              Telefon: +49 178 1838448<br />
              WhatsApp: <a href="https://wa.me/491781838448" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">+49 178 1838448</a>
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
