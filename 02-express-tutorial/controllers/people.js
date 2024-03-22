let { people } = require('../data')

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people })
}

const addPerson = (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide a name" })
  }
  people.push({ id: people.length + 1, name: name });
  res.status(201).json({ success: true, data: [...people] });
}


const getPersonById = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: `No person with id ${id}` });
  }
  return res.status(200).json({ success: true, data: person });
};


const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res
      .status(400)
      .json({ success: false, message: `No person with id ${id}` });
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  return res.status(200).json({ success: true, data: newPeople });
};


const deletePerson = (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));
  if (!person) {
    return res
      .status(400)
      .json({ success: false, message: `No person with id ${req.params.id}` });
  }

  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );

  return res.status(200).json({ success: true, data: newPeople });
};


module.exports = {
    getPeople,
    addPerson,
    getPersonById,
    updatePerson,
    deletePerson
    
  }