import React from 'react';
import { Loader } from 'lucide-react';
import styles from './FullPageLoader.module.css';

const Loading = () => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}>
                <Loader size={48} color="white" />
            </div>
        </div>
    );
};

export default Loading;
