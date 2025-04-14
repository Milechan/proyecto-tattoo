const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || null, // 🔐 Guarda el token en el store
			category: {
				description: "",
				id: "",
				image: "",
				name: "",
				profiles: [],
				carousel: ""
			},
			message: null,
			user: {
				id: "",
				name: "",
				username: "",
				email: "",
				notification_enabled: false,
				user_type: {},
				created_at: "",
				profile: {
					profile_picture: ""
				},
				reviews: [],
				posts: [],
				notifications: [],
			},
			profile: {
				id: '',
				bio: '',
				profile_picture: '',
				ranking: 0,
				social_media_facebook: '',
				social_media_insta: '',
				social_media_wsp: '',
				social_media_x: '',
				user_id: ''
			},
			notificationCount: 0,
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
					const request = await fetch(process.env.BACKEND_URL + "/api/category/" + categoryName);
					const data = await request.json();
					setStore({
						category: {
							...data.category,
							carousel: JSON.parse(data.category.carousel)
						}
					});
					return data;
				} catch (error) {
					console.error("Error al obtener esta categoría:", error);
					throw error;
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo });
			},

			changeUser: (user) => {
				setStore({ user });
			},

			changeProfile: (profile) => {
				setStore({ profile });
			},

			getUser: async (token = null) => {
				try {
					const currentToken = token || getStore().token;
					const response = await fetch(process.env.BACKEND_URL + '/api/user', {
						method: 'GET',
						headers: {
							Authorization: `Bearer ${currentToken}`
						}
					});
					const data = await response.json();
					if (data.success) {
						setStore({ user: data.user });
					}
				} catch (error) {
					console.error("Error al obtener el usuario:", error);
				}
			},

			getProfile: async (userId) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/profile/' + userId);
					const data = await response.json();
					setStore({ profile: data });
				} catch (error) {
					console.error("Error al obtener el perfil:", error);
				}
			},

			updateNotificationCount: (count) => {
				setStore({ notificationCount: count });
			},

			saveToken: (token) => {
				localStorage.setItem("token", token);
				setStore({ token });
			},

			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null, user: {}, notificationCount: 0 });
			}
		}
	};
};

export default getState;
