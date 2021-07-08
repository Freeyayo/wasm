(module
    ;; we will import object env from our embedding environment
    ;; and that within that object we’re expecting the function print_string
    (import "env" "print_string" (
        func $print_string(param i32)
    ))

    ;; we'll import a memory buffer named buffer from the object env, and the buffer will be called buffer
    ;; (memory 1) indecates that the buffer will be a single page of linear memory
    (import "env" "buffer" (
        memory 1
    ))

    ;; it maps to a variable with the name env(? 不是start_string吗) in JavaScript
    (global $start_string (import "env" "start_string") i32)
     
    ;; a constant that be set to 12
    (global $string_len i32 (i32.const 12))

    ;; we define our string in linear memory using a data expression
    (data (global.get $start_string) "hello world")

    ;; we define and export the function called "helloworld" for use in JavaScript
    (func (export "helloworld")
        (call $print_string (global.get $string_len))
    )
)