import React, { useState } from 'react';
import { usePostBlog } from '../utils/react-query/post-blog';

export function NewBlogForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { mutate: postBlog, error } = usePostBlog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    postBlog({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
      <button
        type="submit"
        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Create Post
      </button>
    </form>
  );
}