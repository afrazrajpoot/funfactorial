import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import { products } from '../../data';
import Card from '../Card';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

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
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/getProductInfo?title=${title}`);
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
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto max-h-[90vh]"
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
              <textarea
                value={longDescription1}
                onChange={(e) => setLongDescription1(e.target.value)}
                className="w-full border rounded p-2"
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
              <textarea
                value={longDescription2}
                onChange={(e) => setLongDescription2(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            
            <div className="flex justify-end">
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/updateProductInfo`, {
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
      <div>
        <h2 className="text-2xl font-bold w-full text-center mb-4">ALL Products</h2>
        <motion.div
          key="product-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-[80vw] overflow-y-scroll"
        >
          {products.map((elem) => (
            <motion.div key={elem.id}>
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