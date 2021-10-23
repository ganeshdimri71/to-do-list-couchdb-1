import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "./TodoList.module.css";

/* function TodoApp() {
	const [task, setTask] = useState("");
	const [tasklist, setTasklist] = useState([]);
	const token = Buffer.from(`${"admin"}:${"morgan2d"}`, "utf-8").toString(
		"base64"
	);

	const handleChange = (e) => {
		setTask(e.target.value);
	};

	const deleteHandler = (id, e) => {
		setTasklist(tasklist.filter((t) => t.id !== id));
	};

	const addTask = (e) => {
		const taskDetails = {
			id: Math.floor( Math.random() * 1000 ),
			name: task,

		};

		axios
			.put(`http://localhost:5984/todo-list/${taskDetails.id}`, taskDetails, {
				headers: {
					Authorization: `Basic ${token}`,
				},
			})
			.then( ( res ) => {
				taskDetails.rev = res.data.rev
				console.log(res);
			})
			.catch((err) => console.log(err));

		setTasklist( [ ...tasklist, taskDetails ] );
		console.log(tasklist);
	};

	const deleteTask = ( id, rev,e ) => {
		
		const deleteId = id;
		deleteHandler(deleteId,e);
		axios
			.delete(
			`http://localhost:5984/todo-list/${id}?rev=${rev}`,
				{
					headers: {
						Authorization: `Basic ${token}`,
					},
				}
			)
			.then( ( res ) => console.log( res.data ) );
		
	};
	// console.log("tasklist", tasklist);

	return (
		<div className="todo">
			<input type="text" onChange={handleChange} />
			<button onClick={addTask}>Add</button>

			{tasklist.map((t) => (
				<ul>
					<li>
						{t.name}
						
						<button onClick={() => deleteTask(t.id, t.rev)}>Delete</button>
					</li>
				</ul>
			))}
		</div>
	);
}
export default TodoApp */

function TodoApp1() {
	const [task, setTask] = useState("");
	const [tasklist, setTasklist] = useState([]);
	const [update, setUpdateValue] = useState("");
	const token = Buffer.from(`${"admin"}:${"morgan2d"}`, "utf-8").toString(
		"base64"
	);
	const [rev, setRev] = useState("1-0874c5546415654dde533b77b3bbd4f5");

	const handleChange = (e) => {
		setTask(e.target.value);
	};

	const updateValue = (e) => {
		setUpdateValue(e.target.value);
	};

	useEffect(() => {
		axios
			.get(
				"http://localhost:5984/todolist-1/c7aebe13a5175ecf636d69605203051b",
				{
					headers: {
						Authorization: `Basic ${token}`,
					},
				}
			)
			.then((response) => {
				console.log(response.data);
				setTasklist(response.data.name);
				setRev(response.data._rev);
				console.log(response.data);
			});

		console.log("I am called : ");
	}, [rev]);

	// taskDetails = ["Ramesh"]
	const addTask = (e) => {
		console.log(tasklist, task);
		const taskDetails = {
			name: [...tasklist, task],
			_rev: rev,
		};

		axios
			.put(
				`http://localhost:5984/todolist-1/c7aebe13a5175ecf636d69605203051b`,
				taskDetails,
				{
					headers: {
						Authorization: `Basic ${token}`,
					},
				}
			)
			.then((res) => {
				setRev(res.data.rev);
				console.log("The value of response : ", res);
				console.log("Rev is : ", rev);
				console.log(res);
				/* console.log('Tasklist',tasklist); */
			})
			.catch((err) => console.log(err));
	};

	const deleteItem = (index) => {
		tasklist.splice(index, 1);
		setTasklist(tasklist);
		const taskDetails = {
			name: [...tasklist],
			_rev: rev,
		};

		axios
			.put(
				`http://localhost:5984/todolist-1/c7aebe13a5175ecf636d69605203051b`,
				taskDetails,
				{
					headers: {
						Authorization: `Basic ${token}`,
					},
				}
			)
			.then((res) => {
				setRev(res.data.rev);
				console.log("The value of response : ", res);
				console.log("Rev is : ", rev);
				console.log(res);
				/* console.log('Tasklist',tasklist); */
			})
			.catch((err) => console.log(err));
		console.log("The value of tasklist in the deleteItem is : ", tasklist);

		/* 	setTasklist(items) */
	};
	const updateValueinCouch = (index) => {
		tasklist.splice(index, 1, update);
		setTasklist(tasklist);
		const taskDetails = {
			name: [...tasklist],
			_rev: rev,
		};

		axios
			.put(
				`http://localhost:5984/todolist-1/c7aebe13a5175ecf636d69605203051b`,
				taskDetails,
				{
					headers: {
						Authorization: `Basic ${token}`,
					},
				}
			)
			.then((res) => {
				setRev(res.data.rev);
				console.log("The value of response : ", res);
				console.log("Rev is : ", rev);
				console.log(res);
				/* console.log('Tasklist',tasklist); */
			})
			.catch((err) => console.log(err));
		console.log("The value of tasklist in the deleteItem is : ", tasklist);

		/* 	setTasklist(items) */
	};

	/* return (
		<div className="form">
			<input className="form__input" type="text" onChange={handleChange} id="todo" />
			<button onClick={addTask}>Add</button>
			{tasklist.map((t, index) => (
				<ul>
					<li>
						{t}
						<button onClick={() => deleteItem(index)}>Delete</button>
						<button onClick={() => updateValueinCouch(index)}>Update</button>
						<input
							type="text"
							placeholder="Enter the updated value here"
							onChange={updateValue}
						/>
					</li>
				</ul>
			))}
		</div>
	); */
	return (
		<div className="form">
			<div className={Styles.form}>
				<input
					className={Styles.form__input}
					type="text"
					onChange={handleChange}
					id="todo"
					placeholder=""
				/>
				<label className={Styles.form__label} for="todo">
					Enter Data Here
				</label>
				<button
					className={`btn btn-outline-success ${Styles.form__button}`}
					onClick={addTask}
				>
					Add
				</button>
			</div>

			{tasklist.map((t, index) => (
				<ul className={Styles.form__ul}>
					<li className={Styles.form__li}>
						<span className={Styles.form__span}>
							Value : <b>{t}</b>{" "}
						</span>

						<input
							className={Styles.form__output}
							type="text"
							placeholder="Updated value here"
							onChange={updateValue}
						/>
						<div className={Styles.form_button1}>
							<button className="btn btn-danger" onClick={() => deleteItem(index)}>Delete</button>
							<button className="btn btn-success" onClick={() => updateValueinCouch(index)}>Update</button>
						</div>
					</li>
				</ul>
			))}
		</div>
	);
}
export default TodoApp1;
