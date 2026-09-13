import { useState } from 'react';
import { Card, Badge } from '../components/ui';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { scheduleData } from '../data/schedule';
import { Clock, User, Users } from 'lucide-react';

export default function Schedule() {
  const { ref: scheduleRef, isVisible: scheduleVisible } = useScrollAnimation();
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const [activeDay, setActiveDay] = useState<string>('Senin');

  const filteredSchedule = scheduleData.filter(item => item.day === activeDay);

  return (
    <div className="pt-32 pb-16 min-h-screen bg-dark text-text-primary">
      <div className="container-custom">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Jadwal Kelas</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">Rencanakan latihan Anda. Lihat jadwal kelas harian kami dan pesan tempat Anda.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeDay === day 
                  ? 'bg-primary text-white' 
                  : 'bg-dark-card text-text-secondary hover:text-white border border-dark-border'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <section ref={scheduleRef} className={`transition-all duration-700 transform ${scheduleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredSchedule.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchedule.map((item) => {
                const isFull = item.enrolled >= item.capacity;
                return (
                  <Card key={item.id} className="bg-dark-card border-dark-border hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">{item.className}</h3>
                      <Badge variant={isFull ? 'danger' : 'success'}>
                        {isFull ? 'Penuh' : 'Tersedia'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-text-secondary text-sm">
                        <Clock className="w-4 h-4 mr-3 text-primary" />
                        <span>{item.time} ({item.duration})</span>
                      </div>
                      <div className="flex items-center text-text-secondary text-sm">
                        <User className="w-4 h-4 mr-3 text-primary" />
                        <span>{item.trainer}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-text-muted mb-1">
                        <span className="flex items-center"><Users className="w-3 h-3 mr-1" /> Kapasitas</span>
                        <span>{item.enrolled} / {item.capacity}</span>
                      </div>
                      <div className="w-full bg-dark rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${isFull ? 'bg-red-500' : 'bg-primary'}`}
                          style={{ width: `${Math.min((item.enrolled / item.capacity) * 100, 100)}%` }}
                        ></div>
                      </div>
                      {isFull && (
                        <p className="text-xs text-red-400 mt-2 text-right font-medium">Kelas Penuh</p>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-dark-card rounded-xl border border-dark-border">
              <p className="text-text-muted text-lg">Tidak ada kelas terjadwal pada hari ini.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
