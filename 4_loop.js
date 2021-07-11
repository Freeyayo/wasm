const fs = require('fs');
const bytes = fs.readFileSync(`${__dirname}/4_loop.wasm`);
const n = parseInt(process.argv[2] || "1");

let loop_test = null;

const importObject = {
    env: {
        log: function(n, factorial){
            console.log(`${n}! = ${factorial}`)
        }
    }
}

async function main() {
    const wasmObject = await WebAssembly.instantiate(
        new Uint8Array(bytes),
        importObject
    )

    loop_test = wasmObject.instance.exports.loop_test;

    if(n > 12){
        console.log(`=== n is too large===`)
    }else{
        const factorial = loop_test(n);
        console.log(`result is ${n}! = ${factorial}`)
    }
    
}

main();