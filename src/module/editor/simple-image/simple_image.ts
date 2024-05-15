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

}

export default class SimpleImage implements BlockTool {
    private api: any;
    private readOnly: boolean;
    private blockIndex: number;
    private CSS: any;
    private nodes: any;
    private tunes: any[];
    private _data: SimpleImageData; // Rename _data here

    constructor({ data, api, readOnly }: { data: SimpleImageData, config?: any, api: any, readOnly: boolean }) {
        this.api = api;
        this.readOnly = readOnly;
        this.blockIndex = this.api.blocks.getCurrentBlockIndex() + 1;

        this.CSS = {
            baseClass: this.api.styles.block,
            loading: this.api.styles.loader,
            input: this.api.styles.input,
            wrapper: 'cdx-simple-image',
            imageHolder: 'cdx-simple-image__picture',
            caption: 'cdx-simple-image__caption',
            alt: 'cdx-simple-image__caption',
        };

        this.nodes = {
            wrapper: null,
            imageHolder: null,
            image: null,
            caption: null,
            alt: null,
        };

        this._data = {  // Initialize _data here
            url: data.url || '',
            caption: data.caption || '',
            alt: data.alt || '',
            withBorder: data.withBorder !== undefined ? data.withBorder : false,
            withBackground: data.withBackground !== undefined ? data.withBackground : false,
            stretched: data.stretched !== undefined ? data.stretched : false,
        };

        this.tunes = [
            { name: 'withBorder', label: 'Add Border', icon: IconAddBorder },
            { name: 'stretched', label: 'Stretch Image', icon: IconStretch },
            { name: 'withBackground', label: 'Add Background', icon: IconAddBackground },
        ];
    }

    render(): HTMLElement {
        const wrapper = this._make('div', [this.CSS.baseClass, this.CSS.wrapper]);
        const loader = this._make('div', this.CSS.loading);
        const imageHolder = this._make('div', this.CSS.imageHolder);
        const image = this._make('img') as HTMLImageElement;
        const caption = this._make('div', [this.CSS.input, this.CSS.caption], {
            contentEditable: !this.readOnly,
            innerHTML: this.data.caption || '',
        });
        caption.dataset.placeholder = 'Enter a caption';

        const alt = this._make('div', [this.CSS.input, this.CSS.alt], {
            contentEditable: !this.readOnly,
            innerHTML: this.data.alt || '',
        });
        alt.dataset.placeholder = 'Enter a Alt text for image to improve SEO';

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
            url: image.src,
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
            caption: {
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


    private _toggleTune(tune: keyof SimpleImageData) {
        const property = this.data[tune] as boolean;
        //@ts-expect-error: TypeScript is expecting a certain type (never) for the sanitize property, but it's receiving a different type (boolean) instead.
        this.data[tune] = !property;
        this._acceptTuneView();
    }





    private _acceptTuneView() {
        const { withBorder, withBackground, stretched } = this.data;

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

        if (stretched !== undefined) {
            this.api.blocks.stretchBlock(this.blockIndex, !!stretched);
        }
    }

}

