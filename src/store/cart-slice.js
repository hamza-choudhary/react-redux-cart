import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
		totalQuantity: 0,
		changed: false
		// totalAmount: 0
	},
	reducers: {
		//! don't perform any synchronous or asynchronous tasks in reducer function it shout be pure
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity
			state.items = action.payload.items
		},
		addToCart(state, action) {
			const newItem = action.payload
			const existingItem = state.items.find((item) => item.id === newItem.id)
			state.totalQuantity++
			state.changed = true

			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price * 1, //quantity
					name: newItem.title,
				})
			} else {
				//? don't need to push here bcz existing items are object which has the same reference
				//? of state if we copy existing item into a new const variable then it will not effect
				//? the original state bcz it is now a brand new obj
				existingItem.quantity++
				existingItem.totalPrice += newItem.price
			}
		},
		removeFromCart(state, action) {
			const id = action.payload
			const existingItem = state.items.find((item) => item.id === id)
			state.totalQuantity--
			state.changed = true

			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id)
			} else {
				existingItem.quantity--
				existingItem.totalPrice -= existingItem.price
			}
		},
	},
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer
