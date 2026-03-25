import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight, Mail, Globe, MapPin } from 'lucide-react';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

const BG_LOGO = "/assets/bglogo.jpeg";

const App = () => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const [loaderComplete, setLoaderComplete] = useState(false);

  useEffect(() => {
    // Initial Animation Loader
    const tl = gsap.timeline({
      onComplete: () => setLoaderComplete(true)
    });

    tl.to(".loader-bar", { width: "100%", duration: 1.5, ease: "power4.inOut" })
      .to(".loader", { yPercent: -100, duration: 1, ease: "expo.inOut" })
      .from(".hero-title span", { y: 200, stagger: 0.1, duration: 1.2, ease: "expo.out" }, "-=0.5");

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Desktop: Horizontal Scroll Hijacking
      const panels = gsap.utils.toArray(".panel");
      
      let horizontalScroll = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        id: "main-scroll", // Required for containerAnimation parallax
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + horizontalRef.current.offsetWidth,
          invalidateOnRefresh: true,
        }
      });

      // Horizontal Parallax for images
      panels.forEach((panel, i) => {
        const img = panel.querySelector(".image-full");
        if (img) {
          gsap.fromTo(img, 
            { xPercent: -15 }, 
            { 
              xPercent: 15, 
              ease: "none", 
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalScroll,
                start: "left right",
                end: "right left",
                scrub: true
              } 
            }
          );
        }
      });

      // Progress bar sync
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + horizontalRef.current.offsetWidth,
          scrub: 0.1,
        }
      });
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile: Standard Vertical Scroll with Parallax
      const panels = gsap.utils.toArray(".panel");
      panels.forEach((panel) => {
        const img = panel.querySelector(".image-full");
        if (img) {
          gsap.fromTo(img, 
            { yPercent: -10 }, 
            { 
              yPercent: 10, 
              ease: "none", 
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              } 
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, []);

  const projects = [
    { 
      id: '01', 
      location: 'SINOP / MT', 
      name: 'CENTRO COMERCIAL', 
      desc: 'Masterplan & Estudos de Viabilidade.', 
      img: '/assets/comercialsinop1.png' 
    },
    { 
      id: '02', 
      location: 'SÃO PAULO / SP', 
      name: 'KAIROS', 
      desc: 'Edificações Verticais de Uso Misto.', 
      img: '/assets/kairos1.png' 
    },
    { 
      id: '03', 
      location: 'LAJEADO / RS', 
      name: 'RESIDENCIAL LAJEADO', 
      desc: 'Projetos Residenciais, Urbanísticos e Interiores.', 
      img: '/assets/residenciallajeado1.png' 
    },
    { 
      id: '04', 
      location: 'SÃO PAULO / SP', 
      name: 'TANUAR', 
      desc: 'Desenvolvimento de Produto.', 
      img: '/assets/desenvolvimentoprodutotanuar.png' 
    },
    { 
      id: '05', 
      location: 'NACIONAL', 
      name: 'INDÚSTRIA COCA-COLA', 
      desc: 'Projetos Industriais e Estruturais.', 
      img: '/assets/industrialcoca1.png' 
    },
    { 
      id: '06', 
      location: 'SALVADOR / BA', 
      name: 'BRT SALVADOR', 
      desc: 'Administração e Consultoria de Projetos e Obras.', 
      img: '/assets/coordenacaoobrasBRTSalvador1.png' 
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <div className="bg-[#f2f2f2] text-black min-h-screen overflow-hidden" ref={containerRef}>
      
      {/* 9to5 Inspired Loader */}
      {!loaderComplete && (
        <div className="loader fixed inset-0 bg-black z-[9999] flex items-center justify-center">
          <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden">
            <div className="loader-bar absolute top-0 left-0 h-full bg-white w-0"></div>
          </div>
          <div className="absolute bottom-10 mono text-[10px] text-white tracking-widest uppercase opacity-50">
            BG Arquitetura / Carregando Métricas
          </div>
        </div>
      )}

      {/* --- DESKTOP MENU BUTTON --- */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[70px] bg-black text-white z-[100] cursor-pointer flex-col items-center justify-center hover:bg-[#222] transition-colors"
      >
        <span className="mono text-xs rotate-180 [writing-mode:vertical-lr] tracking-[0.3em] uppercase"> Menu </span>
      </button>

      {/* --- DESKTOP CONTACTS BUTTON --- */}
      <div className="hidden lg:flex fixed right-0 top-0 bottom-0 w-[70px] text-black z-[50] pointer-events-none flex-col items-center justify-center border-l border-black/10">
        <span className="mono text-[10px] rotate-180 [writing-mode:vertical-lr] tracking-[0.2em] uppercase opacity-40"> SÃO PAULO — SINOP — LAJEADO </span>
      </div>

      {/* --- MOBILE NAVBAR --- */}
      <aside className="lg:hidden mx-5 flex h-14 cursor-pointer items-center bottom-5 left-0 right-0 justify-between fixed z-[100] bg-black text-white px-6 rounded-sm shadow-xl">
        <button onClick={() => setIsMenuOpen(true)} className="mono text-xs uppercase tracking-widest"> Menu </button>
        <button onClick={() => setIsMenuOpen(true)} className="mono text-xs uppercase tracking-widest opacity-50"> Contato </button>
      </aside>

      {/* --- FULLSCREEN MENU MODAL --- */}
      <div 
        className={`fixed inset-0 z-[2000] bg-black text-white transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="p-6 lg:p-12 h-full flex flex-col justify-between max-w-[1400px] mx-auto">
          <header className="flex justify-between items-start">
            {/* Logo in Menu */}
            <div className="hidden lg:block w-32 aspect-square text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="h-full w-full block">
                <g stroke="currentColor" strokeWidth="12" fill="none" strokeLinecap="square" strokeLinejoin="miter">
                   <path d="M80,320 V120 H160 A50,50 0 0,1 160,220 H80 M160,220 A50,50 0 0,1 160,320 H80" />
                   <path d="M420,160 A85,85 0 1,0 420,300 V230 H335" />
                </g>
              </svg>
            </div>
            {/* Close Button & Brand Name */}
            <div className="flex w-full lg:w-1/3 flex-col">
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="self-center lg:self-end mono text-sm tracking-[0.2em] uppercase pb-4 opacity-50 hover:opacity-100 transition-opacity"
              >
                FECHAR
              </button>
              <hr className="border-white/20 mb-6" />
              <div className="flex justify-between font-bold text-xl uppercase tracking-tighter">
                <span>BG</span>
                <span className="opacity-30">ARQUITETURA</span>
              </div>
            </div>
          </header>

          <main className="mt-12 lg:mt-0 flex flex-col gap-12 lg:gap-0 lg:flex-row lg:justify-between w-full">
            {/* Navigation */}
            <section className="flex flex-col lg:w-1/3">
              <hr className="border-white/20 mb-4 hidden lg:block" />
              <div className="grid grid-cols-6 lg:gap-8">
                <span className="col-span-2 mono text-xs uppercase tracking-widest opacity-40">Navegação</span>
                <ul className="col-span-4 flex flex-col gap-4 text-3xl font-bold uppercase tracking-tight">
                  <li><a href="#" onClick={() => setIsMenuOpen(false)} className="hover:opacity-50 transition-opacity">Portfólio</a></li>
                  <li><a href="#" onClick={() => setIsMenuOpen(false)} className="hover:opacity-50 transition-opacity">Estúdio</a></li>
                  <li><a href="#" onClick={() => setIsMenuOpen(false)} className="hover:opacity-50 transition-opacity">Metodologia</a></li>
                </ul>
              </div>
            </section>

            {/* Follow */}
            <section className="flex flex-col lg:w-1/3">
              <hr className="border-white/20 mb-4 hidden lg:block" />
              <div className="grid grid-cols-6 lg:gap-8">
                <span className="col-span-2 mono text-xs uppercase tracking-widest opacity-40">Acompanhe</span>
                <ul className="col-span-4 flex flex-col gap-4 text-3xl font-bold uppercase tracking-tight">
                  <li><a href="https://www.instagram.com/bg_arquitetura.e.urbanismo/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">Instagram</a></li>
                  <li><a href="#" className="hover:opacity-50 transition-opacity">WhatsApp</a></li>
                </ul>
              </div>
            </section>

            {/* Info */}
            <section className="flex flex-col lg:w-1/3">
              <hr className="border-white/20 mb-4 hidden lg:block" />
              <div className="grid grid-cols-6 lg:gap-8">
                <span className="col-span-2 mono text-xs uppercase tracking-widest opacity-40">Informações</span>
                <div className="col-span-4 flex flex-col">
                  <span className="text-3xl font-bold uppercase tracking-tight mb-8">Contato</span>
                  <div className="mono text-xs leading-loose tracking-widest uppercase opacity-60">
                    <p>Av. Paulista, 1000 — SP</p>
                    <p>Sinop | Lajeado</p>
                    <p>contato@bgarquitetura.com.br</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Progress Bar (Bottom) */}
      <div className="scroll-progress fixed bottom-0 h-1 bg-black z-[2000] origin-left left-[70px] right-[70px]"></div>

      {/* Horizontal Scroll Content */}
      <div className="horizontal-scroll-wrapper flex flex-col lg:flex-row w-full" ref={horizontalRef}>
        
        {/* Section 1: Hero Intro (Yellow Theme to match 9to5) */}
        <section className="panel w-full lg:w-screen h-[100svh] flex flex-col items-start justify-center px-8 lg:pl-[12vw] relative bg-[#f2e500]">
          <div className="max-w-5xl z-10 w-full">
            <div className="mb-8 w-32 lg:w-48 aspect-square relative text-black block">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="h-full w-full block absolute">
                {/* Minimalist vector construction for 'BG' */}
                <g stroke="currentColor" strokeWidth="12" fill="none" strokeLinecap="square" strokeLinejoin="miter">
                   {/* Letter B */}
                   <path d="M80,320 V120 H160 A50,50 0 0,1 160,220 H80 M160,220 A50,50 0 0,1 160,320 H80" />
                   {/* Letter G */}
                   <path d="M420,160 A85,85 0 1,0 420,300 V230 H335" />
                </g>
                <text x="76" y="400" fontFamily="'Inter', sans-serif" fontSize="40" fontWeight="800" letterSpacing="0.22em" fill="currentColor">ARQUITETURA</text>
              </svg>
            </div>
            <h1 className="hero-title flex flex-col gap-2 lg:gap-4 text-black text-5xl lg:text-[7rem] font-black uppercase tracking-tighter leading-none">
              <span className="block overflow-hidden"><span className="inline-block">BG</span></span>
              <span className="block overflow-hidden"><span className="inline-block italic opacity-40">ARQUITETURA</span></span>
            </h1>
            <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row gap-6 lg:gap-12 items-start text-black">
              <div className="w-12 h-[2px] bg-black mt-3"></div>
              <p className="max-w-sm mono text-[10px] lg:text-[11px] uppercase lg:tracking-[0.3em] tracking-[0.1em] leading-loose opacity-80">
                A ARQUITETURA COMEÇA E TERMINA EM NÚMEROS. <br />
                PROJETAMOS ESTÉTICA COM RESPONSABILIDADE, <br />
                DA VIABILIDADE AO RETORNO.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Statement (High Contrast) */}
        <section className="panel w-full lg:w-screen h-[100svh] bg-black text-white flex flex-col items-center justify-center px-8 lg:px-[15vw]">
           <div className="max-w-4xl text-center">
             <h2 className="title-big mb-12">
               TRANSFORMAMOS<br />
               <span className="text-white/30 italic">CONCEITOS</span> EM<br />
               RESULTADOS.
             </h2>
             <p className="mono text-[10px] lg:text-xs uppercase tracking-[0.2em] lg:tracking-[0.4em] opacity-40 max-w-2xl mx-auto leading-loose">
               Nosso diferencial é a integração entre arquitetura de alto padrão e inteligência de mercado. Antes de desenhar, calculamos. Antes de construir, validamos.
             </p>
           </div>
        </section>

        {projects.map((project, idx) => (
          <section key={project.id} className="panel w-full lg:w-[75vw] h-[100svh] flex items-center justify-center px-4 py-16 lg:py-0 lg:px-[5vw] bg-[#f8f8f8]">
            <a href="#" className="flex flex-col lg:flex-row bg-white h-[80vh] lg:h-[70vh] w-full border border-black/10 group overflow-hidden shadow-2xl lg:shadow-none">
               {/* Bookmark Spine */}
               <div className="bg-white flex flex-none h-16 lg:h-full lg:w-20 items-center justify-between lg:flex-col p-4 border-b lg:border-b-0 lg:border-r border-black/10 z-10 transition-colors group-hover:bg-black group-hover:text-white">
                 <p className="mono text-[10px] lg:text-xs font-bold lg:rotate-180 lg:[writing-mode:vertical-lr] opacity-50 group-hover:opacity-100">{project.id}</p>
                 <p className="mono text-[10px] uppercase tracking-[0.2em] lg:rotate-180 lg:[writing-mode:vertical-lr]">{project.name}</p>
               </div>
               
               {/* Project Image Area */}
               <div className="flex-1 relative overflow-hidden bg-[#111]">
                 <img 
                   src={project.img} 
                   alt={project.name} 
                   className="image-full w-full h-full object-cover grayscale lg:group-hover:grayscale-0 transition-all duration-[1500ms] ease-out lg:group-hover:scale-105" 
                 />
                 <div className="absolute bottom-0 lg:-bottom-[20%] lg:group-hover:bottom-0 left-0 w-full flex flex-col lg:flex-row justify-between lg:items-end p-6 lg:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white transition-all duration-700 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                  <div className="flex flex-col gap-1 lg:gap-2 mb-4 lg:mb-0">
                    <span className="mono text-[9px] lg:text-[10px] opacity-70 tracking-widest uppercase">{project.location}</span>
                    <span className="text-xl lg:text-2xl font-bold tracking-tight uppercase">{project.name}</span>
                    <span className="mono text-[8px] lg:text-[9px] uppercase opacity-80">{project.desc}</span>
                  </div>
                  <div className="self-start lg:self-auto p-3 border border-white/20 rounded-full bg-black/20 hover:bg-white hover:text-black transition-colors cursor-pointer backdrop-blur-md">
                    <ArrowRight size={20} />
                  </div>
                 </div>
               </div>
            </a>
          </section>
        ))}

        {/* Section Final: Contacts (Minimalist Gallery Footer) */}
        <section className="panel w-full lg:w-screen h-[100svh] flex flex-col items-center justify-center relative bg-white">
          <div className="text-center px-4">
             <div className="mono text-[10px] tracking-widest opacity-50 mb-8 uppercase">VAMOS CONSTRUIR O FUTURO JUNTOS</div>
             <h2 className="title-big mb-12 lg:mb-16">CONTATO</h2>
             <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
                <div className="flex flex-col items-center gap-4">
                   <Mail size={32} strokeWidth={1} />
                   <span className="mono text-[10px] lg:text-xs uppercase tracking-widest">contato@bgarquitetura.com.br</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                   <MapPin size={32} strokeWidth={1} />
                   <span className="mono text-[10px] lg:text-xs uppercase tracking-widest">Av. Paulista, 1000 — SP</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                   <Globe size={32} strokeWidth={1} />
                   <span className="mono text-[10px] lg:text-xs uppercase tracking-widest">@bg_arquitetura.e.urbanismo</span>
                </div>
             </div>
          </div>
          <div className="absolute w-full bottom-10 px-8 lg:px-[70px] flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
             <span className="mono text-[8px] lg:text-[9px] opacity-40 text-center">© 2026 BG ARQUITETURA. TODOS OS DIREITOS RESERVADOS.</span>
             <div className="flex gap-8">
               <span className="mono text-[8px] lg:text-[9px] opacity-40 hover:opacity-100 cursor-pointer transition-opacity">POLÍTICA DE PRIVACIDADE</span>
               <span className="mono text-[8px] lg:text-[9px] opacity-40 hover:opacity-100 cursor-pointer transition-opacity">TERMOS DE USO</span>
             </div>
          </div>
        </section>

      </div>

      <style>{`
        .sidebar { width: 70px; background: #000; color: #fff; z-index: 2000; transition: transform 0.3s ease; }
        .sidebar-left { border-right: none; }
        .sidebar-right { border-left: none; }
        .hero-title { transform: translateY(0); }
        .title-big { font-size: clamp(3rem, 8vw, 7rem); line-height: 0.9; text-transform: uppercase; font-weight: 900; letter-spacing: -0.04em; }
        .panel { transition: background-color 0.8s ease; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* GSAP specific helpers */
        .project-number {
          position: absolute;
          top: 30px;
          left: -40px;
          background: #000;
          color: #fff;
          padding: 15px 8px;
          font-family: 'Roboto Mono', monospace;
          font-size: 11px;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          z-index: 50;
        }
      `}</style>
    </div>
  );
};

export default App;
