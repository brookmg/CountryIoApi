import { authGraphQL } from '../util/auth';

const { ApolloServer , gql } = require('apollo-server')
const CountryTable = require('../db/countryTable')
const User = require('../db/userTable')

const typeDefs = gql`
    type Country {
        country_name: String
        dialing_code: String
        iso2: String
        iso3: String
        capital: String
        main_lang: String

        currency: String
        gdp: String
        population: String

        # GEO ---
        continent: String
        location: String
        land: String
        climate: String
        national_hazzards: String
        note: String
        terrain: String

        # DEMO --- 
        life_exp: String
        median_age: String
        birth_date: String
        death_rate: String
        sex_ratio: String
        literacy: String

        # TRANSPORTATION ---
        roadways: String
        railways: String
        airports: String
        waterways: String
        heliports: String
        airports_paved: String

        # ECONOMY
        gdp_per_capita: String
    }

    input CountryInput {
        country_name: String
        dialing_code: String
        iso2: String
        iso3: String
        capital: String
        main_lang: String

        currency: String
        gdp: String
        population: String

        # GEO ---
        continent: String
        location: String
        land: String
        climate: String
        national_hazzards: String
        note: String
        terrain: String

        # DEMO --- 
        life_exp: String
        median_age: String
        birth_date: String
        death_rate: String
        sex_ratio: String
        literacy: String

        # TRANSPORTATION ---
        roadways: String
        railways: String
        airports: String
        waterways: String
        heliports: String
        airports_paved: String

        # ECONOMY
        gdp_per_capita: String
    }

    type Query {
        country(name : String) : Country
        countryById(id : Int) : Country

        #Auth required mutations
        deleteCountry(name: String) : [Country]
        updateCountry(id: Int, update: CountryInput) : Country
        addCountry(country: CountryInput) : Country
    }

`

const resolvers = {
    Query : {
        country: (_, args) => {
            return CountryTable.getItemByCountryName(args.name)
        },

        countryById: (_, args) => {
            return CountryTable.getItemById(args.id)
        },

        addCountry: (_ , args, { user }) => {
            if (user == null) throw Error("Authentication Failed - No user present")
            return CountryTable.insertItem(args.country)
        },

        deleteCountry: async (_, args, { user }) => {
            if (user == null) throw Error("Authentication Failed - No user present")

            if (! await User.isUserAdmin(user.id)) throw Error("Authentication Failed - User not an admin")
            return CountryTable.deleteItemByCountryName(args.name)
        },

        updateCountry: async (_, args, { user }) => {
            if (user == null) throw Error("Authentication Failed - No user present")

            if (! await User.isUserAdmin(user.id)) throw Error("Authentication Failed - User not an admin")
            const updated = await CountryTable.updateItemById(args.id , args.update)
            console.log(updated)
            return updated
        }

    }
}

export async function startApolloServer() {
    const aServer = new ApolloServer({ typeDefs , resolvers, async context({req /* Coming from express */}) {
        return { user: await authGraphQL(req) }
    } });
    return aServer.listen({ port: 3700 }).then( url => {
        console.log(`Server running on:` , url.url)
    })
}