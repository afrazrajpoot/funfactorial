import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import { products } from '../../data';
import Card from '../Card';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ModalForm = ({ title, isOpen, onClose, onSave }) => {
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');

  // Fetch existing product data when the modal opens
  useEffect(() => {
    const fetchProductData = async () => {
      if (title) {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/getProductInfo?title=${title}`);
          if (!res.ok) throw new Error('Failed to fetch product data');
          const data = await res.json();
          setMetaTitle(data.metaTitle || '');
          setMetaDescription(data.metaDescription || '');
          setLongDescription(data.longDescription || '');
        } catch (err) {
          console.error(err);
          toast.error('Failed to fetch product data');
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
      longDescription,
    };
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <h3 className="text-xl font-bold mb-4">Update Info for {title}</h3>
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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Long Description</label>
            <textarea
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button type="button" onClick={onClose} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
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
      if (!res.ok) throw new Error('Failed to update');
      toast.success('Data saved successfully');
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update');
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
