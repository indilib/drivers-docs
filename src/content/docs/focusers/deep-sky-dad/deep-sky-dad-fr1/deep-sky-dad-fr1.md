---
title: Deep Sky Dad FR1
categories: ["focusers"]
description: Deep Sky Dad FR1
thumbnail: ./deep-sky-dad-fr1.webp
---
## Features

Framing manually can be cumbersome, time consuming and inaccurate. That’s why we decided to create Deep Sky Dad field rotator. Development was quite lengthy with many stages of testing different approaches. Our top priority was preventing any tilt and still trying to make it as affordable as possible.

And now, it is finally finished! We have used innovative hybrid combination of precise milled parts and 3D printed circuit enclosure.

### Main Control Tab

-   **Goto**: moves the rotator to specified angle
-   **Abort**: stops rotator movement
-   **Sync**: changes position of rotator without motion
-   **Reverse**: reverses motion of rotation
-   **Speed mode**: slow/fast (use slow for heavy cameras)
-   **Step mode**: microstepping mode (1/2 or 1/4 recommended)

![](https://stellarmate.com/media/com_mtree/images/listings/o/216.png)

## Connection

Connect to the focuser using a micro USB cable. The connection type is serial and by default the port is set to /dev/ttyACM0. The default baud rate is 115200. If you change the default port, save the changes by going to the  **Options**  tab and click  _Save_  configuration.

## Operation

After establishing connection to the rotator, you can use the rotator control in the INDI control panel directly to move and sync the rotator. Alternatively, the rotator can be used in any INDI compatible rotation application.