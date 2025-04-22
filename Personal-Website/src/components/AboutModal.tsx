import React from 'react';
import { Code2, Brain, Rocket, Heart } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <div className="absolute top-4 right-4">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
                About Me
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Passionate about creating innovative solutions and pushing the boundaries of technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl transition-transform duration-300 group-hover:scale-105">
                  <Code2 className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">The Developer</h3>
                  <p className="text-gray-600">
                    Crafting clean, efficient code and building user-friendly applications that solve real-world problems.
                    Constantly learning and adapting to new technologies.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl transition-transform duration-300 group-hover:scale-105">
                  <Brain className="w-10 h-10 text-purple-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">The Learner</h3>
                  <p className="text-gray-600">
                    Pursuing a Computer Science degree with a focus on emerging technologies.
                    Always eager to explore new concepts and challenge myself.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl transition-transform duration-300 group-hover:scale-105">
                  <Rocket className="w-10 h-10 text-pink-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">The Innovator</h3>
                  <p className="text-gray-600">
                    Driven by creativity and the desire to innovate. Always looking for ways to improve and optimize solutions.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 p-6 rounded-xl transition-transform duration-300 group-hover:scale-105">
                  <Heart className="w-10 h-10 text-rose-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">The Collaborator</h3>
                  <p className="text-gray-600">
                    Believing in the power of teamwork and open communication. Committed to creating positive impact through technology.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Journey</h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Starting from a young age, I've been fascinated by technology and its potential to change lives.
                  This passion led me to pursue Computer Science and dive deep into software development.
                </p>
                <p className="text-gray-600">
                  Today, I focus on creating elegant solutions that combine technical excellence with user-centered design.
                  Whether it's web development, machine learning, or cloud computing, I'm always excited to take on new challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}