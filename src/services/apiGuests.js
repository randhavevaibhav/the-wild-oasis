
import { PAGE_SIZE } from "../utils/constants";
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





