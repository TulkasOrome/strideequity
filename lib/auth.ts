import { getSession } from "next-auth/react"
import UsersController from "./users/usersController";

const Auth = {
  async getUser(req) {
    const session = await getSession({ req });
    const user = UsersController.getUserData(session.userId);
    return user;
  }
}

export default Auth;
