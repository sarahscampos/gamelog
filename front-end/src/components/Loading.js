import React from 'react';

const Loading = () => {
    return(
        <div className='flex justify-center items-center h-screen'>
            <div className='animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-b-transparent border-indigo-500 border-opacity-90'></div>
        </div>
    );
};
export default Loading;