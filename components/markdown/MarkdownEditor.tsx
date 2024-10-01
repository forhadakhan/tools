import { PencilRulerIcon } from 'lucide-react';

export default function MarkdownEditor({ markdown, setMarkdown }: { markdown: string, setMarkdown: (value: string) => void }) {

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);
    localStorage.setItem('markdown', newMarkdown);
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 flex items-center">
        <PencilRulerIcon className="w-10 h-8 fill-white bg-black border rounded-md mr-2 px-2" />
        Editor
      </h2>
      <textarea
        className="w-full h-[calc(100vh-200px)] p-4 border border-black rounded scrollbar-hide"
        value={markdown}
        onChange={handleChange}
        placeholder="Enter your markdown here..."
      />
    </div>
  );
}
