'use client';

// About Page — converted from Kimi's design
import { motion, type Variants } from 'framer-motion';
import {
  Globe, Users, Heart, MapPin, Camera, Star,
  Target, Compass, Lightbulb, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const stats = [
  { value: '500K+', label: 'Monthly Travelers', icon: Users },
  { value: '150+', label: 'Destinations', icon: MapPin },
  { value: '10K+', label: 'Hotels Listed', icon: Star },
  { value: '50K+', label: 'Reviews', icon: Heart },
];

const values = [
  { icon: Compass, title: 'Authentic Experiences', description: 'We believe in real travel experiences, not tourist traps. Our recommendations come from locals and seasoned travelers.' },
  { icon: Users, title: 'Community First', description: 'Our community of travelers shares honest reviews and tips, helping others make informed decisions.' },
  { icon: Target, title: 'Quality Over Quantity', description: 'We carefully curate every listing and recommendation to ensure you get only the best options.' },
  { icon: Lightbulb, title: 'Innovation', description: 'We constantly improve our platform with new features to make travel planning easier and more enjoyable.' },
];

const team = [
  { name: 'David Chen', role: 'Founder & CEO', avatar: 'DC', bio: 'Former travel blogger with a passion for exploring off-the-beaten-path destinations.' },
  { name: 'Sarah Mitchell', role: 'Head of Content', avatar: 'SM', bio: 'Travel writer with 10+ years of experience covering destinations worldwide.' },
  { name: 'James Cooper', role: 'Product Lead', avatar: 'JC', bio: 'Tech enthusiast focused on building intuitive travel planning tools.' },
  { name: 'Emma Wilson', role: 'Community Manager', avatar: 'EW', bio: 'Social media expert connecting travelers from around the globe.' },
];

const milestones = [
  { year: '2020', title: 'TRAVI Founded', description: 'Started as a small travel blog sharing authentic destination guides.' },
  { year: '2021', title: 'Platform Launch', description: 'Launched our first travel planning platform with 50 destinations.' },
  { year: '2022', title: 'Community Growth', description: 'Reached 100,000 active users and launched the review system.' },
  { year: '2023', title: 'Global Expansion', description: 'Expanded to 150+ destinations across all continents.' },
  { year: '2024', title: 'AI Integration', description: 'Introduced AI-powered travel recommendations and planning tools.' },
  { year: '2025', title: 'Mobile App', description: 'Launched our mobile app for on-the-go travel planning.' },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-gray-50 py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#573CD0]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#573CD0]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#573CD0]/10 rounded-full mb-6">
              <Globe className="w-4 h-4 text-[#573CD0]" />
              <span className="text-sm font-medium text-[#573CD0]">About TRAVI</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-semibold text-gray-900 mb-6">
              We&apos;re on a Mission to Make{' '}
              <span className="bg-gradient-to-r from-[#573CD0] to-[#6443F4] bg-clip-text text-transparent">Travel Better</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              TRAVI is a community-driven travel platform that helps millions of travelers discover, plan, and book their perfect trips with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 lg:py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#573CD0]/10 mb-4">
                  <stat.icon className="w-6 h-6 text-[#573CD0]" />
                </div>
                <p className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#573CD0]/10 rounded-full mb-6">
                <Camera className="w-4 h-4 text-[#573CD0]" />
                <span className="text-sm font-medium text-[#573CD0]">Our Story</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6">From a Travel Blog to a Global Community</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>TRAVI started in 2020 when our founder, David Chen, realized how difficult it was to find authentic travel information online. Most travel sites were filled with sponsored content and generic recommendations.</p>
                <p>What began as a personal travel blog quickly grew into a community of passionate travelers sharing their real experiences. Today, TRAVI has become one of the most trusted travel platforms, helping millions plan their perfect trips.</p>
                <p>We believe that travel has the power to change lives, broaden perspectives, and connect people across cultures. That&apos;s why we&apos;re committed to making travel planning as seamless and enjoyable as possible.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#573CD0]/20 to-[#573CD0]/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[#573CD0] flex items-center justify-center">
                    <Globe className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">TRAVI</p>
                  <p className="text-gray-600">Travel Smarter</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#573CD0]/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#573CD0]/10 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600">These principles guide everything we do at TRAVI</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
            {values.map((value) => (
              <motion.div key={value.title} variants={fadeInUp} className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 hover:border-[#573CD0]/30 hover:shadow-lg transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#573CD0]/10 mb-4">
                  <value.icon className="w-6 h-6 text-[#573CD0]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">Key milestones in TRAVI&apos;s growth story</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gray-200 lg:-translate-x-px" />
            {milestones.map((milestone, index) => (
              <motion.div key={milestone.year} variants={fadeInUp} className={`relative flex items-start gap-8 mb-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} hidden lg:block`}>
                  {index % 2 === 0 && (
                    <><span className="text-2xl font-semibold text-[#573CD0]">{milestone.year}</span><h3 className="text-xl font-semibold text-gray-900 mt-1">{milestone.title}</h3><p className="text-gray-600 mt-2">{milestone.description}</p></>
                  )}
                </div>
                <div className="relative z-10 w-8 h-8 rounded-full bg-[#573CD0] border-4 border-white shadow-md flex-shrink-0" />
                <div className="flex-1 lg:hidden">
                  <span className="text-lg font-semibold text-[#573CD0]">{milestone.year}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">{milestone.title}</h3>
                  <p className="text-gray-600 mt-1 text-sm">{milestone.description}</p>
                </div>
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} hidden lg:block`}>
                  {index % 2 === 1 && (
                    <><span className="text-2xl font-semibold text-[#573CD0]">{milestone.year}</span><h3 className="text-xl font-semibold text-gray-900 mt-1">{milestone.title}</h3><p className="text-gray-600 mt-2">{milestone.description}</p></>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600">Passionate travelers dedicated to helping you explore the world</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <motion.div key={member.name} variants={fadeInUp} className="bg-white rounded-2xl p-6 text-center border border-gray-200 hover:border-[#573CD0]/30 hover:shadow-lg transition-all">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#573CD0] flex items-center justify-center text-white text-xl font-medium">{member.avatar}</div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-[#573CD0] mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#573CD0] rounded-3xl p-8 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Join Our Growing Community</h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">Be part of a global community of travelers. Share your experiences, discover new destinations, and connect with fellow adventurers.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="bg-white text-[#573CD0] hover:bg-white/90 px-8">Start Exploring<ArrowRight className="w-4 h-4 ml-2" /></Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8">Contact Us</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
