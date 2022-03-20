<script>
	import {
		addDoc,
		collection,
		onSnapshot,
		deleteDoc,
		doc,
		updateDoc,
	} from "firebase/firestore";
	import { onDestroy } from "svelte";

	import Toastify from "toastify-js";

	import { db } from "./firebase";

	let task = {
		title: "",
		description: "",
	};

	let tasks = [];

	let editStatus = false;

	let currentId = "";

	const addTask = async () => {
		try {
			await addDoc(collection(db, "tasks"), {
				...task,
				createdAt: new Date(),
			});
			console.log("task saved");

			Toastify({
				text: "New task created",
			}).showToast();
		} catch (error) {
			console.log(error);
		}
	};

	const updateTask = async () => {
		try {
			await updateDoc(doc(db, "tasks", currentId), task);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async () => {
		try {
			if (!editStatus) {
				addTask();
			} else {
				updateTask();
				console.log("updating task");
			}
		} catch (error) {
			console.log(error);
		}

		task = {
			title: "",
			description: "",
		};

		editStatus = false;
		currentId = "";
	};

	const deleteTask = async (id) => {
		try {
			// TODO: confirm alert pending
			await deleteDoc(doc(db, "tasks", id));
			console.log("task deleted");

			Toastify({
				text: "Task deleted",
				style: {
					background: "#f44336",
				},
			}).showToast();
		} catch (error) {
			console.log(error);
		}

		await deleteDoc(doc(db, "tasks", id));
		console.log("task deleted");
	};

	const editTask = (currentTask) => {
		task.title = currentTask.title;
		task.description = currentTask.description;
		currentId = currentTask.id;
		editStatus = true;
	};

	const unsub = onSnapshot(
		collection(db, "tasks"),
		(querySnapshot) => {
			tasks = querySnapshot.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
		},
		(err) => {
			console.log(err);
		}
	);

	onDestroy(unsub);

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log("sended");
	// };
</script>

<main class="container">
	<div class="row">
		<div class="col-md-6">
			<form
				on:submit|preventDefault={handleSubmit}
				class="card card-body p-5"
			>
				<div class="mb-3">
					<label for="title" class="text-secondary fs-5">Title</label>
					<input
						bind:value={task.title}
						type="text"
						placeholder="Write a title"
						class="form-control"
					/>
				</div>

				<div class="mb-3">
					<label for="description" class="text-secondary fs-5"
						>Description</label
					>
					<textarea
						bind:value={task.description}
						id="description"
						rows="3"
						placeholder="Write a description"
						class="form-control"
					/>
				</div>

				<div>
					<button class="btn btn-primary"> Save </button>
				</div>
			</form>
		</div>
		<div class="col-md-6">
			{#each tasks as task}
				<div class="card card-body mt-2">
					<div class="d-flex justify-content-between">
						<h5>{task.title}</h5>
						<i class="material-icons" on:click={editTask(task)}
							>edit</i
						>
					</div>
					<p>{task.description}</p>
					<div>
						<button
							class="btn btn-danger"
							on:click={deleteTask(task.id)}
						>
							<i
								class="material-icons"
								style="vertical-align: middle;"
								>delete_forever</i
							>
							Delete
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- {JSON.stringify(tasks)} -->
</main>

<style>
</style>
