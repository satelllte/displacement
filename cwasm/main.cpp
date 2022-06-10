#include <emscripten.h>
#include <stdlib.h>
#include <stdint.h>

extern "C" {
  EMSCRIPTEN_KEEPALIVE
  uint8_t* create_buffer(int width, int height) {
    return (uint8_t*) malloc(width * height * 4 * sizeof(uint8_t));
  }

  EMSCRIPTEN_KEEPALIVE
  void destroy_buffer(uint8_t* p) {
    free(p);
  }

  EMSCRIPTEN_KEEPALIVE
  void fill(uint8_t* img_in, int width, int height) {
    size_t size;

    for (int i = 0; i < width * height * 4; i += 4) {
      img_in[i + 0] = rand() % 0xff;
      img_in[i + 1] = 0x88;
      img_in[i + 2] = 0x99;
      img_in[i + 3] = 0xFF;
    }
  }
}
