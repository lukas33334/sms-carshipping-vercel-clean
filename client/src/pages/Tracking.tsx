import { useState, useRef, useEffect } from 'react';
import { MapPin, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapView } from '@/components/Map';
import { trpc } from '@/lib/trpc';

interface TrackingData {
  trackingId: string;
  status: 'pending' | 'in_transit' | 'delivered';
  currentLocation: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  estimatedDelivery: string;
  lastUpdate: string;
}

export default function Tracking() {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const trackingQuery = trpc.tracking.getStatus.useQuery(
    { trackingId },
    { enabled: false }
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setIsLoading(true);
    try {
      const result = await trackingQuery.refetch();
      if (result.data) {
        setTrackingData(result.data);
      }
    } catch (error) {
      console.error('Tracking error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!trackingData || !mapRef.current) return;

    // Clear previous markers
    markersRef.current.forEach(marker => {
      marker.map = null;
    });
    markersRef.current = [];

    const map = mapRef.current;

    // Add current location marker (green)
    const currentMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: trackingData.currentLocation,
      title: 'Aktuelle Position',
      content: createMarkerContent('🚚', '#22c55e'),
    });
    markersRef.current.push(currentMarker);

    // Add destination marker (blue)
    const destMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: trackingData.destination,
      title: 'Zielort',
      content: createMarkerContent('📍', '#3b82f6'),
    });
    markersRef.current.push(destMarker);

    // Fit bounds to show both markers
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(trackingData.currentLocation);
    bounds.extend(trackingData.destination);
    map.fitBounds(bounds, { top: 100, bottom: 100, left: 100, right: 100 });

    // Draw route line
    const polyline = new google.maps.Polyline({
      path: [trackingData.currentLocation, trackingData.destination],
      geodesic: true,
      strokeColor: '#3b82f6',
      strokeOpacity: 0.7,
      strokeWeight: 3,
      map,
    });
  }, [trackingData]);

  const createMarkerContent = (emoji: string, color: string) => {
    const div = document.createElement('div');
    div.style.width = '40px';
    div.style.height = '40px';
    div.style.backgroundColor = color;
    div.style.borderRadius = '50%';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.fontSize = '20px';
    div.style.border = '3px solid white';
    div.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    div.textContent = emoji;
    return div;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'in_transit':
        return <Truck className="w-6 h-6 text-blue-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Zugestellt';
      case 'in_transit':
        return 'In Transit';
      default:
        return 'Ausstehend';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Fahrzeugverfolgung
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Verfolgen Sie Ihren Fahrzeugversand in Echtzeit
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Tracking-ID eingeben (z.B. SMS-2026-001)"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
            >
              {isLoading ? 'Wird geladen...' : 'Suchen'}
            </Button>
          </form>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="h-96 bg-gray-200 dark:bg-gray-700">
                  <MapView
                    initialCenter={trackingData.currentLocation}
                    initialZoom={8}
                    onMapReady={(map) => {
                      mapRef.current = map;
                    }}
                  />
                </div>
              </Card>
            </div>

            {/* Status Panel */}
            <div className="space-y-4">
              {/* Status Card */}
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  {getStatusIcon(trackingData.status)}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {getStatusText(trackingData.status)}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Details Card */}
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tracking-ID</p>
                    <p className="font-mono text-gray-900 dark:text-white">
                      {trackingData.trackingId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Geschätzter Liefertermin</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(trackingData.estimatedDelivery).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Letzte Aktualisierung</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {new Date(trackingData.lastUpdate).toLocaleString('de-DE')}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Contact Card */}
              <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Fragen?</h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                  Kontaktieren Sie unseren Support über WhatsApp
                </p>
                <a
                  href="https://wa.me/491781838448"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                >
                  WhatsApp Support
                </a>
              </Card>
            </div>
          </div>
        )}

        {/* No Results State */}
        {!trackingData && trackingId && !isLoading && (
          <Card className="p-12 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Keine Tracking-Informationen für diese ID gefunden.
            </p>
          </Card>
        )}

        {/* Empty State */}
        {!trackingData && !trackingId && (
          <Card className="p-12 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Geben Sie Ihre Tracking-ID ein, um den Status Ihres Fahrzeugs zu verfolgen.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
