import { GET_CATEGORY_LIST } from '@store/category/actions';
import { CATEGORY_LIST } from '@store/category/mutations';

import { GET_SUBHEAD_LIST } from '@store/subHead/actions';
import { SUBHEAD_LIST } from '@store/subHead/mutations';

export default {
    computed: {
        categoryList () {
            return this.$store.state.category.categoryList;
        },
        subHeadList () {
            return this.$store.state.subHead.subHeadList;
        }
    },
    methods: {
        getCategoryList () {
            this.$store.dispatch(GET_CATEGORY_LIST)
            .then((response) => {
                if (response.data) {
                    this.$store.commit(CATEGORY_LIST, response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        getSubHeadList () {
            this.$store.dispatch(GET_SUBHEAD_LIST)
            .then((response) => {
                if (response.data) {
                    this.$store.commit(SUBHEAD_LIST, response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
};