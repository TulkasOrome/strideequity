import UsersController from "../users/usersController"
import { createHash, randomBytes } from 'crypto'
import SessionModel from "../session/SessionModel"
import VerificationRequestModel from "../users/verificationRequestModel"


const getCompoundId = (providerId, providerAccountId) => {
  return createHash('sha256').update(`${providerId}:${providerAccountId}`).digest('hex')
}

export default function SequelizeAdapter(db, options) {

  const defaultSessionMaxAge = 30 * 24 * 60 * 60 * 1000
  const sessionMaxAge = (options && options.session && options.session.maxAge)
    ? options.session.maxAge * 1000
    : defaultSessionMaxAge
  const sessionUpdateAge = (options && options.session && options.session.updateAge)
    ? options.session.updateAge * 1000
    : 0


  return {
    async createUser(user) {
      console.log('createUser', user)
      return UsersController.create(user);
    },
    async getUser(id) {
      console.log('getuser', id)
      return UsersController.findById(id);
    },
    async getUserByEmail(email) {
      return UsersController.findBy('email', email);
    },
    async getUserByAccount( {providerAccountId, provider} ) {
      console.log('getUserByAccount', providerAccountId);
      const user = await UsersController.findByAuth(providerAccountId, provider);
      return user
        ? { id: user.id, name: user.name, image: user.avatar, email: user.email, emailVerified: user.emailVerified }
        : null;
    },
    async updateUser(user) {
      console.log('updateUser', user)
      return UsersController.update(user, user.id);
    },
    async deleteUser(userId) {
      return UsersController.update({verified:false}, userId);
    },
    async linkAccount(account) {
      console.log('linkAccount', account)
      return
    },
    async unlinkAccount({ providerAccountId }) {
      return
    },
    async createSession({ sessionToken, userId, expires }) {
      console.log('CREATE_SESSION', userId)

      try {
        return SessionModel.create({
          expires: expires || new Date(),
          userId,
          sessionToken,
          accessToken: randomBytes(32).toString('hex')
        })
      } catch (error) {
        return Promise.reject(new Error('CREATE_SESSION_ERROR'))
      }
    },
    async getSessionAndUser(sessionToken) {
      console.log('GET_SESSION', sessionToken)

      const session = await SessionModel.findOne({ where: { sessionToken } });
      console.log('getSessionAndUser',session )
      if (!session.id)  return null;
      // Check session has not expired (do not return it if it has)
      if (session && session.expires && new Date() > session.expires) {
        await SessionModel.destroy({ where: { sessionToken } })
        return null;
      }
      const user = await UsersController.findById(session.userId);
      if (!user)  return null;
      return {user, session}

    },
    async updateSession({ sessionToken, expires }) {
      console.log('UPDATE_SESSION', sessionToken)
      try {
        return SessionModel.update({ expires }, {
          where: { sessionToken }
        })

      } catch (error) {
        console.log('UPDATE_SESSION_ERROR', error)
        return Promise.reject(new Error('UPDATE_SESSION_ERROR'))
      }
    },
    async deleteSession(sessionToken) {
      console.log('deleteSession', sessionToken)
      try {
        return SessionModel.destroy({ where: { sessionToken } })
      } catch (error) {
        console.log('DELETE_SESSION_ERROR', error)
        return Promise.reject(new Error('DELETE_SESSION_ERROR'))
      }
    },
    async createVerificationToken({ identifier, expires, token }) {
      console.log('CREATE_VERIFICATION_REQUEST', identifier)
      try {
        const hashedToken = createHash('sha256').update(`${token}${process.env.SESSION_SECRET}`).digest('hex')
        const verificationRequest = await VerificationRequestModel.create({
          identifier,
          token: hashedToken,
          expires
        })
        return verificationRequest
      } catch (error) {
        return Promise.reject(new Error('CREATE_VERIFICATION_REQUEST_ERROR'))
      }
    },
    async useVerificationToken({ identifier, token }) {
      console.log('GET_VERIFICATION_REQUEST', identifier, token)
      try {
        const hashedToken = createHash('sha256').update(`${token}${process.env.SESSION_SECRET}`).digest('hex')
        const verificationRequest = await VerificationRequestModel.findOne({ where: { token: hashedToken } })
        if (verificationRequest && verificationRequest.expires && new Date() > verificationRequest.expires) {
          await VerificationRequestModel.destroy({ where: { token: hashedToken } })
          return null
        }
        return verificationRequest
      } catch (error) {
        return Promise.reject(new Error('GET_VERIFICATION_REQUEST_ERROR'))
      }
    },
  }
}
