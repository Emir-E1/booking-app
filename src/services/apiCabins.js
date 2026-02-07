import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  try {
    let { data, error } = await supabase.from("cabins").select("*");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCabin = async (id) => {
  try {
    const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  } catch (error) {
    console.log(error);
  }
};
export const postEditCabin = async (newCabin, id) => {
  const hasImagePath = typeof newCabin.image === "string";

  let imagePath = newCabin.image;

  if (!hasImagePath) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      "/",
      ""
    );

    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      throw new Error(storageError.message);
    }
  }

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]).select();
  }

  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
