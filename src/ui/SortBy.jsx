import { useSearchParams } from "react-router-dom"
import Select from "./Select"


const SortBy = ({options}) => {
    const [searchParams,setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy")||"";

    function handelChange(e){
        console.log("searchParams====> "+e.target.value)
        searchParams.set("sortBy",e.target.value);
        setSearchParams(searchParams);
    }
  return (
    <Select options={options} type="white" onChange={handelChange} value={sortBy} />
  )
}

export default SortBy
