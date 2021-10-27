const links = require('./links');
module.exports = {
  // NOTE: `process.env.URL` is provided by Netlify, and may need
  // adjusted pending your host
  url: process.env.URL || "http://localhost:8080",
  siteName: "TskrBase",
  siteDescription:
    "Own your work, and your automation!",
  siteImage: "images/opengraph-256.png",
  siteURL: "https://docs.tskr.io/",
  twitterHandle: "@tskrio",
  siteTwitterTitle: "Tskr, track your work and your automation",
  navLinks: [
    links.docs,
  ],
  iconLinks: [
    links.github,
    links.twitter,
  ],
  leftNavLinks: [
    links.docs,
    links.cookbooks,
    links.videos,
  ],
  footerLinks: [
    links.logos,
    links.contributing,
    links.github,
    links.twitter,
  ]
};