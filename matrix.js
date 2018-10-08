/*  Matrix.js
 *  A matrix is a rectangular array of objects, arranged in rows and columns.
 */
class Matrix {

    constructor(m,n) {
        // Define globals, width, height, and the matrix itself.
        this.width  = m;
        this.height = n;
        this.matrix = {};

        // Build matrix rows based on height given
        for (var j = 0; j < this.height; j++) {
            var row = {};

            // Build matrix cells based on width given
            for (var i = 0; i < this.width; i++) {
                var cell;
                row[i+1] = cell;
            }
            this.matrix[j+1] = row;
        }
    }

    cellIsInRange(x,y) {
        return ( x > this.width && y > this.height ) ? false : true;
    }

    // matrix.isCellEmpty(x,y)
    // Checks if given coordinates point to an empty (undefined) cell
    cellIsEmpty(x,y) {
        if ( this.cellIsInRange(x,y) ) {
            var cell = this.matrix[y][x];
            return isUndefined(cell) || isNull(cell) ? true : false;
        } else {
            throw new Error(`Cell (${x},${y}) is out of range.`);
        }
    }

    // matrix.nextEmptyCell
    // Scans matrix for next empty cell
    nextEmptyCell() {
        for (var y = 1; y <= this.height; y++) {
            for (var x = 1; x <= this.width; x++) {
                if ( this.cellIsEmpty(x,y) ) {
                    return {x: x, y: y};
                }
            }
        }
        throw new Error(`No empty cells available.`);
    }

    // matrix.putData(int, int, obj)
    // Puts data into a specified cell using its coordinates
    putData(x, y, data) {
        this.matrix[y][x] = data;
        return this.matrix[y][x];
    }

    // matrix.put(int, int, obj)
    // matrix.put(Array)
    // Puts data into one or more cells using the putData() method
    put(x,y,data){
        if ( Number.isInteger(x) && Number.isInteger(y) ) {
            // expected format: x, y, data
            this.putData(x, y, data);

        } else if ( isArray(x) ) {
            for (var i in x) {
                if ( isArray(x[0]) ) {
                    // expected format: [[x, y, data], [x, y, data],... ]
                    this.putData(x[i][0], x[i][1], x[i][2]);

                } else if( isObject(x[0]) ) {
                    // expected format: [{x, y, data}, {x, y, data},... ]
                    this.putData(x[i][x], x[i][y], x[i][data]);
                } else {
                    console.log('Value in array not expected');
                }
            }
        } else {
            console.log('Value not expected');
        }
    };

    // matrix.push([obj|Array])
    // Pushes data into the next available cell
    push(data){
        if ( isArray(data) ) {
            // interpret each element in the array as data for a cell
            for (var i in data) {
                try {
                    var nextEmptyCell = this.nextEmptyCell();
                    this.putData(nextEmptyCell.x,nextEmptyCell.y,data[i]);
                } catch(e) {
                    console.log(e.message);
                    break;
                }
            }
        } else {
            var nextEmptyCell = this.nextEmptyCell();
            this.putData(nextEmptyCell.x,nextEmptyCell.y,data);
        }
    };

    // matrix.cell(x,y)
    // Returns the Cell specified by its coordinates
    cell(x,y) {
        return this.matrix[y][x];
    };

    // matrix.row(y)
    // Returns Array of the cells in the Row specified by its Y coordinate
    row(y) {
        return this.matrix[y];
    };

    // matrix.column(x)
    // Returns Array of the cells in the Column specified by its X coordinate
    //
    // [!] Could this loop be a problem for large datasets?
    column(x) {
        var column = [];
        for (var i in this.matrix) {
            column.push(this.matrix[i][x]);
        }
        return column;
    };

    // matrix.indexOf(obj)
    // Compares passed obj to all contents in matrix
    // If a match is found, returns the Cell's coordinates
    // Else return null
    indexOf(obj,startX,startY){
        var startX = startX ? startX : 1,
            startY = startY ? startY : 1,
            foundIndex;

        columns: for (var j = startY; j <= this.width; j++) {
            var row = this.matrix[j];
            rows: for (var i = startX; i <= this.height; i++) {
                if (row[i] == obj) {
                    foundIndex = { x: i, y: j };
                    break columns;
                }
            }
        }
        return foundIndex;
    }
}


// Create a new matrix object
var mtx = new Matrix(4,4);
//
mtx.put(2,2,"lol");
console.log(mtx.cell(2,2));
mtx.push("ha");
mtx.push(["haha","hahaha"]);
mtx.push(["hahahaha",1,3,4]);
mtx.push([{a:1},2,3,4,5,6,7,8,9]);

console.log(mtx.matrix);

var c = mtx.indexOf("3");
console.log(`A '3' was found at (${c.x},${c.y})`);



/* Helpers */
function isString     (value) { return typeof value === 'string' || value instanceof String; }
function isNumber     (value) { return typeof value === 'number' && isFinite(value); }
function isArray      (value) { return Array.isArray(value); }
function isFunction   (value) { return typeof value === 'function'; }
function isObject     (value) { return value && typeof value === 'object' && value.constructor === Object; }
function isNull       (value) { return value === null; }
function isUndefined  (value) { return typeof value === 'undefined'; }
function isBoolean    (value) { return typeof value === 'boolean'; }
function isRegExp     (value) { return value && typeof value === 'object' && value.constructor === RegExp; }
function isError      (value) { return value instanceof Error && typeof value.message !== 'undefined'; }
function isDate       (value) { return value instanceof Date; }
function isSymbol     (value) { return typeof value === 'symbol'; }
