import { FlaskConical, Activity, Building, Link } from 'lucide-react';
import { CandlestickChart, UserRound, Landmark } from 'lucide-react';
const { VITE_GOOGLE_AUTH_CLIENT_ID } = import.meta.env;

export const getLinks = (user) => {
  const links = [
    {
      title: 'Experiments',
      href: '/experiments',
      icon: FlaskConical,
    },
    {
      title: 'Experiments Monitor',
      href: '/experiments-monitor',
      icon: Activity,
    },
    {
      title: 'Clients',
      href: '/clients',
      icon: Landmark,
      disabled: user.company.type === 'Client Account',
    },
    {
      title: 'Websites',
      href: '/websites',
      icon: Link,
    },
    {
      title: 'Google Analytics',
      href: '/google-analytics',
      icon: CandlestickChart,
      disabled: !VITE_GOOGLE_AUTH_CLIENT_ID,
    },
    {
      title: 'Organization',
      href: '/organization',
      icon: Building,
    },
    {
      title: 'Account',
      href: '/account',
      icon: UserRound,
    },
  ];

  return links.filter((link) => !link.disabled);
};
