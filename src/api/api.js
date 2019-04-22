import url from '@/api/index'
import {post} from '@/api/htttp'

const api = {
    login(username, password) {
        let data = {
            username, password
        };
        return post(url.BASE_URL + url.Login, data);
    },

};

export default api
