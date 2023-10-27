import { useGetBusinessesQuery } from "../Business/businessSlice";
import AdminBusinessCard from "./AdminBusinessCard";


const AdminBusinessList = () =>{


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
         const businessList = ids?.length ? ids.map(id => <AdminBusinessCard key={id} businessId={id}/>) : null

         content = (
            <div>
                <p>Sort drop down menu</p>
                <div className="businessList">{businessList}</div>
            </div>
        )
    }
   
   

    return content
}

export default AdminBusinessList;