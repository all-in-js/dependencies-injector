import Container, { IContainer, ArgsItemType } from './container';
interface TypedDescriptor extends TypedPropertyDescriptor<any> {
    initializer: Function;
}
declare const container: IContainer;
export declare function Injectable(target: FunctionConstructor): void;
export declare function Inject(...agrs: Array<ArgsItemType>): (target: FunctionConstructor, name: string | symbol, descriptor: TypedDescriptor) => TypedDescriptor | {
    new (...args: any[]): {
        apply(this: Function, thisArg: any, argArray?: any): any;
        call(this: Function, thisArg: any, ...argArray: any[]): any;
        bind(this: Function, thisArg: any, ...argArray: any[]): any;
        toString(): string;
        prototype: any;
        readonly length: number;
        arguments: any;
        caller: Function;
        readonly name: string;
        [Symbol.hasInstance](value: any): boolean;
    };
};
export declare const ContainerClass: typeof Container;
export default container;
