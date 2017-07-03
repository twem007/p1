/**
 * 
 */
module core {
	/**
	 *
	 * @author yuxuefeng
	 *
	 */
    export interface ILoadingUI {
        setProgress(progress: Progress): void;

        show(): void;

        hide(): void;
    }

    export class Progress {
        loaded: number;
        total: number;
    }
}
