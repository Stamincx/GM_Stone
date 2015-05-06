#include <pebble.h>
#include "viera.h"
#include "libs/pebble-assist.h"
#include "generated/appinfo.h"
#include "generated/keys.h"
#include "skipstone.h"
#include "players.h"
#include "windows/win-viera.h"

void viera_init(void) {
	win_viera_init();
}

void viera_deinit(void) {
	win_viera_deinit();
}

void viera_in_received_handler(DictionaryIterator *iter) {
}

void viera_reload_data_and_mark_dirty() {
	win_viera_reload_data_and_mark_dirty();
}

void viera_request(uint8_t request) {
	skipstone_request(KEY_METHOD_VIERA, request);
	viera_reload_data_and_mark_dirty();
}

