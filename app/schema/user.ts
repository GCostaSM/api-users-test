import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as Joi from 'joi';
import * as config from 'config';

export class User{
    usuarioDataSchema:any;

    dataSchema(){
        let Schema = mongoose.Schema;
        this.usuarioDataSchema = new Schema(
            { 
                "nome" : {type: String, required: true,text:true}, 
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
            }   
        ,{collection: 'usuario'});  
        
        
        return mongoose.model('UsarioData', this.usuarioDataSchema);
    }

    validateUser(user) {
        const schema = {
          email: Joi.string().min(5).max(255).required().email(),
          senha: Joi.string().min(3).max(255).required()
        };
        return Joi.validate(user, schema);
    }      

    generateAuthToken (id,admin) { 
        const token = jwt.sign({ _id: id, isAdmin: admin }, config.get('myprivatekey')); //get the private key from the config file -> environment variable
        return token;
    }

}