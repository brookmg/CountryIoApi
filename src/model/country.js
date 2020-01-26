const { Model } = require('objection')

class Country extends Model {

    static get tableName() {
        return 'country';
    }

}

exports.Country = Country;