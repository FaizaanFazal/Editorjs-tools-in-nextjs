'use client';
import React  from 'react';
import dynamic from "next/dynamic";

const CustomEditor = dynamic(() => import('@/components/editor'), { ssr: false });

const Editor = () => {

    return (
       <> <CustomEditor/> </>
    )
}

export default Editor;