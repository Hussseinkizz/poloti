import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// * Utility Functions

// create user profile
export const updateUserName = async (user, name) => {
  await supabase
    .from('users')
    .update({
      full_name: name,
    })
    .eq('id', user.id);
};
// create update profile avatar
export const updateUserAvatar = async (user, avatarUrl) => {
  await supabase.from('profiles').upsert({
    id: user.id,
    avatar_url: avatarUrl,
  });
};
