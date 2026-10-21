'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Bot, CalendarDays, MessageCircle, Minus, Plus, Send, Sparkles, X } from 'lucide-react';
import {
  getOrbitGuideInstantReply,
  orbitGuideBudgets,
  orbitGuideServices,
  recommendOrbitGuideServices,
} from '@/lib/orbitGuideContent';

type Message = { id: string; role: 'assistant' | 'user'; content: string };
type Stage =
  | 'start'
  | 'goal'
  | 'business'
  | 'marketing'
  | 'service'
  | 'budget'
  | 'name'
  | 'email'
  | 'phone'
  | 'company'
  | 'oneLineGoal'
  | 'consent'
  | 'submitting'
  | 'complete';

type Answers = {
  goal: string;
  business: string;
  marketing: string;
  service: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  oneLineGoal: string;
};
type DragState = {
  pointerId: number;
  pointerX: number;
  pointerY: number;
  left: number;
  top: number;
  width: number;
  height: number;
  moved: boolean;
};

const emptyAnswers: Answers = {
  goal: '',
  business: '',
  marketing: '',
  service: '',
  budget: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  oneLineGoal: '',
};

const initialMessages: Message[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: 'Hi, I’m Pixie, your AI assistant. Let’s find your next growth move.',
  },
];

const questions: Partial<Record<Stage, string>> = {
  goal: 'What is your main growth goal right now?',
  business: 'What does your business offer, and who do you serve?',
  marketing: 'What marketing are you doing today?',
  service: 'Which service would you like to explore first?',
  budget: 'What is your estimated monthly marketing budget?',
  name: 'What is your full name? This should be the person our team contacts.',
  email: 'What is your business email address?',
  phone: 'What phone or WhatsApp number can the team contact you on?',
  company: 'What is your company name or website URL?',
  oneLineGoal: 'In one line, tell us about your project and goals.',
};

const initialQuickReplies = ['Get more leads', 'Our services', 'Our process'];
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || '/contact';
const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+917815985804').replace(/\D/g, '');
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

function trackEvent(event: string) {
  const analyticsWindow = window as Window & { dataLayer?: Array<Record<string, string>> };
  analyticsWindow.dataLayer?.push({ event });
}

function getPromptPlaceholder(stage: Stage): string {
  if (stage === 'email') return 'name@business.com';
  if (stage === 'phone') return '+91 9XXXXXXXXX';
  if (stage === 'start') return 'Ask about services, process, or results';
  return 'Type your answer';
}

function formatServiceRecommendations(recommendations: string[]): string {
  if (recommendations.length < 3) return recommendations.join(' and ');
  return `${recommendations.slice(0, -1).join(', ')}, and ${recommendations[recommendations.length - 1]}`;
}

function clampToViewport(left: number, top: number, width: number, height: number) {
  return {
    left: Math.max(8, Math.min(left, window.innerWidth - width - 8)),
    top: Math.max(8, Math.min(top, window.innerHeight - height - 8)),
  };
}

