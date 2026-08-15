import { Link } from 'react-router-dom';
import { useWidgetStore } from '../store/widgets';
import { Package, ExternalLink } from 'lucide-react';

export default function Dashboard() {
  const { installed, widgets } = useWidgetStore();

  const installedWithDetails = installed.map((iw) => ({
    ...iw,
    widget: widgets.find((w) => w.id === iw.widgetId),
  })).filter((iw) => iw.widget);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">My Dashboard</h1>
      {installedWithDetails.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <Package size={48} className="mx-auto text-gray-300" />
          <p className="text-gray-500">No widgets installed yet.</p>
          <Link to="/catalog" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium inline-block">
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {installedWithDetails.map(({ widget, installedAt }) => (
            <div key={widget!.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">{widget!.name[0]}</div>
                <div>
                  <h3 className="font-semibold">{widget!.name}</h3>
                  <p className="text-sm text-gray-500">Installed {new Date(installedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <a href="#" className="flex items-center gap-1.5 text-blue-600 text-sm font-medium hover:underline">
                View Docs <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
