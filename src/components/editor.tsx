'use client';
import React, { useRef, useEffect, useState, FC } from 'react';
import EditorJS, { EditorConfig, ToolConstructable } from '@editorjs/editorjs';
import Paragraph from 'editorjs-paragraph-with-alignment';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import Checklist from '@editorjs/checklist';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import MermaidTool from 'editorjs-mermaid';
import Table from 'editorjs-table';
import AnyButton from 'editorjs-button';
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';
import Hyperlink from 'editorjs-hyperlink';
import ChangeCase from 'editorjs-change-case';
import Strikethrough from '@sotaproject/strikethrough';
import TextVariantTune from '@editorjs/text-variant-tune';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
import RawTool from '@editorjs/raw';
import { LayoutBlockTool, LayoutBlockToolConfig } from 'editorjs-layout';
import SimpleImage from '@/module/editor/simple-image/simple_image';
import Header from '@/module/editor/header/header';
import { Quote } from '@/module/editor/quote/quote';
import dynamic from 'next/dynamic';
import CustomList from './customList';

const BlogViewer = dynamic(() => import('@/app/editor/BlogViewer'), { ssr: false });

const CustomEditor = () => {
    const [blogData, setBlogdata] = useState<JSON>();
    const [isToggled, setIsToggled] = useState(false);
    // const initialEditorData={"time":1714086080474,"blocks":[{"id":"5M7eLsV8UI","data":{"text":"Hello first blog","level":2,"alignment":"left"},"type":"header"},{"id":"5wkz-yF0vw","data":{"text":"The first blog is about lorem espnaola bannaa and kanana asuy mnghqwkuj auhyqwe azsnfkja","alignment":"left"},"type":"paragraph","tunes":{"textVariant":""}}],"version":"2.29.1"}; //get from props
    const editorRef = useRef<any>();
    const [editorIsReady, setEditorIsReady] = useState<boolean | null>(null);

    const editorDataOnChange = (outputData: JSON | null) => {
        console.log(outputData)
        setBlogdata(outputData || ({} as JSON));
    };

    const onEditorReady = async (editor: EditorJS) => {
        console.log('Check Editor.js is ready to work!')
        try {
            console.log('Check Editor.js is ready to work!');
            await editor.isReady;
            console.log('Editor.js is ready to work!');
            setEditorIsReady(true);
            new Undo({
                editor,
                shortcuts: {
                    undo: 'CMD+X',
                    redo: 'CMD+ALT+C'
                }
            });
            MermaidTool.config({ 'theme': 'neutral' });
            new DragDrop(editor);
        } catch (reason) {
            console.log(`Editor.js initialization failed because of ${reason}`);
            setEditorIsReady(false);
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            {
                if (editorRef.current && editorRef.current instanceof HTMLElement) {
                    const layoutBlockToolConfig: LayoutBlockToolConfig = {
                        EditorJS,
                        editorJSConfig: {
                            tools: {
                                image: {
                                    class: SimpleImage as unknown as ToolConstructable,
                                    inlineToolbar: true,
                                    config: {
                                        placeholder: 'Paste image URL'
                                    }
                                },
                                raw: RawTool,
                                header: {
                                    class: Header as unknown as ToolConstructable,
                                    shortcut: 'CMD+SHIFT+H',
                                    inlineToolbar: true,
                                    config: {
                                        placeholder: 'Enter a header',
                                        levels: [2, 3, 4],
                                        defaultLevel: 2,
                                        defaultAlignment: 'left'
                                    }
                                },
                                paragraph: {
                                    class: Paragraph,
                                    inlineToolbar: true,
                                    tunes: ['textVariant']
                                },
                                quote: {
                                    class: Quote as unknown as ToolConstructable,
                                    inlineToolbar: true,
                                    shortcut: 'CMD+SHIFT+O',
                                    config: {
                                        quotePlaceholder: 'Enter a quote',
                                        captionPlaceholder: 'Quote\'s author',
                                    },
                                },
                                warning: {
                                    class: Warning,
                                    inlineToolbar: true,
                                    shortcut: 'CMD+SHIFT+G',
                                    config: {
                                        titlePlaceholder: 'Title',
                                        messagePlaceholder: 'Message',
                                    },
                                },
                                delimiter: Delimiter,
                                alert: {
                                    class: Alert,
                                    inlineToolbar: true,
                                    shortcut: 'CMD+SHIFT+A',
                                    config: {
                                        defaultType: 'primary',
                                        messagePlaceholder: 'Enter something',
                                    },
                                },
                                list: {
                                    class: CustomList,
                                    inlineToolbar: true,
                                    config: {
                                        defaultStyle: 'unordered'
                                    }
                                },
                                checklist: {
                                    class: Checklist,
                                    inlineToolbar: true,
                                },
                                linkTool: {
                                    class: LinkTool,
                                },
                                embed: {
                                    class: Embed,
                                    inlineToolbar: true
                                },
                                mermaid: MermaidTool,
                                AnyButton: {
                                    class: AnyButton,
                                    inlineToolbar: false,
                                    config: {
                                        css: {
                                            "btnColor": "btn--gray",
                                        }
                                    }
                                },
                                Marker: {
                                    class: Marker,
                                    shortcut: 'CMD+SHIFT+M',
                                },
                                underline: Underline,
                                hyperlink: {
                                    class: Hyperlink,
                                    config: {
                                        shortcut: 'CMD+L',
                                        target: '_blank',
                                        rel: 'nofollow',
                                        availableTargets: ['_blank', '_self'],
                                        availableRels: ['author', 'noreferrer'],
                                        validate: false,
                                    }
                                },
                                changeCase: {
                                    class: ChangeCase,
                                    config: {
                                        showLocaleOption: true, // enable locale case options
                                        locale: 'tr' // or ['tr', 'TR', 'tr-TR']
                                    }
                                },
                                strikethrough: Strikethrough,
                                textVariant: TextVariantTune,
                            },
                        },
                        enableLayoutEditing: false,
                        enableLayoutSaving: false,
                        initialData: {
                            itemContent: {
                                1: {
                                    blocks: [],
                                },
                                2: {
                                    blocks: [],
                                },
                            },
                            layout: {
                                type: "container",
                                id: "",
                                className: "",
                                style:
                                    "border: 1px solid #000000; display: flex; justify-content: space-around; padding: 16px; ",
                                children: [
                                    {
                                        type: "item",
                                        id: "",
                                        className: "",
                                        style: "border: 1px solid #000000; padding: 8px; ",
                                        itemContentId: "1",
                                    },
                                    {
                                        type: "item",
                                        id: "",
                                        className: "",
                                        style: "border: 1px solid #000000; padding: 8px; ",
                                        itemContentId: "2",
                                    },
                                ],
                            },
                        },
                    };
                    const editorJSConfig: EditorConfig = {
                        holder: editorRef.current,
                        minHeight: 30,
                        //more configs here
                        tools: {
                            image: {
                                class: SimpleImage as unknown as ToolConstructable,
                                inlineToolbar: true,
                                config: {
                                    placeholder: 'Paste image URL'
                                }
                            },
                            raw: RawTool,
                            header: {
                                class: Header as unknown as ToolConstructable,
                                shortcut: 'CMD+SHIFT+H',
                                inlineToolbar: true,
                                config: {
                                    placeholder: 'Enter a header',
                                    levels: [2, 3, 4],
                                    defaultLevel: 2,
                                    defaultAlignment: 'left'
                                }
                            },
                            paragraph: {
                                class: Paragraph,
                                inlineToolbar: true,
                                tunes: ['textVariant']
                            },
                            quote: {
                                class: Quote as unknown as ToolConstructable,
                                inlineToolbar: true,
                                shortcut: 'CMD+SHIFT+O',
                                config: {
                                    quotePlaceholder: 'Enter a quote',
                                    captionPlaceholder: 'Quote\'s author',
                                },
                            },
                            warning: {
                                class: Warning,
                                inlineToolbar: true,
                                shortcut: 'CMD+SHIFT+G',
                                config: {
                                    titlePlaceholder: 'Title',
                                    messagePlaceholder: 'Message',
                                },
                            },
                            delimiter: Delimiter,
                            alert: {
                                class: Alert,
                                inlineToolbar: true,
                                shortcut: 'CMD+SHIFT+A',
                                config: {
                                    defaultType: 'primary',
                                    messagePlaceholder: 'Enter something',
                                },
                            },
                            list: {
                                class: CustomList,
                                inlineToolbar: true,
                                config: {
                                    defaultStyle: 'unordered'
                                }
                            },
                            checklist: {
                                class: Checklist,
                                inlineToolbar: true,
                            },
                            // image: SimpleImage,
                            linkTool: {
                                class: LinkTool,

                            },
                            embed: {
                                class: Embed,
                                inlineToolbar: true
                            },
                            mermaid: MermaidTool,
                            table: {
                                class: Table,
                                inlineToolbar: true,
                                config: {
                                    rows: 2,
                                    cols: 3,
                                },
                            },
                            AnyButton: {
                                class: AnyButton,
                                inlineToolbar: false,
                                config: {
                                    css: {
                                        "btnColor": "btn--gray",
                                    }
                                }
                            },
                            Marker: {
                                class: Marker,
                                shortcut: 'CMD+SHIFT+M',
                            },
                            underline: Underline,
                            hyperlink: {
                                class: Hyperlink,
                                config: {
                                    shortcut: 'CMD+L',
                                    target: '_blank',
                                    rel: 'nofollow',
                                    availableTargets: ['_blank', '_self'],
                                    availableRels: ['author', 'noreferrer'],
                                    validate: false,
                                }
                            },
                            changeCase: {
                                class: ChangeCase,
                                config: {
                                    showLocaleOption: true, // enable locale case options
                                    locale: 'tr' // or ['tr', 'TR', 'tr-TR']
                                }
                            },
                            strikethrough: Strikethrough,
                            textVariant: TextVariantTune,
                            twoColumns: {
                                class: LayoutBlockTool as unknown as ToolConstructable,
                                config: layoutBlockToolConfig,
                                shortcut: "CMD+2",
                                toolbox: {
                                    icon: `
                    <svg xmlns='http://www.w3.org/2000/svg' width="16" height="16" viewBox='0 0 512 512'>
                      <rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/>
                      <path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/>
                    </svg>
                  `,
                                    title: "2 columns",
                                },
                            },
                        },
                        onChange: async () => {
                            try {
                                const outputData: any = await editor.save();
                                console.log(outputData)
                                editorDataOnChange(outputData);
                            } catch (error) {
                                console.log('Saving failed: ', error);
                                editorDataOnChange(null);
                            }

                        },
                        onReady: () => {
                            new Undo({
                                editor,
                                shortcuts: {
                                    undo: 'CMD+X',
                                    redo: 'CMD+ALT+C'
                                }
                            });
                            MermaidTool.config({ 'theme': 'neutral' })
                            new DragDrop(editor);
                        },
                        autofocus: false,
                        placeholder: 'Let`s write an awesome story!',
                        // data: initialEditorData
                    };
                    const editor = new EditorJS(editorJSConfig);
                    console.log('Calling onEditorReady');
                    onEditorReady(editor);

                    editorRef.current = editor;

                }
            }
        }

        return () => {
            if (editorRef.current && editorRef.current.destroy) {
                editorRef.current.destroy();
            }
        };
    }, []);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div className={`w-[90%] mx-auto border-4  border-gray-600  min-h-screen ${isToggled ? 'dark' : ''}`}>
            <style jsx>
                {`.ce-block--selected .ce-block__content,
                    .ce-inline-toolbar,
                    .codex-editor--narrow .ce-toolbox,
                    .ce-conversion-toolbar,
                    .ce-settings,
                    .ce-settings__button,
                    .ce-toolbar__settings-btn,
                    .cdx-button,
                    .ce-popover,
                    .ce-toolbar__plus:hover {
                    background: #0000;
                    color: inherit;
                    }

                    .ce-inline-tool,
                    .ce-conversion-toolbar__label,
                    .ce-toolbox__button,
                    .cdx-settings-button,
                    .ce-toolbar__plus {
                    color: inherit;
                    }

                    ::selection {
                    background: #000;
                    }

                    .cdx-settings-button:hover,
                    .ce-settings__button:hover,
                    .ce-toolbox__button--active,
                    .ce-toolbox__button:hover,
                    .cdx-button:hover,
                    .ce-inline-toolbar__dropdown:hover,
                    .ce-inline-tool:hover,
                    .ce-popover__item:hover,
                    .ce-toolbar__settings-btn:hover {
                    background-color: #aaaaaa;
                    color: inherit;
                    }

                    .cdx-notify--error {
                    background: #fb5d5d !important;
                    }

                    .cdx-notify__cross::after,
                    .cdx-notify__cross::before {
                    background: white;
                    }

                    .dark .ce-inline-toolbar,
                    .dark .codex-editor--narrow .ce-toolbox,
                    .dark .ce-conversion-toolbar,
                    .dark .ce-settings,
                    .dark .ce-settings__button,
                    .dark .ce-toolbar__settings-btn,
                    .dark .cdx-button,
                    .dark .ce-popover,
                    .dark .ce-toolbar__plus:hover {
                    background: #fff;
                    color: #000;
                    }

                    .dark .ce-inline-tool,
                    .dark .ce-conversion-toolbar__label,
                    .dark .ce-toolbox__button,
                    .dark .cdx-settings-button,
                    .dark .ce-toolbar__plus {
                    color: #616161;
                    }

                    .dark ::selection {
                    background: #4d4d4d;
                    }

                    .dark .cdx-settings-button:hover,
                    .dark .ce-settings__button:hover,
                    .dark .ce-toolbox__button--active,
                    .dark .ce-toolbox__button:hover,
                    .dark .cdx-button:hover,
                    .dark .ce-inline-toolbar__dropdown:hover,
                    .dark .ce-inline-tool:hover,
                    .dark .ce-popover__item:hover,
                    .dark .ce-toolbar__settings-btn:hover {
                    background-color: #4d4d4d;
                    color: #fff;
                    }

                    .dark .cdx-notify--error {
                    background: #fb5d5d !important;
                    }

                    .dark .cdx-notify__cross::after,
                    .dark .cdx-notify__cross::before {
                    background: #1a1a1a;
                    }`}
            </style>
            <div className='py-4 px-12 min-h-screen h-full w-[100%]'>
                <div className='flex row justify-end'>
                    <button
                        onClick={handleToggle}
                        className={`py-2 px-4 rounded border-2 border-red-400 ${isToggled ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
                        {isToggled ? 'Dark' : 'Light'}
                    </button>
                </div>
                <div ref={editorRef} className={` ${editorIsReady ? `editorTypographyStyling` : ''}`} style={{ maxWidth: 'unset' }}>
                    {editorIsReady === null ? <div className="text-center">Loading...</div> : null}
                    {editorIsReady === false ? <div className="text-center">Unable to load editor...</div> : null}
                </div>
                <div className='mt-4 border-t-2 w-[80%] mx-auto '>
                    <div className='dark:text-white'>Editor Viewer Output using tailwind CSS:</div>
                    {blogData &&
                        <BlogViewer content={JSON.parse(JSON.stringify(blogData))} />
                    }
                </div>
            </div>
        </div>
    )
}

export default CustomEditor;