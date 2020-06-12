import React, { Fragment, useState } from "react";
import ImgsViewer from "react-images-viewer";
import PreviewPhotos from "./PreviewPhotos";
import PropTypes from "prop-types";

const PhotoViewer = ({ photos }) => {
    const [currImg, setCurrImg] = useState(0);
    const [open, setOpen] = useState(false);

    const onNextImg = () => {
        setCurrImg(currImg + 1);
    };

    const onPrevImg = () => {
        setCurrImg(currImg - 1);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onClickThumbnail = (e) => {
        photos.forEach((photo, index) => {
            if (e.target.src.includes(photo.link_thumb)) setCurrImg(index);
        });
        setOpen(!open);
    };

    return (
        <Fragment>
            <PreviewPhotos onClickThumbnail={onClickThumbnail} photos={photos} />
            <ImgsViewer
                backdropCloseable={true}
                currImg={currImg}
                imgs={photos.map((photo) => {
                    return { src: photo.link_main };
                })}
                isOpen={open}
                onClickPrev={onPrevImg}
                onClickNext={onNextImg}
                onClose={onClose}
                showThumbnails={true}
                onClickThumbnail={onClickThumbnail}
            />
        </Fragment>
    );
};

PhotoViewer.propTypes = {
    photos: PropTypes.array
};

export default PhotoViewer;
