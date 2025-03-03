'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { products } from '@/app/data';
import Layout from '@/Layout/Layout';
import Card from '../../../components/Card';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';

// TipTap MenuBar Component
const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-100 border-b">
      <button
        type="button" // Add this line
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-2 py-1 border rounded ${
          editor.isActive('bold') ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        <strong>B</strong>
      </button>
      <button
        type="button" // Add this line
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-2 py-1 border rounded ${
          editor.isActive('italic') ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        <em>I</em>
      </button>
      <button
        type="button" // Add this line
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 border rounded ${
          editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        H1
      </button>
      <button
        type="button" // Add this line
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 border rounded ${
          editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        H2
      </button>
      <button
        type="button" // Add this line
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 border rounded ${
          editor.isActive('bulletList') ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        • List
      </button>
      <button
        type="button" // Add this line
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 border rounded ${
          editor.isActive('orderedList') ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        1. List
      </button>
      <button
        type="button" // Add this line
        onClick={() => {
          const url = window.prompt('Enter URL')
          if (url) {
            editor.chain().focus().setLink({ href: url }).run()
          }
        }}
        disabled={!editor.can().chain().focus().setLink({ href: '' }).run()}
        className={`px-2 py-1 border rounded ${
          editor.isActive('link') ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        Link
      </button>
      <button
        type="button" // Add this line
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
        className="px-2 py-1 border rounded bg-white"
      >
        Unlink
      </button>
    </div>
  );
};

// TipTap Editor Component
const TipTapEditor = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || 'Write something...',
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update content from external changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="tiptap-editor border rounded">
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="p-2 min-h-[200px] prose prose-sm max-w-none" 
      />
    </div>
  );
};

const ModalForm = ({ title, isOpen, onClose, onSave }) => {
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [longDescription1, setLongDescription1] = useState('');
  const [heading1, setHeading1] = useState('');
  const [longDescription2, setLongDescription2] = useState('');
  const [heading2, setHeading2] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch existing product data when the modal opens
  useEffect(() => {
    const fetchProductData = async () => {
      if (title) {
        setLoading(true);
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/getProductInfo?title=${title}`);
          if (!res.ok) throw new Error('Failed to fetch product data');
          const data = await res.json();

          setMetaTitle(data.metaTitle || '');
          setMetaDescription(data.metaDescription || '');
          setLongDescription1(data.longDescription1 || '');
          setHeading1(data.heading1 || '');
          setLongDescription2(data.longDescription2 || '');
          setHeading2(data.heading2 || '');
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    if (isOpen) {
      fetchProductData();
    }
  }, [title, isOpen]);

  const handleSubmit = () => {
    const formData = {
      title,
      metaTitle,
      metaDescription,
      longDescription1,
      heading1,
      longDescription2,
      heading2,
    };
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-[90vh]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <h3 className="text-xl font-bold mb-4">Update Info for {title}</h3>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            
            {/* First Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Heading 1</label>
              <input
                type="text"
                value={heading1}
                onChange={(e) => setHeading1(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Long Description 1</label>
              <TipTapEditor
                value={longDescription1}
                onChange={setLongDescription1}
                placeholder="Enter the first long description..."
              />
            </div>
            
            {/* Second Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Heading 2</label>
              <input
                type="text"
                value={heading2}
                onChange={(e) => setHeading2(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Long Description 2</label>
              <TipTapEditor
                value={longDescription2}
                onChange={setLongDescription2}
                placeholder="Enter the second long description..."
              />
            </div>
            
            <div className="flex justify-end mt-16">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setMetaTitle('');
                  setMetaDescription('');
                  setHeading1('');
                  setLongDescription1('');
                  setHeading2('');
                  setLongDescription2('');
                  onClose();
                }}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

const AddProductInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');

  const handleUpdateClick = (title) => {
    setSelectedTitle(title);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/updateProductInfo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to update, please try again');
      toast.success('Data saved successfully');
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update, please try again');
    }
  };

  return (
    <Layout>
      <div className='ml-[14vw] mt-[2vw]'>
        <h2 className="text-2xl font-bold  w-full text-center mb-4">ALL Products</h2>
        <motion.div
          key="product-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-[80vw] overflow-y-scroll"
        >
          { products && products.length > 0 && products?.map((elem, index) => (
            <motion.div key={index}>
              <Card 
                {...elem}
                updateInfo={true}
                onUpdateClick={() => handleUpdateClick(elem.title)}
              />
            </motion.div>
          ))}
        </motion.div>
        <ModalForm
          title={selectedTitle}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </div>
    </Layout>
  );
};

export default AddProductInfo;