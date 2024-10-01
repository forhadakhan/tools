"use client";

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { PencilRulerIcon, ExpandIcon, ShrinkIcon, Trash2Icon, DownloadIcon } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileInput } from '@/components/ui/FileInput';

interface MarkdownEditorProps {
  markdown: { value: string; update: (value: string) => void };
}
export default function MarkdownEditor({ markdown }: MarkdownEditorProps) {
  const { value, update } = markdown;

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const savedMarkdown = localStorage.getItem('markdown');
    if (savedMarkdown) {
      update(savedMarkdown);
    }
  }, [update]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = e.target.value;
    update(newMarkdown);
    localStorage.setItem('markdown', newMarkdown);
  };

  const handleClear = () => {
    const clearedValue = '';
    update(clearedValue);
    localStorage.setItem('markdown', clearedValue);
  };

  const handleSaveAsMarkdown = () => {
    const blob = new Blob([value], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        update(e.target.result);
        localStorage.setItem('markdown', e.target.result);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={cn(
      "flex flex-col",
      isFullScreen && "fixed p-8 top-0 left-0 bg-gray-50 right-0 bottom-0 z-50 scrollbar-hide"
    )}>

      {/* Editor Header */}
      <div className="flex items-center justify-between mb-2 bg-black text-white rounded p-2" id='editor-header'>
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <PencilRulerIcon className="w-10 h-8 bg-black mr-2 px-2" />
          Editor
        </h2>
        <div className='flex space-x-2'>

          {/* Open Markdown File Button */}
          <FileInput
            onFileSelect={handleFileSelect}
            accept=".md"
            size="icon"
            className='bg-black hover:bg-gray-50 hover:text-black'
            title="Open Markdown File"
            hideText
          />

          {/* FullScreen Control Button */}
          <Button
            className='bg-black hover:bg-gray-50 hover:text-black'
            size={'icon'}
            title='Toggle Full Screen'
            onClick={handleToggleFullScreen}
          >
            {isFullScreen ? <ShrinkIcon className="w-4 h-4" /> : <ExpandIcon className="w-4 h-4" />}
          </Button>

          {/* Save as Markdown Button */}
          <Button
            className='bg-black hover:bg-gray-50 hover:text-black'
            size={'icon'}
            title='Save as Markdown'
            onClick={handleSaveAsMarkdown}
          >
            <DownloadIcon className="w-4 h-4" />
          </Button>

          {/* Clear Editor Button with Confirmation Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-black hover:bg-gray-50 hover:text-black' size={'icon'} title='Clear Editor'>
                <Trash2Icon className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Clear Editor?</DialogTitle>
                <DialogDescription>
                  It will delete all the content in the editor.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <Button type="button" variant="default" onClick={handleClear} disabled={value === ''} className="w-full border border-black">
                  Clear
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary" className='border border-black'>
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Markdown Editor */}
      <textarea
        className="w-full h-[calc(100vh-200px)] p-4 border border-black rounded scrollbar-hide"
        value={value}
        onChange={handleChange}
        placeholder="Enter your markdown here..."
      />

      {/* Only display when full screen */}
      {isFullScreen &&
        <Button type='button' size={'sm'} onClick={handleToggleFullScreen} className='max-w-lg my-4 mx-auto'>
          Toggle Full Screen
        </Button>
      }
    </div>
  );
}
