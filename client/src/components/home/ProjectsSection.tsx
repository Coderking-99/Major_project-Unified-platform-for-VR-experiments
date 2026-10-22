import React, { useState } from 'react';
import { ProjectShowcase } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { ProjectModal } from './ProjectModal';
import {
  Heart,
  CloudRain,
  Activity,
  Atom,
  FlaskConical,
  Dna,
  Magnet,
  Bot,
  ArrowUpRight,
  Boxes,
  Sparkles,
  Layers
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectShowcase | null>(null);

  const projectsData: ProjectShowcase[] = [
    {
      id: 'human-heart',
      title: 'Human Heart Blood Circulation',
      subtitle: 'Cardiovascular 4D Hemodynamic VR Simulation',
      category: 'VR',
      description: 'Step directly inside a beating 3D human heart to observe ventricular contractions, tricuspid valve cycles, and oxygenated blood pathways in 6-DoF.',
      details: 'Physiologically verified hemodynamic simulation demonstrating cardiac cycles, oxygenation differences between pulmonary arteries and systemic aorta, and arrhythmia diagnostics in full virtual reality.',
      technologies: ['Unity 2022.3 LTS', 'Meta Quest XR Toolkit', 'Blender 3D Sculpting', 'HLSL Shaders'],
      unityVersion: '2022.3 LTS',
      targetHardware: ['Meta Quest 2', 'Meta Quest 3', 'Meta Quest Pro'],
      keyFeatures: [
        'Interactive scalpel cross-section cut tool',
        'Controllable BPM from 40 to 180 beats per minute',
        'Deoxygenated vs oxygenated particle flow visualization',
        'Haptic heartbeat pulses calibrated to Touch controllers'
      ],
      learningOutcomes: [
        'Master the 4 chambers, valves, and systemic circulation paths',
        'Understand cardiac output and blood pressure mechanics',
        'Identify myocardial infarctions and valve stenosis pathologies'
      ],
      image: 'heart',
      badge: 'Interactive Anatomy'
    },
    {
      id: 'water-cycle',
      title: 'Water Cycle Simulation',
      subtitle: 'Atmospheric Hydrological Dynamics in AR/VR',
      category: 'AR',
      description: 'An interactive environmental simulation tracing evaporation, condensation, precipitation, and groundwater percolation in full 3D spatial space.',
      details: 'Visualizes macro-meteorological systems and micro-molecular state changes of H2O through temperature sliders, cloud nucleation, and watershed catchment mapping.',
      technologies: ['Unity 2022.3 LTS', 'AR Foundation', 'VFX Graph Particles', 'C# Simulation'],
      unityVersion: '2022.3 LTS',
      targetHardware: ['Meta Quest 3 (MR)', 'Android ARCore', 'WebXR'],
      keyFeatures: [
        'Real-time thermodynamic temperature controls',
        'VFX Graph cloud condensation and precipitation particles',
        'Cross-sectional terrain geology and aquifer table view',
        'Voice-annotated meteorological guides'
      ],
      learningOutcomes: [
        'Understand latent heat in phase changes of water',
        'Analyze transpiration rates across biome topographies',
        'Trace anthropogenic impacts on groundwater replenishment'
      ],
      image: 'water',
      badge: 'Earth Science'
    },
    {
      id: 'kidney-anatomy',
      title: 'Kidney Anatomy & Nephron VR',
      subtitle: 'Microscopic Renal Filtration Explorer',
      category: 'VR',
      description: 'Explore the renal cortex, medulla, and nephron tubules at microscopic scale, following glomerular filtration and urine concentration in real time.',
      details: 'A multi-scale spatial experience transitioning seamlessly from whole-organ gross anatomy down to the Bowman capsule, Podocytes, and the Loop of Henle.',
      technologies: ['Unity 2022.3 LTS', 'URP Mobile Shaders', 'Medical CAD Decimation', 'Spatial Audio'],
      unityVersion: '2022.3 LTS',
      targetHardware: ['Meta Quest 2/3/Pro', 'PCVR'],
      keyFeatures: [
        'Smooth zooming from organ scale to molecular ion exchange',
        'Dialysis simulation module comparing natural vs artificial clearance',
        'Sodium, potassium, and urea osmotic concentration gradients',
        'Stereoscopic labeling with multi-language medical terms'
      ],
      learningOutcomes: [
        'Diagram the microscopic architecture of the nephron',
        'Analyze countercurrent multiplication in the renal medulla',
        'Evaluate renal clearance rates and chronic kidney disease stages'
      ],
      image: 'kidney',
      badge: 'Renal Biology'
    },
    {
      id: 'physics-lab',
      title: 'Physics Virtual Laboratory',
      subtitle: 'Newtonian & Quantum Mechanics Simulator',
      category: 'VR',
      description: 'Conduct zero-gravity experiments, optics refraction, harmonic pendulum resonance, and relativistic mechanics with millimeter-accurate physics.',
      details: 'Empowers students to manipulate gravity, friction coefficients, and photon wavelengths with realistic digital multimeters, calipers, and lasers.',
      technologies: ['Unity 2022.3 LTS', 'PhysX 4.1 Solver', 'XR Interaction Toolkit', 'Custom C# Solvers'],
      unityVersion: '2022.3 LTS',
      targetHardware: ['Meta Quest 2/3', 'Meta Quest Pro'],
      keyFeatures: [
        'Real-time gravitational acceleration modifier (0g to 3g)',
        'Diffraction gratings and laser optics raymarching',
        'Elastic and inelastic collision momentum vector displays',
        'Exportable experiment data logs for laboratory reports'
      ],
      learningOutcomes: [
        'Verify conservation of momentum and energy empirically',
        'Calculate Snell law refraction indices with laser prisms',
        'Explore quantum harmonic oscillator wavefunctions visually'
      ],
      image: 'physics',
      badge: 'STEM Physics'
    },
    {
      id: 'chemistry-lab',
      title: 'Chemistry Virtual Laboratory',
      subtitle: 'Hazard-Free Stoichiometry & Molecular Synthesis',
      category: 'VR',
      description: 'Mix volatile reagents, observe exothermic color changes, and manipulate 3D molecular valence bonds without chemical spills or safety hazards.',
      details: 'Accurately computes molarity, pH changes, crystallization lattices, and enthalpy. Includes virtual fume hoods, Bunsen burners, and periodic table inspection.',
      technologies: ['Unity 2022.3 LTS', 'Dynamic Fluid Shaders', 'Molecular Orbitals Engine', 'Oculus Haptics'],
      unityVersion: '2022.3 LTS',
      targetHardware: ['Meta Quest 2/3/Pro'],
      keyFeatures: [
        'Over 120 reactive inorganic and organic chemical compounds',
        'Dynamic meniscus liquid pouring with surface tension',
        'Flame spectrometry color emission analysis',
        'Instant emergency fire safety simulation tutorial'
      ],
      learningOutcomes: [
        'Balance redox titration equations through experimental feedback',
        'Synthesize organic esters while observing olfactory annotations',
        'Master laboratory safety protocols and protective gear habits'
      ],
      image: 'chemistry',
      badge: 'STEM Chemistry'
    },
    {
      id: 'biology-lab',
      title: 'Biology Virtual Laboratory',
      subtitle: 'Cellular Mitosis & Genetics Exploration',
      category: 'VR',
      description: 'Dissect virtual specimens, manipulate CRISPR gene sequences, and witness living cellular mitosis and mitochondrial ATP synthesis in stereoscopic 3D.',
      details: 'Offers ethical, reusable dissection of virtual organisms alongside high-resolution electron microscope simulation of animal, plant, and bacterial cells.',
      technologies: ['Unity 2022.3 LTS', 'Volumetric Organ Shaders', 'Kinematic Tissue Physics', 'XR Rig'],
      unityVersion: '2022.3 LTS',
      targetHardware: ['Meta Quest 2', 'Meta Quest 3', 'Meta Quest Pro'],
      keyFeatures: [
        'Virtual micro-pipetting and agar plate bacterial culturing',
        'CRISPR Cas-9 target DNA cleaving and insertion puzzle',
        'Stereo electron microscope zooming up to 100,000x',
        'Ethical non-destructive virtual biological specimen dissection'
      ],
      learningOutcomes: [
        'Distinguish prophase, metaphase, anaphase, and telophase stages',
        'Understand ATP synthase turbine mechanics in the mitochondria',
        'Analyze Mendelian and non-Mendelian genetic inheritance traits'
      ],
      image: 'biology',
      badge: 'STEM Biology'
    },
    {
      id: 'magnetic-field',
      title: 'Magnetic Field Simulation',
      subtitle: 'Electromagnetic Flux & Lorentz Force in MR',
      category: 'MR',
      description: 'Place virtual coils, bar magnets, and solenoids in your physical room using Meta Quest passthrough to visualize 3D flux lines and electromagnetic induction.',
      details: 'Calculates Maxwell equations in real time to render dynamic magnetic field vector arrows, Lorentz forces on moving electron beams, and Faraday induction in copper loops.',
      technologies: ['Unity 2022.3 LTS', 'Meta Quest Passthrough MR', 'Vector Field Compute Shaders', 'C#'],
      unityVersion: '2022.3 LTS',
      targetHardware: ['Meta Quest 3 (Color Passthrough)', 'Meta Quest Pro'],
      keyFeatures: [
        'Interactive bar magnets, Helmholtz coils, and current wires',
        'Dynamic iron filing particle alignment and flux density heatmaps',
        'Lorentz force vector visualization on charged particles in flight',
        'Right-hand rule interactive holographic tutorial'
      ],
      learningOutcomes: [
        'Visualize Biot-Savart and Ampere law vector distributions',
        'Understand magnetic dipole moments and permeability of matter',
        'Construct virtual electric motors and measure induced EMF'
      ],
      image: 'magnet',
      badge: 'Electromagnetics'
    },
    {
      id: 'ai-robotics',
      title: 'AI & Robotics Experience',
      subtitle: 'Autonomous Manipulation & Inverse Kinematics',
      category: 'AI & Robotics',
      description: 'Program, teleoperate, and simulate 6-DoF robotic arms with computer vision object classification and obstacle-avoidance AI inside virtual factories.',
      details: 'A bridge between industrial robotics and spatial computing. Users configure robot trajectories, set PID control loops, and deploy reinforcement learning models.',
      technologies: ['Unity 2022.3 LTS', 'ROS2 TCP Connector', 'Inverse Kinematics (IK) Solver', 'YOLOv8 Edge'],
      unityVersion: '2022.3 LTS',
      targetHardware: ['Meta Quest 2/3/Pro', 'PCVR'],
      keyFeatures: [
        'Real-time 6-DoF inverse kinematics with singularity detection',
        'Computer vision camera feed with live bounding-box object classification',
        'Industrial conveyor belt sorting and pick-and-place automation',
        'Teleoperation via Oculus Touch controllers and hand gestures'
      ],
      learningOutcomes: [
        'Derive Denavit-Hartenberg (DH) parameters for robotic joints',
        'Implement trajectory smoothing and collision avoidance algorithms',
        'Understand sensory-motor feedback loops in autonomous robotics'
      ],
      image: 'robot',
      badge: 'Robotics & AI'
    }
  ];

  // Helper icon selector
  const getProjectIcon = (imgKey: string) => {
    switch (imgKey) {
      case 'heart': return Heart;
      case 'water': return CloudRain;
      case 'kidney': return Activity;
      case 'physics': return Atom;
      case 'chemistry': return FlaskConical;
      case 'biology': return Dna;
      case 'magnet': return Magnet;
      case 'robot': return Bot;
      default: return Boxes;
    }
  };

  return (
    <section id="projects" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Boxes className="w-3.5 h-3.5" />
            Curriculum & Simulation Library
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Immersive{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            High-fidelity AR/VR applications built specifically on Unity 2022 for the Meta Quest and Oculus platform, ready for standalone deployment.
          </p>
        </div>

        {/* 8 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectsData.map((proj) => {
            const Icon = getProjectIcon(proj.image);
            return (
              <GlassCard
                key={proj.id}
                className="p-6 flex flex-col justify-between group overflow-hidden"
                glow="cyan"
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110 group-hover:text-white transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                      {proj.category}
                    </span>
                  </div>

                  {/* Project Info */}
                  <div>
                    <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-5 mt-4 border-t border-white/10">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 transition-all text-xs font-semibold tracking-wide"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>

      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
