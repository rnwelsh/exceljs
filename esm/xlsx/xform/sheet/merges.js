import {map,each} from "../../../utils/under-dash.js";
import Range from "../../../doc/range.js";
import {decode,encodeAddress} from "../../../utils/col-cache.js";
class Merges {
    constructor() {
        // optional mergeCells is array of ranges (like the xml)
        this.merges = {};
    }
    add(merge) {
        // merge is {address, master}
        if (this.merges[merge.master]) {
            this.merges[merge.master].expandToAddress(merge.address);
        }
        else {
            const range = `${merge.master}:${merge.address}`;
            this.merges[merge.master] = new Range(range);
        }
    }
    get mergeCells() {
        return map(this.merges, merge => merge.range);
    }
    reconcile(mergeCells, rows) {
        // reconcile merge list with merge cells
        each(mergeCells, merge => {
            const dimensions = decode(merge);
            for (let i = dimensions.top; i <= dimensions.bottom; i++) {
                const row = rows[i - 1];
                for (let j = dimensions.left; j <= dimensions.right; j++) {
                    const cell = row.cells[j - 1];
                    if (!cell) {
                        // nulls are not included in document - so if master cell has no value - add a null one here
                        row.cells[j] = {
                            type: 0,
                            address: encodeAddress(i, j),
                        };
                    }
                    else if (cell.type === 1) {
                        cell.master = dimensions.tl;
                    }
                }
            }
        });
    }
    getMasterAddress(address) {
        // if address has been merged, return its master's address. Assumes reconcile has been called
        const range = this.hash[address];
        return range && range.tl;
    }
}
export default Merges;
