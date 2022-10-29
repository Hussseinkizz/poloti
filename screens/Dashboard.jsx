// Todos:
// - Get all targeted user from session
// - Read user details
// - Edit and update user details
// - Make this a protected route!

import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import * as HiIcons from 'react-icons/hi';
import {
  getImageFromUrl,
  getPublicUrl,
  getSignedUrl,
  supabase,
} from '../supabase-client';

// import placeholder image
import placeholder from '../public/images/placeholder.jpeg';
// ? import sample images
// import sampleAvatar from '../public/images/me.png';
import UserPostsArea from '../components/UserPostsArea';

const UserDashboard = ({ userProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContact, setNewContact] = useState('');
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState(null);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [signedUrl, setSignedUrl] = useState(null);
  // const [imageUrl, setImageUrl] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [avatarUploaded, setavatarUploaded] = useState(false);

  const router = useRouter();

  // * destructure user profile details...
  const { id, user_email, user_name, user_contact, avatar_url } = userProfile;

  // * get user's posts count
  const getPostCount = (value) => {
    setPostCount(value);
  };
  const getUserAvatar = async (url) => {
    const res = await getSignedUrl('avatars', url);
    // console.log('res', avatar_url, res);
    setSignedUrl(res);
  };

  // * populate user detail for edit mode!
  useEffect(() => {
    if (userProfile) {
      setNewContact(user_contact);
      setNewName(user_name);
      if (avatar_url) {
        getUserAvatar(avatar_url);
      }
    }
  }, [userProfile]);
  // console.log(userProfile);

  // handle editing
  const handleEditMode = () => {
    setIsEditing(true);
    setSaving(false);
  };

  // handle image uploading
  // TODO: preview image before upload,
  const uploadInputRef = useRef();

  const handleImageUpload = () => {
    uploadInputRef.current.click();
  };
  const updateUserAvatar = async (newAvatar) => {
    // update user avatar in bucket
    setavatarUploaded(true);
    // const avatarPath = '1660390450360_12bq8vwe_400x400.jpg';
    const avatarPath = avatar_url.split('avatars/')[1];
    // console.log('avatar-path', avatarPath);
    // const bucketName = 'public/avatars';
    // avatar_url = avatars/1660390450360_12bq8vwe_400x400.jpg;
    const { data: newAvatarData, error: newAvatarError } =
      await supabase.storage.from('avatars').update(avatarPath, newAvatar);
    if (newAvatarData) {
      setNewAvatarUrl(newAvatarData.Key);
    } else {
      console.log(newAvatarError.message);
    }
  };
  // handle updated user profile saving
  const handleSaving = async () => {
    setSaving(true);
    setIsEditing(false);
    newAvatar && (await updateUserAvatar(newAvatar));
    if (newAvatarUrl) {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          user_name: newName,
          user_contact: newContact,
          avatar_url: newAvatarUrl,
        })
        .eq('id', id);

      data && router.reload() && console.log('alert: user profile updated...'); // refresh page
      error && console.log('Update Profile Error', error);
    } else {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          user_name: newName,
          user_contact: newContact,
        })
        .eq('id', id);

      data && router.reload() && console.log('alert: user profile updated...'); // refresh page
      // data && console.log('data', data);
      error && console.log('Update Profile Error', error);
    }
    // console.log(id, newName, newContact, newAvatarUrl);
  };

  return (
    <section className="w-full relative pb-10">
      <div className="bg-svg-pattern w-full flex flex-col justify-center gap-2 items-center pt-14 sm:pt-4 border-b bg-gray-50 pb-2 mb-4 rounded-b-md ">
        <div className="flex flex-col justify-center gap-2 items-center py-8 sm:py-4 text-center">
          <h1 className="text-gray-800 capitalize font-bold text-xl sm:text-2xl md:text-3xl">
            Your Dashboard
          </h1>
          <h2 className="flex justify-center gap-1 items-center text-gray-400">
            <HiIcons.HiExclamationCircle className="text-gray-400" />
            <span>You can edit and post your plots from here.</span>
          </h2>
        </div>
        {/* User Profile section */}
        <section className="w-full mx-auto px-4 sm:px-6 sm:w-3/4 md:w-1/2 flex flex-col-reverse md:flex-row justify-between sm:justify-center gap-4 items-center">
          {/* User Info */}
          <div
            className={`flex flex-col justify-center items-center md:items-start ${
              isEditing ? 'gap-3' : 'gap-2'
            }`}>
            <div className="flex justify-center items-center gap-2">
              {isEditing ? (
                <div className="font-semibold w-full flex flex-col md:flex-row justify-between items-center gap-2">
                  <span>User Name:</span>
                  <span className="text-gray-500">
                    <input
                      type="username"
                      name="username"
                      id="username"
                      className="grow text-center outline-none border-transparent relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 p-2"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </span>
                </div>
              ) : (
                <h1 className="capitalize font-bold text-lg sm:text-xl md:text-2xl text-gray-700">
                  {user_name}
                </h1>
              )}
            </div>
            {!isEditing && (
              <h1
                className={`font-semibold w-full flex justify-between items-center gap-2 ${
                  isEditing && 'flex-col md:flex-row'
                }`}>
                <span>Land Posts:</span>
                <span className="text-gray-500">{postCount}</span>
              </h1>
            )}
            <h1
              className={`font-semibold w-full flex justify-between items-center gap-2 ${
                isEditing && 'flex-col md:flex-row'
              }`}>
              <span>Contact:</span>
              {!isEditing ? (
                <span className="text-gray-500">{user_contact}</span>
              ) : (
                <span className="text-gray-500 rounded-md">
                  <input
                    type="text"
                    name="contact"
                    id="contact"
                    className="grow text-center outline-none border-transparent relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                  />
                </span>
              )}
            </h1>
            <h1
              className={`font-semibold w-full flex justify-between items-center gap-2 ${
                isEditing && 'flex-col md:flex-row'
              }`}>
              <span>Email:</span>
              <span className="text-gray-500 truncate">{user_email}</span>
            </h1>
            {/* Profile Action */}
            {isEditing ? (
              <button
                className="flex space-x-2 place-items-center bg-orange-300 text-orange-50 py-1 px-2 rounded-md hover:text-orange-100 hover:bg-orange-400 active:scale-110 transition duration-150 ease-in-out"
                onClick={handleSaving}>
                {!saving && <HiIcons.HiOutlineCheck />}
                <span>{saving ? 'please wait...' : 'Save Profile'}</span>
              </button>
            ) : (
              <button
                className="flex space-x-2 place-items-center bg-gray-300 text-gray-50 py-1 px-2 rounded-md hover:text-gray-100 hover:bg-gray-400 active:scale-110 transition duration-150 ease-in-out"
                onClick={handleEditMode}>
                <HiIcons.HiPencilAlt />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
          {/* user avatar */}
          <div className="flex grow flex-col justify-center gap-2 items-center">
            {isEditing && newAvatar ? (
              <span
                className="w-24 sm:w-32 h-24 sm:h-32 shadow-sm rounded-md bg-gray-50 grid place-items-center"
                onClick={handleImageUpload}>
                <HiIcons.HiPhotograph className="h-8 w-8 md:h-10 md:w-10 cursor-pointer text-orange-400" />
              </span>
            ) : (
              <span className="w-24 sm:w-32 h-24 sm:h-32">
                <Image
                  // src={avatar_url ? getPublicUrl(avatar_url) : placeholder}
                  src={signedUrl ? signedUrl : placeholder}
                  layout="responsive"
                  objectFit="contain"
                  width={50}
                  height={50}
                  alt={`${user_name} 's photo`}
                  className="rounded-md"
                />
              </span>
            )}
            {isEditing && newAvatar && (
              <div className="text-sm flex gap-2 items-center">
                <span className="text-gray-400">Selected:</span>
                <span className="text-orange-400">
                  {avatarUploaded ? 'uploaded' : newAvatar.name}
                </span>
              </div>
            )}
            {isEditing && (
              <button
                className="text-sm sm:text-base flex space-x-2 place-items-center bg-gray-200 text-gray-400 py-1 px-2 rounded-md hover:text-gray-50 hover:bg-gray-300 active:scale-110 transition duration-150 ease-in-out"
                onClick={handleImageUpload}>
                upload photo
              </button>
            )}
            {/* Image upload ref actual input */}
            <input
              type="file"
              accept={'image/jpeg image/png'}
              onChange={(event) => setNewAvatar(event.target.files[0])}
              ref={uploadInputRef}
              className="hidden"
            />
          </div>
        </section>
      </div>
      {/* User Posts And Their CRUD ops... */}
      {/* <UserPostsArea handlePostCount={getPostCount} /> */}
    </section>
  );
};

export default UserDashboard;
