//next: function pass request to the next middleware in the chain
module.exports = (req, res, next) => {
    //respond send error immediately if user not log in, do not move on to the next middleware
    if (req.user.id === req.params.setId) {
        return res
            .status(403)
            .send({ error: "you are not owner of this question set" });
    }
    next();
};
