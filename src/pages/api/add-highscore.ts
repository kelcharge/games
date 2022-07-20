import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;

    const highscore = await prisma.highScore.create({
        data: body
    });

    res.send(highscore);

}