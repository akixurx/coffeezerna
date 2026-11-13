'use client';

import { useEffect, useRef, type ReactNode } from "react";
import { Hero } from "@/components/hero";
import { MenuSection } from "@/components/menu-section";
import { About } from "@/components/About";
import { MenuMarquee } from "@/components/menu-marquee";
import { Reviews } from "@/components/Reviews";
import { HeroNav } from "@/components/hero-nav";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";

function ScrollLayer({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const updatePosition = () => {
      // Long sections scroll fully before their last screen is pinned.
      const top = Math.min(0, window.innerHeight - layer.getBoundingClientRect().height);
      layer.style.setProperty("--layer-top", `${top}px`);
    };

    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    observer.observe(layer);
    window.addEventListener("resize", updatePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
      layer.style.removeProperty("--layer-top");
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className={`sticky top-[var(--layer-top,0px)] isolate flow-root bg-[#1a0a05] motion-reduce:relative motion-reduce:top-auto ${className}`}
    >
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Preloader />
      <HeroNav />
      <main className="relative isolate min-h-svh bg-[#1a0a05] text-white">
        <ScrollLayer className="z-0">
          <Hero />
        </ScrollLayer>
        <ScrollLayer className="z-10">
          <About />
        </ScrollLayer>
        <ScrollLayer className="z-20">
          <MenuSection />
          <MenuMarquee />
        </ScrollLayer>
        <ScrollLayer className="z-30">
          <Reviews />
        </ScrollLayer>
        <ScrollLayer className="z-40">
          <Contacts />
        </ScrollLayer>
      </main>
      <Footer />
    </>
  );
}
