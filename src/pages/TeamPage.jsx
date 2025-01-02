import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Erhan FIRAT',
      role: 'Project Owner',
      image: 'https://media.licdn.com/dms/image/C4D03AQFj_3YR0MiC4w/profile-displayphoto-shrink_800_800/0/1578520926261?e=1709769600&v=beta&t=qTGwJLXZJrJ4VWv1aPJnwVEJzgHkHKNGVFiB2SHFPiM',
      linkedin: 'https://www.linkedin.com/in/erhanfirat/',
      email: 'erhan.firat@workintech.com.tr'
    },
    {
      name: 'Gökhan Özdemir',
      role: 'Scrum Master',
      image: 'https://media.licdn.com/dms/image/C4D03AQGg5ASWOHVOtQ/profile-displayphoto-shrink_800_800/0/1657711676405?e=1709769600&v=beta&t=_sPcuC6k5u2i_IJt9RXFFEXGRz-O2TxOSupe5V83_Ow',
      linkedin: 'https://www.linkedin.com/in/gokhan-ozdemir/',
      email: 'gokhan.ozdemir@workintech.com.tr'
    },
    {
      name: 'Merve Şahin',
      role: 'Full Stack Developer',
      image: 'https://avatars.githubusercontent.com/u/129686552?v=4',
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
            <div key={index} className="text-center">
              <div className="mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-3">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#0891b2]"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-600 hover:text-[#0891b2]"
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
            <div key={index} className="text-center">
              <div className="mb-3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-2">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#0891b2]"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-600 hover:text-[#0891b2]"
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
