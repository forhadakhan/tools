import React from 'react';

interface AutoLinkTextProps {
  /**
   * The raw text content which may contain URLs.
   */
  text: string;
}

const urlRegex = /((https?:\/\/|www\.)[^\s/$.?#].[^\s]*)/gi;

/**
 * AutoLinkText Component
 *
 * Converts URLs in plain text into clickable anchor tags that open in a new tab.
 * Handles URLs starting with http://, https://, and www.
 *
 * @example
 * <AutoLinkText text="Visit www.example.com or https://openai.com" />
 */
const AutoLinkText: React.FC<AutoLinkTextProps> = ({ text }) => {
  // Replace URLs with anchor elements
  const linkedText = text.replace(urlRegex, (match) => {
    const href = match.startsWith('http') ? match : `https://${match}`;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline underline-offset-4">${match}</a>`;
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: linkedText }}
      className="break-words"
    />
  );
};

export default AutoLinkText;
