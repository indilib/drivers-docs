---
title: QSI CCD & Filter Wheel
categories: ["cameras"]
description: QSI CCD & Filter Wheel
thumbnail: ./qsi-ccd.webp
---

## Features

INDI QSI should be able to support all Quantum Scientific Imaging (QSI) 500/600 family of cameras & filter wheels in addition to autoguiding support, whenever applicable.

## Operation

Once you're connected, you can capture images as FITS from the camera, control temperature, and set image binning and frame subset. The driver will automatically upload these images to the client in FITS format. If your camera is equipped with a filter wheel, you can control the position of the wheels and designate a name to each filter. For CCDs equipped with Off-Axis Guider (OAG), the driver supports pulse guiding.