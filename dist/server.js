"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const password = "s0/\/\P4$$w0rD";
const hash = "$2b$10$4oB8rq8UbccW3DFnG8XS2.5boXnHcGBdkUhev3k8b7rGDmdXqkKsO";
// bcrypt.genSalt(saltRounds, function (err, salt) {
//   bcrypt.hash(password, salt, function (err, hash) {
//     console.log("check", {
//       salt,
//       hash
//     });
//   });
// });
bcrypt.compare(password, hash, (err, result) => {
    console.log("result", result);
});
