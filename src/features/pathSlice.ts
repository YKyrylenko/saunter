import { firestoreApi } from "../app/firestoreApi";
import { Path } from "../pages/Main/components/PathList/types";
import { firestore } from "../configuration";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

export const pathSlice = firestoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaths: builder.query<Path[], string>({
      async queryFn(searchTerm) {
        try {
          const ref = collection(firestore, "path");
          const querySnapshot = await getDocs(
            query(
              ref,
              where("title", ">=", searchTerm),
              where("title", "<=", searchTerm + "\uf8ff"),
              orderBy("isFavorite", "desc")
            )
          );
          let paths: Path[] = [];
          querySnapshot?.forEach((doc) => {
            paths.push({ id: doc.id, ...doc.data() } as Path);
          });
          return { data: paths };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ["Path"],
    }),

    addPath: builder.mutation({
      async queryFn(path) {
        try {
          const result = await addDoc(collection(firestore, "path"), {
            ...path,
            isFavorite: false,
          });

          return { data: result.id };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Path"],
    }),

    addToFavorite: builder.mutation({
      async queryFn(id: string) {
        try {
          const pathRef = doc(firestore, "path", id);
          await updateDoc(pathRef, {
            isFavorite: true,
          });
          return { data: null };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Path"],
    }),

    deletePath: builder.mutation({
      async queryFn(id: string) {
        try {
          const pathRef = doc(firestore, "path", id);
          await deleteDoc(pathRef);
          return { data: null };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Path"],
    }),
  }),
});

export const {
  useGetPathsQuery,
  useAddPathMutation,
  useAddToFavoriteMutation,
  useDeletePathMutation,
} = pathSlice;
