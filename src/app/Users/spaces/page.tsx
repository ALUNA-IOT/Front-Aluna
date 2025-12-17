'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, Clock, Wifi, Tv, Coffee } from 'lucide-react';

interface Space {
  id: string;
  name: string;
  capacity: number;
  location: string;
  amenities: string[];
  available: boolean;
  image?: string;
  price?: number;
}

const spaces: Space[] = [
  {
    id: '1',
    name: 'Sala de Reuniones A',
    capacity: 8,
    location: 'Piso 2',
    amenities: ['WiFi', 'Proyector', 'Café'],
    available: true,
    price: 50,
  },
  {
    id: '2',
    name: 'Sala de Reuniones B',
    capacity: 12,
    location: 'Piso 2',
    amenities: ['WiFi', 'Pizarra', 'Proyector', 'Café'],
    available: true,
    price: 80,
  },
  {
    id: '3',
    name: 'Sala de Conferencias',
    capacity: 30,
    location: 'Piso 3',
    amenities: ['WiFi', 'Sistema de Audio', 'Proyector 4K', 'Café', 'Refrescos'],
    available: false,
    price: 150,
  },
  {
    id: '4',
    name: 'Espacio de Trabajo Colaborativo',
    capacity: 20,
    location: 'Piso 1',
    amenities: ['WiFi', 'Café', 'Estaciones de Trabajo'],
    available: true,
    price: 40,
  },
  {
    id: '5',
    name: 'Sala de Entrenamiento',
    capacity: 25,
    location: 'Piso 3',
    amenities: ['WiFi', 'Proyector', 'Pizarras', 'Café', 'Conexión HDMI'],
    available: true,
    price: 120,
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi size={18} />,
  Proyector: <Tv size={18} />,
  Café: <Coffee size={18} />,
  'Proyector 4K': <Tv size={18} />,
  'Sistema de Audio': <Wifi size={18} />,
};

export default function SpacesPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">Nuestros </span>
            <span className="gradient-text">Espacios</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Explora los espacios disponibles para tu próxima reunión o evento
          </p>
        </div>

        {/* Grid de Espacios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space, index) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl backdrop-blur-md border transition-all duration-300 overflow-hidden ${
                space.available
                  ? 'bg-linear-to-br from-primary/10 to-primary/5 border-primary/30 hover:border-primary/50'
                  : 'bg-linear-to-br from-slate-800/50 to-slate-800/20 border-slate-700/30 opacity-60'
              }`}
            >
              {/* Header */}
              <div className="p-6 border-b border-primary/20">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground">{space.name}</h3>
                  {space.available ? (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                      Disponible
                    </span>
                  ) : (
                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold">
                      No Disponible
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin size={16} />
                  <span className="text-sm">{space.location}</span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 space-y-4">
                {/* Capacidad */}
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Users size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Capacidad</p>
                    <p className="text-foreground font-semibold">{space.capacity} personas</p>
                  </div>
                </div>

                {/* Amenidades */}
                <div>
                  <p className="text-sm text-slate-500 mb-3">Amenidades</p>
                  <div className="flex flex-wrap gap-2">
                    {space.amenities.slice(0, 3).map((amenity) => (
                      <div
                        key={amenity}
                        className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1"
                      >
                        {amenityIcons[amenity] || <Coffee size={14} />}
                        {amenity}
                      </div>
                    ))}
                    {space.amenities.length > 3 && (
                      <div className="bg-slate-800 text-slate-400 px-3 py-1 rounded-lg text-xs font-semibold">
                        +{space.amenities.length - 3} más
                      </div>
                    )}
                  </div>
                </div>

                {/* Precio */}
                {space.price && (
                  <div className="pt-4 border-t border-primary/20">
                    <p className="text-slate-400">
                      Desde <span className="text-primary font-bold text-lg">${space.price}</span>/hora
                    </p>
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="p-6 border-t border-primary/20">
                <button
                  disabled={!space.available}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                    space.available
                      ? 'bg-primary text-black hover:bg-primary/90'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {space.available ? 'Reservar Ahora' : 'No Disponible'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
