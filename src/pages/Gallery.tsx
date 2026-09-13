import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { galleryImages } from '../data/gallery';
import { X, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollAnimation();
  const [filter, setFilter] = useState<string>('Semua');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ['Semua', 'Gym Area', 'Workout', 'Training', 'Class'];
  
  const filteredImages = filter === 'Semua' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="pt-32 pb-16 min-h-screen bg-dark text-text-primary relative">
      <div className="container-custom">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Galeri Kami</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">Intip suasana latihan dan energi positif di ARJUN GYM.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat 
                  ? 'bg-primary text-white' 
                  : 'bg-dark-card text-text-secondary hover:text-white border border-dark-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <section ref={galleryRef} className={`transition-all duration-700 transform ${galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img) => {
              const imageSrc = img.src || img.url || '';
              const imageAlt = img.alt || img.title || 'Galeri ARJUN GYM';

              return (
                <div 
                  key={img.id} 
                  className="break-inside-avoid rounded-xl overflow-hidden relative group cursor-pointer border border-dark-border"
                  onClick={() => setSelectedImage(imageSrc)}
                >
                  <img 
                    src={imageSrc} 
                    alt={imageAlt} 
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    <ZoomIn className="w-10 h-10 text-primary mb-2" />
                    <span className="text-white font-medium bg-dark/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">{img.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedImage(null)}>
          <button 
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors bg-dark/50 p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={selectedImage} 
            alt="Gallery Preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
