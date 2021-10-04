import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    //extracting the bearer token
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    }
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

export default userAuth;
