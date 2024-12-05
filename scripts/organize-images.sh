#!/bin/bash

# Base directories
SRC_DIR="/Volumes/PRO-G40/Workspace-G40/mh-com-astro/src/images/famalbum"
DEST_DIR="/Volumes/PRO-G40/Workspace-G40/mh-com-astro/src/images/family-album"

# Create directory structure
mkdir -p "$DEST_DIR/photographers/akiya"
mkdir -p "$DEST_DIR/photographers/ayukawa"
mkdir -p "$DEST_DIR/photographers/fukuyama"
mkdir -p "$DEST_DIR/photographers/miyatake"
mkdir -p "$DEST_DIR/photographers/morioka"
mkdir -p "$DEST_DIR/photographers/tsuyuki"
mkdir -p "$DEST_DIR/camps/amache"
mkdir -p "$DEST_DIR/ui"
mkdir -p "$DEST_DIR/exhibition"
mkdir -p "$DEST_DIR/banners"

# Copy photographer images
cp "$SRC_DIR"/akiya*.gif "$DEST_DIR/photographers/akiya/"
cp "$SRC_DIR"/ayukawa*.jpeg "$DEST_DIR/photographers/ayukawa/"
cp "$SRC_DIR"/fukukyama*.gif "$DEST_DIR/photographers/fukuyama/"
cp "$SRC_DIR"/fukuyama*.gif "$DEST_DIR/photographers/fukuyama/"
cp "$SRC_DIR"/miyatake*.jpeg "$DEST_DIR/photographers/miyatake/"
cp "$SRC_DIR"/morioka*.jpeg "$DEST_DIR/photographers/morioka/"
cp "$SRC_DIR"/tsuyuki*.jpeg "$DEST_DIR/photographers/tsuyuki/"
cp "$SRC_DIR"/tsuyuki*.jpg "$DEST_DIR/photographers/tsuyuki/"

# Copy camp images
cp "$SRC_DIR"/amache*.gif "$DEST_DIR/camps/amache/"

# Copy UI elements
cp "$SRC_DIR"/butcam.gif "$DEST_DIR/ui/"
cp "$SRC_DIR"/camera.gif "$DEST_DIR/ui/"
cp "$SRC_DIR"/backforward.gif "$DEST_DIR/ui/"
cp "$SRC_DIR"/oac.gif "$DEST_DIR/ui/"

# Copy exhibition images
cp "$SRC_DIR"/install*.jpeg "$DEST_DIR/exhibition/"

# Copy banners
cp "$SRC_DIR"/*ban*.gif "$DEST_DIR/banners/"
cp "$SRC_DIR"/fambanner.jpeg "$DEST_DIR/banners/"

# Copy misc images
cp "$SRC_DIR"/mother.jpeg "$DEST_DIR/"
cp "$SRC_DIR"/amy.jpeg "$DEST_DIR/"
