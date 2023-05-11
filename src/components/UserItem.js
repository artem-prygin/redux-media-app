import { GoTrashcan } from 'react-icons/go';
import { removeUser } from '../store';
import Button from './Button';
import { useThunk } from '../hooks/useThunk';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

const UserItem = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);
  const handleRemoveUser = (e) => {
    e.stopPropagation();
    doRemoveUser(user.id);
  };

  const header = <>
    <Button onClick={handleRemoveUser}
            className="mr-3"
            loading={isLoading}> <GoTrashcan/> </Button> {error && 'Error deleting user'}
    <span className="font-bold text-lg">{user.name}</span>
  </>;

  return <ExpandablePanel header={header}
                          className={'border-2 border-lime-600'}> <AlbumsList user={user}/> </ExpandablePanel>;
};

export default UserItem;
