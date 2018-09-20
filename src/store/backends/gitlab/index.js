import actions from "./actions";
import mutations from "./mutations";

export default {
    state: {
        media: {
            files: [],
            page: 1,
            perPage: 10,
            totalPages: 1
        }
    },
    actions: actions,
    mutations: mutations
};
