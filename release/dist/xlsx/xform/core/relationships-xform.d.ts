export default RelationshipsXform;
declare class RelationshipsXform extends BaseXform {
    map: {
        Relationship: RelationshipXform;
    };
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
declare namespace RelationshipsXform {
    namespace RELATIONSHIPS_ATTRIBUTES {
        const xmlns: string;
    }
}
import BaseXform from "../base-xform.js";
import RelationshipXform from "./relationship-xform.js";
