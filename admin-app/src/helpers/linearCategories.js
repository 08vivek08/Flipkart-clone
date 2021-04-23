const createCategoryList = (categorylist = [], list = []) => {
    for (let cate of categorylist) {
        list.push(
            <option
                value={cate._id}
                key={cate._id}
                parentid={cate.parentId ? cate.parentId : ''}
                catetype={cate.type ? cate.type : ''}
            >
                {cate.name}</option>
        );
        if (cate.children && cate.children.length > 0) {
            createCategoryList(cate.children, list)
        }
    }
    return list;
};
export default createCategoryList;