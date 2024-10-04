import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXTAUTH_SECRET;

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY as string);
    return decoded; // 보통 decoded 객체에 userId 정보가 포함되어 있습니다
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
