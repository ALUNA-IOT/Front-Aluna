'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Clock, Check, X, Users, Wifi, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Space {
  id: string;
  name: string;
  capacity: number;
  location: string;
  amenities: string[];
  price: number;
}

const spaces: Space[] = [
  {
    id: '1',
    name: 'Sala de Reuniones A',
    capacity: 8,
    location: 'Piso 3',
    amenities: ['WiFi', 'Proyector', 'Café'],
    price: 100,
  },
  {
    id: '2',
    name: 'Sala de Reuniones B',
    capacity: 20,
    location: 'Piso 5',
    amenities: ['WiFi', 'Cafe', 'TV', 'Café'],
    price: 300,
  },
  {
    id: '3',
    name: 'Sala de Conferencias',
    capacity: 30,
    location: 'Piso 4',
    amenities: ['WiFi', 'Sistema de Audio', 'Proyector 4K'],
    price: 150,
  },
  {
    id: '4',
    name: 'Espacio de Trabajo Colaborativo',
    capacity: 20,
    location: 'Piso 1',
    amenities: ['WiFi', 'Café', 'Estaciones de Trabajo'],
    price: 40,
  },
  {
    id: '5',
    name: 'Sala de Entrenamiento',
    capacity: 25,
    location: 'Piso 3',
    amenities: ['WiFi', 'Proyector', 'Tablero', 'Café', 'Conexión HDMI'],
    price: 120,
  },
];

export default function ReservationsPage() {
  const searchParams = useSearchParams();
  const spaceId = searchParams.get('spaceId');
  
  // Encontrar la sala seleccionada
  const selectedSpace = spaces.find(space => space.id === spaceId);
  
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 16)); // Diciembre 16, 2024
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2024, 11, 16));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load available time slots from API
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        setIsLoading(true);
        // Use spaceId to get available dates
        const response = await fetch(`/api/reservations/${spaceId}`);
        
        if (response.ok) {
          const data = await response.json();
          // Transform API data to TimeSlots
          // Assuming API returns something like { availableSlots: [...] }
          if (data.availableSlots && Array.isArray(data.availableSlots)) {
            setTimeSlots(data.availableSlots);
          } else if (Array.isArray(data)) {
            setTimeSlots(data);
          }
        } else {
          // If it fails, use default time slots
          console.error('Error loading available time slots');
          setTimeSlots(getDefaultTimeSlots());
        }
      } catch (error) {
        console.error('Error fetching available slots:', error);
        // Fallback to default time slots
        setTimeSlots(getDefaultTimeSlots());
      } finally {
        setIsLoading(false);
      }
    };

    if (spaceId) {
      fetchAvailableSlots();
    } else {
      // If no spaceId, use default time slots
      setTimeSlots(getDefaultTimeSlots());
      setIsLoading(false);
    }
  }, [spaceId]);

  // Default time slots (fallback)
  const getDefaultTimeSlots = (): TimeSlot[] => [
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
        {/* Title */}
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
          {/* Calendar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-linear-to-br from-primary/10 to-primary/5 backdrop-blur-md border border-primary/30 rounded-2xl p-6"
            >
              {/* Calendar Header */}
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

              {/* Days of the week */}
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

                  {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-slate-400">Loading available time slots...</div>
                    </div>
                  ) : (
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
                  )}

                  {/* Resumen de la reserva */}
                  {selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 p-6 bg-linear-to-br from-primary/10 to-primary/5 border border-primary/50 rounded-xl space-y-4"
                    >
                      <h3 className="text-foreground font-bold text-lg mb-4">Reservation Summary:</h3>
                      
                      {/* Room Details */}
                      {selectedSpace && (
                        <div className="space-y-3 pb-4 border-b border-primary/30">
                          <div>
                            <p className="text-slate-500 text-sm">Room</p>
                            <p className="text-foreground font-semibold">{selectedSpace.name}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-slate-500 text-sm">Location</p>
                              <p className="text-foreground font-semibold">{selectedSpace.location}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 text-sm">Capacity</p>
                              <p className="text-foreground font-semibold">{selectedSpace.capacity} people</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-slate-500 text-sm mb-2">Amenities</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedSpace.amenities.map((amenity) => (
                                <span
                                  key={amenity}
                                  className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-semibold"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Date and Time Details */}
                      <div className="space-y-3 pb-4 border-b border-primary/30">
                        <div>
                          <p className="text-slate-500 text-sm">Date</p>
                          <p className="text-foreground font-semibold">
                            {selectedDate.toLocaleDateString('es-ES', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-sm">Time</p>
                          <p className="text-foreground font-semibold">{selectedTime}</p>
                        </div>
                      </div>
                      
                      {/* Price */}
                      {selectedSpace && (
                        <div className="pb-4 border-b border-primary/30">
                          <p className="text-slate-500 text-sm">Price per hour</p>
                          <p className="text-primary font-bold text-lg">${selectedSpace.price}/hour</p>
                        </div>
                      )}
                      
                      {/* Confirm Button */}
                      <button className="w-full bg-orange-500/40 text-orange-300 hover:bg-orange-500/50 py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-orange-500/30 border border-orange-500/70 mt-6">
                        Confirm Reservation
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-slate-400 text-center">
                    Select a date in the calendar to see available time slots
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
