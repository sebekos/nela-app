import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import { uuid } from "uuidv4";
import timeFormat from "../../../utils/timeFormat";

const useStyles = makeStyles({
    container: {
        margin: "2rem auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr"
        }
    },
    root: {
        width: 400,
        height: 300,
        margin: 5,
        border: "1px solid #E8E8E8"
    },
    content: {
        position: "relative",
        height: "100%"
    },
    title: {
        fontSize: 15,
        fontWeight: "bold"
    },
    date: {
        position: "absolute",
        bottom: 0,
        right: 5
    }
});

const GenPanels = ({ value, index, data, incDate = 1 }) => {
    const classes = useStyles();
    if (value !== index) return null;
    return (
        <div className={classes.container} hidden={value !== index}>
            {data.map((item) => (
                <Card className={classes.root} key={uuid()}>
                    <CardContent className={classes.content}>
                        {item.title && (
                            <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                                {item.title}
                            </Typography>
                        )}
                        <Typography variant="body2" component="p" gutterBottom>
                            {item.text}
                        </Typography>
                        <Typography className={classes.date} color="textSecondary" variant="body2" component="p" align="right">
                            {incDate ? timeFormat(item.createdAt) : ""}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default GenPanels;
