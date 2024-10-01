"use client";

import { useState } from 'react';
import MarkdownEditor from '@/components/markdown/MarkdownEditor';
import MarkdownPreview from '@/components/markdown/MarkdownPreview';

export default function MarkdownPlayground() {
    const [markdown, setMarkdown] = useState('')

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            <MarkdownEditor markdown={{ value: markdown, update: setMarkdown }} />
            <MarkdownPreview markdown={markdown} />
        </div>
    );
}
