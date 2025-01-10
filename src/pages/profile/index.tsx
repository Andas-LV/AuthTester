import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchUser, updateUserAvatar } from '@/store/slices/user.slice';
import { Pen, LogOut } from 'lucide-react';
import Loading from '@/components/Loading/Loading'
import styles from './page.module.css';
import LogoutConfirmation from "@/components/Logout/Logout";
import {translateRole} from '@/utils/TranslateRole'

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: user, loading, error } = useSelector((state: RootState) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            dispatch(updateUserAvatar(file));
        }
    };

    if (error) {
        return (
            <div className={styles.error}>
                <div>Error: {error}</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {loading && <Loading />}

            <div className={styles.card}>
                <div className={styles.content}>
                    <div className={styles.avatarContainer}>
                        <div className={styles.avatarWrapper}>
                            <Image
                                src={user?.avatarUrl || '/user.png'}
                                className={styles.avatar}
                                fill
                                sizes="160px"
                                alt="User Avatar"
                                priority
                            />
                        </div>
                        <label
                            htmlFor="avatarInput"
                            className={styles.avatarButton}
                        >
                            <Pen className={styles.penIcon} />
                            <input
                                type="file"
                                id="avatarInput"
                                className={styles.fileInput}
                                onChange={handleAvatarChange}
                                accept="image/*"
                            />
                        </label>
                    </div>

                    <div className={styles.userInfo}>
                        <h1 className={styles.username}>
                            {user?.username || 'Username'}
                        </h1>
                        <div className={styles.details}>
                            <p className={styles.detail}>
                                <span className={styles.label}>Phone:</span>
                                <span>{user?.phone || 'Not provided'}</span>
                            </p>
                            <p className={styles.detail}>
                                <span className={styles.label}>Role:</span>
                                <span>{user?.role ? translateRole(user.role) : 'Unknown'}</span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.logout} onClick={openModal}>
                        <p>Log out</p>
                        <LogOut className={styles.logoutIcon}/>

                        <LogoutConfirmation isOpen={isModalOpen} onClose={closeModal}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;