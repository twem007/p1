module core {
	export class ImageFactory {

		private static s_instance: ImageFactory;

		private m_caches: Dictionary<egret.Bitmap[]>;

		public static get instance(): ImageFactory {
			if (!ImageFactory.s_instance) {
				ImageFactory.s_instance = new ImageFactory();
			}
			return ImageFactory.s_instance;
		}

		public constructor() {
			this.m_caches = new Dictionary<egret.Bitmap[]>();
		}

		public getImage(resFile: string, resName: string, isCenter: boolean = false): egret.Bitmap {
			if (!resFile || resFile == 'undefined' || resFile == 'null') {
				return null;
			}
			let key: string = this.getFormatKey(resFile, resName);
			let imageList: egret.Bitmap[] = this.m_caches.get(key);
			if (!imageList) {
				imageList = [];
				this.m_caches.add(key, imageList);
			}
			if (imageList.length > 0) {
				return imageList.pop();
			} else {
				let texture: egret.Texture = RES.getRes(`${resFile}_json.${resName}`);
				if (texture) {
					let bitmap: egret.Bitmap = new egret.Bitmap(texture);
					if (isCenter) {
						bitmap.anchorOffsetX = bitmap.width * 0.5;
						bitmap.anchorOffsetY = bitmap.height * 0.5;
					}
					bitmap['key'] = key;
					return bitmap;
				} else {
					return null;
				}
			}
		}

		/**
		* 归还图片
		*/
		public revertImage(image: egret.Bitmap): void {
			if (image) {
				let key: string = image['key'];
				if (image.parent) {
					image.parent.removeChild(image);
				}
				let imageList: egret.Bitmap[] = this.m_caches.get(key);
				if (imageList) {
					imageList.push(image);
				}
			}
		}

		/**
		 * 格式化缓存KEY
		 * @param mcFile    影片剪辑文件名前缀
		 * @param mcName    影片剪辑名称
		 */
		public getFormatKey(resFile: string, resName: string): string {
			return `${resFile}>${resName}`;
		}

		/**
         * 检查图片是否有效
         * @param resFile    图片文件名前缀
         * @param resName    图片名称
         * @param image      图片
         */
		public checkValid(resFile: string, resName: string, image: egret.Bitmap): boolean {
			return image && this.getFormatKey(resFile, resName) === this.getCacheKey(image);
		}
        /**
         * 得到图片的缓存KEY
         * @param mc        影片剪辑
         */
		public getCacheKey(image: egret.Bitmap): string {
			return image && image['key'];
		}
		/**
         * 清空缓存
         */
		public clear(mcFile: string, mcName: string): void {
			this.m_caches.remove(this.getFormatKey(mcFile, mcName));
		}
        /**
         * 清空所有缓存
         */
		public clearAll(): void {
			this.m_caches.clear();
		}
	}
}