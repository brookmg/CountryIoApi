import { Country } from '../model/country'
import { Knex } from './db'

Country.knex(Knex);

// --- Create scheme functions ----

export async function createCountryScheme() {
    if (await Knex.schema.hasTable('country')) return; // We don't need to create it again

    return Knex.schema.createTable('country', table => {
        table.increments('id').primary();

        table.string('country_name');
        table.string('dialing_code');
        table.string('iso2');
        table.string('iso3');
        table.string('capital');
        table.string('main_lang');

        table.string('currency');
        table.string('gdp');
        table.string('population');

        // GEO ---
        table.string('continent');
        table.string('location');
        table.string('land');
        table.string('climate');
        table.string('national_hazzards');
        table.string('note');
        table.string('terrain');

        // DEMO --- 
        table.string('life_exp');
        table.string('median_age');
        table.string('birth_date');
        table.string('death_rate');
        table.string('sex_ratio');
        table.string('literacy');

        // TRANSPORTATION ---
        table.string('roadways');
        table.string('railways');
        table.string('airports');
        table.string('waterways');
        table.string('heliports');
        table.string('airports_paved');

        //ECONOMY
        table.string('gdp_per_capita');

    })

}

export async function insertItem(countryData) {
    return Country.query().insert(countryData);
}

export async function deleteItem(id) {
    return Country.query().deleteById(id);
}

export async function deleteItemByCountryName(country) {
    return Country.query().delete().where('country_name' , country).execute();
}

export async function getItemById(id) {
    return Country.query().findById(id);
}

export async function getItemByCountryCodeISO3(iso3) {
    return Country.query().findOne({
        iso3: iso3
    })
}

export async function getItemByCountryCodeISO2(iso2) {
    return Country.query().findOne({
        iso2: iso2
    })
}

export async function getItemByCountryName(countryName) {
    return Country.query().findOne({
        country_name: countryName
    })
}
