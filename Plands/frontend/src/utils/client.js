import axios from "axios";

const client = axios.create();

// 로컬 테스트 용
// client.defaults.baseURL = "http://localhost:9999/baekgu";

// 배포 서버 용
client.defaults.baseURL = "https://i8b109.p.ssafy.io:9995/baekgu";

export default client;
