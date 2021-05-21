import NextAuth, {User, Account, Session} from "next-auth"
import Providers from "next-auth/providers"
import {NextApiRequest, NextApiResponse} from "next";
import {JWT} from "next-auth/jwt";

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req,res,{
    providers: [
        Providers.GitHub({
            clientId: process.env["GITHUB_CLIENT_ID"],
            clientSecret: process.env["GITHUB_CLIENT_SECRET"]
        }),
    ],
    callbacks:{
        jwt(token: JWT, _user,account?: Account, _profile?,_isNewUser?) {
            if (account) {
                token.accessToken = account.accessToken;
            }
            return Promise.resolve(token);
        },
        session(session: Session, userOrToken: JWT | User) {
            const token = userOrToken as JWT;
            session.accessToken = token.accessToken;
            return Promise.resolve(session);
        }
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env["AUTH_SECRET"],
    jwt:{
        secret: process.env["JWT_SECRET"]
    }
})
