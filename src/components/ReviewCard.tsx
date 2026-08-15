import type { Review } from '../types';
import { Star } from 'lucide-react';

interface Props { review: Review; }

export default function ReviewCard({ review }: Props) {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
            {review.userName[0]}
          </div>
          <span className="font-medium text-sm">{review.userName}</span>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
      <p className="text-xs text-gray-400 mt-2">{review.createdAt}</p>
    </div>
  );
}
