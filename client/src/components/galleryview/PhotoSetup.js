import React from "react";
import { uuid } from "uuidv4";

const PhotoSetup = ({ photos }) => {
    return (
        <div>
            {photos.map((photo, index) => {
                return <p key={uuid()}>photo</p>;
            })}
        </div>
    );
};

export default PhotoSetup;
