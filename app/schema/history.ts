import * as mongoose from 'mongoose';

export class History{
    historicoDataSchema: any;

    dataSchema(){
        let Schema = mongoose.Schema;
        this.historicoDataSchema = new Schema(
            { 
                "id_usuario" : {type: String, required: true,text:true}, 
                "acao" : {type: String, required: true,text:true}, 
                "url" : {type: String, required: true,text:true}, 
                "timedate" : {type: Date, required: true,text:true}
            }   
        ,{collection: 'historico'});  
        return mongoose.model('HistoricoData', this.historicoDataSchema);
    }

    salvaHistorico(idusuario,acao,schema,url){
        let hist = {
            id_usuario:idusuario,
            acao:acao,
            url:url,
            timedate:new Date().toString()
        }
        return schema.create(hist)
    }
}