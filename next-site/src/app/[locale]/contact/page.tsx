'use client';

// Contact Page — converted from Kimi's design
import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Mail, Phone, MapPin, Clock, Send, MessageSquare,
  HelpCircle, FileText, Users, ArrowRight, CheckCircle,
  Facebook, Twitter, Instagram, Linkedin, Youtube
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const contactInfo = [
  { icon: Mail, title: 'Email Us', content: 'hello@travi.world', description: "We'll respond within 24 hours" },
  { icon: Phone, title: 'Call Us', content: '+1 (555) 123-4567', description: 'Mon-Fri, 9am-6pm EST' },
  { icon: MapPin, title: 'Visit Us', content: '123 Travel Street, NY', description: 'New York, NY 10001' },
  { icon: Clock, title: 'Working Hours', content: 'Mon - Fri: 9am - 6pm', description: 'Weekend: Closed' },
];

const faqs = [
  { question: 'How do I book a hotel through TRAVI?', answer: 'Simply search for your destination, browse available hotels, and click "Book Now" on your preferred option. You\'ll be guided through a secure checkout process.' },
  { question: 'Can I cancel or modify my booking?', answer: 'Yes, most bookings can be cancelled or modified. Check the cancellation policy on your booking confirmation or contact our support team for assistance.' },
  { question: 'How do I leave a review?', answer: 'After your trip, you\'ll receive an email invitation to leave a review. You can also log into your account and find your past bookings to add reviews.' },
  { question: 'Is TRAVI available in my country?', answer: 'TRAVI is available worldwide! We support multiple languages and currencies to make travel planning accessible to everyone.' },
  { question: 'How can I become a TRAVI contributor?', answer: 'We\'re always looking for passionate travel writers! Send us your portfolio and a brief introduction through the contact form below.' },
];

const quickLinks = [
  { icon: HelpCircle, title: 'Help Center', description: 'Find answers to common questions' },
  { icon: FileText, title: 'Terms of Service', description: 'Read our terms and conditions' },
  { icon: Users, title: 'Partner With Us', description: 'List your property or service' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-gray-50 py-16 lg:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#573CD0]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#573CD0]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#573CD0]/10 rounded-full mb-6">
              <MessageSquare className="w-4 h-4 text-[#573CD0]" />
              <span className="text-sm font-medium text-[#573CD0]">Get in Touch</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              We&apos;d Love to Hear From{' '}
              <span className="bg-gradient-to-r from-[#573CD0] to-[#6443F4] bg-clip-text text-transparent">You</span>
            </h1>
            <p className="text-lg text-gray-600">Have a question, suggestion, or just want to say hello? We&apos;re here to help!</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 lg:py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info) => (
              <motion.div key={info.title} variants={fadeInUp} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#573CD0]/30 hover:shadow-lg transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#573CD0]/10 mb-4">
                  <info.icon className="w-5 h-5 text-[#573CD0]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                <p className="text-[#573CD0] font-medium">{info.content}</p>
                <p className="text-sm text-gray-500">{info.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-gray-600 mb-6">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
                {isSubmitted ? (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                </motion.div>) : (<form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="rounded-xl border-gray-200 focus:border-[#573CD0]" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="rounded-xl border-gray-200 focus:border-[#573CD0]" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="rounded-xl border-gray-200 focus:border-[#573CD0]" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us more about your inquiry..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="rounded-xl border-gray-200 focus:border-[#573CD0] min-h-[140px] resize-none" required />
                  </div>
                  <Button type="submit" className="w-full bg-[#573CD0] hover:bg-[#573CD0]/90 text-white py-3 h-auto rounded-xl"><Send className="w-4 h-4 mr-2" />Send Message</Button>
                </form>)}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {quickLinks.map((link) => (<div key={link.title} className="flex items-start gap-3 p-3 bg-white rounded-xl hover:shadow-sm transition-shadow cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-[#573CD0]/10 flex items-center justify-center flex-shrink-0"><link.icon className="w-5 h-5 text-[#573CD0]" /></div>
                    <div><h4 className="font-medium text-gray-900">{link.title}</h4><p className="text-sm text-gray-500">{link.description}</p></div>
                  </div>))}
                </div>
              </div>
              <div className="bg-[#573CD0] rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-2">Follow Us</h3>
                <p className="text-white/80 text-sm mb-4">Stay updated with travel tips and exclusive deals.</p>
                <div className="flex items-center gap-3">
                  {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (<button key={i} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"><Icon className="w-5 h-5" /></button>))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Newsletter</h3>
                <p className="text-sm text-gray-600 mb-4">Get travel inspiration delivered to your inbox.</p>
                <div className="flex gap-2">
                  <Input placeholder="Your email" className="rounded-xl border-gray-200 focus:border-[#573CD0]" />
                  <Button className="bg-[#573CD0] hover:bg-[#573CD0]/90 text-white rounded-xl px-4"><ArrowRight className="w-4 h-4" /></Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find quick answers to common questions</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
            {faqs.map((faq, index) => (<motion.div key={index} variants={fadeInUp} className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-3"><HelpCircle className="w-5 h-5 text-[#573CD0] flex-shrink-0 mt-0.5" />{faq.question}</h3>
              <p className="text-gray-600 pl-8">{faq.answer}</p>
            </motion.div>))}
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-100 rounded-3xl h-[300px] lg:h-[400px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#573CD0]/10 to-[#573CD0]/5" />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#573CD0] flex items-center justify-center"><MapPin className="w-8 h-8 text-white" /></div>
              <p className="text-lg font-semibold text-gray-900">TRAVI Headquarters</p>
              <p className="text-gray-600">123 Travel Street, New York, NY 10001</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
