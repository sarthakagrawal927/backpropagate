import "@saas-maker/testimonials/dist/index.css";

import { TestimonialWall } from "@saas-maker/testimonials";

const API_KEY = import.meta.env.VITE_SAASMAKER_API_KEY ?? "";
const API_BASE = "https://api.sassmaker.com";

export function SaaSMakerTestimonials() {
  if (!API_KEY) return null;
  return <TestimonialWall projectId={API_KEY} apiBaseUrl={API_BASE} theme="dark" layout="grid" />;
}
