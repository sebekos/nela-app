import React, { useState } from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";

import "rc-slider/assets/index.css";

import AvatarShow from "./avatar/AvatarShow";
import AvatarEdit from "./avatar/AvatarEdit";
import FamilyShow from "./family/FamilyShow";
import FamilyEdit from "./family/FamilyEdit";
import InfoShow from "./info/InfoShow";
import InfoEdit from "./info/InfoEdit";

const Container = styled.div`
    position: relative;
    max-width: 800px;
    padding: 0.5rem;
    color: #333;
    margin: 1rem auto;
    box-shadow: 1px 1px 3px 2px #ccc;
`;

const AddEditShow = styled.div`
    display: grid;
    grid-template-areas:
        "avatar info"
        "family family";
`;

const ShowNameContainer = styled.div`
    width: 100%;
    text-align: center;
    border-bottom: 1px solid lightgrey;
    margin-bottom: 0.5rem;
`;

const Item = ({ id }) => {
    const [edit, setEdit] = useState(false);
    const [avatarEdit, setAvatarEdit] = useState(false);
    const [infoEdit, setInfoEdit] = useState(false);
    const [familyEdit, setFamilyEdit] = useState(false);

    const { loading, data } = useQuery(RELATIONS_QUERY, {
        variables: { id: id }
    });

    const onInfoEdit = () => {
        setInfoEdit(!infoEdit);
        setEdit(!edit);
    };

    const onAvatarEdit = () => {
        setAvatarEdit(true);
        setEdit(true);
    };

    const onFamilyEdit = () => {
        setFamilyEdit(true);
        setEdit(true);
    };

    const stopEdit = () => {
        setEdit(false);
        setAvatarEdit(false);
        setInfoEdit(false);
        setFamilyEdit(false);
    };

    return (
        <Container>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ShowNameContainer>
                        {[data.person.first_name, data.person.middle_name, data.person.last_name].filter((item) => item !== null).join(" ")}
                    </ShowNameContainer>
                    {edit && avatarEdit ? <AvatarEdit person_key={id} link={data.person.link_photo} stopEdit={stopEdit} /> : null}
                    {edit && infoEdit ? <InfoEdit data={data.person} stopEdit={stopEdit} /> : null}
                    {edit && familyEdit ? <FamilyEdit person_key={id} family_data={data.relations} stopEdit={stopEdit} /> : null}
                    {!edit ? (
                        <AddEditShow>
                            <AvatarShow link={data.person.link_photo} onAvatarEdit={onAvatarEdit} />
                            <InfoShow data={data.person} onInfoEdit={onInfoEdit} />
                            <FamilyShow family_data={data.relations} onFamilyEdit={onFamilyEdit} />
                        </AddEditShow>
                    ) : null}
                </>
            )}
        </Container>
    );
};

Item.propTypes = {
    id: PropTypes.number
};

const RELATIONS_QUERY = gql`
    query Relations($id: Int!) {
        person(filter: $id) {
            id
            first_name
            middle_name
            last_name
            notes
            link_photo
        }
        relations(filter: $id) {
            tid
            id
            relation
            first_name
            middle_name
            last_name
            notes
        }
    }
`;

export default Item;
