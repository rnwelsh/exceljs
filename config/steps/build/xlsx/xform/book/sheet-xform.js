import BaseXform from "../base-xform.js";
class WorksheetXform extends BaseXform {
    render(xmlStream, model) {
        xmlStream.leafNode('sheet', {
            sheetId: model.id,
            name: model.name,
            state: model.state,
            'r:id': model.rId,
        });
    }
    parseOpen(node) {
        if (node.name === 'sheet') {
            this.model = {
                name: utils.xmlDecode(node.attributes.name),
                id: parseInt(node.attributes.sheetId, 10),
                state: node.attributes.state,
                rId: node.attributes['r:id'],
            };
            return true;
        }
        return false;
    }
    parseText() { }
    parseClose() {
        return false;
    }
}
export default WorksheetXform;
