#!/bin/sh
cargo clippy -- -D warnings && cargo fmt --check
