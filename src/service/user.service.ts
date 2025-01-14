import axiosInstance from '@/libs/axiosInstance';
import { type User } from '@/types/User';

export async function getUserMe(): Promise<User> {
    const { data } = await axiosInstance.get('/user/me/');
    return data;
}

export async function updateUserMe(body: Partial<User>): Promise<User> {
    const { data } = await axiosInstance.patch('/user/me/update/', body);
    return data;
}

export async function uploadAvatar(avatarFile: File) {
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    const { data } = await axiosInstance.patch('/user/me/avatar/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
}
