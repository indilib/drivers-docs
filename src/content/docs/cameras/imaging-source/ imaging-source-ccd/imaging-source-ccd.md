---
title: Imaging Source CCD
categories: ["cameras"]
description: V4L2 CCD
thumbnail: ./imaging-source-ccd.webp
---

INDI can control Imaging Source DMK CCDs via the Video4Linux driver. This includes support for long exposures in addition to video streaming. DMK CCDs are supported in INDI library v0.9.8 or later. Under Ubuntu, you can install the driver via:

## Features

The DMK driver provides all the Video4Linux control supported by the device such as brightness, contrast, gamma, ..etc. Subframing and binning is supported in software. Both gray scale and color modes are supported. Pleas note that due to limitation in V4L2 framework, you cannot change the camera resolution unless you disconnect and reconnect again.

## Operation

Once you're connected, you can capture images as FITS from the camera, or use video streaming if supported by your client. INDI will detect any extra options that your device may support and if found, INDI shall construct dynamic controls (knobs & switches) to control these features.
