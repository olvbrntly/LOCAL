import { useGetBusinessesQuery } from "./businessSlice";
import BusinessCard from "./BusinessCard";

const AdminBusinessList = () =>{
    const{
        data:businesses,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBusinessesQuery();

    const onClicked = () =>{
        console.log('clicked create new business')
    }

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
            <div>
                <button onClick={onClicked}>Create a New Business</button>
                <div className="businessList">{businessList}</div>
            </div>
        )
    }
   
   

    return content
}

export default AdminBusinessList;