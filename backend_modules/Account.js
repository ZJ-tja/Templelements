var regexp = {
    email: new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$', 'g'),
    password: new RegExp('^[\\S ]{8,128}$', 'g'),
};
module.exports = function (DB, IO) {
    return {
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
};
