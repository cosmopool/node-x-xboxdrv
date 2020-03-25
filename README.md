#node-x-xboxdrv
heavily inspired by: Jabbath/node-xboxdrv

This node module creates binding to xboxdrv. The main purpose of this is to create an alternate Xbox controller module which does not rely on node-hid.

##Prerequisites

Linux
xboxdrv
##Usage ######Note that you should run your program with sudo as xboxdrv may not be able to open the controller otherwise.

import xbox from 'node-x-xboxdrv'
const controller = xbox()

All the relevant input names can be found in config.json.
