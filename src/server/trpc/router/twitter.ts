import { Client } from "twitter-api-sdk";
import type {
  TwitterResponse,
  findMyUser,
  createTweet,
} from "twitter-api-sdk/dist/types";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const twitterRouter = router({
  getSecretMessage: protectedProcedure
    .input(z.object({ tweets: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      // TODO: hookup this mutation to the ui with error handling etc.
      const userAccount = await ctx.prisma.account.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      const twitterClient = new Client(userAccount!.access_token!);
      const userResponse: TwitterResponse<findMyUser> =
        await twitterClient.users.findMyUser();
      handleTwitterResponse(userResponse as TwitterApiResponse);

      let lastTweetId: string | undefined = undefined;
      let firstTweetId: string | undefined = undefined;
      for (const [index, tweet] of input.tweets.entries()) {
        const response: TwitterResponse<createTweet> = await executeTweet(
          twitterClient,
          lastTweetId,
          tweet
        );
        handleTwitterResponse(response as TwitterApiResponse);

        if (index === 0) firstTweetId = response.data?.id;
        lastTweetId = response.data?.id;
      }

      return `https://twitter.com/${userResponse.data?.username}/${firstTweetId}`;
    }),
});

const executeTweet = async (
  twitterClient: Client,
  lastTweetId: string | undefined,
  tweet: string
): Promise<TwitterResponse<createTweet>> => {
  if (lastTweetId) {
    return await twitterClient.tweets.createTweet({
      text: tweet,
      reply: {
        in_reply_to_tweet_id: lastTweetId,
      },
    });
  } else {
    return await twitterClient.tweets.createTweet({
      text: tweet,
    });
  }
};

const handleTwitterResponse = (response: TwitterApiResponse): void => {
  if (response.errors) {
    const errorString = response.errors.join("\n");
    throw new Error(errorString);
  }
};

type TwitterApiResponse = {
  data?:
    | {
        id: string;
        text: string;
      }
    | undefined;
  errors?:
    | {
        detail?: string | undefined;
        status?: number | undefined;
        title: string;
        type: string;
      }[]
    | undefined;
};
