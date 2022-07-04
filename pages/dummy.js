{
  posts.length === 0 ? (
    <Loader type="loader" />
  ) : posts?.length > 0 ? (
    <section className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 relative z-0">
      {posts?.map((post, index) => (
        <Zoom key={index}>
          <div
            key={post.id}
            className="w-full flex flex-col shadow-lg bg-gray-50 rounded-md overflow-hidden justify-between items-stretch grow"
          >
            {/* Card Media */}
            <Link href={`/land/${post.id}`} passHref>
              <a>
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
                    <span>{`${post.location} - ${post.width} ku ${post.height}`}</span>
                  </div>
                </div>
              </a>
            </Link>
            {/* Card Content */}
            <div className="flex flex-col justify-between gap-4 grow">
              <div className="p-2 flex items-center justify-between gap-8">
                <h1 className="font-bold flex justify-between items-center sm:text-sm md:text-base w-full">
                  <span className="text-gray-700">
                    Price: {priceFormat(post.price)}
                  </span>
                  <span className="text-gray-600">
                    {post.installments ? 'Kibanjampola' : 'Full price'}
                  </span>
                </h1>
              </div>
              {/* Card Actions */}
              <div className="w-full flex justify-center items-center grow p-1 gap-3">
                <button
                  className="w-full bg-red-400 text-red-50 flex justify-center items-center capitalize grow py-2 md:py-4 hover:bg-red-200 hover:text-red-400 active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md"
                  onClick={() => handlePostDelete(post.id)}
                >
                  <HiIcons.HiTrash />
                  <span>delete</span>
                </button>
                <button
                  className="w-full bg-green-400 text-green-50 flex justify-center items-center capitalize grow py-2 md:py-4 hover:bg-green-200 hover:text-green-400 active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md"
                  onClick={handlePostEdit(post.id)}
                >
                  <HiIcons.HiPencilAlt />
                  <span>edit</span>
                </button>
                <Link href={`/land/${post.id}`} passHref>
                  <a>
                    <button className="w-full bg-orange-400 text-orange-50 flex justify-center items-center capitalize grow py-2 md:py-4 hover:bg-orange-200 hover:text-orange-400 active:scale-110 transition duration-150 ease-in-out px-10 gap-1 rounded-md">
                      <HiIcons.HiEye />
                      <span>view</span>
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Zoom>
      ))}
    </section>
  ) : (
    // When There no posts
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
  );
}
