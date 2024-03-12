import {OAuth2Client, TokenPayload} from "google-auth-library"
 
const client = new OAuth2Client();

export async function googleVerify(token: string) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload: TokenPayload | undefined = ticket.getPayload();
  if (payload) {
    const {name, picture, email} = payload
    return {
      name,
      img: picture,
      email
    }
  } else {
    return null
  }
}