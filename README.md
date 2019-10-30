# Rest API for Random People (WKP)

A simple setup of a crud application. 

## Simple Helper functions

JWT verify middleware

```javascript
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
```

Mongoose connection Update issues

```javascript
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log(err);
    console.log('connected to database');
});
// if you want to use findoneanddelete and so on
mongoose.set('useFindAndModify', false);
```

For pagination this might help:

```javascript
// helpers 
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
// route
router.get('/pagination', verityToken, setPagination, async (req, res, next) => {
    try {
        const persons = await Person.find({}, {}, req.pagiQuery);
        res.status(200).json({ results: persons });
    } catch (err) {
        res.sendStatus(412);
    }
});
```

### Routes

/people  METHOD:GET   Requires Token

>> returns all people on database 

/people/:id  METHOD:GET  Reqires Token

>> returns a single person based on an id

/people/pagination?pageNo=1&size=10  METHOD:GET  Reqires Token

>> returns people based on pages and sizes passed in the query string

/login   METHOD:POST  (not fully set up, uses a static user but returns a valid token that does not expire)

>> returns a token

/person    METHOD:POST  Requires token

>> returns saved persons data

/person   METHOD:PATCH   Requires Token

>> returns updated person 