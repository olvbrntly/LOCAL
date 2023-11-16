import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectBusinessById } from '../Business/businessSlice'
import EditBusinessForm from './EditBusinessForm'

const EditBusiness = () => {

    const { id } = useParams()

    const business = useSelector(state => selectBusinessById(state, id))

    const content = business ? <EditBusinessForm business={business}  /> : <p>Loading...</p>

    return content
}
export default EditBusiness