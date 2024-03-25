const express = require("express");
const router = express.Router();

// const { people } = require("../data.js");

const { 
      addPerson, 
      getPeople,
      getPersonById,
      updatePerson,
      deletePerson
     } = require("../controllers/people.js");


/*
You then need to add a router.get() statement for the "/" path. 
This should do the same thing as your app.get("/api/v1/people") statement. 
Similarly, you need a router.post() statement for "/". Finally, at the bottom,
 you need module.exports = router. 
*/

// router.get('/', (req, res) => {
//   res.status(200).json({ success: true, data: people });
// });

// router.post("/", (req, res) => {
//   const { name } = req.body;
//   if (!name) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide a name" });
//   }
//   people.push({ id: people.length + 1, name: name });
//   res.status(201).json({ success: true, data: [...people] });
// });

router.route('/').get(getPeople).post(addPerson)
router.route('/:id').get(getPersonById).put(updatePerson).delete(deletePerson);
// router.get("/:id", getPersonById);

// router.put("/:id", updatePerson);

// router.delete("/:id", deletePerson);



module.exports = router;