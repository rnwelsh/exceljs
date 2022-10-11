export default Image;
declare class Image {
    constructor(worksheet: any, model: any);
    worksheet: any;
    set model(arg: {
        type: any;
        imageId: any;
        hyperlinks: any;
        range: {
            tl: any;
            br: any;
            ext: any;
            editAs: any;
        };
    } | {
        type: any;
        imageId: any;
        hyperlinks?: undefined;
        range?: undefined;
    });
    get model(): {
        type: any;
        imageId: any;
        hyperlinks: any;
        range: {
            tl: any;
            br: any;
            ext: any;
            editAs: any;
        };
    } | {
        type: any;
        imageId: any;
        hyperlinks?: undefined;
        range?: undefined;
    };
    type: any;
    imageId: any;
    range: any;
}
