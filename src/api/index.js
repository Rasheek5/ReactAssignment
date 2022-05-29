import Axios from "axios";

export default Axios.create({
  baseURL: "https://randomuser.me/api?results=50",
});
