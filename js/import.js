function showImport()
{
	document.getElementById('import-data').value = "";
	document.getElementById('import').style.display = "block";
}

function hideImport()
{
	document.getElementById('import-data').value = "";
	document.getElementById('import').style.display = "none";
}

function submitImport()
{
	let rawData = document.getElementById('import-data').value;
	let rows = rawData.split(', ');
	for (i=0; i < rows.length; i++) {
		rows[i] = rows[i].split(',');
		addVariant(rows[i][0], rows[i][1]);
	}
	hideImport();
}