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
        }),
        getBusinessesByZip: builder.query({
            query: (zipCode) => `/business/zipcode/${zipCode}`,
            validateStatus:(response, result) =>{
                return response.status === 200 && !result.isError
            },
            transformResponse:responseData =>{
                const loadedBusinesses = responseData.map(business =>{
                    business.id = business._id
                    return business
                });
                return businessesAdapters.setAll(initialState, loadedBusinesses)
            }
            //help add any necessary transformations or validations here
        }),
        addBusiness:builder.mutation({
            query:initialBusiness => ({
                url:'/business',
                method:'POST',
                body:{
                    ...initialBusiness
                }
            }),
            invalidatesTags:[{type: 'Business', id:'LIST'}]
        }),
        updateBusiness:builder.mutation({
            query:initialBusiness =>({
                url:'/business',
                method:'PATCH',
                body:{
                    ...initialBusiness,
                }
            }),
            invalidatesTags:(result,error,arg) =>[
                {type:'Business', id:arg.id}
            ]
        }),
        deleteBusiness:builder.mutation({
            query:({id}) =>({
                url:'/business',
                method:'DELETE',
                body:{id}
            }),
            invalidatesTags:(result, error, arg) =>[
                {type:'Business', id:arg.id}
            ]
        })
    })
});

export const {
    useGetBusinessesQuery,
    useAddBusinessMutation,
    useUpdateBusinessMutation,
    useDeleteBusinessMutation,
    useGetBusinessesByZipQuery,
} = businessesSlice;

//return query for entire result object
export const selectBusinessesResult = businessesSlice.endpoints.getBusinesses.select();

const selectBusinessesData = createSelector(
    selectBusinessesResult,
    businessesResult => businessesResult.data // normalized state object with ids and entities
)

export const selectBusinessesByZipCode = createSelector(
    selectBusinessesData,
    (businessesData) => (zipCode) => {
        return businessesData.filter((business) => business.zipCode === zipCode);
    }
);


export const {
    selectAll:selectAllBusinesses,
    selectIds: selectBusinessIds,
    selectById:selectBusinessById,

} = businessesAdapters.getSelectors(state => selectBusinessesData(state) ?? initialState)

export default businessesSlice.reducer