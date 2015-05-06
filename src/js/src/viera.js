var VIERA = {
	handleAppMessage: function(payload) {
		var player = Skipstone.players[payload.player];
		var request = payload.request || null;
		var data = {};
		var comandi = [];
		comandi.push("NRC_CH_UP-ONOFF");
		comandi.push("NRC_CH_DOWN-ONOFF");
		comandi.push("NRC_VOLUP-ONOFF");
		comandi.push("NRC_VOLDOWN-ONOFF");

	console.log('in viera.js');

		if (!isset(player.server)) {
			return appMessageQueue.send({type:TYPE.WDTV, method:METHOD.ERROR, status:'Server not set.'});
		}

		switch (request) {
			case REQUEST.POWER:
				data.remote = 'w';
				break;
			case REQUEST.HOME:
				data.remote = 'o';
				break;
			case REQUEST.PREV:
				data.remote = '[';
				break;
			case REQUEST.STOP:
				data.remote = 't';
				break;
			case REQUEST.NEXT:
				data.remote = ']';
				break;
			case REQUEST.REWIND:
				data.remote = 'H';
				break;
			case REQUEST.PLAY_PAUSE:
				data.remote = 'p';
				break;
			case REQUEST.FORWARD:
				data.remote = 'I';
				break;
			case REQUEST.BACK:
				data.remote = 'T';
				break;
			case REQUEST.LEFT:
				data.remote = 'l';
				break;
			case REQUEST.OK:
				data.remote = 'n';
				break;
			case REQUEST.UP:
				data.remote = 'u';
				break;
			case REQUEST.OPTION:
				data.remote = 'G';
				break;
			case REQUEST.RIGHT:
				data.remote = 'r';
				break;
			case REQUEST.PREV_PAGE:
				data.remote = 'U';
				break;
			case REQUEST.DOWN:
				data.remote = 'd';
				break;
			case REQUEST.NEXT_PAGE:
				data.remote = 'D';
				break;
			case REQUEST.MUTE:
				data.remote = 'M';
				break;
			case REQUEST.SETUP:
				data.remote = 's';
				break;
		}

	var url = 'http://' player.server + ':55000/nrc/control_0';
	console.log('viera url request=' + url );
	console.log('viera new xmlhttprequest');
	var xhr = new XMLHttpRequest();
	console.log('viera open xmlhttprequest');
	xhr.open("POST", url, true);
	request.setRequestHeader("SOAPAction", '"urn:panasonic-com:service:p00NetworkControl:1#X_SendKey"');
	request.setRequestHeader("Content-Type", "text/xml");
	xhr.timeout = 20000;
	request.send('<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\" s:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"><s:Body><u:X_SendKey xmlns:u=\"urn:panasonic-com:service:p00NetworkControl:1\"><X_KeyEvent>'+comandi[1]+'</X_KeyEvent></u:X_SendKey></s:Body></s:Envelope>');
	}
};
