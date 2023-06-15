const regexp = {
	email: new RegExp( '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$', 'g' ),
	password: new RegExp( '^[\\S ]{8,128}$', 'g' ),
};

module.exports = ( DB, IO ) => {return {
	Login: ( client: any, username: string, password: string ) => {
		return true;
	},
	Create: ( client: any, email: string, username: string, password: string ) => {
		return true;
	},
	GetCode: ( client: any ) => {
		let code;
		return code;
	},
	CheckCode: ( client: any, code: string ) => {
		return true;
	},
	Activate: ( client: any, id: number, code: string ) => {
		return true;
	},
	Delete: ( client: any ) => {
		return true;
	}
};};