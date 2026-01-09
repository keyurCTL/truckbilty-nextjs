import { Metadata } from "next";
import Blogs from "@/components/blogs/Blogs";

export const metadata: Metadata = {
     title: "Blogs - TruckBilty",
     description: "Read the latest articles and updates on TruckBilty's blog.",
     keywords: "TruckBilty, blog, articles, updates, logistics, transportation, trucking, supply chain",
};

export default function Blog() {
     return (
          <>
               <Blogs />
          </>
     );
}
