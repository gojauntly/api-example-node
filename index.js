const GoJauntlyApi = require('./GoJauntlyApi');

const client = new GoJauntlyApi(
    '[KEY ID]',
    '[PEM FILE PATH]',
    '[ISSUER ID]'
);

async function exampleCuratedWalkSearch() {
    try {
        const data = {
            // lat: 52.414337,
            // lon: -4.081806,
            postcode : "W1J 9BR",
            radius: 2,
            // username: "gojauntly",
            // sort: "rankHighest",
            page: 0,
            amount: 25,
        };
        const response = await client.curatedWalkSearch(data);
        console.log(response);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function exampleCuratedWalkRetrieve() {
    try {
        const id = "1260831589854876137";
        const data = { 
            includeSteps: true 
        };
        const response = await client.curatedWalkRetrieve(id, data);
        console.log(response);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function exampleDynamicRoutesRoute() {
    try {
        const data = {
            points: [
                [51.4403, -2.58994],
                [51.45719, -2.5912]
            ],
            points_encoded: true,
            details: [
                "potentially_unsuitable",
                "potentially_private",
                "road_environment"
            ],
            instructions: true,
            profile: "greenest",
            max_paths: 2
        };
        const response = await client.dynamicRoutesRoute(data);
        console.log(response);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function exampleDynamicRoutesCircular() {
    try {
        const data = {
            start_point: [51.5073386, -0.1412785], // OR postcode
            // postcode : "W1J 9BR",
            ditance: 2000,
            points_encoded: true,
            details: [
                "potentially_unsuitable",
                "potentially_private",
                "road_environment"
            ],
            instructions: true,
            profile: "greenest",
            max_paths: 2
        };
        const response = await client.dynamicRoutesCircular(data);
        console.log(response);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function exampleDynamicRoutesCircularCollection() {
    try {
        const data = {
            categorise: true, // If to return routes in categories like parks and woodland, where available
            start_point: [51.5073386, -0.1412785], // OR postcode
            // postcode : "W1J 9BR",
            distances: [1000, 2000, 4000],
            points_encoded: true,
            details: [
                "potentially_unsuitable",
                "potentially_private",
                "road_environment"
            ],
            instructions: true,
            profile: "greenest",
            max_paths: 2
        };
        const response = await client.dynamicRoutesCircularCollection(data);
        console.log(response);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

exampleCuratedWalkSearch();
// exampleCuratedWalkRetrieve();
// exampleDynamicRoutesRoute();
// exampleDynamicRoutesCircular();
// exampleDynamicRoutesCircularCollection();
