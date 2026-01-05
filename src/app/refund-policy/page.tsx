import { Metadata } from "next";
import RefundPolicySection from "@/components/privacy-policy/RefundPolicySection";

export const metadata: Metadata = {
     title: "Refund Policy",
     description: "TruckBilty Refund Policy",
     keywords: "refund policy, TruckBilty, data protection, user privacy",
};

export default function RefundPolicy() {
     return (
          <>
               <RefundPolicySection />
          </>
     );
}
