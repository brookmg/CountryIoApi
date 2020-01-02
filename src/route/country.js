import { Router } from 'express'
import { handleCountryDelete } from '../controller/country'
import { handleCountryGet } from '../controller/country'
import { handleCountryPost } from '../controller/country'
import { handleCountryPut } from '../controller/country'

const router = Router();

router.route("/country")
    .get(handleCountryGet)
    .post(handleCountryPost)
    .put(handleCountryPut)
    .delete(handleCountryDelete)

export default router;