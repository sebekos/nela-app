import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import { uuid } from "uuidv4";
import timeFormat from "../../../utils/timeFormat";

const useStyles = makeStyles({
    container: {
        margin: "2rem auto"
    },
    root: {
        maxWidth: 1100,
        margin: 10
    },
    content: {
        position: "relative",
        height: "100%"
    },
    title: {
        fontSize: 15,
        fontWeight: "bold"
    },
    text: {
        whiteSpace: "pre-wrap"
    },
    date: {
        position: "absolute",
        bottom: 0,
        right: 5
    }
});

const ReunionPanels = ({ value, index, data }) => {
    const classes = useStyles();
    if (value !== index) return null;
    return (
        <div className={classes.container} hidden={value !== index}>
            {data.map((item) => (
                <Card className={classes.root} variant="outlined" key={uuid()}>
                    <CardContent className={classes.content}>
                        {item.title && (
                            <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                                {item.title}
                            </Typography>
                        )}
                        <Typography className={classes.text} variant="body2" component="p" gutterBottom>
                            {item.text}
                        </Typography>
                        <Typography className={classes.date} color="textSecondary" variant="body2" component="p" align="right">
                            {timeFormat(item.createdAt)}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ReunionPanels;
