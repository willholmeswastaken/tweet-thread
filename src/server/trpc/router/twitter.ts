import { TRPCError } from "@trpc/server";
import type { Client } from "twitter-api-sdk";
import type {
  TwitterResponse,
  findMyUser,
  createTweet,
} from "twitter-api-sdk/dist/types";
import { z } from "zod";
import type TwitterApiResponse from "../../../types/TwitterApiResponse";
import twitterClientCreator from "../../../utils/twitterClientCreator";
import { router, protectedProcedure } from "../trpc";

export const twitterRouter = router({
  createTweetThread: protectedProcedure
    .input(z.object({ tweets: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const twitterClient = await twitterClientCreator(
        ctx.prisma,
        ctx.session.user.id
      );
      console.log("CREATED TWITTER CLIENT");
      try {
        const userResponse: TwitterResponse<findMyUser> =
          await twitterClient.users.findMyUser();
        handleTwitterResponse(userResponse as TwitterApiResponse);

        let lastTweetId: string | undefined = undefined;
        let firstTweetId: string | undefined = undefined;

        console.log("ITERATING TWEETS");
        for (const [index, tweet] of input.tweets.entries()) {
          console.log("ITERATING TWEET", index);
          const response: TwitterResponse<createTweet> = await executeTweet(
            twitterClient,
            lastTweetId,
            tweet
          );
          handleTwitterResponse(response as TwitterApiResponse);

          if (index === 0) firstTweetId = response.data?.id;
          lastTweetId = response.data?.id;
        }

        return `https://twitter.com/${userResponse.data?.username}/status/${firstTweetId}`;
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: JSON.stringify(e),
        });
      }
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
  console.error(response);
  if (response.errors) {
    const errorString = response.errors.join("\n");
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      cause: "Twitter api returned an error whilst processing thread creation.",
      message: errorString,
    });
  }
};
