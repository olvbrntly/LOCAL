import { selectBusinessIds, useGetBusinessesQuery } from "./businessSlice";
import { useSelector } from "react-redux";
import Business from "./Business";

const BusinessesList = () =>{
    
    const{
        data:businesses,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBusinessesQuery();


    let content;
    if(isLoading){
        content = <p>Loading ...</p>
    }

    if(isError){
        content = <p>{error?.data?.message}</p>
    }

    if(isSuccess){
        const {ids} = businesses
         const businessList = ids?.length ? ids.map(id => <Business key={id} businessId={id}/>) : null

         content = (
            <div>{businessList}</div>
        )
    }
   
   

    return content
}

export default BusinessesList