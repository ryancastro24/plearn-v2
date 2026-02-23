"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Single-component demo:
 * - Product card with "Add to cart"
 * - Cart icon (top-right)
 * - Click -> a small "dot" flies from the button to the cart icon
 *
 * Notes:
 * - Works best when this component is mounted in a normal page layout.
 * - Uses a fixed overlay layer so the flying dot isn't clipped by containers.
 */
export default function FlyToCartDemo() {
  const cartRef = useRef<HTMLButtonElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const [cartCount, setCartCount] = useState(0);

  type FlyItem = {
    id: string;
    from: { x: number; y: number };
    to: { x: number; y: number };
  };

  const [flyItems, setFlyItems] = useState<FlyItem[]>([]);

  // Helper: get element center point in viewport coords
  const getCenter = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  // If the user scrolls/resizes while animations are mid-flight,
  // our stored coords can drift. This keeps it more accurate for future clicks.
  useLayoutEffect(() => {
    const onChange = () => {
      // no-op: we just want layout settled; coords computed on click
    };
    window.addEventListener("resize", onChange);
    window.addEventListener("scroll", onChange, { passive: true });
    return () => {
      window.removeEventListener("resize", onChange);
      window.removeEventListener("scroll", onChange);
    };
  }, []);

  const handleAddToCart = () => {
    const cartEl = cartRef.current;
    const btnEl = btnRef.current;

    if (!cartEl || !btnEl) return;

    const from = getCenter(btnEl);
    const to = getCenter(cartEl);

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    setFlyItems((prev) => [...prev, { id, from, to }]);

    // Update cart count immediately (or you can do it after animation completes)
    setCartCount((c) => c + 1);
  };

  const removeFlyItem = (id: string) => {
    setFlyItems((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="min-h-[80vh] bg-neutral-950 text-neutral-100 p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          Fly-to-Cart (Next.js + Framer Motion)
        </h1>

        <button
          ref={cartRef}
          className="relative inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 ring-1 ring-neutral-800"
          aria-label="Cart"
        >
          <span className="text-xl">🛒</span>
          <span className="text-sm">Cart</span>
          <span className="ml-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-neutral-100 px-2 text-xs font-semibold text-neutral-900">
            {cartCount}
          </span>
        </button>
      </div>

      {/* Product card */}
      <div className="mt-10 max-w-md">
        <div className="rounded-2xl bg-neutral-900 p-5 ring-1 ring-neutral-800 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-xl bg-linear-to-br from-indigo-500/70 to-fuchsia-500/70" />
            <div className="flex-1">
              <p className="text-sm text-neutral-400">Sample Product</p>
              <h2 className="text-xl font-semibold leading-tight">
                Cozy Hoodie (Demo)
              </h2>
              <p className="mt-1 text-sm text-neutral-300">
                Click add to cart to see the fly animation.
              </p>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-base font-semibold">₱ 999</p>
                <button
                  ref={btnRef}
                  onClick={handleAddToCart}
                  className="rounded-xl bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-200 active:scale-[0.98] transition"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flying overlay layer */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <AnimatePresence>
          {flyItems.map((item) => {
            const dx = item.to.x - item.from.x;
            const dy = item.to.y - item.from.y;

            // Simple "arc" feel: add a little upward lift mid-flight
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
                  // 3-point path (start -> mid -> end)
                  x: [item.from.x, midX, item.to.x],
                  y: [item.from.y, midY, item.to.y],
                  scale: [1, 1, 0.2],
                  opacity: [1, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
                onAnimationComplete={() => removeFlyItem(item.id)}
                className="absolute left-0 top-0"
                style={{
                  // Center the dot on the coordinate
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* The flying "item" */}
                <div className="h-4 w-4 rounded-full bg-neutral-100 shadow-[0_0_0_6px_rgba(255,255,255,0.08)]" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <p className="mt-10 text-sm text-neutral-400 max-w-xl">
        Tip: Instead of a dot, you can fly a mini product image by rendering an
        <span className="text-neutral-200">
          {" "}
          absolutely-positioned clone
        </span>{" "}
        (e.g., a small square thumbnail) in the overlay and animating it the
        same way.
      </p>
    </div>
  );
}
