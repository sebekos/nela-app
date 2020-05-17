import React from "react";
import classNames from "classnames";
import styles from "./FamilyNode.module.css";

const FamilyNode = ({ node, isRoot, style }) => {
    return (
        <div className={styles.root} style={style}>
            <div className={classNames(styles.inner, styles[node.gender], isRoot && styles.isRoot)} />
            {node.hasSubTree && <div className={classNames(styles.sub, styles[node.gender])} />}
        </div>
    );
};

export default FamilyNode;
