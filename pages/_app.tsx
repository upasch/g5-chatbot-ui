import { useState } from 'react'
import '@/styles/globals.css';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';


const inter = Inter({ subsets: ['latin'] });

function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session,
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  return (
    <div className={inter.className}> 
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <Toaster />
        <Component {...pageProps} />
      </SessionContextProvider>
    </div>
  );
}

export default appWithTranslation(App);