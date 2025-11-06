'use client';

import { FormEvent, useState } from 'react';
import { ToneOfVoice } from '@/lib/types';

export interface ArticleFormProps {
  onGenerate: (payload: {
    topic: string;
    primaryKeyword: string;
    secondaryKeywords: string;
    targetAudience: string;
    toneOfVoice: ToneOfVoice;
    articleLength: number;
    callToAction: string;
  }) => void;
  isGenerating: boolean;
}

const toneOptions: { label: string; value: ToneOfVoice; description: string }[] = [
  { label: 'Authoritative', value: 'authoritative', description: 'Boardroom-ready, confident, data-backed voice.' },
  { label: 'Friendly', value: 'friendly', description: 'Approachable, warm, and modern brand voice.' },
  { label: 'Conversational', value: 'conversational', description: 'Curious, energetic, and direct with the reader.' },
  { label: 'Analytical', value: 'analytical', description: 'Structured, precise, and research-driven narrative.' },
  { label: 'Inspirational', value: 'inspirational', description: 'Visionary, motivating, and future-facing message.' }
];

const defaultFormValues = {
  topic: 'Demand Generation in B2B SaaS',
  primaryKeyword: 'B2B demand generation strategy',
  secondaryKeywords: 'lead nurturing, account-based marketing, revenue operations',
  targetAudience: 'VPs of Marketing at SaaS scale-ups',
  toneOfVoice: 'authoritative' as ToneOfVoice,
  articleLength: 1800,
  callToAction: 'Ready to operationalize this playbook? Book a 30-minute working session and unlock a custom growth sprint map.'
};

export const ArticleForm = ({ onGenerate, isGenerating }: ArticleFormProps) => {
  const [formState, setFormState] = useState(defaultFormValues);

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = event.currentTarget;
    const value = target.type === 'number' ? Number(target.value) : target.value;

    setFormState((prev) => ({
      ...prev,
      [target.name]: value
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onGenerate(formState);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="form-group" style={{ gap: '1.25rem' }}>
        <div>
          <label htmlFor="topic">Topic *</label>
          <input
            id="topic"
            name="topic"
            type="text"
            required
            value={formState.topic}
            onChange={handleChange}
            placeholder="e.g. Sustainable packaging for ecommerce brands"
          />
        </div>

        <div>
          <label htmlFor="primaryKeyword">Primary Keyword *</label>
          <input
            id="primaryKeyword"
            name="primaryKeyword"
            type="text"
            required
            value={formState.primaryKeyword}
            onChange={handleChange}
            placeholder="Main SEO keyword you want to rank for"
          />
        </div>

        <div>
          <label htmlFor="secondaryKeywords">Secondary Keywords (comma separated)</label>
          <textarea
            id="secondaryKeywords"
            name="secondaryKeywords"
            value={formState.secondaryKeywords}
            onChange={handleChange}
            placeholder="supporting keyword list, separated by commas"
          />
        </div>

        <div>
          <label htmlFor="targetAudience">Target Audience *</label>
          <input
            id="targetAudience"
            name="targetAudience"
            type="text"
            required
            value={formState.targetAudience}
            onChange={handleChange}
            placeholder="The exact persona reading this piece"
          />
        </div>

        <div>
          <label htmlFor="toneOfVoice">Tone of Voice</label>
          <select
            id="toneOfVoice"
            name="toneOfVoice"
            value={formState.toneOfVoice}
            onChange={handleChange}
          >
            {toneOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label} — {option.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="articleLength">Article Length Target (words)</label>
          <input
            id="articleLength"
            name="articleLength"
            type="number"
            min={600}
            step={100}
            value={formState.articleLength}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="callToAction">Call to Action</label>
          <textarea
            id="callToAction"
            name="callToAction"
            value={formState.callToAction}
            onChange={handleChange}
            placeholder="The action you want the reader to take"
          />
        </div>

        <button type="submit" disabled={isGenerating}>
          {isGenerating ? 'Generating article…' : 'Generate Article'}
        </button>
      </div>
    </form>
  );
};
