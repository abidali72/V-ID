/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { motion, type Variants, useScroll, useSpring } from 'framer-motion';
import { DrawerType, ShopItem, CartItem, ToastMessage } from './types';
import { BG_IMAGE_1 } from './data';
import { ImageRevealBackground } from './components/ImageRevealBackground';
import { CustomCursor } from './components/CustomCursor';
import { SideDrawer } from './components/SideDrawer';
import { Toast } from './components/Toast';
import {
  CheckerboardSVG,
  WireframeGlobeSVG,
  CornerBracketSVG,
} from './components/SVGs';

const heroStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const heroFadeUpItem: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function App() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleAddToCart = useCallback(
    (item: ShopItem) => {
      setCart((prev) => {
        const existing = prev.find((entry) => entry.item.id === item.id);
        if (existing) {
          return prev.map((entry) =>
            entry.item.id === item.id
              ? { ...entry, quantity: entry.quantity + 1 }
              : entry
          );
        }
        return [...prev, { item, quantity: 1 }];
      });
      addToast(`Added "${item.title}" to your shopping bag.`);
    },
    [addToast]
  );

  const handleRemoveFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((entry) => entry.item.id !== itemId));
  }, []);

  const handleCheckout = useCallback(() => {
    addToast('Order submitted successfully!');
    setCart([]);
    setActiveDrawer(null);
  }, [addToast]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      id="lgpsm-landing-root"
      className="min-h-screen bg-white text-black font-jakarta flex flex-col justify-between relative overflow-x-hidden select-none"
    >
      {/* Fixed Scroll Progress Bar at very top of screen */}
      <motion.div
        id="scroll-progress-bar"
        role="progressbar"
        aria-label="Scroll progress"
        className="fixed top-0 left-0 right-0 h-[2px] bg-black origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Custom Minimal Circular Cursor Follower */}
      <CustomCursor />

      {/* Desktop Interactive Dual-Image Reveal Canvas Background */}
      <ImageRevealBackground />

      {/* Header (z-20) */}
      <header
        id="lgpsm-header"
        className="z-20 flex items-center justify-between relative"
        style={{
          paddingInline: 'var(--pad-x)',
          paddingTop: 'var(--header-pt)',
          paddingBottom: 'var(--section-gap)',
        }}
      >
        {/* Logo (left) */}
        <button
          id="brand-logo-btn"
          onClick={() => setActiveDrawer(null)}
          className="flex items-center font-orbitron font-black text-black tracking-[0.15em] hover:opacity-80 transition-opacity focus:outline-none cursor-pointer"
          style={{ fontSize: 'var(--logo)' }}
          aria-label="LGPSM Home"
        >
          <span>LGPSM</span>
          <span
            className="inline-block -mt-0.5 ml-0.5 font-bold"
            style={{ fontSize: 'var(--logo-deg)' }}
          >
            ˚
          </span>
        </button>

        {/* Nav (right) */}
        <nav
          id="main-navigation"
          className="flex items-center font-jakarta font-medium uppercase tracking-[0.2em]"
          style={{
            fontSize: 'var(--nav)',
            gap: 'var(--gap-nav)',
          }}
        >
          <button
            id="nav-shop-btn"
            onClick={() => setActiveDrawer('SHOP')}
            className="hover:opacity-50 transition-opacity focus:outline-none cursor-pointer"
          >
            SHOP
          </button>
          <button
            id="nav-collections-btn"
            onClick={() => setActiveDrawer('COLLECTIONS')}
            className="hover:opacity-50 transition-opacity focus:outline-none cursor-pointer"
          >
            COLLECTIONS
          </button>
          <button
            id="nav-journal-btn"
            onClick={() => setActiveDrawer('JOURNAL')}
            className="hover:opacity-50 transition-opacity focus:outline-none cursor-pointer"
          >
            JOURNAL
          </button>

          {/* Gray Divider */}
          <span className="text-gray-300 select-none" aria-hidden="true">
            |
          </span>

          {/* Cart Trigger with Count Badge */}
          <button
            id="nav-cart-btn"
            onClick={() => setActiveDrawer('CART')}
            className="relative hover:opacity-50 transition-opacity focus:outline-none cursor-pointer flex items-center justify-center p-1"
            aria-label="Shopping Bag"
          >
            <ShoppingBag
              strokeWidth={1.5}
              style={{
                width: 'var(--icon)',
                height: 'var(--icon)',
              }}
            />
            {totalCartCount > 0 && (
              <span
                id="cart-count-badge"
                className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center font-jakarta ring-2 ring-white"
              >
                {totalCartCount}
              </span>
            )}
          </button>
        </nav>
      </header>

      {/* Main Hero (flex-1) */}
      <main
        id="lgpsm-hero-main"
        className="flex-1 z-10 flex flex-col justify-between lg:flex-row items-stretch lg:items-center relative"
        style={{
          paddingInline: 'var(--pad-x)',
          paddingBlock: 'var(--main-py)',
        }}
      >
        {/* Left block (vertically centered) */}
        <motion.div
          id="hero-left-block"
          className="flex flex-col justify-center items-start relative max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={heroStaggerContainer}
        >
          {/* Top-left L-corner bracket */}
          <motion.div variants={heroFadeUpItem} className="mb-2 text-black">
            <CornerBracketSVG position="TL" id="bracket-tl-hero" />
          </motion.div>

          {/* Headline */}
          <h1
            id="hero-headline"
            className="font-orbitron font-extrabold uppercase text-black"
            style={{
              fontSize: 'var(--headline)',
              letterSpacing: '0.08em',
              lineHeight: 1.05,
            }}
          >
            <motion.div variants={heroFadeUpItem}>FUTURE</motion.div>
            <motion.div variants={heroFadeUpItem}>FORWARD</motion.div>
            <motion.div
              variants={heroFadeUpItem}
              className="flex items-center flex-wrap gap-x-3 gap-y-1"
            >
              <span>FASHION</span>
              <CheckerboardSVG id="hero-checkerboard" />
            </motion.div>
          </h1>

          {/* Bottom-left L-corner bracket */}
          <motion.div variants={heroFadeUpItem} className="mt-2 mb-6 text-black">
            <CornerBracketSVG position="BL" id="bracket-bl-hero" />
          </motion.div>

          {/* CTA button */}
          <motion.button
            id="hero-shop-cta-btn"
            variants={heroFadeUpItem}
            onClick={() => setActiveDrawer('SHOP')}
            className="group inline-flex items-center border border-gray-400 rounded-md uppercase font-jakarta font-semibold tracking-[0.18em] transition-all duration-200 hover:bg-black hover:text-white hover:border-black cursor-pointer shadow-xs"
            style={{
              fontSize: 'var(--body)',
              paddingInline: 'var(--btn-px)',
              paddingBlock: 'var(--btn-py)',
              gap: 'var(--btn-gap)',
            }}
          >
            <span>SHOP NOW</span>
            <ArrowUpRight
              size={16}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.button>
        </motion.div>

        {/* Mobile Static Fallback Image Section (Below Hero, <lg screens) */}
        <div
          id="mobile-static-image-container"
          className="lg:hidden my-8 w-full border border-gray-200 overflow-hidden relative aspect-[4/5] sm:aspect-[16/9]"
        >
          <img
            src={BG_IMAGE_1}
            alt="LGPSM Fashion Lookbook"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right lower feature block (self-end on desktop) */}
        <div
          id="hero-feature-block"
          className="self-start lg:self-end relative flex flex-col justify-between border-transparent mt-8 lg:mt-0"
          style={{
            minWidth: 'var(--feature-min)',
            padding: 'var(--feature-pad)',
          }}
        >
          {/* Four Corner Brackets (no filled card background) */}
          <div className="absolute top-0 left-0 text-black pointer-events-none">
            <CornerBracketSVG position="TL" id="bracket-tl-feature" />
          </div>
          <div className="absolute top-0 right-0 text-black pointer-events-none">
            <CornerBracketSVG position="TR" id="bracket-tr-feature" />
          </div>
          <div className="absolute bottom-0 left-0 text-black pointer-events-none">
            <CornerBracketSVG position="BL" id="bracket-bl-feature" />
          </div>
          <div className="absolute bottom-0 right-0 text-black pointer-events-none">
            <CornerBracketSVG position="BR" id="bracket-br-feature" />
          </div>

          {/* Wireframe Globe & Tagline */}
          <div className="flex flex-col gap-4 text-black">
            <WireframeGlobeSVG
              id="feature-wireframe-globe"
              className="text-black shrink-0"
            />
            <div
              id="feature-tagline"
              className="font-jakarta font-semibold uppercase tracking-[0.18em] leading-relaxed text-black"
              style={{ fontSize: 'var(--body)' }}
            >
              <div>BEYOND TRENDS.</div>
              <div>BUILT FOR TOMORROW.</div>
            </div>
          </div>
        </div>
      </main>

      {/* Side Drawers (SHOP, COLLECTIONS, JOURNAL, CART) */}
      <SideDrawer
        activeDrawer={activeDrawer}
        onClose={() => setActiveDrawer(null)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
