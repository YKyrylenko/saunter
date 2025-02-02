import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Path"],
  endpoints: () => ({}),
});
