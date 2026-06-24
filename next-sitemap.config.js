/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://outfrontentertainment.com.au',
  generateRobotsTxt: true,
  generateIndexSitemap: true,

  // Sitemap options
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,

  // Exclude paths
  exclude: [
    '/admin/*',
    '/dashboard/*',
    '/api/*',
    '/auth/*',
    '/checkout/*',
    '/404',
    '/500',
    '/server-sitemap.xml',
  ],

  // Robots.txt options
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard/',
          '/api/',
          '/auth/',
          '/checkout/',
          '/*?*', // Exclude query parameters
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard/',
          '/api/',
          '/auth/',
        ],
      },
    ],
    additionalSitemaps: [
      // Dynamic sitemaps for entertainers, categories, etc.
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://outfrontentertainment.com.au'}/server-sitemap.xml`,
    ],
  },

  // Transform function for custom sitemap entries
  transform: async (config, path) => {
    // Custom priority for specific pages
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/entertainers') {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.startsWith('/entertainers/')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/categories/')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/about' || path === '/contact') {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },

  // Additional paths to include
  additionalPaths: async (config) => {
    const result = [];

    // Add static pages
    const staticPages = [
      '/',
      '/entertainers',
      '/categories',
      '/about',
      '/contact',
      '/how-it-works',
      '/faq',
      '/terms',
      '/privacy',
    ];

    for (const page of staticPages) {
      result.push(await config.transform(config, page));
    }

    return result;
  },
};
