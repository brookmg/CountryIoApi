import cheerio from 'cheerio'
import axios from 'axios'

import { createCountryScheme, insertItem , deleteItem , deleteItemByCountryName, getItemById , getItemByCountryCodeISO2 , getItemByCountryCodeISO3, getItemByCountryName, updateItemById, updateItemByCountryName  } from '../db/countryTable'

/**
 * Handles get requests made to the country endpoint.
 * normally the country name would be in the query section 
 * @example '/country?country=ethiopia'
 * @param {express.req} req 
 * @param {express.res} res 
 */
export function handleCountryGet(req , res) {
    let country = req.query.country;
    let returnableJSON = {};
    
    if (!country)
        return res.status(406).send({
            status: 406,
            error: "country query is required.",
            data: {}
        })

    getItemByCountryName(country)
        .then(countryDetail => {
            res.status(200).send(
                countryDetail.toJSON()
            )
        })
        .catch(error => {
            axios.get(`http://country.io/${country}`).then(returned => {
                let c = cheerio.load(returned.data);
                let tds = c('td');
        
                for (var i = 0; i < tds.length; i = i+3) {
                    returnableJSON[`${tds[i].children[0].children[0].data}`] = tds[i+1].children[0].data
                }
                
                res.send({
                    status: 200,
                    error: {},
                    data: returnableJSON
                })
            }).catch(err => {
                res.status(err.response ? err.response.status : 500).send({
                    status: err.response ? err.response.status : 500,
                    error: err.response ? err.response.data : 'Internal Error',
                    data: {}
                })
            })
        })
}

export function handleCountryPost(req , res) {
    createCountryScheme()
        .then(() => {
            console.log(req.body)
            if (req.body) insertItem(req.body).then(() => res.status(200).send({ status: 200}))
                .catch(err => res.status(500).send(err))
        });
}

export function handleCountryDelete(req , res) {
    if (req.body.id) deleteItem(req.body.id)
        .then(() => res.status(200).send({ status: 200 }))
        .catch(err => res.status(500).send(err));
    else if (req.body.name) deleteItemByCountryName(req.body.name)
        .then(() => res.status(200).send({ status: 200 }))
        //.catch(err => res.status(500).send(err))
}

export function handleCountryPut(req , res) {
    if (req.body.id !== undefined && req.body.update) {
        createCountryScheme()
            .then(() => {
                console.log(req.body)
                updateItemById(req.body.id , req.body.update)
                    .then(() => res.status(200).send({ status: 200}))
                    .catch(err => res.status(500).send(err))
            })
    } else if (req.body.country_name && req.body.update) {
        createCountryScheme()
            .then(() => {
                console.log(req.body)
                updateItemByCountryName(req.body.country_name , req.body.update)
                    .then(() => res.status(200).send({ status: 200}))
                    .catch(err => res.status(500).send(err))
            })
    } else {
        console.log(req.body.id , req.body.update , req.body.country_name)
        res.status(406).send({
            status: 406,
            error: 'Something is missing.'
        })
    }
}

