import type { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Client } from "twitter-api-sdk";

const twitterClientCreator = async (
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  userId: string
): Promise<Client> => {
  const userAccount = await prisma.account.findFirst({
    where: {
      userId,
    },
  });
  if (!userAccount) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User account was not found",
    });
  }
  return new Client(userAccount.access_token!);
};

export default twitterClientCreator;
