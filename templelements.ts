import fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import { Client } from 'pg'
import { readFileSync } from "fs";

const pg = new Client( process.env.PORT ? {
	host: 'dpg-chsqmaik728ud3kthlm0-a',
	port: 5334,
	database: 'db_templelements',
	user: 'templelements',
	password: 'MRlLiHggR8kr9PMncJ4O7ps4xJAKNmYT',
} : {
	host: '127.0.0.1',
	port: 5334,
	database: 'templelements',
	user: 'ZetJot',
	password: '1234',
} );

const server = fastify( {
	https: process.env.PORT ? null : {
		// LOCALHOST CERTS
		key: `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1lcNiRny+HuHv
4Hkij+4WRMgo36Uygu1HQLqWe6/xRo8Q4X6ioTszUwTURDV2ctmAb2pIf4yjYfgd
bOwl3XBRqZUzwrat1YGzQk/YdHoZ0LSwjqnyuP9oFizJ/1VpM0IHfQiqsj6xnsAz
JsAwljsUNPCWuyc/7LkQhuuovVGYclzNqe7fuyuyCTlmxai5RAaxlVhmiCruMgfI
5iCkfJ6optCF75rrpeAxGRswRS5Lj+m9Ba3a9CEuDll8NMrVqKpG2VSSjsMGpsib
q8tbrWkICZBW2LBRj1svbJVmc2OUiPX0X3KD1sVUd/9b85T5ZvJFV0jXHxwa2rwn
4jXs9PxZAgMBAAECggEAHhWj+2JGRJGFSWLdbvZ9sb7PksYK7qV2fnmg8FGpwsW3
6koR2wvvbP9yK2DpoqhAlODgsQZA3MjcfLORJGzdsQnxqFO4RHC9Pl/cLraNjD1h
0mawjYBNAIe7//OHyRgu9mKmzvEdJfxxR4hCC0q4mw5yVebIB/VGbBCOdrR3ElSI
y162qZZ3OnakoTUMs6uTQ3rv1TgnUzzgCTqyfPhAh6wUV8Tzr9UnsWiS3mFGEpbt
Tc2Wu8GRm5WFg9M+FawFcsFI4rZWCpFc57Shw02Ho3MtMd6d95XhFdFiEMaRBvWX
RlMeRtu11UuICBy9Iqof3NZK+m9H5hU6tFEuwRnJiQKBgQDbcZcvzNnX2wE4Lr5z
NQfkItEX1i+rph7rfBbfrwhqeXubohgn8ULgwPrz3LH90HGegtwQZ+N71SlHje7C
Mx0dZA8rsbwhkiI7laubzhweRjo/Xdc8Cjs/U+6+mroPMaSbUfnAAxCHu7Jp46If
f6O3rdrTet3iD0seeTFlVAb/rwKBgQDT1aX2AFJuXajSZfbBH4HOjRyKf3b+PCPR
+4uwQCDw/cizgKVWSjLpZ1dAM43NmhM3Ez1EA3GoMkvLBrqNxtnw+dSu/BijCX3q
ILNuaTp1gLfFazevc8xuMhpMoV1WJGXtnawtt6mB5kLXWk9azOmxukhDXBtyyWCJ
mvufjOR+dwKBgDQWblCGS18VOODhF4u5FrpsGT2TNZWExOoYdkV6AoFjfJegjiNM
/RbkN60SwZ0BkTaS0TGDt1d5bWbypa2q/EoxqfgxI/rD+SQzjpxY/Aujl8faunAh
7ZZGkfDkQS3CFtRXTPTqxU2ym9LOmXjojy/WMI7qJyi1gJsnITZwD4k5AoGAR0Wg
2w3srhlxDakkxoF1SSuNKMQOIyfU3XeG3jwVWT/p4QstlcTNMF6GqqEt2rk2MdeV
S2blPLP/cEXJSp5XAY7tEhrbpy8wYC+0bzeUZahzLEcQq0WIyKKu2o2IO81vRe1A
2vjqXTw9zPsjq+c50YRdf9xjl9FNW777Xgknb60CgYAvNGA4LD9St5zlPTnUa8xr
kWyqk7ROQRiC5lNwrGJkh5yumIM47rxY/bdE5T4nT/eihIIi9HUNezqK81W+VJOx
EXodPsPLnC6oMc2aPAxK8VgfSy5I9/8zXYOTw/jyj9v05JQQwc27RaqwtAXX3Ev8
CBQApzrabsCJxKYDWG94JQ==
-----END PRIVATE KEY-----
		`,
		cert: `-----BEGIN CERTIFICATE-----
MIIDqjCCApKgAwIBAgIUEp8a0EtAu/yGW9wQzvgjwDAlHqkwDQYJKoZIhvcNAQEL
BQAwUzELMAkGA1UEBhMCUEwxFTATBgNVBAcMDERlZmF1bHQgQ2l0eTEcMBoGA1UE
CgwTRGVmYXVsdCBDb21wYW55IEx0ZDEPMA0GA1UEAwwGWkpfdGphMB4XDTIzMDEx
NjE1NDQxMFoXDTMzMDExMzE1NDQxMFowUzELMAkGA1UEBhMCUEwxFTATBgNVBAcM
DERlZmF1bHQgQ2l0eTEcMBoGA1UECgwTRGVmYXVsdCBDb21wYW55IEx0ZDEPMA0G
A1UEAwwGWkpfdGphMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtZXD
YkZ8vh7h7+B5Io/uFkTIKN+lMoLtR0C6lnuv8UaPEOF+oqE7M1ME1EQ1dnLZgG9q
SH+Mo2H4HWzsJd1wUamVM8K2rdWBs0JP2HR6GdC0sI6p8rj/aBYsyf9VaTNCB30I
qrI+sZ7AMybAMJY7FDTwlrsnP+y5EIbrqL1RmHJczanu37srsgk5ZsWouUQGsZVY
Zogq7jIHyOYgpHyeqKbQhe+a66XgMRkbMEUuS4/pvQWt2vQhLg5ZfDTK1aiqRtlU
ko7DBqbIm6vLW61pCAmQVtiwUY9bL2yVZnNjlIj19F9yg9bFVHf/W/OU+WbyRVdI
1x8cGtq8J+I17PT8WQIDAQABo3YwdDAfBgNVHSMEGDAWgBRGLzIjWYZVx6XMr/Wi
e7XbpKrjiDAJBgNVHRMEAjAAMAsGA1UdDwQEAwIE8DAaBgNVHREEEzARgglsb2Nh
bGhvc3SHBH8AAAEwHQYDVR0OBBYEFEp3/SoQnzHtRQwdVaxy18jDw1iRMA0GCSqG
SIb3DQEBCwUAA4IBAQANEXAGK7BfBrPnh2E0RK54G6KFJCHWConLhSYON/0/7YP3
m9/JJL3/WFThAV2UeflL1GqPoLvyzxCizvXIaaswb2xcFBfFdkjLUm85X5vR1X3K
mWyHO6uZQ4RWzfuwJoqIdQEBKgxflrE/3ovqbryylp1SwsbBnTI3Nwogk9czeLUS
9JGiKRddUk2NCZLgnDhDH8jK3W02waUP2K7U25cdEWD0LWIx2oTLPMWrNM0AblZr
Z96ky2Tpgli5UylFicaQ3j6nzRcd9C4y4klT65lpBFZ4vKCjHYQ4Z6hhPD3GG7IV
+0TxKfmqX8rBgy93+7stdnFfbzxgE1wm76XlX2xj
-----END CERTIFICATE-----
		`
	}
} );

