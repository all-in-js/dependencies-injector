declare type MapType = Map<any, any>;
declare type DepsType = object | MapType | undefined;
export declare type ArgsItemType = string | Function;
export interface IContainer {
    add: (name: string, value: any) => void;
    resolve: (...agrs: Array<ArgsItemType>) => Array<any>;
}
export default class Container implements IContainer {
    constructor(initDeps?: DepsType);
    /**
     * 添加依赖项
     * @param name 依赖的名称
     * @param value 依赖的值
     */
    add(name: string, value: any): void;
    /**
     * 根据key解析依赖
     */
    resolve(...params: any[]): any[];
}
export {};
