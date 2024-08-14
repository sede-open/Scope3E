import { FooterCard } from 'components/FooterCard';
import { BannerSection } from './BannerSection';
import { GoalsSection } from './GoalsSection';
import { LandingSection } from './LandingSection';
import { SolutionsSection } from './SolutionsSection';
import { TestimonialsSection } from './TestimonialsSection';
import { testimonialData } from './TestimonialsSection/data';

export const Home = () => (
  <>
    <LandingSection />
    <GoalsSection />
    <TestimonialsSection testimonialData={testimonialData} />
    <SolutionsSection />
    <BannerSection />
    <FooterCard />
  </>
);