server.register( fastifyIO, {
	transports: [ 'websocket' ],
	serveClient: false,
	cors: {
		origin: process.env.PORT ? "https://templelements.onrender.com/" : "https://localhost/"
	}
} );


server.setNotFoundHandler( ( req, res ) => {
	res.statusCode = 404;
	res.type( 'text/html' ).send();
} );

const mime_types: { [ ext: string ]: string } = {
	".js": "application/javascript",
	".css": "text/css",
	".html": "text/html",
	".png": "image/png",
	".webp": "image/webp",
	".svg": "image/svg+xml",
	".ico": "image/x-icon",
	".webmanifest": "application/json"
};

var Langs = {};

const Paths = {
	"": {}
}

server.get( "/*", ( req, res ) => {
	let params = "params" in req ? req.params as object : {}
	try {
		let fulluri = params[ "*" ] as string,
			parts = fulluri.split( "/" );
		if ( parts[0] == "static" ) {
			let ext = fulluri.substring( fulluri.lastIndexOf( "." ) ),
				file = readFileSync( fulluri ),
				type = ext in mime_types ? mime_types[ ext ] : "application/octet-stream";
			res.header( "Content-Type", type ).send( file );
		} else if ( parts[0] == "templelements") {
			res.header( "Content-Type", "text/html" ).send( readFileSync( "admin.html" ) );
		} else {
			let lang = parts[0] in Langs ? parts[0] : "en",
				step = 1,
				steps = parts.length,
				tree: any = Paths;
			for ( ; step < steps; step++ )
				tree = tree[ parts[ step ] ];

			switch( tree.type ) {
				case "static_cached": break;
			}
		}
	} catch {}
	res.callNotFound();
});


// function ReadDirRec( base: string, dir: string ) {
// 	const files: Array<string> = [];
// 	for ( const file of readdirSync( base + dir ) ) {
// 		const filepath = dir + "/" + file;
// 		if ( file.includes( ".compiler" ) )
// 			files.push( filepath )
// 		else if ( lstatSync( base + filepath ).isDirectory() ) {
// 			let subfile: string;
// 			for ( subfile of ReadDirRec( base, filepath ) )
// 				files.push( subfile );
// 		}

// 	}
// 	return files;
// }
async function OnStart( sockets, db ) {
	

}

server.ready().then( async () => {
	await pg.connect();
	const Account = require( "./server_modules/account.js" )( pg, server.io );
	const Notifications = require( "./server_modules/notifications.js" );
	server.io.on( "connection", ( client: any ) => {
		let account = {
			id: 0,
		}
		client.on( "Account:Login", Account.Login.bind( client ) );

		client.on( "GetPaths", () => {
			client.emit( "GetPaths", Paths );
		} );
	} );
} );

const port = ( process.env.PORT || 443 ) as number;
server.listen( { port: port }, () => {
	console.log( "Server listening on port " + port );
} );