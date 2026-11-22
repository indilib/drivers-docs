---
title: EQMod
categories: ["mounts"]
description: INDI AZ-GTi Driver based on EQMod driver and is released as a 3rd party driver and requires INDI Library >= v1.7.5.
thumbnail: ./eqmod.webp
---

This document describes the INDI AZ-GTi Driver, which is based on the EQMod driver. It is released as a 3rd party driver and requires INDI Library >= v1.7.5.

## Features

This INDI driver interacts with a mount controller using the Skywatcher Protocol through WiFi. Key features include:

* Goto/Slew at maximum microstep resolution
* Independent slew speeds for both axes, variable between x0.05 to x800 of the sidereal rate (step x0.05).
* Sidereal, lunar, solar and custom trackrates.
* Custom horizon limits.
* PEC training.
* Configurable custom parking positions.
* Custom gearing for mounts with modified axis gearing (driver v1.5+).
* Pulse-guiding.
* ST4 Guiding.
* Full joystick support.

## Connectivity

> [!WARNING]
> To ensure proper mount operation and pointing accuracy, connect to the mount using either the Synscan App OR the INDI driver – never both simultaneously. For initial alignment, first perform alignment using the Synscan App, then fully disconnect the Synscan App before connecting and controlling the mount via the INDI driver. Running both control systems concurrently will compromise the pointing system and may result in inaccurate GOTO operations.

`The device running the EQMod driver (StellarMate/PC) should be connected to the mount WiFi HotSpot. There is no need to use the Synscan App. In the Connection tab, select Ethernet.`

The mount supports two connection modes:

### HotSpot Mode

This is the default mode. When the mount is powered, it is put into HotSpot Mode where it creates its own HotSpot wireless network (IP address `192.168.4.1`). In this mode, the mount acts as the router, and all other devices must connect to it.

If the mount is started in HotSpot Mode, then connect the PC/StellarMate to the mount's open WiFi network. Then enter the IP address as `192.168.4.1` and port `11880`. Go to options and click `Save configuration`. Now you can connect directly to the mount. The machine running the client (Ekos, PixInsight, SkyCharts, etc.) should also be connected to the Mount WiFi HotSpot so that the mount, driver, and client are ALL on the same network, which in this case is the Mount WiFi HotSpot network.

![AZ GTi HotSpot Diagram](./images/az-gti-hotspot.webp)

The IP address in the image above for the devices connected to the mount WiFi are just examples. Usually, the first device that connects to the Mount HotSpot gets IP address `192.168.4.2` and so on.

### Station Mode

With this mode, the mount can join an existing WiFi network. This method is recommended since the controlling PC/StellarMate can connect to the mount and also to other devices on the network; whereas in the HotSpot mode, they must exclusively connect to the mount's own internal network.

To use Station Mode instead, please follow these steps:

