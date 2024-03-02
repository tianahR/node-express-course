// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

const names = require('./04-names')
const greetings = require('./05-utils')
const data = require('./06-alternative-flavor')
require('./07-mind-grenade')
greetings('Susan')
greetings(names.name1);
greetings(names.name2);
