import { SectionHeader, Card, StatsCard } from '../components/ui';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Target, Flag, Users, Dumbbell, Sparkles, Heart, Clock, Award } from 'lucide-react';

export default function About() {
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation();
  const { ref: visionRef, isVisible: visionVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  const values = [
    { icon: <Users className="w-8 h-8 text-primary" />, title: 'Pelatih Profesional', desc: 'Tim pelatih bersertifikat dengan pengalaman bertahun-tahun.' },
    { icon: <Dumbbell className="w-8 h-8 text-primary" />, title: 'Peralatan Premium', desc: 'Mesin dan alat fitness kelas dunia berstandar internasional.' },
    { icon: <Sparkles className="w-8 h-8 text-primary" />, title: 'Lingkungan Bersih', desc: 'Standar kebersihan tertinggi di seluruh area gym.' },
    { icon: <Heart className="w-8 h-8 text-primary" />, title: 'Komunitas Suportif', desc: 'Bergabunglah dengan keluarga yang saling mendukung.' },
    { icon: <Target className="w-8 h-8 text-primary" />, title: 'Program Berbasis Sains', desc: 'Latihan yang dirancang khusus berdasarkan ilmu olahraga.' },
    { icon: <Clock className="w-8 h-8 text-primary" />, title: 'Jam Fleksibel', desc: 'Buka lebih awal dan tutup lebih malam untuk menyesuaikan jadwalmu.' },
  ];

  return (
    <div className="pt-32 pb-16 min-h-screen bg-dark text-text-primary">
      <div className="container-custom">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Tentang ARJUN GYM</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">Lebih dari sekadar tempat latihan, kami adalah komunitas yang berdedikasi untuk mentransformasi hidup melalui kebugaran.</p>
        </div>

        <section ref={storyRef} className={`section-padding transition-all duration-700 transform ${storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" alt="Arjun Gym Story" className="rounded-xl shadow-lg border border-dark-border" />
            </div>
            <div>
              <SectionHeader title="Kisah Kami" subtitle="Awal Mula Perjalanan" align="left" />
              <p className="text-text-secondary mb-4">
                Didirikan pada tahun 2018 oleh Arjun Wijaya, ARJUN GYM bermula dari sebuah visi sederhana: menciptakan pusat kebugaran premium yang tidak hanya menyediakan peralatan terbaik, tetapi juga membangun komunitas yang suportif.
              </p>
              <p className="text-text-secondary mb-4">
                Berawal dari fasilitas kecil, semangat dan dedikasi kami untuk membantu setiap anggota mencapai tujuan mereka telah mendorong pertumbuhan kami menjadi salah satu gym terkemuka di Jakarta.
              </p>
              <p className="text-text-secondary">
                Kini, dengan ribuan anggota aktif, kami terus berinovasi dan meningkatkan kualitas layanan kami, memastikan setiap sesi latihan Anda memberikan hasil yang maksimal.
              </p>
            </div>
          </div>
        </section>

        <section ref={visionRef} className={`section-padding transition-all duration-700 delay-100 transform ${visionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-dark-card border-dark-border">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-dark rounded-lg"><Target className="text-primary w-8 h-8" /></div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Visi</h3>
                  <p className="text-text-secondary">Menjadi pusat kebugaran terdepan di Indonesia yang menginspirasi gaya hidup sehat dan aktif bagi seluruh lapisan masyarakat.</p>
                </div>
              </div>
            </Card>
            <Card className="bg-dark-card border-dark-border">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-dark rounded-lg"><Flag className="text-primary w-8 h-8" /></div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Misi</h3>
                  <p className="text-text-secondary">Menyediakan fasilitas premium, bimbingan ahli, dan lingkungan yang memotivasi untuk membantu setiap individu mencapai potensi kebugaran terbaik mereka.</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section ref={valuesRef} className={`section-padding transition-all duration-700 delay-200 transform ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionHeader title="Keunggulan Kami" subtitle="Mengapa Memilih ARJUN GYM" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <Card key={idx} className="bg-dark-card border-dark-border hover:border-primary transition-colors duration-300">
                <div className="mb-4">{val.icon}</div>
                <h4 className="text-xl font-bold mb-2">{val.title}</h4>
                <p className="text-text-secondary">{val.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section ref={statsRef} className={`section-padding transition-all duration-700 delay-300 transform ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatsCard label="Anggota Aktif" value="2500+" icon={<Users />} />
            <StatsCard label="Peralatan" value="150+" icon={<Dumbbell />} />
            <StatsCard label="Pelatih Ahli" value="15+" icon={<Award />} />
            <StatsCard label="Tahun Pengalaman" value="8+" icon={<Clock />} />
          </div>
        </section>
      </div>
    </div>
  );
}
