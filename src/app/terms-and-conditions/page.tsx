import TermsAndConditionsSection from "@/components/privacy-policy/TermsAndConditionsSection"
import { Metadata } from "next"

export const metadata: Metadata = {
     title: "Terms and Conditions",
     description: "TruckBilty Terms and Conditions",
     keywords: "terms and conditions, TruckBilty, user agreement, travel policies",
}

export default function TermsAndConditions() {
     return (
          <>
               <TermsAndConditionsSection />
          </>
     )
}
