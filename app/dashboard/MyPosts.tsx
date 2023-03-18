"use client";

import { useQuery } from "react-query";
import axios from "axios";
import { AuthPostType } from "../types/AuthPosts";
import EditPost from "./EditPost";

const getAuthPosts = async () => {
	const response = await axios.get("/api/posts/authPosts");
	return response.data;
};

export default function MyPosts() {
	const { data, isLoading } = useQuery<AuthPostType>({
		queryFn: getAuthPosts,
		queryKey: ["auth-posts"],
	});

	if (isLoading) return <h1>Posts are loading... </h1>;

	return (
		<div>
			{data?.posts?.map((post) => (
				<EditPost
					id={post.id}
					avatar={data.image}
					name={data.name}
					title={post.title}
					comments={post.comments}
					key={post.id}
				/>
			))}
		</div>
	);
}
