"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";
import { FiTrash, FiEdit } from "react-icons/fi";
import EditModal from "./EditModal";

type EditProps = {
	id: string;
	avatar: string;
	name: string;
	title: string;
	comments?: {
		id: string;
		postId: string;
		userId: string;
	}[];
};

export default function EditPost({ avatar, name, title, comments, id }: EditProps) {
	const [deleteModal, setDeleteModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const queryClient = useQueryClient();

	const { mutate } = useMutation(
		async (id: string) => await axios.patch("/api/posts/editPost", { data: id })
	);

	return (
		<>
			<div className="bg-white dark:bg-slate-700 my-8 p-8 rounded-lg">
				<div className="flex items-center gap-2">
					<Image
						width={32}
						height={32}
						src={avatar}
						alt="avatar"
						className="rounded-full"
					/>
					<h3 className="font-bold text-gray-700 dark:text-white">{name}</h3>
				</div>
				<div className="my-8">
					<p className="break-all">{title}</p>
				</div>
				<div className="flex items-center gap-4">
					<p className="text-sm font-bold text-gray-700 dark:text-white">
						{comments?.length} Comments
					</p>
					<button
						onClick={(e) => {
							setDeleteModal(true);
						}}
						className="text-lg font-bold text-red-500"
					>
						<FiTrash />
					</button>
					<button
						onClick={(e) => {
							setEditModal(true);
						}}
						className="text-lg font-bold "
					>
						<FiEdit />
					</button>
				</div>
			</div>
			{deleteModal && <DeleteModal id={id} setDeleteModal={setDeleteModal} />}
			{editModal && <EditModal id={id} setEditModal={setEditModal} />}
		</>
	);
}
