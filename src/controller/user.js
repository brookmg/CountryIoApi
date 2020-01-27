import { addUser, newToken, findUser } from "../db/userTable";

export async function signUp(req, res) {
    if (!req.body.email || !req.body.password){
        return res.status(400).send({ message : "Email and Password is required."})
    }
    
    try {
        addUser({
            email: req.body.email,
            password: req.body.password
        }).then(insertedUser => {
        
            if (insertedUser != undefined) {
                console.log(insertedUser)
                newToken(insertedUser).then(token => res.status(201).send({ token }));
            } else {
                res.status(401).send({ error: 'Email already exists.'})
            }
        })

    } catch (err) {
        console.error(err)
        return res.status(400).send({ message: "Couldn't signup the user" })
    }  
} 

export async function signIn(req, res) {
    if (!req.body.email || !req.body.password){
        return res.status(400).send({ message : "Email and Password is required."})
    }

    try {
        let user = await findUser(
            req.body.email,
            req.body.password
        )
        
        console.log(user)
        if (user.length === 0) return res.status(401).send({ error: 'Incorrect login. '});
        
        let token = await newToken(user[0]);
        return res.status(201).send({ token })
    } catch (err) {
        console.error(err)
        return res.status(400).send({ message: "Couldn't signup the user" })
    }  
}