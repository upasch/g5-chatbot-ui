import React, { useState, useEffect } from 'react';

import supabaseClient from '@/utils/app/supabaseConfig';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

interface SupabaseAuthProps {
  onSignInSuccess?: () => void;
  onSessionUpdate?: (event: AuthChangeEvent, session: Session | null) => void;
}

const SupabaseAuth = ({ onSignInSuccess, onSessionUpdate }: SupabaseAuthProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<Session | null>(null);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter an email and password');
      return;
    }
    try {
      const { error: signInError } = await signInWithEmail(email, password);
      if (signInError) {
        throw new Error(signInError.message);
      }
      setSuccess('Login success!');
      setError('');
      setTimeout(() => {
        setSuccess('');
      }, 5000); // clear error message after 5 seconds

      // Call the onSignInSuccess function if provided
      if (onSignInSuccess) {
        onSignInSuccess();
      }
    } catch (err: any) {
      setError('Login failed - check email or password!');
      setSuccess('');
      clearInputs();
      setTimeout(() => {
        setError('');
      }, 5000); // clear error message after 5 seconds
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const handleSessionUpdate = (event: AuthChangeEvent, session: Session | null) => {
    setUser(session);
    if (onSessionUpdate) {
      onSessionUpdate(event, session);
    }
  };

  useEffect(() => {
    const authListener = supabaseClient.auth.onAuthStateChange(handleSessionUpdate);
    return () => {
      authListener?.data.subscription.unsubscribe();
    };
  }, [handleSessionUpdate]);

  return (
    <div className="flex flex-col bg-blue-950 items-center justify-center h-screen w-screen">
      <form
        className="bg-white p-6 rounded-lg"
        style={{ boxShadow: '5px 25px 50px -12px rgba(0, 0, 0, 1)' }}
        onSubmit={handleSignIn}
      >
        <h1 className="text-gray-800 text-2xl text-center font-bold mb-5">
          Log In to Chatbot UI
        </h1>
        <div className="mb-5">
          <label className="block text-gray-800 text-1xl mb-2" htmlFor="email">
            E-Mail
          </label>
          <input
            className="appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="your e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-800 text-1xl mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 w-full rounded border border-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Log In
        </button>
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        {success && (
          <p className="text-center text-green-500 mt-4">{success}</p>
        )}
      </form>
    </div>
  );
};

export default SupabaseAuth;