import React, { useState, useEffect } from 'react';
import { Camera, Award, Users, Heart, Clock, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { 
    
  MessageCircle, 
  Briefcase, 
  CalendarHeart, 
  Package, 
  Film, 
    
  
} from "lucide-react"
import Image from 'next/image';
export default function AboutPage() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '1000+', label: 'Projects Completed', icon: Camera },
    { number: '15+', label: 'Years Experience', icon: Clock },
    { number: '50+', label: 'Awards Won', icon: Award },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Art',
      description: 'Every frame tells a story, and we pour our heart into capturing those perfect moments that last forever.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We strive for perfection in every shot, ensuring the highest quality in both creativity and technical execution.'
    },
    {
      icon: Users,
      title: 'Client First',
      description: 'Your vision is our priority. We work closely with you to bring your dreams to life through our lens.'
    },
    {
      icon: CheckCircle,
      title: 'Reliability',
      description: 'Professional, punctual, and dependable. We deliver on our promises and exceed expectations every time.'
    },
  ];

  

const services = [
  {
    number: "01",
    icon: Camera,
    title: "Wedding Photography",
    description: "Capture your special day with professional wedding photographers who match your style and budget.",
    bgColor: "from-purple-50 to-violet-100",
    iconBg: "from-purple-500 to-violet-600",
    numberColor: "from-purple-500 to-violet-600",
    borderColor: "from-purple-500 to-violet-600",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Portrait Sessions",
    description: "Book portrait sessions for personal, family, or professional use with skilled photographers.",
    bgColor: "from-green-50 to-emerald-100",
    iconBg: "from-green-500 to-emerald-500",
    numberColor: "from-green-500 to-emerald-500",
    borderColor: "from-green-500 to-emerald-500",
  },
  {
    number: "03",
    icon: Briefcase,
    title: "Commercial Shoots",
    description: "Enhance your brand presence with high-quality product and corporate photography.",
    bgColor: "from-amber-50 to-orange-100",
    iconBg: "from-amber-500 to-orange-600",
    numberColor: "from-amber-500 to-orange-600",
    borderColor: "from-amber-500 to-orange-600",
  },
  {
    number: "04",
    icon: CalendarHeart,
    title: "Event Coverage",
    description: "Comprehensive photography coverage for birthdays, concerts, and private events.",
    bgColor: "from-rose-50 to-pink-100",
    iconBg: "from-rose-500 to-pink-600",
    numberColor: "from-rose-500 to-pink-600",
    borderColor: "from-rose-500 to-pink-600",
  },
  {
    number: "05",
    icon: Package,
    title: "Product Photography",
    description: "Showcase your products with creative and detailed visuals for e-commerce and marketing.",
    bgColor: "from-sky-50 to-blue-100",
    iconBg: "from-sky-500 to-blue-600",
    numberColor: "from-sky-500 to-blue-600",
    borderColor: "from-sky-500 to-blue-600",
  },
  {
    number: "06",
    icon: Film,
    title: "Cinematography",
    description: "Professional video production for weddings, corporate events, and storytelling projects.",
    bgColor: "from-indigo-50 to-blue-100",
    iconBg: "from-indigo-500 to-blue-600",
    numberColor: "from-indigo-500 to-blue-600",
    borderColor: "from-indigo-500 to-blue-600",
  },
  {
    number: "07",
    icon: Users,
    title: "Team Photography",
    description: "Get cohesive and creative team portraits that reflect your brand’s identity and energy.",
    bgColor: "from-teal-50 to-cyan-100",
    iconBg: "from-teal-500 to-cyan-600",
    numberColor: "from-teal-500 to-cyan-600",
    borderColor: "from-teal-500 to-cyan-600",
  },
  {
    number: "08",
    icon: Star,
    title: "Creative Projects",
    description: "Collaborate with skilled artists for fashion, editorial, or conceptual photography projects.",
    bgColor: "from-fuchsia-50 to-rose-100",
    iconBg: "from-fuchsia-500 to-rose-600",
    numberColor: "from-fuchsia-500 to-rose-600",
    borderColor: "from-fuchsia-500 to-rose-600",
  },
];


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 lg:py-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mb-8 mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image */}
            <div className={`transform transition-all duration-1000 ease-out ${
              showText ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}>
              <div className="relative">
                {/* Decorative Frames */}
                <div className="absolute -top-8 -left-8 w-full h-full">
                  <div className="w-full h-full border-2 border-orange-400/30 rounded-2xl"></div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-full h-full">
                  <div className="w-full h-full border-2 border-pink-400/30 rounded-2xl"></div>
                </div>

                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/90 to-pink-500/90 flex items-center justify-center">
                    <Image
                               src="/photographer.webp"
                               alt="KliqShot Logo"
                               fill
                               className="object-contain w-full h-full"
                               priority
                             />
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                  <div className="text-center">
                    <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">15+</p>
                    <p className="text-sm text-gray-600 font-medium">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <div className={`transform transition-all duration-1000 ease-out delay-200 ${
                showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <p className="inline-block px-4 py-2 bg-gradient-to-r from-orange-400/10 to-pink-500/10 border border-orange-400/20 rounded-full text-orange-400 font-medium mb-6 text-sm tracking-wider uppercase">
                  About KliqShot
                </p>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  <span className="text-white">Crafting Visual</span>
                  <span className="block mt-2 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                    Stories That Last
                  </span>
                </h1>
              </div>

              <div className={`transform transition-all duration-1000 ease-out delay-300 ${
                showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  We're more than photographers—we're memory makers. With over 15 years of experience and a passion for perfection, we transform fleeting moments into timeless treasures.
                </p>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  From intimate weddings to grand celebrations, corporate events to personal milestones, we bring creativity, professionalism, and heart to every shoot.
                </p>
              </div>

              {/* Stats Mini Grid */}
              <div className={`grid grid-cols-2 gap-4 mb-10 transform transition-all duration-1000 ease-out delay-400 ${
                showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300">
                      <Icon className="w-6 h-6 text-orange-400 mb-3" />
                      <p className="text-2xl font-bold text-white mb-1">{stat.number}</p>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-wrap gap-4 transform transition-all duration-1000 ease-out delay-500 ${
                showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <button className="group px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 flex items-center gap-2">
                  Book Your Session
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/30">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 mt-4 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent font-medium mb-4 tracking-widest uppercase text-sm">
              Our Story
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              The Journey Behind the Lens
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              What started as a passion project in 2010 has evolved into a full-fledged creative studio dedicated to capturing life's most precious moments. Our journey began with a simple camera and an insatiable desire to freeze time.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Over the years, we've had the privilege of documenting countless weddings, events, and personal milestones. Each project has taught us something new, refined our craft, and deepened our appreciation for the art of photography.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Today, we bring together technical expertise, artistic vision, and genuine care for our clients to create images that don't just capture moments—they tell stories, evoke emotions, and preserve memories for generations to come.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-400 font-medium mb-4 tracking-widest uppercase text-sm">
              Our Values
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group border border-white/20"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 lg:px-12 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <p className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent font-medium mb-4 tracking-widest uppercase text-sm">
        Services
      </p>
      <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent mb-6">
        What We Offer
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 group-hover:scale-110 transition-transform duration-300">
      {services.map((service, index) => {
         
        
        return (
          <div
            key={index}
            className={`
    bg-gradient-to-br ${service.bgColor}
    border border-gray-100 rounded-2xl shadow-md mx-auto p-6 relative
    hover:shadow-lg transition-all duration-300 hover:scale-105
    flex flex-col items-center text-center h-full
  `}
             
          >
            {/* Number Badge */}
            <div className={`bg-gradient-to-br ${service.numberColor} text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center absolute -top-3 -left-3 shadow-md`}>
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Icon */}
            <div className={`bg-gradient-to-br ${service.iconBg} hover:scale-105 rounded-2xl mx-auto w-16 h-16 flex items-center justify-center text-2xl mb-4 shadow-sm`}>
              {service.icon && <service.icon className="w-8 h-8 text-white" />}
            </div>

            {/* Service Name */}
            <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
              {service.title}
            </h3>
            
            {/* Optional description - you can add this to your services array */}
            <p className="text-sm text-gray-600">
              {service.description}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-t-3xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Create Magic Together?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's capture your special moments and turn them into timeless memories.
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50">
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}