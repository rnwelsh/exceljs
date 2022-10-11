export default Note;
declare class Note {
    static fromModel(model: any): Note;
    constructor(note: any);
    note: any;
    set model(arg: any);
    get model(): any;
}
declare namespace Note {
    namespace DEFAULT_CONFIGS {
        namespace note {
            namespace margins {
                const insetmode: string;
                const inset: number[];
            }
            namespace protection {
                const locked: string;
                const lockText: string;
            }
            const editAs: string;
        }
    }
}
