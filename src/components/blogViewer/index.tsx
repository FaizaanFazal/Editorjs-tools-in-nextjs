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

interface BlockData {
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

  const renderBlock = (block: Block) => {

    const { type, data, id } = block;
    console.log("block passerd", block, type)
    const tailwindClasses = "block mb-8 dark:text-white";

    switch (type) {
      case "paragraph":
        return (
          <Paragraph
            key={id}
            text={data.text!}
            classes={`${tailwindClasses} ${getAlignmentClasses(data.alignment!)} `}
          />
        );

      case "header":
        return (
          <Header
            key={id}
            level={data.level!}
            text={data.text!}
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
            embed={data.embed!}
            caption={data.caption}
            classes={tailwindClasses}
          />
        );

      case "raw":
        return (
          <div
            key={id}
            className={tailwindClasses}
            dangerouslySetInnerHTML={{ __html: data?.html! }}
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
