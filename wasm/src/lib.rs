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

#[wasm_bindgen(js_name = fill)]
pub fn fill(r: u8, g: u8, b: u8, width: usize, height: usize) {
    for i in (0..width * height * 4).step_by(4) {
        unsafe {
            BUFFER[i] = r;
            BUFFER[i + 1] = g;
            BUFFER[i + 2] = b;
            BUFFER[i + 3] = 0xff;
        }
    }
}

#[wasm_bindgen(js_name = fillRect)]
#[allow(clippy::too_many_arguments)]
#[rustfmt::skip]
pub fn fill_rect(
    r: u8,
    g: u8,
    b: u8,
    alpha: u8,
    x0: usize,
    y0: usize,
    x1: usize,
    y1: usize,
    width: usize,
) {
    let alpha_factor: f32 = alpha as f32 / 255.0;
    for xi in x0..=x1 {
        for yi in y0..=y1 {
            let pos = 4 * (yi * width + xi);
            unsafe {
                // mix(color1, color2, alpha) = color1 * (1 - alpha) + color2 * alpha
                BUFFER[pos    ] = (BUFFER[pos    ] as f32 * (1.0 - alpha_factor) + r as f32 * alpha_factor).round() as u8;
                BUFFER[pos + 1] = (BUFFER[pos + 1] as f32 * (1.0 - alpha_factor) + g as f32 * alpha_factor).round() as u8;
                BUFFER[pos + 2] = (BUFFER[pos + 2] as f32 * (1.0 - alpha_factor) + b as f32 * alpha_factor).round() as u8;
                BUFFER[pos + 3] = 0xff;
            }
        }
    }
}
