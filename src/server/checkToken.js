import jwt from "jsonwebtoken";

const checkToken = async (token) => {
  if (!token) {
    return false;
  }
  try {
    jwt.verify(token, import.meta.env.PRIVATE_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

export default checkToken;
