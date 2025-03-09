// src/App.jsx
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import InfoCards from "./components/InfoCards";
import StudyAbroad from "./components/StudyAbroad";
import ContactForm from "./components/ContactForm";
import HospitalList from "./components/HospitalList";
import HowItWorks from "./components/HowItWorks";
import FeedbackBanner from "./components/FeedbackBanner";
// import TeamSection from "./components/FeedbackSection";
import Footer from "./components/Footer";
import { useEffect, useRef, useState } from "react";
import FeedbackSection from "./components/FeedbackSection";
import { FaArrowUp } from "react-icons/fa";

function App() {
  const contactFormRef = useRef();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <Navbar />
      <HeroSection contactFormRef={contactFormRef} />
      <InfoCards />
      <StudyAbroad />
      <ContactForm contactFormRef={contactFormRef} />
      <HospitalList />
      <HowItWorks />
      <FeedbackBanner />
      <FeedbackSection />
      <Footer />
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed lg:hidden bottom-15 right-5 bg-[#cf6239] text-white p-3 rounded-full shadow-md hover:bg-orange-600 cursor-pointer transition-all"
          style={{ zIndex: 1000 }}
        >
          <FaArrowUp size={32} />
        </button>
      )}
    </div>
  );
}

export default App;
