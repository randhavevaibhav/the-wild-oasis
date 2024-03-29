import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*").order("id");

  if (error) {
    console.log(error);
    throw new Error("Error ===> Cabins could not be loaded !!");
  }

  return data;
};

export const CreateEditCabin = async (newCabin, id) => {
  //https://ipmcodordginsmosxniv.supabase.co/storage/v1/object/public/cabin-images/cabin-006.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //creating a unique image file name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  console.log("copy cabin name ====>" + newCabin.name);

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  //A create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  //B edit
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    let errorIn = "creating new";

    if(newCabin.name?.includes("Copy"))
    {
      errorIn="duplicating"
    }

    throw new Error(`Error in ${errorIn} cabin`);
  }

  //2.upload img

  //if img is already uploaded.
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete a cabin if error in image upload
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Image could not be uploaded !!");
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  console.log("data from delete cabin query ==> " + data);
  //show error if the return data is null
  if (error || data === null) {
    console.log(error);
    throw new Error("Cabins could not be deleted !!");
  }

  return data;
};
