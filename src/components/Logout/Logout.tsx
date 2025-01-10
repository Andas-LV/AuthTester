import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/auth.slice';
import styles from './LogoutConfirmation.module.css';

interface LogoutConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
}

const LogoutConfirmation = ({ isOpen, onClose }: LogoutConfirmationProps) => {
    const router = useRouter();
    const dispatch = useDispatch();

    // Handle ESC key press
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
        onClose();
    };

    // Prevent click propagation from modal to overlay
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={handleModalClick}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Confirm Logout</h2>
                    <p className={styles.description}>
                        Are you sure you want to log out? You will need to log in again to access your account.
                    </p>
                </div>
                <div className={styles.footer}>
                    <button
                        className={`${styles.button} ${styles.cancelButton}`}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className={`${styles.button} ${styles.logoutButton}`}
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirmation;