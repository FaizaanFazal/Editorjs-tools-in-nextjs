// BlogViewer.tsx
import React from "react";
import { Paragraph } from "./Paragraph";
import { Header } from "./Header";
import { Quote } from "./Quote";
import { Warning } from "./warning";
import { Delimiter } from "./Delimiter";
import { List } from "./List";
import { Checklist } from "./Checklist";
import { LinkTool } from "./LinkTool";
import { Table } from "./Table";
import { AnyButton } from "./AnyButton";
import { Image } from "./Image";
import { TwoColumns } from "./TwoColumns";
import { Embed } from "./Embed";
import RawHtml from "./RawHtml";
import { AlertComponent } from "./Alert";

interface BlockData {
  service: string;
  type: string;
  source: string | undefined;
  width: string | undefined;
  height: string | undefined;
  text?: string;
  alignment?: string;
  level?: number;
  link?: string;
  caption?: string;
  title?: string;
  alt?: string;
  url?: string;
  stretched?: boolean;
  withBackground?: boolean;
  withBorder?: boolean;
  message?: string;
  items?: { text: string; checked: boolean }[] | string[];
  style?: string;
  meta?: {
    title: string;
    description: string;
    url: string;
    image: { url: string };
  };
  content?: string[][];
  itemContent?: {
    blocks: Block[];
  }[];
  class?: string;
  themeColor?: string;
  file?: { url: string };
  left?: string;
  right?: string;
  embed?: string;
  html?: string;
}

interface Block {
  type: string;
  data: BlockData;
  id: string;
}

interface BlogViewerProps {
  content: {
    blocks: Block[];
  };
}

const BlogViewer: React.FC<BlogViewerProps> = ({ content }) => {

  const getHeaderFontSize = (level: number) => {
    const fontSizeMap: Record<number, string> = {
      1: 'text-[44px]',
      2: 'text-3xl',
      3: 'text-2xl',
      4: 'text-xl',
      5: 'text-lg',
    };
    return fontSizeMap[level] || 'text-base';
  };

  const getAlignmentClasses = (alignment: string | undefined | null) => {
    const alignmentMap = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    };
    return alignmentMap[alignment as 'left' | 'center' | 'right' | 'justify'] || 'text-left';
  };

  const customSanitize = (text: string) => {
    return text.replace(/\u00a0/g, ' ');
  };

  const getAlertColorClasses = (alertType: string | undefined | null) => {
    const colorClasses: Record<string, string> = {
      primary: 'text-blue-800 bg-blue-50 border border-blue-300 dark:bg-blue-800 dark:text-blue-200 dark:border-blue-700',
      secondary: 'text-gray-800 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600',
      info: 'text-blue-700 bg-blue-100 border border-blue-400 dark:bg-blue-700 dark:text-blue-300 dark:border-blue-600',
      success: 'text-green-800 bg-green-50 border border-green-300 dark:bg-green-800 dark:text-green-200 dark:border-green-700',
      warning: 'text-yellow-800 bg-yellow-50 border border-yellow-300 dark:bg-yellow-800 dark:text-yellow-200 dark:border-yellow-700',
      danger: 'text-red-800 bg-red-50 border border-red-300 dark:bg-red-800 dark:text-red-200 dark:border-red-700',
      light: 'text-gray-800 bg-gray-50 border border-gray-200 dark:bg-white dark:text-gray-800 dark:border-gray-400',
      dark: 'text-white bg-gray-800 border border-gray-700 dark:bg-black dark:text-gray-300 dark:border-gray-900',
    };
    return colorClasses[alertType?.toLowerCase() || 'primary'];
  };

  const parseHtml = (htmlString: string): React.ReactNode => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${htmlString}</div>`, 'text/html');
    const container = doc.body.firstChild as HTMLElement;
    return convertNodeToReact(container);
};
const convertNodeToReact = (node: ChildNode | null): React.ReactNode => {
    if (!node) return null;
    if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const children = Array.from(element.childNodes).map((childNode, index) =>
            convertNodeToReact(childNode)
        );
        return React.createElement(element.tagName.toLowerCase(), { key: node.nodeName, ...getAttributes(element) }, children);
    }
    return null;
};
const getAttributes = (element: HTMLElement) => {
    const attrs: { [key: string]: string } = {};
    for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        attrs[attr.name] = attr.value;
    }
    return attrs;
};


  const renderBlock = (block: Block) => {

    const { type, data, id } = block;
    const tailwindClasses = "block mb-8 dark:text-white";

    switch (type) {
      case "paragraph":
        return (
          <Paragraph
            key={id}
            text={parseHtml(data.text!)}
            classes={`${tailwindClasses} ${getAlignmentClasses(data.alignment!)} `}
          />
        );

      case "header":
        return (
          <Header
            key={id}
            level={data.level!}
            text={parseHtml(data.text!)}
            classes={`${tailwindClasses} ${getHeaderFontSize(data.level!)} ${getAlignmentClasses(data.alignment!)}  `}
          />
        );

      case "quote":
        return (
          <Quote
            key={id}
            text={data.text!}
            caption={data.caption}
            classes={`${tailwindClasses} ${getAlignmentClasses(data.alignment!)}`}
          />
        );

      case "warning":
        return (
          <Warning
            key={id}
            title={customSanitize(data.title!)}
            message={data.message!}
            classes={tailwindClasses}
          />
        );

      case "delimiter":
        return <Delimiter key={id} classes={tailwindClasses} />;

      case "list":
        return (
          <List
            key={id}
            items={data.items as string[]}
            classes={tailwindClasses}
            style={data.style}
          />
        );

      case "checklist":
        return (
          <Checklist
            key={id}
            items={data.items as { text: string; checked: boolean }[]}
            classes={tailwindClasses}
          />
        );

      //baseurl issue on paste in editor
      case "linkTool":
        return (
          <LinkTool key={id} meta={data.meta!} classes={tailwindClasses} />
        );

      case "table":
        return (
          <Table key={id} content={data?.content!} classes={tailwindClasses} />
        );

      case "AnyButton":
        return (
          <AnyButton
            key={id}
            text={data.text!}
            link={data.link!}
            className={data.class!}
            themeColor={data.themeColor!}
            classes={tailwindClasses}
          />
        );

      case "image":
        return (
          <Image
            key={id}
            src={data.url!}
            alt={data.alt!}
            caption={data.caption!}
            stretched={data?.stretched}
            withBackground={data?.withBackground}
            withBorder={data?.withBorder}
            classes={tailwindClasses}
          />
        );

      case "twoColumns":
        const leftDivData = data?.itemContent!["1"]?.blocks!
        const rightDivData = data?.itemContent!["2"]?.blocks!
        console.log("left", leftDivData[0]?.type)
        console.log("right", rightDivData[0]?.type)
        return (
          <TwoColumns
            key={id}
            left={renderBlock({
              type: leftDivData[0]?.type || 'raw',
              data: leftDivData[0]?.data,
              id: `${id}-left`,
            })}
            right={renderBlock({
              type: rightDivData[0]?.type || 'raw',
              data: rightDivData[0]?.data,
              id: `${id}-right`,
            })}
            classes={tailwindClasses}
          />
        );

      case "embed":
        return (
          <Embed
            key={id}
            service={data.service!}
            source={data.source!}
            embed={data.embed!}
            width={data.width!}
            height={data.height!}
            caption={data.caption}
            classes={tailwindClasses}
          />
        );

      case "raw":
        return (
          <RawHtml
            key={id}
            className={tailwindClasses}
            html={data?.html || ""}
          />
        );

      case "alert":
        return (
          <AlertComponent
            key={id}
            classes={`${tailwindClasses} ${getAlertColorClasses(data?.type)} ${getAlignmentClasses(data.alignment!)} p-4 my-4 text-md rounded-lg`}
            message={data?.message || ""}
            parsedHtml={parseHtml(data.message!) || ""}
          />
        );

      default:
        return (
          <div
            key={id}
            className="text-lg md:text-xl text-gray-900 dark:text-gray-300"
          >
            Unsupported block type: {type}
          </div>
        );
    }
  };

  return (
    <div className="prose dark:prose-invert max-w-none w-full">
      {content.blocks.map((block) => renderBlock(block))}
    </div>
  );
};

export default BlogViewer;
