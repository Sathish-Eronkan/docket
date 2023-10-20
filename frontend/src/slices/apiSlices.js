import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL});
console.log('baseQuery ',baseQuery);
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Supplier', 'PoNumber', 'Description', 'Docket'],
    endpoints: (builder) => ({})
})