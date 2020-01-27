import { Router } from 'express'
import { handleCountryDelete } from '../controller/country'
import { handleCountryGet } from '../controller/country'
import { handleCountryPost } from '../controller/country'
import { handleCountryPut } from '../controller/country'

const authMiddleWare = require('../util/auth')

const router = Router();

router.route("/country")
    .get(handleCountryGet)
    .post(authMiddleWare.authMiddleWare, handleCountryPost)
    .put(authMiddleWare.authMiddleWare, handleCountryPut)
    .delete(authMiddleWare.authMiddleWare, handleCountryDelete)

export default router;