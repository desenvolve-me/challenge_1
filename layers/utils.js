const moment = require("moment");

exports.convert = {
    stringToJSON: function (json) {
        return typeof json === 'string' ? JSON.parse(json) : json
    }  ,
    diaMesAnoTimeStamp(data){
        return moment.utc(data, "YYYY-MM-DD").valueOf();
    },
}

exports.functions = { 
    validaCPFComPontos: function(val){
        if (val.length == 14) {
            var cpf = val.trim();

            cpf = cpf.replace(/\./g, '');
            cpf = cpf.replace('-', '');
            cpf = cpf.split('');
            
            var v1 = 0;
            var v2 = 0;
            var aux = false;
            
            for (var i = 1; cpf.length > i; i++) {
                if (cpf[i - 1] != cpf[i]) {
                    aux = true;   
                }
            } 
            
            if (aux == false) {
                return false; 
            } 
            
            for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
                v1 += cpf[i] * p; 
            } 
            
            v1 = ((v1 * 10) % 11);
            
            if (v1 == 10) {
                v1 = 0; 
            }
            
            if (v1 != cpf[9]) {
                return false; 
            } 
            
            for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
                v2 += cpf[i] * p; 
            } 
            
            v2 = ((v2 * 10) % 11);
            
            if (v2 == 10) {
                v2 = 0; 
            }
            
            if (v2 != cpf[10]) {
                return false; 
            } else {   
                return true; 
            }
        }
        else {
            return false;
        }
    },

    validaCPFSemPontos: function(strCPF) {
            var soma;
            var resto;
            soma = 0;
        if (strCPF == "00000000000") return false;

        for (i=1; i<=9; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        resto = (soma * 10) % 11;

            if ((resto == 10) || (resto == 11))  resto = 0;
            if (resto != parseInt(strCPF.substring(9, 10)) ) return false;

        soma = 0;
            for (i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
            resto = (soma * 10) % 11;

            if ((resto == 10) || (resto == 11))  resto = 0;
            if (resto != parseInt(strCPF.substring(10, 11) ) ) return false;
            return true;
    }

}