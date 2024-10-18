import findUserByEmail from "../../user/repository/find-user-by-email.repository";
import verifyUserAndPassword from "../util/verify-user-and-password";

export default async function authHandler({ email, password }: { email: string; password: string }) {
  const user = await findUserByEmail(email);

  const isValidCredentials = verifyUserAndPassword(user, password);

  if (!isValidCredentials) {
    throw new Error("Invalid email or password");
  }

  const payload = {
    id: user!.id,
    email: user!.email,
    name: user!.name,
  };

  return {
    payload,
  };
}
