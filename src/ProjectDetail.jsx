import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = ({ project, onBack, nextProject }) => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const panels = gsap.utils.toArray(".detail-panel");
      
      let horizontalScroll = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        id: "detail-scroll",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + horizontalRef.current.offsetWidth,
          invalidateOnRefresh: true,
        }
      });

      // Parallax for images
      panels.forEach((panel) => {
        const img = panel.querySelector(".detail-parallax");
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
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile native vertical scroll
    });

    return () => {
      mm.revert();
    };
  }, [project]);

  return (
    <div className="bg-[#f2f2f2] text-black min-h-screen pt-14 lg:pt-0" ref={containerRef}>
      
      {/* Dynamic Progress Bar */}
      <div className="scroll-progress fixed bottom-0 h-1 bg-black z-[2000] origin-left left-0 lg:left-[70px] right-0 lg:right-[70px]" style={{ scaleX: 0 }}></div>

      {/* Back Button (Fixed) */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 lg:left-24 z-50 p-4 bg-white/50 backdrop-blur-md rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="flex flex-col lg:flex-row w-full h-full lg:h-screen" ref={horizontalRef}>
        
        {/* Panel 1: Hero Project Info */}
        <section className="detail-panel w-full lg:w-[90vw] h-auto lg:h-screen flex flex-col lg:flex-row items-center p-6 lg:p-0 bg-white border-r border-black/10 flex-none shrink-0 relative">
          
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden">
            <img src={project.img} alt={project.name} className="detail-parallax w-full h-full object-cover grayscale opacity-90" />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-between px-10 py-16 lg:p-24 h-full">
            <div className="flex flex-col gap-12 max-w-2xl">
              <div className="flex items-start gap-8">
                {/* SVG Number Representation */}
                <div className="hidden lg:block w-24 text-black opacity-10 font-mono text-[8rem] leading-none tracking-tighter mix-blend-multiply flex-none">
                  {project.id}
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">{project.name}</h1>
                  <ul className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest opacity-60">
                    <li><span className="font-bold opacity-50 mr-2">Ano:</span> {project.details.year}</li>
                    <li><span className="font-bold opacity-50 mr-2">Local:</span> {project.location}</li>
                    <li><span className="font-bold opacity-50 mr-2">Tipo:</span> {project.desc}</li>
                    <li><span className="font-bold opacity-50 mr-2">Status:</span> {project.details.status}</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 lg:mt-16 text-sm lg:text-lg leading-relaxed max-w-xl opacity-80" dangerouslySetInnerHTML={{ __html: project.details.text1 }} />
            </div>
          </div>
        </section>

        {/* Panel 2: Single Large Image */}
        {project.details.images[0] && (
          <section className="detail-panel w-full lg:w-[75vw] h-[50vh] lg:h-screen flex-none shrink-0 border-r border-black/10 relative overflow-hidden bg-black">
            <img src={project.details.images[0]} alt="Gallery 1" className="detail-parallax w-full h-full object-cover opacity-80" />
          </section>
        )}

        {/* Panel 3: Services & Text */}
        <section className="detail-panel w-full lg:w-[80vw] h-auto lg:h-screen flex flex-col-reverse lg:flex-row flex-none shrink-0 border-r border-black/10 bg-[#f8f8f8]">
          <div className="w-full lg:w-2/5 px-10 py-16 lg:p-24 flex flex-col justify-center gap-12">
            <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-tighter">O QUE FIZEMOS</h2>
            <ul className="flex flex-col gap-6">
              {project.details.services.map((svc, idx) => (
                <li key={idx} className="border-b border-black/10 pb-4">
                  <span className="font-mono text-[10px] lg:text-xs uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity cursor-pointer">{svc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-3/5 h-[40vh] lg:h-full relative overflow-hidden">
             {project.details.images[1] ? (
                <img src={project.details.images[1]} alt="Gallery 2" className="detail-parallax w-full h-full object-cover grayscale" />
             ) : (
                <div className="w-full h-full bg-black/5" />
             )}
          </div>
        </section>

        {/* Panel 4: Single Large Image */}
        {project.details.images[2] && (
          <section className="detail-panel w-full lg:w-screen h-[50vh] lg:h-screen flex-none shrink-0 border-r border-black/10 relative overflow-hidden bg-[#111]">
            <img src={project.details.images[2]} alt="Gallery 3" className="detail-parallax w-full h-full object-cover" />
          </section>
        )}

        {/* Panel Final: Next Project Link (Yellow) */}
        {nextProject && (
          <section className="detail-panel w-full lg:w-[60vw] h-[50vh] lg:h-screen flex-none shrink-0 bg-[#f2e500] group cursor-pointer relative overflow-hidden" onClick={() => onBack(nextProject.id)}>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-0"></div>
            <div className="h-full w-full flex flex-col lg:flex-row p-12 lg:p-24 relative z-10 transition-colors duration-700 group-hover:text-white justify-center lg:items-center">
              <div className="flex flex-col gap-8 w-full z-10">
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">PRÓXIMO PROJETO</span>
                <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">{nextProject.name}</h2>
                <ul className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-widest opacity-70">
                  <li>{nextProject.location}</li>
                  <li>{nextProject.desc}</li>
                </ul>
              </div>
              
              <div className="hidden lg:block w-1/2 h-full absolute right-0 top-0 overflow-hidden">
                 <img src={nextProject.img} alt={nextProject.name} className="w-full h-full object-cover grayscale opacity-20 filter brightness-50 mix-blend-multiply lg:group-hover:opacity-60 transition-opacity duration-700" />
              </div>

              <div className="mt-8 lg:mt-0 p-4 border border-current rounded-full flex-none">
                <ArrowRight size={32} />
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ProjectDetail;
