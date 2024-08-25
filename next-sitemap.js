// next-sitemap.js (Continued from above)
module.exports = {
    siteUrl: 'https://www.devnexus.com',
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
        { userAgent: '*', disallow: '/private' },
      ],
    },
  };