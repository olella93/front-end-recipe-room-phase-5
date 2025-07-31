import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchGroupsAPI,
  fetchGroupByIdAPI,
  fetchGroupRecipesAPI,
  joinGroupAPI,
  leaveGroupAPI,
  createGroupAPI,
  deleteGroupAPI
} from './groupsAPI';
export const deleteGroup = createAsyncThunk('groups/delete', async (groupId) => {
  return await deleteGroupAPI(groupId);
});
export const createGroup = createAsyncThunk('groups/create', async (data) => {
  return await createGroupAPI(data);
});

export const fetchGroups = createAsyncThunk('groups/fetchAll', async () => {
  return await fetchGroupsAPI();
});

export const fetchGroupById = createAsyncThunk('groups/fetchById', async (groupId) => {
  return await fetchGroupByIdAPI(groupId);
});

export const fetchGroupRecipes = createAsyncThunk('groups/fetchRecipes', async (groupId) => {
  return await fetchGroupRecipesAPI(groupId);
});

export const joinGroup = createAsyncThunk('groups/join', async (groupId) => {
  return await joinGroupAPI(groupId);
});

export const leaveGroup = createAsyncThunk('groups/leave', async (groupId) => {
  return await leaveGroupAPI(groupId);
});

const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    list: [],
    currentGroup: null,
    groupRecipes: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.currentGroup = action.payload;
      })
      .addCase(fetchGroupRecipes.fulfilled, (state, action) => {
        state.groupRecipes = action.payload.recipes || [];
      })
      .addCase(joinGroup.fulfilled, (state, action) => {
        if (state.currentGroup) {
          state.currentGroup.member_count += 1;
        }
      })
      .addCase(leaveGroup.fulfilled, (state, action) => {
        if (state.currentGroup) {
          state.currentGroup.member_count -= 1;
        }
      });
  }
});

export default groupsSlice.reducer;
