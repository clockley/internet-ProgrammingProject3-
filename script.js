function calcMean(array) {
    return calcSum(array) / array.length;
}

function calcMedian(array) {
    array.sort(
        function(x, y) {
            return x - y;
        }
    )
    m = array.length * .5;
    if (m % 1) {
        return array[m - .5]
    }
    return (array[m - 1] + array[m]) *.5;
}

function calcMode(array) {
    var ret = "";
    var nOfm = 0;
    var mp = new Map();
    var mn = calcMean(array);
    array.forEach(
        function(x, y) {
            mp.set(x, mp.get(x) == undefined ? 1 : mp.get(x) + 1);
        }
    )

    var mmax = Math.max(...mp.values());

    mp.forEach(
        function(v, k, m) {
            if (v == mmax) {
                nOfm++;
                ret += k.toFixed(2)+" ";
            }
        }
    )
    if (nOfm == array.length) {
        ret = "";
    }
    return ret;
}

function calcStdDev(array) {
    return Math.sqrt(calcVariance(array));
}

function calcVariance(array) {
    var mn = calcMean(array);
    var ret = 0;
    array.forEach(
        function(x, y) {
            ret += Math.pow(x-mn, 2);
        }
    );
    return ret / array.length;
}

function calcSum(array) {
    return array.reduce((partial_sum, a) => partial_sum + a,0);
}

function findMax(array) {
    return Math.max.apply(null, array);
}

function findMin(array) {
    return Math.min.apply(null, array);
}

function performStatistics() {
    var ia = document.getElementById("input").value.split(" ");

    ia = ia.filter(function(e) {
        return String(e).trim();
    });

    if (ia.length < 5) {
        alert("Input must contain at least five valid values");
        return false;
    }

    if (ia.length > 20) {
        alert("Input must not contain more than twenty values");
        return false;
    }

    ia.forEach(
        function(x, y) {
            if (isNaN(x)) {
                alert("Input "+x+" parsed as element "+y+" is not a number");
                return false;
            }
        }
    )

    ia = ia.map(Number);

    document.getElementById("min").value = findMin(ia).toFixed(2);
    document.getElementById("max").value = findMax(ia).toFixed(2);
    document.getElementById("sum").value = calcSum(ia).toFixed(2);
    document.getElementById("mean").value = calcMean(ia).toFixed(2);
    document.getElementById("median").value = calcMedian(ia).toFixed(2);
    document.getElementById("mode").value = calcMode(ia);
    document.getElementById("variance").value = calcVariance(ia).toFixed(2);
    document.getElementById("stddev").value = calcStdDev(ia).toFixed(2);
}