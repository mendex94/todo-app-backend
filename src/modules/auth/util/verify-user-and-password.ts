import { compareSync } from "bcrypt";
import { UserEntity } from "../../user/domain/user.types";

export default function verifyUserAndPassword(user: UserEntity | null, password: string): boolean {
  if (!user) {
    return false;
  }

  return compareSync(password, user.password);
}
