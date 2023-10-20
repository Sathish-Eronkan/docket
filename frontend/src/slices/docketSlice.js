import { apiSlice } from "./apiSlices";
import { NEW_DOCKET_URL } from "../constants";

export const docketApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (data) => ({
                url: NEW_DOCKET_URL,
                method: 'POST',
                body: data
            }),
        })
    }),
})

export const { useCreateMutation } = docketApiSlice; 