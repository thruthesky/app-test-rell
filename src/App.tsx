import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { AuthForm } from './components/AuthForm';
import { BlogList } from './components/BlogList';
import { NewBlogForm } from './components/NewBlogForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Book } from 'lucide-react';
import { UserMenu } from './components/UserMenu';
import { BlogDetail } from './components/BlogDetail';

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // @ts-ignore
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // @ts-ignore
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router basename='/rell-blog/'>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-indigo-600">
                  <Book size={24} className="inline-block mr-2" />
                  rell's blog
                </Link>
                <div className="space-x-4">
                  {user ? (
                    <UserMenu user={user} />
                  ) : (
                    <Link
                      to="/auth"
                      className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
                    >
                      <span className='ring-1 ring-black bg-black text-white px-1.5 py-1 rounded-md'>Login</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-4xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/auth" element={<AuthForm />} />
              <Route
                path="/new"
                element={user ? <NewBlogForm /> : <AuthForm />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;