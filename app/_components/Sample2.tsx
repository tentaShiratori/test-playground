import { debounce } from "lodash-es";
import { FC, useEffect, useMemo, useState } from "react";
import { callAPI } from "../../lib/api";
export const Sample: FC = () => {
	const [search, setSearch] = useState("");
	const [todos, setTodos] = useState<{ title: string }[]>([]);
	const searchTodo = useMemo(() => {
		return debounce(async (s) => {
			try {
				const res = await callAPI(s);
				setTodos(await res.json());
			} catch (e) {
				setTodos([]);
			}
		}, 500);
	}, []);

	useEffect(() => {
		searchTodo(search);
	}, [search, searchTodo]);
	return (
		<div>
			<input value={search} onChange={(e) => setSearch(e.target.value)} />
			<ul>
				{todos.map((todo, i) => {
					return <li key={todo.title}>{todo.title}</li>;
				})}
			</ul>
		</div>
	);
};
