const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			category: {
				description: "",
				id: "",
				image: "",
				name: "",
				profiles: [],
				carousel: ""
			},
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			getCategory: async (categoryName) => {
				try {
					const request = await fetch(process.env.BACKEND_URL + "/api/category/" + categoryName, { method: "GET" })
					if (request.status !== 200) {

					}
					const data = await request.json()
					setStore({ category: data.category })
					return data

				} catch (error) {
					console.error("hubo un error al obtener esta categoria")
					console.error(error)
					throw new Error(error)
				}
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.error("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
