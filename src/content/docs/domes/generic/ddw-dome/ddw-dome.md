---
title: Digital Dome Works
categories: ["domes"]
description: Digital Dome Works
thumbnail: ./ddw-dome.webp
---
Features

DDW is a fully automatic observatory dome control system. Link your dome to a computer for complete automation including telescope slaving and shutter control. It supports the following features:

1.  Slave dome rotation to your telescope
2.  Rotation-only and full shutter-and-rotation systems available.
3.  Direct confirmation of shutter open/closed state.
4.  Safety interlocks automatically close dome upon loss of data from PC.
5.  Park-before-close option to avoid mechanical interferences.
6.  Manual override controls for shutter and rotation control

The driver has been tested with DDW Model 4 with firmware version 5.1, but should work with any similar versions.

## Operation

Once you are connected to the dome, you can move it in absolute or relative position. You can slave the dome to the mount by setting the required slaving parameters:

1.  **Radius** is for the radius of the dome in meters.
2.  **Shutter** width is the clearance of the shutter of the dome in meters
3.  **N displacement** is for North displacement. If telescope is not in its ideal central position this parameter allows to configure how much it is displaced from the center. Displacement to north are positive, and to south are negative.
4.  **E displacement** is for East displacement. Similar as the above, displacement to east are positive, and to west are negative.
5.  **Up displacement** is for displacement in the vertical axis. Up is positive, down is negative.
6.  **OTA offset** is for the distance of the optical axis to the crossing point of RA and DEC. In fork mount this is generally 0, but for German like mounts is the distance from mount axis cross to the center line of the telescope. West is positive, east is negative.

After settings the parameters above, go to _Options_ tab and click _Save_ in Configurations so that the parameters are used in future sessions. You can also set the **Autosync threshold** which is the minimum distance autosync will move the dome. Any motion below this threshold will not be triggered. This is to prevent continuous dome moving during telescope tracking.
