export function fetchPopularRepos(language) {
    // "consuming the API" gonna gobble it up so we can poop it back out elsewhere later
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
    // Notes on fetch
    // the fetch method accepts a url (in this case, our github api url)
    // the fetch method returns a promise
    // the promise takes the data response (res) from the API. the response is an
    // object with a series of methods that can be used (this is where all the stuff i was previously
    // confused about comes from). we're converting it into json with the .json() method
    // after that we need to process the JSON with another promise
    // we're saying here that if there are no data items (ex: we hit the response limit)
    // then throw an error. if not, give us all the items in the json response (an array of items)
}

// Notes on promises
// Promises have three states:
// 1. Pending - you don't know if you'll get something
// 2. Fulfilled - you get the thing if it works well
// 3. Rejected - you don't get the thing if it doesn't work
// promises are asynchronous
// promises are chainable
// you can create your own promises ` var myProm = new Promise(...);`
// but in this case we're using the built in fetch() promise