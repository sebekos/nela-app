const unixTime = (time) => {
    const dateTime = new Date(time * 1000).toLocaleDateString("en-US");
    const hourTime = new Date(time * 1000).toLocaleTimeString("en-US");

    return `${dateTime} ${hourTime}`;
};

export default unixTime;