1.  Connect to AZ-GTi "SynScan_xxxx" wifi hotspot.
2.  Start/connect SynScan app.
3.  Go to `Settings/Wi-Fi settings`.
4.  There are two sections - `Modify Access Point` and `Modify Station`.
5.  Click `Modify Station`. There you can enable it (it's disabled by default).
6.  If StellarMate HotSpot is active, then put StellarMate SSID and password.
7.  If StellarMate is connected to an existing WiFi network, then select the desired SSID and password.
8.  The IP address reported by the IP is the IP address you need to put in the `Connections` tab of the driver in INDI Control Panel.

Both modes can be enabled at the same time.

#### Station Mode to StellarMate

The following image illustrates the connection topology for connecting the mount in Station Mode to a StellarMate WiFi HotSpot. All other devices must be connected to the StellarMate WiFi HotSpot as well.

![AZ GTi Station Mode Diagram](./images/az-gti-station-mode.webp)

#### Station Mode to Home WiFi

In this mode, all the devices are connected to the home WiFi router. When setting the mount to Station Mode via the Synscan App, select the home wifi SSID and put the password to connect to it.

![AZ GTi Station WiFi Diagram](./images/az-gti-station-wifi.webp)

## Operation

Once AZ-GTi is online, it loads mount, alignment, parking, and horizontal limits settings if they exist. Its location defaults to the celestial pole unless a custom parking position is set previously.

### Main Control

The main control tab is where the primary control of EQMod takes place. To track an object, enter the equatorial of date (JNow) coordinates and press `Set`. The mount shall then slew to an object, and once it arrives at the target location, it should engage tracking at the selected tracking rate, which defaults to Sidereal tracking. Slew mode is different from track mode in that it does not engage tracking when slew is complete. To sync, the mount must be already tracking. First change mode to `Sync`, then enter the desired coordinates, then press `Set`. Users will seldom use this interface directly since many clients (e.g., KStars) can slew and sync the mount directly from the sky map without having to enter any coordinates manually.

Four tracking modes are supported: Sidereal, Lunar, Solar, and Custom. When using Custom mode, the rates defined in `Track Rates` shall be used. Tracking can be engaged and disengaged by toggling the `Tracking` property.

### Options

Under the options tab, you can configure many parameters before and after you connect to the mount.

*   **Snoop Devices**: Indicate which devices EQMod should communicate with:
    *   **GPS**: If using a GPS driver (e.g., INDI GPSD), then enter its name here. EQMod shall sync its time and location settings from the GPS driver.
    *   **Dome**: If using a Dome driver, put its name here so that Dome Parking Policy can be applied.
*   **Configuration**: Load or Save the driver settings to a file. Click `default` to restore default settings that were shipped with the driver.
*   **Simulation**: Enable to disable simulation mode for testing purposes.
*   **Debug**: Enable debug logging where verbose messages can be logged either directly in the client or a file. If Debug is enabled, advanced properties are created to select how to direct debug output. [Watch a video on how to submit logs.](https://stellarmate.com/support/logs-submission.html)

#### Dome Parking Policy

If a dome is used in conjunction with the mount, a policy can be set if parking the mount or dome can interfere with the safety of either. For example, you might want to always park the mount before parking the dome, or vice versa. The default policy is to ignore the dome.

*   **Ignore dome**: Take no action when dome parks or unparks.
*   **Dome locks**: Prevent the mount from unparking when dome is parked.
*   **Dome parks**: Park the mount if dome starts parking. This will disable the locking for dome parking, <font color="red">EVEN IF MOUNT PARKING FAILS.</font>
*   **Both**: Dome locks & Dome parks policies are applied.

![EQMod Options Diagram](./images/eqmod-options.webp)

*   **Scope Properties**: Enter the Primary and Secondary scope information. Up to six different configurations for Primary and Secondary Guider telescopes can be saved separately, each with an optional unique label in the `Scope Name` property.
*   **Scope Config**: Select the active scope configuration.
*   **Joystick**: Enable or Disable joystick support. An INDI Joystick driver must be running for this function to work. For more details, check the [INDI Telescope Joystick tutorial](https://stellarmate.com/support/tutorials/135-controlling-your-telescope-with-a-joystick.html).
*   **Backlash**: Set RA & DEC backlash in microsteps.

### Motion Control

![EQMod Motion Control Diagram](./images/eqmod-motion.webp)

Under motion control, manual motion controls along with speed and guide controls are configured.

*   **Motion N/S/W/E**: Directional manual motion control. Press the button to start the movement and release the button to stop.
*   **Slew Rate**: Rate of manual motion control above when `1x` equals sidereal rate.
*   **Guide N/S/W/E**: Guiding pulses durations in milliseconds. This property is meant for guider application (e.g., PHD2) and not intended to be used directly.
*   **Guiding Rate**: Guiding Rate for RA & DE. `0.3` means the mount shall move at 30% of the sidereal rate when the pulse is active. The sidereal rate is ~15.04 arcseconds per second. So at `0.3x`, the mount shall move `0.3 * 15.04 = 4.5` arcsecond per second. When receiving a pulse for `1000ms`, the total theoretical motion is `4.5` arcseconds.
*   **Custom Speeds**: Custom speeds in RA & DEC axis when performing slew motion.
*   **Track Default**: Default tracking rate to be used on startup.
*   **ST4 N/S/W/E**: If the mount is receiving guiding pulses via ST4, apply this rate.

### Site Management

Time, Location, and Park settings are configured in the Site Management tab.

![EQMod Site Management Diagram](./images/eqmod-site.webp)

*   **UTC**: UTC time and offsets must be set for proper operation of the driver upon connection. The UTC offset is in hours. East is positive and west is negative.
*   **Location**: Latitude and Longitude must be set for proper operation of the driver upon connection. The longitude range is 0 to 360 degrees increasing eastward from Greenwich.
*   **Parking Position**: Upon connection to the mount, Ekos loads these values into the mount's motor controller to initialize the (stepper) motor step values. The default values represent the home position where the mount points to the celestial pole - i.e., 0 deg RA, 90 deg DEC.
*   **Parking**: To set the parking position of the mount to the home position, click “Default”, then "Write Data" - this saves the home values as the parking values. To set the parking position of the mount to a custom position, slew the mount to the desired position and click “Current”, then "Write Data" - this saves the current motor step values as the parking values.

**IMPORTANT**: For the first time Ekos connects to the mount, or if for any reason the parking position has become incorrect. Make sure the mount is in the home position, power up the mount, connect Ekos and set the parking position to home by clicking “Default”, then "Write Data".

### Firmware

The Firmware tab displays information on the detected mount type and firmware version. Furthermore, the RA/DE steps, frequencies, and gear ratios are displayed.

![EQMod Firmware Diagram](./images/eqmod-firmware.webp)

#### Custom Gearing

The driver reads the RA/DE steps per revolution (**Stepper/Gear**) from the motor controller, and uses them for tracking, guiding, and GoTo. If the axis gearing of your mount has been modified, for example by an aftermarket belt or worm gear upgrade, the firmware still reports the stock values, so tracking, guiding, and GoTo will all be wrong.

Starting with driver v1.5, you can enter the actual steps per revolution in the **Custom Gearing** property of the Firmware tab. Leave both values at **0** to use the firmware values, which is the default and correct for unmodified mounts.

To set custom gearing:

1. Start the driver but do **not** connect to the mount yet.
2. In the **Firmware** tab, enter **RA Steps/360** and **DE Steps/360** under **Custom Gearing**, then click **Set**. Get these values from whoever modified the mount.
3. Put the mount in its home position (counterweights down, pointing at the celestial pole), then connect.
4. Check that **Stepper/Gear** now shows your custom values as **RA Steps (Total)** and **DE Steps (Total)**.
5. Set the parking position again: click "Default", then "Write Data". Parking positions saved with the old gearing are no longer valid.
6. Redo your guiding calibration.

The values are saved in the driver configuration, so they stay in place after driver updates. If you change them while connected, they take effect the next time you connect.

For example, an EQ8 or EQ8-R whose 1:1 motor-to-worm belt has been changed to 1.5:1 goes from 11,136,000 to **16,704,000** steps per revolution on each axis.

> [!WARNING]
> The motor controller's own PEC (PPEC) assumes the stock gearing. Keep PPEC off on a re-geared mount unless whoever modified it confirms that PPEC still works.

Fast slews on a mount geared down this way are slower than before, because each motor step moves the axis a smaller distance.

### Motor Status

The stepper motors positions and work periods are displayed in addition to the status of each motor. If the mount is equipped with auxiliary encoders, then their position shall be displayed.

![EQMod Motor Status Diagram](./images/eqmod-motor-status.webp)

### Alignment

By default, the alignment mode is set to N-Star. Every time you perform a sync, a new sync point is added to the model. You need to save the alignment points file if you want the driver to utilize them on the next startup. You can perform all these operations in the `Align` tab. The EQMod driver is currently transitioning to the INDI Alignment Subsystem, and this section shall be updated when the transition is over to avoid duplicate information.

Under Options, you can select to utilize INDI's Alignment Subsystem instead of EQMod's own alignment system. However, the Alignment Subsystem is currently not stable, so it is recommended to use the EQMod alignment system, which is on by default.

### PEC

PEC training works the same way as with the handcontroller. Guide on a star, engage PEC training, and the firmware will wait for the mount to pass the worm indexer and then records the resulting speeds in the EEPROM of the motor microcontroller. When it has finished (worm indexer), it toggles a status bit, and you can see in the INDI Control panel the status of PEC training becoming green (whereas it remains busy/yellow while training).

PEC/PEC training is enabled in INDI EQMod for mounts which support it (EQ8, AZEQ5/6, EQ6R too apparently). It is a motor controller firmware feature; the INDI driver just sends the corresponding commands to start/stop PEC/PEC training and does not then bother about it. Please note that the firmware PEC+guiding may not be a good idea as the firmware changes the motor speed unconditionally, so some guide commands may be lost.

### Horizon Limits

For horizon limit, just slew to the points along the horizon you want to set and hit the `Add current` button. The order of points is significant as Horizon uses a linear approximation between them. When you have finished, hit the `Write File` button (saved in `~/.indi/HorizonData.txt`, which you can manually edit also).
