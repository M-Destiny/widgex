import { Link } from 'react-router-dom';
import { useWidgetStore } from '../store/widgets';
import WidgetCard from '../components/WidgetCard';
import { ArrowRight, Zap, Shield, Code2 } from 'lucide-react';

export default function Home() {
  const { widgets } = useWidgetStore();
  const featured = widgets.slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="bg-gradient-to-br from-accent to-purple-700 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold">Premium React Widgets</h1>
          <p className="text-xl text-white/80">A curated marketplace of production-ready React components. Save weeks of development time.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/catalog" className="px-6 py-3 bg-white text-accent rounded-btn font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
              Browse Catalog <ArrowRight size={18} />
            </Link>
            <Link to="/dashboard" className="px-6 py-3 border border-white/30 text-white rounded-btn font-semibold hover:bg-white/10 transition-colors">
              My Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <h2 className="text-3xl font-bold text-text">Featured Widgets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((w) => <WidgetCard key={w.id} widget={w} />)}
        </div>
        <div className="text-center">
          <Link to="/catalog" className="text-accent font-medium hover:underline inline-flex items-center gap-1">
            View all widgets <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: 'Production Ready', desc: 'Every widget is tested, documented, and ready for production.' },
            { icon: Code2, title: 'TypeScript First', desc: 'Fully typed APIs, autocomplete everywhere.' },
            { icon: Shield, title: 'Secure & Audited', desc: 'Dependencies regularly audited, zero known vulnerabilities.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-6 card border-border">
              <Icon size={40} className="mx-auto mb-4 text-accent" />
              <h3 className="font-bold text-lg mb-2 text-text">{title}</h3>
              <p className="text-text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}