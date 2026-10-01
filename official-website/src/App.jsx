import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Grain from "./components/Grain";
import Navbar from "./components/Navbar";
import Footer from "./sections/footer/Footer";
import HomePage from "./pages/home/HomePage";
import WorkPage from "./pages/work/WorkPage";
import ServicesPage from "./pages/services/ServicesPage";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import BlogPage from "./pages/blog/BlogPage";

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Grain />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />{" "}
          {/* placeholder dulu */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
