import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import FeaturesSection from '../components/FeaturesSection';
import ImpactSection from '../components/ImpactSection';
import MultiMissionSection from '../components/MultiMissionSection';
import FooterSection from '../components/FooterSection';

export function LandingPage() {
  return (
    <Layout>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ImpactSection />
      <MultiMissionSection />
      <FooterSection />
    </Layout>
  );
}
