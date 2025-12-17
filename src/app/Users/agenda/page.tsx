'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface Agenda {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  type: string;
}

const agendaItems: Agenda[] = [
  {
    id: '1',
    title: 'Consulta de Servicios',
    date: '2024-12-16',
    time: '10:00 - 11:00',
    location: 'Sala A',
    attendees: 3,
    type: 'Reunión',
  },
  {
    id: '2',
    title: 'Sesión de Planificación',
    date: '2024-12-18',
    time: '14:00 - 15:30',
    location: 'Sala B',
    attendees: 5,
    type: 'Planificación',
  },
  {
    id: '3',
    title: 'Presentación de Proyectos',
    date: '2024-12-20',
    time: '09:00 - 10:00',
    location: 'Auditorio',
    attendees: 12,
    type: 'Presentación',
  },
  {
    id: '4',
    title: 'Sesión de Seguimiento',
    date: '2024-12-22',
    time: '15:00 - 16:00',
    location: 'Sala C',
    attendees: 2,
    type: 'Seguimiento',
  },
];

export default function AgendaPage() {
  return (
    <div className="py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">Tu </span>
            <span className="gradient-text">Agenda</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Visualiza todas tus citas y eventos programados
          </p>
        </div>

        {/* Lista de Agenda */}
        <div className="space-y-4">
          {agendaItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-linear-to-br from-primary/10 to-primary/5 backdrop-blur-md border border-primary/30 rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Contenido principal */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Fecha y Hora */}
                    <div className="flex items-center gap-3 text-slate-400">
                      <div className="bg-primary/20 p-2 rounded-lg">
                        <Calendar size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Fecha y Hora</p>
                        <p className="text-foreground font-semibold">{item.date}</p>
                        <p className="text-primary text-sm">{item.time}</p>
                      </div>
                    </div>

                    {/* Ubicación */}
                    <div className="flex items-center gap-3 text-slate-400">
                      <div className="bg-primary/20 p-2 rounded-lg">
                        <MapPin size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Ubicación</p>
                        <p className="text-foreground font-semibold">{item.location}</p>
                      </div>
                    </div>

                    {/* Asistentes */}
                    <div className="flex items-center gap-3 text-slate-400">
                      <div className="bg-primary/20 p-2 rounded-lg">
                        <Users size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Participantes</p>
                        <p className="text-foreground font-semibold">{item.attendees} personas</p>
                      </div>
                    </div>

                    {/* Tipo */}
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Tipo</p>
                      <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <button className="px-6 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors font-semibold">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Si no hay eventos */}
        {agendaItems.length === 0 && (
          <div className="text-center py-12">
            <Calendar size={48} className="text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No tienes eventos programados</p>
          </div>
        )}
      </div>
    </div>
  );
}
