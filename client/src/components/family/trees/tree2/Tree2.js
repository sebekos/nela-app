import React from "react";
import FamilyNode from "../parts/FamilyNode";
import styles from "../parts/FamilyTree.module.css";
import nodes from "../parts/sample.json";
import ReactFamilyTree from "react-family-tree";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const rootId = "HkqEDLvxE";

const WIDTH = 100;
const HEIGHT = 100;

const Tree2 = ({ person_key }) => {
    return (
        <div className={styles.root}>
            <ReactFamilyTree
                nodes={nodes}
                rootId={rootId}
                width={WIDTH}
                height={HEIGHT}
                className={styles.tree}
                renderNode={(node) => (
                    <FamilyNode
                        key={node.id}
                        node={node}
                        isRoot={node.id === rootId}
                        style={{
                            width: 100,
                            height: 100,
                            transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`
                        }}
                    />
                )}
            />
        </div>
    );
};

const SMALL_TREE_QUERY = gql`
    {
        person(filter: 38) {
            first_name
            last_name
        }
    }
`;

export default Tree2;
