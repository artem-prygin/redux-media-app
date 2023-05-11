import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, userId) => {
          const tags = result.map(({ id }) => ({ type: 'Album', id }));
          tags.push({ type: 'UserAlbums', id: userId });
          return tags;
        },
        query: (userId) => {
          return {
            url: '/albums',
            params: {
              userId,
            },
            method: 'GET',
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, userId) => {
          return [{ type: 'UserAlbums', id: userId }];
        },
        query: (userId) => {
          return {
            url: '/albums',
            body: {
              userId,
              title: faker.commerce.productName(),
            },
            method: 'POST',
          };
        },
      }),
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, albumId) => {
          return [{ type: 'Album', id: albumId }];
        },
        query: (albumId) => {
          return {
            url: `/albums/${albumId}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };
