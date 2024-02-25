
//  06-alternative-flavor.js should export multiple values in the module.exports object,
//  but it should use the alternative approach, adding each value one at a time. 
// The exported values from each should be used in 03-modules.js, 
// logging results to the console so that you know it is working.

module.exports.items = ['item1', 'item2']
const person = {
  name: 'Bob',
}

module.exports.singlePerson = person
