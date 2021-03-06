import axios from "axios";

const BASE_URL = "/api";
const instance = axios.create({ baseURL: BASE_URL });

const getAll = () => {
  return instance.get("persons").then((response) => response.data);
};

const create = (payload) => {
  return instance.post("persons", payload).then((response) => response.data);
};

const put = (payload) => {
  return instance
    .put(`persons/${payload._id}`, payload)
    .then((response) => response.data);
};

const remove = (id) => {
  return instance.delete(`persons/${id}`).then((response) => response.data);
};

export default { getAll, create, remove, put };
