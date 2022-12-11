import { type NextApiRequest, type NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../server/db/client";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  console.log("session", session);

  const examples = await prisma.account.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });

  res.status(200).json(examples);
};

export default examples;
