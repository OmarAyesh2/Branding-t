import React, { useState, useCallback, useEffect } from 'react';
import { GalleryHorizontalEnd, Mail, Phone, MapPin, ExternalLink, ChevronLeft, ChevronRight, X, Globe } from 'lucide-react';

interface LogoOption {
  id: number;
  title: string;
  description: string;
  gallery: string[];
}

interface Translations {
  cantonal_logo: string;
  explore_text: string;
  contact_info: string;
  email: string;
  phone: string;
  address: string;
  image_of: string;
  options: {
    title: string;
    description: string;
  }[];
}

const translations: Record<'en' | 'ar', Translations> = {
  en: {
    cantonal_logo: "Bright Buds",
    explore_text: "Explore different variations of your logo design. Each option showcases unique aspects of your visual language.",
    contact_info: "Contact Information",
    email: "Email",
    phone: "Phone",
    address: "Address",
    image_of: "Image",
    options: [
      {
        title: "Option One",
      },
      {
        title: "Option Two",
      },
      {
        title: "Option Three",
      },
      {
        title: "Option Four",
      }
    ]
  },
  ar: {
    cantonal_logo: "Bright Buds",
    explore_text: "استكشف الخيارات المختلفة لشعارك. كل خيار يعرض جوانب فريدة من لغتك البصرية.",
    contact_info: "معلومات التواصل",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    address: "العنوان",
    image_of: "صورة",
    options: [
      {
        title: "التصميم الأول",
      },
      {
        title: "التصميم الثاني",
      },
      {
        title: "التصميم الثالث",
      },
      {
        title: "التصميم الرابع",
      }
    ]
  }
};

const logoOptions: LogoOption[] = [
  {
    id: 1,
    title: "Option One",
    gallery: [
      "https://github.com/OmarAyesh2/mockups/blob/main/1%20(2).png?raw=true",
      "https://github.com/OmarAyesh2/mockups/blob/main/1%20(3).png?raw=true",
      "https://github.com/OmarAyesh2/mockups/blob/main/1%20(1).png?raw=true",
    ]
  },
  {
    id: 2,
    title: "Option Two",
    gallery: [
      "https://github.com/OmarAyesh2/mockups/blob/main/4%20(1).png?raw=true",
      "https://github.com/OmarAyesh2/mockups/blob/main/4%20(3).png?raw=true",
      "https://github.com/OmarAyesh2/mockups/blob/main/4%20(2).png?raw=true",
    ]
  },
  {
    id: 3,
    title: "Option Three",
    gallery: [
      "https://github.com/OmarAyesh2/mockups/blob/main/2%20(2).png?raw=true",
      "https://github.com/OmarAyesh2/mockups/blob/main/2%20(1).png?raw=true",
    ]
  },
  {
    id: 4,
    title: "Option Four",
    gallery: [
      "https://github.com/OmarAyesh2/mockups/blob/main/3%20(1).png?raw=true",
      "https://github.com/OmarAyesh2/mockups/blob/main/3%20(2).png?raw=true",
      
    ]
  }
];

const allImages = logoOptions.reduce((acc, option) => [
  ...acc,
  ...option.gallery.map((img, index) => ({
    url: img,
    optionTitle: option.title,
    imageIndex: index + 1,
    totalImages: option.gallery.length
  }))
], [] as { url: string; optionTitle: string; imageIndex: number; totalImages: number }[]);

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const currentImageIndex = selectedImage ? allImages.findIndex(img => img.url === selectedImage) : -1;
  const currentImageInfo = currentImageIndex !== -1 ? allImages[currentImageIndex] : null;
  const t = translations[language];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
      setSelectedImage(allImages[newIndex].url);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const newIndex = (currentImageIndex + 1) % allImages.length;
      setSelectedImage(allImages[newIndex].url);
    } else if (e.key === 'Escape') {
      setSelectedImage(null);
    }
  }, [selectedImage, currentImageIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const navigateImage = (direction: 'prev' | 'next', e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = direction === 'prev'
      ? (currentImageIndex - 1 + allImages.length) % allImages.length
      : (currentImageIndex + 1) % allImages.length;
    setSelectedImage(allImages[newIndex].url);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <div className={`min-h-screen animated-bg text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
      <div className="min-h-screen backdrop-blur-sm">
        {/* Language Toggle */}
        <div className="fixed top-4 right-4 z-50 rtl:left-4 rtl:right-auto">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium">{language.toUpperCase()}</span>
          </button>
        </div>

        {/* Header */}
        <header className="container mx-auto px-4 py-8">
         
          <h1 className="text-5xl font-bold mb-4 text-white">
            {t.cantonal_logo}
          </h1>
          <p className="text-xl text-white max-w-2xl">
            {t.explore_text}
          </p>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          {/* Logo Options with Galleries */}
          <div className="space-y-16">
            {t.options.map((option, index) => (
              <section key={index} className="bg-white/10 rounded-xl p-8 backdrop-blur-md">
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <GalleryHorizontalEnd className="w-6 h-6 mr-3 rtl:ml-3 rtl:mr-0 text-[#f4a853]" />
                    <h2 className="text-2xl font-semibold text-white">{option.title}</h2>
                  </div>
                  <p className="text-white">{option.description}</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {logoOptions[index].gallery.map((img, imgIndex) => (
                    <div 
                      key={imgIndex}
                      className="relative group overflow-hidden rounded-lg cursor-pointer"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img 
                        src={img} 
                        alt={`${option.title} Preview ${imgIndex + 1}`}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ExternalLink className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Section */}
          <section className="bg-white/10 rounded-xl p-8 backdrop-blur-md mt-16">
            <h2 className="text-3xl font-bold mb-8 text-white">{t.contact_info}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-4 rtl:ml-4 rtl:mr-0 text-[#f4a853]" />
                <div>
                  <h3 className="font-semibold text-white">{t.email}</h3>
                  <p herf="google.com" className="text-white">info@telescope-agency.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-4 rtl:ml-4 rtl:mr-0 text-[#f4a853]" />
                <div>
                  <h3 className="font-semibold text-white">{t.phone}</h3>
                  <p className="text-white">+966 53 948 7486</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 mr-4 rtl:ml-4 rtl:mr-0 text-[#f4a853]" />
                <div>
                  <h3 className="font-semibold text-white">{t.address}</h3>
                  <p className="text-white">Saudia Aribia, Riyadh</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Image Modal */}
        {selectedImage && currentImageInfo && (
          <div 
            className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center p-4 z-50"
            onClick={() => setSelectedImage(null)}
          >
            {/* Navigation info */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-center">
              <h3 className="text-xl font-semibold mb-1">{t.options[currentImageInfo.imageIndex - 1].title}</h3>
              <p className="text-sm text-white/80">
                {t.image_of} {currentImageInfo.imageIndex} {t.of} {currentImageInfo.totalImages}
              </p>
            </div>

            {/* Close button */}
            <button 
              className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-white/80 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation buttons */}
            <button 
              className="absolute left-4 rtl:right-4 rtl:left-auto top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white/80 hover:text-white transition-colors"
              onClick={(e) => navigateImage('prev', e)}
            >
              <ChevronLeft className="w-8 h-8 rtl:rotate-180" />
            </button>
            
            <button 
              className="absolute right-4 rtl:left-4 rtl:right-auto top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white/80 hover:text-white transition-colors"
              onClick={(e) => navigateImage('next', e)}
            >
              <ChevronRight className="w-8 h-8 rtl:rotate-180" />
            </button>

            <img 
              src={selectedImage} 
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;