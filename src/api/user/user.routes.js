const express = require('express');
const router = express.Router();
const queries = require('./user.queries');

router.get('/:mail', async (req, res) => {
    console.log(req.params.mail)
    const user = await queries.findUserByMail(req.params.mail)
	res.json({
        name: user.name,
        surname: user.surname,
        mail: user.mail,
        phone_number: user.phone_number
    });
})

router.get('/', async (req, res) => {
	res.status(400);
})

router.get('/address/:mail', async (req, res) => {
    const address = await queries.getUserAdress(req.params.mail)
    res.json({
        country: address.country,
        postcode: address.postcode,
        city: address.city,
        street: address.street,
        street_number: address.street_number,
        house_number: address.house_number
    })
})
module.exports = router;