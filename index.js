const { GraphQLServer } = require("graphql-yoga");
const _ = require("lodash");

const typeDefs = `
    type Query {
        cities: [City!]!
        city(id: Int!): City!
    }

    type Mutation {
        addCity(city: String!, avgTempC: Int!, avgTempF: Int!): City!
        deleteCity(id: Int!): [City!]!
        updateCity(id: Int!, city: String!, avgTempC: Int!, avgTempF: Int!): City!
    }

    type City {
        id: Int!
        city: String!
        avgTempC: Int!
        avgTempF: Int!
    }
`

const cities = [
    {
        id: 1,
        city: "Zagreb",
        avgTempC: 27,
        avgTempF: 81
    },
    {
        id: 2,
        city: "London",
        avgTempC: 23,
        avgTempF: 74
    },
    {
        id: 3,
        city: "Paris",
        avgTempC: 25,
        avgTempF: 77
    },
    {
        id: 4,
        city: "Provo",
        avgTempC: 35,
        avgTempF: 94
    },
    {
        id: 5,
        city: "Merthyr Tydfil",
        avgTempC: 20,
        avgTempF: 67
    },
    {
        id: 6,
        city: "Sao Paulo",
        avgTempC: 23,
        avgTempF: 73
    },
    {
        id: 7,
        city: "Johannesburg",
        avgTempC: 17,
        avgTempF: 63
    },
    {
        id: 8,
        city: "New York",
        avgTempC: 29,
        avgTempF: 85
    },
    {
        id: 9,
        city: "Los Angeles",
        avgTempC: 29,
        avgTempF: 83
    },
    {
        id: 10,
        city: "Riga",
        avgTempC: 24,
        avgTempF: 75
    }
]

const resolvers = {
    Query: {
        cities: () => cities,
        city: (context, args) => {
            return cities[args.id]
        }
    },
    Mutation: {
        addCity: (context, args) => {
            const { city, avgTempC, avgTempF } = args;
            const newCity = {
                city,
                avgTempC,
                avgTempF,
                id: cities.length + 1
            }
            cities.push(newCity);
            return newCity;
        },
        deleteCity: (context, args) => {
            let index = _.findIndex(cities, ['id', args.id])
            if (index !== -1) {
                cities.splice(index, 1);
            }
            return cities;
        },
        updateCity: (context, args) => {
            const { id, city, avgTempC, avgTempF } = args;
            let index = _.findIndex(cities, ['id', id])
            if (index !== -1){
                cities[index].city = city
                cities[index].avgTempC = avgTempC
                cities[index].avgTempF = avgTempF
            }
            return cities[index]
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log("The weather is great on 4000!"));