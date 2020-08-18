const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');
const { request, response } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateId(request, response, next){
  const { id } = request.params
  const indexRepository = repositories.findIndex(repository => repository.id == id)
  if(indexRepository == -1){
    return response.status(400).json({error: "id not found"})
  }
    return next();
}
app.use("/repositories/:id", validateId);

app.get("/repositories", (request, response) => {
   return response.json(repositories)
});

app.post("/repositories", (request, response) => {
   const { title, url, techs } = request.body

   const id = uuid();
   const likes = 0;

   const repository = { id, title, url, techs, likes}
   repositories.push(repository);

   return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body
  const { id } = request.params

  const indexRepository = repositories.findIndex(repository => repository.id == id)
  console.log(indexRepository)
  repositories[indexRepository].title = title
  repositories[indexRepository].url = url
  repositories[indexRepository].techs = techs

  return response.json(repositories[indexRepository])

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const indexRepository = repositories.findIndex(repository => repository.id == id)

  repositories.splice(indexRepository, 1)

  return response.status(204).json({})

   
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const indexRepository = repositories.findIndex(repository => repository.id == id)
  repositories[indexRepository].likes++

  return response.json(repositories[indexRepository])
   
});

module.exports = app;
