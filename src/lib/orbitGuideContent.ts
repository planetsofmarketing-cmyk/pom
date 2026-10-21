export const orbitGuideServices = [
  { label: 'SEO', formValue: 'SEO & Search Marketing' },
  { label: 'Social Media', formValue: 'Social Media Marketing' },
  { label: 'Paid Advertising & AI Search Marketing', formValue: 'Paid Advertising' },
  { label: 'Brand Strategy', formValue: 'Brand Strategy & Identity' },
  { label: 'Content Marketing', formValue: 'Content Marketing' },
  { label: 'Email Marketing', formValue: 'Email Marketing & Automation' },
  { label: 'Web Design', formValue: 'Website Design & Development' },
  { label: 'Analytics', formValue: 'Analytics & Reporting' },
] as const;

export const orbitGuideBudgets = [
  { label: 'Below ₹25,000', value: 'under-25k' },
  { label: '₹25,000–₹50,000', value: '25k-50k' },
  { label: '₹50,000–₹1 lakh', value: '50k-1l' },
  { label: '₹1–3 lakh', value: '1l-3l' },
] as const;

export function getOrbitGuideInstantReply(question: string): string | null {
  const normalized = question.toLowerCase();

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)( there)?[.!\s]*$/.test(normalized)) {
    return 'Hi! I’m Pixie. Ask me about our services, team, process, or client work.';
  }

  return null;
}

export function recommendOrbitGuideServices({
  goal,
  business,
  marketing,
  interestedService,
}: {
  goal: string;
  business: string;
  marketing: string;
  interestedService: string;
}): string[] {
  const selectedService = orbitGuideServices.find(
    (service) => service.formValue === interestedService || service.label === interestedService
  );
  const context = `${goal} ${business} ${marketing}`.toLowerCase();
  let recommendations: string[];

  if (/retain|repeat|loyal|lifetime|email|nurtur/.test(context)) {
    recommendations = ['Email Marketing', 'Analytics'];
  } else if (/brand|awareness|community|social|engagement/.test(context)) {
    recommendations = ['Social Media', 'Content Marketing', 'Brand Strategy'];
  } else if (/website|web site|conversion|online store|e-?commerce/.test(context)) {
    recommendations = ['Web Design', 'Analytics'];
  } else if (/search|organic|rank|visibility/.test(context)) {
    recommendations = ['SEO', 'Content Marketing'];
  } else if (/lead|sales|revenue|acqui|demand/.test(context)) {
    recommendations = ['SEO', 'Paid Advertising & AI Search Marketing'];
  } else {
    recommendations = ['Brand Strategy', 'SEO'];
  }

  if (selectedService) {
    recommendations = [
      selectedService.label,
      ...recommendations.filter((service) => service !== selectedService.label),
    ];
  }

  return recommendations.slice(0, 3);
}