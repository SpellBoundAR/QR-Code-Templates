
let variants = [];
let qrCodes = 0;
let namePlacements = []

window.onload = function()
{
	document.getElementById('documentWidth').value = 8.5;
	document.getElementById('documentHeight').value = 11;
};

function parseRawData()
{
	let rawData = document.getElementById('rawDataInput').value;
	let rows = rawData.split(', ');
	for (i=0; i < rows.length; i++) {
		rows[i] = rows[i].split(',');
		addVariant(rows[i][0], rows[i][1]);
	}
}

function addVariant(name, data)
{
	let id = 0;
	do {
		id = Math.floor(Math.random() * 99999999)
	} while (variants.includes(id));
	variants.push(id);

	let div = document.createElement('div');
	div.id = "variant-" + id;
	div.setAttribute("data-id", id);
	div.classList.add('variant');
	div.classList.add('qrCodeContainer');

	let nameLabel = document.createElement('label');
	nameLabel.for = "variant-" + id + "-name"
	nameLabel.innerHTML = "Name:";
	nameLabel.classList.add('label-column');
	div.appendChild(nameLabel);

	let nameInput = document.createElement('input');
	nameInput.id = "variant-" + id + "-name";
	nameInput.type = "text";
	nameInput.value = name;
	div.appendChild(nameInput);

	div.appendChild(document.createElement('br'));

	let dataLabel = document.createElement('label');
	dataLabel.for = "variant-" + id + "-data"
	dataLabel.innerHTML = "Data:";
	dataLabel.classList.add('label-column');
	div.appendChild(dataLabel);

	let dataInput = document.createElement('input');
	dataInput.id = "variant-" + id + "-data";
	dataInput.type = "text";
	dataInput.value = data;
	dataInput.onchange = function() { generate(id); };
	div.appendChild(dataInput);

	div.appendChild(document.createElement('br'));

	let sourceDiv = document.createElement('div');
	sourceDiv.id = "variant-" + id + "-source";
	sourceDiv.classList.add('qr-source-container');
	div.appendChild(sourceDiv);

	let downloadButton = document.createElement('button');
	downloadButton.type = "button";
	downloadButton.onclick = function() { download(id); };
	downloadButton.innerHTML = "Download";
	div.appendChild(downloadButton);

	let removeButton = document.createElement('button');
	removeButton.type = "button";
	removeButton.onclick = function() { removeVariant(id); };
	removeButton.innerHTML = "Remove";
	div.appendChild(removeButton);

	document.getElementById('variants').appendChild(div);
	generate(id);
}

function removeVariant(id)
{
	document.getElementById("variant-" + id).remove();
}

function addQRCode()
{
	qrCodes++;
	let id = qrCodes;

	let div = document.createElement('div');
	div.id = "qrCodePlacement-" + id;
	div.classList.add('qrCodeContainer');

	let sizeLabel = document.createElement('label');
	sizeLabel.for = "qrCodeSize-" + id;
	sizeLabel.innerHTML = "Size:";
	sizeLabel.classList.add('label-column');
	div.appendChild(sizeLabel);

	let sizeInput = document.createElement('input');
	sizeInput.id = "qrCodeSize-" + id;
	sizeInput.type = "number";
	sizeInput.step = 0.01;
	sizeInput.min = 0;
	sizeInput.onchange = function() { refresh(); };
	div.appendChild(sizeInput);

	div.appendChild(document.createElement('br'));

	let xLabel = document.createElement('label');
	xLabel.for = "qrCodeX-" + id;
	xLabel.innerHTML = "X:";
	xLabel.classList.add('label-column');
	div.appendChild(xLabel);

	let xInput = document.createElement('input');
	xInput.id = "qrCodeX-" + id;
	xInput.type = "number";
	xInput.step = 0.01;
	xInput.min = 0;
	xInput.onchange = function() { refresh(); };
	div.appendChild(xInput);

	div.appendChild(document.createElement('br'));

	let yLabel = document.createElement('label');
	yLabel.for = "qrCodeY-" + id;
	yLabel.innerHTML = "Y:";
	yLabel.classList.add('label-column');
	div.appendChild(yLabel);

	let yInput = document.createElement('input');
	yInput.id = "qrCodeY-" + id;
	yInput.type = "number";
	yInput.step = 0.01;
	yInput.min = 0;
	yInput.onchange = function() { refresh(); };
	div.appendChild(yInput);

	document.getElementById('qrCodePlacements').appendChild(div);
}

