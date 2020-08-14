import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express( );

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333);

//GET: buscar ou listar informações
//POST: criar alguma informação 
//PUT: Atualizar uma informação existente
//DELETE: Deletar uma informação existente

// Corpo (Request Body): Dados para criação ou atualização de um registro  

//Route Params: Identificar qual recurso eu qureo atualizar ou deletar
//Query Params: Paginação, filtros, ordenação e configuração das consultas

// app.get('/users', (request, response) => {
//     console.log(request.body);

//     const users = [
//         { name: 'diego', age: 25 },
//         { name: 'peter', age: 20 },
//         { name: 'dani', age: 22 }
//     ];
    
//     return response.json(users);
// });