import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    //if req is sent from admin panel
    const id = req.headers.userid;
    if (id !== undefined) {
      req.userId = id;
      return next();
    }
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
