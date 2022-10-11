export default TypedStack;
declare class TypedStack {
    constructor(type: any);
    _type: any;
    _stack: any[];
    get size(): number;
    pop(): any;
    push(instance: any): void;
}
