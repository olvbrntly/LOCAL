import './admin.css'
import { useNavigate } from 'react-router-dom';

const AdminHome = () =>{

    const navigate = useNavigate();

    const onClickViewAllBusinesses = () =>{
        navigate('/admin/businesses')
    }

    const onClickCreateNewBusiness = () =>{
        navigate('/admin/business/create')
    }

    return(
        <div classsName='admin-home'>
            <h2 className="admin-welcome">Welcome ~ USER ~ </h2>
            <div className="admin-home-btn">
                <button onClick={onClickViewAllBusinesses}>View All Businesses</button>
                <button onClick={onClickCreateNewBusiness}>Create a New Business</button>
                <button>View Profile</button>
            </div>
        </div>
    )
}

export default AdminHome;