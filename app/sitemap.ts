import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://webbyte.in'
  const now  = new Date()

  return [
    { url: base,                         lastModified: now, changeFrequency: 'weekly',  priority: 1    },
    { url: `${base}/products`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${base}/order`,              lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${base}/blog`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.8  },
    { url: `${base}/login`,              lastModified: now, changeFrequency: 'yearly',  priority: 0.4  },
    { url: `${base}/register`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.4  },

    // Blog posts
    { url: `${base}/blog/why-your-business-needs-a-website-in-2025`,    lastModified: new Date('2025-06-15'), priority: 0.7 },
    { url: `${base}/blog/gst-billing-software-guide`,                    lastModified: new Date('2025-06-01'), priority: 0.7 },
    { url: `${base}/blog/how-to-rank-on-google-local-seo`,               lastModified: new Date('2025-05-20'), priority: 0.7 },
    { url: `${base}/blog/invoice-management-best-practices`,             lastModified: new Date('2025-05-05'), priority: 0.7 },
    { url: `${base}/blog/website-speed-optimization-guide`,              lastModified: new Date('2025-04-18'), priority: 0.7 },
    { url: `${base}/blog/razorpay-vs-stripe-india`,                      lastModified: new Date('2025-04-02'), priority: 0.7 },
  ]
}
