//next: function pass request to the next middleware in the chain
module.exports = (req, res, next) => {
    //respond send error immediately if user not log in, do not move on to the next middleware
    if (!req.user) {
        return res.status(401).send({ error: "you must log in" });
    }
    next();
};
