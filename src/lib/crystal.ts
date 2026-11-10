// FNV-1a 32-bit string hash used as a deterministic seed per repository name.
function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash = Math.imul(hash ^ input.charCodeAt(i), 16777619);
  }
  return hash >>> 0;
}

// Mulberry32 deterministic PRNG so every build renders the exact same crystal per repo.
function createRng(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface CrystalOptions {
  seedName: string;
  language?: string;
  size?: number;
}

const LANGUAGE_SYMMETRY: Record<string, number> = {
  Python: 6,
  PHP: 6,
  Java: 8,
  JavaScript: 6,
  Solidity: 6,
};

export function generateCrystalSvgMarkup({
  seedName,
  language = 'Python',
  size = 220,
}: CrystalOptions): string {
  const rand = createRng(hashString(`${seedName}:${language}`));
  const center = size / 2;
  const armLength = center * 0.84;
  const arms = LANGUAGE_SYMMETRY[language] ?? 6;
  const branchCount = 2 + Math.floor(rand() * 3);
  const innerPolygonRadius = armLength * (0.2 + rand() * 0.14);

  let singleArmPath = `M 0 0 L 0 ${-armLength.toFixed(2)}`;

  for (let i = 1; i <= branchCount; i++) {
    const distance = -armLength * (i / (branchCount + 0.85));
    const branchLen = armLength * (0.16 + rand() * 0.24);
    const angle = 0.52 + rand() * 0.42;
    const dx = (branchLen * Math.sin(angle)).toFixed(2);
    const dy = (-branchLen * Math.cos(angle)).toFixed(2);
    const yPos = distance.toFixed(2);

    singleArmPath += ` M 0 ${yPos} l ${dx} ${dy} M 0 ${yPos} l ${-dx} ${dy}`;
  }

  const tipRadius = (2.2 + rand() * 2).toFixed(2);
  const angleStep = 360 / arms;

  const armGroups = Array.from({ length: arms }, (_, idx) => {
    const deg = (idx * angleStep).toFixed(1);
    return `<g transform="translate(${center} ${center}) rotate(${deg})"><path class="crystal-arm" pathLength="1" d="${singleArmPath}" /><circle cx="0" cy="${-armLength.toFixed(2)}" r="${tipRadius}" fill="currentColor" stroke="none" /></g>`;
  }).join('');

  const polygonPoints = Array.from({ length: arms }, (_, idx) => {
    const rad = ((idx * angleStep - 90) * Math.PI) / 180;
    const px = (center + innerPolygonRadius * Math.cos(rad)).toFixed(2);
    const py = (center + innerPolygonRadius * Math.sin(rad)).toFixed(2);
    return `${px},${py}`;
  }).join(' ');

  return `<polygon points="${polygonPoints}" stroke-opacity="0.55" fill="currentColor" fill-opacity="0.07" />${armGroups}<circle cx="${center}" cy="${center}" r="3.5" fill="currentColor" stroke="none" />`;
}

