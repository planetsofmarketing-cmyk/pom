export type PlanetTextureType = 'rock' | 'swirl' | 'earth' | 'bands';

const textureMaps = new Map<string, HTMLCanvasElement>();

export function createPlanetTextureMap(type: PlanetTextureType, colors: string[], width = 512, height = 256) {
  const key = JSON.stringify([type, colors, width, height]);
  const cached = textureMaps.get(key);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d')!;
  const random = (min: number, max: number) => min + Math.random() * (max - min);
  context.fillStyle = colors[0];
  context.fillRect(0, 0, width, height);

  if (type === 'bands') {
    for (let y = 0; y < height; y += 2) {
      context.fillStyle = colors[(Math.random() * colors.length) | 0];
      context.globalAlpha = 0.18;
      context.fillRect(0, y, width, random(2, 14));
    }
    context.globalAlpha = 0.35;
    for (let i = 0; i < 26; i++) {
      context.fillStyle = colors[(Math.random() * colors.length) | 0];
      context.beginPath();
      context.ellipse(random(0, width), random(0, height), random(20, 90), random(2, 7), 0, 0, 7);
      context.fill();
    }
  } else if (type === 'swirl') {
    for (let i = 0; i < 90; i++) {
      context.globalAlpha = 0.2;
      context.fillStyle = colors[1 + (i % 2)];
      context.beginPath();
      context.ellipse(random(0, width), random(0, height), random(30, 120), random(6, 20), random(-0.4, 0.4), 0, 7);
      context.fill();
    }
  } else if (type === 'earth') {
    context.fillStyle = colors[0];
    context.fillRect(0, 0, width, height);
    context.globalAlpha = 1;
    context.fillStyle = colors[1];
    for (let i = 0; i < 16; i++) {
      context.beginPath();
      context.ellipse(random(0, width), random(30, height - 30), random(14, 55), random(10, 30), random(0, 3), 0, 7);
      context.fill();
    }
    context.fillStyle = '#eef3f8';
    context.fillRect(0, 0, width, 12);
    context.fillRect(0, height - 12, width, 12);
    context.globalAlpha = 0.5;
    context.fillStyle = colors[2];
    for (let i = 0; i < 40; i++) {
      context.beginPath();
      context.ellipse(random(0, width), random(0, height), random(20, 70), random(3, 8), random(-0.3, 0.3), 0, 7);
      context.fill();
    }
  } else {
    for (let i = 0; i < 500; i++) {
      context.globalAlpha = 0.12;
      context.fillStyle = colors[(Math.random() * 3) | 0];
      context.fillRect(random(0, width), random(0, height), random(2, 18), random(2, 18));
    }
    for (let i = 0; i < 60; i++) {
      const x = random(0, width);
      const y = random(0, height);
      const radius = random(3, 16);
      context.globalAlpha = 0.35;
      context.fillStyle = colors[1];
      context.beginPath();
      context.arc(x, y, radius, 0, 7);
      context.fill();
      context.globalAlpha = 0.25;
      context.fillStyle = colors[2];
      context.beginPath();
      context.arc(x - radius * 0.25, y - radius * 0.25, radius * 0.7, 0, 7);
      context.fill();
    }
  }

  context.globalAlpha = 1;
  textureMaps.set(key, canvas);
  return canvas;
}

export function drawPlanetSphere(canvas: HTMLCanvasElement, type: PlanetTextureType, colors: string[]) {
  const context = canvas.getContext('2d');
  if (!context) return;

  const size = canvas.width;
  const texture = createPlanetTextureMap(type, colors);
  const textureContext = texture.getContext('2d')!;
  const texturePixels = textureContext.getImageData(0, 0, texture.width, texture.height);
  const image = context.createImageData(size, size);
  const radius = size / 2 - 1;
  const light = { x: -0.42, y: 0.55, z: 0.72 };
  const lightLength = Math.hypot(light.x, light.y, light.z);

  for (let y = 0; y < size; y++) {
    const normalY = (size / 2 - (y + 0.5)) / radius;
    for (let x = 0; x < size; x++) {
      const normalX = (x + 0.5 - size / 2) / radius;
      const depthSquared = 1 - normalX * normalX - normalY * normalY;
      if (depthSquared <= 0) continue;

      const normalZ = Math.sqrt(depthSquared);
      const u = (Math.atan2(normalX, normalZ) / (Math.PI * 2) + 1) % 1;
      const v = Math.acos(Math.max(-1, Math.min(1, normalY))) / Math.PI;
      const textureX = Math.floor(u * texture.width) % texture.width;
      const textureY = Math.min(texture.height - 1, Math.floor(v * texture.height));
      const source = (textureY * texture.width + textureX) * 4;
      const target = (y * size + x) * 4;
      const diffuse = Math.max(0, normalX * light.x + normalY * light.y + normalZ * light.z) / lightLength;
      const shade = (0.2 + diffuse * 0.8) * (0.48 + normalZ * 0.52);

      image.data[target] = texturePixels.data[source] * shade;
      image.data[target + 1] = texturePixels.data[source + 1] * shade;
      image.data[target + 2] = texturePixels.data[source + 2] * shade;
      image.data[target + 3] = 255;
    }
  }

  context.putImageData(image, 0, 0);
}