const { ApolloServer , gql } = require('apollo-server')

const typeDefs = gql`
    type Country {
        country_name: String
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