---
title: AZ-GTi Equatorial Wedge WiFi Only
categories: ["mounts"]
description: INDI AZ-GTi Driver based on EQMod driver and is released as a 3rd party driver and requires INDI Library >= v1.7.5.
thumbnail: ./azgti.webp
---


## Features

This INDI driver interacts with a mount controller using the Skywatcher Protocol through WiFi

-   Goto/Slew at maximum microstep resolution
-   Independent slew speeds for both axes variable between x0.05 to x800 of the sidereal rate (step x0.05)
-   Sidereal, lunar, solar and custom trackrates
-   Custom horizon limits
-   PEC training
-   Configurable custom parking positions
-   Pulse-guiding
-   ST4 Guiding
-   Full joystick support

## Connectivity

To ensure proper mount operation and pointing accuracy, connect to mount using either Synscan App OR INDI driver - never both simultaneously. For initial alignment, first perform alignment using Synscan App, then fully disconnect Synscan App before connecting and controlling mount via INDI driver. Running both control systems concurrently will compromise the pointing system and may result in inaccurate GOTO operations.

The device running the EQMod driver (StellarMate/PC) should be connected to the mount WiFi HotSpot. There is _no need_ to use the Synscan App. In the Connection tab, select Ethernet.

The mount supports two connection modes:

### **HotSpot Mode**

This is the default mode. When the mount is powered, it is put into HotSpot Mode where it creates its own HotSpot wireless network (IP address 192.168.4.1). In this mode, the mount acts as the router all other devices must connect to it.

If the mount is started in **HotSpot Mode**, then connect the PC/StellarMate to the mount open WiFi network. Then enter the IP address as **192.168.4.1** and port **11880**. Go to options and click Save configuration. Now you can connect directly to the mount. The machine running the client (Ekos, PixInsight, SkyCharts..etc) should also be connected to the Mount WiFi HotSpot as well so that the mount, driver, and client are ALL on the same network which is in this case the Mount WiFi HotSpot network.

![AZ GTi HotSpot](./images/hotspot.webp)

The IP address in the image above for the devices connected to the mount WiFi are just examples. Usually, the first device that connects to the Mount HotSpot gets IP address 192.168.4.2 and so on.

### **Station Mode**

With this mode, the mount can join an existing WiFi network. This method is recommended since the controlling PC/StellarMate can connect to the mount and also to other devices on the network; whereas in the HotSpot mode, they must exclusively connect the mount' own internal network.

To use **Station Mode** instead, please follow these steps

