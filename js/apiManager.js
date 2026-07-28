// =====================================
// Football World API Manager V8
// =====================================

const API_CACHE_TIME = 5 * 60 * 1000;

// ---------------------
// Cache
// ---------------------

function getCache(key) {

    try {

        const cache = localStorage.getItem(key);

        if (!cache) return null;

        const item = JSON.parse(cache);

        if (Date.now() - item.time > API_CACHE_TIME) {

            localStorage.removeItem(key);

            return null;

        }

        return item.data;

    } catch (e) {

        return null;

    }

}

function saveCache(key, data) {

    localStorage.setItem(

        key,

        JSON.stringify({

            time: Date.now(),

            data: data

        })

    );

}
// ---------------------
// API Football
// ---------------------

async function fetchApiFootball(endpoint) {

    const cacheKey = "fw_" + endpoint;

    const cached = getCache(cacheKey);

    if (cached) {

        return {

            success: true,

            data: cached

        };

    }

    try {

        const response = await fetch(

            API_URL + "/" + endpoint,

            {

                method: "GET",

headers: {
    "x-apisports-key": API_KEY,
    "x-apisports-host": "v3.football.api-sports.io"
}

            }

        );

        if (!response.ok) {

            throw new Error("API Error");

        }

        const data = await response.json();

        if (data.errors && data.errors.requests) {

            return {

                success: false,

                error: "LIMIT"

            };

        }

        saveCache(cacheKey, data);

        return {

            success: true,

            data: data

        };

    } catch (error) {

        console.log(error);

        return {

            success: false,

            error: "NETWORK"

        };

    }

}
// ---------------------
// GNews API
// ---------------------

async function fetchNews(endpoint) {

    const cacheKey = "news_" + endpoint;

    const cached = getCache(cacheKey);

    if (cached) {

        return {

            success: true,

            data: cached

        };

    }

    try {

const response = await fetch(
    `${GNEWS_API_URL}/${endpoint}`
);

        if (!response.ok) {

            throw new Error("News API Error");

        }

const data = await response.json();

console.log("Endpoint:", endpoint);
console.log("API Response:", data);

console.log("API Response:", data);

        saveCache(cacheKey, data);

        return {

            success: true,

            data: data

        };

    } catch (error) {

        console.log(error);

        return {

            success: false,

            error: "NETWORK"

        };

    }

}

// ---------------------
// Helper Functions
// ---------------------

async function getLiveMatches() {
    return await fetchApiFootball("fixtures?live=all");
}

async function getNextMatches() {
    return await fetchApiFootball("fixtures?next=5");
}

async function getStandings(league, season = 2025) {
    return await fetchApiFootball(`standings?league=${league}&season=${season}`);
}

async function getTopScorers(league = 39, season = 2025) {
    return await fetchApiFootball(`players/topscorers?league=${league}&season=${season}`);
}

async function searchTeam(name) {
    return await fetchApiFootball(`teams?search=${encodeURIComponent(name)}`);
}

async function getTeamPlayers(teamId, season = 2025) {
    return await fetchApiFootball(`players?team=${teamId}&season=${season}`);
}

async function getTeamInfo(teamId) {
    return await fetchApiFootball(`teams?id=${teamId}`);
}