module core {
    /**
     * 工厂接口
     */
    interface IFactory {
        /**
         * 创建实例
         */
        create<T>(data?: any): T;
    }
}