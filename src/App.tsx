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
    cantonal_logo: "Cantonal Logo",
    explore_text: "Explore different variations of your logo design. Each option showcases unique aspects of your visual language.",
    contact_info: "Contact Information",
    email: "Email",
    phone: "Phone",
    address: "Address",
    image_of: "Image",
    options: [
      {
        title: "Option One",
        description: "The classic Telescope logo with its iconic crescent shapes"
      },
      {
        title: "Option Two",
        description: "A contemporary take on the Telescope brand identity"
      },
      {
        title: "Option Three",
        description: "Simplified and refined for modern applications"
      }
    ]
  },
  ar: {
    cantonal_logo: "Cantonal شعار",
    explore_text: "استكشف الخيارات المختلفة لشعارك. كل خيار يعرض جوانب فريدة من لغتك البصرية.",
    contact_info: "معلومات التواصل",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    address: "العنوان",
    image_of: "صورة",
    options: [
      {
        title: "التصميم الأول",
        description: "شعار تلسكوب الكلاسيكي بأشكاله الهلالية المميزة"
      },
      {
        title: "التصميم الثاني",
        description: "رؤية معاصرة لهوية علامة تلسكوب"
      },
      {
        title: "التصميم الثالث",
        description: "مبسط ومحسن للتطبيقات الحديثة"
      }
    ]
  }
};

const logoOptions: LogoOption[] = [
  {
    id: 1,
    title: "Option One",
    description: "The classic Telescope logo with its iconic crescent shapes",
    gallery: [
      "https://cdn.myportfolio.com/254f7732-c8c1-432d-a743-3015106fc23e/dbc0efb7-cae1-4b75-9288-2887daaf74dc_rw_1920.jpg?h=d05bf7e98283c92dacdd93c2ace53f39",
      "https://cdn.myportfolio.com/254f7732-c8c1-432d-a743-3015106fc23e/6328de2f-91fa-4361-b875-6f28ea1475f1_rw_1920.jpg?h=0e8728e2804d0696bc44b0b86e010243",
    ]
  },
  {
    id: 2,
    title: "Option Two",
    description: "A contemporary take on the Telescope brand identity",
    gallery: [
      "https://cdn.myportfolio.com/254f7732-c8c1-432d-a743-3015106fc23e/daa7a17a-444d-4937-b691-6b063c0ec1f2_rw_1920.jpg?h=ad5a1e2f552b7e7e6a9b09154b3c883c",
      "https://cdn.myportfolio.com/254f7732-c8c1-432d-a743-3015106fc23e/e7d5df9b-2059-4b80-ae06-ce70d2e031c1_rw_1920.jpg?h=a5f2ac6b7672ffd14b6fdd5e2874388e",
    ]
  },
  {
    id: 3,
    title: "Option Three",
    description: "Simplified and refined for modern applications",
    gallery: [
      "https://cdn.myportfolio.com/254f7732-c8c1-432d-a743-3015106fc23e/8b7e9c10-04d4-4289-aef0-5a5665ab536d_rw_1920.jpg?h=ab1b377234b95f73573df7fec48c7685",
      "https://cdn.myportfolio.com/254f7732-c8c1-432d-a743-3015106fc23e/3daaaad9-8d7d-4921-bb87-990638a2d412_rw_1920.jpg?h=6ceca41f1ed6172d9173fb7c922df2be",
      "https://cdn.myportfolio.com/254f7732-c8c1-432d-a743-3015106fc23e/5f0ad009-1cee-41a0-8085-9f68443c2a62_rw_1920.jpg?h=30b29fb3e5661d64ada4dd3510c997be",
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