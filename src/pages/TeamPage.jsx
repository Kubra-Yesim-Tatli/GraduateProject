import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Erhan FIRAT',
      role: 'Project Owner',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=erhan&backgroundColor=b6e3f4',
      linkedin: 'https://www.linkedin.com/in/erhanfirat/',
      email: 'erhan.firat@workintech.com.tr'
    },
    {
      name: 'Gökhan Özdemir',
      role: 'Scrum Master',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gokhan&backgroundColor=c0aede',
      linkedin: 'https://www.linkedin.com/in/gokhan-ozdemir/',
      email: 'gokhan.ozdemir@workintech.com.tr'
    },
    {
      name: 'Merve Şahin',
      role: 'Full Stack Developer',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=merve&backgroundColor=ffdfbf',
      linkedin: 'https://www.linkedin.com/in/merve-%C5%9Fahin-b80787280/',
      email: 'mervesahin@gmail.com'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Desktop View */}
      <div className="hidden md:block">
        <h1 className="text-3xl font-bold mb-12 text-center">Our Team</h1>
        
        <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
              <div className="mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-3">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#0891b2] transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-600 hover:text-[#0891b2] transition-colors"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <h1 className="text-2xl font-bold mb-8 text-center">Our Team</h1>
        
        <div className="space-y-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center bg-white rounded-lg shadow-lg p-6">
              <div className="mb-3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 mx-auto"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-2">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#0891b2] transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-600 hover:text-[#0891b2] transition-colors"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
