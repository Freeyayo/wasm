const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/2_global_variables_and_type_conversion.wasm');
let global_test = null;

const importObject = {
    js: {
        log_i32: value => console.log(`i32 ${value}`),
        log_f32: value => console.log(`f32 ${value}`),
        log_f64: value => console.log(`f64 ${value}`)
    },
    env: {
        import_i32: 5000000000,
        import_f32: 123.0123456789,
        import_f64: 123.0123456789
    }
}

async function main() {
    const obj = await WebAssembly.instantiate(
        new Uint8Array(bytes),
        importObject
    );

    obj.instance.exports.globaltest();
    // i32 705032704
    // f32 123.01234436035156
    // f64 123.0123456789
}

main()