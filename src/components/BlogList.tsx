import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Blog } from '../types';
import { format } from 'date-fns';

export function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      return;
    }

    setBlogs(data || []);
  }

  return (
    <div className="space-y-6">
      {blogs.map((blog) => (
        <article key={blog.id} className="prose max-w-none bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          <div className="text-gray-600 text-sm mb-4">
            By {blog.author_email} on {format(new Date(blog.created_at), 'PPP')}
          </div>
          <div className="whitespace-pre-wrap">{blog.content}</div>
        </article>
      ))}
    </div>
  );
}