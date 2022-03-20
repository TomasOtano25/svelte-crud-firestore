<script>
	import { addDoc, collection, onSnapshot } from "firebase/firestore";

	import { db } from "./firebase";

	let task = {
		title: "",
		description: "",
	};
	const handleSubmit = async () => {
		await addDoc(collection(db, "tasks"), task);
		console.log("task saved");
	};
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
</main>

<style>
</style>
