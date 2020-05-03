import Resizer from "react-image-file-resizer";

export const reSizer = (picture) => {
    return new Promise((resolve, reject) =>
        Resizer.imageFileResizer(
            picture,
            2000, //800
            1100, //1100
            "JPEG",
            80,
            0,
            (res) => {
                resolve(res);
            },
            "blob"
        )
    );
};

export const reSizerThumbnail = (picture) => {
    return new Promise((resolve, reject) =>
        Resizer.imageFileResizer(
            picture,
            600, //800
            250, //1100
            "JPEG",
            50,
            0,
            (res) => {
                resolve(res);
            },
            "blob"
        )
    );
};

export const bulkResize = async (pictures) => {
    var imagesObj = [];
    for (let i = 0; i < pictures.length; i++) {
        const thumbnail = await reSizerThumbnail(pictures[i]);
        const reg = await reSizer(pictures[i]);
        imagesObj[i] = { thumbnail, reg };
    }
    return imagesObj;
};
