import React from 'react';

const brands = [
  {
    name: 'Salesforce',
    logo: 'https://www.salesforce.com/content/dam/sfdc-docs/www/logos/logo-salesforce.svg',
    url: 'https://www.salesforce.com'
  },
  {
    name: 'Lyft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Lyft_logo.svg/1200px-Lyft_logo.svg.png',
    url: 'https://www.lyft.com'
  },
  {
    name: 'Spotify',
    logo: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png',
    url: 'https://www.spotify.com'
  },
  {
    name: 'Stripe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png',
    url: 'https://stripe.com'
  },
  {
    name: 'AWS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png',
    url: 'https://aws.amazon.com'
  },
  {
    name: 'Reddit',
    logo: 'https://logodownload.org/wp-content/uploads/2018/02/reddit-logo.png',
    url: 'https://www.reddit.com'
  }
];

const BrandLogos = () => {
  return (
    <div className="w-full py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          {brands.map((brand, index) => (
            <a
              key={index}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-32 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandLogos;
