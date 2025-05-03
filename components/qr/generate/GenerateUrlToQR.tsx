'use client'

import { ExternalLinkIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { MissingQRData, QRCode } from "@/components/qr/generate/GetQRCode";

/**
 * `GenerateUrlToQR` component allows users to input a URL and generates a QR code for the given URL if it's valid.
 * 
 * The component:
 * - Provides an input field for users to enter a URL.
 * - Validates the URL format using the `URL` constructor.
 * - Normalizes the URL to ensure it includes a scheme (e.g., `http://`).
 * - Displays an error message if the URL is invalid.
 * - Displays a QR code if the URL is valid.
 * 
 * @component
 * @example
 * return (
 *   <GenerateUrlToQR />
 * );
 */
export const GenerateUrlToQR: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [parsedUrl, setParsedUrl] = useState<string>('');
  const [formattedUrl, setFormattedUrl] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Validates and normalizes the URL input.
   * - Normalizes the URL by adding `http://` if no scheme is present.
   * - Validates the normalized URL using the `URL` constructor.
   * Updates `isValid`, `formattedUrl`, and `error` states based on the validation.
   */
  useEffect(() => {
    const validateUrl = async () => {
      setIsLoading(true);
      setError('');

      try {
        // Normalize the URL by adding a default protocol if missing
        const normalizedUrl = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('ftp://') || url.startsWith('mailto:') || url.startsWith('tel:')
          ? url
          : `http://${url}`;

        // Validate the URL using the `URL` constructor
        const parsedUrl = new URL(normalizedUrl);
        setParsedUrl(parsedUrl.href);

        setIsValid(true);
        setFormattedUrl(normalizedUrl);
      } catch (err) {
        setIsValid(false);
        setFormattedUrl('');
        console.error(err);
        setError('Please enter a valid URL (e.g., https://example.com).');
      } finally {
        setIsLoading(false);
      }
    };

    if (url) {
      validateUrl();
    } else {
      setIsValid(false);
      setFormattedUrl('');
      setError('');
    }
  }, [url]);

  return (
    <article className="grid w-full grid-cols-1 md:grid-cols-2">
      <section className="w-full">
        <label htmlFor="url-input" className="font-medium text-sm text-gray-600">
          Enter a valid URL
        </label>
        <input
          type="text"
          value={url}
          id="url-input"
          placeholder="https://example.com"
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-500 p-2 rounded mt-1"
        />
        {parsedUrl && <a
          className='text-xs opacity-50 hover:text-blue-800 hover:underline underline-offset-4 py-1 flex items-center'
          href={parsedUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLinkIcon className='inline h-4 w-4 mr-2' strokeWidth={1} />
          <span className='truncate' title={parsedUrl}>{parsedUrl}</span>
        </a>}
        {error && <p className="text-red-500 text-xs lg:text-sm py-2">{error}</p>}
      </section>

      <section className="w-full min-h-80 flex flex-col items-center justify-center">
        {isLoading ? (
          <p>Validating URL...</p>
        ) : isValid && formattedUrl ? (
          <QRCode value={formattedUrl} size={250} />
        ) : (
          <MissingQRData />
        )}
      </section>
    </article>
  );
};
