export class Matrix4 {
    constructor() {
        /*
        Ordering of the elements array.
        [0, 4, 8, 12]
        [1, 5, 9, 13]
        [2, 6, 10, 14]
        [3, 7, 11, 15]
        */
        this.elements = new Float32Array(16);
    }

    multiplyMatrix4(that){
        let matrix = new Matrix4();
        for(let i =0; i<4;i++){
            for(let j = 0; j<4;j++){
                matrix.elements[i*4+j] = this.elements[j]*that.elements[i*4]+
                                        this.elements[4+j]*that.elements[1+i*4]+
                                        this.elements[8+j]*that.elements[2+i*4]+
                                        this.elements[12+j]*that.elements[3+i*4];
            }
        }
        return matrix;
    }

    static identity() {
        let matrix = new Matrix4();
        matrix.elements[0] = 1;
        matrix.elements[5] = 1;
        matrix.elements[10] = 1;
        matrix.elements[15] = 1;
        return matrix;
    }
    static scale(x, y, z) {
        let matrix = new Matrix4();
        matrix.elements[0] = x;
        matrix.elements[5] = y;
        matrix.elements[10] = z;
        matrix.elements[15] = 1;
        return matrix;
    }
    static translate(x, y, z) {
        let matrix = this.identity();
        matrix.elements[12] = x;
        matrix.elements[13] = y;
        matrix.elements[14] = z;
        return matrix;
    }
    static rotateZ(degrees) {
        let matrix = this.identity();
        let radians = degrees * (Math.PI / 180);
        matrix.elements[0] = Math.cos(radians);
        matrix.elements[1] = Math.sin(radians);
        matrix.elements[4] = -Math.sin(radians);
        matrix.elements[5] = Math.cos(radians);
        return matrix;
    }
    toBuffer() {
        return this.elements;
    }

    
}