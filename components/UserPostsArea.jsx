// Todos:
// - Get all targeted user's posts
// - Create New Post
// - Read Post
// - Update target Post
// - Delete target post

import { useState, useEffect, useRef } from 'react';
import { Zoom, Fade } from 'react-reveal';
import * as HiIcons from 'react-icons/hi';
import SearchBox from './SearchBox';
import EditPostModal from './EditPostModal';
import CreatePostModal from './CreatePostModal';
import UserPostCard from './UserPostCard';

export default function UserPostsArea({ posts }) {
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userPosts, setUserPosts] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (posts) {
      setUserPosts(posts);
    }
    }, [posts]);

  // toggle sales status on backend
  const handlePostSoldYes = async (targetID) => {
    setIsProcessing(true);
    try {
      await supabase
        .from('posts')
        .update({
          is_sold: true,
        })
        .match({
          id: targetID,
        });
      // change post sale status to true!
      // do nothing if already true
      // do this server side, or client side firstly if possible!
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };
  const handlePostSoldNo = async (targetID) => {
    setIsProcessing(true);
    try {
      await supabase
        .from('posts')
        .update({
          is_sold: false,
        })
        .match({
          id: targetID,
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const statusHandler = async ({ check, id }) => {
    // if (check === true) {
    //   await handlePostSoldNo(id);
    //   console.log('yes', id, check);
    //   setIsProcessing(true);
    // } else {
    //   await handlePostSoldYes(id);
    //   console.log('no', id, check);
    //   setIsProcessing(true);
    // }
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
  const handlePostDelete = async (id) => {
    // console.log(id);
    // console.log(posts);
    // TODO: Also do delete ops on backend!
    // delete post
    // const handlePostDelete = async (targetID) => {
    //   await supabase.from('posts').delete().match({ id: targetID });
    // };
    const { data, error } = await supabase
      .from('posts')
      .delete()
      .match({ id: id });
    if (data) {
      console.log(data);
      // Delete item from UI
      const filteredPosts = posts.filter((post) => post.id !== id);
      // console.log('filtered', filteredPosts);
      setUserPosts(filteredPosts);
    } else {
      throw new error(error.message);
    }
  };

  return (
    <section>
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
                onClick={() => setShowCreateModal(true)}>
                <HiIcons.HiPlus />
                <span>create post</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* User Posts */}
      <section className="mx-auto lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        {userPosts?.length > 0 ? (
          <section className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 relative z-0">
            {userPosts?.map((post, index) => (
              <Zoom key={index}>
                <UserPostCard
                  post={post}
                  isIdle={!isProcessing}
                  handlePostDelete={handlePostDelete}
                  handlePostEdit={handlePostEdit}
                  checkHandler={statusHandler}
                />
              </Zoom>
            ))}
          </section>
        ) : (
          <Fade bottom>
            <div className="w-full sm:w-1/2 md:w-3/4 border bg-gray-100 p-4 py-16 mx-auto rounded-md shadow-md">
              <h1 className="text-center text-gray-400  truncate flex flex-col justify-center gap-2 items-center">
                <HiIcons.HiExclamationCircle className="text-2xl md:text-3xl" />
                <span className="text-sm sm:text-base">
                  Oops!<br /> No posts for now, create some by clicking "create post".
                </span>
              </h1>
            </div>
          </Fade>
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
}
