import { useState, useMemo } from 'react';
import { Calculator, TrendingDown, Truck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';

export default function PriceCalculator() {
  const [from, setFrom] = useState('Munich');
  const [to, setTo] = useState('Dubai');
  const [transportMethod, setTransportMethod] = useState<'container' | 'roro' | 'airfreight' | 'road'>('container');
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv' | 'truck' | 'van' | 'luxury'>('sedan');

  const routesQuery = trpc.pricing.routes.useQuery();
  const methodsQuery = trpc.pricing.methods.useQuery();
  
  const pricingQuery = trpc.pricing.calculate.useQuery(
    { from, to, transportMethod, vehicleType },
    { enabled: true }
  );

  const pricing = pricingQuery.data;

  const uniqueCities = useMemo(() => {
    if (!routesQuery.data) return { from: [], to: [] };
    const fromCities = new Set<string>();
    const toCities = new Set<string>();
    
    routesQuery.data.forEach(route => {
      fromCities.add(route.from);
      toCities.add(route.to);
    });
    
    return {
      from: Array.from(fromCities).sort(),
      to: Array.from(toCities).sort(),
    };
  }, [routesQuery.data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Preisrechner
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Berechnen Sie sofort den Preis für Ihren Fahrzeugversand
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <form className="space-y-6">
                {/* Route Selection */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Von (Abholort)
                    </label>
                    <select
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    >
                      {uniqueCities.from.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Nach (Zielort)
                    </label>
                    <select
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    >
                      {uniqueCities.to.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Transport Method */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Transportart
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {methodsQuery.data?.map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setTransportMethod(method.id as any)}
                        className={`p-3 rounded-lg border-2 transition ${
                          transportMethod === method.id
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-400'
                        }`}
                      >
                        <div className="text-2xl mb-1">{method.icon}</div>
                        <div className="text-xs font-semibold text-gray-900 dark:text-white">
                          {method.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {method.estimatedDays} Tage
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Fahrzeugtyp
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { id: 'sedan', label: 'Sedan', icon: '🚗' },
                      { id: 'suv', label: 'SUV', icon: '🚙' },
                      { id: 'truck', label: 'Truck', icon: '🚚' },
                      { id: 'van', label: 'Van', icon: '🚐' },
                      { id: 'luxury', label: 'Luxury', icon: '🏎️' },
                    ].map(vehicle => (
                      <button
                        key={vehicle.id}
                        type="button"
                        onClick={() => setVehicleType(vehicle.id as any)}
                        className={`p-3 rounded-lg border-2 transition ${
                          vehicleType === vehicle.id
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-400'
                        }`}
                      >
                        <div className="text-2xl mb-1">{vehicle.icon}</div>
                        <div className="text-xs font-semibold text-gray-900 dark:text-white">
                          {vehicle.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="space-y-4">
            {pricing ? (
              <>
                {/* Main Price Card */}
                <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
                  <div className="text-sm opacity-90 mb-2">Gesamtpreis</div>
                  <div className="text-4xl font-bold mb-2">
                    {pricing.totalPrice.toFixed(2)} €
                  </div>
                  <div className="text-sm opacity-75">
                    Lieferzeit: {pricing.estimatedDays} Tage
                  </div>
                </Card>

                {/* Breakdown Card */}
                <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Preisaufschlüsselung</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Transport</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {pricing.breakdown.transport.toFixed(2)} €
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Versicherung</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {pricing.breakdown.insurance.toFixed(2)} €
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Bearbeitung</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {pricing.breakdown.handling.toFixed(2)} €
                      </span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-center">
                      <span className="font-bold text-gray-900 dark:text-white">Gesamt</span>
                      <span className="font-bold text-blue-600 text-lg">
                        {pricing.totalPrice.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Details Card */}
                <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Entfernung</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {pricing.distance} km
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Währung</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {pricing.currency}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* CTA Button */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
                  Angebot anfordern
                </Button>

                {/* Info Card */}
                <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900 dark:text-blue-100">
                      Dies ist eine Schätzung. Der endgültige Preis kann je nach Fahrzeugzustand und speziellen Anforderungen variieren.
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400">Wird berechnet...</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
