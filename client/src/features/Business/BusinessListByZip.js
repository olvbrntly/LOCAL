import { useGetBusinessesByZipQuery } from "./businessSlice";
import { selectBusinessesByZipCode } from "./businessSlice"; // Correct import
import { useSelector } from "react-redux";
import BusinessCard from "./BusinessCard";
import { useParams } from "react-router-dom";

const BusinessListByZip = () => {
    const { zipCode } = useParams();
    console.log(zipCode)
    // Fetch businesses by zip code
    const{
        data:businesses,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBusinessesByZipQuery(zipCode);

    // Select filtered businesses by zip code
    //businesses = useSelector(state => selectBusinessesByZipCode(state)(zipCode));
    
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
               <h2 className="businessList-title">Businesses in {zipCode}</h2>
               <div className="businessList">{businessList}</div>
           </div>
       )
   }
   return content
};

export default BusinessListByZip;
