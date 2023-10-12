import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const businessesAdapters = createEntityAdapter({});

const initialState = businessesAdapters.getInitialState();

export const businessesSlice = apiSlice.injectEndpoints({
    endpoints:builder =>({
        getBusinesses:builder.query({
            query: () => '/business',
            validateStatus:(response, result) =>{
                return response.status === 200 && !result.isError
            },
            transformResponse:responseData =>{
                const loadedBusinesses = responseData.map(business =>{
                    business.id = business._id
                    return business
                });
                return businessesAdapters.setAll(initialState, loadedBusinesses)
            },
            providesTags:(result,error,arg) =>{
                if(result?.ids) {
                    return [
                        {type:'Business', id:'LIST'},
                        ...result.ids.map(id =>({type:'Business',id}))
                    ]
                } else return [{type:'Business', id:'LIST'}]
            }
        })
    })
});

export const {
    useGetBusinessesQuery
} = businessesSlice;

//return query for entire result object
export const selectBusinessesResult = businessesSlice.endpoints.getBusinesses.select();

const selectBusinessesData = createSelector(
    selectBusinessesResult,
    businessesResult => businessesResult.data // normalized state object with ids and entities
)

export const {
    selectAll:selectAllBusinesses,
    selectIds: selectBusinessIds,
    selectById:selectBusinessById,
} = businessesAdapters.getSelectors(state => selectBusinessesData(state) ?? initialState)

export default businessesSlice.reducer