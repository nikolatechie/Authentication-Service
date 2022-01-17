var axios = require("axios");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// Register a new User
exports.register = (req, res) => {
    // Post request to data service
    axios
        .post("http://localhost:8080/api/user", req.body)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            res.send({ message: err.response.data.message });
        });
};

// Login validation
const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

exports.login = (req, res) => {
    if (!req) {
        res.status(500).send({ message: "Request body shouldn't be empty." });
        return;
    }

    const user = {
        email: req.body.email,
        password: req.body.password
    };

    // user input validation
    const {error} = schema.validate(user);

    if (error) {
        res.status(500).send({
            message: error.message
        });

        return;
    }

    // check if the user exists in the database and generate a token
    let token = null;

    axios
        .post("http://localhost:8080/api/user/login", user)
        .then(response => {
            token = response.data.token;
            res.send(token);
        })
        .catch(err => {
            res.send({ message: "An error occurred!" });
        });
};

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}