var re_email = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$', 'g');
var re_password = new RegExp('^[\\S ]{8,128}$', 'g');
module.exports = function (db, io) {
    var Account = {
        Login: function (client, username, password) {
            return true;
        },
        Create: function (client, email, username, password) {
            return true;
        },
        GetCode: function (client) {
            var code;
            return code;
        },
        CheckCode: function (client, code) {
            return true;
        },
        Activate: function (client, id, code) {
            return true;
        },
        Delete: function (client) {
            return true;
        }
    };
    return Account;
};
