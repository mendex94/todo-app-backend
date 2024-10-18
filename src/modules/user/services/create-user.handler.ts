import bcrypt from "bcrypt";
import countUserByEmail from "../repository/count-user-by-email.repository";
import createUser from "../repository/create-user.repository";
import { CreateUserSchema } from "./create-user.schema";

export default async function createUserHandler({ name, email, password }: CreateUserSchema) {
  const isEmailAvailable = (await countUserByEmail(email)) === 0;

  if (!isEmailAvailable) {
    throw new Error("Email already in use");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await createUser({ name, email, password: hashedPassword });

  if (!user) {
    throw new Error("Failed to create user");
  }

  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  return {
    payload,
  };
}
