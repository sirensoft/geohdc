function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

function delay(id) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            if (id > 5) {
                resolve(100);
            } else {
                reject;
            }
        }, 1000);
    });
}

async function test1() {

    for (let i = 0; i < 10; ++i) {
        await wait(1000);
        console.log('Hello...' + i);
    }
}

async function test2() {
    var a = await delay(6);
    console.log(a);
}

delay().then(function(res) {
    console.log(res);
});