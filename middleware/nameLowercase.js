function lowerCase(req, res, next) {
    const name = req.body.name;
    if (name){
        req.body.name = name.toLowerCase();
    }
    next();
};
module.exports = lowerCase;