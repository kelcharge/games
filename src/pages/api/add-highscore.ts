import { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";

import { prisma } from "../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;
    const referer = req.headers.referer;

    if (referer !== env.REFERER) {
        res.statusCode = 200;
        res.send("");
        return;
    }

    const highscore = await prisma.highScore.create({
        data: body
    });

    res.send(highscore);

}