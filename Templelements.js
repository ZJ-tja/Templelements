"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = require("fastify");
var fastify_socket_io_1 = require("fastify-socket.io");
var fs_1 = require("fs");
var server = (0, fastify_1.default)({
    https: process.env.PORT ? null : {
        // LOCALHOST CERTS
        key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1lcNiRny+HuHv\n4Hkij+4WRMgo36Uygu1HQLqWe6/xRo8Q4X6ioTszUwTURDV2ctmAb2pIf4yjYfgd\nbOwl3XBRqZUzwrat1YGzQk/YdHoZ0LSwjqnyuP9oFizJ/1VpM0IHfQiqsj6xnsAz\nJsAwljsUNPCWuyc/7LkQhuuovVGYclzNqe7fuyuyCTlmxai5RAaxlVhmiCruMgfI\n5iCkfJ6optCF75rrpeAxGRswRS5Lj+m9Ba3a9CEuDll8NMrVqKpG2VSSjsMGpsib\nq8tbrWkICZBW2LBRj1svbJVmc2OUiPX0X3KD1sVUd/9b85T5ZvJFV0jXHxwa2rwn\n4jXs9PxZAgMBAAECggEAHhWj+2JGRJGFSWLdbvZ9sb7PksYK7qV2fnmg8FGpwsW3\n6koR2wvvbP9yK2DpoqhAlODgsQZA3MjcfLORJGzdsQnxqFO4RHC9Pl/cLraNjD1h\n0mawjYBNAIe7//OHyRgu9mKmzvEdJfxxR4hCC0q4mw5yVebIB/VGbBCOdrR3ElSI\ny162qZZ3OnakoTUMs6uTQ3rv1TgnUzzgCTqyfPhAh6wUV8Tzr9UnsWiS3mFGEpbt\nTc2Wu8GRm5WFg9M+FawFcsFI4rZWCpFc57Shw02Ho3MtMd6d95XhFdFiEMaRBvWX\nRlMeRtu11UuICBy9Iqof3NZK+m9H5hU6tFEuwRnJiQKBgQDbcZcvzNnX2wE4Lr5z\nNQfkItEX1i+rph7rfBbfrwhqeXubohgn8ULgwPrz3LH90HGegtwQZ+N71SlHje7C\nMx0dZA8rsbwhkiI7laubzhweRjo/Xdc8Cjs/U+6+mroPMaSbUfnAAxCHu7Jp46If\nf6O3rdrTet3iD0seeTFlVAb/rwKBgQDT1aX2AFJuXajSZfbBH4HOjRyKf3b+PCPR\n+4uwQCDw/cizgKVWSjLpZ1dAM43NmhM3Ez1EA3GoMkvLBrqNxtnw+dSu/BijCX3q\nILNuaTp1gLfFazevc8xuMhpMoV1WJGXtnawtt6mB5kLXWk9azOmxukhDXBtyyWCJ\nmvufjOR+dwKBgDQWblCGS18VOODhF4u5FrpsGT2TNZWExOoYdkV6AoFjfJegjiNM\n/RbkN60SwZ0BkTaS0TGDt1d5bWbypa2q/EoxqfgxI/rD+SQzjpxY/Aujl8faunAh\n7ZZGkfDkQS3CFtRXTPTqxU2ym9LOmXjojy/WMI7qJyi1gJsnITZwD4k5AoGAR0Wg\n2w3srhlxDakkxoF1SSuNKMQOIyfU3XeG3jwVWT/p4QstlcTNMF6GqqEt2rk2MdeV\nS2blPLP/cEXJSp5XAY7tEhrbpy8wYC+0bzeUZahzLEcQq0WIyKKu2o2IO81vRe1A\n2vjqXTw9zPsjq+c50YRdf9xjl9FNW777Xgknb60CgYAvNGA4LD9St5zlPTnUa8xr\nkWyqk7ROQRiC5lNwrGJkh5yumIM47rxY/bdE5T4nT/eihIIi9HUNezqK81W+VJOx\nEXodPsPLnC6oMc2aPAxK8VgfSy5I9/8zXYOTw/jyj9v05JQQwc27RaqwtAXX3Ev8\nCBQApzrabsCJxKYDWG94JQ==\n-----END PRIVATE KEY-----\n\t\t",
        cert: "-----BEGIN CERTIFICATE-----\nMIIDqjCCApKgAwIBAgIUEp8a0EtAu/yGW9wQzvgjwDAlHqkwDQYJKoZIhvcNAQEL\nBQAwUzELMAkGA1UEBhMCUEwxFTATBgNVBAcMDERlZmF1bHQgQ2l0eTEcMBoGA1UE\nCgwTRGVmYXVsdCBDb21wYW55IEx0ZDEPMA0GA1UEAwwGWkpfdGphMB4XDTIzMDEx\nNjE1NDQxMFoXDTMzMDExMzE1NDQxMFowUzELMAkGA1UEBhMCUEwxFTATBgNVBAcM\nDERlZmF1bHQgQ2l0eTEcMBoGA1UECgwTRGVmYXVsdCBDb21wYW55IEx0ZDEPMA0G\nA1UEAwwGWkpfdGphMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtZXD\nYkZ8vh7h7+B5Io/uFkTIKN+lMoLtR0C6lnuv8UaPEOF+oqE7M1ME1EQ1dnLZgG9q\nSH+Mo2H4HWzsJd1wUamVM8K2rdWBs0JP2HR6GdC0sI6p8rj/aBYsyf9VaTNCB30I\nqrI+sZ7AMybAMJY7FDTwlrsnP+y5EIbrqL1RmHJczanu37srsgk5ZsWouUQGsZVY\nZogq7jIHyOYgpHyeqKbQhe+a66XgMRkbMEUuS4/pvQWt2vQhLg5ZfDTK1aiqRtlU\nko7DBqbIm6vLW61pCAmQVtiwUY9bL2yVZnNjlIj19F9yg9bFVHf/W/OU+WbyRVdI\n1x8cGtq8J+I17PT8WQIDAQABo3YwdDAfBgNVHSMEGDAWgBRGLzIjWYZVx6XMr/Wi\ne7XbpKrjiDAJBgNVHRMEAjAAMAsGA1UdDwQEAwIE8DAaBgNVHREEEzARgglsb2Nh\nbGhvc3SHBH8AAAEwHQYDVR0OBBYEFEp3/SoQnzHtRQwdVaxy18jDw1iRMA0GCSqG\nSIb3DQEBCwUAA4IBAQANEXAGK7BfBrPnh2E0RK54G6KFJCHWConLhSYON/0/7YP3\nm9/JJL3/WFThAV2UeflL1GqPoLvyzxCizvXIaaswb2xcFBfFdkjLUm85X5vR1X3K\nmWyHO6uZQ4RWzfuwJoqIdQEBKgxflrE/3ovqbryylp1SwsbBnTI3Nwogk9czeLUS\n9JGiKRddUk2NCZLgnDhDH8jK3W02waUP2K7U25cdEWD0LWIx2oTLPMWrNM0AblZr\nZ96ky2Tpgli5UylFicaQ3j6nzRcd9C4y4klT65lpBFZ4vKCjHYQ4Z6hhPD3GG7IV\n+0TxKfmqX8rBgy93+7stdnFfbzxgE1wm76XlX2xj\n-----END CERTIFICATE-----\n\t\t"
    }
});
server.register(fastify_socket_io_1.default, {
    transports: ['websocket'],
    serveClient: false,
    cors: {
        origin: process.env.PORT ? "https://templelements.onrender.com/" : "https://localhost/"
    }
});
server.setNotFoundHandler(function (req, res) {
    res.statusCode = 404;
    res.type('text/html').send('Not Found! ' + req.url);
});
var mime_types = {
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
var Paths = {
    "/": {}
};
server.get("/*", function (req, res) {
    var params = "params" in req ? req.params : {};
    try {
        var fulluri = params["*"], parts = fulluri.split("/");
        if (parts[0] == "static") {
            var ext = fulluri.substring(fulluri.lastIndexOf(".")), file = (0, fs_1.readFileSync)(fulluri), type = ext in mime_types ? mime_types[ext] : "application/octet-stream";
            res.header("Content-Type", type).send(file);
        }
        else if (parts[0] == "templelements") {
            res.header("Content-Type", "text/html").send((0, fs_1.readFileSync)("Admin.html"));
        }
        else {
            var lang = parts[0] in Langs ? parts[0] : "en", step = 1, steps = parts.length, tree = Paths;
            for (var part = void 0; step < steps; step++)
                tree = parts[step];
        }
    }
    catch (_a) { }
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
server.ready().then(function () {
    server.io.on("connection", function (client) {
        // client.on( "GetPages", ( result: any ) => {
        // 	return result( ReadDirRec( "Src/", "" ) );
        // } )
        // client.on( "ReadPage", ( name: string, result: any ) => {
        // 	if ( !existsSync( "Src/" + name + ".compiler" ) )
        // 		return client.emit( "Message", "Error", "Compiler.CantFoundPage", [ name ] );
        // 	if ( name in Compiler[ client.id ].Files )
        // 		return result( { Current: Compiler[ client.id ].Current = name } );
        // 	Compiler[ client.id ].Files[ name ] = JSON.parse( readFileSync( "Src/" + name + ".compiler", "utf-8" ) );
        // 	return result( { Current: name, File: Compiler[ client.id ].Files[ name ] } );
        // } )
        // client.on( "CreatePage", ( name: any, result: any ) => {
        // 	if ( existsSync( "Src/" + name + ".compiler" ) )
        // 		return client.emit( "Message", "Error", "Compiler.PageAlreadyExists", [ name ] );
        // 	Compiler[ client.id ].Current = name;
        // 	Compiler[ client.id ].Files[ name ] = {};
        // 	return result( { Current: name, File: Compiler[ client.id ].Files[ name ] } );
        // } );
        // client.on( "disconnecting", () => {
        // 	if ( "Current" in Compiler[ client.id ] ) {
        // 		for ( const [ name, file ] of Object.entries( Compiler[ client.id ].Files ) )
        // 			writeFileSync( "Src/" + name + ".compiler", JSON.stringify( file ) );
        // 		delete Compiler[ client.id ];
        // 	}
        // } );
    });
});
var port = (process.env.PORT || 443);
server.listen({ port: port }, function () {
    console.log("Server listening on port " + port);
});
