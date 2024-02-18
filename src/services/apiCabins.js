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

export const deleteCabin = async (id)=>{

const { data, error } = await supabase
.from('cabins')
.delete()
.eq('id', id);

if(error)
{
    console.log(error);
    throw new Error("Error ===> Cabins could not be deleted !!");
    
}

return data;


}