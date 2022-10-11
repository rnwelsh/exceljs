export default DataValidations;
declare class DataValidations {
    constructor(model: any);
    model: any;
    add(address: any, validation: any): any;
    find(address: any): any;
    remove(address: any): void;
}
