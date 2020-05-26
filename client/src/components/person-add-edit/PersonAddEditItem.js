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
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
`;

const AddEditShow = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
`;

const Item = ({ data }) => {
    const { data: relationsData } = useQuery(RELATIONS_QUERY, {
        variables: { id: data.id }
    });

    const [edit, setEdit] = useState(false);
    const [avatarEdit, setAvatarEdit] = useState(false);
    const [infoEdit, setInfoEdit] = useState(false);
    const [familyEdit, setFamilyEdit] = useState(false);

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
            {edit && avatarEdit ? <AvatarEdit person_key={data.id} link={data.link_photo} stopEdit={stopEdit} /> : null}
            {edit && infoEdit ? <InfoEdit data={data} stopEdit={stopEdit} /> : null}
            {edit && familyEdit ? <FamilyEdit person_key={data.id} family_data={relationsData} stopEdit={stopEdit} /> : null}
            {!edit ? (
                <AddEditShow>
                    <AvatarShow link={data.link_photo} onAvatarEdit={onAvatarEdit} />
                    <InfoShow data={data} onInfoEdit={onInfoEdit} />
                    <div />
                    <FamilyShow family_data={relationsData} onFamilyEdit={onFamilyEdit} />
                </AddEditShow>
            ) : null}
        </Container>
    );
};

Item.propTypes = {
    data: PropTypes.object.isRequired
};

const RELATIONS_QUERY = gql`
    query Relations($id: Int!) {
        children(filter: $id) {
            tid
            id
            first_name
            middle_name
            last_name
            birth_date
            passed_date
        }
        parents(filter: $id) {
            tid
            id
            first_name
            middle_name
            last_name
            birth_date
            passed_date
        }
        siblings(filter: $id) {
            tid
            id
            first_name
            middle_name
            last_name
            birth_date
            passed_date
        }
        spouses(filter: $id) {
            tid
            id
            first_name
            middle_name
            last_name
            birth_date
            passed_date
        }
    }
`;

export default Item;
