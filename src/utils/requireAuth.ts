import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export const requireAuth =
  (func: GetServerSideProps, callbackPath: string) =>
  async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      authOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: `/api/auth/signin?callbackUrl=/${callbackPath}`,
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };
