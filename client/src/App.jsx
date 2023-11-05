import NavBar from "./components/NavBar/NavBar";
import Post from "./components/Post/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<>
			<NavBar />
			<div className="pt-24 px-8">
				<Routes>
					<Route
						index
						element={
							<div className="lg:px-52 px-8">
								<Post />
								<Post />
							</div>
						}
					/>
					<Route path="/login" element={<Login/>} />
					<Route path="/register" element={<Register/>} />
				</Routes>
			</div>
		</>
	);
}

export default App;
