export class ImageMock extends HTMLElement {
    align: string;
    alt: string;
    border: string;
    complete: boolean;
    crossOrigin: string;
    currentSrc: string;
    decoding: 'async' | 'sync' | 'auto';
    fetchPriority: string;
    height: number;
    hspace: number;
    isMap: boolean;
    loading: 'eager' | 'lazy';
    longDesc: string;
    lowsrc: string;
    name: string;
    naturalHeight: number;
    naturalWidth: number;
    referrerPolicy: string;
    sizes: string;
    src: string;
    srcset: string;
    useMap: string;
    vspace: number;
    width: number;
    x: number;
    y: number;
    decode: () => Promise<void>;

    constructor() {
        super();

        setTimeout(() => {
            if (this.onload) {
                this.onload(new Event('onload')); // simulate success
            }
        }, 100);
    }
}
