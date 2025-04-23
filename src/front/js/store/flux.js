const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || null,
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
						const unreadCount = data.user.notifications?.filter(n => !n.is_read).length || 0;
						setStore({
							user: data.user,
							notificationCount: unreadCount
						});
					}
				} catch (error) {
					console.error("Error al obtener el usuario:", error);
				}
			},

			markNotificationAsRead: async (id) => {
				try {
					const store = getStore();
					const action = getActions();

					console.log("Marcando notificación como leída con ID:", id);
					console.log("Token usado:", store.token);

					const resp = await fetch(`${process.env.BACKEND_URL}/api/notification/${id}/readed`, {
						method: "PUT",
						headers: {
							Authorization: `Bearer ${store.token}`
						}
					});

					if (resp.ok) {
						const updatedUser = {
							...store.user,
							notifications: store.user.notifications.map(n =>
								n.id === id ? { ...n, is_read: true } : n
							)
						};

						const updatedCount = updatedUser.notifications.filter(n => !n.is_read).length;

						setStore({
							user: updatedUser,
							notificationCount: updatedCount
						});
						action.getUser();
					} else {
						console.error("Error al marcar como leída:", resp.status);
					}
				} catch (error) {
					console.error("Error al marcar como leída:", error);
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
