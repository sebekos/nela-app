import React from "react";
import FamilyNode from "../parts/FamilyNode";
import styles from "../parts/FamilyTree.module.css";
import ReactFamilyTree from "react-family-tree";
import { useQuery } from "@apollo/react-hooks";
import { singleTree } from "../../../../utils/tree";
import gql from "graphql-tag";

const WIDTH = 100;
const HEIGHT = 100;

const Tree2 = ({ person_key }) => {
    const { data, loading } = useQuery(TREE1_QUERY, {
        variables: {
            id: person_key
        }
    });
    return (
        <div className={styles.root}>
            {loading ? <p>Loading...</p> : null}
            {!loading && data ? (
                <ReactFamilyTree
                    nodes={singleTree(data)}
                    rootId={person_key}
                    width={WIDTH}
                    height={HEIGHT}
                    className={styles.tree}
                    renderNode={(node) => (
                        <FamilyNode
                            key={node.id}
                            node={node}
                            isRoot={node.id === person_key}
                            style={{
                                width: 100,
                                height: 100,
                                transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`
                            }}
                        />
                    )}
                />
            ) : null}
        </div>
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
