"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = require("fastify");
var fastify_socket_io_1 = require("fastify-socket.io");
var fs_1 = require("fs");
var pg_1 = require("pg");
var pg = new pg_1.Client(process.env.PORT ? {
    host: "dpg-chsqmaik728ud3kthlm0-a",
    database: "db_templelements",
    user: "templelements",
    password: "MRlLiHggR8kr9PMncJ4O7ps4xJAKNmYT",
} : {
    user: "postgres",
    database: "templelements",
    password: "1234"
});
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
    res.type('text/html').send();
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
    "": {}
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
            res.header("Content-Type", "text/html").send((0, fs_1.readFileSync)("admin.html"));
        }
        else {
            res.header("Content-Type", "text/html").send((0, fs_1.readFileSync)("admin.html"));
            return;
            var lang = parts[0] in Langs ? parts[0] : "en", step = 1, steps = parts.length, tree = Paths;
            for (; step < steps; step++)
                tree = tree[parts[step]];
            switch (tree.type) {
                case "static_cached": break;
            }
        }
    }
    catch (_a) { }
    res.callNotFound();
});
server.ready().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var Account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pg.connect()];
            case 1:
                _a.sent();
                Account = require("./server_modules/account.js")(pg, server.io);
                // const Notifications = require( "./server_modules/notifications.js" );
                server.io.on("connection", function (client) {
                    var account = {
                        id: 0,
                    };
                    client.on("Account:Login", Account.Login.bind(client));
                    client.on("GetPaths", function () {
                        client.emit("GetPaths", Paths);
                    });
                });
                return [2 /*return*/];
        }
    });
}); });
var port = (process.env.PORT || 443);
server.listen({ port: port }, function () {
    console.log("Server listening on port " + port);
});
