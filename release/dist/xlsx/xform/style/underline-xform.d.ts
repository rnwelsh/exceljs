export default UnderlineXform;
declare class UnderlineXform extends BaseXform {
    constructor(model: any);
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseText(): void;
    parseClose(): boolean;
}
declare namespace UnderlineXform {
    namespace Attributes {
        const single: {};
        namespace double {
            const val: string;
        }
        namespace singleAccounting {
            const val_1: string;
            export { val_1 as val };
        }
        namespace doubleAccounting {
            const val_2: string;
            export { val_2 as val };
        }
    }
}
import BaseXform from "../base-xform.js";
