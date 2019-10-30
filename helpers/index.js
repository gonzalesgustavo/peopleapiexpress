module.exports.setPagination = (req, res, next) => {
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    req.pagiQuery = query;
    next();
}

module.exports.verityToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    // check if undefined
    if (typeof bearerHeader !== 'undefined') {
        // split at space
        const [, token] = bearerHeader.split(' ');
        // get token from array 
        req.token = token;
        // call next
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
    }
}