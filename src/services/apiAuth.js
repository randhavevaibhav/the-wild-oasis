import supabase, { supabaseUrl } from "./supabase";

export const signup = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
};

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  console.log(data);
  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  console.log(data);

  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  //1.update the password or fullname
  let updateData;
  if (password) updateData = { password };
  if (fullName)
    updateData = {
      data: {
        fullName,
      },
    };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  //2.upload avatar img
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error:storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

  //3.update the user with avatar
  const {data:updatedUser,error:error2} = supabase.auth.updateUser({
    data:{
      avatar:`${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      
    }
  });
  if (error2) throw new Error(error2.message);
  return updatedUser;

};
