import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, albumId) => {
          const tags = result.map(({ id }) => ({ type: 'Photo', id }));
          tags.push({ type: 'AlbumPhotos', id: albumId });
          return tags;
        },
        query: (albumId) => {
          return {
            url: '/photos',
            params: {
              albumId,
            },
            method: 'GET',
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, albumId) => {
          return [{ type: 'AlbumPhotos', id: albumId }];
        },
        query: (albumId) => {
          return {
            url: '/photos',
            body: {
              albumId,
              url: faker.image.abstract(150, 150, true),
            },
            method: 'POST',
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photoId) => {
          return [{ type: 'Photo', id: photoId }];
        },
        query: (photoId) => {
          return {
            url: `/photos/${photoId}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;
export { photosApi };
