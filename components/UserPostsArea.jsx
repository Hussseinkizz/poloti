// Todos:
// ! users in dashboard route should have the create post action in header instead of post your land (dashboard itself)
// - Get all targeted user's posts
// - Create New Post
// - Read Post
// - Update target Post
// - Delete target post

import { useState, useEffect, useRef } from 'react';
import * as HiIcons from 'react-icons/hi';
import SearchBox from './SearchBox';
import EditPostModal from './EditPostModal';
import CreatePostModal from './CreatePostModal';
import { supabase } from '../supabase-client';
import UserPostsAreaPosts from './UserPostsAreaPosts';

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
    const targetPost = userPosts.filter((post) => post.id === id);
    setEditPost(targetPost[0]);
    // console.log(editPost);
    // show edit post modal
    setShowModal(true);
  };

  // handle post delete
  // todo: check really if images are removed from bucket to save memory!
  const handlePostDelete = async (id) => {
    const targetPost = userPosts.filter((post) => post.id === id);
    const { image1_url, image2_url, image3_url, image4_url } = targetPost[0]
    const targetImages = [ image1_url, image2_url, image3_url, image4_url]
    const trimmedImagePaths = targetImages.map((image) => {
      return image.split('post_images/').pop();
    });

    setIsProcessing(true);

    try {
       await supabase
      .storage
      .from('post_images')
      .remove(trimmedImagePaths)
    } catch (error) {
      console.log('error', error);
    } finally {
      deletePost(id);
      setIsProcessing(false);
    }

    async function deletePost(id) {
      const { data, error } = await supabase
        .from('posts')
        .delete()
        .match({ id: id });
      if (data) {
        // Delete item from UI
        const filteredPosts = userPosts.filter((post) => post.id !== id);
        setUserPosts(filteredPosts);
      } else {
        throw new error(error.message);
      }
    };

  };

  const userPostsArea_props = {
    userPosts,
    isProcessing,
    handlePostDelete,
    handlePostEdit,
    statusHandler,
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
                className="w-full grow bg-orange-400 text-orange-50 flex justify-center items-center capitalize p-2 py-3 md:py-2 hover:bg-orange-200 hover:text-orange-400 active:scale-95 transition duration-150 ease-in-out gap-1 rounded-md"
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
      <UserPostsAreaPosts {...userPostsArea_props} />
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
