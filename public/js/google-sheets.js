var CLIENT_ID = '635005523017-vt8krovi8kfnuueglttsbcclqsr3c9ih.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function addData() {
	gapi.client.sheets.spreadsheets.values.append({
		spreadsheetId: '1bOJBLhtesv4xWQM_rrtL7piI0Ce2srfQpRc0ONUJN1U',
		range: 'Sheet3!A1:C1',
		majorDimension: "ROWS",
		values: places,
		valueInputOption: 'USER_ENTERED'
	}).then(function(response) {
		console.log(response);
	});
}