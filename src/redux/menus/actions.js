import types from "./types" 

export const toggleMenu = menuId => ({
	type: types.TOGGLE_MENU,
	payload: menuId
})

export const closeAllMenus = () => ({
	type: types.CLOSE_ALL_MENUS,
	payload: null
})