'use client';

// News Article Page — converted from Kimi's professional article design
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronRight, Clock, Eye, Calendar, User, MapPin,
  Share2, Bookmark, Printer, CheckCircle, Mail,
  Facebook, Twitter, Linkedin, Link as LinkIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const articleData = {
  id: 'paris-louvre-new-exhibition-2026',
  title: 'Louvre Museum Unveils Largest Exhibition in 10 Years',
  subtitle: 'Renaissance Masters collection opens March 2026 with 200+ artworks from across Europe',
  category: 'Museums', destination: 'Paris', author: 'Sarah Mitchell',
  authorTitle: 'Arts & Culture Editor', date: 'Jan 30, 2026',
  updatedAt: 'Jan 30, 2026 at 2:00 PM', readingTime: 5, views: '12.5K',
  image: '/dest-paris.jpg',
  imageCaption: "The Louvre's new Renaissance wing will feature works by Leonardo, Michelangelo, and Raphael. Photo: © TRAVI",
  answerCapsule: 'The Louvre opens its new Renaissance Masters exhibition on March 15, 2026. Tickets cost €22 for adults and €15 for students. The exhibition runs until September 30, 2026, featuring over 200 artworks from across Europe.',
  quickFacts: ['Opens March 15, 2026', 'Tickets: €22 adults, €15 students', '200+ artworks on display', 'Runs until September 30, 2026', 'Located in the Sully Wing', 'Audio guide included'],
  toc: [
    { id: 'introduction', title: 'Introduction' },
    { id: 'whats-new', title: "What's New at the Louvre" },
    { id: 'highlights', title: 'Exhibition Highlights' },
    { id: 'tickets', title: 'How to Get Tickets' },
    { id: 'tips', title: 'Visitor Tips' },
    { id: 'takeaways', title: 'Key Takeaways' },
    { id: 'faq', title: 'FAQ' },
  ],
  sections: [
    { id: 'introduction', h2: 'A New Era for the World\'s Most Famous Museum', content: 'The Louvre Museum is preparing to unveil its most ambitious exhibition in a decade. The "Renaissance Masters" collection, opening March 15, 2026, brings together over 200 masterpieces from museums across Europe and North America.\n\nThis landmark exhibition represents a €45 million investment and five years of planning. For the first time, visitors will see works by Leonardo da Vinci, Michelangelo, and Raphael displayed together in a dedicated space.\n\n"This is not just an exhibition—it\'s a journey through the most transformative period in Western art history," says Jean-Luc Martinez, President-Director of the Louvre.' },
    { id: 'whats-new', h2: "What's New at the Louvre", content: 'The exhibition occupies the newly renovated Sully Wing, which has been transformed into a state-of-the-art gallery space. The 3,000-square-meter area features climate-controlled environments, advanced lighting systems, and interactive digital displays.\n\nKey improvements include:\n\n• New entrance from the Pyramid courtyard\n• Dedicated audio guide with 8 language options\n• Virtual reality experiences bringing artworks to life\n• Family-friendly interactive stations\n• Accessible pathways for visitors with disabilities' },
    { id: 'highlights', h2: 'Exhibition Highlights', content: 'The Renaissance Masters exhibition is organized into five thematic sections, each exploring a different aspect of this revolutionary period.\n\n**Section 1: The Birth of Perspective**\nDiscover how artists like Brunelleschi and Alberti revolutionized spatial representation.\n\n**Section 2: The Florence School**\nWorks by Botticelli, Ghirlandaio, and young Leonardo demonstrate the artistic innovations that emerged from Medici patronage.\n\n**Section 3: The High Renaissance**\nThe centerpiece—Michelangelo\'s preparatory drawings for the Sistine Chapel.\n\n**Section 4: Northern Renaissance**\nMasterpieces by Van Eyck, Dürer, and Holbein.\n\n**Section 5: Leonardo\'s Legacy**\nOver 50 works by and attributed to Leonardo.' },
    { id: 'tickets', h2: 'How to Get Tickets', content: 'Tickets for the Renaissance Masters exhibition go on sale February 1, 2026.\n\n**Ticket Prices:**\n• Adults: €22 (includes museum entry)\n• Students (18-26): €15\n• Youth (under 18): Free\n• Museum Pass holders: Free reservation required\n\n**Booking Options:**\n• Online: louvre.fr (recommended)\n• Phone: +33 1 40 20 53 17\n• On-site: Subject to availability' },
    { id: 'tips', h2: 'Visitor Tips for the Best Experience', content: '**Best Times to Visit:**\n• Wednesday and Friday evenings (open until 9:45 PM)\n• First hour after opening (9-10 AM)\n• Weekday afternoons (2-4 PM)\n\n**What to Bring:**\n• Comfortable walking shoes (1.5 km route)\n• Light layers (galleries at 20°C)\n• Water bottle (refill stations available)\n\n**Photography:**\nNon-flash photography is permitted. Tripods and selfie sticks are not allowed.' },
  ],
  expertQuote: { text: 'This exhibition will redefine how we understand the Renaissance. Seeing these works together creates an entirely new appreciation for this pivotal moment in art history.', author: 'Dr. Elizabeth Cropper', title: 'Director, National Gallery of Art, Washington' },
  keyTakeaways: [
    'Book tickets at least 2 weeks in advance—opening month is nearly sold out',
    'Wednesday and Friday evenings are the least crowded times',
    'The full exhibition takes 3-4 hours to experience properly',
    'Combined Louvre-Orsay ticket saves €8 if visiting both',
    'Audio guide is included and available in 8 languages',
  ],
  faqs: [
    { question: 'How much are tickets for the Renaissance Masters exhibition?', answer: 'Adult tickets cost €22, which includes entry to both the special exhibition and the permanent museum collections. Students aged 18-26 pay €15, and visitors under 18 enter free.' },
    { question: 'When is the best time to visit the exhibition?', answer: 'For the smallest crowds, visit on Wednesday or Friday evenings when the museum stays open until 9:45 PM.' },
    { question: 'How long does it take to see the entire exhibition?', answer: 'Most visitors spend 3-4 hours. The full route is approximately 1.5 km with seating areas throughout.' },
    { question: 'Can I take photos in the exhibition?', answer: 'Yes, non-flash photography is permitted throughout for personal use. Tripods and selfie sticks are not allowed.' },
    { question: 'Is the exhibition accessible for visitors with disabilities?', answer: 'Yes, the entire exhibition is wheelchair accessible with elevators connecting all levels.' },
  ],
  relatedArticles: [
    { id: 2, title: 'Paris Museum Pass 2026: Complete Guide', category: 'Tips', image: '/dest-paris.jpg' },
    { id: 3, title: 'Best Time to Visit Paris: Season-by-Season', category: 'Destinations', image: '/dest-paris.jpg' },
    { id: 4, title: 'Hidden Gems in the Louvre Most Visitors Miss', category: 'Attractions', image: '/dest-paris.jpg' },
  ],
  tags: ['Paris', 'Museums', 'Louvre', 'Art', 'Renaissance', '2026', 'Culture', 'France'],
};

