export default CompositeXform;
declare class CompositeXform extends BaseXform {
    createNewModel(node: any): {};
    parseOpen(node: any): boolean;
    parser: any;
    onParserClose(name: any, parser: any): void;
    parseClose(name: any): boolean;
}
import BaseXform from "./base-xform.js";
