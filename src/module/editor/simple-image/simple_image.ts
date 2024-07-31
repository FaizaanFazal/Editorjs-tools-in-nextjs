import './index.css';
import { IconAddBorder, IconStretch, IconAddBackground } from '@codexteam/icons';
import { BlockTool } from '@editorjs/editorjs';

interface SimpleImageData {
    url: string;
    caption: string;
    alt: string;
    withBorder: boolean;
    withBackground: boolean;
    stretched: boolean;
    alignment: 'center' | 'left' | 'right';
}

interface ImageConfig {
    captionPlaceholder: string;
    defaultAlignment: 'center' | 'left' | 'right'; // Define default alignment type
}

export default class SimpleImage implements BlockTool {
    private api: any;
    private readOnly: boolean;
    private blockIndex: number;
    private _CSS!: { block: any; settingsButton: any; settingsButtonActive: any; wrapper: string; alignment: { left: string; center: string; right: string; justify: string; }; };
    private CSS: {
        baseClass: any; wrapper: string; imageHolder: any; caption: string; alt: string; loading: any; input: any; settingsButton: any; settingsButtonActive: any;
    };
    private nodes: any;
    private currentAlignmentClass: string | null = null;
    private tunes: any[];
    private _element: HTMLElement;
    private _data: SimpleImageData; // Rename _data here
    // inlineToolSettings: { name: string; icon: string; }[];

    constructor({ data,config, api, readOnly }: { data: SimpleImageData, config: ImageConfig, api: any, readOnly: boolean }) {
        this.api = api;
        this.readOnly = readOnly;
        this.blockIndex = this.api.blocks.getCurrentBlockIndex() + 1;
        const { ALIGNMENTS, DEFAULT_ALIGNMENT } = SimpleImage;
        // this.inlineToolSettings = [
        //     {
        //         name: "left",
        //         icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 23h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 45h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
        //     },
        //     {
        //         name: "center",
        //         icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 23c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2zm-24 10h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 45c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2zm-24 10h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
        //     },
        //     {
        //         name: "right",
        //         icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m38 23h6c1.104 0 2-.896 2-2s-.896-2-2-2h-6c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h12c1.104 0 2-.896 2-2s-.896-2-2-2h-12c-1.104 0-2 .896-2 2s.896 2 2 2zm16-10h6c1.104 0 2-.896 2-2s-.896-2-2-2h-6c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h12c1.104 0 2-.896 2-2s-.896-2-2-2h-12c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
        //     },
        //     {
        //         name: "justify",
        //         icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 23h44c1.104 0 2-.896 2-2s-.896-2-2-2h-44c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h44c1.104 0 2-.896 2-2s-.896-2-2-2h-44c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h44c1.104 0 2-.896 2-2s-.896-2-2-2h-44c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h44c1.104 0 2-.896 2-2s-.896-2-2-2h-44c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
        //     },
        // ];
        this.tunes = [
            { name: 'withBorder', label: 'Add Border', icon: IconAddBorder },
            { name: 'stretched', label: 'Stretch Image', icon: IconStretch },
            { name: 'withBackground', label: 'Add Background', icon: IconAddBackground },
            { name: "left", icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 23h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 45h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`, },
            { name: "center", icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 23c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2zm-24 10h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 45c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2zm-24 10h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`, },
            { name: "right", icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m38 23h6c1.104 0 2-.896 2-2s-.896-2-2-2h-6c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h12c1.104 0 2-.896 2-2s-.896-2-2-2h-12c-1.104 0-2 .896-2 2s.896 2 2 2zm16-10h6c1.104 0 2-.896 2-2s-.896-2-2-2h-6c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h12c1.104 0 2-.896 2-2s-.896-2-2-2h-12c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`, },
            { name: "justify", icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 23h44c1.104 0 2-.896 2-2s-.896-2-2-2h-44c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h44c1.104 0 2-.896 2-2s-.896-2-2-2h-44c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h44c1.104 0 2-.896 2-2s-.896-2-2-2h-44c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h44c1.104 0 2-.896 2-2s-.896-2-2-2h-44c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`, },
        ];

        /**
         * Styles
         *
         * @type {object}
         */
        this._CSS = {
            block: this.api.styles.block,
            settingsButton: this.api.styles.settingsButton,
            settingsButtonActive: this.api.styles.settingsButtonActive,
            wrapper: "ce-header",
            alignment: {
                left: "ce-header--left",
                center: "ce-header--center",
                right: "ce-header--right",
                justify: "ce-header--justify",
            },
        };
        this.CSS = {
            baseClass: this.api.styles.block,
            loading: this.api.styles.loader,
            input: this.api.styles.input,
            settingsButton: this.api.styles.settingsButton,
            settingsButtonActive: this.api.styles.settingsButtonActive,
            wrapper: 'cdx-simple-image',
            imageHolder: 'cdx-simple-image__picture',
            caption: 'cdx-simple-image__caption',
            alt: 'cdx-simple-image__alt',
        };

        this.nodes = {
            wrapper: null,
            imageHolder: null,
            image: null,
            caption: null,
            alt: null,
        };

        this._data = {  // Initialize _data here
            url: data?.url || '',
            caption: data?.caption || '',
            alt: data?.alt || '',
            alignment: Object.values(ALIGNMENTS).includes(data.alignment) && data.alignment ||
                config.defaultAlignment ||
                DEFAULT_ALIGNMENT,
            withBorder: data.withBorder !== undefined ? data.withBorder : false,
            withBackground: data.withBackground !== undefined ? data.withBackground : false,
            stretched: data.stretched !== undefined ? data.stretched : false,
        };


        this._element = this.render();
    }

