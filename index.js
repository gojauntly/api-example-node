const GoJauntlyApi = require('./GoJauntlyApi');

const client = new GoJauntlyApi(
    '[KEY ID]',
    '[PEM FILE PATH]',
    '[ISSUER ID]'
);

async function exampleCuratedWalkSearch() {
    try {
        const data = {
            lat: 52.414337,
            lon: -4.081806,
            radius: 2,
            username: "gojauntly",
            sort: "rankHighest",
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
        const id = "14312567863811772911";
        const data = { shallow: false };
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
            details: ["potentially_unsuitable"],
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

exampleDynamicRoutesRoute();
