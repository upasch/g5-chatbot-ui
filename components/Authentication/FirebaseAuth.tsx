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
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-white text-3xl font-bold mb-4">Log In</h1>
      <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSignIn}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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