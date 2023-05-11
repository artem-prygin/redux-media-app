import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import { GoTrashcan } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import PhotosList from './PhotosList';

const AlbumsListItem = ({ album }) => {
  const [removeAlbum, result] = useRemoveAlbumMutation();

  const handleRemoveAlbum = () => {
    removeAlbum(album.id);
  };

  const header = <>
    <Button loading={result.isLoading}
            className="mr-2"
            onClick={handleRemoveAlbum}><GoTrashcan/></Button> {album.title}
  </>;
  return <ExpandablePanel key={album.id}
                          className="m-3"
                          header={header}> <PhotosList album={album}/> </ExpandablePanel>;
};

export default AlbumsListItem;
