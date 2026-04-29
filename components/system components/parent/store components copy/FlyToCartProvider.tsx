"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

type Point = { x: number; y: number };

type FlyItem = {
  id: string;
  from: Point;
  to: Point;
  image?: string; // 👈 thumbnail
};

type FlyToCartContextValue = {
  cartRef: React.RefObject<HTMLElement | null>;
  flyFromElement: (fromEl: HTMLElement, image?: string) => void;
};

const FlyToCartContext = createContext<FlyToCartContextValue | null>(null);

function getCenter(el: HTMLElement): Point {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function uid() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function FlyToCartProvider({ children }: { children: React.ReactNode }) {
  const cartRef = useRef<HTMLElement | null>(null);
  const [flyItems, setFlyItems] = useState<FlyItem[]>([]);

  const flyFromElement = (fromEl: HTMLElement, image?: string) => {
    const cartEl = cartRef.current;
    if (!cartEl) return;

    const from = getCenter(fromEl);
    const to = getCenter(cartEl);

    setFlyItems((prev) => [...prev, { id: uid(), from, to, image }]);
  };

  const value = useMemo(() => ({ cartRef, flyFromElement }), []);

  const removeFlyItem = (id: string) => {
    setFlyItems((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <FlyToCartContext.Provider value={value}>
      {children}

      {/* Overlay */}
      <div className="pointer-events-none fixed inset-0 z-9999">
        <AnimatePresence>
          {flyItems.map((item) => {
            const dx = item.to.x - item.from.x;
            const dy = item.to.y - item.from.y;

            const midX = item.from.x + dx * 0.5;
            const midY = item.from.y + dy * 0.5 - 120;

            return (
              <motion.div
                key={item.id}
                initial={{
                  x: item.from.x,
                  y: item.from.y,
                  scale: 1,
                  opacity: 1,
                }}
                animate={{
                  x: [item.from.x, midX, item.to.x],
                  y: [item.from.y, midY, item.to.y],
                  scale: [1, 1, 0.2],
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                onAnimationComplete={() => removeFlyItem(item.id)}
                className="absolute left-0 top-0"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                {/* 👇 IMAGE OR FALLBACK */}
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    className="h-12 w-12 rounded-md object-cover shadow-xl"
                  />
                ) : (
                  <div className="h-4 w-4 rounded-full bg-[#FF5B5B]" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </FlyToCartContext.Provider>
  );
}

export function useFlyToCart() {
  const ctx = useContext(FlyToCartContext);
  if (!ctx)
    throw new Error("useFlyToCart must be used inside FlyToCartProvider");
  return ctx;
}
