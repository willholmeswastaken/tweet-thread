import { TWEET_MAX_CHARS } from "../constants";

export const tweetSplitter = (threadText: string): Array<string> => {
  const res: Array<string> = [];
  for (let i = 0; i < threadText.length; i += TWEET_MAX_CHARS) {
    res.push(threadText.slice(i, i + TWEET_MAX_CHARS));
  }
  if (res.length === 0) res.push("");
  return res;
};
