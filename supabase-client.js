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

// get public bucket file url for browser view
// https://projectRef.supabase.in/storage/v1/object/filePath/fileName.png
// projectUrl/storage/v1/public/filepathUrl
export const getPublicUrl = (fileUrl) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileUrl}`;
