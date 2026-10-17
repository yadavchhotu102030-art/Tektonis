import React from 'react';

export type ToolCategory = 
  | 'all'
  | 'text'
  | 'developer'
  | 'web-seo'
  | 'converter'
  | 'security'
  | 'image'
  | 'utilities';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  step: string;
  description: string;
}

export interface ToolExplainer {
  title: string;
  whatItDoes: string;
  howItWorks: string;
  whenToUse: string[];
  clientSideBenefit: string;
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  shortDescription: string;
  longDescription: string;
  badge?: 'Hot' | 'Trending' | 'Essential' | 'Popular' | 'High Search';
  searchVolumeMonthly: string; // e.g. "5.8M / mo"
  targetKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  iconName: string;
  component: React.ComponentType;
  features: string[];
  howToUse: HowToStep[];
  faqs: FAQItem[];
  relatedToolIds?: string[];
  explainer?: ToolExplainer;
}
