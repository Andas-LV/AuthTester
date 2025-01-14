import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserMe, uploadAvatar, updateUserMe } from '@/service/user.service';
import { type User} from '@/types/User';

interface UserState {
    data: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    data: null,
    loading: false,
    error: null,
};


export const fetchUser = createAsyncThunk('user/fetch', getUserMe);

export const updateUser = createAsyncThunk('user/update',
    async (body: Partial<User>, { getState }) => {
        await updateUserMe(body);
        const currentUser = (getState() as { user: UserState }).user.data;

        return {
            ...(currentUser || {}),
            ...body,
        };
    }
);

export const updateUserAvatar = createAsyncThunk('user/updateAvatar',
    async (avatarFile: File, { getState }) => {
        const response = await uploadAvatar(avatarFile);
        return {
            ...((getState() as { user: UserState }).user.data || {}),
            avatarUrl: response.avatarUrl,
        };
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // USER ME
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user';
            })
            // EDIT USER
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                if (state.data) {
                    state.data = {
                        ...state.data,
                        ...action.payload,
                    };
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update user';
            })
            // EDIT PROFILE AVATAR
            .addCase(updateUserAvatar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.loading = false;
                if (state.data) {
                    state.data.avatarUrl = action.payload?.avatarUrl;
                }
            })
            .addCase(updateUserAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update avatar';
            });
    },
});

export default userSlice.reducer;