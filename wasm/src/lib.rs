use wasm_bindgen::prelude::*;

const MAX_WIDTH: usize = 8192;
const MAX_HEIGHT: usize = 8192;

static mut BUFFER: [u8; MAX_WIDTH * MAX_HEIGHT * 4] = [0; MAX_WIDTH * MAX_HEIGHT * 4];

#[wasm_bindgen(js_name = getBufferPointer)]
pub fn get_buffer_pointer() -> *const u8 {
  let pointer: *const u8;
  unsafe {
    pointer = BUFFER.as_ptr();
  }
  pointer
}

#[wasm_bindgen(js_name = fillColor)]
pub fn fill_color(r: u8, g: u8, b: u8, width: usize, height: usize) {
    for i in (0..width * height * 4).step_by(4) {
        unsafe {
            BUFFER[i] = r;
            BUFFER[i + 1] = g;
            BUFFER[i + 2] = b;
            BUFFER[i + 3] = 0xff;
        }
    }
}
