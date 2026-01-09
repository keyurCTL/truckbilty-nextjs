import { Metadata } from "next";
import BlogPage from "@/components/blogs/BlogDetails";
import { blogsData } from "@/components/common/blogsData";
import { notFound } from "next/navigation";

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
     const slug = (await params).slug;
     const blog = blogsData.find((b) => b.slug === slug);

     if (!blog) {
          return {
               title: "Blog Not Found - TruckBilty",
          };
     }

     return {
          title: `${blog.title}`,
          description: blog.description,
          openGraph: {
               title: blog.title,
               description: blog.description,
               images: [blog.image],
               type: "article",
          },
     };
}

// Generate static params for all blogs
export async function generateStaticParams() {
     return blogsData.map((blog) => ({
          slug: blog.slug,
     }));
}

export default async function BlogDetails({ params }: { params: Promise<{ slug: string }> }) {
     const slug = (await params).slug;
     const blog = blogsData.find((b) => b.slug === slug);

     if (!blog) {
          notFound();
     }

     return (
          <>
               <BlogPage blog={blog} />
          </>
     );
}
