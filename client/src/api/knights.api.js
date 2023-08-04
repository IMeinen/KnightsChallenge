import httpClient from "./httpClient";
const END_POINT = "/knights";

const getAllKnights = () =>
  httpClient.get(END_POINT).then((response) => response.data.data);

const getKnightById = (id) =>
  httpClient
    .get(`${END_POINT}/${id}`)
    .then((response) => response.data.data)
    .catch((e) => {
      console.log("ERROR", e);
    });

const deleteKnight = (id) =>
  httpClient
    .delete(`${END_POINT}/${id}`)
    .then((response) => {
      console.log(response.data);
      return response.data.data;
    })
    .catch((e) => {
      console.log("ERROR", e);
    });

const updateKnight = (id,newNickName) => httpClient
.put(`${END_POINT}/${id}`,{nickname : newNickName})
.then((response) => response.data.data)
.catch((e) => {
  console.log("ERROR", e);
});

const createKnight = (payload) => httpClient
.post(`${END_POINT}`,payload)
.then((response) => response.data.data)
.catch((e) => {
  console.log("ERROR", e);
});

const getAllHeroes = () =>
  httpClient.get(`${END_POINT}?filter=heroes`).then((response) => response.data.data);

export { getAllKnights, deleteKnight, getKnightById,updateKnight,createKnight,getAllHeroes };
