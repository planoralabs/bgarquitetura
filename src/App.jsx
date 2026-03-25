import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight, Mail, Globe, MapPin } from 'lucide-react';
import ProjectDetail from './ProjectDetail';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

const BG_LOGO = "/assets/bglogo.jpeg";

const App = () => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(null);

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
      img: '/assets/comercialsinop1.png',
      details: {
        year: '2023', status: 'Em fase de aprovação',
        text1: 'O Centro Comercial de Sinop foi projetado com uma análise de viabilidade meticulosa. Os espaços foram segmentados para maximizar métricas de rentabilidade e fluxo natural.',
        images: ['/assets/centro comercial2.png', '/assets/comercialsinop2.png', '/assets/comercialsinop3.png'],
        services: ['Estudo de Viabilidade', 'Projeto Arquitetônico', 'Masterplan Urbanístico']
      }
    },
    { 
      id: '02', 
      location: 'SÃO PAULO / SP', 
      name: 'KAIROS', 
      desc: 'Edificações Verticais de Uso Misto.', 
      img: '/assets/kairos1.png',
      details: {
        year: '2022', status: 'Em construção',
        text1: 'Kairos é um edifício vertical que transcende o convencional. Combinando áreas residenciais privativas e mall no térreo, gera ROI acima de 15% nas primeiras projeções.',
        images: ['/assets/kairos2.png', '/assets/kairos3.png', '/assets/kairos4.png'],
        services: ['Desenvolvimento Imobiliário', 'Design de Fachada', 'Estruturas Especializadas']
      }
    },
    { 
      id: '03', 
      location: 'LAJEADO / RS', 
      name: 'RESIDENCIAL LAJEADO', 
      desc: 'Projetos Residenciais.', 
      img: '/assets/residenciallajeado1.png',
      details: {
        year: '2024', status: 'Projeto Executivo',
        text1: 'Design focado na eficiência dos layouts. Sem recortes desnecessários, oferecemos áreas nobres em cada metro quadrado, traduzindo estética racional.',
        images: ['/assets/residencialsinop2.png', '/assets/residencialsinop3.png', '/assets/residencialsinop4.png'],
        services: ['Projeto Executivo', 'Desing de Interiores', 'Compatibilização BIM']
      }
    },
    { 
      id: '04', 
      location: 'SÃO PAULO / SP', 
      name: 'TANUAR', 
      desc: 'Desenvolvimento de Produto.', 
      img: '/assets/desenvolvimentoprodutotanuar.png',
      details: {
        year: '2025', status: 'Planejamento',
        text1: 'Um módulo tecnológico voltado a alta escalabilidade construtiva. O Tanuar é um ativo focado em novos nômades e rentabilidade.',
        images: ['/assets/desenvolvimentoprodutotanuar1.png', '/assets/desenvolvimentoprodutotanuar3.png', '/assets/desenvolvimentoprodutotanuar5.png'],
        services: ['P&D', 'Módulos Habitacionais', 'Inteligência Construtiva']
      }
    },
    { 
      id: '05', 
      location: 'NACIONAL', 
      name: 'INDÚSTRIA COCA-COLA', 
      desc: 'Projetos Industriais e Logísticos.', 
      img: '/assets/industrialcoca1.png',
      details: {
        year: '2021', status: 'Concluído',
        text1: 'Uma superestrutura de logística com vãos gigantes e pé-direito estratégico para automação industrial, tudo validado estrutural e financeiramente.',
        images: ['/assets/industrialcoca2.png', '/assets/industrialcoca3.png', '/assets/industrialcoca4.png'],
        services: ['Coordenação de Projetos Industriais', 'Compatibilização MEP', 'Gestão']
      }
    },
    { 
      id: '06', 
      location: 'SALVADOR / BA', 
      name: 'BRT SALVADOR', 
      desc: 'Administração de Obras e Engenharia.', 
      img: '/assets/coordenacaoobrasBRTSalvador1.png',
      details: {
        year: '2019-2023', status: 'Concluído com Êxito',
        text1: 'Consultoria e gestão pesada da obra do BRT em Salvador. A otimização milimétrica dos traçados viários economizou mais de 8% nos custos com aditivos.',
        images: ['/assets/coordenacaoobrasBRTSalvador2.png', '/assets/coordenacaoobrasBRTSalvador3.png', '/assets/coordenacaoobrasBRTSalvador4.png'],
        services: ['Coordenação Geral de Obra', 'Administração de Contratos', 'Masterplan Logístico']
      }
    },
  ];

  const [activeModal, setActiveModal] = useState(null);

  // Toggle body scroll when modal or project is open
  useEffect(() => {
    if (activeModal !== null || activeProjectId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeModal, activeProjectId]);

  const activeProject = projects.find(p => p.id === activeProjectId);

  const getNextProject = () => {
     if (!activeProjectId) return null;
     const currentIndex = projects.findIndex(p => p.id === activeProjectId);
     return projects[(currentIndex + 1) % projects.length];
  };

  return (
    <>
      {/* --- GLOBAL NAVIGATIONS & MODALS --- */}
      
      {/* --- DESKTOP MENU BUTTON --- */}
      <button 
        onClick={() => setActiveModal('menu')}
        className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[70px] bg-black text-white z-[100] cursor-pointer flex-col items-center justify-center hover:bg-[#222] transition-colors"
      >
        <span className="mono text-xs rotate-180 [writing-mode:vertical-lr] tracking-[0.3em] uppercase"> Menu </span>
      </button>

      {/* --- DESKTOP CONTACTS BUTTON --- */}
      <button 
        onClick={() => setActiveModal('contact')}
        className="hidden lg:flex fixed right-0 top-0 bottom-0 w-[70px] bg-transparent text-black z-[50] cursor-pointer flex-col items-center justify-center border-l border-black/10 hover:bg-black hover:text-white transition-colors"
      >
        <span className="mono text-[10px] rotate-180 [writing-mode:vertical-lr] tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity"> SÃO PAULO — SINOP — LAJEADO </span>
      </button>

      {/* --- MOBILE NAVBAR --- */}
      <aside className="lg:hidden w-[90vw] left-[5vw] flex h-14 cursor-pointer items-center bottom-5 justify-between fixed z-[100] bg-black text-white px-10 rounded-sm shadow-xl">
        <button onClick={() => setActiveModal('menu')} className="mono text-[10px] font-bold uppercase tracking-[0.2em]"> MENU </button>
        <button onClick={() => setActiveModal('contact')} className="mono text-[10px] font-bold uppercase tracking-[0.2em] opacity-60"> CONTATO </button>
      </aside>

      {/* --- FULLSCREEN MODALS (MENU & CONTACT) --- */}
      <div 
        className={`fixed inset-0 z-[2000] bg-black text-white transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${activeModal !== null ? 'translate-y-0' : 'translate-y-full'} overflow-y-auto`}
      >
        <div className="p-6 lg:p-12 min-h-full flex flex-col max-w-[1400px] mx-auto">
          
          {/* Commom Header (Mobile & Desktop) */}
          <header className="flex flex-col lg:flex-row lg:justify-between items-start w-full mb-12 lg:mb-24">
            {/* Desktop Logo Space */}
            <div className="hidden lg:block w-32 aspect-square text-white opacity-90 mx-auto lg:mx-0 mb-8 lg:mb-0">
               <img src="/assets/bgletters.png" alt="BG Arquitetura" className="w-full h-full object-contain invert" />
            </div>
            {/* Mobile Header elements and Desktop Close */}
            <div className="flex w-full lg:w-1/3 flex-col">
              <button 
                onClick={() => setActiveModal(null)} 
                className="self-center lg:self-end mono text-sm tracking-[0.2em] uppercase pb-4 opacity-50 hover:opacity-100 transition-opacity"
              >
                FECHAR
              </button>
              <hr className="border-white/20 mb-6 lg:hidden" />
              <div className="flex justify-between items-center lg:hidden">
                <img src="/assets/bgletters.png" alt="BG" className="h-8 object-contain invert" />
                <img src="/assets/arquiteturalogo.png" alt="Arquitetura" className="h-4 object-contain invert opacity-60" />
              </div>
            </div>
          </header>

          {/* DYNAMIC CONTENT: MENU */}
          {activeModal === 'menu' && (
            <main className="flex flex-col gap-12 lg:gap-0 w-full lg:px-10">
              <section className="grid grid-cols-6 lg:gap-8 pb-8 lg:pb-16">
                <div className="col-span-6 border-t border-white/20 mb-4 h-px"></div>
                <span className="col-span-6 lg:col-span-2 mono text-xs uppercase tracking-widest opacity-40 mb-4 lg:mb-0">Navegação</span>
                <ul className="col-span-6 lg:col-span-4 flex flex-col gap-4 text-3xl font-bold uppercase tracking-tight">
                  <li><button onClick={() => { setActiveModal(null); setActiveProjectId(null); }} className="hover:opacity-50 transition-opacity">Portfólio</button></li>
                  <li><a href="#" className="hover:opacity-50 transition-opacity">Estúdio</a></li>
                  <li><a href="#" className="hover:opacity-50 transition-opacity">Metodologia</a></li>
                </ul>
              </section>

              <section className="grid grid-cols-6 lg:gap-8 pb-8 lg:pb-16">
                <div className="col-span-6 border-t border-white/20 mb-4 h-px"></div>
                <span className="col-span-6 lg:col-span-2 mono text-xs uppercase tracking-widest opacity-40 mb-4 lg:mb-0">Acompanhe</span>
                <ul className="col-span-6 lg:col-span-4 flex flex-col gap-4 text-3xl font-bold uppercase tracking-tight">
                  <li><a href="https://www.instagram.com/bg_arquitetura.e.urbanismo/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">Instagram</a></li>
                  <li><a href="#" className="hover:opacity-50 transition-opacity">LinkedIn</a></li>
                </ul>
              </section>

              <section className="grid grid-cols-6 lg:gap-8 pb-8 lg:pb-16">
                <div className="col-span-6 border-t border-white/20 mb-4 h-px"></div>
                <span className="col-span-6 lg:col-span-2 mono text-xs uppercase tracking-widest opacity-40 mb-4 lg:mb-0">Informações</span>
                <div className="col-span-6 lg:col-span-4 flex flex-col">
                  <span className="text-xl font-bold uppercase tracking-tight mb-4">BG ARQUITETURA</span>
                  <div className="mono text-[10px] leading-loose tracking-widest uppercase opacity-60">
                    <p>São Paulo — Sinop — Lajeado</p>
                    <p>CNPJ 00.000.000/0001-00</p>
                  </div>
                </div>
              </section>
            </main>
          )}

          {/* DYNAMIC CONTENT: CONTACT */}
          {activeModal === 'contact' && (
            <main className="flex flex-col gap-12 lg:gap-0 w-full lg:px-10">
              <section className="grid grid-cols-6 lg:gap-8 pb-8 lg:pb-16">
                <div className="col-span-6 border-t border-white/20 mb-4 h-px"></div>
                <span className="col-span-6 lg:col-span-2 mono text-xs uppercase tracking-widest opacity-40 mb-4 lg:mb-0">Contato</span>
                <ul className="col-span-6 lg:col-span-4 flex flex-col gap-4 mt-2">
                  <li><a href="tel:+550000000000" className="text-xl lg:text-3xl font-bold uppercase tracking-tight hover:opacity-50 transition-opacity inline-flex items-center gap-4">LIGUE PARA NÓS <ArrowRight size={20} /></a></li>
                  <li><a href="#" className="text-xl lg:text-3xl font-bold uppercase tracking-tight hover:opacity-50 transition-opacity inline-flex items-center gap-4">ONDE ESTAMOS <ArrowRight size={20} /></a></li>
                  <li><a href="mailto:contato@bgarquitetura.com" className="text-xl lg:text-3xl font-bold uppercase tracking-tight hover:opacity-50 transition-opacity inline-flex items-center gap-4">ENVIE UM EMAIL <ArrowRight size={20} /></a></li>
                </ul>
              </section>

              <section className="grid grid-cols-6 lg:gap-8 pb-8 lg:pb-16">
                <div className="col-span-6 border-t border-white/20 mb-4 h-px"></div>
                <span className="col-span-6 lg:col-span-2 mono text-xs uppercase tracking-widest opacity-40 mb-4 lg:mb-0">Acompanhe & Veja</span>
                <ul className="col-span-6 lg:col-span-4 flex flex-col gap-4 mt-2">
                  <li><a href="https://www.instagram.com/bg_arquitetura.e.urbanismo/" target="_blank" rel="noopener noreferrer" className="text-xl lg:text-3xl font-bold uppercase tracking-tight hover:opacity-50 transition-opacity inline-flex items-center gap-4">INSTAGRAM <ArrowRight size={20} /></a></li>
                  <li><a href="#" className="text-xl lg:text-3xl font-bold uppercase tracking-tight hover:opacity-50 transition-opacity inline-flex items-center gap-4">WHATSAPP <ArrowRight size={20} /></a></li>
                </ul>
              </section>

              <section className="grid grid-cols-6 lg:gap-8 pb-8 lg:pb-0">
                <div className="col-span-6 border-t border-white/20 mb-4 h-px"></div>
                <span className="col-span-6 lg:col-span-2 mono text-xs uppercase tracking-widest opacity-40 mb-4 lg:mb-0">Converse conosco</span>
                <div className="col-span-6 lg:col-span-4">
                  <p className="text-xl font-bold uppercase tracking-tight mb-8">Para projetos, colaborações<br/>ou dúvidas técnicas de alto nível.</p>
                  <button className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-colors ease-out duration-300">
                    Fale Conosco Diretamente
                  </button>
                </div>
              </section>
            </main>
          )}
        </div>
      </div>

      {/* Progress Bar (Bottom) */}
      <div className="scroll-progress fixed bottom-0 h-1 bg-black z-[2000] origin-left left-[70px] right-[70px]"></div>

      {/* --- PAGE CONTENT --- */}
      {activeProject ? (
         <ProjectDetail 
           project={activeProject} 
           nextProject={getNextProject()} 
           onBack={(nextId) => {
             if (typeof nextId === 'string') {
                setActiveProjectId(nextId);
             } else {
                setActiveProjectId(null);
             }
           }} 
         />
      ) : (
        <div className="bg-[#f2f2f2] text-black min-h-screen overflow-hidden" ref={containerRef}>
          {/* --- LOADING SCREEN --- */}
          <div className={`fixed inset-0 z-[5000] bg-black text-white flex items-center justify-center transition-opacity duration-1000 ${loaderComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                 <img src="/assets/bgletters.png" alt="BG" className="w-full h-full object-contain invert" />
              </div>
              <div className="h-px w-32 bg-white/20 relative overflow-hidden">
                 <div className="absolute top-0 bottom-0 left-0 bg-[#f2e500] w-full origin-left 
                 animate-[progress_2s_ease-in-out_forwards]"></div>
              </div>
            </div>
          </div>

          <div className="horizontal-scroll-wrapper flex flex-col lg:flex-row w-full" ref={horizontalRef}>
            
            {/* HERO PANEL */}
            <section className="panel w-full lg:w-screen h-[100svh] flex flex-col items-start justify-center px-8 lg:pl-[12vw] relative bg-[#f2e500]">
              <div className="max-w-5xl z-10 w-full">
                <div className="mb-8 w-16 lg:w-24 aspect-square relative text-black block">
                   <img src="/assets/bgletters.png" alt="BG" className="w-full h-full object-contain" />
                </div>
                
                <h1 className="hero-title flex flex-col gap-2 lg:gap-4 text-black text-5xl lg:text-[7rem] font-black uppercase tracking-tighter leading-none">
                  <span className="text-reveal"><span className="block opacity-90 hover:opacity-100 transition-opacity">Engenharia</span></span>
                  <span className="text-reveal"><span className="block opacity-90 hover:opacity-100 transition-opacity">Arquitetônica</span></span>
                  <span className="text-reveal"><span className="block opacity-90 hover:opacity-100 transition-opacity">De Valor</span></span>
                </h1>

                <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row gap-6 lg:gap-12 items-start text-black">
                   <p className="max-w-md text-sm lg:text-base font-medium leading-relaxed opacity-80 mix-blend-multiply">
                     Design não é apenas estética. É otimização de métricas financeiras. Desenvolvemos masterplans e infraestruturas escaláveis com alto poder de ROI.
                   </p>
                   <ul className="flex flex-col gap-2 mono text-[10px] lg:text-xs uppercase tracking-[0.2em] opacity-70">
                     <li>Estudos de Viabilidade</li>
                     <li>Masterplan Urbanístico</li>
                     <li>Coordenação Executiva</li>
                   </ul>
                </div>
              </div>
              
              <div className="absolute w-full bottom-10 px-8 lg:px-[70px] flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
                 <img src="/assets/arquiteturalogo.png" alt="Arquitetura" className="h-4 object-contain opacity-40 mix-blend-multiply" />
                 <div className="flex gap-8">
                   <span className="mono text-[8px] lg:text-[9px] opacity-40 hover:opacity-100 cursor-pointer transition-opacity">POLÍTICA DE PRIVACIDADE</span>
                   <span className="mono text-[8px] lg:text-[9px] opacity-40 hover:opacity-100 cursor-pointer transition-opacity">TERMOS DE USO</span>
                 </div>
              </div>
            </section>

            {projects.map((project, idx) => (
              <section key={project.id} className="panel w-full lg:w-[75vw] h-[100svh] flex items-center justify-center px-4 py-8 lg:py-0 lg:px-[5vw] bg-[#f8f8f8]">
                <button onClick={() => setActiveProjectId(project.id)} className="flex flex-col-reverse lg:flex-row bg-white h-auto lg:h-[70vh] w-full border border-black/10 group overflow-hidden shadow-2xl lg:shadow-none relative text-left">
                   {/* Bookmark Spine */}
                   <div className="bg-white flex flex-none h-16 lg:h-full lg:w-20 items-center justify-between lg:flex-col p-4 px-8 z-10">
                     <p className="mono text-[11px] lg:text-xs font-bold lg:rotate-180 lg:[writing-mode:vertical-lr] opacity-50">{project.id}</p>
                     <p className="mono text-[11px] font-bold uppercase tracking-[0.2em] lg:rotate-180 lg:[writing-mode:vertical-lr]">{project.name}</p>
                   </div>
                   
                   {/* Project Image Area */}
                   <div className="flex-1 relative overflow-hidden bg-[#111] h-[60vh] lg:h-auto w-full">
                     <img 
                       src={project.img} 
                       alt={project.name} 
                       className="image-full w-full h-full object-cover lg:grayscale lg:group-hover:grayscale-0 transition-all duration-[1500ms] ease-out lg:group-hover:scale-105" 
                     />
                     <div className="absolute top-0 bottom-0 left-0 w-full flex flex-col justify-end px-12 py-16 lg:p-16 bg-gradient-to-t from-black/90 via-black/30 to-transparent text-white lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                      <div className="flex flex-col lg:flex-row justify-between lg:items-end w-full">
                        <div className="flex flex-col gap-1 lg:gap-2 mb-4 lg:mb-0">
                          <span className="mono text-[9px] lg:text-[10px] opacity-70 tracking-widest uppercase">{project.location}</span>
                          <span className="text-2xl lg:text-3xl font-black tracking-tight uppercase leading-none">{project.name}</span>
                          <span className="mono text-[9px] lg:text-[10px] uppercase opacity-80 mt-2">{project.desc}</span>
                        </div>
                        <div className="self-start lg:self-auto p-3 border border-white/20 rounded-full bg-black/40 hover:bg-white hover:text-black transition-colors cursor-pointer backdrop-blur-md">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                     </div>
                   </div>
                </button>
              </section>
            ))}

            {/* SECTION FINAL (MINIMALIST) */}
            <section className="panel w-full lg:w-[40vw] h-[100svh] flex flex-col items-center justify-center p-8 bg-black text-white px-12 lg:px-24">
              <div className="w-full flex-1 flex flex-col items-center justify-center gap-12 text-center max-w-lg mx-auto">
                 <div className="w-24 h-24">
                    <img src="/assets/bgletters.png" alt="BG" className="w-full h-full object-contain invert" />
                 </div>
                 <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-none">
                   TEM UM PROJETO<br/>EM MENTE?
                 </h2>
                 <p className="font-mono text-xs opacity-60 uppercase tracking-widest leading-loose">
                   Arquitetura conectada entre as métricas e a estética. Descubra sua potencialidade.
                 </p>
                 <button onClick={() => setActiveModal('contact')} className="mt-4 px-8 py-4 bg-white text-black hover:bg-[#f2e500] hover:text-black font-bold mono text-xs uppercase tracking-widest transition-colors duration-300">
                   Entre em contato
                 </button>
                 
                 <div className="flex w-full justify-between items-center mt-auto border-t border-white/10 pt-8">
                    <div className="flex flex-col items-center gap-4">
                       <Mail size={32} strokeWidth={1} />
                       <span className="mono text-[10px] lg:text-xs uppercase tracking-widest">contato@</span>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                       <Globe size={32} strokeWidth={1} />
                       <span className="mono text-[10px] lg:text-xs uppercase tracking-widest">@bg_arquitetura.e.urbanismo</span>
                    </div>
                 </div>
              </div>
            </section>

          </div>
        </div>
      )}
    </>
  );
};

export default App;
