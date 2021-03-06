var REQUEST = {
    ERROR: 0,
    PLAY_PAUSE: 1,
    VOLUME_INCREMENT: 2,
    VOLUME_DECREMENT: 3,
    VOLUME_MIN: 4,
    VOLUME_MAX: 5,
    FORWARD_SHORT: 6,
    FORWARD_LONG: 7,
    BACKWARD_SHORT: 8,
    BACKWARD_LONG: 9,
    UP: 10,
    DOWN: 11,
    RIGHT: 12,
    LEFT: 13,
    SELECT: 14,
    BACK: 15,
    OK: 16,
    MUTE: 17,
    HOME: 18,
    SETUP: 19,
    POWER: 20,
    OPTION: 21,
    STOP: 22,
    NEXT: 23,
    PREV: 24,
    FORWARD: 25,
    REWIND: 26,
    CLIENTS: 27,
    REFRESH: 28
};

var TYPE = {
    ERROR: 0,
    PLAYERS: 1,
    VIERA: 2,
    VLC: 3,
    XBMC: 4,
    WDTV: 5
};

var METHOD = {
    ERROR: 0,
    SIZE: 1,
    DATA: 2,
    STATUS: 3,
    VIERA: 4,
    VLC: 5,
    XBMC: 6,
    WDTV: 7,
    REQUESTPLAYERS: 8,
    READY: 9
};

var PERSIST = {
    LAST_USED_PLAYER: 0,
    VIERA_CONTROLLING_TYPE: 1,
    VLC_CONTROLLING_TYPE: 2,
    XBMC_CONTROLLING_TYPE: 3,
    WDTV_CONTROLLING_TYPE: 4
};
