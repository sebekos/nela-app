const errorMsg = (msg) => {
    return {
        errors: [
            {
                msg: msg
            }
        ]
    };
};

module.exports = {
    errorMsg
};
