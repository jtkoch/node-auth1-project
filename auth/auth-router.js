const bcrypt = require("bcryptjs")
const router = require("express").Router()
const Users = require("../users/users-model")

router.post("/register", (req, res) => {
  const user = req.body

  const hash = bcrypt.hashSync(user.password, 8)

  user.password = hash
  
  Users.add(user)
    .then((saved) => {
      res.status(201).json(saved)
    })
    .catch((err) => {
      res.status(500).json({ message: "Registration error" })
    })
})

router.post("/login", (req, res) => {
  const { username, password } = req.body

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = username
        res.status(200).json({ 
          message: `Welcome ${username}!` 
        })
      } else {
        res.status(401).json({ message: "Invalid credentials" })
      }
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.json({ message: "There was an error loggin you out, Please try again" })
      } else {
        res.status(200).json({ message: "You have been successfully logged out" })
      }
    })
  }
})

module.exports = router