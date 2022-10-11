export function nop(): void;
export function promiseImmediate(value: any): Promise<any>;
export function dateToExcel(d: any, date1904: any): number;
export function excelToDate(v: any, date1904: any): Date;
export function parsePath(filepath: any): {
    path: any;
    name: any;
};
export function getRelsPath(filepath: any): string;
export function xmlEncode(text: any): any;
export function xmlDecode(text: any): any;
export function validInt(value: any): number;
export function isDateFmt(fmt: any): boolean;
export function exists(path: any): Promise<any>;
export function toIsoDateString(dt: any): any;
export function parseBoolean(value: any): boolean;
export function inherits(cls: any, superCtor: any, statics: any, prototype: any): void;
export const xmlDecodeRegex: RegExp;
