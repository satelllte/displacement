use wasm_bindgen::prelude::*;
// use wasm_bindgen::Clamped;
// use web_sys::CanvasRenderingContext2d;
// use web_sys::ImageData;
// use rand::random;
// use std::mem;
use std::slice;
// use std::os::raw::c_void;
use std::alloc::{alloc, dealloc, Layout};


#[wasm_bindgen]
pub fn add(x: i32, y: i32) -> i32 {
    x + y
}

/// # Safety
#[no_mangle]
pub unsafe fn my_alloc(size: usize) -> *mut u8 {
    let align = std::mem::align_of::<usize>();
    let layout = Layout::from_size_align_unchecked(size, align);
    alloc(layout)
}

/// # Safety
#[no_mangle]
pub unsafe fn my_dealloc(ptr: *mut u8, size: usize) {
    let align = std::mem::align_of::<usize>();
    let layout = Layout::from_size_align_unchecked(size, align);
    dealloc(ptr, layout);
}

/// # Safety
#[no_mangle]
pub fn alloc_2(len: usize) -> *mut u8 {
    // create a new mutable buffer with capacity `len`
    let mut buf = Vec::with_capacity(len);
    // take a mutable pointer to the buffer
    let ptr = buf.as_mut_ptr();
    // take ownership of the memory block and
    // ensure that its destructor is not
    // called when the object goes out of scope
    // at the end of the function
    std::mem::forget(buf);
    // return the pointer so the runtime
    // can write data at this offset
    ptr
}

/// # Safety
#[no_mangle]
pub unsafe fn dealloc_2(ptr: *mut u8, size: usize) {
    let data = Vec::from_raw_parts(ptr, size, size);
    std::mem::drop(data);
}

// #[wasm_bindgen]
// pub fn fill(
//     ctx: &CanvasRenderingContext2d,
//     width: u32,
//     height: u32,
// ) -> Result<(), JsValue> {
//     let mut data: Vec<u8> = Vec::new();

//     for _x in 0..width {
//         for _y in 0..height {
//             data.push(random());
//             data.push(random());
//             data.push(random());
//             data.push(255);
//         }
//     }

//     let data = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&data), width, height)?;
//     ctx.put_image_data(&data, 0.0, 0.0)
// }

// #[no_mangle]
// pub extern "C" fn alloc(size: usize) -> *mut c_void {
//     let mut buf = Vec::with_capacity(size);
//     let ptr = buf.as_mut_ptr();
//     mem::forget(buf);
//     ptr as *mut c_void
// }

// #[no_mangle]
// #[allow(clippy::not_unsafe_ptr_arg_deref)]
// pub extern "C" fn dealloc(ptr: *mut c_void, cap: usize) {
//     unsafe {
//         let _buf = Vec::from_raw_parts(ptr, cap, cap);
//     }
// }

#[no_mangle]
#[allow(clippy::not_unsafe_ptr_arg_deref)]
pub fn fill(pointer: *mut u8, width: usize, height: usize) {
    let bytesize: usize = width * height * 4;
    let sl = unsafe { slice::from_raw_parts_mut(pointer, bytesize) };

    // Now you can change your buffer
    // for x in 0..width {
    //     for y in 0..height {
    //         sl[x * y * 4 + y * 4] = 0x22;
    //         sl[x * y * 4 + y * 4 + 1] = 0x22;
    //         sl[x * y * 4 + y * 4 + 2] = 0x33;
    //         sl[x * y * 4 + y * 4 + 3] = 0xff;
    //     }
    // }
    for i in 0..width * height {
        sl[i * 4    ] = 0x22;
        sl[i * 4 + 1] = 0x22;
        sl[i * 4 + 2] = 0x33;
        sl[i * 4 + 3] = 0xff;
    }
}

// #[wasm_bindgen]
// pub fn fill_2(
//     // ctx: &CanvasRenderingContext2d,
//     image_data: &ImageData,
//     width: u32,
//     height: u32,
// ) -> Result<ImageData, JsValue> {
//     let mut data = image_data.data();

//     // let mut data: Vec<u8> = Vec::new();

//     for _x in 0..width {
//         for _y in 0..height {
//             data.push(random());
//             data.push(random());
//             data.push(random());
//             data.push(255);
//         }
//     }

//     // let data = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&data), width, height)?;
//     // ctx.put_image_data(&data, 0.0, 0.0)
//     Ok(data)
// }

#[cfg(test)]
mod tests {
    use super::add;

    #[test]
    fn _add() {
        assert_eq!(add(2, 2), 4);
    }
}
