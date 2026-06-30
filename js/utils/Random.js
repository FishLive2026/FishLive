export default class Random {

    static int(min, max){

        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    static float(min, max){

        return Math.random() * (max - min) + min;

    }

    static pick(array){

        return array[this.int(0, array.length - 1)];

    }

}