    render(): HTMLElement {
        const wrapper = this._make('div', [this.CSS.baseClass, this.CSS.wrapper]);
        const loader = this._make('div', this.CSS.loading);
        const imageHolder = this._make('div', this.CSS.imageHolder);
        const image = this._make('img') as HTMLImageElement;
        this.currentAlignmentClass = this._CSS.alignment[this.data.alignment];
        const caption = this._make('div', [this.CSS.input, this.CSS.caption], {
            contentEditable: !this.readOnly,
            innerHTML: this.data.caption || '',
        });
        caption.dataset.placeholder = 'Enter a caption';

        const alt = this._make('div', [this.CSS.input, this.CSS.alt], {
            contentEditable: !this.readOnly,
            innerHTML: this.data.alt || '',
        });
        alt.dataset.placeholder = 'Enter a Alt text for image ';

        wrapper.appendChild(loader);

        if (this.data.url) {
            image.src = this.data.url;
        }

        image.onload = () => {
            wrapper.classList.remove(this.CSS.loading);
            imageHolder.appendChild(image);
            wrapper.appendChild(imageHolder);
            wrapper.appendChild(alt);
            wrapper.appendChild(caption);
            loader.remove();
            this._acceptTuneView();
        };

        image.onerror = (e) => {
            console.log('Failed to load an image', e);
        };

        this.nodes.imageHolder = imageHolder;
        this.nodes.wrapper = wrapper;
        this.nodes.image = image;
        this.nodes.caption = caption;
        this.nodes.alt = alt;

        return wrapper;
    }

    save(blockContent: HTMLElement): SimpleImageData {
        const image = blockContent.querySelector('img') as HTMLImageElement;
        const caption = blockContent.querySelector('.' + this.CSS.caption);
        const alt = blockContent.querySelector('.' + this.CSS.alt); // Selector for alt
        if (!image) {
            return this.data;
        }

        return Object.assign(this.data, {
            url: image?.src,
            caption: caption?.innerHTML || "",
            alt: alt?.innerHTML || "", // alt field
        });
    }


    static get sanitize() {
        return {
            url: {},
            withBorder: {},
            withBackground: {},
            stretched: {},
            alignment: {},
            caption: {
                br: true,
            },
            alt: {
                br: true,
            },
        };
    }

    static get isReadOnlySupported() {
        return true;
    }

