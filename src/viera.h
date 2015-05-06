#pragma once

#include <pebble.h>

void viera_init(void);
void viera_deinit(void);
void viera_in_received_handler(DictionaryIterator *iter);
void viera_reload_data_and_mark_dirty();
void viera_request(uint8_t request);
