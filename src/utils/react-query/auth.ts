import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['auth'],
        mutationFn: async ({ isLogin, email, password }: { isLogin: boolean, email: string, password: string }) => {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;

                toast.success('Logged in successfully');
                navigate('/');
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;

                toast.success('Signed up successfully');
                navigate('/');
            }
        },
    });
}