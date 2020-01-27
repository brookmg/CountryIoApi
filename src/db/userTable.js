import { Knex } from './db'
import { User } from '../model/user'
const jwt = require('jsonwebtoken')

User.knex(Knex)

export async function createTableScheme() {
    if (await Knex.schema.hasTable('user')) return;

    return Knex.schema.createTable('user', table => {
        table.increments('id').primary()

        table.string('full_name')
        table.string('email').unique()
        table.string('password')
        table.boolean('is_active').defaultTo(true)
        table.string('user_name').unique()
        table.string('phone_number').unique()
        table.boolean('is_admin').defaultTo(false)

    })
}

export async function addUser(user) {
    if (!user || !user.email || !user.password) return;

    const exUser = await User.query().where('email', user.email).execute()
    if (exUser.length > 0) {
        return;
    }

    const create = await createTableScheme();
    return await User.query().insert(user)

}

export async function newToken(user) {
    return jwt.sign({id : user.id} , '0x03BAD20FAE')    // Will be changed to something like RSA , or fetched from env variables
}

export async function verifyToken(token) {
    return jwt.verify(token, '0x03BAD20FAE')  // Will be changed to something like RSA , or fetched from env variables
}

export async function isUserAdmin(userId) {
    const user = await User.query().findById(userId).execute();
    console.log(user)
    if (user == undefined) return false;
    else if (user.is_admin) {
        return true;
    } else return false;
}

export async function findUser(email, password) {
    return User.query().where('email' , email).andWhere('password' , password).limit(1).execute();
}

export async function updateUser(id , update) {
    update.id = undefined
    return User.query().where('id' , id).update(update);
}

export async function DeleteUser(id) {
    return User.query().deleteById(id);
}

