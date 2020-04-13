class Matrix {

    constructor(rows, cols) {

        this.rows = rows;
        this.cols = cols;
        this.matrix = [];

        for (let i = 0; i < rows; ++i) {
            this.matrix[i] = [];
            for (let j = 0; j < cols; ++j) {
                this.matrix[i][j] = 0;
            }
        }

    }

    add(scalar) {

        for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.cols; ++j) {
                this.matrix[i][j] += scalar;
            }
        }

        return this;

    }

    mult(scalar) {

        for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.cols; ++j) {
                this.matrix[i][j] *= scalar;
            }
        }

        return this;

    }

    multElementWise(m) {

        //Hadamard product or element-wise matrix multiplication
        for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.cols; ++j) {
                this.matrix[i][j] *= m.matrix[i][j];
            }
        }

        return this;

    }

    randomize() {

        for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.cols; ++j) {
                //generic formula: Math.random() * (max - min) + min
                //values between -1 and 1
                this.matrix[i][j] = Math.random() * 2 - 1;
            }
        }

        return this;

    }

    applyToAllElements(fn) {

        for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.cols; ++j) {
                let val = this.matrix[i][j];
                this.matrix[i][j] = fn(val);
            }
        }

        return this;

    }

    toArray() {

        let arr = [];

        for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.cols; ++j) {
                arr.push(this.matrix[i][j]);
            }
        }

        return arr;

    }

    static add(m, n) {

        if (!Matrix.areEquivalent(m, n)) {
            console.error('Dimension error: matrices must be of the same dimension');
            return undefined;
        }

        let r = new Matrix(m.rows, m.cols);

        for (let i = 0; i < r.rows; ++i) {
            for (let j = 0; j < r.cols; ++j) {
                let sum = m.matrix[i][j] + n.matrix[i][j];
                r.matrix[i][j] = sum;
            }
        }

        return r;

    }

    static subtract(m, n) {

        if (!Matrix.areEquivalent(m, n)) {
            console.error('Dimension error: matrices must be of the same dimension');
            return undefined;
        }

        let r = new Matrix(m.rows, m.cols);

        for (let i = 0; i < r.rows; ++i) {
            for (let j = 0; j < r.cols; ++j) {
                let diff = m.matrix[i][j] - n.matrix[i][j];
                r.matrix[i][j] = diff;
            }
        }

        return r;
    }

    static mult(m, n) {

        if (!Matrix.areMultCompatible(m, n)) {
            console.error('Product error: the columns of A must be = to the rows of B');
            return undefined;
        }

        let r = new Matrix(m.rows, n.cols);

        for (let i = 0; i < r.rows; ++i) {
            for (let j = 0; j < r.cols; ++j) {
                let sum = 0;
                for (let k = 0; k < m.cols; ++k) {
                    sum += m.matrix[i][k] * n.matrix[k][j];
                }
                r.matrix[i][j] = sum;
            }
        }

        return r;

    }

    static areEquivalent(m, n) {

        let areRowsEqual = m.rows === n.rows;
        let areColsEqual = m.cols === n.cols;

        return (areRowsEqual && areColsEqual);

    }

    static areMultCompatible(m, n) {

        return m.cols === n.rows;

    }

    static transpose(m) {

        let t = new Matrix(m.cols, m.rows);

        for (let i = 0; i < t.rows; ++i) {
            for (let j = 0; j < t.cols; ++j) {
                t.matrix[i][j] = m.matrix[j][i];
            }
        }

        return t;

    }

    static toMatrix(arr) {

        if (!(Array.isArray(arr))) {
            console.error('Array to matrix error: parameter must be of type Array');
            return undefined;
        }

        let r = new Matrix(arr.length, 1);

        for (let i = 0; i < r.rows; ++i) {
            r.matrix[i][0] = arr[i];
        }

        return r;

    }

    static getMatrixFromObj(obj) {

        let r = new Matrix(obj.rows, obj.cols);

        for (let i = 0; i < r.rows; ++i) {
            r.matrix[i] = obj.matrix[i];
        }

        return r;
    }

}