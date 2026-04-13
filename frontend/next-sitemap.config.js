/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://deepakkushwaha.tech',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api'] },
    ],
  },
  // Priority overrides per path
  transform: async (config, path) => {
    const priorityMap: Record<string, number> = {
      '/': 1.0,
      '/about': 0.9,
      '/work': 0.9,
      '/blog': 0.85,
      '/mock-interview': 0.95,
      '/hire': 0.9,
    }
    return {
      loc: path,
      changefreq: path.startsWith('/blog/') ? 'monthly' : 'weekly',
      priority: priorityMap[path] ?? 0.7,
      lastmod: new Date().toISOString(),
    }
  },
}
