import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail, ExternalLink, Code2, BookOpen, Terminal, Database, FileText, Brain, Cpu, Globe, Cloud, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { About } from './pages/About';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [text, setText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

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
      
      const sections = ['home', 'skills', 'projects', 'contact'];
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
    if (id === 'about') {
      navigate('/about');
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
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
      }, 100);
    } else {
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

  const renderMainContent = () => (
    <>
      <header id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-200 to-purple-300"></div>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300/30 via-purple-300/30 to-cyan-300/10"></div>
          </div>
          <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 text-center px-4">
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
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Get in Touch
            </a>
            <a 
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
              className="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors shadow-md hover:shadow-lg"
            >
              View Projects
            </a>
          </div>
          <div className="flex justify-center space-x-8">
            <a 
              href="https://github.com/Malziq" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 transition-colors text-gray-700 transform hover:scale-110 duration-300"
            >
              <Github size={26} />
            </a>
            <a 
              href="https://www.linkedin.com/in/mazen-alziq" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 transition-colors text-gray-700 transform hover:scale-110 duration-300"
            >
              <Linkedin size={26} />
            </a>
            <a 
              href="mailto:alziq.mazen@gmail.com" 
              className="hover:text-blue-600 transition-colors text-gray-700 transform hover:scale-110 duration-300"
            >
              <Mail size={26} />
            </a>
            <a 
              href={resumeUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 transition-colors text-gray-700 transform hover:scale-110 duration-300"
            >
              <FileText size={26} />
            </a>
          </div>
        </div>
      </header>

      <section id="projects" className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Exploring the intersection of technology and innovation through carefully crafted solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
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

                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5 transition-all duration-300"></div>
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

      <section id="skills" className="pt-28 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50"></div>
          <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center mb-16 relative inline-block">
            <span className="bg-gradient-to-r from-blue-700 to-teal-500 text-transparent bg-clip-text">Technical Expertise</span>
            <div className="absolute w-full h-1 bg-gradient-to-r from-blue-700 to-teal-500 bottom-0 left-0 mt-2"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <Brain className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">Core Development</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <Code2 className="w-5 h-5 mr-2 text-blue-500" />
                    Python & Java Development
                  </li>
                  <li className="flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-blue-500" />
                    JavaScript/TypeScript
                  </li>
                  <li className="flex items-center">
                    <Terminal className="w-5 h-5 mr-2 text-blue-500" />
                    Shell Scripting
                  </li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <Cpu className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">Web Technologies</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                    React & Next.js
                  </li>
                  <li className="flex items-center">
                    <Database className="w-5 h-5 mr-2 text-purple-500" />
                    SQL & NoSQL Databases
                  </li>
                  <li className="flex items-center">
                    <Terminal className="w-5 h-5 mr-2 text-purple-500" />
                    Node.js & Express
                  </li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <Cloud className="w-8 h-8 text-cyan-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">Cloud & DevOps</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-cyan-500" />
                    AWS Services
                  </li>
                  <li className="flex items-center">
                    <Terminal className="w-5 h-5 mr-2 text-cyan-500" />
                    Docker & Kubernetes
                  </li>
                  <li className="flex items-center">
                    <Code2 className="w-5 h-5 mr-2 text-cyan-500" />
                    CI/CD Pipelines
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Currently Learning</h3>
              <div className="space-y-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        Machine Learning
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        75%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                  </div>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                        Cloud Architecture
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        60%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                    <div style={{ width: "60%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Soft Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">Problem Solving</span>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100">
                  <Brain className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-gray-700">Critical Thinking</span>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-cyan-50 to-cyan-100">
                  <Globe className="w-5 h-5 text-cyan-600 mr-2" />
                  <span className="text-gray-700">Communication</span>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-teal-50 to-teal-100">
                  <Sparkles className="w-5 h-5 text-teal-600 mr-2" />
                  <span className="text-gray-700">Leadership</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 relative inline-block">
            <span className="bg-gradient-to-r from-blue-700 to-teal-500 text-transparent bg-clip-text">Let's Connect</span>
            <div className="absolute w-full h-1 bg-gradient-to-r from-blue-700 to-teal-500 bottom-0 left-0 mt-2"></div>
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:alziq.mazen@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Mail className="mr-2" size={20} />
              Email
            </a>
            <a 
              href="https://www.linkedin.com/in/mazen-alziq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Linkedin className="mr-2" size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/Malziq" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/mazen-alziq" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:alziq.mazen@gmail.com" className="hover:text-blue-400 transition-colors">
              <Mail size={20} />
            </a>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <FileText size={20} />
            </a>
          </div>
          <p className="text-gray-400">© {new Date().getFullYear()} Mazen Alziq. All rights reserved.</p>
        </div>
      </footer>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
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
                className={`text-gray-800 hover:text-blue-600 transition-colors font-medium text-lg relative group ${location.pathname === '/about' ? 'text-blue-600' : ''}`}
              >
                About
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
              <button 
                onClick={() => scrollToSection('skills')} 
                className={`text-gray-800 hover:text-blue-600 transition-colors font-medium text-lg relative group ${activeSection === 'skills' ? 'text-blue-600' : ''}`}
              >
                Skills
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'skills' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className={`text-gray-800 hover:text-blue-600 transition-colors font-medium text-lg relative group ${activeSection === 'projects' ? 'text-blue-600' : ''}`}
              >
                Projects
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'projects' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className={`text-gray-800 hover:text-blue-600 transition-colors font-medium text-lg relative group ${activeSection === 'contact' ? 'text-blue-600' : ''}`}
              >
                Contact
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={renderMainContent()} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;