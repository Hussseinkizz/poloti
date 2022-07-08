// * user can view their posts, edit and delete them
// * users can also post new land posts
// * this is a protected route, only authenticated users can view it

// import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import * as HiIcons from 'react-icons/hi';
import Loader from '../components/Loader';
import EditPostModal from '../components/EditPostModal';
// import { supabase } from '../supabase-client';

// ? import sample images
import sampleAvatar from '../public/images/me.png';
import DashboardPosts from '../components/DashboardPosts';
import SearchBox from '../components/SearchBox';
import CreatePostModal from '../components/CreatePostModal';

const UserDashboard = ({ userposts }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContact, setNewContact] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  // const [user, setUser] = useState({});

  // * destructure user profile details...
  const { user_id, user_email, user_name, user_contact, user_avatar } =
    userposts[0];
  const userPostCount = userposts?.length;

  // * populate user detail
  useEffect(() => {
    setPosts(userposts);
    setNewContact(user_contact);
    setNewEmail(user_email);
    setNewName(user_name);
  }, [user_contact, user_email, user_name]);
  // console.log(posts);

  // handle editing
  const handleEditMode = () => {
    setNewContact(user_contact);
    setNewEmail(user_email);
    setNewName(user_name);
    setIsEditing(true);
  };

  // TODO: fix useRef code!
  // define the upload button ref
  const triggerRef = useRef(uploadInput);

  // use useRef hook to click on upload file input instead
  const uploadInput = () => {
    return <input type="file" name="photo" id="photo" />;
  };

  // handle new photo uploading
  const handleUpload = () => {
    // click the upload trigger
    triggerRef.current.click();
  };

  // handle updated user profile saving
  const handleSaving = () => {
    setIsEditing(false);
    // parse all updated user profile details to backend!
  };

  // handle post editing
  const handlePostEdit = (id) => {
    // console.log(id);
    const targetPost = posts.filter((post) => post.id === id);
    setEditPost(targetPost[0]);
    // console.log(editPost);
    // show edit post modal
    setShowModal(true);
  };

  // handle post delete
  const handlePostDelete = (id) => {
    // console.log(id);
    // console.log(posts);
    // TODO: Also do delete ops on backend!
    const filteredPosts = posts.filter((post) => post.id !== id);
    // console.log('filtered', filteredPosts);
    setPosts(filteredPosts);
  };

  return (
    <section className="w-full relative pb-10">
      <div className="w-full flex flex-col justify-center gap-2 items-center pt-14 sm:pt-4 border-b bg-gray-50 pb-2 mb-4 rounded-b-md ">
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
            }`}
          >
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
                }`}
              >
                <span>Land Posts:</span>
                <span className="text-gray-500">{userPostCount}</span>
              </h1>
            )}
            <h1
              className={`font-semibold w-full flex justify-between items-center gap-2 ${
                isEditing && 'flex-col md:flex-row'
              }`}
            >
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
              }`}
            >
              <span>Email:</span>
              {!isEditing ? (
                <span className="text-gray-500 truncate">{user_email}</span>
              ) : (
                <span className="text-gray-500">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="grow text-center outline-none border-transparent relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </span>
              )}
            </h1>
            {/* Profile Action */}
            {isEditing ? (
              <button
                className="flex space-x-2 place-items-center bg-orange-300 text-orange-50 py-1 px-2 rounded-md hover:text-orange-100 hover:bg-orange-400 active:scale-110 transition duration-150 ease-in-out"
                onClick={handleSaving}
              >
                <HiIcons.HiOutlineCheck />
                <span>Save Profile</span>
              </button>
            ) : (
              <button
                className="flex space-x-2 place-items-center bg-gray-300 text-gray-50 py-1 px-2 rounded-md hover:text-gray-100 hover:bg-gray-400 active:scale-110 transition duration-150 ease-in-out"
                onClick={handleEditMode}
              >
                <HiIcons.HiPencilAlt />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
          {/* user avatar */}
          <div className="flex grow flex-col justify-center gap-2 items-center">
            <span className="w-24 sm:32 h-24 sm:32">
              <Image
                src={sampleAvatar}
                layout="responsive"
                objectFit="contain"
                alt={`${user_name} 's photo`}
                className="rounded-full"
              />
            </span>
            {isEditing && (
              <button
                className="text-sm sm:text-base flex space-x-2 place-items-center bg-gray-200 text-gray-400 py-1 px-2 rounded-md hover:text-gray-50 hover:bg-gray-300 active:scale-110 transition duration-150 ease-in-out"
                onClick={handleUpload}
              >
                upload photo
              </button>
            )}
          </div>
        </section>
      </div>
      {/* User Posts Title bar */}
      <section className="mx-auto lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 md:flex-row justify-between items-center shadow-md bg-gray-50 rounded-md p-2 mb-4">
          <h1 className="flex justify-center md:justify-start items-center gap-2 grow">
            <HiIcons.HiFolder className="text-2xl md:text-3xl text-gray-400" />
            <span className="text-sm sm:text-base">Your Posts Here:</span>
          </h1>
          {/* Titile bar actions */}
          <div className="w-full flex flex-col md:flex-row justify-evenly items-center gap-4 grow md:grow-0 md:w-fit">
            <div className="flex grow w-full md:w-2/6 relative">
              <SearchBox placeholder="search location..." />
            </div>
            <div className="w-full md:w-fit">
              <button
                className="w-full grow bg-orange-400 text-orange-50 flex justify-center items-center capitalize p-2 py-3 md:py-2 hover:bg-orange-200 hover:text-orange-400 active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md"
                onClick={() => setShowCreateModal(true)}
              >
                <HiIcons.HiPlus />
                <span>create post</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* User Posts */}
      <section className="mx-auto lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        {posts.length ? (
          <DashboardPosts
            posts={posts}
            handlePostEdit={(id) => handlePostEdit(id)}
            handlePostDelete={(id) => handlePostDelete(id)}
          />
        ) : (
          <Loader type="loader" />
        )}
      </section>
      {/* Post Edit Modal Form */}
      {editPost && showModal && (
        <EditPostModal
          post={editPost}
          isOpen={showModal}
          closeModal={() => setShowModal(false)}
        />
      )}
      {/* Post Creation Modal Form */}
      {showCreateModal && (
        <CreatePostModal
          isOpen={showCreateModal}
          closeModal={() => setShowCreateModal(false)}
        />
      )}
    </section>
  );
};

export default UserDashboard;
