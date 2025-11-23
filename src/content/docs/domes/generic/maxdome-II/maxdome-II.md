---
title: MaxDomeIIs
categories: ["domes"]
description: MaxDomeII
thumbnail: ./maxdome-II.webp
---

## Features

This device is a generic dome controller. Commercial "Sirius Domes" uses this device. MaxDome II is a fully automatic observatory dome control system. Link your dome to a computer for complete automation including telescope slaving and shutter control. MaxDome works with a wide variety of commercial and custom-built domes. It supports the following features:

1.  Support for Automadome
2.  Slave dome rotation to your telescope
3.  Rotation-only and full shutter-and-rotation systems available
4.  Single or dual shutter operation, with sequencing
5.  Wireless shutter control - no unreliable sliding contacts
6.  Direct confirmation of shutter open/closed state
7.  Safety interlocks automatically close dome upon loss of data from PC
8.  Park-before-close option to avoid mechanical interferences
9.  Manual override controls for shutter and rotation control
10.  Auxiliary auto-close inputs for Boltwood Cloud Sensor or other observatory protection hardware
11.  Easily adapted to custom or commercial observatory domes
12.  Directly compatible with Sirius Observatories
13.  Directly drives 12VDC motors up to 5A. Can operate other motor types through external relays.
14.  Field-upgradable firmware

## Operation

Once you are connected to the dome, you can move it in absolute or relative position. You can slave the dome to the mount by setting the telescope name in the  **Options**  tab. You also need to fill in your slaving parameters which include the following:

1.  **Radius**  is for the radius of the dome in meters.
2.  **Shutter**  width is the clearance of the shutter of the dome. In a future version this will allow to calculate how much time the telescope can slew without been obstructed by the dome to minimize dome movements.
3.  **N displacement**  is for North displacement. If telescope is not in his ideal position this parameter allows to configure how much it is displaced from the center. Displacement to north are positive, and to south are negative.
4.  **E displacement**  is for East displacement. Similar as the above, displacement to east are positive, and to west are negative.
5.  **Up displacement**  is for displacement in the vertical axis. Up is positive, down is negative.
6.  **OTA offset**  is for the distance of the optical axis to the crossing point of AR and DEC. In fork mount this is generally 0, but for German like mounts is the distance from mount axis cross to the center line of the telescope.

You can also set the  **Autosync threshold**  which is the minimum distance autosync will move the dome. Any moving below this threshold will not be done. This is to prevent continuous dome moving during telescope tracking.
