import { body, validationResult } from "express-validator"; //to check the format of the data

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next(); //agar koi bhi error nahi aya to kripaya aage badhe
  }

  return res.status(400).json({
    errors: errors.array(),
  });
};

export const registerValidaiton = [
  body("username").isString().withMessage("Username should be string"),
  body("email").isEmail().withMessage("Email should be valid email address"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("Password should be between 6 and 12 characters long"),
  body("userId").isMongoId(),
  validate,
];

/*
following code is for custom validation of password but we can also use built in validation of express validator as shown above

body("password").custom((value) => {
  if (value.length < 8 || value.length > 12) {
    throw new Error("Password should be between 6 and 12 characters long");
  }
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
  if (!passwordRegex.test(value)) {
    throw new Error("Password should contain at least one letter and one number");
  }
}).withMessage("Password should be between 6 and 12 characters long and contain at least one letter and one number"),
*/
