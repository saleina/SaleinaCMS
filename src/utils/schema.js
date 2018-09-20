export function getSchemaForFields(fields) {

	let schema = {};

	fields.forEach(field => {

		let s = {};

		// since json schema definition doesn't allow
		// setting defaults in oneOf
		// make sure a field is required unless
		// explicitly stated otherwise
		if (field.required || field.required === undefined) {

			if (field.widget !== "list") {

				s["presence"] = {
					message: `${field.label} is required`,
					allowEmpty: false
				}

			} else {

				s["presence"] = {
					message: `${field.label} are required`,
					allowEmpty: false
				}

			}

		};

		if (field.widget !== "number") {

			if (field.max || field.min) s["length"] = {};

			if (field.max) {
				s["length"].maximum = field.max;
				s["length"].tooLong = `${field.label} must be less or equal to ${field.max}`;
			}

			if (field.min) {
				s["length"].minimum = field.min;
				s["length"].tooShort = `${field.label} must be greater or equal to ${field.min}`
			}

			if (field.pattern) s["format"] = {
				pattern: field.pattern,
				message: `Must be a valid ${field.label}`
			};

		} else {

			if (field.max || field.min) s["numericality"] = {};

			if (field.max) {
				s["numericality"].lessThanOrEqualTo = field.max;
				s["numericality"].notLessThanOrEqualTo = `${field.label} must be less than or equal to ${field.max}`;
			}

			if (field.min) {
				s["numericality"].greaterThanOrEqualTo = field.min;
				s["numericality"].notGreaterThanOrEqualTo = `${field.label} must be greater than or equal to ${field.min}`;
			}

		}

        // recursively generate nested validation
        // schema for object widgets
		if (field.widget === "s-object") {

            let objectSchema = getSchemaForFields(field.fields);

            for (let s in objectSchema) {

                let name = field.name + "." + s;

                schema[name] = objectSchema[s];

            }

		}

		schema[field.name] = s;

	});

	return schema;

};

export function getDefaultDataForFields(fields) {

	let data = {};

	fields.forEach(field => {

		data[field.name] = field.default;

	});

	return data;

};