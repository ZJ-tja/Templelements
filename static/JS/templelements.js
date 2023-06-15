const Templelements = {}
Templelements.Load = () => {
	console.log( "Templelements.Load" );
	Templelements.Run( "change" );
};
Templelements.ScrollToId = ( id ) => {
	let target;
	if ( !( target = document.getElementById( id ) ) )
		return console.log( "Templelements.ScrollToId - no element with id " + id );
	
	target.scrollIntoView( { behavior: "smooth" } );
};
Templelements.LinkList = [];
Templelements.LinkHandler = ( event ) => {
	let i, target = event.target, href;
	for ( i = 10;i--; ) {
		if ( target.tagName == "A" )
			break;

		target = target.parentElement;
	}

	if ( !( href = target.getAttribute( "href" ) ) || href.startsWith( "javascript:" ) )
		return;

	if ( href[ 0 ] == "#" )
		return Templelements.ScrollToId( href.substr( 1 ) );

	for ( i = libs.LinkHandler.Functions.length;i--; )
		libs.LinkHandler.Functions[ i ]( target );
	console.log( "HREF" + href );
	event.preventDefault();
	return false;
};
Templelements.LinkBind = () => {
	let i, a, a_list;
	for ( i = Templelements.LinkList.length;i--; ) {
		if ( !( a = Templelements.LinkList[ i ] ) )
			continue;

		a.removeEventListener( "click", Templelements.LinkHandler );
		Templelements.LinkList.splice( i, 1 );
	}

	a_list = document.querySelectorAll( "a" );
	for ( i = a_list.length;i--; ) {
		a = a_list[ i ];
		a.addEventListener( "click", Templelements.LinkHandler );
		Templelements.LinkList.push( a );
	}
}
Templelements.Events = {
	"reload": [ Templelements.Load ],
	"change": [ Templelements.LinkBind ],
};
Templelements.On = ( name, callback ) => {
	if ( typeof callback !== "function" )
		return console.error( "Callback must be a function" );

	if ( Templelements.Events.hasOwnProperty( name ) )
		Templelements.Events[ name ].unshift( callback );
	else
		Templelements.Events[ name ] = [ callback ];
};
Templelements.Run = ( name, ...args ) => {
	let i;
	if ( !Templelements.Events.hasOwnProperty( name ) )
		return console.log( "Unknown event: " + name );

	for ( i = Templelements.Events[ name ].length;i--; )
		Templelements.Events[ name ][ i ]( ...args );
};
window.addEventListener( "pageshow", () => {
	Templelements.Run( "reload" );
});