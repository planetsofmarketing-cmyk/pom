import Link from 'next/link';
import SolarSystemScene from './SolarSystemScene';

const principles = ['Strategy first', 'One connected team', 'Clear reporting'];

/* sparse static stars, seeded so server and client render the same positions */
const STARS = (() => {
  let s = 11;
  const r = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  return Array.from({ length: 70 }, () => {
    const big = r() < 0.14;
    return {
      left: Number((r() * 100).toFixed(2)),
      top: Number((r() * 100).toFixed(2)),
      size: big ? 2 : 1,
      opacity: Number((0.12 + r() * 0.4).toFixed(2)),
    };
  });
})();

export default function HeroSection() {
  return (
    <section className="home-hero">
      <div className="home-hero-atmos" aria-hidden="true" />
      <div className="home-hero-stars" aria-hidden="true">
        {STARS.map((star, i) => (
          <i
            key={i}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Same centred container as the navbar and the rest of the page */}
      <div className="home-hero-inner">
        <div className="home-hero-copy">
          <div className="home-hero-eyebrow animate-fade-up">DIGITAL GROWTH PARTNER · HYDERABAD</div>

          <h1 className="home-hero-title animate-fade-up" style={{ animationDelay: '0.08s' }}>
            Every brand has its orbit.
            <span>We find yours.</span>
          </h1>

          <p className="home-hero-lead animate-fade-up" style={{ animationDelay: '0.16s' }}>
            A focused strategy across search, paid media, content, and brand, built to turn attention into lasting growth.
          </p>

          <div className="home-hero-cta animate-fade-up" style={{ animationDelay: '0.24s' }}>
            <Link href="/contact" className="pm-btn pm-btn-fill pm-btn-lg">
              Book a strategy call <span className="pm-arr">↗</span>
            </Link>
            <Link href="/services" className="pm-btn pm-btn-ghost">
              Explore our services <span className="pm-arr">↗</span>
            </Link>
          </div>

          <ul className="home-hero-ticks animate-fade-up" style={{ animationDelay: '0.32s' }}>
            {principles.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="home-hero-stage" aria-label="Interactive solar system of our marketing services">
          <SolarSystemScene />
        </div>
      </div>
    </section>
  );
}