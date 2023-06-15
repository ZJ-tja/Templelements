if ( typeof Templelements !== "object" )
	throw new Error( "FAIL!<--TEMPLELEMENTS: is not defined" );

Templelements.Form = ( event, handler_name ) => {
	event.preventDefault();
	if ( typeof ( handler_name ) !== "function" )
		return console.error( "FAIL<--TEMPLELEMENTS.FORM: handler_name must be a function name" );

	console.log( "OK<--TEMPLELEMENTS.FORM: " + handler_name );
	setTimeout( handler_name, 1, [] );
	return false;
}