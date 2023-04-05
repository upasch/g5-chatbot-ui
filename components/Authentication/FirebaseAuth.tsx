import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

const FirebaseAuth = ({ onSignInSuccess }: { onSignInSuccess?: () => void }) => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password)
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

  return (

<div className="flex flex-col bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900/5 items-center justify-center h-screen w-screen">
<form className="bg-white p-6 rounded-lg" style={{ boxShadow: '5px 25px 50px -12px rgba(0, 0, 0, 1)' }} onSubmit={handleSignIn}>
    <h1 className="text-gray-800 text-2xl text-center font-bold mb-5">Log In to Chatbot UI</h1>
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
      <p className="text-center text-green-500 mt-4">
        {success}
      </p>
    )}
  </form>
</div>
  ); 
};

export default FirebaseAuth;