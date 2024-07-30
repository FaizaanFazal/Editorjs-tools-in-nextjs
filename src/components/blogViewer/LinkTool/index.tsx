"use server";
import { fetchUrl } from "@/lib/serverActions/fetchUrl";
import React from "react";

interface LinkToolMeta {
  title: string;
  description: string;
  url: string;
  image: {
    url: string;
  };
}

interface LinkToolProps {
  url: string;
  classes?: string;
}

interface MetaProps {
  title: string;
  description?: string;
  image?: string;
  url:string
}
export const LinkTool: React.FC<LinkToolProps> = async ({ url="", classes }) => {
  const meta= await fetchUrl(url) as MetaProps

  const extractDomain = (urlPassed:string) => {
    const match = urlPassed.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i);
    return match ? match[1] : null;
};

  return (
    <div className={classes}>
      <div className="flex justify-between items-center p-6 shadow-md gap-6">
        <div className="flex-1 gap-2 flex flex-col justify-center">
          <h2 className="text-[17px] font-bold text-gray-800 dark:text-white">{meta?.title}</h2>
          <p className="text-[15px] md:text-xl text-gray-600 dark:text-white">{meta?.description}</p>
          <a
            className="text-lg md:text-xl dark:text-blue-400 text-[#8888] hover:text-blue-700 hover:underline underline-offset-4 w-fit"
            target="_blank"
            href={url}
            rel="noreferrer"
          >
            {extractDomain(url)}
          </a>
        </div>
        <div className="max-w-xs w-32 h-32 shrink-0 overflow-hidden border border-gray-200 rounded-lg">
          <img
            src={meta?.image }
            loading="lazy"
            className="w-full h-full object-cover object-center"
            alt={meta?.title}
          />
        </div>
      </div>
    </div>
  );
};
