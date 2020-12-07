const express = require("express");
const cors = require("cors");
const {uuid} = require('uuidv4');



// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
}); 

app.post("/repositories", (request, response) => {
const {title, url, techs} = request.body;//não pede o n° de likes 
const repo = {id:uuid(), title, url, techs, likes:0};//cria os likes com 0

repositories.push(repo);

return response.json(repo)
});

app.put("/repositories/:id", (request, response) => {
const {id} = request.params; //o que vou usar como filtro
const {title, url, techs} = request.body;//o que vou editar

const repoIndex = repositories.findIndex(repo => repo.id === id);
if(repoIndex < 0){
  return response.status(400).json({Error:"Repositorie not Foud"})
}
const repo = {
  id,
  title,
  url,
  techs,
  likes: repositories[repoIndex].likes
};

repositories[repoIndex] = repo;
return response.json(repo);


});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params; //o que vou usar como filtro

  const repoIndex = repositories.findIndex(repo => repo.id === id);
if(repoIndex < 0){
  return response.status(400).json({Error:"Repositorie not Foud"})
}

repositories.splice(repoIndex, 1);

return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params; 
  
  const repoIndex = repositories.findIndex(repo=>repo.id === id)

  if(repoIndex === -1){
    return response.status(400).json({Error: "Repositorie not Foud"})
  }
  
  repositories[repoIndex].likes += 1; //modifica os likes no repo
  
  return response.json(repositories[repoIndex])
  
});

module.exports = app;
