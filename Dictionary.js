var IS_DEBUG = false;
function FillDictionary(method, url, bearerToken, params = "?page=1&pageSize=1000000") {
	var options = {
		method: "get",
		headers: { Authorization: "Bearer " + bearerToken },
	};

	var requestUri = url + method.Method + params;
	var response = UrlFetchApp.fetch(requestUri, options);

	var data = JSON.parse(response.getContentText()).Data;

	var sheet = GetList(method.List, true);
	SetHeader(sheet, 1, method.Fileds);
	for (var i = 0; i < data.length; i++) {
		var item = PropertyProcessor(data[i], method.Fileds);
		setValues(sheet, item, i + 2);
	}
}

function SetHeader(sheet, row, fields) {
	var statsCol = 1;
	var statsString = "Дата последнего обновления: ";
	for (var i = 0; i < fields.length; i++) {
		var keyName = fields[i].alias;
		var cell = sheet.getRange(row, i + 1);
		cell.setValue(keyName);
		cell.setBackgroundRGB(0, 255, 255);
		statsCol = i + 2;
	}
	sheet.getRange(row, statsCol).setValue(statsString);
	sheet.getRange(row, statsCol + 1).setValue(new Date());
}

function setValues(sheet, obj, row, col = 1) {
	var counter = col;
	for (key in obj) {
		var cell = sheet.getRange(row, counter);
		cell.setValue(obj[key]);
		counter++;
	}
}

function PropertyProcessor(obj, fields) {
	var newobj = {};
	for (var i = 0; i < fields.length; i++) {
		var keyFullName = fields[i].property;
		var postobj = obj;
		var keys = keyFullName.split(".");
		for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
			try {
				postobj = postobj[keys[keyIndex]];
			} catch (e) {
				if (IS_DEBUG == true) postobj = "Error access property";
			}
		}

		var newPropertyName = keyFullName.replace(/\./g, "");
	  
		if (fields[i].prefix) {
			postobj = fields[i].prefix + postobj;
		}
	  
		if (fields[i].postfix) {
			postobj = postobj + fields[i].postfix;
		}
	  
		if (fields[i].type) {
			switch (fields[i].type) {
				case "Date":
					if (postobj != null) postobj = new Date(postobj);
					break;
				case "Phone":
					postobj = postobj.match(/(?:\+|\d)[\d\-\(\) ]{9,}\d/g);
					break;
			}
		}
		newobj[i + "_" + newPropertyName] = postobj;
	}
	return newobj;
}

function GetList(listName, needClear = false) {
	var newSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(listName);

	if (newSheet != null) {
		if (needClear == true) newSheet.clear();
		return newSheet;
	}

	newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
	newSheet.setName(listName);
	return newSheet;
}
