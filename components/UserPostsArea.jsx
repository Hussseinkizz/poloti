// Todos:
// - Get all targeted user's posts
// - Create New Post
// - Read Post
// - Update target Post
// - Delete target post

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Zoom, Fade } from 'react-reveal';
import * as HiIcons from 'react-icons/hi';
import { supabase } from '../supabase-client';
import SearchBox from './SearchBox';
import CheckboxGroup from './CheckboxGroup';
import EditPostModal from './EditPostModal';
import CreatePostModal from './CreatePostModal';
import { useNumberFormat } from '../hooks/useNumberFormat';

const UserPostsArea = ({ handlePostCount, dataExport }) => {
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    if (dataExport) {
      setUserPosts(dataExport);
    }
    if (userPosts) {
      postCountValue = userPosts.length;
      handlePostCount(postCountValue);
    }
  }, [dataExport, userPosts, handlePostCount]);

  const checkHandler = (status) => {
    // do foo
  };
  // toggle sales status on backend
  const handlePostSoldYes = async (targetID) => {
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
  };
  const handlePostSoldNo = async (targetID) => {
    await supabase
      .from('posts')
      .update({
        is_sold: false,
      })
      .match({
        id: targetID,
      });
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
        {userPosts.length ? (
          <section className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 relative z-0">
            {userPosts?.map((post, index) => (
              <Zoom key={index}>
                <div
                  key={post.id}
                  className="w-full flex flex-col shadow-lg bg-gray-50 rounded-md overflow-hidden justify-between items-stretch grow">
                  {/* Card Media */}
                  <Link href={`/land/${post.id}`} passHref>
                    <a data-mdb-ripple="true">
                      <div className="w-full h-60 group relative cursor-pointer flex grow">
                        <Image
                          src={sampleImage}
                          layout="fill"
                          loading="lazy"
                          objectFit="fill"
                          alt={`Image of ${post.location}`}
                          // title={title}
                          className={`w-full rounded-t-md hover:opacity-60 hover:scale-105 group-hover:scale-110 group-hover:opacity-75 transition duration-150 ease-linear ${
                            imageIsLoading
                              ? 'grayscale blur-3xl'
                              : 'grayscale-0 blur-0 transition-all duration-300 ease-in-out'
                          }`}
                          onLoadingComplete={() => setImageIsLoading(false)}
                        />
                        {/* The overlay content */}
                        <div className="truncate absolute z-10 font-bold flex justify-center items-center w-full h-full text-white text-xl hover:text-orange-300 transition duration-150 ease-linear capitalize">
                          <span className="rounded-md bg-black bg-opacity-20 px-4 py-2">{`${post.location} - ${post.width} ku ${post.height}`}</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                  {/* Card Content */}
                  <div className="flex flex-col justify-between gap-4 grow">
                    <div className="p-2 flex items-center justify-between gap-8">
                      <h1 className="font-bold flex justify-between items-center sm:text-sm md:text-base w-full">
                        <span className="text-gray-700">
                          {/* Price: {useNumberFormat(post.price)} */}
                        </span>
                        <span className="text-gray-600">
                          {post.installments ? 'Kibanjampola' : 'Full price'}
                        </span>
                      </h1>
                    </div>
                    {/* Card Actions */}
                    <section className="w-full flex justify-center items-center grow p-2 rounded-md ">
                      <div className="w-full flex flex-col justify-center items-center grow gap-4 rounded-md border p-2">
                        <div className="w-full flex justify-between items-center grow gap-2">
                          <h2 className="text-gray-700 font-semibold capitalize">
                            <span>Land still available?</span>
                          </h2>
                          <CheckboxGroup
                            checkStatus={!post.is_sold}
                            handleCheckStatus={checkHandler}
                          />
                        </div>
                        {/* Card Buttons */}
                        <div className="w-full flex justify-center items-center grow gap-2">
                          <button
                            className="w-full bg-red-400 text-red-50 flex justify-center items-center capitalize grow py-2 hover:bg-red-200 hover:text-red-400 active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md"
                            onClick={() => handlePostDelete(post.id)}>
                            <HiIcons.HiTrash />
                            <span>delete</span>
                          </button>
                          <button
                            className="w-full bg-green-400 text-green-50 flex justify-center items-center capitalize grow py-2 hover:bg-green-200 hover:text-green-400 active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md"
                            onClick={() => handlePostEdit(post.id)}>
                            <HiIcons.HiPencilAlt />
                            <span>edit</span>
                          </button>
                          <button className="w-full flex grow">
                            <Link href={`/land/${post.id}`} passHref>
                              <a className="w-full bg-orange-400 text-orange-50 flex justify-center items-center capitalize grow py-2 hover:bg-orange-200 hover:text-orange-400 active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md">
                                <HiIcons.HiEye />
                                <span>view</span>
                              </a>
                            </Link>
                          </button>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </Zoom>
            ))}
          </section>
        ) : (
          <Fade bottom>
            <div className="w-full sm:w-1/2 md:w-3/4 border bg-gray-100 p-4 py-16 mx-auto rounded-md shadow-md">
              <h1 className="text-center text-gray-400  truncate flex flex-col justify-center gap-2 items-center">
                <HiIcons.HiExclamationCircle className="text-2xl md:text-3xl" />
                <span className="text-sm sm:text-base">
                  You have no posts for now, post some now!
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
};

export default UserPostsArea;

export const getServerSideProps = async ({ params }) => {
  // Query the targeted user's posts, with the post owner's profile
  // console.log('params', params);
  const { data: userPosts, error } = await supabase
    .from('posts')
    .select('*, profiles(*)')
    .eq('user_id', params.id)
    .order('created_at');

  if (error) {
    console.log(error);
    // Return 404 response.
    // No user posts found or something went wrong with the query
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dataExport: userPosts || null,
    },
  };
};
