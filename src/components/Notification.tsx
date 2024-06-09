"use client"

import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const Notification = () => {
    const [showNotification, setShowNotification] = useState(true);

    const toggleNotification = () => {
        setShowNotification(!showNotification);
    };

    return (
        showNotification && (
            <div className='h-12 bg-orange-500 flex items-center'>
                <button onClick={toggleNotification} className='ml-4' title="Go back">
                    <IoIosArrowBack size={24} color="white" />
                </button>
            </div>
        )
    );
}

export default Notification;
