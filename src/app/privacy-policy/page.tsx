import { Metadata } from "next";
import PrivacyPolicySection from "@/components/privacy-policy/PrivacyPolicySection";

export const metadata: Metadata = {
     title: "Privacy Policy",
     description: "TruckBilty Privacy Policy",
     keywords: "privacy policy, TruckBilty, data protection, user privacy",
};

export default function PrivacyPolicy() {
     return (
          <>
               <PrivacyPolicySection />
          </>
     );
}
