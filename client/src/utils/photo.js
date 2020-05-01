import Resizer from "react-image-file-resizer";

export const reSizer = (picture) => {
    return new Promise((resolve, reject) =>
        Resizer.imageFileResizer(
            picture,
            800,
            1100,
            "JPEG",
            100,
            0,
            (res) => {
                resolve(res);
            },
            "blob"
        )
    );
};

export const bulkResize = async (pictures) => {
    return new Promise(async (resolve, reject) => {
        await Promise.all(
            pictures.map((picture) => {
                return new Promise((resolve, reject) => resolve(reSizer(picture)));
            })
        ).then((results) => {
            resolve(results);
        });
    });
};
