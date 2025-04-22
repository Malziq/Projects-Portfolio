import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Brain, Globe, Sparkles, ArrowRight, FileText, GraduationCap, Briefcase, Target } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [text, setText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let currentIndex = 0;
    const fullText = 'Mazen Alziq';
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      const sections = ['home', 'about', 'projects'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const resumeUrl = "https://drive.google.com/file/d/1IJmhRVcT4YBon0BrKx0TXz-FdB4v93PY/view?usp=sharing";

  const projects = [
    {
      title: "AI-Powered Analytics Dashboard",
      description: "A real-time analytics platform utilizing machine learning algorithms for predictive insights and data visualization. Built with React and TensorFlow.js, this dashboard provides real-time data analysis and visualization capabilities.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      tags: ["React", "Python", "TensorFlow", "D3.js"],
      link: "#",
      category: "Machine Learning"
    },
    {
      title: "Cloud-Native Microservices",
      description: "Scalable microservices architecture deployed on cloud infrastructure with automated CI/CD pipeline. Implements event-driven architecture and handles high-throughput data processing.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
      tags: ["Node.js", "Docker", "AWS", "Kubernetes"],
      link: "#",
      category: "Cloud Computing"
    },
    {
      title: "Blockchain Development",
      description: "Smart contract development and implementation for decentralized applications using blockchain technology. Features include NFT marketplace and DeFi protocols.",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200",
      tags: ["Solidity", "Web3", "React", "Ethereum"],
      link: "#",
      category: "Blockchain"
    },
    {
      title: "Real-time Collaboration Platform",
      description: "A collaborative workspace platform with real-time document editing, video conferencing, and team management features.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
      tags: ["WebRTC", "Socket.io", "React", "Node.js"],
      link: "#",
      category: "Web Development"
    }
  ];

  return (
    <div className="min-h-screen">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-md border-b border-gray-200/20' 
          : 'bg-transparent border-b border-white/5'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center h-20">
            <div className="flex space-x-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className={`text-gray-800 hover:text-blue-600 transition-colors font-medium text-lg relative group ${activeSection === 'home' ? 'text-blue-600' : ''}`}
              >
                Home
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className={`text-gray-800 hover:text-blue-600 transition-colors font-medium text-lg relative group ${activeSection === 'about' ? 'text-blue-600' : ''}`}
              >
                About
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className={`text-gray-800 hover:text-blue-600 transition-colors font-medium text-lg relative group ${activeSection === 'projects' ? 'text-blue-600' : ''}`}
              >
                Projects
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'projects' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-200 to-purple-300">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300/30 via-purple-300/30 to-cyan-300/10"></div>
          <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay"></div>
        </div>
        <div className="relative text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 relative group">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-xl transform group-hover:scale-110 transition-transform duration-500"></span>
              <span className="relative bg-gradient-to-r from-blue-700 to-teal-500 text-transparent bg-clip-text transform hover:scale-105 transition-transform duration-300 inline-block">
                {text}{!typingComplete && <span className="animate-blink">|</span>}
              </span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-700">Computer Science Student & Developer</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              View Projects
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors shadow-md hover:shadow-lg"
            >
              About Me
            </button>
          </div>
          <div className="flex justify-center space-x-8">
            <a 
              href="https://github.com/Malziq" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative hover:text-blue-600 transition-colors text-gray-700 transform hover:scale-110 duration-300"
            >
              <Github size={26} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                GitHub Profile
              </span>
            </a>
            <a 
              href="https://www.linkedin.com/in/mazen-alziq" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative hover:text-blue-600 transition-colors text-gray-700 transform hover:scale-110 duration-300"
            >
              <Linkedin size={26} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                LinkedIn Profile
              </span>
            </a>
            <a 
              href="mailto:alziq.mazen@gmail.com" 
              className="group relative hover:text-blue-600 transition-colors text-gray-700 transform hover:scale-110 duration-300"
            >
              <Mail size={26} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Send Email
              </span>
            </a>
            <a 
              href={resumeUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative hover:text-blue-600 transition-colors text-gray-700 transform hover:scale-110 duration-300"
            >
              <FileText size={26} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                View Resume
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="relative min-h-screen py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
                About Me
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Hello! I'm Mazen Alziq, a passionate Computer Science student and developer with a keen interest in building innovative solutions that make a difference. I thrive on challenges and am constantly exploring new technologies to expand my skillset.
              </p>

              <div className="space-y-12">
                <div>
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-semibold text-gray-800">Education</h3>
                  </div>
                  <div className="ml-9">
                    <div className="mb-6">
                      <h4 className="text-xl font-medium text-gray-800">Bachelor of Science in Computer Science</h4>
                      <p className="text-gray-600">University of California, Berkeley</p>
                      <p className="text-gray-500">Expected Graduation: May 2025</p>
                      <ul className="list-disc ml-4 mt-2 text-gray-700">
                        <li>Major GPA: 3.8/4.0</li>
                        <li>Relevant Coursework: Data Structures, Algorithms, Machine Learning, Database Systems</li>
                        <li>Member of Computer Science Honors Society</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <Briefcase className="w-6 h-6 text-purple-600 mr-3" />
                    <h3 className="text-2xl font-semibold text-gray-800">Work Experience</h3>
                  </div>
                  <div className="ml-9">
                    <div className="mb-6">
                      <h4 className="text-xl font-medium text-gray-800">Software Engineering Intern</h4>
                      <p className="text-gray-600">Google - Mountain View, CA</p>
                      <p className="text-gray-500">Summer 2023</p>
                      <ul className="list-disc ml-4 mt-2 text-gray-700">
                        <li>Developed and maintained cloud-based applications using Google Cloud Platform</li>
                        <li>Collaborated with senior engineers on implementing new features</li>
                        <li>Improved application performance by 40% through optimization</li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-xl font-medium text-gray-800">Research Assistant</h4>
                      <p className="text-gray-600">UC Berkeley AI Research Lab</p>
                      <p className="text-gray-500">2022 - Present</p>
                      <ul className="list-disc ml-4 mt-2 text-gray-700">
                        <li>Conducting research on machine learning applications in healthcare</li>
                        <li>Published 2 papers in international conferences</li>
                        <li>Mentoring junior researchers and leading weekly discussions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <Target className="w-6 h-6 text-rose-600 mr-3" />
                    <h3 className="text-2xl font-semibold text-gray-800">Goals & Interests</h3>
                  </div>
                  <div className="ml-9">
                    <p className="text-gray-700 mb-4">
                      My primary goal is to leverage technology to create meaningful impact. I'm particularly interested in:
                    </p>
                    <ul className="list-disc ml-4 text-gray-700 space-y-2">
                      <li>Developing scalable solutions for real-world problems</li>
                      <li>Exploring the intersection of AI and healthcare</li>
                      <li>Contributing to open-source projects</li>
                      <li>Mentoring and teaching others in technology</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative min-h-screen flex items-center justify-center py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-200 to-purple-300">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300/30 via-purple-300/30 to-cyan-300/10"></div>
          <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Exploring the intersection of technology and innovation through carefully crafted solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-gray-900/40 z-10"></div>
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-blue-500/90 text-white rounded-full text-sm font-medium shadow-lg">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="relative p-6 z-20">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium border border-blue-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors group/link"
                  >
                    View Project 
                    <ArrowRight size={16} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a 
              href="https://github.com/Malziq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Github className="mr-2" size={20} />
              View More on GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="relative py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/Malziq" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors text-gray-700">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/mazen-alziq" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors text-gray-700">
              <Linkedin size={20} />
            </a>
            <a href="mailto:alziq.mazen@gmail.com" className="hover:text-blue-600 transition-colors text-gray-700">
              <Mail size={20} />
            </a>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors text-gray-700">
              <FileText size={20} />
            </a>
          </div>
          <p className="text-gray-700">© {new Date().getFullYear()} Mazen Alziq. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;