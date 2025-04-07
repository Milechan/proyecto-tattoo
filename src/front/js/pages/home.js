import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Categories } from "../component/Categories.js";
import { TopLikes } from "../component/TopLikes.js";
import { TopTattooers } from "../component/TopTattooers.js";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home-container">
			<Categories />
			<TopLikes />
			<TopTattooers />
		</div>
	);
};
