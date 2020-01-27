const User = require('../db/userTable')

export const authMiddleWare = (req, res, next) => {
    if (!req.headers.authorization) return res.status(403).send({ error: "Authorization key required! "});

    let tokenRaw = req.headers.authorization;
    tokenRaw = tokenRaw.split(' ')[1];

    User.verifyToken(tokenRaw).then(user => {
        console.log(user)
        User.isUserAdmin(user.id).then(
            isAdmin => {
                if (isAdmin) next();
                else res.status(403).send({ error: 'Token belongs to non-admin user. '})
            }
        );
    }).catch(err => {
        res.status(401).send({ error: 'Invalid token provided. '})
    });
    
}