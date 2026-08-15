import type { Widget } from '../types';

interface Props { widget: Widget; }

export default function WidgetPreview({ widget }: Props) {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 flex items-center justify-center h-64">
      <div className="text-white text-center">
        <div className="w-24 h-24 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl font-bold">{widget.name[0]}</span>
        </div>
        <h3 className="text-xl font-bold">{widget.name}</h3>
        <p className="text-white/70 text-sm mt-1">by {widget.author}</p>
      </div>
    </div>
  );
}
