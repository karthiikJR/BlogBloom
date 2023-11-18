import Layout from "./pages/Layout";
import Post from "./components/Post/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatPost from "./pages/CreatPost";
import IndexPage from "./pages/IndexPage";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";

import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./helpers/context/UserContext";

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<IndexPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/create" element={<CreatPost />} />
					<Route path="/posts/:id" element={<PostPage />} />
					<Route path="/editpost/:id" element={<EditPost />} />
				</Route>
			</Routes>
		</UserContextProvider>
	);
}

export default App;
