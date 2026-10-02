'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  CONFIG                                                             */
/* ------------------------------------------------------------------ */

/**
 * true  -> clicking a planet zooms in, then opens that service page (same as the HTML).
 * false -> clicking a planet only shows the info panel + "Add to my plan" flow.
 * EDIT the `url` of each service below to match your real routes.
 */
const REDIRECT = true;

type TextureType = 'rock' | 'swirl' | 'earth' | 'bands';

type Body = {
  id: string;
  name: string;
  tag: string;
  pct: number;
  text: string;
  tags: string[];
  url: string;
};

type Planet = Body & {
  speed: number;
  type: TextureType;
  colors: string[];
  ring?: boolean;
};

const SUN: Body = {
  id: 'strategy',
  name: 'Growth Strategy',
  tag: 'The Sun',
  pct: 100,
  text: 'Everything orbits the plan. We start with audience research and clear goals, then point every channel at the same target.',
  tags: ['Audience research', 'Roadmap', 'Goals & KPIs'],
  url: '/services/growth-strategy',
};

const PLANETS: Planet[] = [
  { id: 'analytics', name: 'Analytics & Reporting', tag: 'Mercury', pct: 5, speed: 1.6, type: 'rock', colors: ['#8c8a86', '#5d5b58', '#b7b4ae'], text: 'Dashboards you can read in a minute. We track every lead and rupee back to the channel that earned it.', tags: ['GA4', 'Looker Studio', 'Attribution'], url: '/services/analytics-reporting' },
  { id: 'social', name: 'Social Media', tag: 'Venus', pct: 10, speed: 1.2, type: 'swirl', colors: ['#e8a65a', '#c76f2b', '#f6d49a'], text: 'Consistent, on-brand posting and community management that builds an audience who actually responds.', tags: ['Instagram', 'LinkedIn', 'Community'], url: '/services/social-media' },
  { id: 'content', name: 'Content Marketing', tag: 'Earth', pct: 18, speed: 0.95, type: 'earth', colors: ['#1f5fae', '#2f8f4e', '#fff'], text: 'Blogs, videos and guides that answer what your buyers search for, and keep working long after publishing.', tags: ['Blogs', 'Video', 'Lead magnets'], url: '/services/content-marketing' },
  { id: 'email', name: 'Email & CRO', tag: 'Mars', pct: 8, speed: 0.78, type: 'rock', colors: ['#b2482a', '#7a2c18', '#d98a5f'], text: 'Turn visitors into customers with nurture flows and landing pages tested against real behaviour.', tags: ['Automation', 'A/B testing', 'Landing pages'], url: '/services/email-cro' },
  { id: 'seo', name: 'SEO', tag: 'Jupiter', pct: 25, speed: 0.5, type: 'bands', colors: ['#d9b48a', '#a8714a', '#f2e1c8', '#8a5a3b'], text: 'The largest share of most plans. Technical fixes, local search and content that earn lasting rankings.', tags: ['Technical SEO', 'Local SEO', 'Link building'], url: '/services/seo' },
  { id: 'paid', name: 'Paid Media', tag: 'Saturn', pct: 22, speed: 0.38, type: 'bands', ring: true, colors: ['#e6cf9a', '#c9a96a', '#f5ead0', '#b99454'], text: 'Google, Meta and YouTube campaigns built around cost per customer, not clicks, and scaled when they work.', tags: ['Google Ads', 'Meta Ads', 'YouTube'], url: '/services/paid-media' },
  { id: 'branding', name: 'Branding & Design', tag: 'Neptune', pct: 12, speed: 0.28, type: 'bands', colors: ['#2e5be0', '#1c3a9e', '#6f95ff'], text: 'Identity, messaging and visuals that make you recognisable in a crowded market before anyone clicks.', tags: ['Identity', 'Messaging', 'Creative'], url: '/services/branding-design' },
];

const ALL: Body[] = [SUN, ...PLANETS];

