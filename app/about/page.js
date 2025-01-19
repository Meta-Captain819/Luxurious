import Image from "next/image";
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  subsets: ['latin'], 
  weight: '400', 
  style: 'normal', 
});

const About = () => {
  return (
    <div className="bg-white text-darkGray">
    
      <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gold mb-4">Who We Are</h2>
          <p className="text-lg leading-relaxed">
            We are a team of passionate individuals dedicated to delivering
            exceptional products and services. With a focus on elegance, we
            strive to exceed your expectations every step of the way.
          </p>
        </div>
        <div className="flex-1">
        <h2 style={{ fontFamily: greatVibes.style.fontFamily }} className="text-gold lg:text-9xl text-8xl lg:ml-28 md:ml-24">Luxurious</h2>

        </div>
      </section>

      <section className="bg-lightGray py-12 px-8 md:px-16">
        <h2 className="text-3xl font-bold text-center text-gold mb-8">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 gap-8">
          {[
            { name: "Muzammil Mehdi", role: "CEO/CTO/Designer/Developer", image: "/me.png" },
            
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gold">{member.name}</h3>
              <p className="text-sm mt-2">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

     
    </div>
  );
};

export default About;
