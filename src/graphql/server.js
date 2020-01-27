const { ApolloServer , gql } = require('apollo-server')

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

    type Query {
        country(name : String) : Country
        countryById(id : Int) : Country
    }
`

const resolvers = {
    Query : {
        country: (name) => {
            return {
                country_name: 'Ethiopia'
            }
        },
        countryById: (id) => {
            return {
                country_name: 'Ethiopia'
            }
        }
    }
}

export async function startApolloServer() {
    const aServer = new ApolloServer({ typeDefs , resolvers });
    return aServer.listen({ port: 3700 }).then( url => {
        console.log(`Server running on:` , url)
    })
}