export const updateValues = event => {
	return {
		type: "UPDATE_VALUES",
		payload: {
		 values: {
				[event.target.name]: event.target.value
			}, 
			errors: {
				[event.target.name]: '',
			}
		}
	};
};

export const errorData = (payload)  => {
	return {
		type: "ERROR_DATA",
		payload
	};
};

export const handleFocus = () => {
	return {
		type: "FOCUS_FIELD",
	};
};

export const handleBlur = () => {
	return {
		type: "BLUR_FIELD",
	};
};

export const getCountries = () => {
	return dispatch =>  {
		dispatch({
			type: "FETCH_COUNTRIES"
		});
		const link = 'http://localhost:3002/countries'
		fetch(link)
			.then(response => {
				return response.json()
			})
			.then(data => {
				dispatch({
					type: "SUCCESS_COUNTRIES",
					payload: data
				});
			})
	};
};
