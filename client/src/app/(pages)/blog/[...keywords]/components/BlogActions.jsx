'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

export function BlogActions({ blogId, keywords, admin }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteBlog = async () => {
    setLoading(true);
    try {
      await axios.delete(`${'https://api.danhamz.co.uk/api/v1'}/deleteBlog/${blogId}`);
      toast.success('Blog deleted successfully', { position: 'top-center' });
      router.push('/news-and-blogs');
    } catch (err) {
      console.error('Error deleting blog:', err);
      toast.error('Failed to delete blog', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  if (admin !== 'admin') return null;

  return (
    <div className="bg-white p-[3vw] md:p-[1vw]">
      <button
        className="ml-[3vw] hover:shadow-lg bg-[#152347] text-white text-[3vw] md:text-vw rounded-md shadow-md p-[0.5vw]"
        onClick={() => router.push(`/update-blog/${keywords}`)}
      >
        Update Blog
      </button>
      <button
        className="ml-[3vw] hover:shadow-lg bg-amber-500 text-white text-[3vw] md:text-vw rounded-md shadow-md p-[0.5vw]"
        onClick={deleteBlog}
      >
        Delete Blog
      </button>
    </div>
  );
}