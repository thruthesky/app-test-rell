import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { AuthForm } from './components/AuthForm';
import { BlogList } from './components/BlogList';
import { NewBlogForm } from './components/NewBlogForm';

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
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">Blog Site</Link>
              <div className="space-x-4">
                {user ? (
                  <>
                    <Link to="/new" className="text-gray-600 hover:text-gray-900">New Post</Link>
                    <button
                      onClick={() => supabase.auth.signOut()}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/auth" className="text-gray-600 hover:text-gray-900">Login</Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route
              path="/new"
              element={user ? <NewBlogForm /> : <AuthForm />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;