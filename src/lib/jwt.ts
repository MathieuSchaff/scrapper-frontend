import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
interface SignOption {
  expiresIn?: string | number;

}
const DEFAULT_SIGN_OPTIONS: SignOption = {
  expiresIn: "1h",
};
// This method create a jwt token with the payload and secret
export async function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTIONS) {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
  const token = jwt.sign(payload, secret!, options);
  return token;
}
// This method verify the token that is provided by the client
export async function verifyJwt(token: string) {
  try {
    const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
    const payload = jwt.verify(token, secret!);
    return payload as JwtPayload;
  } catch (err) {
    console.log(err);
    return null;
  }
}
