---
title: Weather Watcher
categories: ["weather-stations"]
description: Weather Watcher
thumbnail: ./weather-watcher.webp
---

## Features

Weather Watcher driver is a generic driver for accessing weather data from different sources. Data can be collected from a local weather station or a remote weather provider. The Weather Watcher driver just needs a file or an URL with the data listed in lines like:  
where 'temp' is the key, '18.1' the value and '=' the pair separator.

temp=18.100000

In this example, 'temp' is the name of the parameter, '=' is the seperator, and '18.1' is the value. Lines not matching this format are ignored by the driver.

Please first find out the file name or URL to use. This information should be found in the product manual.  
E.g. /home/weather/data.txt, or [](http://192.168.1.1:10800/cgi-bin/cgiLastData)[http://192.168.1.1](http://192.168.1.1/):10800/cgi-bin/cgiLastData

Below, we use the SOLO device as an example. However, if you do own a SOLO, please use the indi_solo driver instead. If you have a cloudwatcher without SOLO, please use the aagcloudwatcher driver.

## Operation

The SOLO provides weather information at the URL '[](http://192.168.1.1/cgi-bin/cgiLastData)[http://192.168.1.1](http://192.168.1.1/):80/cgi-bin/cgiLastData' (replace 192.168.1.1 with the URL or hostname of your solo device. You may also specify a different port after the colon). To test the access, open the URL in a browser. Without asking for a password, it should display something like this:

clouds=-0.140000  
cloudsSafe=2  
temp=9.870000  
wind=-1  
windSafe=1  
gust=-1  
rain=3200  
rainSafe=1  
lightmpsas=16.85  
lightSafe=1  
switch=0  
safe=0  
hum=80  
humSafe=1

Not all of these parameters need to be present and only a few are of interest. All data are treated as numeric, that is WeatherWatcher driver doesn't make assumption on unit of measurement. So your wind data can be in Kph or Mph, only the threshold has to be updated.

The driver can read several of these parameters and clients (i.e. kstars/ekos), will display the data. The driver has min/max values for deciding, if the value is in a good, warn, or alert state. In addition, the driver can classify some parameters as 'critical'. When any such critical parameter is outside the min/max range, the driver will report 'unsafe' condition and the client can abort and shutdown the observatory. The scheduler in Kstars/ekos in particular, will only warn you when parameters are in warn state, without changing its behaviour, but abort imaging and shutdown observatory when any critical parameter is in 'alert' state.

## Configuration

First, open the indi device panel and go to options tab. Here you can specfy the URL or file to monitor in 'Source / File'.  
Next, you can specify the parameters (keywords) you want to be found in the url/file. Just specify the ones you are interested in.  
Press 'save', to store your changes.

Next, go to the 'main control' tab and connect the driver.

Then, go to the 'Parameters' tab and select the parameters you consider 'critical'. You should also specify the min and max range of OK values. Values outside this range are considered dangerous (alert). Please note, that order is importent. Min value must be smaller than max value! You can also specify a warn percentage. The purpose of the warn percentage is to get you a warning when the value gets to close to the boundary of the ok range. The following graphic visualizes the range for the temperature parameter:

[ insert graphic with temperature range ]

Note: if the minimum of the parameters is set to zero, a lower warning is not issued because the driver assumes that the parameter is positive only (e.g. Wind).

Next, go back to 'options' panel and save your configuration again. Then go to 'main control' and disconnect and then reconnect the driver. The panel should now display the status of all the critical parameters (green/yellow/red light) as well as the overall status.

Please note, whenever you want to change a parameter to be a critical parameter or not, you have to save settings, then reconnect the driver. Other changes become active immediately.

Please test the configuration in your setup before allowing the observatory to operate automatically.

### Options

Before connecting, in the option tab you have to set the correct data source.

For filesystem based file you have to specify the full path. E.g.  **/home/weather/data.txt**.

For web based resources the full url has to be set. E.g.  **[http://192.168.1.1:10800/cgi-bin/cgiLastData](http://192.168.1.1:10800/cgi-bin/cgiLastData)**

![ww option](https://indilib.org/images/ww_option.png)![](https://stellarmate.com/ww_option.png)

Then the keywords name have to be matched correctly in the parameters fields:

1.  **Rain**, some weather stations use '_precipitation_', '_precip_'. But '_rain_' is the most common one.
2.  **Temperature**, '_temp_' or '_temperature_´ are common keywords. No unit of measurements is required.
3.  **Wind**  is meant to be an average of a period of time.
4.  **Gust**  highest wind value over a period of time.
5.  **Forecast**  not all weather station have this information.
6.  **Separator**  the character separating the key from the value.

Please note that if some of the parameters are not matched they will be ignored and no error will be triggered.

In order to change the parameters, after setting the value in the option tab, save the configuration and restart the INDI driver.

### Main control

Once the driver is correctly configured, save the configuration and move to Main Control tab where the overall current situation of weather data is shown.

![](https://stellarmate.com/ww_main.png)![ww main](https://indilib.org/images/ww_main.png)

-   **Connection**  allows to connect / disconnect from the device.
-   **Status**  shows the OK (green), WARNING (yellow) or DANGER (red) status for the three critical parameters: rain, wind and temperature.
-   **Weather**  force reading from the device.
-   **Update**  refresh reading period (in seconds) .

### Parameters

Parameters tab is used to read all weather data (not just critical parameters) and to set weather alerts triggered by critical parameter ranges:

![ww parameters](https://indilib.org/images/ww_parameters.png)![](https://stellarmate.com/ww_parameters.png)

For each of the three critical parameters (rain, temperature and wind), firstly a range in which the observatory can safely operate is set (OK range, marked with a green color led in main control tab).

Outside of this range it is not safe to continue observatory operations (DANGER, red color led in main control tab).

Before reaching the danger zone, Weather Watcher can issue a WARNING (yellow color led in main control tab). Weather Watcher asks for a percentage (of the OK range) to define the warning zone. Remember that in warning zone we are still in the OK range so that a shutdown procedure is not triggered yet.

Refer to the image below as an example taking in account Temperature, where the safe operation range is -30 to +30 (obviously is meant to be Celsius degree in the example, but driver doesn't care about unit of measurement).![](https://stellarmate.com/ww_range.png)

![ww range](https://indilib.org/images/ww_range.png)

Note: if the minimum of the parameters is set to zero, a lower warning is not issued because the driver assumes that the parameter is positive only (e.g. Wind).

Critical parameters are queried by the scheduler, so if one of the parameters (Rain, Temp or Wind) is in the danger zone, the Scheduler will trigger the shutdown procedure. As of today (4/2019) the Scheduler will prevent observation to start but will not shutdown once it has started.