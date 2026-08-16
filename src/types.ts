export interface Widget {
  id: string;
  name: string;
  description: string;
  category: WidgetCategory;
  price: number;
  rating: number;
  reviewCount: number;
  author: string;
  thumbnail: string;
  tags: string[];
  installs: number;
  featured: boolean;
  version: string;
  license: string;
  lastUpdated: string;
  configSchema: Record<string, unknown>;
}

export type WidgetCategory = 'charts' | 'forms' | 'tables' | 'media' | 'navigation' | 'feedback';

export interface UserWidget {
  widgetId: string;
  installedAt: string;
  config: WidgetConfig;
}

export interface WidgetConfig {
  theme?: string;
  [key: string]: unknown;
}

export interface Review {
  id: string;
  widgetId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