export default function OrbitGuide() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [panelPosition, setPanelPosition] = useState<{ left: number; top: number } | null>(null);
  const [launcherPosition, setLauncherPosition] = useState<{ left: number; top: number } | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [stage, setStage] = useState<Stage>('start');
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [draft, setDraft] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showHandoff, setShowHandoff] = useState(false);
  const visitorIdRef = useRef('');
  const teaserShownRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelDragRef = useRef<DragState | null>(null);
  const launcherDragRef = useRef<DragState | null>(null);
  const suppressLauncherClickRef = useRef(false);
  const chatSessionRef = useRef(0);

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  useEffect(() => {
    try {
      const storageKey = 'orbit-guide-visitor-id';
      let visitorId = window.localStorage.getItem(storageKey);
      if (!visitorId) {
        visitorId = window.crypto.randomUUID();
        window.localStorage.setItem(storageKey, visitorId);
      }
      visitorIdRef.current = visitorId;
    } catch {
      visitorIdRef.current = 'session-visitor';
    }
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/admin') || isOpen || isMinimized || teaserShownRef.current) return;
    teaserShownRef.current = true;
    setShowTeaser(true);
  }, [isMinimized, isOpen, pathname]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isThinking]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  function addMessage(role: Message['role'], content: string) {
    const id = window.crypto.randomUUID();
    setMessages((current) => [
      ...current,
      { id, role, content },
    ]);
  }

  function openChat() {
    setShowTeaser(false);
    teaserShownRef.current = true;
    setIsOpen(true);
    setIsMinimized(false);
    trackEvent('orbit_guide_chat_opened');
  }

  function startNewChat() {
    chatSessionRef.current += 1;
    setMessages(initialMessages);
    setStage('start');
    setAnswers(emptyAnswers);
    setDraft('');
    setIsThinking(false);
    setShowHandoff(false);
    setIsOpen(true);
    setIsMinimized(false);
  }

  function minimizeChat() {
    const panel = document.querySelector<HTMLElement>('[data-orbit-panel]');
    if (panel && window.innerWidth >= 640) {
      const bounds = panel.getBoundingClientRect();
      const launcherSize = 56;
      setLauncherPosition(
        clampToViewport(
          bounds.right - launcherSize,
          bounds.bottom - launcherSize,
          launcherSize,
          launcherSize
        )
      );
    }
    setIsMinimized(true);
  }

  function startPanelDrag(event: React.PointerEvent<HTMLElement>) {
    if (window.innerWidth < 640 || (event.target as HTMLElement).closest('button')) return;
    const panel = event.currentTarget.closest('[data-orbit-panel]');
    if (!panel) return;
    const bounds = panel.getBoundingClientRect();
    panelDragRef.current = {
      pointerId: event.pointerId,
      pointerX: event.clientX,
      pointerY: event.clientY,
      left: bounds.left,
      top: bounds.top,
      width: bounds.width,
      height: bounds.height,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function movePanelDrag(event: React.PointerEvent<HTMLElement>) {
    const drag = panelDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.pointerX;
    const deltaY = event.clientY - drag.pointerY;
    if (Math.abs(deltaX) + Math.abs(deltaY) < 3) return;
    drag.moved = true;
    setPanelPosition(clampToViewport(drag.left + deltaX, drag.top + deltaY, drag.width, drag.height));
  }

  function endPanelDrag(event: React.PointerEvent<HTMLElement>) {
    if (panelDragRef.current?.pointerId === event.pointerId) panelDragRef.current = null;
  }

  function startLauncherDrag(event: React.PointerEvent<HTMLButtonElement>) {
    const launcher = event.currentTarget.closest('[data-orbit-launcher]');
    if (!launcher) return;
    const bounds = launcher.getBoundingClientRect();
    launcherDragRef.current = {
      pointerId: event.pointerId,
      pointerX: event.clientX,
      pointerY: event.clientY,
      left: bounds.left,
      top: bounds.top,
      width: bounds.width,
      height: bounds.height,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveLauncherDrag(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = launcherDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.pointerX;
    const deltaY = event.clientY - drag.pointerY;
    if (Math.abs(deltaX) + Math.abs(deltaY) < 3) return;
    drag.moved = true;
    setLauncherPosition(clampToViewport(drag.left + deltaX, drag.top + deltaY, drag.width, drag.height));
  }

  function endLauncherDrag(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = launcherDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (drag.moved) {
      suppressLauncherClickRef.current = true;
      window.setTimeout(() => { suppressLauncherClickRef.current = false; }, 100);
    }
    launcherDragRef.current = null;
  }

  function handleLauncherClick() {
    if (suppressLauncherClickRef.current) {
      suppressLauncherClickRef.current = false;
      return;
    }
    openChat();
  }

  function openBooking() {
    trackEvent('orbit_guide_booking_clicked');
    if (bookingUrl.startsWith('http')) {
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    window.location.assign(bookingUrl);
  }

  function beginDiscovery(reply: string, response: string) {
    addMessage('user', reply);
    addMessage('assistant', `${response}\n\n${questions.goal}`);
    setStage('goal');
  }

  async function answerWebsiteQuestion(text: string) {
    const chatSession = chatSessionRef.current;
    addMessage('user', text);
    const instantReply = getOrbitGuideInstantReply(text);
    if (instantReply) {
      addMessage('assistant', instantReply);
      return;
    }

    setIsThinking(true);
    try {
      const conversation = [
        ...messages.map(({ role, content }) => ({ role, content })),
        { role: 'user' as const, content: text },
      ].slice(-8);
      const response = await fetch('/api/orbit-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-orbit-visitor': visitorIdRef.current,
        },
        body: JSON.stringify({ messages: conversation }),
      });
      if (chatSession !== chatSessionRef.current) return;
      const data = await response.json();
      addMessage('assistant', typeof data.reply === 'string' ? data.reply : 'Our team can help with that directly.');
      if (data.fallback) setShowHandoff(true);
    } catch {
      if (chatSession !== chatSessionRef.current) return;
      addMessage('assistant', 'I can’t check that right now. Our team can help directly.');
      setShowHandoff(true);
    } finally {
      if (chatSession === chatSessionRef.current) setIsThinking(false);
    }
  }

  function updateAnswer(key: keyof Answers, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function moveToNextStage(currentStage: Stage, value: string) {
    const answerKeys: Partial<Record<Stage, keyof Answers>> = {
      goal: 'goal',
      business: 'business',
      marketing: 'marketing',
      name: 'name',
      email: 'email',
      phone: 'phone',
      company: 'company',
    };
    const nextStages: Partial<Record<Stage, Stage>> = {
      goal: 'business',
      business: 'marketing',
      marketing: 'service',
      name: 'email',
      email: 'phone',
      phone: 'company',
      company: 'oneLineGoal',
    };

    const isServiceName = orbitGuideServices.some((service) =>
      [service.label, service.formValue].some((label) => label.toLowerCase() === value.trim().toLowerCase())
    );
    if (currentStage === 'name' && isServiceName) {
      addMessage('assistant', 'Please enter the contact person’s name, not a service name. You can enter your company or website in the next step.');
      return;
    }
    if (currentStage === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      addMessage('assistant', 'That email doesn’t look complete. Please enter a valid email address.');
      return;
    }
    if (currentStage === 'phone' && value.replace(/\D/g, '').length < 7) {
      addMessage('assistant', 'Please enter a phone number with at least 7 digits.');
      return;
    }

    const answerKey = answerKeys[currentStage];
    if (answerKey) updateAnswer(answerKey, value);
    addMessage('user', value);

    if (currentStage === 'company') {
      setStage('oneLineGoal');
      addMessage('assistant', questions.oneLineGoal || 'What would you like to achieve?');
      return;
    }

    const nextStage = nextStages[currentStage];
    if (nextStage) {
      setStage(nextStage);
      addMessage('assistant', questions[nextStage] || 'Tell me a little more.');
    }
  }

  async function submitLead(oneLineGoal: string) {
    const chatSession = chatSessionRef.current;
    const service = orbitGuideServices.find((item) => item.formValue === answers.service);
    const budget = orbitGuideBudgets.find((item) => item.value === answers.budget);
    if (!service || !budget) {
      setShowHandoff(true);
      addMessage('assistant', 'I couldn’t complete that step. Our team can help directly using the links below.');
      return;
    }

    setStage('submitting');
    setIsThinking(true);
    const mission = [
      `Primary goal: ${answers.goal}`,
      `Business: ${answers.business}`,
      `Current marketing: ${answers.marketing}`,
      `Interested service: ${service.label}`,
      `Monthly budget: ${budget.label}`,
      `One-line goal: ${oneLineGoal}`,
    ].join('\n');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: answers.name,
          email: answers.email,
          phone: answers.phone,
          company: answers.company,
          service: service.formValue,
          budget: budget.value,
          message: mission,
          source: 'chatbot',
          consent: true,
        }),
      });

      if (!response.ok) throw new Error('Lead submission failed');

      trackEvent('orbit_guide_lead_captured');
      if (chatSession !== chatSessionRef.current) return;
      setStage('complete');
      addMessage('assistant', `Thanks, ${answers.name}. Your details are with our team. Our team will get back to you shortly.`);
    } catch {
      if (chatSession !== chatSessionRef.current) return;
      setStage('consent');
      setShowHandoff(true);
      addMessage('assistant', 'I couldn’t send that just now. You can try again, or reach our team through WhatsApp or the contact page.');
    } finally {
      if (chatSession === chatSessionRef.current) setIsThinking(false);
    }
  }

  function handleChoice(choice: string) {
    if (stage === 'start') {
      if (choice === 'Book a free call') {
        openBooking();
      } else if (choice === 'Get more leads') {
        beginDiscovery(choice, 'SEO and Paid Advertising can help reach people actively looking for solutions. Social Media and Content can help build awareness and consideration.');
      } else if (choice === 'Our services') {
        beginDiscovery(choice, `We offer ${orbitGuideServices.map((service) => service.label).join(', ')}.`);
      } else {
        beginDiscovery(choice, 'Our process has five steps: Discovery Call, Strategy & Audit, Campaign Launch, Optimize & Scale, and Report & Grow. The first step is a free 20-minute call.');
      }
      return;
    }

    if (stage === 'service') {
      const service = orbitGuideServices.find((item) => item.label === choice);
      if (!service) return;
      addMessage('user', service.label);
      updateAnswer('service', service.formValue);
      setStage('budget');
      addMessage('assistant', questions.budget || 'What monthly budget range are you considering?');
      return;
    }

    if (stage === 'budget') {
      const budget = orbitGuideBudgets.find((item) => item.label === choice);
      if (!budget) return;
      addMessage('user', budget.label);
      updateAnswer('budget', budget.value);
      const recommendations = recommendOrbitGuideServices({
        goal: answers.goal,
        business: answers.business,
        marketing: answers.marketing,
        interestedService: answers.service,
      });
      addMessage('assistant', `Based on what you shared, consider ${formatServiceRecommendations(recommendations)}. ${questions.name}`);
      setStage('name');
      return;
    }

    if (stage === 'consent') {
      addMessage('user', choice);
      if (choice === 'Yes, share my details') {
        void submitLead(answers.oneLineGoal);
      } else {
        setStage('complete');
        addMessage('assistant', 'No problem. You can reach our team directly using the WhatsApp or contact links below.');
      }
    }
  }

  function handleTextSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || isThinking) return;
    setDraft('');

    if (stage === 'start') {
      void answerWebsiteQuestion(text);
      return;
    }

    if (stage === 'oneLineGoal') {
      addMessage('user', text);
      const recommendations = recommendOrbitGuideServices({
        goal: answers.goal,
        business: answers.business,
        marketing: answers.marketing,
        interestedService: answers.service,
      });
      addMessage('assistant', `I’d start with ${formatServiceRecommendations(recommendations)}. May I share your details with our team so they can follow up?`);
      setStage('consent');
      updateAnswer('oneLineGoal', text);
      return;
    }

    if (stage === 'goal' || stage === 'business' || stage === 'marketing' || stage === 'name' || stage === 'email' || stage === 'phone' || stage === 'company') {
      moveToNextStage(stage, text);
    }
  }

  if (pathname.startsWith('/admin')) return null;

  const quickReplies = stage === 'start'
    ? initialQuickReplies
    : stage === 'service'
      ? orbitGuideServices.map((service) => service.label)
      : stage === 'budget'
        ? orbitGuideBudgets.map((budget) => budget.label)
        : stage === 'consent'
          ? ['Yes, share my details', 'No, not now']
          : [];
  const acceptsText = ['start', 'goal', 'business', 'marketing', 'name', 'email', 'phone', 'company', 'oneLineGoal'].includes(stage);

  return (
    <>
      {(!isOpen || isMinimized) && (
        <div
          data-orbit-launcher
          className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3"
          style={launcherPosition ? { left: launcherPosition.left, top: launcherPosition.top, right: 'auto', bottom: 'auto' } : undefined}
        >
          {showTeaser && !isMinimized && (
            <button
              type="button"
              onClick={openChat}
              className="max-w-[260px] rounded-xl border border-primary/30 bg-card px-4 py-3 text-left text-sm text-foreground shadow-xl"
            >
              Hi, I’m Pixie! Let’s fuel your growth rocket. Ready?
            </button>
          )}
          <button
            type="button"
            onClick={handleLauncherClick}
            onPointerDown={startLauncherDrag}
            onPointerMove={moveLauncherDrag}
            onPointerUp={endLauncherDrag}
            onPointerCancel={endLauncherDrag}
            aria-label={isMinimized ? 'Restore Pixie chat' : 'Open Pixie chat'}
            className="flex h-14 w-14 touch-none cursor-grab items-center justify-center rounded-full bg-primary text-background shadow-[0_8px_28px_rgba(249,115,22,0.35)] transition-transform hover:scale-105 active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <Bot size={26} aria-hidden="true" />
          </button>
        </div>
      )}

      {isOpen && !isMinimized && (
        <section
          data-orbit-panel
          aria-label="Pixie chat"
          className="fixed inset-0 z-[90] flex h-[100dvh] flex-col overflow-hidden border border-border bg-background shadow-2xl sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(35rem,calc(100dvh-2.5rem))] sm:w-[min(22.5rem,calc(100vw-2.5rem))] sm:rounded-2xl"
          style={viewportWidth >= 640 && panelPosition ? { left: panelPosition.left, top: panelPosition.top, right: 'auto', bottom: 'auto' } : undefined}
        >
          <header
            onPointerDown={startPanelDrag}
            onPointerMove={movePanelDrag}
            onPointerUp={endPanelDrag}
            onPointerCancel={endPanelDrag}
            className="flex shrink-0 items-center justify-between border-b border-border bg-card px-4 py-3.5 sm:cursor-move"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <Sparkles size={19} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold text-foreground">Pixie</h2>
                <p className="text-xs text-muted-foreground">AI Assistant</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={startNewChat}
                aria-label="Start a new chat"
                title="New chat"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <Plus size={19} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={minimizeChat}
                aria-label="Minimize Pixie chat"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <Minus size={19} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => { setIsOpen(false); setIsMinimized(false); }}
                aria-label="Close Pixie chat"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4" role="log" aria-live="polite" aria-label="Chat messages">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p
                    className={`max-w-[88%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'rounded-br-md bg-primary text-background'
                        : 'rounded-bl-md border border-border bg-card text-foreground'
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              ))}
              {isThinking && (
                <p className="w-fit rounded-2xl border border-border bg-card px-3.5 py-2.5 text-sm text-muted-foreground" aria-label="Pixie is responding">
                  Thinking…
                </p>
              )}
              <div ref={messagesEndRef} />
            </div>

            {quickReplies.length > 0 && (
              <div className="flex max-h-36 shrink-0 flex-wrap gap-2 overflow-y-auto border-t border-border/60 px-4 py-3">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => handleChoice(reply)}
                    disabled={isThinking}
                    className="rounded-full border border-primary/30 bg-primary/5 px-3 py-2 text-left text-xs font-semibold text-foreground transition-colors hover:border-primary/60 hover:bg-primary/10 disabled:opacity-50"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {acceptsText && stage !== 'submitting' && (
              <form onSubmit={handleTextSubmit} className="flex shrink-0 items-center gap-2 border-t border-border px-3 py-3">
                <input
                  type={stage === 'email' ? 'email' : stage === 'phone' ? 'tel' : 'text'}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder={getPromptPlaceholder(stage)}
                  maxLength={180}
                  aria-label={stage === 'start' ? 'Ask Pixie a question' : questions[stage]}
                  disabled={isThinking}
                  className="min-w-0 flex-1 rounded-full border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary disabled:opacity-60"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!draft.trim() || isThinking}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={17} aria-hidden="true" />
                </button>
              </form>
            )}

            {!acceptsText && stage !== 'submitting' && stage !== 'complete' && (
              <div className="shrink-0 border-t border-border px-4 py-3 text-center text-xs text-muted-foreground">
                Choose an option above to continue.
              </div>
            )}

            {stage === 'complete' && (
              <div className="shrink-0 border-t border-border px-4 py-3 text-center text-xs text-muted-foreground">
                You’re all set. Reach us directly below any time.
              </div>
            )}

            <footer className="flex shrink-0 items-center justify-between gap-2 border-t border-border bg-card/70 px-3 py-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <MessageCircle size={14} aria-hidden="true" />
                WhatsApp
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {showHandoff ? 'Talk to a person' : 'Contact'}
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
              <a
                href={bookingUrl}
                target={bookingUrl.startsWith('http') ? '_blank' : undefined}
                rel={bookingUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={() => trackEvent('orbit_guide_booking_clicked')}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                <CalendarDays size={14} aria-hidden="true" />
                Book a call
              </a>
            </footer>
          </div>
        </section>
      )}
    </>
  );
}