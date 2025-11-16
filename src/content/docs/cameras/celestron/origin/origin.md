---
title: Origin
categories: ["cameras"]
description: Origin supports the standard single-frame snapshot mode.
thumbnail: ./origin.webp
---

## Features

The driver supports the standard single-frame snapshot mode. Furthermore, it supports:

- Gain controls  

## Operation

### Connecting to Origin Camera

The camera is always physically connected when the Origin is connected. To satisfy the INDI protocol it is allowed to logically connect the camera separately.

---

## Capture

To capture a single-frame image, simple set the desired exposure time in seconds and click **Single**. After the capture is complete, it should be downloaded as a FITS image. Changing the size, binning, region of interest or depth is not supported. FITS images are not saved unless you create a sequence. This should be done using kstars/Ekos or CCDCiel.

---
