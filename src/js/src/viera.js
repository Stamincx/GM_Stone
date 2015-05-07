var VIERA = {
	handleAppMessage: function(payload) {
		var player = Skipstone.players[payload.player];
		var request = payload.request || null;
//		var data = {};
		var comando = '';
//	console.log('in viera.js');
//	console.log('richiesta = ' + request);

		if (!isset(player.server)) {
			return appMessageQueue.send({type:TYPE.WDTV, method:METHOD.ERROR, status:'Server not set.'});
		}

		switch (request) {
			case REQUEST.NEXT:
				comando = 'NRC_CH_UP-ONOFF';
				break;
			case REQUEST.PREV:
				comando = 'NRC_CH_DOWN-ONOFF';
				break;
			case REQUEST.FORWARD:
				comando = 'NRC_TV-ONOFF';
				break;
			case REQUEST.REWIND:
				comando = 'NRC_CHG_INPUT-ONOFF';
				break;
			case REQUEST.VOLUME_INCREMENT:
				comando = 'NRC_VOLUP-ONOFF';
				break;
			case REQUEST.VOLUME_DECREMENT:
				comando = 'NRC_VOLDOWN-ONOFF';
				break;
			case REQUEST.UP:
				comando = 'NRC_UP-ONOFF';
				break;
			case REQUEST.DOWN:
				comando = 'NRC_DOWN-ONOFF';
				break;
			case REQUEST.LEFT:
				comando = 'NRC_LEFT-ONOFF';
				break;
			case REQUEST.RIGHT:
				comando = 'NRC_RIGHT-ONOFF';
				break;
			case REQUEST.OK:
				comando = 'NRC_ENTER-ONOFF';
				break;
			case REQUEST.BACK:
				comando = 'NRC_RETURN-ONOFF';
				break;
			case REQUEST.SETUP:
				comando = 'NRC_MENU-ONOFF';
				break;
			case REQUEST.SETUP:
				comando = 'NRC_MENU-ONOFF';
				break;
			case REQUEST.OPTION:
				comando = 'NRC_SUBMENU-ONOFF';
				break;
			case REQUEST.HOME:
				comando = 'NRC_CANCEL-ONOFF';
				break;
			case REQUEST.POWER:
				comando = 'NRC_POWER-ONOFF';
				break;
			case REQUEST.STOP:
				comando = 'NRC_PAUSE-ONOFF';
				break;
			case REQUEST.PLAY_PAUSE:
				comando = 'NRC_PLAY-ONOFF';
				break;
		}
//	console.log('comando = ' + comando);

	var url = 'http://' + player.server + ':55000/nrc/control_0';
//	console.log('viera url request=' + url );
//	console.log('viera new xmlhttprequest');
	var xhr = new XMLHttpRequest();
//	console.log('viera open xmlhttprequest');
	xhr.open("POST", url, true);
//	console.log('viera set header1');
	xhr.setRequestHeader("SOAPAction", '"urn:panasonic-com:service:p00NetworkControl:1#X_SendKey"');
//	console.log('viera set header2');
	xhr.setRequestHeader("Content-Type", "text/xml");
//	console.log('viera set timeout');
	xhr.timeout = 20000;
//	console.log('viera send commands');
	xhr.send('<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\" s:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"><s:Body><u:X_SendKey xmlns:u=\"urn:panasonic-com:service:p00NetworkControl:1\"><X_KeyEvent>'+comando+'</X_KeyEvent></u:X_SendKey></s:Body></s:Envelope>');
//	console.log('viera ritorno');
	}
};
