export default ModelContainer;
declare class ModelContainer {
    constructor(model: any);
    model: any;
    get xlsx(): XLSX;
    _xlsx: XLSX;
}
import XLSX from "../xlsx/xlsx.js";
