import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { type Blog } from "../../types";
import { toast } from "sonner";

interface BlogsData {
    blogs: Blog[];
    total: number;
}

export const useGetBlogs = (page: number, limit: number): UseQueryResult<BlogsData, unknown> => {
    return useQuery<BlogsData>({
        queryKey: ["blogs", page, limit],
        queryFn: async () => {
            const { data: blogs, error: blogsError } = await supabase
                .from('blogs')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range((page - 1) * limit, page * limit - 1);

            if (blogsError) {
                toast.error(`Error fetching blogs: ${blogsError.message}`);
                return { blogs: [], total: 0 };
            }

            const { count: total } = await supabase
                .from('blogs')
                .select('*', { count: 'exact' });

            return { blogs, total: total || 0 };
        },
        enabled: true,
    });
};