'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
}

const services = [
  'SEO & Search Marketing',
  'Social Media Marketing',
  'Paid Advertising',
  'Brand Strategy & Identity',
  'Content Marketing',
  'Email Marketing & Automation',
  'Website Design & Development',
  'Analytics & Reporting',
  'Full-Service Package',
  'Not Sure — Need Guidance',
];

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Studio',
    value: 'Banjara Hills, Hyderabad\nTelangana 500034',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'hello@planetsofmarketing.in',
    href: 'mailto:hello@planetsofmarketing.in',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Hours',
    value: 'Mon – Sat: 9:00 AM – 7:00 PM IST',
  },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    // Check cooldown
    if (cooldownEnd && Date.now() < cooldownEnd) {
      setSubmitError('Please wait before submitting another inquiry.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          budget: formData.budget,
          message: formData.message,
          website: honeypot, // Honeypot field
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      // Success - set cooldown and reset form
      setCooldownEnd(Date.now() + 30000);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: '',
      });
      setErrors({});
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-12 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact info — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Info cards */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-foreground hover:text-primary transition-colors whitespace-pre-line">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground whitespace-pre-line">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 rounded-xl font-semibold text-foreground transition-all duration-300 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 0 20px rgba(37,211,102,0.3)',
              }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>

            {/* Planet decoration */}
            <div className="hidden lg:flex items-center justify-center py-8" aria-hidden="true">
              <div className="relative w-48 h-48">
                {/* Orbital rings */}
                {[80, 120, 160].map((size, i) => (
                  <div
                    key={size}
                    className="absolute rounded-full border border-purple-500/15 top-1/2 left-1/2"
                    style={{
                      width: size,
                      height: size,
                      transform: 'translate(-50%, -50%)',
                      animation: `orbit-spin ${15 + i * 8}s linear infinite ${i % 2 === 1 ? 'reverse' : ''}`,
                    }}
                  />
                ))}
                {/* Central planet */}
                <div
                  className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full -translate-x-1/2 -translate-y-1/2 animate-float"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #FED7AA, #F97316, #7C2D12)',
                    boxShadow: '0 0 30px rgba(249,115,22,0.5), 0 0 60px rgba(249,115,22,0.2)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="glass-card rounded-2xl p-12 text-center flex flex-col items-center gap-6"
                style={{ borderColor: 'rgba(16,185,129,0.4)' }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl animate-float"
                  style={{ background: 'rgba(16,185,129,0.2)' }}
                >
                  🚀
                </div>
                <h2 className="text-3xl font-extrabold text-foreground">Mission Received!</h2>
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  Your message has entered our orbit. We&apos;ll respond within 4 hours with your free strategy plan.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all text-sm font-medium"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-extrabold text-foreground mb-2">Start Your Mission</h2>
                <p className="text-sm text-muted-foreground mb-8">Fill in the details below and we&apos;ll craft a custom strategy for your brand.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                        Your Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Priya Reddy"
                        className={`w-full bg-transparent border-b py-3 text-foreground placeholder-muted-foreground/40 focus:border-primary focus:outline-none transition-colors text-sm ${errors.name ? 'border-red-500' : 'border-border'}`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="priya@yourbrand.in"
                        className={`w-full bg-transparent border-b py-3 text-foreground placeholder-muted-foreground/40 focus:border-primary focus:outline-none transition-colors text-sm ${errors.email ? 'border-red-500' : 'border-border'}`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder-muted-foreground/40 focus:border-primary focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Brand Co."
                        className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder-muted-foreground/40 focus:border-primary focus:outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                      Service Interested In <span className="text-accent">*</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className={`w-full bg-[#12152A] border-b py-3 text-foreground focus:border-primary focus:outline-none transition-colors text-sm appearance-none rounded-none ${errors.service ? 'border-red-500' : 'border-border'}`}
                    >
                      <option value="" disabled>Select a planet...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-400 text-xs mt-1">{errors.service}</p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                      Monthly Budget (INR)
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-[#12152A] border-b border-border py-3 text-foreground focus:border-primary focus:outline-none transition-colors text-sm appearance-none rounded-none"
                    >
                      <option value="">Select a range...</option>
                      <option value="under-25k">Under ₹25,000</option>
                      <option value="25k-50k">₹25,000 – ₹50,000</option>
                      <option value="50k-1l">₹50,000 – ₹1,00,000</option>
                      <option value="1l-3l">₹1,00,000 – ₹3,00,000</option>
                      <option value="3l+">₹3,00,000+</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                      Tell Us About Your Mission
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe your brand, your goals, and where you want to be in 12 months..."
                      className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder-muted-foreground/40 focus:border-primary focus:outline-none transition-colors text-sm resize-none"
                    />
                  </div>

                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
                    aria-hidden="true"
                  />

                  {/* Error message */}
                  {submitError && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || (cooldownEnd !== null && Date.now() < cooldownEnd)}
                    className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 mt-2 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    style={{
                      background: 'linear-gradient(135deg, #7C3AED, #A855F7, #F97316)',
                      boxShadow: '0 0 20px rgba(124,58,237,0.3)',
                    }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Launching...
                      </span>
                    ) : cooldownEnd && Date.now() < cooldownEnd ? (
                      'Submitted Successfully!'
                    ) : (
                      'Launch My Brand Into Orbit 🚀'
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    We respond within 4 hours. No spam. No pressure. Just results.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}