import supabase from "./supabase"

export const getCabins = async()=>{

    const { data, error } = await supabase
    .from('cabins')
    .select('*')

    if(error)
    {
        console.log(error);
        throw new Error("Error ===> Cabins could not be loaded !!");
        
    }

    return data;
  
}