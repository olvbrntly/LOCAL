import {  useGetBusinessesQuery } from "./businessSlice";

import BusinessCard from "./BusinessCard";

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
         const businessList = ids?.length ? ids.map(id => <BusinessCard key={id} businessId={id}/>) : null

         content = (
            <div className="business-list-content">
                <h2 className="businessList-title">All Businesses</h2>
                <div className="businessList">{businessList}</div>
            </div>
        )
    }
   
   

    return content
}

export default BusinessesList