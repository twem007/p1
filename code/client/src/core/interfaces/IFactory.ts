module core {
    interface IFactory {
        create<T>(data?: any): T;
    }
}