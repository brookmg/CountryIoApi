import express from 'express'
import { json } from 'body-parser'
import CountryRouter from './route/country'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(json())

app.get('/' , (req, res) => { res.send({ message: 'Hello' }) })
app.use(CountryRouter)

export function start() {
    app.listen(3600, () => {
        console.log(`We are live at http://localhost:3400/`)
    })
}