-   Connect to AZ-GTi "SynScan_xxxx" wifi hotspot
-   Start/connect SynScan app
-   Go to Settings/Wi-Fi settings
-   There are two sections - Modify Access Point and Modify Station
-   Click Modify Station. There you can enable it (it's disabled by default)
    -   If StellarMate HotSpot is active, then put Stellarmate SSID and password.
    -   If StellarMate is connected to existing WiFi network, then select the desired SSID and password.
-   The IP address reported by the IP is the IP address you need to put in the **Connections** tab of the driver in INDI Control Panel.
-   Both modes can be enabled at the same time.

### Station Mode to StellarMate

The follow image illustrates the connection topology for connect the mount in Station Mode to StellarMate WiFi HotSpot. All other devices must be connected to StellarMate WiFi HotSpot as well.

![AZ GTi Station Mode](./images/AZ-GTi-Station-Mode.webp)

### Station Mode to Home WiFi

In this mode, all the devices are connected to the home WiFi router. When setting the mount to Station Mode via the Synscan App, select the home wifi SSID and put the password to connect to it.

![AZ GTi Station WiFi](./images/AZ-GTi-Station-WiFi.webp)

### Operation

Once AZ-GTi is online, it loads mount, alignment, parking, and horizontal limits settings if they exist. Its location defaults to the celestial pole unless a custom parking position is set previously.

### Main Control

The main control tab is where the primary control of EQMod takes place. To track an object, enter the equatorial of date (JNow) coordinates and press Set. The mount shall then slew to an object and once it arrives at the target location, it should engage tracking at the selected tracking rate which default to Sidereal tracking. Slew mode is different from track mode in that it does not engage tracking when slew is complete. To sync, the mount must be already tracking. First change mode to Sync, then enter the desired coordinates then press Set. Users will seldom use this interface directly since many clients (e.g. KStars) can slew and sync the mount directly from the sky map without having to enter any coordinates manually.

Four tracking modes are supported: Sidereal, Lunar, Solar, and Custom. When using _Custom_ mode, the rates defined in **Track Rates** shall be used. Tracking can be enganged and disenganged by toggling the **Tracking** property.

### Options

Under the options tab, you can configure many parameters before and after you connect to the mount.

-   **Snoop Devices**: Indicate which devices EQMod should communicate with:
    -   **GPS**: If using a GPS driver (e.g. INDI GPSD) then enter its name here. EQMod shall sync its time and location settings from the GPS driver.
    -   **Dome**: If using a Dome driver, put its name here so that Dome Parking Policy can be applied.
-   **Configuration**: Load or Save the driver settings to a file. Click default to restore default settings that were shipped with the driver.
-   **Simulation**: Enable to disable simulation mode for testing purposes.
-   **Debug**: Enable debug logging where verbose messaged can be logged either directly in the client or a file. If Debug is enabled, advanced properties are created to select how to direct debug output. [Watch a video on how to submit logs](https://stellarmate.com/support/logs-submission.html).
-   #### Dome Parking Policy
    
    If a dome is used in conjunction with the mount, a policy can be set if parking the mount or dome can interfere with the safety of either. For example, you might want to always park the mount _before_ parking the dome, or vice versa. The default policy is to ignore the dome.
    
    -   **Ignore dome**: Take no action when dome parks or unparks.
    -   **Dome locks**: **Prevent** the mount from unparking when dome is parked.
    -   **Dome parks**: Park the mount if dome starts parking. This will disable the locking for dome parking, EVEN IF MOUNT PARKING FAILS.
    -   **Both**: Dome locks & Dome parks policies are applied.
    
      
    ![eqmod options](./images/eqmod_options.webp)
-   **Scope Properties**: Enter the Primary and Seconday scope information. Up to six different configurations for _Primary_ and Secondary _Guider_ telescopes can be saved separately, each with an optional unique label in **Scope Name** property.
-   **Scope Config**: Select the active scope configuration.
-   **Joystick**: Enable or Disable joystick support. An INDI Joystick driver must be running for this function to work. For more details, check the [INDI Telescope Joystick](https://stellarmate.com/support/tutorials/135-controlling-your-telescope-with-a-joystick.html) tutorial.
-   **Backlash**: Set RA & DEC backlash in microsteps.

### Motion Control

![eqmod motion](./images/eqmod_motion.webp)

Under motion control, manual motion controls along with speed and guide controls are configured.

-   **Motion N/S/W/E**: Directional manual motion control. Press the button to start the movement and release the button to stop.
-   **Slew Rate**: Rate of manual motion control above when 1x equals sidereal rate.
-   **Guide N/S/W/E**: Guiding pulses durations in milliseconds. This property is meant for guider application (e.g. PHD2) and not intended to be used directly.
-   **Guiding Rate**: Guiding Rate for RA & DE. 0.3 means the mount shall move at 30% of the sidereal rate when the pulse is active. The sideral rate is ~15.04 arcseconds per second. So at 0.3x, the mount shall move 0.3*15.04 = 4.5 arcsecond per second. When receving a pulse for 1000ms, the total theoritical motion 4.5 arcseconds.
-   **Custom Speeds**: Customs speeds in RA & DEC axis when performing slew motion.
-   **Track Default**: Default tracking rate to be used on startup.
-   **ST4 N/S/W/E**: If the mount is receiving guiding pulses via ST4, apply this rate.

### Site Management

Time, Locaiton, and Park settings are configured in the Site Management tab.

![eqmod site](./images/eqmod_site.webp)

-   **UTC**: UTC time and offsets must be set for proper operation of the driver upon connection. The UTC offset is in hours. East is positive and west is negative.
-   **Location**: Latitude and Longitude must be set for proper operation of the driver upon connection. The longitude range is 0 to 360 degrees increasing eastward from Greenwich.
-   **Parking Position**: Upon connection to the mount, Ekos loads these values into the mount's motor controller to initialize the (stepper) motor step values. The default values represent the home position where the mount points to the celestial pole - i.e. 0 deg RA, 90 deg DEC.
-   **Parking**: To set the parking position of the mount to the home position, click “Default”, then "Write Data" - this saves the home values as the parking values. To set the parking position of the mount to a custom position, slew the mount to the desired position and click “Current”, then "Write Data" - this saves the current motor step values as the parking values.
    -   **IMPORTANT**: For the first time Ekos connects to the mount, or if for any reason the parking position has become incorrect. Make sure the mount is in the home position, power up the mount, connect Ekos and set the parking position to home by clicking “Default”, then "Write Data".

Firmware

Firmware tab displays information on the detected mount type and firmware version. Furthermore, the RA/DE steps, frequencies, and gear ratios are displayed.

![eqmod firmware](./images/eqmod_firmware.webp)

### Motor Status

The stepper motors positions and work periods are displayed in addition to the status of each motor. If the mount is equipment with auxiliary encoders, then their position shall be displayed

![eqmod motor status](./images/eqmod_motor_status.webp)

### Alignment

By default the alignment mode is set to N-Star, every time you perform a sync, a new sync point is added to the model. You need to save the alignment points file if you want the driver to utilize them on the next startup. You can perform all these operations in the _Align_ tab. The EQMod driver is currently transition to the INDI Alignment Subsystem and this section shall be updated when the transition is over to avoid duplicate information.

Under Options, you can select to utilize INDI's Alignment Subsystem instead of EQMod's own alignment system. However, the Alignment Subsystem is currently not stable so it is recommended to use EQMod alignment system which is on by default.

### PEC

PEC training works the same way as with the handcontroller. Guide on a star, engage PEC training and the firmware will wait for the mount pass the worm indexer and then records the resulting speeds in the EEPROM of the motor microcontroller. When it has finished (worm indexer) it toggles a status bit and you can see in the INDI Control panel the status of PEC training becoming green (whereas it remains busy/yellow while training).

PEC/PEC training is enabled in INDI EQMod for mounts which supports it, EQ8, AZEQ5/6, EQ6R too apparently. It is a motor controller firmware feature, the INDI driver just sends the corresponding commands to start/stop PEC/PEC training and do not then bother about it. Please note that the firmware PEC+guiding may not be a good idea as the firmware changes the motor speed unconditionnally, so some guide commands may be lost.

### Horizon Limits

For horizon limit just slew to the points along the horizon you want to set and hit the Add current button. The order of points is significant as Horizon uses a linear approximation between them. When you have finished hit the Write File button (saved in ~/.indi/HorizonData.txt which you can manually edit also).

## Issues

There are no known bugs for this driver. If you find a bug, please report it at INDI's