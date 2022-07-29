// sample snippets

// fetch all posts @index.js
export async function getStaticProps() {
  const { data: posts, error } = await supabase.from("posts").select("*");

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
    .from("posts")
    .select("*, profiles(*)")
    .eq("id", params.id)
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

useEffect(() => {
  const subscription = supabase
    .from("profiles")
    .on("INSERT", (payload) => {
      setUpdates(payload);
    })
    .subscribe();

  return () => supabase.removeSubscription(subscription);
}, []);

// upload image
const FileInput = (
  <input
    type="file"
    accept={"image/jpeg image/png"}
    onChange={(e) => setUserAvatar(e.target.files[0])}
  />
);

const handleUpload = async () => {
  if (userAvatar) {
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`${Date.now()}_${userAvatar.name}`, userAvatar);

    if (error) {
      throw new error(error.message);
    }

    if (data) {
      setUserAvatarUrl(data.key);
    }

    // update user profile to use new avatar
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
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
