import React from 'react';


interface ChecklistProps {
    classes?: string;
    message: string;
    parsedHtml:any
}


export const AlertComponent: React.FC<ChecklistProps> = ({ classes,parsedHtml, message }) => {
    console.log(message)


    return (
        <>
            <div className={`${classes}`}>{parsedHtml}</div>
        </>
    );
};