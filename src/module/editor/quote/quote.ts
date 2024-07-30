import './index.css';
import { BlockTool } from '@editorjs/editorjs';

import { IconAlignLeft, IconAlignCenter, IconQuote } from '@codexteam/icons';


interface Quote {
    data: QuoteData;
    api: any; // Assuming Editor.js API instance type

    // Other methods or properties if needed
}

interface QuoteData {
    text: string;
    caption: string;
    alignment: 'center' | 'left' | 'right'; // Define alignment type
}

interface QuoteConfig {
    quotePlaceholder: string;
    captionPlaceholder: string;
    defaultAlignment: 'center' | 'left' | 'right'; // Define default alignment type
}

interface TunesMenuConfig {
    icon: string;
    label: string;
    isActive: boolean;
    closeOnActivate: boolean;
    onActivate: () => void;
}

class Quote implements BlockTool {
    private readOnly: boolean;
    private quotePlaceholder: string;
    private captionPlaceholder: string;
    private _CSS: { block: any; settingsButton: any; settingsButtonActive: any; wrapper: string; alignment: { left: string; center: string; right: string; justify: string; }; };
    private currentAlignmentClass: string | null = null;
    private _element: HTMLElement;
    

    static get isReadOnlySupported(): boolean {
        return true;
    }

    static get toolbox(): { icon: string; title: string; } {
        return {
            icon: IconQuote,
            title: 'Quote',
        };
    }

    static get contentless(): boolean {
        return true;
    }

    static get enableLineBreaks(): boolean {
        return true;
    }
    static get DEFAULT_QUOTE_PLACEHOLDER(): string {
        return 'Enter a quote';
    }

    static get DEFAULT_CAPTION_PLACEHOLDER(): string {
        return 'Enter a caption';
    }


    static get ALIGNMENTS(): { left: string; center: string; right: string } {
        return {
            left: 'left',
            center: 'center',
            right: 'right',
        };
    }

    static get DEFAULT_ALIGNMENT(): string {
        return Quote.ALIGNMENTS.left;
    }

    static get conversionConfig() {
        return {
            import: 'text',
            export: function (quoteData: QuoteData): string {
                return quoteData.caption ? `${quoteData.text} — ${quoteData.caption}` : quoteData.text;
            },
        };
    }

    get CSS(): {
        text: any | string; baseClass: string; wrapper: string; quote: string; input: string; caption: string;
    } {
        return {
            baseClass: this.api.styles.block,
            wrapper: 'cdx-quote',
            text: 'cdx-quote__text',
            input: this.api.styles.input,
            caption: 'cdx-quote__caption',
            quote: 'cdx-quote__quote',
        };
    }

    get settings(): any[] {
        return [
            {
                name: "left",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 23h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 45h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
            },
            {
                name: "center",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 23c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2zm-24 10h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 45c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2zm-24 10h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
            },
            {
                name: "right",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m38 23h6c1.104 0 2-.896 2-2s-.896-2-2-2h-6c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h12c1.104 0 2-.896 2-2s-.896-2-2-2h-12c-1.104 0-2 .896-2 2s.896 2 2 2zm16-10h6c1.104 0 2-.896 2-2s-.896-2-2-2h-6c-1.104 0-2 .896-2 2s.896 2 2 2zm0 10h12c1.104 0 2-.896 2-2s-.896-2-2-2h-12c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
            },
        ];
    }


    constructor({ data, config, api, readOnly }: { data: QuoteData; config: QuoteConfig; api: object; readOnly: boolean; }) {
        const { ALIGNMENTS, DEFAULT_ALIGNMENT } = Quote;
   
        this.api = api;
        this.readOnly = readOnly;

        this.quotePlaceholder = config.quotePlaceholder || Quote.DEFAULT_QUOTE_PLACEHOLDER;
        this.captionPlaceholder = config.captionPlaceholder || Quote.DEFAULT_CAPTION_PLACEHOLDER;

        this.data = {
            text: data.text || '',
            caption: data.caption || '',
            alignment: Object.values(ALIGNMENTS).includes(data.alignment) && data.alignment ||
                config.defaultAlignment ||
                DEFAULT_ALIGNMENT,
        };
        
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
        this._element = this.getTag();
    }

    getTag(): HTMLElement {
       
        const container = this._make('blockquote', [this.CSS.baseClass, this.CSS.wrapper]);
        container.classList.add(this._CSS.alignment[this.data.alignment]);

        this.currentAlignmentClass =this._CSS.alignment[this.data.alignment];
        const quote = this._make('div', [this.CSS.input, this.CSS.text], {
            contentEditable: !this.readOnly,
            innerHTML: this.data.text,
        });
        const caption = this._make('div', [this.CSS.input, this.CSS.caption], {
            contentEditable: !this.readOnly,
            innerHTML: this.data.caption,
        });

        if (quote instanceof HTMLElement) {
            quote.dataset.placeholder = this.quotePlaceholder;
        }
        if (caption instanceof HTMLElement) {
            caption.dataset.placeholder = this.captionPlaceholder;
        }
        container.appendChild(quote);
        container.appendChild(caption);

        return container as HTMLElement;
    }
    render() {
        return this._element;
    }


    save(quoteElement: HTMLDivElement): QuoteData {
        const text = quoteElement.querySelector(`.${this.CSS.text}`);
        const caption = quoteElement.querySelector(`.${this.CSS.caption}`);

        return Object.assign(this.data, {
            text: text?.innerHTML || "",
            caption: caption?.innerHTML || "",
        });
    }

    static get sanitize() {
        return {
            text: {
                br: true,
            },
            caption: {
                br: true,
            },
            alignment: {},
        };
    }

    renderSettings(): TunesMenuConfig[] {
        const capitalize = (str: string): string => {
            return str[0].toUpperCase() + str.substr(1);
        };
       
        return this.settings.map(item => ({
            icon: item.icon,
            isActive: this.data.alignment === item.name,
            label: this.api.i18n.t(`Align ${capitalize(item.name)}`),
            closeOnActivate: true,
            onActivate: () => this._toggleTune(item.name as 'center' | 'left' | 'right'), // Ensure item.name is correctly typed
        }));
    };
    
    
    _toggleTune(tune: 'center' | 'left' | 'right') {
   
        this._toggleAlignmentClass(tune);
    }

    private _toggleAlignmentClass(tune: 'center' | 'left' | 'right') {
    this.data.alignment = tune;
    const blockquote = this._element;
    if (this.currentAlignmentClass) {
        blockquote.classList.remove(this.currentAlignmentClass);
    }

    // Add the new alignment class
    const newAlignmentClass = this._CSS.alignment[tune];
    blockquote.classList.add(this._CSS.alignment[this.data.alignment]);
    
    // Update the current alignment class tracker
    this.currentAlignmentClass = newAlignmentClass;
}
    
    _make(tagName: string, classNames: string[] | string = [], attributes: object = {}): Element {
       
        const el = document.createElement(tagName);
    
        if (Array.isArray(classNames)) {
            el.classList.add(...classNames);
        } else if (classNames) {
            el.classList.add(classNames);
        }
    
        for (const attrName in attributes) {
            if (Object.prototype.hasOwnProperty.call(attributes, attrName)) {
              (el as any)[attrName] = (attributes as any)[attrName];
            }
          }
        return el;
    }
}

export { Quote }; 