const dbJSON =
    [
    {
    "Borough": "Brooklyn",
    "Neighborhood": "Central Brooklyn",
    "ZipCode": 11216
    },
    {
    "Borough": "Queens",
    "Neighborhood": "Northwest Queens",
    "ZipCode": 11101
    },
    {
    "Borough": "Manhattan",
    "Neighborhood": "Chelsea and Clinton",
    "ZipCode": 10001
    },
    {
    "Borough": "Staten Island",
    "Neighborhood": "South Shore",
    "ZipCode": 10312
    },
    {
    "Borough": "Bronx",
    "Neighborhood": "Hunts Point and Mott Haven",
    "ZipCode": 10455
    },
    {
    "Borough": "Manhattan",
    "Neighborhood": "Inwood and Washington Heights",
    "ZipCode": 10040
    }
]


// // console.log(dbJSON)

// const result = dbJSON.map(obj =>{
//     const newObj = {...obj}
//     newObj.ZipCode = newObj.ZipCode * 2
//     return newObj
// })

// // console.log(result)

// for (element of dbJSON){
//     element.Borough = 'no where'
//     console.log(element)

// }

// const result2 = dbJSON.filter(obj =>{
//     if (obj.Borough === 'Manhattan'){
//         obj.ZipCode = 00000
//         return true
//     }
// })

// console.log(result)
// console.log(result2)
// console.log(dbJSON)

const myArray = [0, 1, 2, 3, 4, 5]
const result = myArray.map(element => {
    return element * 2
})

console.log(result)
// [0, 2, 4, 6, 8, 10]

console.log(myArray)
// [0, 1, 2, 3, 4, 5]

// i can write how map, filter, for each works with elements and how the VALUE gets passed

// but when using json data, how objects and nested arrays get passed by REFERENCE


/* 
LOOK INTO THIS!
https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language?page=1&tab=scoredesc#tab-top
https://flexiple.com/javascript/javascript-pass-by-reference-or-value/
https://stackoverflow.com/questions/13104494/does-javascript-pass-by-reference
*/
