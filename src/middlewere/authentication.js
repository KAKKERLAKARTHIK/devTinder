const adminAuthentication = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("admin authentication called");
    if (token === "karthik") {
        next();
    } else {
        res.status(401).send("unauthorized");
    }
}
const userAuthentication = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("user authentication called",token);
    if (token === "karthik") {
        next();
    } else {
        res.status(401).send("unauthorized");
    }
}
module.exports = {
    // adminAuthentication,
    userAuthentication
};