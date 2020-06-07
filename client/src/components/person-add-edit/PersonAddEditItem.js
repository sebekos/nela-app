import React, { useState } from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";

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

const CircularContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const Loading = () => {
    return (
        <CircularContainer>
            <CircularProgress />
        </CircularContainer>
    );
};

const Item = ({ id }) => {
    const [edit, setEdit] = useState(false);
    const [avatarEdit, setAvatarEdit] = useState(false);
    const [infoEdit, setInfoEdit] = useState(false);
    const [familyEdit, setFamilyEdit] = useState(false);

    const { loading, data } = useQuery(RELATIONS_QUERY, {
        variables: { id }
    });

    const [refetchPerson, { loading: lazyLoading }] = useLazyQuery(RELATIONS_QUERY, {
        fetchPolicy: "network-only"
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

    const stopEdit = (refetch = false) => {
        setEdit(false);
        setAvatarEdit(false);
        setInfoEdit(false);
        setFamilyEdit(false);
        if (refetch) {
            refetchPerson({
                variables: {
                    id
                }
            });
        }
    };

    return (
        <Container>
            {(loading || lazyLoading) && <Loading />}
            {data && (
                <>
                    <ShowNameContainer>
                        {[data.person.first_name, data.person.middle_name, data.person.last_name].filter((item) => item !== null).join(" ")}
                    </ShowNameContainer>
                    {edit && avatarEdit && <AvatarEdit person_key={id} link={data.person.link_photo} stopEdit={stopEdit} />}
                    {edit && infoEdit && <InfoEdit data={data.person} stopEdit={stopEdit} />}
                    {edit && familyEdit && <FamilyEdit person_key={id} family_data={data.relations} stopEdit={stopEdit} />}
                    {!edit && (
                        <AddEditShow>
                            <AvatarShow link={data.person.link_photo} onAvatarEdit={onAvatarEdit} />
                            <InfoShow data={data.person} onInfoEdit={onInfoEdit} />
                            <FamilyShow family_data={data.relations} onFamilyEdit={onFamilyEdit} />
                        </AddEditShow>
                    )}
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
            birth_date
            birth_location
            passed_date
            notes
            link_photo
        }
        relations(filter: $id) {
            tid
            id
            relation
            info_date
            first_name
            middle_name
            last_name
            notes
        }
    }
`;

export default Item;
