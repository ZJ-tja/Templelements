"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var https_1 = require("https");
var socket_io_1 = require("socket.io");
var pg_1 = require("pg");
var DB = (new pg_1.Client({
    connectionString: process.env.PORT ? "postgres://templelements:MRlLiHggR8kr9PMncJ4O7ps4xJAKNmYT@dpg-chsqmaik728ud3kthlm0-a/db_templelements" : "postgres://postgres:1234@localhost:5432/templelements",
})).connect(function (error) {
    if (error) {
        console.error(error);
        return process.exit();
    }
    console.log("OK<--DATABASE<--CONNECTED");
});
var URLs = {
    "/": {}
};
var MIMEs = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".webmanifest": "application/manifest+json"
};
var DIR_STATIC = "static";
var HTTPS = (0, https_1.createServer)(process.env.PORT ? null : {
    // LOCALHOST CERTS
    key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1lcNiRny+HuHv\n4Hkij+4WRMgo36Uygu1HQLqWe6/xRo8Q4X6ioTszUwTURDV2ctmAb2pIf4yjYfgd\nbOwl3XBRqZUzwrat1YGzQk/YdHoZ0LSwjqnyuP9oFizJ/1VpM0IHfQiqsj6xnsAz\nJsAwljsUNPCWuyc/7LkQhuuovVGYclzNqe7fuyuyCTlmxai5RAaxlVhmiCruMgfI\n5iCkfJ6optCF75rrpeAxGRswRS5Lj+m9Ba3a9CEuDll8NMrVqKpG2VSSjsMGpsib\nq8tbrWkICZBW2LBRj1svbJVmc2OUiPX0X3KD1sVUd/9b85T5ZvJFV0jXHxwa2rwn\n4jXs9PxZAgMBAAECggEAHhWj+2JGRJGFSWLdbvZ9sb7PksYK7qV2fnmg8FGpwsW3\n6koR2wvvbP9yK2DpoqhAlODgsQZA3MjcfLORJGzdsQnxqFO4RHC9Pl/cLraNjD1h\n0mawjYBNAIe7//OHyRgu9mKmzvEdJfxxR4hCC0q4mw5yVebIB/VGbBCOdrR3ElSI\ny162qZZ3OnakoTUMs6uTQ3rv1TgnUzzgCTqyfPhAh6wUV8Tzr9UnsWiS3mFGEpbt\nTc2Wu8GRm5WFg9M+FawFcsFI4rZWCpFc57Shw02Ho3MtMd6d95XhFdFiEMaRBvWX\nRlMeRtu11UuICBy9Iqof3NZK+m9H5hU6tFEuwRnJiQKBgQDbcZcvzNnX2wE4Lr5z\nNQfkItEX1i+rph7rfBbfrwhqeXubohgn8ULgwPrz3LH90HGegtwQZ+N71SlHje7C\nMx0dZA8rsbwhkiI7laubzhweRjo/Xdc8Cjs/U+6+mroPMaSbUfnAAxCHu7Jp46If\nf6O3rdrTet3iD0seeTFlVAb/rwKBgQDT1aX2AFJuXajSZfbBH4HOjRyKf3b+PCPR\n+4uwQCDw/cizgKVWSjLpZ1dAM43NmhM3Ez1EA3GoMkvLBrqNxtnw+dSu/BijCX3q\nILNuaTp1gLfFazevc8xuMhpMoV1WJGXtnawtt6mB5kLXWk9azOmxukhDXBtyyWCJ\nmvufjOR+dwKBgDQWblCGS18VOODhF4u5FrpsGT2TNZWExOoYdkV6AoFjfJegjiNM\n/RbkN60SwZ0BkTaS0TGDt1d5bWbypa2q/EoxqfgxI/rD+SQzjpxY/Aujl8faunAh\n7ZZGkfDkQS3CFtRXTPTqxU2ym9LOmXjojy/WMI7qJyi1gJsnITZwD4k5AoGAR0Wg\n2w3srhlxDakkxoF1SSuNKMQOIyfU3XeG3jwVWT/p4QstlcTNMF6GqqEt2rk2MdeV\nS2blPLP/cEXJSp5XAY7tEhrbpy8wYC+0bzeUZahzLEcQq0WIyKKu2o2IO81vRe1A\n2vjqXTw9zPsjq+c50YRdf9xjl9FNW777Xgknb60CgYAvNGA4LD9St5zlPTnUa8xr\nkWyqk7ROQRiC5lNwrGJkh5yumIM47rxY/bdE5T4nT/eihIIi9HUNezqK81W+VJOx\nEXodPsPLnC6oMc2aPAxK8VgfSy5I9/8zXYOTw/jyj9v05JQQwc27RaqwtAXX3Ev8\nCBQApzrabsCJxKYDWG94JQ==\n-----END PRIVATE KEY-----",
    cert: "-----BEGIN CERTIFICATE-----\nMIIDqjCCApKgAwIBAgIUEp8a0EtAu/yGW9wQzvgjwDAlHqkwDQYJKoZIhvcNAQEL\nBQAwUzELMAkGA1UEBhMCUEwxFTATBgNVBAcMDERlZmF1bHQgQ2l0eTEcMBoGA1UE\nCgwTRGVmYXVsdCBDb21wYW55IEx0ZDEPMA0GA1UEAwwGWkpfdGphMB4XDTIzMDEx\nNjE1NDQxMFoXDTMzMDExMzE1NDQxMFowUzELMAkGA1UEBhMCUEwxFTATBgNVBAcM\nDERlZmF1bHQgQ2l0eTEcMBoGA1UECgwTRGVmYXVsdCBDb21wYW55IEx0ZDEPMA0G\nA1UEAwwGWkpfdGphMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtZXD\nYkZ8vh7h7+B5Io/uFkTIKN+lMoLtR0C6lnuv8UaPEOF+oqE7M1ME1EQ1dnLZgG9q\nSH+Mo2H4HWzsJd1wUamVM8K2rdWBs0JP2HR6GdC0sI6p8rj/aBYsyf9VaTNCB30I\nqrI+sZ7AMybAMJY7FDTwlrsnP+y5EIbrqL1RmHJczanu37srsgk5ZsWouUQGsZVY\nZogq7jIHyOYgpHyeqKbQhe+a66XgMRkbMEUuS4/pvQWt2vQhLg5ZfDTK1aiqRtlU\nko7DBqbIm6vLW61pCAmQVtiwUY9bL2yVZnNjlIj19F9yg9bFVHf/W/OU+WbyRVdI\n1x8cGtq8J+I17PT8WQIDAQABo3YwdDAfBgNVHSMEGDAWgBRGLzIjWYZVx6XMr/Wi\ne7XbpKrjiDAJBgNVHRMEAjAAMAsGA1UdDwQEAwIE8DAaBgNVHREEEzARgglsb2Nh\nbGhvc3SHBH8AAAEwHQYDVR0OBBYEFEp3/SoQnzHtRQwdVaxy18jDw1iRMA0GCSqG\nSIb3DQEBCwUAA4IBAQANEXAGK7BfBrPnh2E0RK54G6KFJCHWConLhSYON/0/7YP3\nm9/JJL3/WFThAV2UeflL1GqPoLvyzxCizvXIaaswb2xcFBfFdkjLUm85X5vR1X3K\nmWyHO6uZQ4RWzfuwJoqIdQEBKgxflrE/3ovqbryylp1SwsbBnTI3Nwogk9czeLUS\n9JGiKRddUk2NCZLgnDhDH8jK3W02waUP2K7U25cdEWD0LWIx2oTLPMWrNM0AblZr\nZ96ky2Tpgli5UylFicaQ3j6nzRcd9C4y4klT65lpBFZ4vKCjHYQ4Z6hhPD3GG7IV\n+0TxKfmqX8rBgy93+7stdnFfbzxgE1wm76XlX2xj\n-----END CERTIFICATE-----"
}, function (req, res) {
    if (URLs.hasOwnProperty(req.url))
        return RequestTemplelement(req.url, res);
    try {
        console.log("STATIC: " + req.url);
        var type = "application/octet-stream", ext = void 0;
        if (req.url.lastIndexOf(".") !== -1 && MIMEs.hasOwnProperty((ext = req.url.substring(req.url.lastIndexOf(".")))))
            type = MIMEs[ext];
        res.writeHead(200, { "Content-Type": type });
        res.write((0, fs_1.readFileSync)(DIR_STATIC + req.url));
        return res.end();
    }
    catch (_a) {
        return RequestNotFound(req.url, res);
    }
});
HTTPS.requestTimeout = 60000;
HTTPS.maxHeadersCount = 100;
function RequestNotFound(url, res) {
    res.writeHead(404);
    return res.end('<h1>404</h1><h2>Not Found</h2><p>' + url + '</p>');
}
function RequestTemplelement(url, res) {
    console.log("Templelemnts: " + url);
}
var IO = new socket_io_1.Server(HTTPS, {
    transports: ['websocket']
});
var History = {
    Count: 15,
    List: [],
    Add: function (text, options) {
        if (options === void 0) { options = null; }
        var log = {
            text: text,
        };
        if (options)
            log = Object.assign(log, options);
        var size = History.List.unshift(log);
        if (size > History.Count)
            History.List.pop();
    }
};
// const Account = require( "./server_modules/account.js" )( DB, IO );
IO.on("connection", function (client) {
    console.log("OK<--IO<--CONNECTION");
    var account = {
        id: 0,
    };
    // client.on( "Account:Login", Account.Login.bind( client ) );
    client.on("disconnecting", function () {
        console.log("OK<--IO<--DISCONNECTING");
    });
});
HTTPS.listen(process.env.PORT || 443, function () {
    console.log("OK<--SERVER<--LISTENING");
});
process.stdout.on("data", function (data) {
    History.Add(data.toString());
});