export default function NewsArticlePage() {
  const article = articleData;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="pt-24 pb-4 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#573CD0] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/news" className="hover:text-[#573CD0] transition-colors">News</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#573CD0] font-medium truncate max-w-[200px]">{article.title}</span>
          </motion.nav>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-[#573CD0] text-white border-0">{article.category}</Badge>
              <span className="flex items-center gap-1 text-sm text-gray-500"><Clock className="w-4 h-4" />Reading time: {article.readingTime} min</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">{article.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{article.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{article.date}</span>
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{article.author}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{article.destination}</span>
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{article.views} views</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-full"><Share2 className="w-4 h-4 mr-2" />Share</Button>
              <Button variant="outline" size="sm" className="rounded-full"><Bookmark className="w-4 h-4 mr-2" />Save</Button>
              <Button variant="outline" size="sm" className="rounded-full"><Printer className="w-4 h-4 mr-2" />Print</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Answer Capsule (AEO) */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-r from-[#573CD0]/10 to-[#573CD0]/5 border-l-4 border-[#573CD0] rounded-r-xl p-6">
            <p className="text-lg text-gray-800 font-medium leading-relaxed">{article.answerCapsule}</p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-6">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="aspect-video rounded-2xl overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">{article.imageCaption}</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* TOC Sidebar */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="hidden lg:block">
              <div className="sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Contents</h3>
                <nav className="space-y-2">
                  {article.toc.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="block text-sm text-gray-600 hover:text-[#573CD0] transition-colors py-1">{item.title}</a>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Article Body */}
            <div className="lg:col-span-3">
              {/* Introduction */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="prose prose-lg max-w-none mb-10">
                <p className="text-xl text-gray-700 leading-relaxed">{article.sections[0].content.split('\n\n')[0]}</p>
              </motion.div>

              {/* Quick Facts */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gray-50 rounded-2xl p-6 mb-10">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><span className="text-[#573CD0]">⚡</span>Quick Facts</h3>
                <ul className="space-y-2">
                  {article.quickFacts.map((fact, i) => (<li key={i} className="flex items-start gap-2 text-gray-700"><span className="text-[#573CD0]">•</span>{fact}</li>))}
                </ul>
              </motion.div>

              {/* Main Sections */}
              {article.sections.slice(1).map((section, index) => (
                <motion.section key={section.id} id={section.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.h2}</h2>
                  <div className="prose prose-gray max-w-none">
                    {section.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">{paragraph}</p>
                    ))}
                  </div>
                </motion.section>
              ))}

              {/* Expert Quote */}
              <motion.blockquote initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-[#573CD0] rounded-r-xl p-6 my-10">
                <p className="text-lg text-gray-800 italic mb-4">&ldquo;{article.expertQuote.text}&rdquo;</p>
                <footer className="text-sm text-gray-600">— <strong>{article.expertQuote.author}</strong>, {article.expertQuote.title}</footer>
              </motion.blockquote>

              {/* Key Takeaways */}
              <motion.section id="takeaways" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-[#573CD0]/5 to-[#573CD0]/10 rounded-2xl p-6 mb-10">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><span className="text-[#573CD0]">📌</span>What You Need to Know</h3>
                <ul className="space-y-3">
                  {article.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="text-gray-700">{takeaway}</span></li>
                  ))}
                </ul>
              </motion.section>

              {/* FAQ */}
              <motion.section id="faq" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {article.faqs.map((faq, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-5">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><ChevronRight className="w-5 h-5 text-[#573CD0]" />{faq.question}</h4>
                      <p className="text-gray-600 ml-7">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Article Footer */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-t border-gray-200 pt-6 mb-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (<Badge key={tag} variant="outline" className="text-gray-600">{tag}</Badge>))}
                </div>
                <div className="text-sm text-gray-500"><p>Last Updated: {article.updatedAt}</p><p className="mt-1">Source: Original reporting by TRAVI editorial team</p></div>
              </motion.div>

              {/* Share */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-50 rounded-2xl p-6 mb-10">
                <h3 className="font-bold text-gray-900 mb-4">Share this article</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full"><Facebook className="w-4 h-4 mr-2" />Facebook</Button>
                  <Button variant="outline" size="sm" className="rounded-full"><Twitter className="w-4 h-4 mr-2" />Twitter</Button>
                  <Button variant="outline" size="sm" className="rounded-full"><Linkedin className="w-4 h-4 mr-2" />LinkedIn</Button>
                  <Button variant="outline" size="sm" className="rounded-full"><LinkIcon className="w-4 h-4 mr-2" />Copy Link</Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold text-gray-900 mb-6">Related Articles</motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            {article.relatedArticles.map((related) => (
              <Link key={related.id} href={`/news/${related.id}`}>
                <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                  <div className="aspect-video overflow-hidden"><img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /></div>
                  <div className="p-4">
                    <Badge variant="outline" className="text-xs mb-2">{related.category}</Badge>
                    <h4 className="font-medium text-gray-900 group-hover:text-[#573CD0] transition-colors line-clamp-2">{related.title}</h4>
                  </div>
                </article>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#573CD0] rounded-2xl p-8 text-white text-center">
            <Mail className="w-10 h-10 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Get {article.destination} Travel News</h3>
            <p className="text-white/80 mb-6">Stay updated with the latest news, tips, and deals.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder:text-white/50 border-0" />
              <Button className="bg-white text-[#573CD0] hover:bg-white/90 px-6">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
