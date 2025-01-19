import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import connectDB from "@/app/utils/connectDB";
import User from "@/app/models/User";

export const authOptions = NextAuth({

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
    }),
  ],


  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {

        try {
          await connectDB();

          const existinguser = await User.findOne({ email: profile.email })

          if (!existinguser) {
            const newUser = new User({
              name: profile.name,
              email: profile.email,
              profilepic: profile.picture
            })
            await newUser.save();
          }
          return true;
        } catch (error) {
          console.error(error)
          return false;
        }
      }
      return false;
    },
    async session({ session, token }) {
      try {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });

        if (dbUser) {
          session.user.username = dbUser.username;
          session.user.profilePicture = dbUser.profilePicture;
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error.message);
        return session;
      }


    },
    async session({ session, token }) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.id = dbUser._id;
      }
      return session;
    }, 
  }
  
});



export { authOptions as GET, authOptions as POST };