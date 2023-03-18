import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).json({ message: "Please signin to post a comment." });
	}

	const prismaUser = await prisma.user.findUnique({
		where: { email: session.user!.email! },
	});

	if (req.method === "POST") {
		console.log("aqui é o req.body.data", req.body.data);
		const { title, postId } = req.body.data;
		console.log(title, postId);

		if (!title.length) {
			return res.status(401).json({ message: "Please write something" });
		}

		try {
			const result = await prisma.comment.create({
				data: {
					message: title,
					userId: prismaUser!.id,
					postId,
				},
			});
			res.status(200).json(result);
		} catch (err) {
			res.status(403).json({ err: "Error has occured whilst making a post" });
		}
	}
}
