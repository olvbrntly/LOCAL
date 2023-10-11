import {
    createSlector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const businessAdapters = createEntityAdapter({
    sortComparer:(a,b) => b.date.localeCompare(a.date)
});

const initialState = businessAdapters.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints:builder =>({
        getBusinesses:builder.query({
            query: () => 'businesses',
            transformResponse:responseData =>{
                const loadedBusinesses = responseData.map(business =>{
                    return business
                });
                return businessAdapters.setAll(initialState, loadedBusinesses)
            }
        })
    })
});

export const {
    useGetBusinessesQuery
} = extendedApiSlice;

