#!/bin/sh
em++ -Os \
  --no-entry \
  -std=c++14 \
  -s WASM=1 \
  -s STANDALONE_WASM=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
  ./main.cpp
