export default ListXform;
declare class ListXform extends BaseXform {
    constructor(options: any);
    tag: any;
    always: boolean;
    count: any;
    empty: any;
    $count: any;
    $: any;
    childXform: any;
    maxItems: any;
    prepare(model: any, options: any): void;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
import BaseXform from "./base-xform.js";
