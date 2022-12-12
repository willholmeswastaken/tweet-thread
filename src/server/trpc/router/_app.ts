import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { twitterRouter } from "./twitter";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  twitter: twitterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
