"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Brain, Cpu, Globe, Zap } from "lucide-react";

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <main className="relative min-h-screen bg-black selection:bg-white selection:text-black">
      
      {/* --- FLOATING NAVBAR --- */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center">
        <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-8 shadow-2xl shadow-purple-900/10">
          <span className="font-bold tracking-tighter text-xl">REZIIIX</span>
          <div className="hidden md:flex gap-6 text-sm text-gray-400 font-medium">
            <a href="#about" className="hover:text-white transition-colors">Vision</a>
            <a href="#tech" className="hover:text-white transition-colors">Core</a>
            <a href="#contact" className="hover:text-white transition-colors">Access</a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION WITH VIDEO SPHERE --- */}
      <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* The Video Background */}
        <motion.div 
          style={{ opacity, scale, y }} 
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dimmer overlay */}
          {/* REPLACE '/sphere-video.mp4' WITH YOUR ACTUAL FILE PATH */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/sphere-video.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 mix-blend-overlay text-white opacity-90">
              REZIIIX
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              We do not predict the future. We compute it.
              <br />
              <span className="text-gray-500 text-sm mt-2 block font-mono">
                // SYSTEM_READY // V.2.0.4
              </span>
            </p>
            
            <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-transform">
              <span className="relative z-10 flex items-center gap-2">
                Initiate Protocol <ArrowRight size={16} />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT SECTION (Bento Grid) --- */}
      <section id="tech" className="relative z-30 bg-black py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Neural <span className="text-gray-600">Architecture.</span>
            </h2>
            <div className="h-1 w-20 bg-white" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            {/* Large Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel col-span-1 md:col-span-2 row-span-2 rounded-3xl p-10 flex flex-col justify-between group hover:border-white/20 transition-colors"
            >
              <div>
                <Cpu size={48} className="text-white mb-6" />
                <h3 className="text-3xl font-bold mb-4">Hyper-Processing</h3>
                <p className="text-gray-400 max-w-md">
                  Reziiix leverages non-linear algorithmic structures to process data 10,000x faster than traditional LLMs. Our sphere core adapts to context in real-time.
                </p>
              </div>
              <div className="w-full h-32 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl mt-8 border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 w-1/2 skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000" />
              </div>
            </motion.div>

            {/* Small Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel rounded-3xl p-8 flex flex-col justify-center hover:bg-white/5 transition-colors"
            >
              <Globe size={32} className="mb-4 text-purple-400" />
              <h4 className="text-xl font-bold">Global Nodes</h4>
              <p className="text-sm text-gray-500 mt-2">Distributed computation across 40+ regions.</p>
            </motion.div>

            {/* Small Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-panel rounded-3xl p-8 flex flex-col justify-center hover:bg-white/5 transition-colors"
            >
              <Zap size={32} className="mb-4 text-yellow-400" />
              <h4 className="text-xl font-bold">Low Latency</h4>
              <p className="text-sm text-gray-500 mt-2">Sub-millisecond response times for edge AI.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MINIMAL FOOTER --- */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center opacity-50 hover:opacity-100 transition-opacity">
          <div className="font-mono text-xs">
            REZIIIX AI © 2025
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Brain size={20} />
            <div className="text-xs font-mono self-center">DESIGNED BY INTELLIGENCE</div>
          </div>
        </div>
      </footer>
    </main>
  );
}