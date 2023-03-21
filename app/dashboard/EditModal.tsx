"use client";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PostType } from "../types/Posts";

type EditModalProps = {
	id: string;
	setEditModal: (toggle: boolean) => void;
};

const getPost = async (id: string) => {
	const response = await axios.get(`/api/posts/${id}`);
	return response.data;
};

export default function EditModal({ id, setEditModal }: EditModalProps) {
	const [title, setTitle] = useState<string | undefined>("");
	const { data, isLoading } = useQuery<PostType>({
		queryFn: () => getPost(id),
		queryKey: ["get-post"],
	});
	console.log(data?.title);
	useEffect(() => {
		setTitle(data?.title);
	}, []);

	// const { mutate } = useMutation(
	// 	async (title: string) =>
	// 		await axios.post("/api/posts/editPost", {
	// 			data: {
	// 				title,
	// 				id: id,
	// 			},
	// 		}),
	// 	{
	// 		onError: (error) => {
	// 			if (error instanceof AxiosError) {
	// 				toast.dismiss();
	// 				toast.error(error?.response?.data.message);
	// 			}
	// 		},
	// 		onSuccess: (data) => {
	// 			toast.dismiss();
	// 			toast.success("Post has been updated!");
	// 			queryClient.invalidateQueries(["posts"]);
	// 			setTitle("");
	// 		},
	// 	}
	//);

	const editPost = async (e: React.FormEvent) => {
		e.preventDefault();
		// toast.loading("Creating your post");
		// mutate(title);
	};
	return (
		<div
			id="overlay"
			onClick={(e) => {
				if (e.target.id == "overlay") {
					setEditModal(false);
				}
			}}
			className="absolute bg-black/50 w-full h-full z-20 left-0 top-0"
		>
			<div className="absolute bg-white dark:bg-slate-700 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6 z-22">
				<h2 className="text-xl">Edit your post</h2>
				{isLoading ? (
					"Loading..."
				) : (
					<form onSubmit={editPost} className="rounded-md">
						<div className="flex flex-col my-4">
							<textarea
								onChange={(e) => setTitle(e.target.value)}
								name="title"
								value={title}
								placeholder="What's on your mind?"
								className="p-4 text-lg rounded-lg my-2 bg-gray-200 dark:bg-gray-500"
							></textarea>
						</div>
						<div className="flex items-center justify-between gap-2">
							{/* <p
								className={`font-bold text-sm ${
									title!.length > 300
										? "text-red-700"
										: "text-gray-700 dark:text-white"
								}`}
							>{`${title!.length}/300`}</p> */}
							<button
								className="text-sm bg-teal-600 text-white py-2 px-6 rounded-md disabled:opacity-25"
								type="submit"
							>
								Save
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
