// sample snippets

// fetch all posts @index.js
export async function getStaticProps() {
  const { data: posts, error } = await supabase.from('posts').select('*');

  if (error) {
    throw new error(error.message);
  }

  return {
    props: {
      posts,
    },
  };
}

// fetch specific post according to id @[id].js, also get user profile
export async function getServerSideProps({ params }) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*, profiles(*)')
    .eq('id', params.id)
    .single();

  if (error) {
    throw new error(error.message);
  }

  return {
    props: {
      post,
    },
  };
}

// login , handle login form submission
const handleSubmit = async (event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  await supabase.auth.signIn({
    email,
    password,
  });
};

// realtime subscriptions
// inside a function component, set current state to new updates or payload with use Efffect
// enable subscriptions on given table in supabase dashboard --> replication
// sub to posts table only!

// useEffect(() => {
//   const subscription = supabase
//     .from("profiles")
//     .on("INSERT", (payload) => {
//       setUpdates(payload);
//     })
//     .subscribe();

//   return () => supabase.removeSubscription(subscription);
// }, []);

// upload image
const FileInput = (
  <input
    type="file"
    accept={'image/jpeg image/png'}
    onChange={(e) => setUserAvatar(e.target.files[0])}
  />
);

const handleUpload = async () => {
  if (userAvatar) {
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`${Date.now()}_${userAvatar.name}`, userAvatar);

    if (error) {
      throw new error(error.message);
    }

    if (data) {
      setUserAvatarUrl(data.key);
    }

    // update user profile to use new avatar
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .upsert({
        id: auth.user.id,
        avatar: setUserAvatarUrl,
        /* .... */
      });
    if (profilesError) {
      throw new error(profilesError.message);
    }

    if (profiles) {
      setUsers(profiles);
    }
  }
};

// const { data: profileData, profileError } = await supabase
//         .from("profiles")
//         .insert({
//           user_name: userName,
//           user_email: userEmail,
//           user_contact: userContact,
//           avatar_url: userAvatarUrl,
//         });
//       console.log(profileData, profileError);

// array.reduce((currentItration, item) => { return item.number + currentItration}, startIndex)

// {newImage ? (
//   <div className="w-full">
//     <div className="w-full h-60 group relative cursor-pointer flex grow">
//       <Image
//         src={newImage}
//         layout="fill"
//         loading="lazy"
//         objectFit="fill"
//         alt={`Image of ${newLocation}`}
//         // title={title}
//         className={`w-full rounded-t-md hover:opacity-60 hover:scale-105 group-hover:scale-110 group-hover:opacity-75 transition duration-150 ease-linear ${
//           imageIsLoading
//             ? 'grayscale blur-3xl'
//             : 'grayscale-0 blur-0 transition-all duration-300 ease-in-out'
//         }`}
//         onLoadingComplete={() => setImageIsLoading(false)}
//         onClick={handleImagesUpload}
//       />
//       {/* Image upload ref actual input */}
//       <input
//         type="file"
//         multiple={true}
//         accept={'image/jpeg image/png'}
//         onChange={handleImageChange}
//         ref={uploadImagesRef}
//         className="hidden"
//       />
//       {/* The overlay content */}
//       <div className="truncate absolute z-10 font-bold flex justify-center items-end pb-2 w-full h-full text-white text-xl hover:text-orange-300 transition duration-150 ease-linear capitalize">
//         <button
//           className="text-sm sm:text-base flex justify-center  items-center gap-2 bg-gray-800 bg-opacity-20 text-gray-400 py-1 px-2 rounded-md hover:text-gray-50 hover:bg-opacity-60 active:scale-95 transition duration-150 ease-in-out"
//           onClick={handleImagesUpload}
//         >
//           <HiIcons.HiCloudUpload className="text-xl md:text-2xl" />
//           <span>Tap to upload photo</span>
//         </button>
//         {/* Image upload ref actual input */}
//         <input
//           type="file"
//           multiple={true}
//           accept={'image/jpeg image/png'}
//           onChange={(event) =>
//             setNewImage(event.target.files[0])
//           }
//           ref={uploadImagesRef}
//           className="hidden"
//         />
//       </div>
//     </div>
//   </div>
// ) : (
//   <div className="w-full h-60 relative cursor-pointer flex flex-col justify-center  items-center gap-2 grow bg-gray-400 bg-opacity-25">
//     <BiImageAdd
//       className="text-5xl text-gray-500"
//       onClick={handleImagesUpload}
//     />
//     <button
//       className="text-sm sm:text-base flex justify-center  items-center gap-2 bg-gray-800 bg-opacity-20 text-gray-800 py-1 px-2 rounded-md hover:text-gray-50 hover:bg-opacity-60 active:scale-95 transition duration-150 ease-in-out"
//       onClick={handleImagesUpload}
//     >
//       Tap to upload photos
//     </button>
//     {/* Image upload ref actual input */}
//     <input
//       type="file"
//       multiple={true}
//       accept={'image/jpeg image/png'}
//       onChange={(event) =>
//         setNewImage(event.target.files[0])
//       }
//       ref={uploadImagesRef}
//       className="hidden"
//     />
//   </div>
// )}

// * preview local images
export default function App() {
  const [image, setImage] = React.useState('');
  const imageRef = React.useRef(null);

  function useDisplayImage() {
    const [result, setResult] = React.useState('');

    function uploader(e) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
          uploader(e);
        }}
      />
      {/* {result && <img ref={imageRef} src={result} alt="" />} */}
    </div>
  );
}
