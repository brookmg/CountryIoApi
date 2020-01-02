import cheerio from 'cheerio'
import axios from 'axios'

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
        res.status(err.response.status).send({
            status: err.response.status,
            error: err.response.data,
            data: {}
        })
    })
}

export function handleCountryPost(req , res) {
    let country = req.body.country;
    let returnableJSON = {};
    
    if (!country)
        return res.status(406).send({
            status: 406,
            error: `country query is required.`,
            data: {}
        })

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
        res.status(err.response.status).send({
            status: err.response.status,
            error: err.response.data,
            data: {}
        })
    })
}

export function handleCountryDelete(req , res) {
    /** Stab Method... Nothing to delete yet */
}

export function handleCountryPut(req , res) {
    /** Stab Method... Nothing to put yet */
}

