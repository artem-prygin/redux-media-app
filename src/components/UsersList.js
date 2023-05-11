import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import { useThunk } from '../hooks/useThunk';
import UserItem from './UserItem';

const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
  const { data } = useSelector(({ users }) => users);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleAddUser = () => {
    doCreateUser();
  };

  let loadingOrErrorContent;
  if (isLoadingUsers) {
    loadingOrErrorContent = <Skeleton className="h-10 w-full"
                                      times={6}/>;
  }

  if (loadingUsersError) {
    loadingOrErrorContent = <div>Error fetching data...</div>;
  }

  const renderedUsers = data.map(user => {
    return <UserItem key={user.id}
                     user={user}/>;
  });

  return <div>
    <div className="flex flex-row justify-between items-center m-3">
      <h1 className="m2 text-xl">Users</h1>
      {creatingUserError && 'Something went wrong'} <Button loading={isCreatingUser}
                                                            onClick={handleAddUser}>+ Add User</Button>
    </div>
    {loadingOrErrorContent || (renderedUsers.length && renderedUsers) || <div className="p-2">No Users Found</div>}
  </div>;
};

export default UsersList;
