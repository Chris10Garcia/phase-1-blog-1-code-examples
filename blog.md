
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

what map does, it takes the elements within the array it was called on, does something to each one with a function you provide, and returns the processed elements in a new array. The original array stays the same * (There is an exeception to this but will get to it later)

`const result = myArray.map(element => {
    return element * 2
})

console.log(result)
// [0, 2, 4, 6, 8, 10]

console.log(myArray)
// [0, 1, 2, 3, 4, 5]
`

- array.filter()

what filter does, it takes the elements within the array it was called on, and runs each element through some condotional statement or function, and if it returns true, places the original element into a new array

`const result = myArray.filter(element => {
    element = element * 2
    return element > 3
})

console.log(result)
// [2, 3, 4, 5]
`
Notice that even though each element was doubled, the original value of the element was pass into the array. This is important

- array.forEach() and for (element of array){}

both conceptually work the same: it takes the elements within the array, and does something to each one with a function you provide. It might sound the same as .map() except forEach and for (x of y) doesn't return the element or processed element (unless you declare a variable, array, etc outside of the function and assign it to it)

`
forEach and for (of) examples
`

now what does this have to do with pass by value vs pass by reference

myArray was an array of integers, and integers are primative values. When you pass a primative value into a function, a copy of the value gets passed in. You can change the value within the function but it doesn't change the variable outside of the function

` function double (x) {
    x = x * 2
    return x;
}

let y = 100; 
let result = double(y)

console.log(y) // 100
console.log(result) // 200

Now, when working with JSON data, you have an array of OBJECTS, key distinction here. Objects are passed by reference in javascript. What this means is Javascript passes the direct location / address in memory where the object is located into the function, not a copy of it. If you change the property within the function, it persists outside of the function.

` function doubleProperty(obj){
    obj.value = obj.value * 2
    return obj // 
}

const myObj = {value : 10}
console.log(myObj)

const result = doubleProperty(myObj)

console.log(result)
console.log(myObj)

{ value: 10 }
{ value: 20 }
{ value: 20 }
`

Even if you remove the `return` statement, the results are still the same: the original object will get modified


And this needs to be taken into account when calling on iterative methods such as map, filter, and forEach on JSON data!

Here is an example. Lets say you have json data of the following structure {studentName, favoriteColor, favoriteNumber}.

if you want to double each student's favorite number and store it in a new json array, you would assume the following code

` 
const studentsArray = [{
    "studentName" : "Chris",
    "favoriteColor" : "blue",
    "favoriteNumber" : "15" 
    },
    {
    "studentName" : "Rose",
    "favoriteColor" : "blue",
    "favoriteNumber" : "36" 
    }]


const results = studentsArray.map(studentObj => {
    const newObj = studentObj
    newObj.favoriteNumber = newObj.favoriteNumber * 2
    return newObj
})

console.log("original: ")
console.log(studentsArray)

console.log("updated: ")
console.log(results)
`

the results are:

`
original: 
[
  { studentName: 'Chris', favoriteColor: 'blue', favoriteNumber: '15' },
  { studentName: 'Rose', favoriteColor: 'blue', favoriteNumber: '36' }
]

updated: 
[
  { studentName: 'Chris', favoriteColor: 'blue', favoriteNumber: 30 },
  { studentName: 'Rose', favoriteColor: 'blue', favoriteNumber: 72 }
]:

`
If you intend to only use the new array, then it doesn't matter. But if you do intend to use the original array (and for better coding practicies), there is a way to solve this issue: using the spread operator (...). 


const results = studentsArray.map(studentObj => {
    const newObj = {...studentObj}
    newObj.favoriteNumber = newObj.favoriteNumber * 2
    return newObj
})

`original: 
[
  { studentName: 'Chris', favoriteColor: 'blue', favoriteNumber: '15' },
  { studentName: 'Rose', favoriteColor: 'blue', favoriteNumber: '36' }
]

updated: 
[
  { studentName: 'Chris', favoriteColor: 'blue', favoriteNumber: 30 },
  { studentName: 'Rose', favoriteColor: 'blue', favoriteNumber: 72 }
]
`


