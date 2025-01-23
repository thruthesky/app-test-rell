import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useGetBlogPost } from '../utils/react-query/get-blog-post';

export function BlogDetail() {
    const { id } = useParams();
    const { data: blog, isLoading: loading } = useGetBlogPost({ slug: id });
    const navigate = useNavigate();



    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-gray-800">Blog post not found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 text-indigo-600 hover:text-indigo-800"
                >
                    Return to blog list
                </button>
            </div>
        );
    }

    return (
        <article className="prose max-w-none bg-white p-8 rounded-lg shadow-md">
            <button
                onClick={() => navigate('/')}
                className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center"
            >
                ← Back to blog list
            </button>

            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <div className="text-gray-600 text-sm mb-8">
                By {blog.author_email} on {format(new Date(blog.created_at), 'PPP')}
            </div>
            <div className="whitespace-pre-wrap">{blog.content}</div>
        </article>
    );
}