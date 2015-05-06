var request = new XMLHttpRequest();

var comandi = [];
comandi.push("NRC_CH_UP-ONOFF");
comandi.push("NRC_CH_DOWN-ONOFF");
comandi.push("NRC_VOLUP-ONOFF");
comandi.push("NRC_VOLDOWN-ONOFF");

var URL = 'http://192.168.0.103:55000/nrc/control_0';

try {
		request.open("POST", URL, false);
		request.setRequestHeader("SOAPAction", '"urn:panasonic-com:service:p00NetworkControl:1#X_SendKey"');
		request.setRequestHeader("Content-Type", "text/xml");
		request.send('<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\" s:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"><s:Body><u:X_SendKey xmlns:u=\"urn:panasonic-com:service:p00NetworkControl:1\"><X_KeyEvent>'+comandi[e.itemIndex]+'</X_KeyEvent></u:X_SendKey></s:Body></s:Envelope>');
	} catch (error) {
		console.log("Error in XMLHttpRequest: " + error);
	}	

