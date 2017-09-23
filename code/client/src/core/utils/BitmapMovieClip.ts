module core {
    export class BitmapMovieClip extends core.Animation {

        private m_mcData: egret.MovieClipData;

        private m_bitmap: egret.Bitmap;

        private m_index:number = 0;

        constructor(movieClipData?: egret.MovieClipData) {
            super();
            this.m_mcData = movieClipData;
            this.m_bitmap = new egret.Bitmap();
            this.addChild(this.m_bitmap);
        }

        public onRenderLoop(offset: number): void {
            if (this.parent) {
                
            } else {
                this.stop();
            }
        }

        public play(playTimes?: number): void {

        }

        public release(): void {

        }
    }
}