import {getAddress} from "../../../utils/col-cache.js";
import BaseXform from "../base-xform.js";
class AutoFilterXform extends BaseXform {
    get tag() {
        return 'autoFilter';
    }
    render(xmlStream, model) {
        if (model) {
            if (typeof model === 'string') {
                // assume range
                xmlStream.leafNode('autoFilter', { ref: model });
            }
            else {
                const getAddress = function (addr) {
                    if (typeof addr === 'string') {
                        return addr;
                    }
                    return getAddress(addr.row, addr.column).address;
                };
                const firstAddress = getAddress(model.from);
                const secondAddress = getAddress(model.to);
                if (firstAddress && secondAddress) {
                    xmlStream.leafNode('autoFilter', { ref: `${firstAddress}:${secondAddress}` });
                }
            }
        }
    }
    parseOpen(node) {
        if (node.name === 'autoFilter') {
            this.model = node.attributes.ref;
        }
    }
}
export default AutoFilterXform;
