import React, { useState } from 'react';
import { format } from 'date-fns';
import { useGetBlogs } from '../utils/react-query/get-blogs';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BlogList() {
  const [page, setPage] = useState(1);
  const limit = 4;
  const { data, isLoading: isBlogsLoading } = useGetBlogs(page, limit);
  const blogs = data?.blogs || [];
  const total = data?.total || 0;
  const maxPage = Math.ceil(total / limit);

  const handleNextPage = () => setPage((prevPage) => Math.min(prevPage + 1, maxPage));
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="space-y-6">
      {isBlogsLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
      {blogs.map((blog) => (
        <article key={blog.id} className="prose max-w-none bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          <div className="text-gray-600 text-sm mb-4">
            By {blog.author_email} on {format(new Date(blog.created_at), 'PPP')}
          </div>
          <div className="whitespace-pre-wrap">{blog.content}</div>
          <Link
            to={`/blog/${blog.id}`}
            className="inline-block mt-4 text-indigo-600 hover:text-indigo-800"
          >
            Read more →
          </Link>
        </article>
      ))}
      {maxPage >= 1 &&
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex justify-between items-center w-full max-w-md px-4">
          <button onClick={handlePrevPage} disabled={page === 1} className="ring-1 ring-black text-white rounded-md px-2 p-1.5 bg-black disabled:opacity-50">
            <ChevronLeft />
          </button>
          <span className="text-gray-600">Page {page} of {maxPage}</span>
          <button onClick={handleNextPage} disabled={page === maxPage} className="ring-1 ring-black text-white rounded-md px-2 p-1.5 bg-black disabled:opacity-50">
            <ChevronRight />
          </button>
        </div>}
    </div>
  );
}