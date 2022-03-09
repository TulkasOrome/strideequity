import { getSession } from "next-auth/react"
import serializable from "./serializable";
import UsersController from "./users/usersController";

const ServerProps = {
  getUser: (reqUser) => (reqUser ? {
    id: reqUser.id,
    name: reqUser.name,
    role: reqUser.role,
    avatar: reqUser.avatar,
    verifiedWholesale: reqUser.verifiedWholesale,
    verifiedId: reqUser.verifiedId,
    googleId: reqUser.googleId,
    linkedinId: reqUser.linkedinId,
  } : {}),
  getState: async (req) => {
    const session = await getSession({ req })
    const user = session?.userId ? serializable(await UsersController.getUserData(session.userId)) : {};
    return { user };
  },
};

export default ServerProps;
