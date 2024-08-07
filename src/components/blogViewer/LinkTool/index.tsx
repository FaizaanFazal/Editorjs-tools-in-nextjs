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
    <div className={`${classes} lg:max-w-[70%]  mx-auto`}>
      <a
      target="_blank"
      href={url}
      rel="noreferrer"
      className="flex justify-between items-start p-6 shadow-md border-[1px] border-slate-400/30 rounded-sm gap-4">
        <div className="flex-1 gap-2 flex flex-col justify-center">
          <h2 className="text-[17px] font-bold text-gray-800 dark:text-white">{meta?.title}</h2>
          <p className="text-[15px] md:text-xl text-gray-600 dark:text-white">{meta?.description}</p>
          <div
            className="text-lg md:text-xl dark:text-blue-400 text-[#8888] hover:text-blue-700 hover:underline underline-offset-4 w-fit">
            {extractDomain(url)}
          </div>
        </div>
        <div className="max-w-xs w-16 h-16 shrink-0 overflow-hidden border border-gray-200 rounded-lg">
          <img
            src={meta?.image }
            loading="lazy"
            className="w-full h-full object-cover object-center"
            alt={meta?.title}
          />
        </div>
      </a>
    </div>
  );
};
