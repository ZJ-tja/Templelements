var IO = io( "", { transports: [ "websocket" ] } );

IO.on( "Notification", data => {
	console.log( data );
});

IO.on( "GetPaths", paths => {
	console.log( paths );
});

window.Paths = function() {
	IO.emit( "GetPaths" );
}