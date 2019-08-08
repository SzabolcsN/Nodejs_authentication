const router = require('express').Router();
const verify = require('../verify/verifyToken')

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'Meh',
            description: 'Description!'
        }
    });
});

module.exports = router;