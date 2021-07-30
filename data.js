const data = [
    {
        id: 1,
        name: 'Emils',
        age: 29,
        gender: 'male',
    },
    {
        id: 2,
        name: 'John',
        age: 33,
        gender: 'male'
    }
];

// before it was "exports.module = data;" <-- incorrect
module.exports = data;