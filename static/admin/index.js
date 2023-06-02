window.IO = io( "", { transports: [ "websocket" ] } );
IO.on( "connect", () => {
	alert("HELLO")
});