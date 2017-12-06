import axios from 'axios';
import { apiUrl } from '../../config'

// allow use http client without Vue instance
export const http = axios.create({
    baseURL: apiUrl,
})

/**
 * defino o axios como $http padrao, para usar somente this.$http
 */
export default {
    install: function (Vue, name = '$http') {
        Object.defineProperty(Vue.prototype, '$http', {
            get() {
                return http
            },
        })
    }
}