    async onDropHandler(file: File): Promise<SimpleImageData> {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        return new Promise<SimpleImageData>((resolve, reject) => {
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    resolve({
                        url: event.target.result as string,
                        caption: file.name,
                        alt: file.name,
                        alignment: 'left',
                        withBorder: false,
                        withBackground: false,
                        stretched: false,
                    });
                } else {
                    reject(new Error('Failed to read file'));
                }
            };

            reader.onerror = (_event) => {
                reject(new Error('Failed to read file'));
            };
        });
    }


    onPaste(event: { type: string, detail: any }) {
        switch (event.type) {
            case 'tag': {
                const img = event.detail.data;
                this.data = {
                    url: img.src,
                    caption: '',
                    alt: '',
                    alignment: 'left',
                    withBorder: false,
                    withBackground: false,
                    stretched: false,
                };
                break;
            }

            case 'pattern': {
                const { data: text } = event.detail;

                this.data = {
                    url: text,
                    caption: '',
                    alt: '',
                    alignment: 'left',
                    withBorder: false,
                    withBackground: false,
                    stretched: false,
                };
                break;
            }

            case 'file': {
                const { file } = event.detail;

                this.onDropHandler(file)
                    .then(data => {
                        this.data = data;
                    });

                break;
            }
        }
    }

    get data(): SimpleImageData {
        return this._data;
    }

    set data(data: SimpleImageData) {
        this._data = Object.assign({}, this._data, data);
        if (this.nodes.image) {
            this.nodes.image.src = this._data.url;
        }
        if (this.nodes.caption) {
            this.nodes.caption.innerHTML = this._data.caption;
        }
        if (this.nodes.alt) {
            this.nodes.alt.innerHTML = this._data.alt;
        }
    }

    static get pasteConfig() {
        return {
            patterns: {
                image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png|webp)$/i,
            },
            tags: [
                { img: { src: true, alt: true } },
            ],
            files: {
                mimeTypes: ['image/*'],
            },
        };
    }

    renderSettings() {
        return this.tunes.map(tune => ({
            ...tune,
            label: this.api.i18n.t(tune.label),
            toggle: true,
            onActivate: () => this._toggleTune(tune.name),
            isActive: !!this.data[tune.name as keyof SimpleImageData],
        }))
    }

    // renderSettings() {
    //     const holder = document.createElement("DIV");

    //     this.inlineToolSettings
    //         .map((tune) => {
    //             /**
    //              * buttonのdomを作成して、alignのtoggleをactiveに設定する
    //              * @type {HTMLDivElement}
    //              */
    //             const button = document.createElement("div");
    //             button.classList.add(this._CSS.settingsButton);
    //             button.innerHTML = tune.icon;

    //             button.classList.toggle(this.CSS.settingsButtonActive, tune.name === this.data.alignment);

    //             holder.appendChild(button);

    //             return button;
    //         })
    //         .forEach((element, index, elements) => {
    //             element.addEventListener("click", () => {
    //                 this._toggleTune(this.inlineToolSettings[index].name as keyof SimpleImageData);

    //                 elements.forEach((el, i) => {
    //                     const { name } = this.inlineToolSettings[i];
    //                     const alignmentName = name as keyof typeof this._CSS.alignment;
    //                     el.classList.toggle(this.CSS.settingsButtonActive, name === this.data.alignment);
    //                     //headerのdivにalignmentのclassをつける。
    //                     this._element.classList.toggle(this._CSS.alignment[alignmentName], alignmentName === this.data.alignment);
    //                 });
    //             });
    //         });



    //     return holder;
    // }

    private _make(tagName: string, classNames: string[] | null = null, attributes: Record<string, any> = {}): HTMLElement {
        const el = document.createElement(tagName);
        if (Array.isArray(classNames)) {
            el.classList.add(...classNames);
        } else if (classNames) {
            el.classList.add(classNames);
        }

        for (const attrName in attributes) {
            if (Object.prototype.hasOwnProperty.call(attributes, attrName)) {
                el.setAttribute(attrName, attributes[attrName]);
            }
        }
        return el;
    }


    private _toggleTune(tune: keyof SimpleImageData | 'center' | 'left' | 'right') {
        if (tune === 'center' || tune === 'left' || tune === 'right') {
            this._toggleAlignmentClass(tune);
        }
        else {
            const property = this.data[tune] as boolean;
            //@ts-expect-error: TypeScript is expecting a certain type (never) for the sanitize property, but it's receiving a different type (boolean) instead.
            this.data[tune] = !property;
            this._acceptTuneView();
        }

    }

    private _toggleAlignmentClass(tune: 'center' | 'left' | 'right') {
        this.data.alignment = tune;
         const captionDiv = this.nodes.caption;
         console.log("found caption " ,captionDiv)
         if (captionDiv) {
             if (this.currentAlignmentClass) {
                 captionDiv.classList.remove(this.currentAlignmentClass);
             }
             const newAlignmentClass = this._CSS.alignment[tune];
             console.log("mnew alignment calss",newAlignmentClass)
             captionDiv.classList.add(newAlignmentClass);
             this.currentAlignmentClass = newAlignmentClass;
         }
    
        const newAlignmentClass = this._CSS.alignment[tune];
        // imgDiv.classList.add(this._CSS.alignment[this.data.alignment]);
        this.currentAlignmentClass = newAlignmentClass;
        
    }

    static get ALIGNMENTS() {
        return {
            left: "left",
            center: "center",
            right: "right",
            justify: "justify",
        };
    }
    static get DEFAULT_ALIGNMENT() {
        return SimpleImage.ALIGNMENTS.left;
    }

    private _acceptTuneView() {
        const { withBorder, withBackground, stretched, alignment } = this.data;

        if (withBorder !== undefined) {
            this.nodes.imageHolder.classList.toggle(
                `${this.CSS.imageHolder}--withBorder`,
                withBorder
            );
        }

        if (withBackground !== undefined) {
            this.nodes.imageHolder.classList.toggle(
                `${this.CSS.imageHolder}--withBackground`,
                withBackground
            );
        }
        if (alignment !== undefined) {
            this.nodes.imageHolder.classList.toggle(
                `${this._CSS.alignment[this._data.alignment as keyof typeof this._CSS.alignment]}`,

            );
        }

        if (stretched !== undefined) {
            this.api.blocks.stretchBlock(this.blockIndex, !!stretched);
        }
    }

}

