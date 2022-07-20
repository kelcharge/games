import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;

    // const highscore = await prisma.highScore.create({
    //     data: body
    // });

    // Take option to limit the amount of records returned
    // const data = await prisma.highScore.findMany();

    
    // res.send(JSON.stringify(data));

    res.send(highscore);

}