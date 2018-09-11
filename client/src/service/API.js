import axios from 'axios'

console.log('api.js')
export default sss => {
    sss.axios.create({
        bareURL: 'http://localhost;8081/',
        timeout: 10000
    })
}
