import React from "react";

interface EmbedProps {
  service: string;
  source?: string;
  embed: string;
  width?: string;
  height?: string;
  caption?: string;
  classes?: string;
}

export const Embed: React.FC<EmbedProps> = ({ service, source, embed, width, height, caption, classes }) => {
  const renderEmbed = () => {
    let classNames =' mx-auto ';
    console.log(width,height,"width height")
    
    if (service === 'youtube') {
      return (
        <>
          <div className={`${classes} embed-responsive embed-responsive-16by9`}>
            <iframe 
              className={`${classNames} embed-responsive-item`} 
              src={embed} 
              width={width} 
              height={height} 
              allowFullScreen>
            </iframe> 
          {caption && <div className="caption text-center">{caption}</div>}
          </div>
        </>
      );
    } else if (service === 'instagram') {
      let postId = '';
      let type = '';
      if (source) {
        const parts = source.split('/');
        const index = parts.indexOf('www.instagram.com');
        type = parts[index + 1];
        postId = parts[index + 2];
      }

      return (
        <>
          <iframe 
            className="mx-auto instagram-media instagram-media-rendered" 
            src={`https://www.instagram.com/${type}/${postId}/embed/captioned/?cr=1&v=14&wp=810&rd=https%3A%2F%2Fbehold.so&rp=%2Fguides%2Fhow-to-embed-an-instagram-feed-on-your-website%2F#%7B%22ci%22%3A0%2C%22os%22%3A423.1000003814697%2C%22ls%22%3A407.7000002861023%2C%22le%22%3A412.30000019073486%7D`} 
            allowTransparency={true} 
            allowFullScreen={true} 
            frameBorder="0" 
            height="947" 
            scrolling="no" 
            style={{ background: 'white', maxWidth: '540px', width: 'calc(100% - 2px)', borderRadius: '3px', border: '1px solid rgb(219, 219, 219)', boxShadow: 'none', display: 'block', minWidth: '326px', padding: '0px' }}>
          </iframe>
          {caption && <div className="caption text-center">{caption}</div>}
        </>
      );
    } else if (service === 'pinterest') {
      return (
        <>
          <div className="">
            <iframe 
              scrolling="yes" 
              frameBorder="no" 
              allowTransparency={true} 
              allowFullScreen={true} 
              style={{ width: '100%', minHeight: '700px', maxHeight: '1000px' }} 
              src={embed} 
              className="embed-tool__content">
            </iframe>
            {caption && <div className="caption text-center">{caption}</div>}
          </div>
        </>
      );
    }

    return null;
  };

  return <>{renderEmbed()}</>;
};

export default Embed;
