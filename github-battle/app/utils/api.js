// This is just in case we get rate limited by the API
// Replace with actual id's from oauth on github
const id = "YOUR_CLIENT_ID"
const sec = "YOUR_SECRET_ID"
const params = `?client_id=${id}&client_secret=${sec}`

function getErrorMsg(message, username) {
    if (message === 'Not Found') { // GH's way of telling us the user doesn't exist 
        return `${username} doesn't exist` // a more user friendly way of displaying thie error
    }
    return message
}

// Gets information about user profiles from the API
function getProfile(username) {
    return fetch(`https://api.github.com/users/${username}${params}`) //api endpoint we need to hit
        //https://docs.github.com/en/free-pro-team@latest/rest/reference/users
        .then((res) => res.json()) // need this because fetch
        .then((profile) => {
            if (profile.message) {
                // if the response gives us a message (which means there's an error), show us that message
                throw new Error(getErrorMsg(profile.message, username)) // throw automatically returns it so no `return` necessary here
            }

            // if nothing goes wrong, give us that user's profile info
            return profile;
        })
}

// Gets repos from a sepcific user
function getRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos${params}&per+page=100`)
        .then((res) => res.json())
        .then((repos) => {
            if (repos.message) {
                throw new Error(getErrorMsg(repos.message, username))
            }
            return repos
        })
}

function getStarCount(repos) {
    // the repos object has a "stargrazers  count" that represents how many stars the repos has
    // we want to loop over all of the repos and add up all of the stargazers counts
    // could use a for loop but we're using reduce
    // reduce allows you to convert the array of repos into a single number
    return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0)
    // the second arg is the number we're starting at
    // for each item in the array, the function we have for the first argument will be invoked 
    // each time its invoked count = what the previous function returned. the first time it's zero.
    // ex: first item has 10 stars: 0 + 10 = 10
    // second item has 20 stars: 10 + 20 = 30
    // third item has 7 stars: 30 + 7 = 37 
    // etc. etc.
}

function calculateScore(followers, repos) {
    return (followers * 3) + getStarCount(repos)
    // this is how we're determining who the winner of the battle will be
    // it's taking their number of followers and multiplying it by three
    // then it adds the star count from all of their repos
    // the total is their "score"
}

function getUserData(player) {
    return Promise.all([ // allows us to pass an array of promises
        getProfile(player),
        getRepos(player)
    ]).then(([profile, repos]) => ({ // when this resolves, this function will be called and it's passed an array of whatever the above promises resolve to (repos from a users)
        profile, // returning an object with a profile and its scorn from calculate score
        score: calculateScore(profile.followers, repos)
    }))
}

function sortPlayers(players) {
    return players.sort((a, b) => b.score - a.score)
    // sorting the players so that the higer scoring player is listed first
    // sort compares strings by default and returns them in their alphabetical order
    // to sort numbers, you can subtract b from a to get ascending order
    // in this case, we wanted descending order so we subtracted a from b (highest score first)
    // (we're comparing the score we got from getUserData which is the followers * 3 and total number of stars on their repos)
}

export function battle(players) {
    // takes the data from player one and player two
    // players is an array
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ]).then((results => sortPlayers(results)
        // returns a results array of the info from the players
    ))
}

export function fetchPopularRepos(language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data => {
            if (!data.items) {
                throw new Error(data.message)
            }
            console.log(data);
            console.log(data.items);

            return data.items;
        }))
}
