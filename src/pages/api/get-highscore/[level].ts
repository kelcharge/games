import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const level = req.query;

    // Take option to limit the amount of records returned
    const data = await prisma.highScore.findMany({
        where: level,
    });

    
    res.send(JSON.stringify(data));

}