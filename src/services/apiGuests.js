
import supabase from "./supabase";

export async function getGuests() {
  let query = supabase
    .from("guests")
    .select(
      "*"
    ).order("fullName");
 

  const { data, error } = await query;


  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }

  return data;
}







