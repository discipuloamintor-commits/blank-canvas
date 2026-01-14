interface HtmlContentProps {
  content: string;
  className?: string;
}

export function HtmlContent({ content, className = "" }: HtmlContentProps) {
  return (
    <div
      className={`prose prose-lg dark:prose-invert max-w-none 
        prose-headings:text-foreground 
        prose-p:text-muted-foreground 
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground
        prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-card prose-pre:border prose-pre:border-border
        prose-blockquote:border-primary prose-blockquote:text-muted-foreground
        prose-img:rounded-lg prose-img:shadow-lg
        prose-hr:border-border
        ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
