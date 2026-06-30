export default class Formatter {

    static number(value){

        return new Intl.NumberFormat("pt-BR").format(value);

    }

    static short(value){

        if(value >= 1000000){
            return (value / 1000000).toFixed(1) + "M";
        }

        if(value >= 1000){
            return (value / 1000).toFixed(1) + "K";
        }

        return value.toString();

    }

}