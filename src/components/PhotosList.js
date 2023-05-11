import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import PhotosListItem from './PhotosListItem';

const PhotosList = ({ album }) => {
  const { data, isFetching, error } = useFetchPhotosQuery(album.id);
  const [addPhoto, result] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album.id);
  };

  if (isFetching) {
    return <Skeleton className="h-20 w-20"
                     times={2}/>;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

  const renderedPhotos = data.map(photo => {
    return <PhotosListItem key={photo.id}
                           photo={photo}/>;
  });

  return <div>
    <div className="m-2 flex flex-row items-center justify-between">
      <h3 className="text-lg">Photos in {album.title}</h3>
      <Button loading={result.loading}
              onClick={handleAddPhoto}> +Add Photo </Button>
    </div>

    <div className="flex flex-wrap">
      {data.length ? renderedPhotos : <span className="m-2">No photos yet...</span>}
    </div>
  </div>;
};

export default PhotosList;
