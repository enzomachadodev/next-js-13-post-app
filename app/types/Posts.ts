import { UserType } from "./User";

export type PostType = {
	title: string;
	id: string;
	createdAt: string;
	user: {
		name: string;
		image: string;
	};
	comments?: {
		createdAt: string;
		id: string;
		message: string;
		postId: string;
		userId: string;
		user: UserType;
	}[];
};
