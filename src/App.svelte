<script>
	import {
		addDoc,
		collection,
		onSnapshot,
		deleteDoc,
		doc,
	} from "firebase/firestore";
	import { onDestroy } from "svelte";

	import { db } from "./firebase";

	let task = {
		title: "",
		description: "",
	};

	let tasks = [];

	const handleSubmit = async () => {
		try {
			await addDoc(collection(db, "tasks"), task);
			console.log("task saved");
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTask = async (id) => {
		try {
			// TODO: confirm alert pending
			await deleteDoc(doc(db, "tasks", id));
			console.log("task deleted");
		} catch (error) {
			console.log(error);
		}

		await deleteDoc(doc(db, "tasks", id));
		console.log("task deleted");
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

<main>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="title">Title</label>
		<input
			bind:value={task.title}
			type="text"
			placeholder="Write a title"
		/>

		<label for="description">Description</label>
		<textarea
			bind:value={task.description}
			id="description"
			rows="3"
			placeholder="Write a description"
		/>

		<button> Save </button>
	</form>

	<!-- {JSON.stringify(tasks)} -->

	{#each tasks as task}
		<div>
			<h5>{task.title}</h5>
			<p>{task.description}</p>

			<button on:click={deleteTask(task.id)}>Delete</button>
			<button>Edit</button>
		</div>
	{/each}
</main>

<style>
</style>
