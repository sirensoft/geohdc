function _cal(params) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (params === 0) {
                reject('err');
            } else {
                resolve(params + ' x 2 = ' + params * 2);
            }

        }, 3000);
    });
}

_cal(5).then(function(result) {
    console.log(result);
});