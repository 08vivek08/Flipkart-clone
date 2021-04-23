import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    // loading: true,
    error: null
};

const buildNewCategories = (categories, category) => {
    let myCategories = [];
    if (!category.parentId) {
        myCategories = [...categories];
        myCategories.push(category);
    }
    else {
        for (let cat of categories) {
            if (cat._id === category.parentId) {
                myCategories.push({
                    ...cat,
                    children: [
                        ...cat.children,
                        category
                    ]
                });
            }
            else {
                myCategories.push({
                    ...cat,
                    children: cat.children && cat.children.length > 0 ? buildNewCategories(cat.children, category) : []
                });
            }
        }
    }
    return myCategories;
};

const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            state = {
                ...state,
                error: null,
                // loading: true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                error: null,
                // loading: false,
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                // loading: false,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                error: null,
                // loading: true,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const cate = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                children: []
            }
            const updatedCategories = buildNewCategories(state.categories, cate);
            state = {
                ...state,
                categories: updatedCategories,
                error: null,
                // loading: false,
            };
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                // loading: false,
            };
            break;
        case categoryConstants.UPDATE_CATEGORIES_REQUEST:
            state = {
                ...state,
                error: null,
                // loading:true,
            }
            break;
        case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                error: null,
                // loading: false,
            }
            break;
        case categoryConstants.UPDATE_CATEGORIES_FAILURE:
            state = {
                ...state,
                // loading:false,
                error: action.payload.error,
            }
            break;
        case categoryConstants.DELETE_CATEGORIES_REQUEST:
            state = {
                ...state,
                error: null,
                // loading:true,
            }
            break;
        case categoryConstants.DELETE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                error: null,
                // loading: false,
            }
            break;
        case categoryConstants.DELETE_CATEGORIES_FAILURE:
            state = {
                ...state,
                // loading:false,
                error: action.payload.error,
            }
            break;
        default:
            state = {
                ...state
            }
            break;
    }
    return state;
}

export default categoryReducer;