function addNamePlacement()
{
	let id = 0;
	do {
		id = Math.floor(Math.random() * 99999999)
	} while (namePlacements.includes(id));
	namePlacements.push(id);

	let div = document.createElement('div');
	div.id = "variant-" + id;
	div.setAttribute("data-id", id);
	div.classList.add('namePlacement');

	let sizeLabel = document.createElement('label');
	sizeLabel.for = "namePlacementSize-" + id;
	sizeLabel.innerHTML = "Font Size:";
	sizeLabel.classList.add('label-column');
	div.appendChild(sizeLabel);

	let sizeInput = document.createElement('input');
	sizeInput.id = "namePlacementSize-" + id;
	sizeInput.type = "number";
	sizeInput.step = 0.01;
	sizeInput.min = 0;
	sizeInput.onchange = function() { refresh(); };
	div.appendChild(sizeInput);

	div.appendChild(document.createElement('br'));

	let xLabel = document.createElement('label');
	xLabel.for = "namePlacementX-" + id;
	xLabel.innerHTML = "X:";
	xLabel.classList.add('label-column');
	div.appendChild(xLabel);

	let xInput = document.createElement('input');
	xInput.id = "namePlacementX-" + id;
	xInput.type = "number";
	xInput.step = 0.01;
	xInput.min = 0;
	xInput.onchange = function() { refresh(); };
	div.appendChild(xInput);

	div.appendChild(document.createElement('br'));

	let yLabel = document.createElement('label');
	yLabel.for = "namePlacementY-" + id;
	yLabel.innerHTML = "Y:";
	yLabel.classList.add('label-column');
	div.appendChild(yLabel);

	let yInput = document.createElement('input');
	yInput.id = "namePlacementY-" + id;
	yInput.type = "number";
	yInput.step = 0.01;
	yInput.min = 0;
	yInput.onchange = function() { refresh(); };
	div.appendChild(yInput);

	div.appendChild(document.createElement('br'));

	let colorLabel = document.createElement('label');
	colorLabel.for = "namePlacementColor-" + id;
	colorLabel.innerHTML = "Color:";
	colorLabel.classList.add('label-column');
	div.appendChild(colorLabel);

	let colorInput = document.createElement('input');
	colorInput.id = "namePlacementColor-" + id;
	colorInput.onchange = function() { refresh(); };
	div.appendChild(colorInput);

	document.getElementById('namePlacements').appendChild(div);
}

function generate(id)
{
	let dataID = "variant-" + id + "-data";
	let data = document.getElementById(dataID).value;
	let parentID = "variant-" + id + "-source";

	var parent = document.getElementById(parentID);
	parent.innerHTML = "";

	let qrCodeRaw = new QRCode(parent, {
		text: data,
		width: 256,
		height: 256,
		colorDark : "#111",
		colorLight : "#fff",
		correctLevel : QRCode.CorrectLevel.H
	});
}

function refreshTemplate()
{
	var preview = document.getElementById('preview');
	var file    = document.querySelector('input[type=file]').files[0];
	var reader  = new FileReader();

	reader.onloadend = function ()
	{
		preview.src = reader.result;
	}

	if (file)
	{
		reader.readAsDataURL(file);
	} 
	else preview.src = "";
}

function refresh()
{
	let documentWidth = parseFloat(document.getElementById('documentWidth').value);
	let documentHeight = parseFloat(document.getElementById('documentHeight').value);

	let page = document.getElementById("page")
	page.style.width = documentWidth + "in";
	page.style.height = documentHeight + "in";

	for (let i = 1; i < qrCodes + 1; i++)
	{
		let id = "qrCode-" + i;
		var element = document.getElementById(id);
		if (element !== null && element !== undefined)
		{
			element.parentNode.removeChild(element);
		}
	}

	for (let i = 1; i < qrCodes + 1; i++)
	{
		let id = "qrCode-" + i;
		let content = '<div id="' + id + '" style="background: #f00;"></div>';
		let size = document.getElementById('qrCodeSize-' + i).value;
		let x = document.getElementById('qrCodeX-' + i).value;
		let y = document.getElementById('qrCodeY-' + i).value;
		document.getElementById('page').innerHTML += content;
		document.getElementById(id).style.position = "absolute";
		document.getElementById(id).style.left = x + "in";
		document.getElementById(id).style.top = y + "in";
		document.getElementById(id).style.width = size + "in";
		document.getElementById(id).style.height = size + "in";
	}
}

function downloadAll()
{
	let elements = document.getElementsByClassName("variant");
	for (let i = 0; i < elements.length; i++)
	{
		let id = elements[i].getAttribute("data-id");
		download(id);
	}
}

function download(id)
{
	let variantName = document.getElementById("variant-" + id + "-name").value

	let template = new Image();
	template.src = document.getElementById('preview').getAttribute("src");
	let templateFileType = template.src.split('.').pop();

	let qrcode = new Image();
	qrcode.src = document.querySelector('#variant-' + id + '-source img').getAttribute("src");

	let documentWidth = parseFloat(document.getElementById('documentWidth').value);
	let documentHeight = parseFloat(document.getElementById('documentHeight').value);

	let pdf = new jsPDF({
		orientation: 'portrait',
		unit: 'in',
		format: [documentWidth, documentHeight]
	});

	documentWidth = pdf.internal.pageSize.width;
	documentHeight = pdf.internal.pageSize.height;

	pdf.addImage(template, templateFileType, 0, 0, documentWidth, documentHeight);

	let namePlacementElements = document.getElementsByClassName("namePlacement");
	for (let i = 0; i < namePlacementElements.length; i++)
	{
		let id = namePlacementElements[i].getAttribute("data-id");
		let size = parseFloat(document.getElementById('namePlacementSize-' + id).value);
		let x = parseFloat(document.getElementById('namePlacementX-' + id).value);
		let y = parseFloat(document.getElementById('namePlacementY-' + id).value);
		let color = document.getElementById('namePlacementColor-' + id).value
		pdf.setFontSize(size);
		pdf.setTextColor(color);
		pdf.text(x, y, variantName);
	}

	for (let qrPlacement = 1; qrPlacement < qrCodes + 1; qrPlacement++)
	{
		let size = parseFloat(document.getElementById('qrCodeSize-' + qrPlacement).value);
		let x = parseFloat(document.getElementById('qrCodeX-' + qrPlacement).value);
		let y = parseFloat(document.getElementById('qrCodeY-' + qrPlacement).value);
		pdf.addImage(qrcode, 'png', x, y, size, size);
	}

	let filename = variantName + '.pdf';
	pdf.save(filename);
}