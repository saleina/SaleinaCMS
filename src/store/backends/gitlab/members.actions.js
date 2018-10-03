export default {

	getMembersList(context) {

		let id = context.getters.id;

		return new Promise((resolve, reject) => {

			this._vm.$fetch(`https://gitlab.com/api/v4/projects/${id}/members/`)
			.then(response => {

				if (response.ok) return response.json();

				reject(response.status);

			})
			.then(data => {

				resolve(data);

			})
			.catch(error => {

				reject(error);

			});

		});

	}

};