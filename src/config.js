const options = {
    type: "array",
    minItems: 1,
    items: {
        oneOf: [
        {
            type: "string"
        },
        {
            type: "object",
            required: ["label", "value"],
            properties: {
                label: {
                    type: "string"
                },
                value: {
                    type: "string"
                }
            }
        }
        ]
    }
};

const boolean = {
    type: "object",
    required: ["label", "name", "widget"],
    additionalProperties: false,
    properties: {
        label: {
            type: "string"
        },
        name: {
            type: "string"
        },
        widget: {
            type: "string",
            const: "boolean"
        },
        default: {
            type: "boolean"
        },
        required: {
            type: "boolean"
        }
    }
};

const select = {
    type: "object",
    required: ["label", "name", "widget", "options"],
    additionalProperties: false,
    properties: {
        label: {
            type: "string"
        },
        name: {
            type: "string"
        },
        widget: {
            type: "string",
            const: "s-select"
        },
        options: options,
        default: {
            type: "string"
        }
    }
};

const number = {
    type: "object",
    required: ["label", "name", "widget"],
    additionalProperties: false,
    properties: {
        label: {
            type: "string"
        },
        name: {
            type: "string"
        },
        widget: {
            type: "string",
            const: "number"
        },
        default: {
            type: "number"
        },
        max: {
            type: "number"
        },
        min: {
            type: "number"
        },
        required: {
            type: "boolean"
        }
    }
};

const image = {
    type: "object",
    required: ["label", "name", "widget"],
    additionalProperties: false,
    properties: {
        label: {
            type: "string"
        },
        name: {
            type: "string"
        },
        widget: {
            type: "string",
            const: "s-image"
        },
        default: {
            type: "string"
        },
        required: {
            type: "boolean"
        }
    }
};

const object = {
    type: "object",
    required: ["label", "name", "widget", "fields"],
    additionalProperties: false,
    properties: {
        label: {
            type: "string"
        },
        name: {
            type: "string"
        },
        widget: {
            type: "string",
            const: "s-object"
        },
        fields: {
            "$ref": "fields.json"
        },
        required: {
            type: "boolean"
        }
    }
};

const hidden = {
    type: "object",
    required: ["label", "name", "widget", "default"],
    additionalProperties: false,
    properties: {
        label: {
            type: "string"
        },
        name: {
            type: "string"
        },
        widget: {
            type: "string",
            const: "hidden"
        },
        default: {}
    }
};

const list = {
    type: "object",
    required: ["label", "name", "widget"],
    additionalProperties: false,
    properties: {
        label: {
            type: "string"
        },
        name: {
            type: "string"
        },
        widget: {
            type: "string",
            const: "list"
        },
        fields: {
            "$ref": "fields.json"
        },
        min: {
            type: "number"
        },
        max: {
            type: "number"
        },
        required: {
            type: "boolean"
        }
    }
};

const date = {
    type: "object",
    additionalProperties: false,
    required: ["label", "name", "widget"],
    properties: {
        label: {
            type: "string"
        },
        name: {
            type: "string"
        },
        widget: {
            type: "string",
            const: "date"
        },
        default: {
            type: "string"
        },
        required: {
            type: "boolean"
        },
        format: {
            type: "string"
        },
        min: {
            type: "string"
        },
        max: {
            type: "string"
        }
    }
};

const datetime = {
    type: "object",
    additionalProperties: false,
    required: ["label", "name", "widget"],
    properties: {
        label: {
            type: "string"
        },
        name: {
            type: "string"
        },
        widget: {
            type: "string",
            const: "datetime"
        },
        default: {
            type: "string"
        },
        required: {
            type: "boolean"
        },
        format: {
            type: "string"
        },
        min: {
            type: "string"
        },
        max: {
            type: "string"
        }
    }
};

const others = {
    type: "object",
    additionalProperties: false,
    required: ["label", "name", "widget"],
    properties: {
        label: {
            type: "string"
        },
        name: {
            type: "string"
        },
        widget: {
            type: "string",
            enum: [
                "string",
                "file",
                "markdown",
                "text",
                "s-text"
            ]
        },
        default: {
            type: "string"
        },
        required: {
            type: "boolean"
        },
        pattern: {
            type: "string",
            format: "regex"
        },
        max: {
            type: "number",
            minimum: 1
        },
        min: {
            type: "number",
            minimum: 1
        }
    }
};

const fields = {
    $id: "https://saleinacms.com/schemas/fields.json",
    type: "array",
    minItems: 1,
    items:  {
        oneOf: [
            boolean,
            select,
            number,
            object,
            list,
            others,
            image,
            hidden,
            date,
            datetime
        ]
    }
};

const tabs = {
    type: "array",
    minItems: 1,
    items: {
        type: "object",
        required: ["label", "fields"],
        properties: {
            label: {
                type: "string"
            },
            fields: fields
        }
    }
};

const folderCollections = {
    $id: "https://saleinacms.com/schemas/folder-collections.json",
    type: "object",
    required: ["label", "name", "folder", "tabs"],
    properties: {
        label: {
            type: "string"
        },
        name: {
            type: "string"
        },
        folder: {
            type: "string"
        },
        delete: {
            type: "boolean"
        },
        create: {
            type: "boolean"
        },
        description: {
            type: "string"
        },
        type: {
            type: "string",
            enum: [
                "yml",
                "toml",
                "json",
                "md"
            ],
            default: "md"
        },
        slug: {
            type: "string"
        },
        tabs: tabs
    }
};

const fileCollections = {
    type: "object",
    required: ["label", "name", "files"],
    properties: {
        label: {
            type: "string"
        },
        name: {
            type: "string"
        },
        description: {
            type: "string"
        },
        files: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                required: ["label", "name", "file", "tabs"],
                properties: {
                    label: {
                        type: "string"
                    },
                    name: {
                        type: "string"
                    },
                    delete: {
                        type: "boolean",
                        default: false
                    },
                    file: {
                        type: "string",
                        pattern: ".+\.json|yml|toml|md"
                    },
                    tabs: tabs
                }
            }
        }
    }
};

const collections = {
    type: "array",
    minItems: 1,
    items: {
        oneOf: [
            fileCollections,
            folderCollections
        ]
    }
};

const gitlab = {
    required: ["name", "repo", "client_id"],
    properties: {
        name: {
            type: "string",
            enum: ["gitlab"]
        },
        repo: {
            type: "string",
            pattern: "[\\w\\d]+\/[\\w\\d]+"
        },
        client_id: {
            type: "string"
        },
        branch: {
            type: "string",
            default: "master"
        }
    }
};

export default {
    type: "object",
    required: ["backend", "collections", "media_folder"],
    additionalProperties: false,
    properties: {
        backend: {
            type: "object",
            oneOf: [
                gitlab
            ]
        },

        url: {
            type: "string",
            format: "uri"
        },

        media_folder: {
            type: "string"
        },

        public_folder: {
            type: "string"
        },

        logo: {
            type: "string"
        },

        collections: collections
    }
};