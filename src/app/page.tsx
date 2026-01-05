import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Transporter from '@/components/Transporter';
import Details from '@/components/Details';
import Users from '@/components/Users';
import Pricing from '@/components/Pricing';
import Reviews from '@/components/Reviews';
import Demo from '@/components/Demo';
import WhatsAppChatbot from '@/components/common/WhatsAppChatbot';

export default function Home() {
  return (
    <>
      {/* <Navigation /> */}
      <Hero />
      <Features />
      <Transporter />
      <Details />
      <Users />
      <Pricing />
      <Reviews />
      <Demo />
      <WhatsAppChatbot />
      {/* <Footer /> */}
    </>
  );
}
