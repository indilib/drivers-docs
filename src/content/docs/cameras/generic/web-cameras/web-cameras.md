---
title: Web Cameras
categories: ["cameras"]
description: INDI Webcam
thumbnail: ./web-cameras.webp
---


# 

Web Cameras

## Features

The INDI Webcam driver should support many different types of devices including:

-   AV Foundation Cameras on OS X
-   V4L2 Cameras on LInux
-   DC 1394 Cameras on Linux
-   IP Cameras over Ethernet and Wifi
-   Cell Phone and Mobile Device Cameras over Wifi using IP camera apps
-   Screen Capture on OS X and LInux
-   And any other devices supported by FFMPEG and the software libraries you have installed on your computer

The INDI Webcam driver has a number of interesting features:

-   Supports both Live Streaming and Single Image Capture
-   Can use a Webcam or Cell Phone Camera like an astrophotography camera
-   Can do rapid stacking in integration mode to add many frames in the set exposure time to increase signal
-   Can do rapid stacking in averaging mode to average many frames in the exposure time to reduce noise
-   Can take 8 bit RGB, 16 bit RGB, and 16 bit Grayscale images.
-   Supports ROI subframing

## Before connecting

Before you can connect to your webcam and use it in an INDI client, you should do the following:

-   Configure your profile in KStars or other client program
-   Plug in your webcam (or on a mobile phone, start up the IP camera Server)
-   Turn on your webcam (if required)
-   Start or Connect to the INDI Server from the client
-   Select your Video Device, Video Source, Frame Rate, and Video Size

## Configuring a Profile in KStars

In order to use your Webcam in KStars, the first step is to configure the CCD setting in a new profile or editing and existing one. Here is a new profile where we are selecting our CCD as an INDI Webcam CCD. Other software may have similar configuration steps.

![Profile](./images/Profile.webp)

Note that it is not a good idea to have "Autoconnect" selected in this driver before you configure your connection settings and save your c
