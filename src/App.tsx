import { useEffect, useState } from "react";
import {
  Diamond,
  Watch,
  BellRing as Ring,
  Crown,
  ChevronDown,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

function App() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          entry.target.classList.remove("opacity-0");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((elem) => {
      observer.observe(elem);
    });

    // Auto-advance testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80"
            alt="Luxury jewelry background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6 animate-fade-in">
            LUXE GEMS
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 animate-fade-in delay-200">
            Timeless Elegance, Exceptional Craftsmanship
          </p>
          <a href="#collections" className="inline-block animate-bounce mt-8">
            <ChevronDown size={32} />
          </a>
        </div>
      </header>

      {/* Collections Section */}
      <section id="collections" className="py-20 px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl text-center mb-16 font-light">
          Our Collections
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {collections.map((collection, index) => (
            <div
              key={collection.title}
              className="group relative overflow-hidden rounded-lg animate-on-scroll opacity-0 transition-all duration-700 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-[200px] object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-2">
                  <collection.icon size={24} className="mx-auto mb-2" />
                  <h3 className="text-sm font-light mb-1">
                    {collection.title}
                  </h3>
                  <p className="text-xs opacity-80">{collection.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white overflow-hidden">
        <h2 className="text-3xl md:text-4xl text-center mb-16 font-light">
          Client Testimonials
        </h2>
        <div className="relative">
          <div
            className="flex transition-transform duration-1000 ease-out"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="mb-8">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <p className="text-xl italic mb-6 text-neutral-600">
                    "{testimonial.quote}"
                  </p>
                  <h3 className="text-lg font-medium">{testimonial.name}</h3>
                  <p className="text-neutral-500">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentTestimonial === index
                    ? "bg-neutral-800"
                    : "bg-neutral-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Piece */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80"
                alt="Featured diamond necklace"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="animate-on-scroll opacity-0 delay-200">
              <h2 className="text-3xl md:text-4xl mb-6 font-light">
                The Crown Jewel
              </h2>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Our signature piece embodies the pinnacle of jewelry
                craftsmanship. Each diamond is carefully selected and set by
                master artisans, creating a masterpiece that captures light and
                attention from every angle.
              </p>
              <div className="flex gap-4">
                <span className="inline-block px-4 py-2 border border-neutral-300 rounded-full text-sm">
                  18K Gold
                </span>
                <span className="inline-block px-4 py-2 border border-neutral-300 rounded-full text-sm">
                  VVS Diamonds
                </span>
                <span className="inline-block px-4 py-2 border border-neutral-300 rounded-full text-sm">
                  Handcrafted
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl mb-4 font-light">LUXE GEMS</h3>
              <p className="text-neutral-400">
                Crafting timeless pieces that celebrate life's precious moments.
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-4 font-light">Visit Us</h3>
              <p className="text-neutral-400">
                123 Luxury Lane
                <br />
                New York, NY 10001
                <br />
                (555) 123-4567
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-4 font-light">Connect</h3>
              <div className="flex gap-4">
                <Instagram className="hover:text-neutral-300 cursor-pointer transition-colors" />
                <Facebook className="hover:text-neutral-300 cursor-pointer transition-colors" />
                <Twitter className="hover:text-neutral-300 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
            <p>&copy; 2024 LUXE GEMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const collections = [
  {
    title: "Diamond Collection",
    description: "Brilliant diamonds set in timeless designs",
    image:
      "https://images.unsplash.com/photo-1586878341523-7503d575f8cf?auto=format&fit=crop&q=80",
    icon: Diamond,
  },
  {
    title: "Luxury Timepieces",
    description: "Precision crafted watches for the discerning collector",
    image:
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80",
    icon: Watch,
  },
  {
    title: "Engagement Rings",
    description: "Celebrate your love with our exclusive ring collection",
    image:
      "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?auto=format&fit=crop&q=80",
    icon: Ring,
  },
  {
    title: "Royal Collection",
    description: "Exquisite pieces fit for royalty",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80",
    icon: Crown,
  },
  {
    title: "Diamond Necklaces",
    description: "Stunning necklaces for every occasion",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80",
    icon: Diamond,
  },
  {
    title: "Vintage Timepieces",
    description: "Classic watches with timeless appeal",
    image:
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80",
    icon: Watch,
  },
  {
    title: "Wedding Bands",
    description: "Symbols of eternal love",
    image:
      "https://images.unsplash.com/photo-1595781572981-d63151b232ed?auto=format&fit=crop&q=80",
    icon: Ring,
  },
  {
    title: "Signature Pieces",
    description: "One-of-a-kind masterpieces",
    image:
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80",
    icon: Crown,
  },
  {
    title: "Modern Collection",
    description: "Contemporary designs for the modern elite",
    image:
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&q=80",
    icon: Diamond,
  },
  {
    title: "Limited Edition",
    description: "Exclusive pieces for collectors",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80",
    icon: Crown,
  },
];

const testimonials = [
  {
    quote:
      "The craftsmanship of my engagement ring is absolutely stunning. Every detail is perfect, and it catches the light beautifully.",
    name: "Sarah Mitchell",
    title: "Satisfied Client",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Their vintage timepiece collection is unmatched. I found a rare piece that I've been searching for years.",
    name: "James Wilson",
    title: "Watch Collector",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
  },
  {
    quote:
      "The personal service and attention to detail made choosing our wedding bands a memorable experience.",
    name: "Emily & David Thompson",
    title: "Newlyweds",
    image:
      "https://images.unsplash.com/photo-1623091411395-09e79fdbfcf3?auto=format&fit=crop&q=80",
  },
];

export default App;