/* planet radius from its share of a typical plan, then orbit distance / start angle */
const radiusFromShare = (pct: number) => 0.35 + pct * 0.04;
const SUN_RADIUS = 1.9;
const LAYOUT = (() => {
  let d = 3.6;
  return PLANETS.map((p, i) => {
    const r = radiusFromShare(p.pct);
    const prev = i ? radiusFromShare(PLANETS[i - 1].pct) : 0;
    d += i ? prev + r + 0.6 : r;
    return { r, orbit: d * 0.84, angle: i * 2.3 + 0.6 };
  });
})();

const ORBIT_OPACITY = 0.09;
const ORBIT_OPACITY_ON = 0.38;

/* ------------------------------------------------------------------ */
/*  PROCEDURAL TEXTURES (ported 1:1 from the HTML)                     */
/* ------------------------------------------------------------------ */

function makeTexture(type: TextureType, c: string[], w = 512, h = 256) {
  const k = document.createElement('canvas');
  k.width = w;
  k.height = h;
  const g = k.getContext('2d')!;
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);
  g.fillStyle = c[0];
  g.fillRect(0, 0, w, h);

  if (type === 'bands') {
    for (let y = 0; y < h; y += 2) {
      g.fillStyle = c[(Math.random() * c.length) | 0];
      g.globalAlpha = 0.18;
      g.fillRect(0, y, w, rnd(2, 14));
    }
    g.globalAlpha = 0.35;
    for (let i = 0; i < 26; i++) {
      g.fillStyle = c[(Math.random() * c.length) | 0];
      g.beginPath();
      g.ellipse(rnd(0, w), rnd(0, h), rnd(20, 90), rnd(2, 7), 0, 0, 7);
      g.fill();
    }
  } else if (type === 'swirl') {
    for (let i = 0; i < 90; i++) {
      g.globalAlpha = 0.2;
      g.fillStyle = c[1 + (i % 2)];
      g.beginPath();
      g.ellipse(rnd(0, w), rnd(0, h), rnd(30, 120), rnd(6, 20), rnd(-0.4, 0.4), 0, 7);
      g.fill();
    }
  } else if (type === 'earth') {
    g.fillStyle = c[0];
    g.fillRect(0, 0, w, h);
    g.globalAlpha = 1;
    g.fillStyle = c[1];
    for (let i = 0; i < 16; i++) {
      g.beginPath();
      g.ellipse(rnd(0, w), rnd(30, h - 30), rnd(14, 55), rnd(10, 30), rnd(0, 3), 0, 7);
      g.fill();
    }
    g.fillStyle = '#eef3f8';
    g.fillRect(0, 0, w, 12);
    g.fillRect(0, h - 12, w, 12);
    g.globalAlpha = 0.5;
    g.fillStyle = c[2];
    for (let i = 0; i < 40; i++) {
      g.beginPath();
      g.ellipse(rnd(0, w), rnd(0, h), rnd(20, 70), rnd(3, 8), rnd(-0.3, 0.3), 0, 7);
      g.fill();
    }
  } else {
    // rock: noise + craters
    for (let i = 0; i < 500; i++) {
      g.globalAlpha = 0.12;
      g.fillStyle = c[(Math.random() * 3) | 0];
      g.fillRect(rnd(0, w), rnd(0, h), rnd(2, 18), rnd(2, 18));
    }
    for (let i = 0; i < 60; i++) {
      const x = rnd(0, w);
      const y = rnd(0, h);
      const r = rnd(3, 16);
      g.globalAlpha = 0.35;
      g.fillStyle = c[1];
      g.beginPath();
      g.arc(x, y, r, 0, 7);
      g.fill();
      g.globalAlpha = 0.25;
      g.fillStyle = c[2];
      g.beginPath();
      g.arc(x - r * 0.25, y - r * 0.25, r * 0.7, 0, 7);
      g.fill();
    }
  }
  g.globalAlpha = 1;
  const t = new THREE.CanvasTexture(k);
  t.anisotropy = 4;
  return t;
}

