import { apiSlice } from "./apiSlices";
import { SUPPLIER_URL, DOCKETS_URL, PRODUCTS_URL, DESCRIPTION_URL } from "../constants";
export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSuppliers: builder.query({
            query: () => ({
                url: '/api/supplier',
            }),
            keepUnusedDataFor: 5,
        }),
        getProducts: builder.query({
            query: (supplierName) => ({
                url: `${PRODUCTS_URL}?supplier=${supplierName}`,
            }),
            keepUnusedDataFor: 5
        }),
        getDescriptions: builder.query({
            query: (poNumber) => ({
                url: `${DESCRIPTION_URL}?poNumber=${poNumber}`,
            }),
            keepUnusedDataFor: 5,
        }),
        getDockets: builder.query({
            query: () => ({
                url: DOCKETS_URL,
            }),
            keepUnusedDataFor: 5,
        })
    }),
})

export const {useGetProductsQuery, useGetSuppliersQuery, useGetDescriptionsQuery, useGetDocketsQuery} = productApiSlice; 