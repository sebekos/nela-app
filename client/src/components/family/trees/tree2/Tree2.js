import React from "react";
import FamilyNode from "../parts/FamilyNode";
import ReactFamilyTree from "react-family-tree";
import { useQuery } from "@apollo/react-hooks";
import { singleTree } from "../../../../utils/tree";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import styled from "styled-components";
import MainInfo from "../parts/MainInfo";
import { CircularProgress } from "@material-ui/core";

const WIDTH = 200;
const HEIGHT = 200;

const Container = styled.div`
    margin: auto;
    padding: 4rem 0 0;
    min-height: 100vh;
    width: max-content;
`;

const MainTitle = styled.div`
    font-size: 3rem;
    color: #3e4444;
    text-align: center;
    padding: 0rem 0 1rem;
    width: 100%;
    background-color: white;
    font-weight: bold;
`;

const DataContainer = styled.div`
    display: grid;
    height: 100%;
    width: max-content;
    margin: auto;
    justify-items: center;
`;

const LoadingContainer = styled.div`
    width: fit-content;
    margin: auto;
    padding: 5rem;
`;

const Loading = () => {
    return (
        <LoadingContainer>
            <CircularProgress />
        </LoadingContainer>
    );
};

const Tree2 = ({ match }) => {
    const { data, loading } = useQuery(TREE1_QUERY, {
        variables: {
            id: parseInt(match.params.id, 10)
        }
    });
    return (
        <Container>
            <MainTitle>Person Info</MainTitle>
            {loading ? <Loading /> : null}
            <DataContainer>
                {!loading && data ? (
                    <>
                        <MainInfo data={data.person} />
                        <ReactFamilyTree
                            nodes={singleTree(data)}
                            rootId={parseInt(match.params.id, 10)}
                            width={WIDTH}
                            height={HEIGHT}
                            renderNode={(node) => (
                                <Link to={`/Rodzina/${node.id}`} key={node.id}>
                                    <FamilyNode
                                        node={node}
                                        isRoot={node.id === parseInt(match.params.id, 10)}
                                        style={{
                                            width: 125,
                                            height: 125,
                                            transform: `translate(${node.left * (WIDTH / 2) + 32}px, ${node.top * (HEIGHT / 2) + 32}px)`
                                        }}
                                    />
                                </Link>
                            )}
                        />
                    </>
                ) : null}
            </DataContainer>
        </Container>
    );
};

const TREE1_QUERY = gql`
    query Tree1($id: Int!) {
        person(filter: $id) {
            id
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

export default Tree2;
