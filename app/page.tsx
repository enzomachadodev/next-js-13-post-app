"use client";

import axios, { all } from "axios";
import CreatePost from "./components/AddPost";
import { useQuery } from "react-query";
import Post from "./components/Post";
import { PostType } from "./types/Posts";

const allPosts = async () => {
	const response = await axios.get("/api/posts/getPosts");
	return response.data;
};

export default function Home() {
	const { data, error, isLoading } = useQuery<PostType[]>({
		queryFn: allPosts,
		queryKey: ["posts"],
	});

	if (error) return error;
	if (isLoading) return "Loading...";
	return (
		<main>
			<CreatePost />
			{data?.map((post) => (
				<Post
					comments={post.comments!}
					key={post.id}
					name={post.user.name}
					avatar={post.user.image}
					postTitle={post.title}
					id={post.id}
				/>
			))}
		</main>
	);
}
