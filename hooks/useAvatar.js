import React, { useEffect, useState } from 'react'
import { getSignedUrl } from '../supabase-client';

export function useAvatar(avatarUrl) {
    const [signedUrl, setSignedUrl] = useState(null);

    const getUserAvatar = async (url) => {
        const res = await getSignedUrl('avatars', avatarUrl);
        // console.log('res', avatar_url, res);
        setSignedUrl(res);
      };

      useEffect(() => {
        if (avatarUrl) {
          getUserAvatar(avatarUrl);
        }
      });
  return signedUrl
}

