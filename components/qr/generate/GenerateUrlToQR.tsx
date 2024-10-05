'use client'

import React, { useState, useEffect } from 'react'
import { QRCode } from "@/components/qr/generate/GetQRCode";

/**
 * `GenerateUrlToQR` component allows users to input a URL and generates a QR code for the given URL if it's valid.
 * 
 * The component:
 * - Provides an input field for users to enter a URL.
 * - Validates the URL format using a regex pattern.
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
  const [url, setUrl] = useState<string>('')
  const [formattedUrl, setFormattedUrl] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(false);

  /**
   * Validates and normalizes the URL input. 
   * - Normalizes the URL by adding `http://` if no scheme is present.
   * - Validates the normalized URL using a regex pattern.
   * Updates `isValid` and `formattedUrl` states based on the validation.
   */
  useEffect(() => {
    const normalizedUrl = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('ftp://') || url.startsWith('mailto:')
      ? url
      : `http://${url}`;

    // Regex pattern to validate URLs
    const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/i;

    setIsValid(urlPattern.test(normalizedUrl));
    setFormattedUrl(normalizedUrl);
  }, [url]);

  return (
    <>

      <article className="grid w-full grid-cols-1 md:grid-cols-2">
        <section className='w-full md:min-h-80 '>
          <label htmlFor="url-input" className='font-medium text-sm text-gray-600'>
            Enter a valid URL
          </label>
          <input
            type="url"
            value={url}
            id="url-input"
            placeholder="https://example.com"
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border border-gray-500 p-2 rounded"
          />
          {url && !isValid && <p className="text-red-500 text-xs lg:text-sm py-2">Please enter a valid URL.</p>}
        </section>
        <section className='w-full min-h-80 flex flex-col items-center justify-center'>
          {/* Generate QR Code */}
          {isValid && formattedUrl ?
            <QRCode value={formattedUrl} size={250} /> :
            <p>No content to generate QR code</p>}
        </section>
      </article>
    </>
  )
}
