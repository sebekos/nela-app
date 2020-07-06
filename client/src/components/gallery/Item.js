import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia } from "@material-ui/core";
import { uuid } from "uuidv4";
import { Link } from "react-router-dom";
import timeFormat from "../../utils/timeFormat";

const useStyles = makeStyles({
    container: {
        margin: "0rem auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr"
    },
    root: {
        width: 390,
        height: 300,
        margin: 5,
        border: "1px solid #E8E8E8"
    },
    media: {
        height: 0,
        paddingTop: "61.25%",
        margin: "-20px -20px 0 -20px"
    },
    content: {
        position: "relative",
        height: "100%"
    },
    title: {
        marginTop: ".5rem",
        fontSize: 14
    },
    text: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden"
    },
    date: {
        position: "absolute",
        bottom: 0,
        right: 5
    }
});

const Item = ({ data: { id, title, text, createdAt, thumb_1 } }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Link to={`/galeria/${id}`} style={{ textDecoration: "none", color: "#333" }}>
                <Card className={classes.root} key={uuid()}>
                    <CardContent className={classes.content}>
                        <CardMedia className={classes.media} image={thumb_1} title="Paella dish" />
                        <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                            {title}
                        </Typography>
                        <Typography className={classes.text} variant="body2" component="p" gutterBottom>
                            {text}
                        </Typography>
                        <Typography className={classes.date} color="textSecondary" variant="body2" component="p" align="right">
                            {timeFormat(createdAt)}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </div>
    );
};

export default Item;
