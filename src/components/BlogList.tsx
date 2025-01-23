import React, { useState } from 'react';
import { format } from 'date-fns';
import { useGetBlogs } from '../utils/react-query/get-blogs';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export function BlogList() {
  const [page, setPage] = useState(1);
  const limit = 3;
  const { data, isLoading: isBlogsLoading } = useGetBlogs(page, limit);
  const blogs = data?.blogs || [];
  const total = data?.total || 0;
  const maxPage = Math.ceil(total / limit);

  const handleNextPage = () => setPage((prevPage) => Math.min(prevPage + 1, maxPage));
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="space-y-6">
      {isBlogsLoading && (
        <div className="flex items-center justify-center h-32">
          <Loader2 size={48} className=' animate-spin' />
        </div>
      )}
      {blogs.map((blog) => (
        <article key={blog.id} className="prose max-w-none bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          <div className="text-gray-600 text-sm mb-4">
            By {blog.author_email} on {format(new Date(blog.created_at), 'PPP')}
          </div>
          <div className="whitespace-pre-wrap">{blog.content}</div>
        </article>
      ))}
      <div className="fixed flex bottom-5 w-1/2 justify-between items-center">
        <button onClick={handlePrevPage} disabled={page === 1} className="ring-1 ring-black text-white rounded-md px-2 p-1.5 bg-black disabled:opacity-50">
          <ChevronLeft />
        </button>
        <span className="text-gray-600">Page {page} of {maxPage}</span>
        <button onClick={handleNextPage} disabled={page === maxPage} className="ring-1 ring-black text-white rounded-md px-2 p-1.5 bg-black disabled:opacity-50">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}