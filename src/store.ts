import create from "zustand";
import type { ThreadView } from "./types/ThreadView";
import type TweetPublishStatus from "./types/TweetPublishStatus";
import { tweetSplitter } from "./utils/tweetSplitter";

type TweetStoreState = {
  activeView: ThreadView;
  tweets: Array<string>;
  tweetsAsSingularString: string;
  tweetPublishStatus: TweetPublishStatus;
  tweetThreadUrl: string;
  resetPublishStatus: () => void;
  setTweets: (tweetText: string) => void;
  setView: (view: ThreadView) => void;
  publishTweets: (action: () => Promise<string>) => Promise<void>;
  reset: () => void;
};

const useTweetStore = create<TweetStoreState>((set, get) => ({
  activeView: "compose",
  tweets: [""],
  tweetsAsSingularString: "",
  tweetPublishStatus: "none",
  tweetThreadUrl: "",
  resetPublishStatus: () => set({ tweetPublishStatus: "none" }),
  setView: (view) => set({ activeView: view }),
  setTweets: (tweetText) =>
    set({
      tweetsAsSingularString: tweetText,
      tweets: tweetSplitter(tweetText),
    }),
  publishTweets: async (action) => {
    set({ tweetPublishStatus: "publishing" });
    try {
      const tweetThreadUrl = await action();
      set({ tweetPublishStatus: "published", tweetThreadUrl });
    } catch (e) {
      console.error(e, "FAILED TO CREATE");
      set({ tweetPublishStatus: "failed" });
    }
  },
  reset: () =>
    set({
      tweets: [""],
      tweetPublishStatus: "none",
      tweetThreadUrl: "",
      tweetsAsSingularString: "",
      activeView: "compose",
    }),
}));

export default useTweetStore;
