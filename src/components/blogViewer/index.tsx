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
  level?: number;
  caption?: string;
  title?: string;
  message?: string;
  items?: { text: string; checked: boolean }[] | string[];
  meta?: {
    title: string;
    description: string;
    url: string;
    image: { url: string };
  };
  content?: string[][];
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
  const renderBlock = (block: Block) => {
    const { type, data, id } = block;
    const tailwindClasses = "block mb-8";

    switch (type) {
      case "paragraph":
        return (
          <Paragraph key={id} text={data.text!} classes={tailwindClasses} />
        );

      case "header":
        return (
          <Header
            key={id}
            level={data.level!}
            text={data.text!}
            classes={tailwindClasses}
          />
        );

      case "quote":
        return (
          <Quote
            key={id}
            text={data.text!}
            caption={data.caption}
            classes={tailwindClasses}
          />
        );

      case "warning":
        return (
          <Warning
            key={id}
            title={data.title!}
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

      case "linkTool":
        return (
          <LinkTool key={id} meta={data.meta!} classes={tailwindClasses} />
        );

      case "table":
        return (
          <Table key={id} content={data.content!} classes={tailwindClasses} />
        );

      case "AnyButton":
        return (
          <AnyButton
            key={id}
            text={data.text!}
            className={data.class!}
            themeColor={data.themeColor!}
            classes={tailwindClasses}
          />
        );

      case "image":
        return (
          <Image
            key={id}
            file={data.file!}
            caption={data.caption}
            classes={tailwindClasses}
          />
        );

      case "twoColumns":
        return (
          <TwoColumns
            key={id}
            left={renderBlock({
              type: "raw",
              data: { html: data.left },
              id: `${id}-left`,
            })}
            right={renderBlock({
              type: "raw",
              data: { html: data.right },
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
            dangerouslySetInnerHTML={{ __html: data.html! }}
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
