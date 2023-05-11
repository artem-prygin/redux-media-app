import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const removeUser = createAsyncThunk('users/remove', async (id) => {
  await axios.delete(`http://localhost:3005/users/${id}`);
  return id;
});

export { removeUser };
