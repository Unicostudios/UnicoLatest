import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudy } from "../case-studies/registry";
import DreamAerospace from "../case-studies/DreamAerospace";
import Immersified from "../case-studies/Immersified";
import G2Interiors from "../case-studies/G2Interiors";
import Gohar from "../case-studies/Gohar";
import HazeUae from "../case-studies/HazeUae";
import Doonya from "../case-studies/Doonya";
import AashirKare from "../case-studies/AashirKare";
import DupreeArmon from "../case-studies/DupreeArmon";
import TravelApp from "../case-studies/TravelApp";

const COMPONENTS = {
  "dream-aerospace": DreamAerospace,
  immersified: Immersified,
  "g2-interiors": G2Interiors,
  gohar: Gohar,
  "haze-uae": HazeUae,
  doonya: Doonya,
  "aashir-kare": AashirKare,
  "dupree-armon": DupreeArmon,
  "travel-app": TravelApp,
};

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return { title: "Case study | Unico Studios" };
  return {
    title: `${c.name} — Case Study | Unico Studios`,
    description: c.description,
    alternates: { canonical: `https://unicostudios.in/work/${c.slug}` },
    openGraph: {
      title: `${c.name} — Case Study | Unico Studios`,
      description: c.description,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const Component = COMPONENTS[slug];
  if (!Component) return notFound();
  return <Component />;
}
