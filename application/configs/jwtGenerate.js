import envConf from '../../config/envConf.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = envConf.sessionSecret;

export default function jwtGenerate(payload){
   
    console.log(payload)

    if(payload === null || typeof payload !== 'object' || Array.isArray(payload)) {
        return ({
            generateToken: false, 
            message: 'Valor fornecido nulo ou não é um objeto. Recebido: ',
            token: ''
        });
    };

    const token = jwt.sign(payload, SECRET_KEY);

    return ({generateToken: true, token: token});

}