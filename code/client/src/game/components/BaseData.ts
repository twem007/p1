class BaseData {

    public id: number;

    constructor() {

    }

    public reset(): void {
        throw new Error('Reset方法尚未实现，无法Reset数据');
    }

    public clone(): BaseData {
        throw new Error('Clone方法尚未实现，无法Clone数据');
    }
}