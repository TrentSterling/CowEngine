export class Game {
    private _app: PIXI.Application;
    private _loader = new PIXI.loaders.Loader();

    constructor(opts: IGameOptions = {}) {
        const appOptions: PIXI.ApplicationOptions = {
            width: opts.width || 800,
            height: opts.height || 600,
            view: null,
            transparent: opts.transparent || false,
            antialias: opts.antialias || false,
            preserveDrawingBuffer: opts.preserveBuffer || false,
            resolution: 1
        };

        
        let parent = document.body;
        let acceptedCanvas = false;
        // If opts.canvas is a string, attempt to retrieve the element.
        // If element exists and is HTMLCanvasElement, pass that on to PIXI.
        // If element exists and is generic HTMLElement, set that as parent.
        if(typeof opts.canvas === "string") {
            const el = document.getElementById(opts.canvas);
            
            if(el instanceof HTMLCanvasElement) {
                appOptions.view = el;
                acceptedCanvas = true;
            }
            else if(el instanceof HTMLElement) {
                parent = el;
            }
            // If opts.canvas is HTMLCanvasElement, pass that on to PIXI.
        } else if(opts.canvas instanceof HTMLCanvasElement) {
            appOptions.view = opts.canvas;
            acceptedCanvas = true;
        }
        
        console.log(appOptions);
        this._app = new PIXI.Application(appOptions);

        // Only append the apps view if no canvas was provided
        if(!acceptedCanvas) {
            parent.appendChild(this._app.view);
        }
    }
}

export interface IGameOptions {
    width?: number;
    height?: number;
    canvas?: string | HTMLElement;
    transparent?: boolean;
    antialias?: boolean;
    preserveBuffer?: boolean;
}