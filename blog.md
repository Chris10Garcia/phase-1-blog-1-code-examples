
purpose: when working with JSON data and using map, filter, forEach, and other iterative processes, reminder to not forget about pass by value vs pass by reference


- working on my project, I downloaded data from a public API. (breweries of the USA)
- I needed to filter it down to just breweries in New York City.
- I couldn't do multiple queries (server wasn't set up for that).
- However, I was able to download the data for New York State 
- I found a CSV of NYC zip code and I created a dictionary so that if the NYS zip code is in this dictionary, add the object to a new array
- While I was able to successfully do this and finish my project, I noticed some wonky behavior.
- After deep diving and debugging the problem, I figured out the issue

- before I begin, a quick review of map, filter, and forEach, iterative functions I used quite frequently to complete the required and optional labs as well as my final project

`myArray = [0, 1, 2, 3, 4, 5]`

- array.map()

what map does, it takes the elements within the array it was called on, does something to each one, and returns the processed elements in a new array

`const result = myArray.map(element => {
    return element * 2
})

console.log(result)
// [0, 2, 4, 6, 8, 10]
`