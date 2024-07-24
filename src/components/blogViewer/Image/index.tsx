import React from "react";

interface ImageFile {
  url: string;
}

interface ImageProps {
  file: ImageFile;
  caption?: string;
  classes?: string;
}

export const Image: React.FC<ImageProps> = ({ file, caption, classes }) => {
  return (
    <div className={classes}>
      <img src={file.url} loading="lazy" alt={caption} />
      {caption && (
        <p className="mt-1 text-lg md:text-xl text-gray-500 dark:text-gray-300">
          {caption}
        </p>
      )}
    </div>
  );
};
