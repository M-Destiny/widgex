import { Link } from 'react-router-dom';
import { useWidgetStore } from '../store/widgets';
import { Package, ExternalLink, Trash2 } from 'lucide-react';

export default function Dashboard() {
  const { installed, widgets, installWidget } = useWidgetStore();

  const installedWithDetails = installed.map((iw) => ({
    ...iw,
    widget: widgets.find((w) => w.id === iw.widgetId),
  })).filter((iw) => iw.widget);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-text flex items-center gap-2">
        <Package size={28} className="text-accent" />
        My Dashboard
      </h1>
      {installedWithDetails.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <Package size={48} className="mx-auto text-text-muted" />
          <p className="text-text-muted">No widgets installed yet.</p>
          <Link to="/catalog" className="px-6 py-2 btn-primary inline-flex items-center gap-1">
            Browse Catalog <Package size={16} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {installedWithDetails.map(({ widget, installedAt }) => (
            <div key={widget!.id} className="flex items-center justify-between p-4 card border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">{widget!.name[0]}</div>
                <div>
                  <h3 className="font-semibold text-text">{widget!.name}</h3>
                  <p className="text-sm text-text-muted">Installed {new Date(installedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a href="#" className="flex items-center gap-1.5 text-accent text-sm font-medium hover:underline">
                  View Docs <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}