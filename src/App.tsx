import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { MetricsAndActivation } from "./components/MetricsAndActivation";
import { IsometricDataHub } from "./components/IsometricDataHub";
import { WhyChooseUsBento } from "./components/WhyChooseUsBento";
import { SplitChart } from "./components/SplitChart";
import { ServicesDarkBlock } from "./components/ServicesDarkBlock";
import { ProcessAndInsights } from "./components/ProcessAndInsights";
import { FaqSection, Footer } from "./components/FaqAndFooter";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-offwhite)] text-[var(--color-text-primary)]">
      <Navbar />
      <main>
        <Hero />
        <MetricsAndActivation />
        <IsometricDataHub />
        <WhyChooseUsBento />
        <SplitChart />
        <ServicesDarkBlock />
        <ProcessAndInsights />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
