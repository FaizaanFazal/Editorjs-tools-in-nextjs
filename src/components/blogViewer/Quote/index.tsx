import React from 'react';

interface QuoteProps {
  text: string;
  caption?: string;
  classes?: string;
}

export const Quote: React.FC<QuoteProps> = ({ text, caption, classes }) => {
  return (
    <blockquote className={classes}>
      <svg className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
      </svg>
      <div>{text}</div>
      <div className="text-base mt-4">
        <cite className="pe-3 font-medium dark:text-white">{caption}</cite>
      </div>
    </blockquote>
  );
};