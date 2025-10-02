import '../style.css';
import AboutUsSection from './Homepage/AboutUsSection';
import HeroSection from './Homepage/HeroSection';
import NewsletterSection from './Homepage/NewsletterSection';
import NewsSection from './Homepage/NewsSection';
import ServicesSection from './Homepage/ServicesSection';
import TestimonialsSection from './Homepage/TestimonialsSection';



function HomePage() {
  return (
    <div>
       <HeroSection />
        <AboutUsSection />
        <ServicesSection />
        <NewsSection />
        <TestimonialsSection />
        <NewsletterSection />
    </div>
  );
};


export default HomePage;