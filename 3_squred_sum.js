const fs = require('fs');
const bytes = fs.readFileSync(`${__dirname}/3_squred_sum.wasm`);

const value_1 = parseInt(process.argv[2]);
const value_2 = parseInt(process.argv[3]);

async function main() {
    const wasmObj = await WebAssembly.instantiate(
        new Uint8Array(bytes)
    )

    const result = wasmObj.instance.exports.SumSqured(value_1, value_2)

    console.log(`${value_1} ${value_2} sum squred => ${result}`)
}

main();