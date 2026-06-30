export default class Helpers {

    static clamp(value, min, max){

        return Math.max(min, Math.min(max, value));

    }

    static distance(x1, y1, x2, y2){

        return Math.hypot(x2 - x1, y2 - y1);

    }

}