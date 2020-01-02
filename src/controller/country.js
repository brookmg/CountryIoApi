import cheerio from 'cheerio'
import axios from 'axios'

/**
 * Handles get requests made to the country endpoint.
 * normally the country name would be in the query section 
 * @example '/country?q=ethiopia'
 * @param {express.req} req 
 * @param {express.res} res 
 */
export function handleCountryGet(req , res) {
    res.send({ "data" : "will be here."})
}

export function handleCountryPost(req , res) {
    
}

export function handleCountryDelete(req , res) {
    /** Stab Method... Nothing to delete yet */
}

export function handleCountryPut(req , res) {
    /** Stab Method... Nothing to put yet */
}

