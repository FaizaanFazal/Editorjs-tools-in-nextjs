import React from "react";

interface EmbedProps {
  embed: string;
  caption?: string;
  classes?: string;
}

export const Embed: React.FC<EmbedProps> = ({ embed, caption, classes }) => {
  return (
    <div className={classes}>
      <div dangerouslySetInnerHTML={{ __html: embed }} />
      {caption && (
        <p className="mt-1 text-lg md:text-xl text-gray-500 dark:text-gray-300">
          {caption}
        </p>
      )}
    </div>
  );
};
