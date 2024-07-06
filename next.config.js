/** @type {import('next').NextConfig} */
module.exports = {
    i18n: {
      localeDetection: false,
      // These are all the locales you want to support in
      // your application
      locales: ['en-US', 'ko_KR'],
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: 'en-US',
      // This is a list of locale domains and the default locale they
      // should handle (these are only required when setting up domain routing)
      // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
      // Change Vercel domain configuration for redirects below...
      domains: [
        {
          domain: 'johnseong.info',
          defaultLocale: 'en-US',
        },
        {
            domain: 'johnseong.kr',
            defaultLocale: 'ko_KR',
          },
      ],
    },
  }
