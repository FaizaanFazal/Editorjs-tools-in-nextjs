import React, { useEffect, useState } from 'react';

interface RawHtmlProps {
    html: string;
    className?: string;
}


interface InstagramEmbedProps {
    type: string;
    postId: string;
}
const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ type, postId }) => {
    const src = `https://www.instagram.com/${type}/${postId}/embed/captioned/?cr=1&v=14&wp=810&rd=https%3A%2F%2Fbehold.so&rp=%2Fguides%2Fhow-to-embed-an-instagram-feed-on-your-website%2F#%7B%22ci%22%3A0%2C%22os%22%3A423.1000003814697%2C%22ls%22%3A407.7000002861023%2C%22le%22%3A412.30000019073486%7D`;
    return (
        <iframe
            className="mx-auto instagram-media instagram-media-rendered"
            id="instagram-embed-0"
            src={src}
            allowTransparency={true}
            allowFullScreen={true}
            frameBorder="0"
            height="947"
            data-instgrm-payload-id="instagram-media-payload-0"
            scrolling="no"
            style={{
                background: 'white',
                maxWidth: '540px',
                width: 'calc(100% - 2px)',
                borderRadius: '3px',
                border: '1px solid rgb(219, 219, 219)',
                boxShadow: 'none',
                display: 'block',
                minWidth: '326px',
                padding: '0px',
            }}
        />
    );
};

interface SafeHtmlProps {
    html: string;
}

const SafeHtml: React.FC<SafeHtmlProps> = ({ html }) => {
    const createMarkup = () => {
        return { __html: html };
    };

    return <div dangerouslySetInnerHTML={createMarkup()} />;
};

const RawHtml: React.FC<RawHtmlProps> = ({ html, className }) => {

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const blockquote = doc.querySelector('blockquote.instagram-media');

    if (blockquote) {
        const permalink = blockquote.getAttribute('data-instgrm-permalink');
        let postId = '';
        let type = '';
        if (permalink) {
            const parts = permalink.split('/');
            const index = parts.indexOf('www.instagram.com');
            type = parts[index + 1];
            postId = parts[index + 2];
        }
        return <InstagramEmbed type={type} postId={postId} />;

    } else {
        return <SafeHtml html={html} />;
    }
};

export default RawHtml;
