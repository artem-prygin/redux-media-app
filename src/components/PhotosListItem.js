import { GoTrashcan } from 'react-icons/go';
import { useRemovePhotoMutation } from '../store';

const PhotosListItem = ({ photo }) => {
  const [removePhoto] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo.id);
  };

  return <div onClick={handleRemovePhoto}
              className="m-1 relative cursor-pointer">
    <img className="h-20 w-20"
         src={photo.url}
         alt="random"/>
    <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 hover:opacity-80 opacity-0">
      <GoTrashcan className="text-3xl"/>
    </div>
  </div>;
};

export default PhotosListItem;
