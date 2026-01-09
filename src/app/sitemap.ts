import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
     return [
          {
               url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          },
          {
               url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`,
          },
          {
               url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy`,
          },
          {
               url: `${process.env.NEXT_PUBLIC_BASE_URL}/terms-and-conditions`,
          },
          {
               url: `${process.env.NEXT_PUBLIC_BASE_URL}/refund-policy`,
          },
     ]
}
