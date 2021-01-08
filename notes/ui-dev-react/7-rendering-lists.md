# Rendering Lists in React (aka will i finally understand .map())

.map() is generally used **when you need to mak a new array from a previous array**

```JS
// tweets is an array that contains objects with an id and text property/value
const tweets = [
    {
        id: '1',
        text: 'sup',
    },
    {
        id: '2',
        text: 'hi',
    }
]

<ul id="tweets-list">
    { tweets.map((tweet) => { // the `tweet` part is what always tripped me up, but now i get that it represents the individual object in the array and map just knows what to do with it
    // another thing that threw me off was what to do if there was no id - map has a second argument (`index`) that can be used to give it an id if there is none and the list isn't changing
        <li key={tweet.id}> {/* React needs a key prop so it can know which items change when it renders (makes it faster) */}
            {tweet.text}
        </li>
    })}
</ul>
```
