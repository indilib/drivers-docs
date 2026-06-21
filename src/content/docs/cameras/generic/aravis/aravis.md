---
title: GigE-Vision and USB3-Vision Cameras
categories: ["Cameras"]
description: All Aravis-supported cameras
thumbnail: ./aravis.webp
---
Using the open source [Project Aravis](https://github.com/AravisProject/aravis)
GenICam library, INDI gains access to a large set of industrial machine-vision
cameras.  Machine-vision cameras supported by Aravis implement the GenICam
(Generic Interface for Cameras) standard and commonly conform to the GigE-Vision
and USB3-Vision standards.

GenICam (Generic Interface for Cameras) is a global machine vision standard that
decouples camera hardware interfaces (like GigE Vision or USB3 Vision) from
software applications. It provides a universal programming interface (API) so
that any compliant camera can be controlled by any software without needing
custom, manufacturer-specific drivers.

From the Aravis documentation,
> Aravis is a GLib/GObject based library for video acquisition using Genicam
> cameras. It currently implements the gigabit ethernet and USB3 protocols used
> by industrial cameras. It also provides a basic ethernet camera simulator and
> a simple video viewer.

## Features

The driver supports both single-exposure image acquisition as well as image
streaming.  The driver constructs a minimal set of controls provided and
accessed by the underlying
[Project Aravis](https://github.com/AravisProject/aravis) library.  Currently,
controls for exposure, gain, subframing, and binning are supported.  At least
some GenICam devices support the `DeviceTemperature` property.  If a particular
camera includes the `DeviceTemperature` property, this is queried and inserted
into fits images.  One should note that most GigE-Vision cameras do not provide
control of the temperature.

Currently, this driver expects the camera to already have its PixelFormat
property to be set to Mono16.  Changing the PixelFormat and other properties
must currently be done with Aravis tools directly while this INDI driver is
**NOT** connected to the camera.  Further, while the INDI driver expects to
connect to the camera, the Aravis tools must be disconnected.  Very easy
modifification of some camera features (including PixelFormat) can be
accomplished and tested with the arv-viewer-0.8 graphical interface.  Somewhat easy
modification to all the other features of the camera can be done with the
arv-tool-0.8 command.  Additionally, one can use
[Python](https://lazka.github.io/pgi-docs/Aravis-0.8/index.html) or other Aravis
[GLib/GObject-supported](https://aravisproject.github.io/aravis/aravis-stable/)
programming interfaces to interact with and control these cameras.

## Supported Cameras

Any GigE-Vision or USB3-Vision GenICam camera may be supported.  [Project
Aravis](https://github.com/AravisProject/aravis) does keep a [list of cameras
known to work](https://github.com/AravisProject/aravis/wiki/TestedCameras),
though this appears to be somewhat out of date.  Some cameras
tested with INDI and not documented on the list include [FLIR's Oryx
10GigE](https://www.teledynevisionsolutions.com/products/oryx-10gige), and
several other FLIR cameras (both GigE-Vision and USB3-Vision types).

### Connecting to Camera

Only cameras that are accessible when the INDI server launches will be available
for connecting.
