const unixTime = (time) => {
    var utcSeconds = time / 1000;
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    const dateTime = d.toLocaleDateString("en-GB");
    const hourTime = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    return `${dateTime} ${hourTime}`;
};

export default unixTime;
