'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function ReservationsPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 16)); // Diciembre 16, 2024
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2024, 11, 16));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);

  // Generar slots de horarios
  const timeSlots: TimeSlot[] = [
    { time: '08:00', available: true },
    { time: '09:00', available: true },
    { time: '10:00', available: false },
    { time: '11:00', available: true },
    { time: '12:00', available: false },
    { time: '13:00', available: false },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: false },
    { time: '17:00', available: true },
    { time: '18:00', available: true },
    { time: '19:00', available: true },
  ];

  // Días de la semana
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Obtener días del mes
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Obtener el primer día de la semana del mes
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

  // Crear array de días para renderizar
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    setSelectedTime(null);
  };

  const monthName = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">Consulta tu </span>
            <span className="gradient-text">agenda</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Selecciona una fecha para ver los horarios disponibles y realizar tu reserva.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendario */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-linear-to-br from-primary/10 to-primary/5 backdrop-blur-md border border-primary/30 rounded-2xl p-6"
            >
              {/* Header del calendario */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-primary"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-semibold text-foreground capitalize">
                  {monthName}
                </h2>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-primary"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Días de la semana */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-semibold text-slate-400 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Días del calendario */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const isSelected =
                    selectedDate?.getDate() === day &&
                    selectedDate?.getMonth() === currentDate.getMonth() &&
                    selectedDate?.getFullYear() === currentDate.getFullYear();

                  const isHovered = hoveredDay === day;

                  return (
                    <motion.button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        aspect-square rounded-lg font-semibold transition-all relative
                        ${
                          isSelected
                            ? 'bg-orange-500/40 text-orange-300 shadow-lg shadow-orange-500/50 border-2 border-orange-500/70'
                            : isHovered
                              ? 'bg-orange-500/40 text-orange-300 shadow-lg shadow-orange-500/50 border-2 border-orange-500/70'
                              : 'text-foreground hover:bg-primary/20 border border-primary/20 hover:border-primary/50'
                        }
                      `}
                    >
                      <span className="absolute inset-0 flex items-center justify-center">
                        {day}
                      </span>
                      {/* Indicador de disponibilidad */}
                      {day >= 5 && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Horarios disponibles */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-linear-to-br from-primary/10 to-primary/5 backdrop-blur-md border border-primary/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-primary" size={24} />
                <h2 className="text-2xl font-bold text-foreground">Horarios</h2>
              </div>

              {selectedDate ? (
                <div>
                  <p className="text-slate-400 mb-6 text-sm">
                    {selectedDate.toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <AnimatePresence>
                      {timeSlots.map((slot, index) => (
                        <motion.button
                          key={slot.time}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() =>
                            slot.available && setSelectedTime(slot.time)
                          }
                          onMouseEnter={() => slot.available && setHoveredTime(slot.time)}
                          onMouseLeave={() => setHoveredTime(null)}
                          disabled={!slot.available}
                          className={`
                            relative py-3 px-4 rounded-lg font-semibold transition-all
                            ${
                              !slot.available
                                ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50'
                                : selectedTime === slot.time
                                  ? 'bg-orange-500/40 text-orange-300 shadow-lg shadow-orange-500/50 border border-orange-500/70'
                                  : hoveredTime === slot.time
                                    ? 'bg-orange-500/40 text-orange-300 shadow-lg shadow-orange-500/50 border border-orange-500/70'
                                    : 'bg-slate-800/30 text-foreground border border-primary/30 hover:border-primary/60 hover:bg-primary/20'
                            }
                          `}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <span>{slot.time}</span>
                            {!slot.available && (
                              <span className="text-xs text-slate-500 absolute top-1 right-1">
                                (ocupado)
                              </span>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Resumen de la reserva */}
                  {selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 p-4 bg-primary/10 border border-primary/50 rounded-lg"
                    >
                      <h3 className="text-foreground font-semibold mb-2">Resumen:</h3>
                      <p className="text-slate-400 text-sm">
                        Fecha: <span className="text-primary font-semibold">
                          {selectedDate.toLocaleDateString('es-ES')}
                        </span>
                      </p>
                      <p className="text-slate-400 text-sm">
                        Hora: <span className="text-primary font-semibold">{selectedTime}</span>
                      </p>
                      <button className="mt-4 w-full bg-primary text-black py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                        Confirmar Reserva
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-slate-400 text-center">
                    Selecciona una fecha en el calendario para ver los horarios disponibles
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
