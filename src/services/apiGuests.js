
import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";


export async function createEditGuest(newGuest, id) {
  let query = supabase.from("guests");
  let errorIn = "Creating new";
  //A create
  if (!id) {
    query = query.insert([{ ...newGuest }]);
  }
  //B edit
  if (id) {
    query = query
      .update({ ...newGuest })
      .eq("id", id)
      .select();
    errorIn = "Editing";
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);

    throw new Error(`Error in ${errorIn} Guest`);
  }

  return data;
}



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

export async function getGuestsWithCond({  sortBy, page }) {
  let query = supabase
    .from("guests")
    .select(
      "id,fullName,email,nationalID,nationality",
      { count: "exact" }
    );
  // //filter
  // if (filter) {
  //   //  console.log("filter.field ===> "+filter.field);
  //   //  console.log("filter.value ===> "+filter.value);

  //   query = query[filter.method || "eq"](filter.field, filter.value);
  // }
  //sort
  if (sortBy) {
    // console.log("sortBy.field ===> " + sortBy.field);
    // console.log("sortBy.direction ===> " + sortBy.direction);
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    let from = (page - 1) * PAGE_SIZE;
    //console.log("from ===> "+from)

    let to = from + PAGE_SIZE - 1;

    //console.log("to ===> "+to)
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  // console.log("data===> "+JSON.stringify(data))

  //  console.log("page ===> "+page)
  //  console.log("filter ===> "+filter)
  //  console.log("sortBy ===> "+sortBy)

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }

  return { data, count };
}


export async function getGuestsWithNoBooking()
{
 let query= supabase
  .from('guests')
  .select('fullName,id, bookings (cabinId,guestId)')
  .is("bookings(guestId)",null)
  


  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }

  return data;
  
}


export async function deleteGuest(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("guest could not be deleted");
  }
  return data;
}

