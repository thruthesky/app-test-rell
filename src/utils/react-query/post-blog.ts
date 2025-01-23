import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const usePostBlog = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['post-blog'],
        mutationFn: async (blog: { title: string, content: string }) => {
            const user = (await supabase.auth.getUser()).data.user;
            if (!user) {
                toast.error('You must be logged in to create a blog post');
                return;
            }

            const { error: insertError } = await supabase.from('blogs').insert([
                {
                    title: blog.title,
                    content: blog.content,
                    user_id: user.id,
                    author_email: user.email,
                },
            ]);

            if (insertError) {
                toast.error(insertError.message);
                return;
            }
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            toast.success('Blog post created successfully');
            navigate('/');
        },
    });
}