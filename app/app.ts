import { ExpressConf } from './conf/expressConf';
import { MongooseConf } from './conf/mongooseConf';
const auth = require("./conf/authConf");
import * as co from 'co';
import * as bcrypt from "bcrypt";

const app:any = new ExpressConf();
let mongo = new MongooseConf();

/**
 * x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGEyMzU2YmIwNTk2MDI3N2QxM2IwYzIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NzA5NzM4ODN9.XZlKJ02GWyIIsCvBPoXeJ47Wmfwp111kyXv_D7iLwwk
 * body:
 * {
	"email":"marciarosadasneves-83@mpeventos.com.br",
	"senha":"IFwYRu2ioU"
}
 */
app.get('/current',auth,async(req,res)=>{
  const user = await mongo.findPassById(req);
  res.send(user);
})

/**
 * 
 * body:
 * {
	"email":"marciarosadasneves-83@mpeventos.com.br",
	"senha":"IFwYRu2ioU"
}
 */
app.post('/',async(req,res)=>{
  // validate the request body first
  co(function* () {
    return yield mongo.validateToken(req);
  }).then(function (value) {
    res.send(value);
  }, function (err) {
    res.send(err);
  });
  
})


/**
 * header:
 * x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGEyMzU2YmIwNTk2MDI3N2QxM2IwYzIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NzA5NzM4ODN9.XZlKJ02GWyIIsCvBPoXeJ47Wmfwp111kyXv_D7iLwwk
 */
app.get('/usuarios',auth,(req,res)=>{
    co(function* () {
        return yield mongo.listaUsuarios(req);
      }).then(function (value) {
        res.send(value);
      }, function (err) {
        res.send(err);
      });
})

/**
 * header:
 * x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGEyMzU2YmIwNTk2MDI3N2QxM2IwYzIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NzA5NzM4ODN9.XZlKJ02GWyIIsCvBPoXeJ47Wmfwp111kyXv_D7iLwwk
 * params accepted
 * body:
 * "nome" : {type: String, required: true,text:true}, 
                "sobrenome" : {type: String, required: true,text:true}, 
                "idade" : {type: Number, required: false,text:true}, 
                "cpf" : {type: String, required: true,text:true}, 
                "rg" : {type: String, required: false,text:true}, 
                "data_nasc" : {type: Date, required: true,text:true}, 
                "genero" : {type: String, required: true,text:true}, 
                "signo" : {type: String, required: false,text:true}, 
                "mae" : {type: String, required: false,text:true}, 
                "pai" : {type: String, required: false,text:true}, 
                "email" : {type: String, required: true,text:true}, 
                "senha" : {type: String, required: false,text:true}, 
                "cep" : {type: String, required: false,text:true}, 
                "endereco" : {type: String, required: true,text:true}, 
                "numero" : {type: Number, required: false,text:true}, 
                "bairro" : {type: String, required: false,text:true}, 
                "cidade" : {type: String, required: false,text:true}, 
                "estado" : {type: String, required: false,text:true}, 
                "telefone_fixo" : {type: String, required: false,text:true}, 
                "celular" : {type: String, required: false,text:true}, 
                "altura" : {type: Number, required: false,text:true}, 
                "peso" : {type: Number, required: false,text:true}, 
                "tipo_sanguineo" :{type: String, required: false,text:true}, 
                "cor" : {type: String, required: false,text:true},
                "imagemurl" : {type: String, required: false,text:true},
 */
app.put('/usuarios/:id',auth,(req,res)=>{
    co(function* () {
        return yield mongo.alteraUsuario(req.params.id,req);
      }).then(function (value) {
        res.send(value);
      }, function (err) {
        res.send(err);
      });
})

/**
 * header:
 * x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGEyMzU2YmIwNTk2MDI3N2QxM2IwYzIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NzA5NzM4ODN9.XZlKJ02GWyIIsCvBPoXeJ47Wmfwp111kyXv_D7iLwwk
 * 
 */
app.delete('/usuarios/:id',auth,(req,res)=>{
    co(function* () {
        return yield mongo.deletaUsuario(req.params.id,req);
      }).then(function (value) {
        res.send(value);
      }, function (err) {
        res.send(err);
      });
})

/**
 * header:
 * x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGEyMzU2YmIwNTk2MDI3N2QxM2IwYzIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NzA5NzM4ODN9.XZlKJ02GWyIIsCvBPoXeJ47Wmfwp111kyXv_D7iLwwk
 */
app.get('/usuarios/:paramFind',auth,(req,res)=>{
    co(function* () {
        return yield mongo.findUsuarios(req);
      }).then(function (value) {
        res.send(value);
      }, function (err) {
        res.send(err);
      });
})

/**
 * header:
 * x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGEyMzU2YmIwNTk2MDI3N2QxM2IwYzIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NzA5NzM4ODN9.XZlKJ02GWyIIsCvBPoXeJ47Wmfwp111kyXv_D7iLwwk
 * body:
 *              "nome" : {type: String, required: true,text:true}, 
                "sobrenome" : {type: String, required: true,text:true}, 
                "idade" : {type: Number, required: false,text:true}, 
                "cpf" : {type: String, required: true,text:true}, 
                "rg" : {type: String, required: false,text:true}, 
                "data_nasc" : {type: Date, required: true,text:true}, 
                "genero" : {type: String, required: true,text:true}, 
                "signo" : {type: String, required: false,text:true}, 
                "mae" : {type: String, required: false,text:true}, 
                "pai" : {type: String, required: false,text:true}, 
                "email" : {type: String, required: true,text:true}, 
                "senha" : {type: String, required: false,text:true}, 
                "cep" : {type: String, required: false,text:true}, 
                "endereco" : {type: String, required: true,text:true}, 
                "numero" : {type: Number, required: false,text:true}, 
                "bairro" : {type: String, required: false,text:true}, 
                "cidade" : {type: String, required: false,text:true}, 
                "estado" : {type: String, required: false,text:true}, 
                "telefone_fixo" : {type: String, required: false,text:true}, 
                "celular" : {type: String, required: false,text:true}, 
                "altura" : {type: Number, required: false,text:true}, 
                "peso" : {type: Number, required: false,text:true}, 
                "tipo_sanguineo" :{type: String, required: false,text:true}, 
                "cor" : {type: String, required: false,text:true},
                "imagemurl" : {type: String, required: false,text:true},
 */
app.post('/usuarios',auth,(req,res)=>{
    co(function* () {
        return yield mongo.adicionaUsuario(req.body,req);
      }).then(function (value) {
        res.send(value);
      }, function (err) {
        res.send(err);
      });
})

/**
 * 
 * header:
 * x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGEyMzU2YmIwNTk2MDI3N2QxM2IwYzIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NzA5NzM4ODN9.XZlKJ02GWyIIsCvBPoXeJ47Wmfwp111kyXv_D7iLwwk
 * body:
 * {
    "arrFields":["nome","cpf","mae","numero"]
    }
 */
app.post('/usuarios/files/csv',auth,(req,res)=>{
    co(function* () {
        return  [yield mongo.listaUsuarios(req),req.body];
      }).then(function (value) {
        res.csv(
        value[0],
        {fields:value[1].arrFields});
      }, function (err) {
        res.send(err);
      });
})

app.listen(9090,async ()=>{
    console.log('api is running');   
})