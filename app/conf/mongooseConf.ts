import * as mongoose from 'mongoose'
import { User } from '../schema/user';
import { History } from '../schema/history';

import * as textSearch  from 'mongoose-text-search'
import bodyParser = require('body-parser');

interface findModel {
    rg: string;
}

export class MongooseConf{
    
    mongoose :any;
    schema :any;
    usuarios:any;
    historico:any;

    constructor(){
        this.mongoose = mongoose.connect('mongodb+srv://root:root@cluster0-g64v1.gcp.mongodb.net/test?retryWrites=true&w=majority');
        this.schema = mongoose.Schema;
        this.usuarios = new User().dataSchema();
        this.historico = new History().dataSchema();
    }

    listaUsuarios(params){
        return new Promise((res,rej)=>{
            this.usuarios.find().then(
                (result)=>{
                    console.log(params)
                    new History().salvaHistorico(params.user._id,'listando usuarios',this.historico,params.url);
                    res(result);
                }
            ).catch((err)=>{
                rej(err);
            })
        });
    }

    findUsuarios(paramsfind){
        console.log(paramsfind)
        return new Promise((res,rej)=>{
            this.usuarios.find({ $text : { $search : paramsfind.params.paramFind }}).then(
                (result)=>{
                    new History().salvaHistorico(paramsfind.user._id,'Pesquisando Usuarios',this.historico,paramsfind.url);
                    res(result);
                }
            ).catch((err)=>{
                rej(err);
            })
        });
    }

    alteraUsuario(id,req){
        console.log(req.params);
        return new Promise((res,rej)=>{
            this.usuarios.findOneAndUpdate({_id: id},{$set:req.params},{new:true}) 
            .then(
                (result)=>{
                    new History().salvaHistorico(req.user._id,'Alterando Usuario',this.historico,req.url);
                    res(result);
                }
            ).catch((err)=>{
                rej(err);
            })
        });
    }

    deletaUsuario(id,req){
        return new Promise((res,rej)=>{
            this.usuarios.remove({_id: id},{new:true}) 
            .then(
                (result)=>{
                    new History().salvaHistorico(req.user._id,'Apagando Usuario',this.historico,req.url);
                    res(result);
                }
            ).catch((err)=>{
                rej(err);
            })
        });
    }

    adicionaUsuario(obj,req){
        return new Promise((res,rej)=>{
            this.usuarios.create(obj) 
            .then(
                (result)=>{
                    new History().salvaHistorico(req.user._id,'Criando Usuario',this.historico,req.url);
                    res(result);
                }
            ).catch((err)=>{
                rej(err);
            })
        });
    }

    findPassById(req){
        console.log(req.user)
        return new Promise((res,rej)=>{
            this.usuarios.findById(req.user._id).select("-password") 
            .then(
                (result)=>{
                    new History().salvaHistorico(req.user._id,'Verificando usuario da sessão',this.historico,req.url);
                    res(result);
                }
            ).catch((err)=>{
                rej(err);
            })
        });
    }

    validateToken(req){
        return new Promise(async (res,rej)=>{
            const { error } = new User().validateUser(req.body);
            console.log(req.body.email)
            if (error) rej(error.details[0].message);
            let usu = await this.usuarios.findOne({email:req.body.email,senha:req.body.senha}).catch((err)=>{rej(err)}) 
            let token = new User().generateAuthToken(usu._id,true) ;
            res({userdata:usu,token:token})
        });        
    }
    
}