function makeGlow(color: string, size: number) {
  const k = document.createElement('canvas');
  k.width = k.height = 256;
  const g = k.getContext('2d')!;
  const gr = g.createRadialGradient(128, 128, 10, 128, 128, 128);
  gr.addColorStop(0, color);
  gr.addColorStop(0.35, color.replace('1)', '.25)'));
  gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, 256, 256);
  const s = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(k),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  s.scale.set(size, size, 1);
  return s;
}

/* default camera distance: fit the outer orbit to the stage width */
const defaultDistance = (w: number, h: number) => {
  const aspect = h ? w / h : 1.2;
  return Math.min(80, Math.max(30, 22 / (Math.tan((21 * Math.PI) / 180) * aspect)));
};

type Live = {
  id: string;
  r: number;
  mesh: THREE.Mesh;
  speed: number;
  angle: number;
  pivot?: THREE.Group;
  orbit?: THREE.Mesh;
  halo?: THREE.Sprite;
};

type SceneApi = {
  focus: (id: string | null) => void;
  syncPicked: (ids: string[]) => void;
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function SolarSystemScene() {
  const router = useRouter();
  const vizRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef(new Map<string, HTMLButtonElement>());
  const apiRef = useRef<SceneApi | null>(null);
  const selRef = useRef<string | null>(null);
  const autoRef = useRef(false);

  const [autoOrbit, setAutoOrbit] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [plannedIds, setPlannedIds] = useState<string[]>([]);

  const selected = ALL.find((b) => b.id === selectedId) ?? null;
  const isSun = selected?.id === SUN.id;
  const canAdd = selected !== null && !isSun;
  const isPlanned = selected ? plannedIds.includes(selected.id) : false;
  const plannedBodies = PLANETS.filter((p) => plannedIds.includes(p.id));
  const willRedirect = REDIRECT && selected !== null;

  /* ---------------- three.js scene (runs once) ---------------- */
  useEffect(() => {
    const viz = vizRef.current;
    const cv = canvasRef.current;
    if (!viz || !cv) return;

    /*
     * The HTML was built on three r128 (no colour management, legacy lights).
     * Recreate that pipeline so planets look identical on modern three.
     * Restored on cleanup so the rest of your app is unaffected.
     */
    const prevColorManagement = THREE.ColorManagement.enabled;
    THREE.ColorManagement.enabled = false;

    const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(42, 1, 0.1, 400);

    // r155+ light units are x PI vs r128; decay 0 = no falloff (what r128 did with distance 0)
    scene.add(new THREE.AmbientLight(0x6b7494, 0.55 * Math.PI));
    const sunLight = new THREE.PointLight(0xffe2b0, 2.6 * Math.PI, 0, 0);
    scene.add(sunLight);

    const sys = new THREE.Group();
    sys.rotation.z = 0.05;
    scene.add(sys);

    const live = new Map<string, Live>();
    const planetsLive: Live[] = [];
    const meshes: THREE.Mesh[] = [];

    /* sun: textured, unlit, with corona + wide faint haze */
    const sunMesh = new THREE.Mesh(
      new THREE.SphereGeometry(SUN_RADIUS, 48, 48),
      new THREE.MeshBasicMaterial({ map: makeTexture('swirl', ['#ff9a1f', '#ffb84d', '#e8590c']) })
    );
    sunMesh.userData.id = SUN.id;
    sys.add(sunMesh);
    meshes.push(sunMesh);
    live.set(SUN.id, { id: SUN.id, r: SUN_RADIUS, mesh: sunMesh, speed: 0, angle: 0 });

    const corona = makeGlow('rgba(255,150,40,1)', SUN_RADIUS * 4.4);
    corona.material.opacity = 0.8;
    sys.add(corona);
    const haze = makeGlow('rgba(255,120,30,1)', SUN_RADIUS * 11);
    haze.material.opacity = 0.3;
    sys.add(haze);

    /* background stars */
    {
      const n = 520;
      const p = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const r = 80 + Math.random() * 80;
        const a = Math.random() * 6.28;
        const b = Math.acos(2 * Math.random() - 1);
        p[i * 3] = r * Math.sin(b) * Math.cos(a);
        p[i * 3 + 1] = r * Math.cos(b);
        p[i * 3 + 2] = r * Math.sin(b) * Math.sin(a);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(p, 3));
      scene.add(
        new THREE.Points(
          g,
          new THREE.PointsMaterial({ color: 0xffffff, size: 0.38, sizeAttenuation: true, transparent: true, opacity: 0.5 })
        )
      );
    }

    /* planets, orbit lines, rings, atmosphere, selection halo */
    PLANETS.forEach((s, i) => {
      const { r, orbit: d, angle } = LAYOUT[i];

      const orbit = new THREE.Mesh(
        new THREE.RingGeometry(d - 0.03, d + 0.03, 180),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: ORBIT_OPACITY, side: THREE.DoubleSide, depthWrite: false })
      );
      orbit.rotation.x = -Math.PI / 2;
      sys.add(orbit);

      const pivot = new THREE.Group();
      sys.add(pivot);

      const m = new THREE.Mesh(
        new THREE.SphereGeometry(r, 48, 48),
        new THREE.MeshStandardMaterial({ map: makeTexture(s.type, s.colors), roughness: 0.9, metalness: 0 })
      );
      m.position.x = d;
      m.rotation.z = 0.2;
      m.userData.id = s.id;
      pivot.add(m);
      meshes.push(m);

      if (s.ring) {
        const rg = new THREE.RingGeometry(r * 1.35, r * 2.3, 96);
        const pos = rg.attributes.position;
        const uv = rg.attributes.uv;
        const v = new THREE.Vector3();
        for (let j = 0; j < pos.count; j++) {
          v.fromBufferAttribute(pos, j);
          uv.setXY(j, (v.length() - r * 1.35) / (r * 0.95), 0.5);
        }
        const k = document.createElement('canvas');
        k.width = 256;
        k.height = 4;
        const g = k.getContext('2d')!;
        for (let x = 0; x < 256; x++) {
          const a = x % 53 < 6 || (x > 200 && x < 215) ? 0.05 : 0.75 - x / 420;
          g.fillStyle = `rgba(222,200,150,${a})`;
          g.fillRect(x, 0, 1, 4);
        }
        const ring = new THREE.Mesh(
          rg,
          new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(k), transparent: true, side: THREE.DoubleSide, depthWrite: false })
        );
        ring.rotation.x = Math.PI / 2 + 0.1;
        m.add(ring);
      }

      if (s.type === 'earth') {
        m.add(
          new THREE.Mesh(
            new THREE.SphereGeometry(r * 1.06, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0x6aa8ff, transparent: true, opacity: 0.16, side: THREE.BackSide })
          )
        );
      }

      const halo = makeGlow('rgba(244,122,11,1)', r * 3.6);
      halo.visible = false;
      m.add(halo);

      const entry: Live = { id: s.id, r, mesh: m, speed: s.speed, angle, pivot, orbit, halo };
      live.set(s.id, entry);
      planetsLive.push(entry);
    });

    /* ---------- camera control ---------- */
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let theta = 0.5;
    let phi = 1.05;
    let rad = 34;
    let tR = 34;
    const tgt = new THREE.Vector3();
    const tTgt = new THREE.Vector3();
    let drag = false;
    let lx = 0;
    let ly = 0;
    let moved = 0;
    let pd = 0;
    const ptrs = new Map<number, { x: number; y: number }>();
    const pdist = () => {
      const a = [...ptrs.values()];
      return Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
    };
    const zoomTo = (v: number) => {
      tR = Math.min(90, Math.max(8, v));
      const sel = selRef.current ? live.get(selRef.current) : null;
      if (sel) tR = Math.max(tR, sel.r * 3);
    };

    const ray = new THREE.Raycaster();
    const mv = new THREE.Vector2();
    const pick = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mv.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(mv, cam);
      const hit = ray.intersectObjects(meshes, false)[0];
      setSelectedId(hit ? (hit.object.userData.id as string) : null);
    };

    const onDown = (e: PointerEvent) => {
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      drag = true;
      moved = 0;
      lx = e.clientX;
      ly = e.clientY;
      cv.setPointerCapture(e.pointerId);
      if (ptrs.size === 2) {
        pd = pdist();
        moved = 99;
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (ptrs.size === 2) {
        const nd = pdist();
        if (pd && nd) zoomTo((tR * pd) / nd);
        pd = nd;
        return;
      }
      if (!drag) return;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      theta -= dx * 0.006;
      phi = Math.min(1.5, Math.max(0.25, phi - dy * 0.005));
    };
    const onUp = (e: PointerEvent) => {
      const was = ptrs.size;
      ptrs.delete(e.pointerId);
      drag = false;
      if (was === 1 && moved < 5) pick(e);
    };
    const onCancel = (e: PointerEvent) => {
      ptrs.delete(e.pointerId);
      drag = false;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomTo(tR + e.deltaY * 0.02);
    };
    cv.addEventListener('pointerdown', onDown);
    cv.addEventListener('pointermove', onMove);
    cv.addEventListener('pointerup', onUp);
    cv.addEventListener('pointercancel', onCancel);
    cv.addEventListener('wheel', onWheel, { passive: false });

    /* ---------- API used by React state ---------- */
    const markOrbits = (id: string | null) =>
      planetsLive.forEach((p) => {
        (p.orbit!.material as THREE.MeshBasicMaterial).opacity = p.id === id ? ORBIT_OPACITY_ON : ORBIT_OPACITY;
      });

    apiRef.current = {
      focus(id) {
        markOrbits(id);
        if (id === null) {
          tR = defaultDistance(viz.clientWidth, viz.clientHeight);
          tTgt.set(0, 0, 0);
        } else if (id === SUN.id) {
          tR = 10;
        } else {
          tR = Math.max((live.get(id)?.r ?? 1) * 4.2, 5);
        }
      },
      syncPicked(ids) {
        planetsLive.forEach((p) => {
          if (p.halo) p.halo.visible = ids.includes(p.id);
        });
      },
    };

    /* ---------- resize ---------- */
    const resize = () => {
      const w = viz.clientWidth;
      const h = viz.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      if (window.innerWidth > 1024) cam.setViewOffset(w, h, 0, h * 0.05, w, h);
      else cam.clearViewOffset();
      cam.updateProjectionMatrix();
      if (!selRef.current) tR = defaultDistance(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(viz);
    resize();
    rad = tR;

    /* ---------- loop ---------- */
    const clock = new THREE.Clock();
    const v3 = new THREE.Vector3();
    const speedScale = reduce ? 0.25 : 1;
    let raf = 0;

    type LabelItem = { id: string; x: number; y: number; w: number };
    type BodyPoint = { id: string; x: number; y: number; r: number };

    const frame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const auto = autoRef.current;
      const sel = selRef.current;

      if (auto) sunMesh.rotation.y += dt * 0.1 * speedScale;
      planetsLive.forEach((p) => {
        if (auto && p.id !== sel) {
          p.angle += dt * 0.18 * p.speed * speedScale;
          p.mesh.rotation.y += dt * 0.4 * speedScale;
        }
        p.pivot!.rotation.y = -p.angle;
      });

      if (sel && sel !== SUN.id) live.get(sel)?.mesh.getWorldPosition(tTgt);
      else tTgt.set(0, 0, 0);
      tgt.lerp(tTgt, 0.08);
      rad += (tR - rad) * 0.07;

      cam.position.set(
        tgt.x + rad * Math.sin(phi) * Math.sin(theta),
        tgt.y + rad * Math.cos(phi),
        tgt.z + rad * Math.sin(phi) * Math.cos(theta)
      );
      cam.lookAt(tgt);
      if (auto && !drag && !sel && !reduce) theta += dt * 0.03;
      renderer.render(scene, cam);

      /* labels: sit below their planet, never collide, stay inside the viewport */
      const w = viz.clientWidth;
      const h = viz.clientHeight;
      const items: LabelItem[] = [];
      const bodies: BodyPoint[] = [];
      live.forEach((l) => {
        const btn = labelRefs.current.get(l.id);
        if (!btn) return;
        l.mesh.getWorldPosition(v3);
        const dist = v3.distanceTo(cam.position);
        v3.project(cam);
        if (v3.z >= 1) {
          btn.style.display = 'none';
          return;
        }
        btn.style.display = '';
        const px = (v3.x * 0.5 + 0.5) * w;
        const py = (-v3.y * 0.5 + 0.5) * h;
        const pr = (l.r / dist) * h * 1.3;
        bodies.push({ id: l.id, x: px, y: py, r: pr });
        items.push({ id: l.id, x: px, y: py + pr + 8, w: btn.offsetWidth });
      });

      for (let pass = 0; pass < 2; pass++) {
        items.forEach((i) =>
          bodies.forEach((b) => {
            if (b.id === i.id) return;
            const cx = Math.min(i.x + i.w / 2, Math.max(i.x - i.w / 2, b.x));
            const cy = Math.min(i.y + 16, Math.max(i.y, b.y));
            if (Math.hypot(cx - b.x, cy - b.y) < b.r + 2) i.y = b.y + b.r + 4;
          })
        );
      }
      items.sort((a, b) => a.y - b.y);
      for (let i = 1; i < items.length; i++) {
        for (let j = 0; j < i; j++) {
          const a = items[i];
          const b = items[j];
          if (Math.abs(a.x - b.x) < (a.w + b.w) / 2 + 6 && a.y - b.y < 19 && a.y >= b.y - 19) a.y = b.y + 19;
        }
      }
      items.forEach((i) => {
        const x = Math.min(w - i.w / 2 - 8, Math.max(i.w / 2 + 8, i.x));
        const y = Math.min(h - 24, i.y);
        const btn = labelRefs.current.get(i.id);
        if (btn) btn.style.transform = `translate(${x - i.w / 2}px,${y}px)`;
      });

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      cv.removeEventListener('pointerdown', onDown);
      cv.removeEventListener('pointermove', onMove);
      cv.removeEventListener('pointerup', onUp);
      cv.removeEventListener('pointercancel', onCancel);
      cv.removeEventListener('wheel', onWheel);
      apiRef.current = null;

      scene.traverse((obj) => {
        const o = obj as THREE.Mesh | THREE.Points | THREE.Sprite;
        if ('geometry' in o && o.geometry) o.geometry.dispose();
        const mat = (o as THREE.Mesh).material;
        if (mat) {
          (Array.isArray(mat) ? mat : [mat]).forEach((m) => {
            (m as THREE.MeshBasicMaterial).map?.dispose();
            m.dispose();
          });
        }
      });
      renderer.dispose();
      THREE.ColorManagement.enabled = prevColorManagement;
    };
  }, []);

  /* ---------------- React state -> scene ---------------- */
  useEffect(() => {
    selRef.current = selectedId;
    apiRef.current?.focus(selectedId);

    if (!REDIRECT || !selectedId) return;
    const url = ALL.find((b) => b.id === selectedId)?.url;
    if (!url) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(() => router.push(url), reduced ? 300 : 1100);
    return () => window.clearTimeout(t);
  }, [selectedId, router]);

  useEffect(() => {
    apiRef.current?.syncPicked(plannedIds);
  }, [plannedIds]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ---------------- handlers ---------------- */
  const toggleAuto = () => {
    const next = !autoRef.current;
    autoRef.current = next;
    setAutoOrbit(next);
  };

  const togglePlan = () => {
    if (!selected || isSun) return;
    setPlannedIds((cur) => (cur.includes(selected.id) ? cur.filter((id) => id !== selected.id) : [...cur, selected.id]));
  };

  const requestHref = `/contact?services=${encodeURIComponent(plannedBodies.map((p) => p.name).join(','))}`;

  /* ---------------- render ---------------- */
  return (
    <>
      <div className="solar-viz" ref={vizRef}>
        <canvas
          ref={canvasRef}
          className="solar-canvas"
          aria-label="Animated solar system of marketing services. Drag to rotate, scroll to zoom, or select a service."
        />

        <div className={`solar-labels${selectedId ? ' has-sel' : ''}`}>
          {ALL.map((b) => {
            const picked = plannedIds.includes(b.id);
            return (
              <button
                key={b.id}
                type="button"
                ref={(el) => {
                  if (el) labelRefs.current.set(b.id, el);
                  else labelRefs.current.delete(b.id);
                }}
                onClick={() => setSelectedId(b.id)}
                aria-pressed={selectedId === b.id}
                className={`solar-lbl${b.id === SUN.id ? ' sun' : ''}${picked ? ' picked' : ''}${selectedId === b.id ? ' on' : ''}`}
              >
                {picked ? '✓ ' : ''}
                {b.name}
              </button>
            );
          })}
        </div>

        <div className="solar-hint">
          Drag to rotate<span className="solar-desktop-only"> · scroll to zoom</span> · click a planet
        </div>

        <div className="solar-tools">
          <button type="button" className="pm-btn pm-btn-sm" onClick={toggleAuto} aria-pressed={autoOrbit}>
            Auto-orbit: {autoOrbit ? 'on' : 'off'}
          </button>
          {selectedId && (
            <button type="button" className="pm-btn pm-btn-sm" onClick={() => setSelectedId(null)}>
              Back to full system
            </button>
          )}
        </div>

        {plannedBodies.length > 0 && (
          <div className="solar-plan">
            <span>Your plan</span>
            <div className="solar-tray">
              {plannedBodies.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="solar-chip"
                  title="Remove"
                  onClick={() => setPlannedIds((cur) => cur.filter((id) => id !== p.id))}
                >
                  {p.name} ×
                </button>
              ))}
            </div>
            <Link href={requestHref} className="pm-btn pm-btn-fill">
              Request {plannedBodies.length} service{plannedBodies.length > 1 ? 's' : ''} <span className="pm-arr">↗</span>
            </Link>
          </div>
        )}
      </div>

      <div className="solar-info" aria-live="polite">
        <h2>
          {selected ? selected.name : 'Our marketing solar system'}
          {selected && <em>{selected.tag}</em>}
        </h2>
        <p>
          {selected
            ? selected.text
            : 'Each planet is a service, and its size shows its share of a typical growth plan. Turn the system, open a planet to read about it, then add the ones you need to your plan.'}
        </p>
        <div className="solar-tags">
          {(selected ? selected.tags : ['7 services', '1 strategy']).map((t) => (
            <b key={t}>{t}</b>
          ))}
        </div>
        <div className="solar-act">
          {canAdd && (
            <button type="button" onClick={togglePlan} className={`pm-btn pm-btn-sm${isPlanned ? '' : ' pm-btn-fill'}`}>
              {isPlanned ? 'Remove from my plan' : 'Add to my plan'}
            </button>
          )}
        </div>
        <div className="solar-size">
          <strong>{!selected ? '7' : isSun ? 'Core' : `${selected.pct}%`}</strong>
          <span>
            {!selected
              ? 'planets in your orbit'
              : willRedirect
                ? 'Opening service page… (Esc to cancel)'
                : isSun
                  ? 'Every channel orbits the strategy'
                  : 'of a typical growth plan · planet size'}
          </span>
        </div>
      </div>
    </>
  );
}