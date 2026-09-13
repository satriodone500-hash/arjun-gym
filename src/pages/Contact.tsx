import { useState } from 'react';
import { Card, Button } from '../components/ui';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000); // Reset after 5s
    }, 2000);
  };

  return (
    <div className="pt-32 pb-16 min-h-screen bg-dark text-text-primary">
      <div className="container-custom">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Hubungi Kami</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">Ada pertanyaan tentang membership atau program latihan? Tim kami siap membantu Anda kapan saja.</p>
        </div>

        <section ref={contactRef} className={`transition-all duration-700 transform ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="bg-dark-card border-dark-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-dark rounded-lg text-primary shrink-0"><MapPin /></div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Alamat</h4>
                    <p className="text-text-secondary text-sm">Jl. Jend. Sudirman No. 123, SCBD, Jakarta Selatan, 12190</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-dark-card border-dark-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-dark rounded-lg text-primary shrink-0"><Phone /></div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Telepon / WhatsApp</h4>
                    <p className="text-text-secondary text-sm">+62 812-3456-7890</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-dark-card border-dark-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-dark rounded-lg text-primary shrink-0"><Mail /></div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Email</h4>
                    <p className="text-text-secondary text-sm">info@arjungym.id</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-dark-card border-dark-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-dark rounded-lg text-primary shrink-0"><Clock /></div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Jam Operasional</h4>
                    <p className="text-text-secondary text-sm">Senin - Jumat: 06:00 - 22:00 WIB<br/>Sabtu - Minggu: 07:00 - 20:00 WIB</p>
                  </div>
                </div>
              </Card>
              
              <div className="h-64 rounded-xl overflow-hidden border border-dark-border relative">
                <iframe
                  title="Google Maps Location"
                  className="w-full h-full border-0 grayscale invert opacity-75 contrast-125"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2736283526156!2d106.80482297593264!3d-6.227608293760447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14d30079f01%3A0xa52421e513bd9f28!2sPacific%20Place!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-dark-card border-dark-border p-8">
              <h3 className="text-2xl font-bold mb-6">Kirim Pesan</h3>
              
              {isSuccess ? (
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-green-500 mb-2">Pesan Terkirim!</h4>
                  <p className="text-text-secondary">Terima kasih telah menghubungi kami. Tim kami akan segera membalas pesan Anda melalui WhatsApp atau Email.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Nama Lengkap</label>
                    <input type="text" required className="w-full bg-dark border border-dark-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors" placeholder="Masukkan nama Anda" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                      <input type="email" required className="w-full bg-dark border border-dark-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors" placeholder="email@contoh.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Telepon / WhatsApp</label>
                      <input type="tel" className="w-full bg-dark border border-dark-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors" placeholder="0812..." />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Subjek</label>
                    <select className="w-full bg-dark border border-dark-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors">
                      <option value="membership">Informasi Membership</option>
                      <option value="pt">Personal Training</option>
                      <option value="class">Jadwal Kelas</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Pesan</label>
                    <textarea required rows={4} className="w-full bg-dark border border-dark-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Tulis pesan Anda di sini..."></textarea>
                  </div>

                  <Button type="submit" variant="primary" className="w-full flex justify-center items-center gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><span className="animate-pulse">Mengirim...</span></>
                    ) : (
                      <>Kirim Pesan <Send className="w-4 h-4" /></>
                    )}
                  </Button>
                </form>
              )}
            </Card>

          </div>
        </section>
      </div>
    </div>
  );
}
