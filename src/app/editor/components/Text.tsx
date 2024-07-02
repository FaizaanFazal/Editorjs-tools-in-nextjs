import React from 'react';

interface TextProps {
  data: {
    text: string;
  };
  id: string;
  tunes: {
    textVariant: string;
  };
  type: 'paragraph';
}

export const Text = ({ data, id, tunes }: TextProps) => {
  return (
    <p
      className={`text-${tunes.textVariant}`}
      data-id={id}
      data-type="paragraph"
    >
      {data.text}
    </p>
  );
}