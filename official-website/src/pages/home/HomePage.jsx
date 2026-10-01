import Hero from "../../sections/Hero";
import Manifesto from "../../sections/manifesto/Manifesto";
import Services from "../../sections/services/Services";
import Work from "../../sections/work/Work";
import Process from "../../sections/process/Process";
import Testimonial from "../../sections/testimonials/Testimonial";
import CTA from "../../sections/cta/CTA";
import Pricing from "../../sections/pricing/Pricing";

const HomePage = () => {
  return (
    <main id="top">
      <Hero />
      <Manifesto />
      <Services />
      <Pricing />
      <Work />
      <Process />
      <Testimonial />
      <CTA />
    </main>
  );
};

export default HomePage;
