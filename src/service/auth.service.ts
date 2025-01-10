import axiosInstance from '@/libs/axiosInstance';
import { Register, Login } from '@/types/User';

export async function register(body: Register) {
    const { data } = await axiosInstance.post('/auth/register/', body);
    localStorage.setItem('token', data.token);
    return data;
}

export async function login(body: Login) {
    const { data } = await axiosInstance.post('/auth/login/', body);
    localStorage.setItem('token', data.token);
    return data;
}

export function logout() {
    localStorage.removeItem('token');
}
