# Target

In all languages, the target is a function that takes 3 parameters:

 - `x` the number we wish to approximate
 - `D` the maximum denominator
 - `mixed` if true, return a mixed fraction; if false, improper

The JS implementation walks through the algorithm.

# JS Implementation

In this version, the return value is `[quotient, numerator, denominator]`.  The
interpretation is `x ~ quotient + numerator / denominator`

- For improper fractions, `quotient == 0`.

- For proper fractions, `0 <= numerator < denominator` and `quotient <= x`

For negative `x`, this deviates from how some people and systems interpret mixed
fractions.  Some interpret `a b/c` as `sgn(a) * [abs(a) + b/c]`.  To replicate
that behavior, pass the absolute value to frac and prepend a "-" if negative.

```js>frac.flow.js
/* frac.js (C) 2012-present SheetJS -- http://sheetjs.com */
var frac = function frac(x/*:number*/, D/*:number*/, mixed/*:?boolean*/)/*:Array<number>*/ {
```

The goal is to maintain a feasible fraction (with bounded denominator) below
the target and another fraction above the target.  The lower bound is
`floor(x) / 1` and the upper bound is `(floor(x) + 1) / 1`.  We keep track of
the numerators and denominators separately:

```
  var n1 = Math.floor(x), d1 = 1;
  var n2 = n1+1, d2 = 1;
```

If `x` is not integral, we bisect using mediants until a denominator exceeds
our target:

```
  if(x !== n1) while(d1 <= D && d2 <= D) {
```

The mediant is the sum of the numerators divided by the sum of demoninators:

```
    var m = (n1 + n2) / (d1 + d2);
```

If we happened to stumble upon the exact value, then we choose the closer one
(the mediant if the denominator is within bounds, or the bound with the larger
denominator)

```
    if(x === m) {
      if(d1 + d2 <= D) { d1+=d2; n1+=n2; d2=D+1; }
      else if(d1 > d2) d2=D+1;
      else d1=D+1;
      break;
    }
```

Otherwise shrink the range:

```
    else if(x < m) { n2 = n1+n2; d2 = d1+d2; }
    else { n1 = n1+n2; d1 = d1+d2; }
  }
```

At this point, `d1 > D` or `d2 > D` (but not both -- keep track of how `d1` and
`d2` change).  So we merely return the desired values:

```
  if(d1 > D) { d1 = d2; n1 = n2; }
  if(!mixed) return [0, n1, d1];
  var q = Math.floor(n1/d1);
  return [q, n1 - q*d1, d1];
};
```

## Continued Fraction Method

The continued fraction technique is employed by various spreadsheet programs.
Note that this technique is inferior to the mediant method (at least, according
to the desired goal of most accurately approximating the floating point number)

```js>frac.flow.js
frac.cont = function cont(x/*:number*/, D/*:number*/, mixed/*:?boolean*/)/*:Array<number>*/ {
```

> Record the sign of x, take `b0=|x|, p_{-2}=0, p_{-1}=1, q_{-2}=1, q_{-1}=0`

Note that the variables are implicitly indexed at `k` (so `B` refers to `b_k`):

```
  var sgn = x < 0 ? -1 : 1;
  var B = x * sgn;
  var P_2 = 0, P_1 = 1, P = 0;
  var Q_2 = 1, Q_1 = 0, Q = 0;
```

`A` should be the floor of `B`.  Originally the bit-or trick was used, but this
is not correct for the range `B>=2**32`.

```
  var A = Math.floor(B);
```

> Iterate

> ... for `k = 0,1,...,K`, where `K` is the first instance of `k` where
> either `q_{k+1} > Q` or `b_{k+1}` is undefined (`b_k = a_k`).

```
  while(Q_1 < D) {
```

> `a_k = [b_k]`, i.e., the greatest integer `<= b_k`

```
    A = Math.floor(B);
```

> `p_k = a_k p_{k-1} + p_{k-2}`
> `q_k = a_k q_{k-1} + q_{k-2}`

```
    P = A * P_1 + P_2;
    Q = A * Q_1 + Q_2;
```

> `b_{k+1} = (b_{k} - a_{k})^{-1}`

```
    if((B - A) < 0.00000005) break;
```

At the end of each iteration, advance `k` by one step:

```
    B = 1 / (B - A);
    P_2 = P_1; P_1 = P;
    Q_2 = Q_1; Q_1 = Q;
  }
```

In case we end up overstepping, walk back to the last valid iteration:

```
  if(Q > D) { if(Q_1 > D) { Q = Q_2; P = P_2; } else { Q = Q_1; P = P_1; } }
```

The final result is `r = (sgn x)p_k / q_k`:

```
  if(!mixed) return [0, sgn * P, Q];
  var q = Math.floor(sgn * P/Q);
  return [q, sgn*P - q*Q, Q];
};
```

Finally we put some export jazz:

```
/*:: declare var DO_NOT_EXPORT_FRAC: any; */
if(typeof module !== 'undefined' && typeof DO_NOT_EXPORT_FRAC === 'undefined') module.exports = frac;
```

