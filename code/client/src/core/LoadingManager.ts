module core {
    export class LoadingManager {

        private static s_loading: Dictionary<ILoadingUI> = new Dictionary<ILoadingUI>();

        constructor() {

        }

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
    }
}