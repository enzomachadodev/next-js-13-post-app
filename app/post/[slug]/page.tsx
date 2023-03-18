"use client";

import Post from "@/app/components/Post";
import { useQuery } from "react-query";
import axios from "axios";
import { PostType } from "@/app/types/Posts";
import AddComments from "@/app/components/AddComent";
import Image from "next/image";

type URL = {
	params: {
		slug: string;
	};
};

const getDetails = async (slug: string) => {
	const response = await axios.get(`/api/posts/${slug}`);
	return response.data;
};

export default function PostDetail(url: URL) {
	const { data, isLoading } = useQuery<PostType>({
		queryFn: () => getDetails(url.params.slug),
		queryKey: ["detail-post"],
	});
	if (isLoading) return "Loading...";
	console.log(data);
	return (
		<div>
			<Post
				id={data?.id!}
				name={data?.user.name!}
				avatar={data?.user.image!}
				postTitle={data?.title!}
				comments={data?.comments!}
			/>
			<AddComments id={data?.id} />
			{data?.comments?.map((comment) => (
				<div key={comment.id} className="my-6 bg-white p-8 rounded-md">
					<div className="flex items-center gap-2">
						<Image
							width={24}
							height={24}
							src={comment.user?.image}
							alt="avatar"
							className="rounded-full"
						/>
						<h3 className="font-bold">{comment?.user.name}</h3>
						<h2 className="text-sm">{comment.createdAt}</h2>
					</div>
					<div className="py-4">{comment.message}</div>
				</div>
			))}
		</div>
	);
}
