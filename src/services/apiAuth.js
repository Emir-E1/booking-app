import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName, avatar }) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName: fullName,
        avatar: avatar,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null; // stop
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  if (!user.email_confirmed_at) {
    throw new Error("Email not verified");
  }

  return user;
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  //Update FullName ....
  let updatedUser;
  if (fullName) updatedUser = { data: { fullName } };
  //Update Password.....
  if (password) updatedUser = { password };
  //Upload the avatar...
  const { data, error } = await supabase.auth.updateUser(updatedUser);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  const fileAvatarPath = `avatar-${data.user.id}-${Math.random()}`;

  //Updtae avatar.....
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileAvatarPath, avatar);
  if (storageError) throw new Error(storageError.message);

  //Update the User.....
  const { data: userUpdate, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileAvatarPath}`,
    },
  });
  if (error2) throw new Error(error2.message);

  return userUpdate;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
