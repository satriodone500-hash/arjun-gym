import { useState } from 'react';
import { SectionHeader, Card, Button, Badge } from '../components/ui';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { membershipPlans } from '../data/membership';
import { formatCurrency } from '../utils/format';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  { q: 'Apakah saya bisa membatalkan membership kapan saja?', a: 'Ya, Anda dapat membatalkan membership kapan saja dengan pemberitahuan 30 hari sebelumnya.' },
  { q: 'Apakah ada biaya pendaftaran awal?', a: 'Biaya pendaftaran awal sebesar Rp 250.000 berlaku untuk semua paket membership baru, namun seringkali kami memiliki promo bebas biaya pendaftaran.' },
  { q: 'Apakah saya mendapatkan personal trainer gratis?', a: 'Paket Elite mendapatkan 4 sesi gratis per bulan. Untuk paket lain, Anda mendapatkan 1 sesi orientasi gratis saat pertama kali mendaftar.' },
  { q: 'Bagaimana cara membekukan (freeze) membership saya?', a: 'Anda dapat membekukan membership Anda hingga 2 bulan dalam setahun karena alasan medis atau perjalanan dengan biaya admin kecil.' },
  { q: 'Apakah kelas kelompok berbayar lagi?', a: 'Tidak, semua kelas kelompok reguler sudah termasuk dalam paket Pro dan Elite kami.' }
];

export default function Membership() {
  const { ref: plansRef, isVisible: plansVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-32 pb-16 min-h-screen bg-dark text-text-primary">
      <div className="container-custom">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Pilih Membership</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">Berinvestasilah pada kesehatan Anda. Pilih paket yang sesuai dengan tujuan dan gaya hidup Anda.</p>
        </div>

        <section ref={plansRef} className={`mb-24 transition-all duration-700 transform ${plansVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`bg-dark-card border ${plan.isPopular ? 'border-primary md:scale-105 shadow-[0_0_30px_rgba(255,87,34,0.15)] relative z-10' : 'border-dark-border'} flex flex-col h-full`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge variant="primary" className="px-4 py-1 text-sm font-bold shadow-lg">POPULER</Badge>
                  </div>
                )}
                <div className="text-center mb-8 pt-4">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end justify-center gap-1 mb-2">
                    <span className="text-4xl font-extrabold text-primary">{formatCurrency(plan.price)}</span>
                    <span className="text-text-muted mb-1">/{plan.period}</span>
                  </div>
                  <p className="text-text-secondary text-sm">{plan.description}</p>
                </div>
                
                <div className="flex-grow mb-8 space-y-4">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <CheckCircle className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant={plan.isPopular ? 'primary' : 'outline'} 
                  className="w-full mt-auto"
                >
                  Daftar Sekarang
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section ref={faqRef} className={`max-w-3xl mx-auto transition-all duration-700 delay-100 transform ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionHeader title="FAQ" subtitle="Pertanyaan yang Sering Diajukan" />
          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div key={idx} className="border border-dark-border rounded-lg overflow-hidden bg-dark-card">
                <button 
                  className="w-full flex items-center justify-between p-4 text-left font-semibold focus:outline-none hover:bg-dark-hover transition-colors"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-text-muted" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-text-secondary border-t border-dark-border">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
