import {store} from '../../app/store'
import { businessesSlice } from '../Business/businessSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () =>{
    useEffect(() =>{
        console.log('subscribing')
        const businesses = store.dispatch(businessesSlice.endpoints.getBusinesses.initiate()) //manual subscription

        return () =>{
            console.log('unsubscribing')
            businesses.unsubscribe()
        }
    },[])   

    return <Outlet />
}

export default Prefetch