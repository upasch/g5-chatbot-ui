import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'


const SbLogin = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  return (
    <div className="flex flex-col bg-blue-950 background-image items-center justify-center h-screen w-screen">
      <h1 className="text-gray-300/50 text-3xl text-center font-bold mb-5">
          Welcome to Chatbot UI
      </h1>
      {!session ? (
        <Auth 
          providers={[]}
          supabaseClient={supabase} 
          localization={{
            variables: {
              sign_in: {password_input_placeholder: 'Your strong password'},
              sign_up: {link_text: ''}
            },
          }}
          appearance={{ theme: ThemeSupa }}
          theme='default'
        />
      ) : null}
    </div>
  );
};

export default SbLogin;