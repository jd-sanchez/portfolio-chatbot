import { useState, useEffect } from "react";

type Px = string | null;

const O = "#1e1b4b"; // dark outline
const A = "#6366f1"; // accent purple
const H = "#818cf8"; // highlight
const C = "#22d3ee"; // cyan eyes
const _ = null;

const OPEN: Px[][] = [
  [_, _, _, _, C, _, _, _, _, _], // antenna tip
  [_, _, _, O, O, O, _, _, _, _], // antenna
  [_, _, O, O, O, O, O, O, _, _], // head top
  [_, O, A, A, A, A, A, A, O, _],
  [_, O, A, H, A, A, H, A, O, _], // highlights
  [_, O, A, C, C, A, C, C, O, _], // eyes open
  [_, O, A, C, C, A, C, C, O, _], // eyes open
  [_, O, A, A, A, A, A, A, O, _],
  [_, O, A, O, O, O, O, A, O, _], // mouth
  [_, O, O, O, O, O, O, O, O, _], // head bottom
  [O, A, O, _, O, O, _, O, A, O], // arms / neck
  [_, _, O, A, A, A, A, O, _, _], // body
  [_, _, O, A, H, H, A, O, _, _], // body detail
  [_, _, O, O, O, O, O, O, _, _], // body bottom
  [_, _, O, A, _, _, A, O, _, _], // legs
  [_, _, O, O, _, _, O, O, _, _], // feet
];

// blink: row 5 eyes flush to body, row 6 eyes become dark line
const BLINK: Px[][] = OPEN.map((row, r) => {
  if (r === 5) return row.map(px => (px === C ? A : px));
  if (r === 6) return row.map(px => (px === C ? O : px));
  return [...row];
});

interface PixelSpriteProps {
  pixelSize?: number;
  className?: string;
}

export default function PixelSprite({ pixelSize = 5, className = "" }: PixelSpriteProps) {
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const schedule = () =>
      setTimeout(() => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 120);
      }, 2500 + Math.random() * 2000);

    const t = schedule();
    return () => clearTimeout(t);
  }, [blinking]);

  const sprite = blinking ? BLINK : OPEN;
  const cols = sprite[0].length;

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${pixelSize}px)`,
        imageRendering: "pixelated",
      }}
    >
      {sprite.flat().map((color, i) => (
        <div
          key={i}
          style={{ width: pixelSize, height: pixelSize, backgroundColor: color ?? "transparent" }}
        />
      ))}
    </div>
  );
}
