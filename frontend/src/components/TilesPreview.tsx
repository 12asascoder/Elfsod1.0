import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/* =========================================
   GRADIENT ICON IMPORTS (VITE SAFE)
========================================= */

import heroDiscover from '../assets/HeroIcons/Hero-Discover.svg';
import heroDesign from '../assets/HeroIcons/Hero-Discover-1.svg';
import heroBook from '../assets/HeroIcons/Hero-Book.svg';
import heroMeasure from '../assets/HeroIcons/Hero-Measure.svg';

/* =========================================
   CONFIG
========================================= */

const GRID = {
  rows: 3,
  cols: 6,
  gap: '12px',
};

const ANIMATION = {
  interval: 6000,
  fadeDuration: 0.8,
};

/* =========================================
   GRADIENT CELLS
========================================= */

const GRADIENT_CELLS = [
  { row: 0, col: 4 },
  { row: 1, col: 2 },
  { row: 2, col: 1 },
  { row: 2, col: 4 },
];

const GRADIENTS = [
  'radial-gradient(518% 676% at -313% 0%, #71E9DC 0%, #A681F1 50%, #F27968 100%)',
  'radial-gradient(516% 685% at -103% -106%, #71E9DC 0%, #A681F1 50%, #F27968 100%)',
  'radial-gradient(516% 679% at 0% -214%, #71E9DC 0%, #A681F1 50%, #F27968 100%)',
  'radial-gradient(515% 672% at -312% -208%, #71E9DC 0%, #A681F1 50%, #F27968 100%)',
];

const GRADIENT_LABELS = [
  { title: 'Discover', subtitle: 'Ad Inventory', icon: heroDiscover },
  { title: 'Design', subtitle: 'Creative Ads', icon: heroDesign },
  { title: 'Book', subtitle: 'Campaign', icon: heroBook },
  { title: 'Measure', subtitle: 'Impact', icon: heroMeasure },
];

/* =========================================
   TYPES
========================================= */

interface TilePosition {
  row: number;
  col: number;
}

interface ImageTile {
  id: string;
  src: string;
  position: TilePosition;
}

/* =========================================
   TILE IMAGE DISCOVERY (VITE CORRECT)
========================================= */

const discoverImages = (): string[] => {
  return Array.from({ length: 27 }, (_, i) => {
    const idx = i + 1;
    const file =
      idx <= 9 ? `tile-${idx}.jpg` : `tile-${idx}.jpeg`;

    return new URL(`../assets/tiles/${file}`, import.meta.url).href;
  });
};

/* =========================================
   COMPONENT
========================================= */

export default function TilesPreview() {
  const [tiles, setTiles] = useState<ImageTile[]>([]);
  const [images, setImages] = useState<string[]>([]);

  /* Preload images */
  useEffect(() => {
    const imgs = discoverImages();
    setImages(imgs);

    imgs.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  /* Initialize grid */
  useEffect(() => {
    const imgs = discoverImages();
    const positions: TilePosition[] = [];

    for (let r = 0; r < GRID.rows; r++) {
      for (let c = 0; c < GRID.cols; c++) {
        if (!GRADIENT_CELLS.some(g => g.row === r && g.col === c)) {
          positions.push({ row: r, col: c });
        }
      }
    }

    const shuffled = [...imgs].sort(() => Math.random() - 0.5);

    setTiles(
      positions.map((pos, i) => ({
        id: `tile-${pos.row}-${pos.col}`,
        src: shuffled[i],
        position: pos,
      }))
    );
  }, []);

  /* Shuffle images */
  const shuffleTiles = useCallback(() => {
    setTiles(prev => {
      const shuffled = [...images].sort(() => Math.random() - 0.5);
      return prev.map((tile, i) => ({
        ...tile,
        src: shuffled[i],
      }));
    });
  }, [images]);

  useEffect(() => {
    if (!tiles.length) return;
    const timer = setInterval(shuffleTiles, ANIMATION.interval);
    return () => clearInterval(timer);
  }, [shuffleTiles, tiles.length]);

  /* Render grid */
  const renderGrid = () => {
    const grid = [];

    for (let r = 0; r < GRID.rows; r++) {
      for (let c = 0; c < GRID.cols; c++) {
        const key = `${r}-${c}`;
        const gradientCell = GRADIENT_CELLS.find(g => g.row === r && g.col === c);

        if (gradientCell) {
          const index = GRADIENT_CELLS.indexOf(gradientCell);
          const label = GRADIENT_LABELS[index];

          grid.push(
            <div
              key={key}
              className="tp-cell"
              style={{ background: GRADIENTS[index] }}
            >
              <div className="tp-gradient-content">
                <img src={label.icon} className="tp-icon" alt={label.title} />
                <div className="tp-title">{label.title}</div>
                <div className="tp-subtitle">{label.subtitle}</div>
              </div>
            </div>
          );
        } else {
          const tile = tiles.find(t => t.position.row === r && t.position.col === c);

          grid.push(
            <div key={key} className="tp-cell tp-image-cell">
              {tile && (
                <motion.img
                  key={tile.src}
                  src={tile.src}
                  className="tp-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: ANIMATION.fadeDuration }}
                />
              )}
            </div>
          );
        }
      }
    }

    return grid;
  };

  return (
    <section className="tp-wrapper">
      <div
        className="tp-grid"
        style={{
          gridTemplateColumns: `repeat(${GRID.cols}, 1fr)`,
          gridTemplateRows: `repeat(${GRID.rows}, 1fr)`,
          gap: GRID.gap,
        }}
      >
        {renderGrid()}
      </div>

      <style>{`
        .tp-wrapper {
          width: 100%;
          height: calc(100vh - 70px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
          overflow: hidden;
        }

        .tp-grid {
          display: grid;
          width: min(95vw, calc((100vh - 100px) * ${GRID.cols} / ${GRID.rows}));
          aspect-ratio: ${GRID.cols} / ${GRID.rows};
        }

        .tp-cell {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.35);
        }

        .tp-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          inset: 0;
        }

        .tp-gradient-content {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 1.5rem;
          color: white;
        }

        .tp-icon {
          width: 42px;
          margin-bottom: 0.75rem;
        }

        .tp-title {
          font-size: clamp(1.4rem, 2.5vw, 2.2rem);
          font-weight: 600;
        }

        .tp-subtitle {
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .tp-wrapper {
            height: auto;
            padding: 3rem 0;
          }
        }
      `}</style>
    </section>
  );
}
