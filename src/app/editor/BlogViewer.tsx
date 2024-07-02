import * as DOMPurify from "isomorphic-dompurify";
import { parse } from 'node-html-parser';
import React from "react";
import MermaidChart from "./components/Mermaid";
const anchorTargetRegex = /(?<=target=").*?(?=")/g;
const anchorRelRegex = /(?<=rel=").*?(?=")/g;

const BlogViewer = ({content} : {content: any}) => {
  const addPropertiesToAnchorTags = (
    htmlString: string,
    targetForAnchorTags: [],
    relForAnchorTags: [],
    className?: string
  ) => {
    const doc = parse(htmlString);
    const anchors = doc.querySelectorAll("a");

    anchors.forEach((anchor, index) => {
      const target = targetForAnchorTags
        ? targetForAnchorTags[index]
          ? targetForAnchorTags[index]
          : "_blank"
        : "_blank";
      const rel = relForAnchorTags
        ? relForAnchorTags[index]
          ? relForAnchorTags[index]
          : "noopener noreferrer"
        : "noopener noreferrer";
      anchor.setAttribute("target", target);
      anchor.setAttribute("rel", rel);
      (className ? className : "font-medium text-[#db9035] underline dark:text-blue-500 hover:no-underline").split(" ").forEach((c: string) => anchor.classList.add(c));
    });

    return doc.innerHTML;
  };

  const getElementTag = (type: string, level: number) => {
    if (type === "paragraph") {
      return "p";
    } else if (type === "header") {
      return `h${level}`;
    } else if (type === "quote") {
      return "blockquote";
    } else if (type === "warning") {
      return "div";
    } else if (type === "delimmiter") {
      return "div";
    } else if (type === "unordered") {
      return "ul";
    } else if (type === "unorderedNoBullet") {
      return "ul";
    } else if (type === "ordered") {
      return "ol";
    } else if (type === "checklist") {
      return "ul";
    } else if (type === "linkTool") {
      return "div";
    } else if (type === "table") {
      return "div";
    } else if (type === "AnyButton") {
      return "div";
    }
    return "div";
  };

  const getTunesTextVariant = (tunesTextVariant: string) => {
    switch (tunesTextVariant) {
    case "details":
      return "text-sm text-gray-600 italic";
    case "call-out":
      return "text-lg font-semibold text-blue-600 bg-blue-100 p-3 border-l-4 border-blue-500";
    case "citation":
      return "text-xs text-gray-500";
    default:
      return "";
    }
  };

  const getTailwindClasses = (
    type: string,
    level: number,
    alignment: string | undefined | null,
    alertType: string | undefined | null
  ) => {
    if (type === "paragraph") {
      return `font-normal leading-[28px] md:leading-[32px] tracking-[-.003em] break-words text-lg md:text-xl ${alignment === "right"
        ? "text-right"
        : alignment === "center"
          ? "text-center"
          : alignment === "justify" ? "text-justify"
            :"text-left"}`;
    } else if (type === "header") {
      const fontSize =
        level === 1
          ? "text-[44px]"
          : level === 2
            ? "text-3xl"
            : level === 3
              ? "text-2xl"
              : level === 4
                ? "text-xl"
                : level === 5
                  ? "text-lg"
                  : "text-base";
      return `${fontSize} font-semibold text-gray-900 text-white pt-8 tracking-[-.003em] break-words ${
        alignment === "right"
          ? "text-right"
          : alignment === "center"
            ? "text-center"
            : alignment === "justify" ? "text-justify"
              :"text-left"
      }`;
    } else if (type === "quote") {
      return `text-lg lg:text-xl italic font-semibold p-4 my-4 border-s-4 border-gray-500 bg-gray-800 text-gray-900 text-white flex flex-col ${
        alignment === "right"
          ? "items-end"
          : alignment === "center"
            ? "items-center"
            : "items-start"
      }`;
    } else if (type === "warning") {
      return "p-4 mb-4 text-md text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300";
    } else if (type === "delimiter") {
      return "text-base text-center p-12";
    } else if (type === "alert") {
      const colorClass = {
        primary:
          "text-blue-800 bg-blue-50 border border-blue-300 dark:bg-blue-800 dark:text-blue-200 dark:border-blue-700",
        secondary:
          "text-gray-800 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600",
        info: "text-blue-700 bg-blue-100 border border-blue-400 dark:bg-blue-700 dark:text-blue-300 dark:border-blue-600",
        success:
          "text-green-800 bg-green-50 border border-green-300 dark:bg-green-800 dark:text-green-200 dark:border-green-700",
        warning:
          "text-yellow-800 bg-yellow-50 border border-yellow-300 dark:bg-yellow-800 dark:text-yellow-200 dark:border-yellow-700",
        danger:
          "text-red-800 bg-red-50 border border-red-300 dark:bg-red-800 dark:text-red-200 dark:border-red-700",
        light:
          "text-gray-800 bg-gray-50 border border-gray-200 dark:bg-white dark:text-gray-800 dark:border-gray-400",
        dark: "text-white bg-gray-800 border border-gray-700 dark:bg-black dark:text-gray-300 dark:border-gray-900",
      }[alertType?.toLowerCase() || "primary"];

      // Define the alignment
      const alignmentClass = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify"
      }[alignment || "left"];
      return `${colorClass} ${alignmentClass} p-4 my-4 text-md rounded-lg`;
    } else if (type === "unordered") {
      return "py-2 space-y-1 text-gray-500 list-disc list-outside dark:text-gray-400 ps-5 mt-2 text-lg md:text-xl";
    } else if (type === "unorderedNoBullet") {
      return "py-2 space-y-1 text-gray-500 list-none list-outside dark:text-gray-400 ps-5 mt-2 text-lg md:text-xl";
    } else if (type === "ordered") {
      return "ps-5 mt-2 space-y-1 list-decimal list-outside text-lg md:text-xl";
    } else if (type === "checklist") {
      return "my-4 text-lg md:text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white";
    } else if (type === "linkTool") {
      return "max-w-[45rem] mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden text-lg md:text-xl";
    } else if (type === "table") {
      return "";
    } else if (type === 'AnyButton') {
      return "flex items-center justify-center"
    } else if (type === 'image') {
      return "flex !py-0 items-center justify-center"
    } else if (type === 'twoColumns') {
      return "text-lg md:text-xl flex flex-col lg:flex-row border-red gap-4 py-4"
    }
    return "text-lg md:text-xl";
  };

  const mapContentBlocks = (blocks: any[]) => {
    return blocks?.map((block: any) => {
      const targetForAnchorTags = block?.data?.text?.match(anchorTargetRegex);
      const relForAnchorTags = block?.data?.text?.match(anchorRelRegex);
      let sanitzedHtml = DOMPurify.sanitize(block?.data?.text);

      if (block?.type === "quote") {
        sanitzedHtml = `<svg class="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                          </svg><div>${sanitzedHtml}</div><div class="text-base mt-4"><cite class="pe-3 font-medium text-white">${block?.data?.caption}</cite></div>`;
      } else if (block?.type === "warning") {
        sanitzedHtml = DOMPurify.sanitize(
          `<span class="font-medium">${block?.data?.title}!</span> ${block?.data?.message}`
        );
      } else if (block?.type === "delimiter") {
        sanitzedHtml = `<img alt="me" loading="lazy" width="210" height="28" decoding="async" data-nimg="1" class="mx-auto" src="/images/delimiter.svg" style="color: transparent;">`
      } else if (block?.type === "alert") {
        sanitzedHtml = DOMPurify.sanitize(block?.data?.message);
      } else if (block?.type === "list") {
        sanitzedHtml = block?.data?.items
          ?.map((i: string) => `<li class="text-lg md:text-xl text-white">${i}</li>`)
          .join("");
      } else if (block?.type === "checklist") {
        sanitzedHtml = block?.data?.items
          ?.map(
            (i: {
              checked: boolean;
              text: string;
            }) => `<li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center ps-3">
                          <input id="${i.text}" checked="${i.checked}" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                          <label for="${i.text}" class="w-full py-3 ms-2 text-lg md:text-xl font-medium text-gray-900 dark:text-gray-300">${i.text}</label>
                      </div>
                  </li>`
          )
          .join("");
      } else if (block?.type === "linkTool") {
        sanitzedHtml = `
          <div class="flex justify-between items-center p-6 shadow-md gap-6">
            <div class="flex-1 gap-2 flex flex-col text-slate-900">
              <p class="text-lg font-bold">${block?.data?.meta?.title}</p>
              <p class="text-base font-medium leading-6">${block?.data?.meta?.description || "No Description"}</p>
              <a href="${block?.data?.link}" class="mt-3 font-medium  text-slate-500 hover:underline" target="_blank" rel="noopener noreferrer">${block?.data?.link}</a>
            </div>
            <div class="flex self-start">
              <img alt="LinkedIn Logo" width="48" height="48" decoding="async" data-nimg="1" style="color:transparent" src="${block?.data?.meta?.image?.url}">
            </div>
          </div>`;
      } else if (block?.type === "mermaid") {
        return <MermaidChart chart={block?.data?.code} caption={block?.data?.caption} key={block.id} />;
      } else if (block?.type === "table") {
        const headData = block?.data?.content[0];

        sanitzedHtml = `<table class="w-full max-w-[45rem] rounded-lg mx-auto border border-gray-200 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="flex w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr class="flex w-full">
                  ${headData?.map((c: string) => `<th scope="col" class="px-6 py-3 flex flex-1">${c}</th>`).join("")}
                </tr>
            </thead>
            <tbody class='flex flex-col w-full'>
              ${block?.data?.content.map((c: string[], index: number) => {
    if (index) {
      return `
                    <tr key="${index}" class="flex bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      ${c?.map((r) => `<td class="px-6 py-4 flex flex-1">${r}</td>`).join('')}
                    </tr>
                  `
    }
    return '';
  }).join('')}
            </tbody>
          </table>`;
      } else if (block?.type === 'AnyButton') {
        sanitzedHtml = `
          <a href="${block?.data?.link}">${block?.data?.text}</a>
        `
      } else if (block?.type === 'image') {
        const { url, caption,alt, withBorder, withBackground, stretched } = block.data;

        let classNames = 'w-full h-auto max-h-[70vh] blogdetail-img-border object-cover object-center hidden aspect-video';
        if (withBorder) classNames += ' border-2 border-gray-300';
        if (withBackground) classNames += ' bg-gray-200';
        if (stretched) classNames += ' w-full ';

        sanitzedHtml =`<div class="${stretched ? 'w-full flex justify-center flex-col items-center' : ' w-full flex justify-center flex-col items-center '}">
                <div class="h-[30vh] bg-gray-200 rounded dark:bg-gray-700 w-full mb-4 animate-pulse"></div>
                <img src="${url}" alt="${alt}" class="${classNames}" onload="imageLoaded(this)"/>
                ${caption && `<p class="text-center text-sm mt-2">${caption}</p>`}
            </div>`
      } else if (block?.type === 'twoColumns') {
        const leftDivData = block?.data?.itemContent["1"];
        const rightDivData = block?.data?.itemContent["2"];
        const leftDiv = mapContentBlocks(leftDivData?.blocks || []);
        const rightDiv = mapContentBlocks(rightDivData?.blocks || []);
        const component: React.JSX.Element = (<div className={getTailwindClasses(block?.type, 1, undefined, undefined)}>
          <div className="flex-1">{leftDiv}</div>
          <div className="flex-1">{rightDiv}</div>
        </div>);
        return [component];
      }
      else if (block?.type === 'embed') {
        const { service, source,embed, width, height, caption } = block.data;
        let classNames='mx-auto'
        if (service === 'youtube') {
            sanitzedHtml = `<div class="embed-responsive embed-responsive-16by9">
                <iframe class="${classNames} embed-responsive-item" src="${embed}" width="${width}" height="${height}" frameborder="0" allowfullscreen></iframe> 
              </div>
              <div class="caption">${caption || ''}</div>`;
          } 
      }

      let htmlWithBlankTarget = addPropertiesToAnchorTags(
        sanitzedHtml,
        targetForAnchorTags,
        relForAnchorTags,
        block?.type === "AnyButton" ? "font-medium rounded-md shadow-lg px-4 py-2.5 bg-blue-600 text-white flex justify-center items-center" : undefined
      );
      const blockType =
        block?.type === "list" ? block?.data?.style : block?.type;
      const elementTag = getElementTag(blockType, block?.data?.level);
      const tailwindClasses = getTailwindClasses(
        blockType,
        block?.data?.level,
        block?.data?.alignment || block?.data?.align,
        block?.data?.type
      );

      if (block?.tunes?.textVariant) {
        const textVariantClasses = getTunesTextVariant(
          block.tunes.textVariant
        );
        htmlWithBlankTarget = `<${elementTag} class='${tailwindClasses}'>${htmlWithBlankTarget}</${elementTag}>`;
        return React.createElement("div", {
          key: block.id,
          dangerouslySetInnerHTML: { __html: htmlWithBlankTarget },
          className: textVariantClasses,
          role: block?.type === "warning" ? "alert" : "",
        });
      } else {
        return React.createElement(elementTag, {
          key: block.id,
          dangerouslySetInnerHTML: { __html: htmlWithBlankTarget },
          className: `py-2 ${tailwindClasses}`,
          role: block?.type === "warning" ? "alert" : "",
        });
      }
    })
  }

  return (
    <div className="mt-3 mb-[50px] antialiased" style={{textRendering: "optimizeLegibility" }}>
      {mapContentBlocks(content?.blocks || [])}
    </div>
  );
};

export default BlogViewer;
