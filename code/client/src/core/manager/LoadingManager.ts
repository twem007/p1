module core {
    /**
     * Loading管理器
     * 本类是管理所有loading
     */
    export class LoadingManager {

        private static s_loading: Dictionary<ILoadingUI> = new Dictionary<ILoadingUI>();

        private static s_curLoading: ILoadingUI;

        constructor() {

        }
        
        /**
         * 获取Loading实例
         * @param  {any} ref    Loading类名
         * @return ILoadingUI   Loading实例
         */
        public static getLoading(ref: any): ILoadingUI {
            let loading: ILoadingUI = LoadingManager.s_loading.get(ref);
            if (!loading) {
                if (ref) {
                    loading = new ref();
                    LoadingManager.s_loading.add(ref, loading);
                }
            }
            return loading;
        }
       
        /**
         * 得到当前Loading组件
         * @return ILoadingUI
         */
        public static getCurLoading(): ILoadingUI {
            return LoadingManager.s_curLoading;
        }
       
        /**
         * 设置当前Loading组件
         * @param  {any} ref    Loading类名
         * @return ILoadingUI   Loading实例
         */
        public static setCurLoading(ref: any): ILoadingUI {
            let loading: ILoadingUI = LoadingManager.s_loading.get(ref);
            if (!loading) {
                if (ref) {
                    loading = new ref();
                    LoadingManager.s_loading.add(ref, loading);
                }
            }
            LoadingManager.s_curLoading = loading;
            return loading;
        }
    }
}