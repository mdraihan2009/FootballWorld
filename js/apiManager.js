// ===============================
// Football World API Manager V6
// Performance Optimized
// ===============================

const API_CACHE_TIME = 5 * 60 * 1000; // 5 Minutes

// ===============================
// API FOOTBALL
// ===============================

async function fetchApiFootball(endpoint){

    const cacheKey = "fw_" + endpoint;

    const cached = localStorage.getItem(cacheKey);

    if(cached){

        const cacheData = JSON.parse(cached);

        if(Date.now() - cacheData.time < API_CACHE_TIME){

            console.log("⚡ API Cache Used");

            return cacheData.data;

        }

    }

    try{

        const response = await fetch(API_URL + endpoint,{

            method:"GET",

            headers:{
                "x-apisports-key":API_KEY
            }

        });

        if(!response.ok){

            throw new Error("API Error");

        }

        const data = await response.json();

        localStorage.setItem(cacheKey,JSON.stringify({

            time:Date.now(),

            data:data

        }));

        return data;

    }catch(error){

        console.log(error);

        return null;

    }

}

// ===============================
// GNEWS
// ===============================

async function fetchNews(endpoint){

    const cacheKey = "news_" + endpoint;

    const cached = localStorage.getItem(cacheKey);

    if(cached){

        const cacheData = JSON.parse(cached);

        if(Date.now() - cacheData.time < API_CACHE_TIME){

            console.log("⚡ News Cache Used");

            return cacheData.data;

        }

    }

    try{

        const response = await fetch(GNEWS_API_URL + endpoint);

        if(!response.ok){

            throw new Error("News API Error");

        }

        const data = await response.json();

        localStorage.setItem(cacheKey,JSON.stringify({

            time:Date.now(),

            data:data

        }));

        return data;

    }catch(error){

        console.log(error);

        return null;

    }

}