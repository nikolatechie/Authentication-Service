var axios = require("axios");

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