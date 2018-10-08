# Matrix.js

An exploration of mathematical matrices in JavaScript. View sample at: [jsbin.com/sibigug/](https://jsbin.com/sibigug/5/edit?js,console)

    A matrix is a rectangular array of objects, arranged in rows and columns.

For example, the dimension of the matrix A, is 4 x 6:

```
+----------------------------------+
|    abc    1200     def       5   |
|   true    25cm    ____    ____   |
|    1in   [1,2]    ____    ____   |
|   Loki    ____    ____    ____   |
|      0    ____    ____    ____   |
|  {a:1}    ____    ____    ____   |
+----------------------------------+
```

var A = new Matrix(4,6);

## Methods

### Cell Management
A.push("abc");
A.push([1200, "def"]);

A.put(1, 2, true);
A.put(1, 3, "1in");
A.put([[   2,   2,         "25cm" ], [   2,   3,         [1,2] ]]);
A.put([{ x:2, y:2, data:"25cm" }, { x:2, y:3, data:[1,2] }]);

A.push(5);
A.drip("Loki");
A.drip([0,{a:1}]);

A.cell(2,1);
1200

A.cell([[2,2],[2,3],[1,5]]);
"25cm", [1,2], 0

A.cell([{x:2,y:2},{x:2,y:3},{x:1,y:5}]);
"25cm", [1,2], 0

### Row Management
A.pushRow(1,["abc",true,"12cm"]); // not yet available

A.row(1);
["abc",true,"12cm"]

### Column Management
A.pushColumn(1,["abc",1200,"6cm"]); // not yet available

A.column(1);
["abc",1200,"6cm"]

### Utilities

A.cellIsInRange(2,8);
false

A.cellIsEmpty(3,4);
true

A.nextEmptyCell();
{x: 3, y: 2}

A.indexOf(3);
{ x: 2, y: 1 }


## Data Structure Questions
- Should we count Matrix cells starting at 1 or 0? Math or Computer count? Will probably add a default of 0, but a parameter that allows it to start at 1. Maybe even any int? Any use in that?
