export default (query) => {
    if (query) {
        const queryString = query.split("?")[1];
        if (queryString.length > 0) {
            const params = queryString.split("&");
            const paramsObj = {};
            params.forEach(param => {
                const keyVal = param.split("=");
                paramsObj[keyVal[0]] = keyVal[1];
            });
            return paramsObj;
        }
    }
    return {};
}