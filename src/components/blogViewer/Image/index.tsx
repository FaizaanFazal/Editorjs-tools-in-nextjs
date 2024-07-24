import React from "react";


interface ImageProps {
  src: string;
  caption?: string;
  alt?: string;
  withBackground?: boolean;
  withBorder?: boolean;
  stretched?: boolean;
  classes?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  withBackground,
  stretched,
  withBorder,
  caption,
  classes }) => {

    const containerClasses = `
    ${withBackground ? 'bg-gray-100 dark:bg-gray-700' : ''}
    ${stretched ? 'w-full h-auto' : 'max-w-full'}
    ${withBorder ? 'border-2 border-gray-300 dark:border-gray-600' : ''}
    ${classes}
  `;
  return (
    <div className={`${classes}`}>
      <img src={src} loading="lazy" alt={alt}  className={`${containerClasses.trim()}`}/>
      {caption && (
        <p className="mt-1 text-lg md:text-xl text-gray-500 dark:text-gray-300">
          {caption}
        </p>
      )}
    </div>
  );
};
