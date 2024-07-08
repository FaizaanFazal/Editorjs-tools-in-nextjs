'use client';
import React from 'react';
import dynamic from "next/dynamic";

const CustomEditor = dynamic(() => import('@/components/editor'), { ssr: false });

const Editor = () => {

    return (
        <>
            <div className='text-center text-indigo-500'>
                Can click toggle button to change theme of box , editor and viewer both
            </div>
            <CustomEditor />
        </>
    )
}

export default Editor;