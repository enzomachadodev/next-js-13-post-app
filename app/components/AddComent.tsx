"use client";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

type AddCommentProps = {
	id?: string;
};

type Comment = {
	postId?: string;
	title: string;
};

export default function AddComments({ id }: AddCommentProps) {
	const [title, setTitle] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
	const queryClient = useQueryClient();

	const { mutate } = useMutation(
		async (data: Comment) => axios.post("/api/posts/addComment", { data }),
		{
			onSuccess: (data) => {
				setTitle("");
				setIsDisabled(false);
				queryClient.invalidateQueries(["detail-post"]);
				toast.dismiss();
				toast.success("Added your comment");
			},
			onError: (error) => {
				console.log(error);
				setIsDisabled(false);
				if (error instanceof AxiosError) {
					toast.dismiss();
					toast.error(error?.response?.data.message);
				}
			},
		}
	);

	const submitComment = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsDisabled(true);
		toast.loading("Adding your comment...");
		mutate({ title, postId: id });
	};

	return (
		<form onSubmit={submitComment} className="my-8">
			<h3>Add a comment</h3>
			<div className="flex flex-col my-2">
				<input
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					type="text"
					name="title"
					className="p-4 text-lg rounded-md my-2"
				/>
			</div>
			<div className=" flex items-center gap-2">
				<button
					disabled={isDisabled}
					className="text-sm bg-teal-600 text-white py-2 px-6 rounded-md disabled:opacity-25"
					type="submit"
				>
					Add Comment
				</button>
				<p
					className={`font-bold  ${
						title.length > 300 ? "text-red-700" : "text-gray-700"
					} `}
				>{`${title.length}/300`}</p>
			</div>
		</form>
	);
}
