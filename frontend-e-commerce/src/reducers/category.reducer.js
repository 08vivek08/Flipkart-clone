import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: true,
    error: null
};

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];
    if (!parentId) {
        myCategories = [...categories];
        myCategories.push({
            _id: category._id,
            name: category.name,
            slug: category.slug,
            parentId: category.parentId,
            children: category.children
        });
    }
    else {
        for (let cat of categories) {
            if (cat._id === parentId) {
                myCategories.push({
                    ...cat,
                    children: buildNewCategories(parentId, [
                        ...cat.children,
                        {
                            _id: category._id,
                            name: category.name,
                            slug: category.slug,
                            parentId: category.parentId,
                            children: category.children
                        }
                    ], category)
                });
            }
            else {
                myCategories.push({
                    ...cat,
                    children: cat.children && cat.children.length > 0 ? buildNewCategories(parentId, cat.children, category) : []
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
                // loading: true,
                error:null,
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                error:null,
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
        default:
            state = {
                ...state
            }
            break;
    }
    return state;
}

export default categoryReducer;