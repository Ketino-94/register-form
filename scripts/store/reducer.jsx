
const initialState = {
	values: {
		username: '',
		code: 0,
		mobile: '',
		email: '',
		country: 0,
		password: '',
		repeatPassword: '',
		agree: '',
	},
	errors: {
		username: '',
		code: 0,
		mobile: '',
		email: '',
		country: 0,
		password: '',
		repeatPassword: '',
		agree: ''
	},
	isActive: false,
	countries: []
}

const reducers  = (state = initialState, action) => {
	switch (action.type) {
		case "UPDATE_VALUES":
			return {
				...state,
				values: {
					...state.values,
					...action.payload.values
				},
				errors: {
					...state.errors,
					...action.payload.errors
				}
			};
		case "SUCCESS_COUNTRIES":
			return {
				...state,
				countries: action.payload
			}
		case "ERROR_DATA":
			return {
				...state,
				errors: {
					username: action.payload.username,
					mobile: action.payload.mobile,
					email: action.payload.email,
					password: action.payload.password,
					repeatPassword: action.payload.repeatPassword,
				}
			}
		case "FOCUS_FIELD":
			return {
				...state,
				isActive: true,
			}
		case "BLUR_FIELD":
			return {
				...state,
				isActive: false
			}
		default:
			return state;
	}
		
}


export default reducers ;