import { useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

export const useGetBlogPost = ({ slug }: { slug?: string }) => {
    const navigate = useNavigate();

    return useQuery({
        queryKey: ['blog-post', slug],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', slug)
                .single();

            if (error) {
                console.error('Error fetching blog:', error);
                navigate('/');
                return;
            }

            return data;
        }
    })
}