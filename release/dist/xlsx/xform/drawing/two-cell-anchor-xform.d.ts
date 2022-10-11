export default TwoCellAnchorXform;
declare class TwoCellAnchorXform extends BaseCellAnchorXform {
    map: {
        'xdr:from': CellPositionXform;
        'xdr:to': CellPositionXform;
        'xdr:pic': PicXform;
        'xdr:clientData': StaticXform;
    };
    get tag(): string;
    prepare(model: any, options: any): void;
    render(xmlStream: any, model: any): void;
    parseClose(name: any): boolean;
}
import BaseCellAnchorXform from "./base-cell-anchor-xform.js";
import CellPositionXform from "./cell-position-xform.js";
import PicXform from "./pic-xform.js";
import StaticXform from "../static-xform.js";