# Tests

```js>test.js
var fs = require('fs'), assert = require('assert');
var frac;
describe('source', function() { it('should load', function() { frac = require('./'); }); });
var xltestfiles=[
  ['xl.00001.tsv', 10000],
  ['xl.0001.tsv',  10000],
  ['xl.001.tsv',   10000],
  ['xl.01.tsv',    10000],
  ['oddities.tsv', 25]
];

function xlline(o,j,m,w) {
  it(j.toString(), function() {
    var d, q, qq, f = 0.1;
    var q0 = 0, q1 = 0, q2 = 0
    for(var i = j*w; i < m-3 && i < (j+1)*w; ++i) {
      d = o[i].split("\t");
      if(d.length < 3) continue;
      f = parseFloat(d[0]);

      q = frac.cont(f, 9, true);
      q0 = q[0]; q1 = q[1]; q2 = q[2];
      qq = (q0!=0||q1!=0) ? (q0!=0 ? q0.toString() : "") + " " + (q1!=0 ? q1.toString() + "/" + q2.toString() : "   ") : "0    ";
      assert.equal(qq, d[1], d[1] + " 1");

      q = frac.cont(f, 99, true);
      qq = (q[0]!=0||q[1]!=0) ? (q[0]!=0 ? q[0].toString() : "") + " " + (q[1]!=0 ? (q[1] < 10 ? " " : "") + q[1].toString() + "/" + q[2].toString() + (q[2]<10?" ":"") : "     ") : "0      ";
      assert.equal(qq, d[2], d[2] + " 2");

      q = frac.cont(f, 999, true);
      qq = (q[0]!=0||q[1]!=0) ? (q[0]!=0 ? q[0].toString() : "") + " " + (q[1]!=0 ? (q[1] < 100 ? " " : "") + (q[1] < 10 ? " " : "") + q[1].toString() + "/" + q[2].toString() + (q[2]<10?" ":"") + (q[2]<100?" ":""): "       ") : "0        ";
      assert.equal(qq, d[3], d[3] + " 3");
    }
  });
}
function parsexl(f,w) {
  if(!fs.existsSync(f)) return;
  var o = fs.readFileSync(f, 'utf-8').split("\n");
  for(var j = 0, m = o.length-3; j < m/w; ++j) xlline(o,j,m,w);
}
function cmp(a,b) { assert.equal(a.length,b.length); for(var i = 0; i != a.length; ++i) assert.equal(a[i], b[i]); }
describe('mediant', function() {
  it('should do the right thing for tenths', function() {
    cmp(frac(0.1,9,false),[0,1,9]);
    cmp(frac(0.2,9,false),[0,1,5]);
    cmp(frac(0.3,9,false),[0,2,7]);
    cmp(frac(0.4,9,false),[0,2,5]);
    cmp(frac(0.5,9,false),[0,1,2]);
    cmp(frac(0.6,9,false),[0,3,5]);
    cmp(frac(0.7,9,false),[0,5,7]);
    cmp(frac(0.8,9,false),[0,4,5]);
    cmp(frac(0.9,9,false),[0,8,9]);
    cmp(frac(1.0,9,false),[0,1,1]);
    cmp(frac(1.0,9,true), [1,0,1]);
    cmp(frac(1.7,9,true), [1,5,7]);
    cmp(frac(1.7,9,false),[0,12,7]);
  });
});
xltestfiles.forEach(function(x) {
  var f = './test_files/' + x[0];
  describe(x[0], function() {
    parsexl(f,x[1]);
  });
});
```

## Node Ilk

```json>package.json
{
  "name": "frac",
  "version": "1.1.0",
  "author": "SheetJS",
  "description": "Rational approximation with bounded denominator",
  "keywords": [ "math", "fraction", "rational", "approximation" ],
  "main": "frac.js",
  "dependencies": {
    "voc":"~1.0.0"
  },
  "devDependencies": {
    "mocha":"~2.5.3"
  },
  "repository": { "type":"git", "url":"git://github.com/SheetJS/frac.git" },
  "scripts": {
    "test": "make test"
  },
  "config": {
    "blanket": {
      "pattern": "frac.js"
    }
  },
  "homepage": "http://oss.sheetjs.com/frac",
  "bugs": { "url": "https://github.com/SheetJS/frac/issues" },
  "license": "Apache-2.0",
  "engines": { "node": ">=0.8" }
}
```

And to make sure that test files are not included in npm:

```>.npmignore
test_files/*.tsv
ctest/
test.js
Makefile
.gitignore
.npmignore
node_modules/
coverage.html
.travis.yml
.jshintrc
.jscs.json
.flowconfig
misc/
*.sheetjs
*.pyc
build/
MANIFEST
*.gz
*.tgz
*.py
*.html
```

Don't include the node modules in git:

```>.gitignore
.gitignore
node_modules/
coverage.html
*.sheetjs
*.pyc
build/
MANIFEST
*.gz
*.tgz
```
