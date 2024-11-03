import React, { useState, useCallback, useRef } from 'react'
import { Accept, useDropzone } from 'react-dropzone'
import { X, Upload, File } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileUploaderProps {
    onFilesSelected: (files: File[]) => void
    acceptedFileTypes?: Accept
    multiple?: boolean
    maxFiles?: number
}

export default function FileUploader({
    onFilesSelected,
    acceptedFileTypes = {},
    multiple = false,
    maxFiles = 5,
}: FileUploaderProps) {
    const [files, setFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
        setFiles(newFiles)
        onFilesSelected(newFiles)
    }, [files, maxFiles, onFilesSelected])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
        multiple,
        maxFiles,
    })

    const removeFile = (fileToRemove: File) => {
        const updatedFiles = files.filter(file => file !== fileToRemove)
        setFiles(updatedFiles)
        onFilesSelected(updatedFiles)
    }

    const handlePaste = (event: React.ClipboardEvent) => {
        const pastedFiles = Array.from(event.clipboardData.files)
        if (pastedFiles.length > 0) {
            const newFiles = [...files, ...pastedFiles].slice(0, maxFiles)
            setFiles(newFiles)
            onFilesSelected(newFiles)
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    return (
        <section className="w-full max-w-md mx-auto" onPaste={handlePaste}>
            <div
                {...getRootProps()}
                className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
                    }`}
            >
                <input {...getInputProps()} ref={fileInputRef} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                    Drag & drop files here, or click to select files
                </p>
                <p className="mt-1 text-xs text-gray-500">
                    {Object.keys(acceptedFileTypes).length === 0 ? 'Any file type accepted' : `Accepted file types: ${Object.values(acceptedFileTypes).join(', ')}`}
                </p>
                <Button onClick={triggerFileInput} type="button" variant="outline" className="mt-4">
                    Select Files
                </Button>
            </div>
            {files.length > 0 && (
                <ul className="mt-4 space-y-2">
                    {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                            <div className="flex items-center">
                                <File className="h-5 w-5 mr-2 text-gray-500" />
                                <span className="text-sm truncate">{file.name}</span>
                            </div>
                            <Button
                                onClick={() => removeFile(file)}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:text-red-500"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}


export {
    FileUploader,
    FileUploader as Upload,
    FileUploader as Uploader,
    FileUploader as FileInput,
    FileUploader as DynamicFileInput,
    FileUploader as DynamicFileUploader,
}