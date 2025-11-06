'use client';

import { useMemo, useState } from 'react';
import { ArticleForm } from '@/components/ArticleForm';
import { ArticlePreview } from '@/components/ArticlePreview';
import { createArticle } from '@/lib/articleGenerator';
import { GeneratedArticle } from '@/lib/types';

export default function HomePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [article, setArticle] = useState<GeneratedArticle | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  const handleGenerate = (payload: Parameters<typeof createArticle>[0]) => {
    setIsGenerating(true);
    try {
      const generated = createArticle(payload);
      setArticle(generated);
      setGeneratedAt(new Date().toLocaleString());
    } finally {
      setIsGenerating(false);
    }
  };

  const pageSubtitle = useMemo(() => {
    if (!generatedAt) {
      return 'Elite Content Generator — turn strategic briefs into ready-to-publish articles in seconds.';
    }
    return `Latest draft generated at ${generatedAt}`;
  }, [generatedAt]);

  return (
    <main>
      <div className="container">
        <header>
          <div>
            <div className="logo">Elite Content Generator</div>
            <div className="tagline">{pageSubtitle}</div>
          </div>
        </header>

        <div className="grid">
          <ArticleForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          <ArticlePreview article={article} />
        </div>
      </div>
    </main>
  );
}
