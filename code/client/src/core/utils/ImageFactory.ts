module core {
	/**
	 * 图片工厂
	 * 本类功能：
	 * 1、图片对象池管理
	 * 2、如对象池无图片对象则创建对象
	 */
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
		/**
		 * 通过图集和资源名称获取图片实例
		 * @param  {string} resFile		图集名称
		 * @param  {string} resName		资源名称
		 * @param  {boolean=false} isCenter	是否锚点自动居中
		 * @return egret.Bitmap	图片实例
		 */
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
		 * @param  {egret.Bitmap} image	图片实例
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
		 * 得到图片缓存KEY
		 * @param  {string} resFile	图集名称
		 * @param  {string} resName	资源名称
		 * @return string
		 */
		public getFormatKey(resFile: string, resName: string): string {
			return `${resFile}>${resName}`;
		}

		/**
		 * 检查图片是否匹配图集和资源名称
		 * @param  {string} resFile	图集名称
		 * @param  {string} resName	资源名称
		 * @param  {egret.Bitmap} image	图片实例
		 * @return boolean
		 */
		public checkValid(resFile: string, resName: string, image: egret.Bitmap): boolean {
			return image && this.getFormatKey(resFile, resName) === this.getCacheKey(image);
		}
        /**
         * 得到图片的缓存KEY
         * @param string	缓存key
         */
		public getCacheKey(image: egret.Bitmap): string {
			return image && image['key'];
		}
		/**
		 * 清空缓存
		 * @param  {string} resFile	图集名称
		 * @param  {string} resName	资源名称
		 */
		public clear(resFile: string, resName: string): void {
			this.m_caches.remove(this.getFormatKey(resFile, resName));
		}
        /**
         * 清空所有缓存
         */
		public clearAll(): void {
			this.m_caches.clear();
		}
	}
}