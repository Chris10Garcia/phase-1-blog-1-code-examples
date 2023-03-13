For my phase 1 final project of the Flatiron Software Engineering Bootcamp, I created a single page website that displays the breweries of New York City. I used a public API from [Open Brewery DB](https://www.openbrewerydb.org/) but needed to filter the massive dataset down to just breweries located within the city. To accomplish this, I first acquired a CSV file with all of the zip codes of NYC and created a dictionary object using this data. Breweries that matched with the NYC zip code were pushed into a new array and eventually saved into its own db.json file. While I was able to do this successfully, I noticed some wonky behavior concerning some the arrays and objects I created and the various iterative methods I called on them. After deep diving into the problem and debugging the issue, I figured out the cause of this buggy behavior; I was not taking into consideration pass by value and pass by reference.

Before I begin, I want to provide a quick review of the iterative methods I used frequently to complete my labs, homework’s, and final project: `.map()`, `.filter()`, and `.forEach()`.


## `array.map()`

How `.map()` works: it takes the elements within the array it was called on, does something to each element with a function you provide, and returns the processed elements in a new array. The original array stays the same 

```
myArray = [0, 1, 2, 3, 4, 5]

const result = myArray.map(element => {
    return element * 2
})

console.log("The new array is: ")
console.log(result)

console.log("The original array is: ")
console.log(myArray)

// The new array is: 
// [0, 2, 4, 6, 8, 10]
// The original array is: 
// [0, 1, 2, 3, 4, 5]
```


## `array.filter()`

How `.filter()` works: it takes the elements within the array it was called on, and runs each element through some conditional statement or function, and if it returns true, places the original element into a new array.

```
myArray = [0, 1, 2, 3, 4, 5]

const result = myArray.filter(element => {
    element = element * 2
    return element > 3
})

console.log("The new array is: ")
console.log(result)

// The new array is: 
// [2, 3, 4, 5]
```

Notice that even though each element was doubled, the original value of the element was pass into the array.


## `array.forEach()`

How `.forEach()` works: it takes the elements within the array, and does something to each one with a function you provide. It sounds similar to `.map()` except `.forEach()` doesn't return the element or processed element. You can declare a variable, array, etc. outside of the function and assign or push the element into this variable (but then it is better to use `.map()` in this case). `.forEach()` is useful if you are calling a function on each element but do not need to return a new array.

```
const myArray = [0, 1, 2, 3, 4, 5]

const result_1 = []

const result_2 = myArray.forEach(element => {
  element = element * 3
  result_1.push(element)
  return element
})

console.log("original: ")
console.log(myArray)

console.log("result_1: ")
console.log(result_1)

console.log("result_2: ")
console.log(result_2)
// original: 
// [ 0, 1, 2, 3, 4, 5 ]
// result_1: 
// [ 0, 3, 6, 9, 12, 15 ]
// result_2: 
// undefined
```

What does this have to do with pass by value vs pass by reference?

`myArray` was an array of integers, and integers are primitive values. When you pass a primitive value into a function, a copy of that value gets passed in. You can change the variable within the function but it doesn't change the variable outside of the function

```
function double (x) {
    x = x * 2
    return x;
}

let y = 100; 
let result = double(y)

console.log(y) // 100
console.log(result) // 200
```

When working with JSON data, you have an array of OBJECTS, an important distinction here. Objects are passed by reference in JavaScript. What this means is JavaScript passes the direct location / address in memory where the object is located into the function, not a copy of it. If you change a property of an object within the function, it persists outside of the function.

```
function doubleProperty(obj){
    obj.value = obj.value * 2
    return obj // 
}

const myObj = {value : 10}

console.log("Original object: ")
console.log(myObj)

const result = doubleProperty(myObj)

console.log("New resulting object: ")
console.log(result)

console.log("Original object: ")
console.log(myObj)

// Original object: 
// { value: 10 }
// New resulting object: 
// { value: 20 }
// Original object: 
// { value: 20 }
```

And even if you remove the `return` statement, the results are still the same: the original object will get modified. This needs to be taken into account when calling on iterative methods such as `.map()`, `.filter()`, and `.forEach()` on JSON data! 

Here is an example. You have json data with the following structure:

`{studentName, favoriteColor, favoriteNumber}`

If you want to double each student's favorite number and store it in a new array, I would have originally written: 

```
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
```

Which results:

```
original: 
[
  { studentName: 'Chris', favoriteColor: 'blue', favoriteNumber: '30' },
  { studentName: 'Rose', favoriteColor: 'blue', favoriteNumber: '72' }
]
updated: 
[
  { studentName: 'Chris', favoriteColor: 'blue', favoriteNumber: 30 },
  { studentName: 'Rose', favoriteColor: 'blue', favoriteNumber: 72 }
]:
```

Even if you do not intend on using the original array, for better coding practices, one should take this problem into consideration. Fortunately, there is a way to solve this issue: using the spread operator `...`. 

```
const results = studentsArray.map(studentObj => {
    const newObj = {...studentObj}
    newObj.favoriteNumber = newObj.favoriteNumber * 2
    return newObj
})

// original: 
[
  { studentName: 'Chris', favoriteColor: 'blue', favoriteNumber: '15' },
  { studentName: 'Rose', favoriteColor: 'blue', favoriteNumber: '36' }
]

// updated: 
[
  { studentName: 'Chris', favoriteColor: 'blue', favoriteNumber: 30 },
  { studentName: 'Rose', favoriteColor: 'blue', favoriteNumber: 72 }
]
```

One function of the spread operator is to COPY the contents of an array or object and spreads it into a corresponding new array or new object. If you then make a change to the new array or object, the original stays intact.

I hope this blog post helps with your journey. Thanks for reading and happy coding!