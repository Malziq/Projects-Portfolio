import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Brain, Globe, Sparkles, ArrowRight, FileText, GraduationCap, Briefcase, Target } from 'lucide-react';

function App() {
  // State to track if the user has scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  // State to store the text being typed
  const [text, setText] = useState('');
  // State to check if typing animation is complete
  const [typingComplete, setTypingComplete] = useState(false);
  // State to track the currently active section
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let currentIndex = 0;
    const fullText = 'Mazen Alziq';
    // Typing effect interval
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

  // Function to scroll to a specific section
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

  // URL for the resume
  const resumeUrl = "https://drive.google.com/file/d/1IJmhRVcT4YBon0BrKx0TXz-FdB4v93PY/view?usp=sharing";

  // List of projects
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
      
      {/* home page */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        {/* gradient for the home page*/}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-100 to-purple-300">
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

      {/* About Me  */}
      <section id="about" className="relative min-h-screen py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent bg-[length:120%_auto] hover:bg-[length:200%_auto] transition-all duration-500">
                  About Me
                </span>
              </h2>
              <p className="text-2xl text-gray-700 max-w-5xl mx-auto">
                Hello! I'm Mazen Alziq, a third year computer science undergraduate at Santa Clara University,
                 and an aspiring AI/ML engineer. I have a keen interest in building innovative projects 
                 and solutions that can make a tangible difference to the lives of others. To see a detailed description of what lies below, 
                 <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> click here!</a>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-6">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-semibold text-gray-800 ml-4">Education</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-medium text-gray-800">Bachelor of Science in Computer Science</h4>
                    <p className="text-lg text-gray-600">Santa Clara University</p>
                    <p className="text-base text-gray-500">Expected Graduation: June 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-6">
                  <Briefcase className="w-8 h-8 text-purple-600" />
                  <h3 className="text-2xl font-semibold text-gray-800 ml-4">Experience</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-medium text-gray-800">Software Engineer Intern</h4>
                    <p className="text-lg text-gray-600">Innowi Inc. - Santa Clara, CA</p>
                    <p className="text-base text-gray-500">August - October 2024</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-teal-600" />
                <h3 className="text-2xl font-semibold text-gray-800 ml-4">Goals & Interests</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-medium text-gray-800 mb-4">Technical Interests</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Code2 className="w-5 h-5 text-blue-600 mr-2" />
                      Full-Stack Development
                    </li>
                    <li className="flex items-center">
                      <Brain className="w-5 h-5 text-purple-600 mr-2" />
                      Machine Learning & AI
                    </li>
                    <li className="flex items-center">
                      <Globe className="w-5 h-5 text-teal-600 mr-2" />
                      Cloud Computing
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-800 mb-4">Professional Goals</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Sparkles className="w-5 h-5 text-yellow-600 mr-2" />
                      Create Impactful Solutions
                    </li>
                    <li className="flex items-center">
                      <Github className="w-5 h-5 text-gray-600 mr-2" />
                      Contribute to Open Source
                    </li>
                    <li className="flex items-center">
                      <Brain className="w-5 h-5 text-rose-600 mr-2" />
                      Advance AI Technology
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a 
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                View Full Resume
                <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* projects section */}
      <section id="projects" className="pt-28 pb-20 px-4 relative overflow-hidden">
        {/* Add matching gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-100 to-blue-200"></div>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 via-purple-300/30 to-cyan-300/10"></div>
          </div>
          <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay"></div>
        </div>

        {/* Increase max-width from max-w-4xl to max-w-6xl */}
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h2 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent bg-[length:120%_auto] hover:bg-[length:200%_auto] transition-all duration-500">
              Featured Projects
            </span>
            <div className="absolute w-full h-1 bg-gradient-to-r from-blue-700 to-teal-500 bottom-0 left-0 mt-2"></div>
          </h2>
          <p className="text-2xl text-gray-700 max-w-5xl mx-auto mb-12">
            A showcase of some of the most impactful and innovative projects I have worked on.
          </p>
          
          <div className="space-y-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-md rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-semibold mb-3 text-gray-800">{project.title}</h3>
                    <p className="text-lg text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      View Project <ExternalLink size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
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