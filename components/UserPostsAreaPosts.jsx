import React, { useEffect, useState } from 'react';
import { Fade, Zoom } from 'react-reveal';
import Loader from './Loader';
import * as HiIcons from 'react-icons/hi';
import UserPostCard from './UserPostCard';

//? suggestion: maybe improve user experience for loading state

const UserPostsAreaPosts = ({ userPosts, isProcessing, handlePostDelete,handlePostEdit,statusHandler }) => {
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    if (userPosts) {
      setIsLoadingPosts(false);
    }
    }, [userPosts]);

  if (isLoadingPosts) {
    return <Loader type="loader" />;
  }
  if (!userPosts || !userPosts.length) {
    return (
      <Fade bottom>
        <div className="w-full sm:w-1/2 md:w-3/4 border bg-gray-100 p-4 py-16 mx-auto rounded-md shadow-md">
          <h1 className="text-center text-gray-400  truncate flex flex-col justify-center gap-2 items-center">
            <HiIcons.HiExclamationCircle className="text-2xl md:text-3xl" />
            <span className="text-sm sm:text-base">
              Oops!
              <br /> No posts for now, create some by clicking "create post".
            </span>
          </h1>
        </div>
      </Fade>
    );
  }
  return (
    <section className="mx-auto lg:max-w-7xl px-4 sm:px-6 lg:px-8">
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
    </section>
  );
};

export default UserPostsAreaPosts;
