import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';

const AlbumsList = ({ user }) => {
  const { data, isFetching, error } = useFetchAlbumsQuery(user.id);
  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = () => {
    addAlbum(user.id);
  };

  if (isFetching) {
    return <Skeleton className="h-10 w-full"
                     times={3}/>;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

  const renderedAlbums = data.map(album => {
    return <AlbumsListItem key={album.id}
                           album={album}/>;
  });

  return <div>
    <div className="m-2 flex flex-row items-center justify-between">
      <h3 className="text-lg">Albums for {user.name}</h3>
      <Button loading={results.isLoading}
              onClick={handleAddAlbum}>+ Add Album</Button></div>
    <div>{renderedAlbums}</div>
  </div>;
};

export default AlbumsList;
