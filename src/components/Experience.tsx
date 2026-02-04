import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const Experience = () => {
  const jobs = [
    {
      company: "RED Projects & Management",
      role: "Founder / Lead Consultant",
      period: "2025 - Present",
      location: "Netherlands",
      desc: "Delivering bespoke R&D strategies and project management for industry leaders across Europe."
    },
    {
      company: "imec",
      role: "Strategic R&D Consultant",
      period: "2025 - Present",
      location: "Belgium",
      desc: "Managing collaborative R&D programs in advanced semiconductor and automotive gate-driving solutions."
    },
    {
      company: "Signify",
      role: "Senior R&D Project Manager",
      period: "Previous",
      location: "Netherlands",
      desc: "Directed complex product development lifecycles in smart lighting and industrial electronics."
    },
    {
      company: "Thermo Fisher Scientific",
      role: "Project Manager III",
      period: "Previous",
      location: "Netherlands",
      desc: "Led cross-functional engineering teams for precision scientific instrumentation."
    }
  ];

  return (
    <section id="experience" className="container">
      <motion.h2 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        className="section-title"
      >
        Selected Experience
      </motion.h2>
      <div className="timeline-grid">
        {jobs.map((job, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="experience-card glass"
          >
            <div className="card-top">
              <span className="period">{job.period}</span>
              <span className="location"><MapPin size={14} /> {job.location}</span>
            </div>
            <h3>{job.role}</h3>
            <h4>{job.company}</h4>
            <p>{job.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
