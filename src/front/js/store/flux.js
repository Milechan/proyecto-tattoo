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
			user: {
				id: "",
				name: "",
				username: "",
				email: "",
				notification_enabled: false,
				user_type: {},
				created_at: "",
				profile: [],
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
			notificationCount: 0, // 🔔 contador de notificaciones no leídas
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
					const request = await fetch(process.env.BACKEND_URL + "/api/category/" + categoryName, { method: "GET" });
					if (request.status !== 200) { }
					const data = await request.json();
					setStore({
						category: {
							...data.category,
							carousel: JSON.parse(data.category.carousel)
						}
					});
					return data;
				} catch (error) {
					console.error("hubo un error al obtener esta categoria");
					console.error(error);
					throw new Error(error);
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			},

			changeUser: (user) => {
				setStore({ user });
			},

			changeProfile: (profile) => {
				setStore({ profile });
			},

			getUser: async (token) => {
				try {
					const actions = getActions();
					const response = await fetch(process.env.BACKEND_URL + '/api/user', {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`
						}
					});
					const data = await response.json();
					actions.changeUser(data.user);
				} catch (error) {
					console.error("Error al obtener el usuario:", error);
				}
			},

			getProfile: async (userId) => {
				try {
					const actions = getActions();
					const response = await fetch(process.env.BACKEND_URL + '/api/profile/' + userId, {
						method: "GET"
					});
					const data = await response.json();
					console.warn(data);
					actions.changeProfile(data);
				} catch (error) {
					console.error("Error obteniendo el perfil");
				}
			},

			// 🔔 NUEVA ACCIÓN: Actualizar el contador de notificaciones globalmente
			updateNotificationCount: (count) => {
				setStore({ notificationCount: count });
			}
		}
	};
};

export default getState;
