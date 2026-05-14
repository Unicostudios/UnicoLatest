// PATH: src/app/niquo/layout.jsx
// This gives the /niquo page its own title + meta
// completely separate from the Unico Studios homepage

export const metadata = {
  title: 'Niquo — AI Sales Agent | Watch it sell your business',
  description:
    'Niquo reads any business in 60 seconds and becomes its salesperson — handling every lead on WhatsApp, chat, and calls. Try the free live demo.',
  keywords: [
    'AI sales agent India',
    'WhatsApp sales bot',
    'AI sales automation',
    'Niquo AI',
    'sales chatbot India',
    'lead conversion AI',
    'Unico Studios Niquo',
  ],
  openGraph: {
    title: 'Niquo — AI Sales Agent | Watch it sell your business',
    description:
      'Paste your URL. Watch Niquo become your salesperson in 60 seconds — handling objections, following up ghosts, closing leads on WhatsApp.',
    url: 'https://unicostudios.in/niquo',
    siteName: 'Niquo by Unico Studios',
    images: [
      {
        url: 'https://res.cloudinary.com/dmfisp8ue/image/upload/v1745333408/Unico_Studios_ksivf7.png',
        width: 800,
        height: 600,
        alt: 'Niquo AI Sales Agent',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Niquo — AI Sales Agent | Watch it sell your business',
    description:
      'Paste your URL. Watch Niquo become your salesperson in 60 seconds.',
    images: [
      'https://res.cloudinary.com/dmfisp8ue/image/upload/v1745333408/Unico_Studios_ksivf7.png',
    ],
  },
};

export default function NiquoLayout({ children }) {
  return <>{children}</>;
}
