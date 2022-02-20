const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/1_hello_world.wasm');

let hello_world = null;
let start_string_index = 100;
/**

 * “You can allocate up to two gigabytes this way, 
 * but setting this value too high can result in an error 
 * if the browser is unable to find enough contiguous memory to fulfill the request.”
 */
const memory = new WebAssembly.Memory({
    initial: 1  // a size of one page
})

const importObject = {
    env : {
        buffer: memory,
        start_string: start_string_index,
        print_string: function(str_len){
            const bytes = new Uint8Array(
                memory.buffer,
                start_string_index,
                str_len
            );

            const log_string = new TextDecoder('utf8').decode(bytes);
            console.log(log_string)
        }
    }
}

async function main() {
    const obj = await WebAssembly.instantiate(
        new Uint8Array(bytes), 
        importObject
    );

    ({ helloworld: hello_world } = obj.instance.exports);
    hello_world()
}

main();