import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuestsWithCond } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";



export const useGuestsWithCond = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();


    const sortByRaw = searchParams.get("sortBy")||"fullName-desc";
    const [field,direction] = sortByRaw.split("-");
    const sortBy = {
        field,
        direction
      }

      const page =!searchParams.get("page")?1:Number(searchParams.get("page"));

      const {
        isLoading,
        data: {data:guestsWithCond,count}={},
        error,
      } = useQuery({
        queryKey: ["getGuestsWithCond",sortBy,page],
        queryFn: () => getGuestsWithCond({sortBy,page}),
      });

 

  return {isLoading,error,guestsWithCond,count}
};
