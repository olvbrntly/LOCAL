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

    const businessIds = useSelector(selectBusinessIds)
    console.log('----------')
    console.log(businessIds)

    let content;
    if(isLoading){
        content = <p>Loading ...</p>
    }else if(isSuccess){
        const {ids} = businesses
        content = ids?.length ? ids.map(businessId => <Business key={businessId} businessId={businessId}/>) : null
    }else if(isError){
        content = <p>{error.data.message}</p>
    }

    return content
}

export default BusinessesList