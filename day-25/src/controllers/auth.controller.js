export async function registerUser(req, res, next) {
  /*
  try {
    throw new Error("Encounter an error while registering new user");
  } catch (error) {
    next(error);
  }
*/
  /*
  try {
    throw new Error("Password is too weak");
  } catch (error) {
  error.status = 400  
  next(error);
  }
    */
  /*
  const err = new Error("Password is too weak")
  err.status = 400
  next(err)
  */

  res.status(201).json({
    message: "User registered successfully",
  });
}
