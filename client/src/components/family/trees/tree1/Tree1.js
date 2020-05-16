import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import DefaultAvatar from "../../../../img/defaultavatar.png";
import { uuid } from "uuidv4";
import { Link } from "react-router-dom";

const Container = styled.div``;

const MainContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 350px;
    width: max-content;
    margin: 3rem auto;
`;

const ImageContainer = styled.div``;

const Image = styled.img``;

const TextInfoContainer = styled.div`
    margin-left: 0.5rem;
    border: 1px solid grey;
    max-height: 250px;
`;

const TextInfoTitleContainer = styled.div`
    text-align: center;
    width: max-content;
`;

const TextInfoTitle = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
`;

const TextInfoNotes = styled.div``;

const TextInfoDatesContainer = styled.div``;

const TextInfoDates = styled.span``;

const Main = ({ data }) => {
    return (
        <MainContainer>
            <ImageContainer>
                <Image src={data.link_photo ? `/images/avatars/${data.link_photo}` : DefaultAvatar} alt="avatar" />
            </ImageContainer>
            <TextInfoContainer>
                <TextInfoTitleContainer>
                    <TextInfoTitle>{data.first_name}</TextInfoTitle>
                    <TextInfoTitle>{data.last_name}</TextInfoTitle>
                </TextInfoTitleContainer>
                <TextInfoNotes>{data.notes}</TextInfoNotes>
                <TextInfoDatesContainer>
                    {data.birth_date} - {data.passed_date}
                </TextInfoDatesContainer>
            </TextInfoContainer>
        </MainContainer>
    );
};

const TreeNodeContainer = styled.div`
    margin: 0.5rem;
`;

const TreeNodeImage = styled.img`
    width: 100px;
`;

const TreeNodeName = styled.div`
    text-align: center;
`;

const TreeNode = ({ data }) => {
    return (
        <TreeNodeContainer>
            <Link to={`/Rodzina/${data.id}`}>
                <TreeNodeImage alt="avatar" src={data.link_photo ? `/images/avatars/${data.link_photo}` : DefaultAvatar} />
                <TreeNodeName>
                    <p>{data.first_name}</p>
                    <p>{data.last_name}</p>
                </TreeNodeName>
            </Link>
        </TreeNodeContainer>
    );
};

const ChildrenContainer = styled.div`
    width: max-content;
    margin: auto;
    display: flex;
`;

const NoChildrenContainer = styled.div`
    width: max-content;
    margin: 3rem auto;
    text-align: center;
`;

const NoChildren = () => {
    return <NoChildrenContainer>No Children</NoChildrenContainer>;
};

const Children = ({ data }) => {
    if (data.length === 0) {
        return <NoChildren />;
    }
    return (
        <ChildrenContainer>
            {data.map((item) => (
                <TreeNode key={uuid()} data={item} />
            ))}
        </ChildrenContainer>
    );
};

const NoParentsContainer = styled.div`
    width: max-content;
    margin: 3rem auto;
    text-align: center;
`;

const NoParents = () => {
    return <NoParentsContainer>No Parents</NoParentsContainer>;
};

const Parents = ({ data }) => {
    if (data.length === 0) {
        return <NoParents />;
    }
    return (
        <ChildrenContainer>
            {data.map((item) => (
                <TreeNode key={uuid()} data={item} />
            ))}
        </ChildrenContainer>
    );
};

const NoSpouseContainer = styled.div`
    width: max-content;
    margin: 3rem auto;
    text-align: center;
`;

const SpouseContainer = styled.div`
    width: max-content;
    padding: 0 2rem;
    display: flex;
`;

const NoSpouse = () => {
    return <NoParentsContainer>No Spouse</NoParentsContainer>;
};

const Spouse = ({ data }) => {
    if (data.length === 0) {
        return <NoSpouse />;
    }
    return (
        <SpouseContainer>
            {data.map((item) => (
                <TreeNode key={uuid()} data={item} />
            ))}
        </SpouseContainer>
    );
};

const SiblingsContainer = styled.div`
    width: max-content;
    padding: 0 2rem;
    display: flex;
    height: max-content;
`;

const NoSiblingsContainer = styled.div`
    width: max-content;
    margin: 3rem auto;
    text-align: center;
`;

const NoSiblings = () => {
    return <NoParentsContainer>No Siblings</NoParentsContainer>;
};

const Siblings = ({ data }) => {
    if (data.length === 0) {
        return <NoSiblings />;
    }
    return (
        <SiblingsContainer>
            {data.map((item) => (
                <TreeNode key={uuid()} data={item} />
            ))}
        </SiblingsContainer>
    );
};

const MainSection = styled.div`
    display: grid;
    grid-template-columns: 350px 1fr 350px;
    align-items: center;
    justify-items: center;
`;

const Tree1 = ({ person_key }) => {
    const { data, loading } = useQuery(TREE1_QUERY, {
        variables: {
            id: person_key
        }
    });
    console.log(data);
    return (
        <Container>
            {loading ? <p>Loading...</p> : null}
            {!loading && data ? <Parents data={data.parents} /> : null}
            <MainSection>
                {!loading && data ? <Siblings data={data.siblings} /> : null}
                {!loading && data ? <Main data={data.person} /> : null}
                {!loading && data ? <Spouse data={data.spouses} /> : null}
            </MainSection>
            {!loading && data ? <Children data={data.children} /> : null}
        </Container>
    );
};

const TREE1_QUERY = gql`
    query Tree1($id: Int!) {
        person(filter: $id) {
            first_name
            middle_name
            last_name
            link_photo
            notes
            birth_date
            passed_date
        }
        children(filter: $id) {
            id
            first_name
            middle_name
            last_name
            link_photo
            birth_date
            passed_date
        }
        parents(filter: $id) {
            id
            first_name
            middle_name
            last_name
            link_photo
            birth_date
            passed_date
        }
        siblings(filter: $id) {
            id
            first_name
            middle_name
            last_name
            link_photo
            birth_date
            passed_date
        }
        spouses(filter: $id) {
            id
            first_name
            middle_name
            last_name
            link_photo
            birth_date
            passed_date
        }
    }
`;

export default Tree1;
