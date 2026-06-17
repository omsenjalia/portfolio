"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h1: ({ children, ...props }) => (
    <h1 className="text-3xl font-display font-bold text-ink mt-8 mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl font-display font-bold text-ink mt-6 mb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-display font-bold text-ink mt-5 mb-2" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-base font-body text-ink mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside font-body text-ink mb-4 space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside font-body text-ink mb-4 space-y-1" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-base leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-2 border-accent pl-4 italic text-ink-muted mb-4"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-surface-elevated text-ink-light px-1.5 py-0.5 rounded-sm text-sm font-code"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="bg-surface-elevated border border-border rounded-md p-4 mb-4 overflow-x-auto text-sm font-code"
      {...props}
    >
      {children}
    </pre>
  ),
  hr: (props) => <hr className="border-border my-8" {...props} />,
  em: ({ children, ...props }) => (
    <em className="italic text-ink-muted" {...props}>
      {children}
    </em>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-ink" {...props}>
      {children}
    </strong>
  ),
};

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="prose-custom">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
