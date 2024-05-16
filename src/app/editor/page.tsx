'use client';
import React, { useRef, useEffect, useState, FC } from 'react';
import EditorJS, { EditorConfig, OutputData, ToolConstructable } from '@editorjs/editorjs';
import Paragraph from 'editorjs-paragraph-with-alignment';
// import Header from 'editorjs-header-with-alignment';
// import Quote from '@editorjs/quote';
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

import CustomList from '../../components/customList';
import { LayoutBlockTool, LayoutBlockToolConfig } from 'editorjs-layout';
import SimpleImage from '@/module/editor/simple-image/simple_image';
import Header from '@/module/editor/header/header';
import { Quote } from '@/module/editor/quote/quote';

interface CustomEditorProps {
    editorDataOnChange: (_newProp: JSON | null) => void;
    initialEditorData?: OutputData
}


const CustomEditor: FC<CustomEditorProps> = () => {
    // const initialEditorData={"time":1714086080474,"blocks":[{"id":"5M7eLsV8UI","data":{"text":"Hello first blog","level":2,"alignment":"left"},"type":"header"},{"id":"5wkz-yF0vw","data":{"text":"The first blog is about lorem espnaola bannaa and kanana asuy mnghqwkuj auhyqwe azsnfkja","alignment":"left"},"type":"paragraph","tunes":{"textVariant":""}}],"version":"2.29.1"}; //get from props
    const editorRef = useRef<any>();
    const [editorIsReady, setEditorIsReady] = useState<boolean | null>(null);

    const editorDataOnChange = (outputData: JSON | null) => {
        // setBlogdata(blog || ({} as JSON));
        // setSynced(false);
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
        //clearing localstorage before every use
        // console.log(initialEditorData)
        localStorage.removeItem('editorContent');
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
                            config: {
                                endpoint: '/api/fetchUrl', // Your backend endpoint for url data fetching,
                            }
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
                        config: {
                            endpoint: '/api/fetchUrl', // Your backend endpoint for url data fetching,
                        }
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
        return () => {
            if (editorRef.current && editorRef.current.destroy) {
                editorRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className='py-4 px-12 w-[100%]'>
            <div ref={editorRef} className={editorIsReady ? `editorTypographyStyling` : ''} style={{ maxWidth: 'unset' }}>
                {editorIsReady === null ? <div className="text-center">Loading...</div> : null}
                {editorIsReady === false ? <div className="text-center">Unable to load editor...</div> : null}
            </div>
        </div>
    )
}
export default CustomEditor;