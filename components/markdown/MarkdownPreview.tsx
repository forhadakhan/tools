import styled from 'styled-components';
import ReactShowdown from 'react-showdown';
import { MarkdownIcon } from '@/components/markdown/MarkdownIcon';

// Define the styled component with all your styles
const PreviewContent = styled.div`
    #preview-content blockquote {
        margin: 20px 15px !important;
        padding: 0.4em;
        color: #666c74;
        border-left: 0.25em solid #dfe2e5;
        background-color: #f3f3f3;
    }

    #preview-content p {
        margin: 10px 0 !important;
        line-height: 1.6 !important;
    }

    #preview-content a {
        text-decoration: none;
        transition: color 0.3s ease-in-out !important;
    }

    #preview-content a:hover {
        text-decoration: underline;
    }

    #preview-content code {
        background-color: #eeecec;
        border-radius: 8px;
        padding: 5px;
        margin: 10px 0;
        font-family: "Courier New", Courier, monospace;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
    }

    #preview-content pre {
        display: block;
        background-color: #eeecec !important;
        padding: 15px !important;
        margin: 15px 0 !important;
        border-radius: 15px;
    }

    #preview-content h1,
    #preview-content h2,
    #preview-content h3,
    #preview-content h4,
    #preview-content h5,
    #preview-content h6 {
        font-weight: bold !important;
        margin-top: 20px !important;
        margin-bottom: 10px !important;
    }

    #preview-content h1 {
        font-size: 32px !important;
        border-bottom: 1px solid #eaecef !important;
        padding-bottom: 10px !important;
    }

    #preview-content h2 {
        font-size: 24px !important;
        border-bottom: 1px solid #eaecef !important;
        padding-bottom: 6px !important;
    }

    #preview-content h3 {
        font-size: 20px !important;
    }

    #preview-content h4 {
        font-size: 16px !important;
    }

    #preview-content h5 {
        font-size: 14px !important;
    }

    #preview-content h6 {
        font-size: 12px !important;
    }

    #preview-content table {
        width: 100% !important;
        border-collapse: collapse !important;
        margin-bottom: 16px !important;
    }

    #preview-content th,
    #preview-content td {
        padding: 6px 13px !important;
        border: 1px solid #dfe2e5 !important;
    }

    #preview-content th {
        background-color: #f6f8fa !important;
        font-weight: bold !important;
    }

    #preview-content td {
        background-color: #fff !important;
    }

    #preview-content img {
        width: auto;
        margin: 2rem auto;
        height: auto;
        border: 0;
        vertical-align: middle;
    }

    #preview-content strong {
        font-weight: 600;
    }

    #preview-content em,
    #preview-content i {
        font-style: italic;
    }

    #preview-content del {
        text-decoration: line-through;
        color: #cb2431;
    }

    #preview-content ul {
        list-style-type: disc !important;
        margin: 10px !important;
        list-style-position: outside !important;
    }

    #preview-content ul ul {
        list-style-type: circle !important;
    }

    #preview-content ul ul ul {
        list-style-type: square !important;
    }

    #preview-content ol {
        list-style-type: decimal !important;
        margin: 15px !important;
    }

    #preview-content .border-bottom-none {
        border-bottom: none !important;
    }
`;

export default function MarkdownPreview({ markdown }: { markdown: string }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2 flex items-center">
                <MarkdownIcon className="w-10 h-8 fill-white bg-black border rounded-md mr-2 px-2" />
                Preview
            </h2>

            <PreviewContent className="h-[calc(100vh-200px)] border rounded border-black overflow-auto w-full bg-white p-6 scrollbar-hide">
                <ReactShowdown
                    id="preview-content"
                    markdown={markdown}
                    flavor="github"
                    options={{ emoji: true }}
                />
            </PreviewContent>
        </div>
    );
}
