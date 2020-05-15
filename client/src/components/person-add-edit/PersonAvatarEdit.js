import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Slider from "rc-slider";
import PropTypes from "prop-types";
import styled from "styled-components";
import LightButton from "../universal/LightButton";
import GreenButton from "../universal/SuccessButton";
import GenInput from "../universal/GenInput";
import axios from "axios";
import { toast } from "react-toastify";

const Container = styled.div`
    text-align: center;
    margin: 3rem auto;
    display: grid;
    width: 350px;
`;

const PreviewButton = styled(LightButton)`
    width: fit-content;
    margin: auto;
    margin-bottom: 1rem;
`;

const PreviewContainer = ({ onPreview }) => {
    return <PreviewButton onClick={onPreview}>Preview</PreviewButton>;
};

PreviewContainer.propTypes = {
    onPreview: PropTypes.func
};

const SaveButton = styled(GreenButton)`
    width: fit-content;
    margin: auto;
`;

const SaveContainer = ({ onSave }) => {
    return <SaveButton onClick={onSave}>Save</SaveButton>;
};

SaveContainer.propTypes = {
    onSave: PropTypes.func.isRequired
};

const SliderDiv = styled.div``;

const SliderContainer = ({ onScale, scale }) => {
    return (
        <SliderDiv>
            <p>Scale</p>
            <Slider min={0.5} max={3} step={0.1} onChange={(value) => onScale(value)} value={scale} />
        </SliderDiv>
    );
};

SliderContainer.propTypes = {
    onScale: PropTypes.func.isRequired,
    scale: PropTypes.number
};

const SelectFileContainer = styled.div`
    border: 1px solid #ccc;
    display: inline-block;
    padding: 2px 12px;
    cursor: pointer;
    margin: 0 auto 1rem;
    width: max-content;
`;

const SelectFile = ({ onChange, filenames }) => {
    return (
        <SelectFileContainer>
            <GenInput type="file" id="customFile" onChange={onChange} multiple accept="image/*" />
            <label className="custom-file-label" htmlFor="customFile">
                {filenames}
            </label>
        </SelectFileContainer>
    );
};

SelectFile.propTypes = {
    onChange: PropTypes.func.isRequired
};

const AvatarContainer = styled.div`
    border: 1px solid lightgrey;
`;

const AvatarEdit = ({ onEditor, photo, scale }) => {
    return (
        <AvatarContainer>
            <AvatarEditor
                ref={(editor) => onEditor(editor)}
                image={photo !== "" ? photo : ""}
                width={250}
                height={250}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={scale}
                rotate={0}
            />
        </AvatarContainer>
    );
};

const ImagePreviewContainer = styled.div`
    margin: 0 auto 1rem;
    border: 1px solid grey;
    height: 250px;
    width: 250px;
`;

const Image = styled.img`
    height: 250px;
    width: 250px;
`;

const ImagePreview = ({ preview }) => {
    return (
        <ImagePreviewContainer>
            <Image src={preview} alt="" />
        </ImagePreviewContainer>
    );
};

ImagePreview.propTypes = {
    preview: PropTypes.string
};

const PersonAvatarEdit = ({ person_key, setShowUpload }) => {
    const [filenames, setFilenames] = useState("Choose File");
    const [photo, setPhoto] = useState("");
    const [editor, setEditor] = useState("");
    const [preview, setPreview] = useState("");
    const [scale, setScale] = useState(1.2);
    const [file, setFile] = useState("");
    const [scaledImage, setScaledImage] = useState("");

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilenames(e.target.files[0].name);
        var reader = new FileReader();
        reader.onload = function (e) {
            setPhoto(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const onEditor = (editor) => {
        setEditor(editor);
    };

    const onPreview = () => {
        const canvasScaled = editor.getImageScaledToCanvas();
        setPreview(editor.getImageScaledToCanvas().toDataURL());
        canvasScaled.toBlob(function (blob) {
            setScaledImage(blob);
        });
    };

    const onSave = async () => {
        var newfile = new File([scaledImage], "file");
        let formData = new FormData();
        formData.append("person_key", person_key);
        formData.append(`avatar-${person_key}`, newfile);
        await axios
            .post(`/upload/avatar`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    console.log(`${loaded}/${total}`);
                }
            })
            .then(() => {
                toast.success("Avatar uploaded");
                setShowUpload(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onScale = (value) => {
        setScale(value);
    };

    return (
        <Container>
            <SelectFile onChange={onChange} filenames={filenames} />
            <AvatarEdit onEditor={onEditor} photo={photo} scale={scale} editor={editor} />
            {filenames !== "Choose File" ? <SliderContainer scale={scale} onScale={onScale} /> : null}
            {file !== "" ? <PreviewContainer onPreview={onPreview} /> : null}
            {preview !== "" ? <ImagePreview preview={preview} /> : null}
            {preview !== "" ? <SaveContainer onSave={onSave} /> : null}
        </Container>
    );
};

export default PersonAvatarEdit;
