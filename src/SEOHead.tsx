import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
}

export const SEOHead = ({ title, description, image = '/default-og-image.png' }: SEOProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
  </Helmet>
);
