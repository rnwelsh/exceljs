import XLSX from "../xlsx/xlsx.js";
'use strict';
class ModelContainer {
    constructor(model) {
        this.model = model;
    }
    get xlsx() {
        if (!this._xlsx) {
            this._xlsx = new XLSX(this);
        }
        return this._xlsx;
    }
}
export default ModelContainer;
