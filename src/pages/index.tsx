import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Head>
        <title>Tweet Thread</title>
        <meta name="description" content="Twitter thread creation and publishing made easy." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Tweet<span className="text-[hsl(211,100%,70%)]">Thread</span>
        </h1>
        <p className="italic text-white">Twitter thread creation and publishing made easy.</p>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <Link className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20" href={"/dashboard"}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
