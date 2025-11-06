import { GeneratedArticle } from '@/lib/types';

export interface ArticlePreviewProps {
  article: GeneratedArticle | null;
}

const Paragraphs = ({ paragraphs }: { paragraphs: string[] }) => (
  <>
    {paragraphs.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}
  </>
);

export const ArticlePreview = ({ article }: ArticlePreviewProps) => {
  if (!article) {
    return (
      <div className="card" style={{ minHeight: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <h2 style={{ marginBottom: '0.75rem' }}>Preview your publication-ready piece</h2>
          <p style={{ color: '#4b5563', lineHeight: 1.7 }}>
            Fill out the brief on the left to generate an editorially-structured article complete with H2 and H3 sections,
            persona-aligned insights, and a compelling call to action.
          </p>
        </div>
      </div>
    );
  }

  const { outline, introduction, conclusion } = article;

  return (
    <article className="card article-output">
      <header>
        <div>
          <h1>{outline.title}</h1>
          <div className="badge-row">
            <span className="badge">Long-form article</span>
            <span className="badge">SEO-Ready</span>
            <span className="badge">Persona aligned</span>
          </div>
        </div>
      </header>

      <section>
        <Paragraphs paragraphs={introduction} />
      </section>

      {outline.sections.map((section, index) => (
        <section key={section.heading + index}>
          <h2>{section.heading}</h2>
          <Paragraphs paragraphs={section.paragraphs} />
          {section.subSections.map((subSection, subIndex) => (
            <div key={subSection.title + subIndex}>
              <h3>{subSection.title}</h3>
              <Paragraphs paragraphs={subSection.paragraphs} />
            </div>
          ))}
        </section>
      ))}

      <section>
        <h2>Conclusion</h2>
        <Paragraphs paragraphs={conclusion} />
      </section>
    </article>
  );
};
