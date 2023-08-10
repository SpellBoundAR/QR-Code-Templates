
let variants = [];
let qrCodes = 0;
let namePlacements = 0;

window.onload = function()
{
	updatePageDimensions();
	showPageInspector();
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
	downloadButton.classList.add("variant-download-button");
	downloadButton.onclick = function() { download(id); };
	downloadButton.innerHTML = "Get";
	div.appendChild(downloadButton);

	let removeButton = document.createElement('button');
	removeButton.type = "button";
	removeButton.classList.add("variant-remove-button");
	removeButton.onclick = function() { removeVariant(id); };
	removeButton.innerHTML = "X";
	div.appendChild(removeButton);

	document.getElementById('variants').appendChild(div);
	generate(id);
}

function removeVariant(id)
{
	document.getElementById("variant-" + id).remove();
}

function updatePageDimensions()
{
	page = document.getElementById('page')
	let width = page.getAttribute("data-width");
	let height = page.getAttribute("data-height");
	page.style.width = width + "in";
	page.style.height = height + "in";
}

function showPageInspector()
{
	removeAllInspectors();

	page = document.getElementById('page')

	let width = page.getAttribute("data-width");
	let height = page.getAttribute("data-height");

	let inspector = document.createElement('div');
	inspector.classList.add('inspector');

	let widthLabel = document.createElement('label');
	widthLabel.for = "document-width";
	widthLabel.innerHTML = "Width:";
	widthLabel.classList.add('label-column');
	inspector.appendChild(widthLabel);

	let widthInput = document.createElement('input');
	widthInput.id = "document-width";
	widthInput.type = "number";
	widthInput.step = 0.01;
	widthInput.min = 0;
	widthInput.value = width;
	widthInput.onchange = function() { updateWidth(widthInput, page); };
	inspector.appendChild(widthInput);

	inspector.appendChild(document.createElement('br'));

	let heightLabel = document.createElement('label');
	heightLabel.for = "document-height";
	heightLabel.innerHTML = "Height:";
	heightLabel.classList.add('label-column');
	inspector.appendChild(heightLabel);

	let heightInput = document.createElement('input');
	heightInput.id = "document-height";
	heightInput.type = "number";
	heightInput.step = 0.01;
	heightInput.min = 0;
	heightInput.value = height;
	heightInput.onchange = function() { updateHeight(heightInput, page); };
	inspector.appendChild(heightInput);

	inspector.appendChild(document.createElement('br'));

	let backgroundInput = document.createElement('input');
	backgroundInput.id = "document-background";
	backgroundInput.type = "file";
	backgroundInput.onchange = function() { refreshTemplate(); };
	inspector.appendChild(backgroundInput);

	inspector.appendChild(document.createElement('br'));

	let hideButton = document.createElement('input');
	hideButton.type = "button";
	hideButton.value = "Done";
	hideButton.onclick = function() { removeAllInspectors(); };
	inspector.appendChild(hideButton);

	document.getElementById('preview-section').appendChild(inspector);
}

function updateWidth(dataSource, page)
{
	page.style.width = dataSource.value + "in";
	page.setAttribute("data-width", dataSource.value);
}

function updateHeight(dataSource, page)
{
	page.style.height = dataSource.value + "in";
	page.setAttribute("data-height", dataSource.value);
}

function removeAllInspectors()
{
	let elements = document.getElementsByClassName("inspector");
	for (let i = 0; i < elements.length; i++)
	{
		elements[i].remove();
	}
}

function addQRCode()
{
	qrCodes++;
	let id = qrCodes;

	let qrCodePreview = document.createElement('div');
	qrCodePreview.setAttribute("data-id", id);
	qrCodePreview.id = "qr-code-preview-" + id;
	qrCodePreview.classList.add('qr-code-preview');
	qrCodePreview.setAttribute("data-x", 0);
	qrCodePreview.setAttribute("data-y", 0);
	qrCodePreview.setAttribute("data-size", 1);
	qrCodePreview.style.left = "0in";
	qrCodePreview.style.top = "0in";
	qrCodePreview.style.width = "1in";
	qrCodePreview.style.height = "1in";
	qrCodePreview.onclick = function() { showQRInspector(qrCodePreview); };
	document.getElementById('page').appendChild(qrCodePreview);

	showQRInspector(qrCodePreview);
}

function removeQRCode(qrCodePreview)
{
	qrCodePreview.remove();
	showPageInspector();
}

function showQRInspector(qrCodePreview)
{
	removeAllInspectors();

	let id = qrCodePreview.getAttribute("data-id");
	let x = qrCodePreview.getAttribute("data-x");
	let y = qrCodePreview.getAttribute("data-y");
	let size = qrCodePreview.getAttribute("data-size");

	let inspector = document.createElement('div');
	inspector.classList.add('inspector');

	let sizeLabel = document.createElement('label');
	sizeLabel.for = "qr-code-size";
	sizeLabel.innerHTML = "Size:";
	sizeLabel.classList.add('label-column');
	inspector.appendChild(sizeLabel);

	let sizeInput = document.createElement('input');
	sizeInput.id = "qr-code-size";
	sizeInput.type = "number";
	sizeInput.step = 0.01;
	sizeInput.min = 0;
	sizeInput.value = size;
	sizeInput.onchange = function() { updateSize(sizeInput, qrCodePreview); };
	inspector.appendChild(sizeInput);

	inspector.appendChild(document.createElement('br'));

	let xLabel = document.createElement('label');
	xLabel.for = "qr-code-x";
	xLabel.innerHTML = "X:";
	xLabel.classList.add('label-column');
	inspector.appendChild(xLabel);

	let xInput = document.createElement('input');
	xInput.id = "qr-code-x";
	xInput.type = "number";
	xInput.step = 0.01;
	xInput.min = 0;
	xInput.value = x;
	xInput.onchange = function() { updateX(xInput, qrCodePreview); };
	inspector.appendChild(xInput);

	inspector.appendChild(document.createElement('br'));

	let yLabel = document.createElement('label');
	yLabel.for = "qr-code-y";
	yLabel.innerHTML = "Y:";
	yLabel.classList.add('label-column');
	inspector.appendChild(yLabel);

	let yInput = document.createElement('input');
	yInput.id = "qr-code-y";
	yInput.type = "number";
	yInput.step = 0.01;
	yInput.min = 0;
	yInput.value = y;
	yInput.onchange = function() { updateY(yInput, qrCodePreview); };
	inspector.appendChild(yInput);

	inspector.appendChild(document.createElement('br'));

	let hideButton = document.createElement('input');
	hideButton.type = "button";
	hideButton.value = "Done";
	hideButton.onclick = function() { showPageInspector(); };
	inspector.appendChild(hideButton);

	let deleteButton = document.createElement('input');
	deleteButton.type = "button";
	deleteButton.value = "Remove";
	deleteButton.onclick = function() { removeQRCode(qrCodePreview); };
	inspector.appendChild(deleteButton);

	document.getElementById('preview-section').appendChild(inspector);
}

function updateX(dataSource, qrCodePreview)
{
	qrCodePreview.style.left = dataSource.value + "in";
	qrCodePreview.setAttribute("data-x", dataSource.value);
}

function updateY(dataSource, qrCodePreview)
{
	qrCodePreview.style.top = dataSource.value + "in";
	qrCodePreview.setAttribute("data-y", dataSource.value);
}

function updateSize(dataSource, qrCodePreview)
{
	qrCodePreview.style.width = dataSource.value + "in";
	qrCodePreview.style.height = dataSource.value + "in";
	qrCodePreview.setAttribute("data-size", dataSource.value);
}

function addNamePlacement()
{
	let id = namePlacements;
	namePlacements++;

	let namePlacement = document.createElement('div');
	namePlacement.setAttribute("data-id", id);
	namePlacement.id = "name-placement-preview-" + id;
	namePlacement.classList.add('name-placement-preview');
	namePlacement.setAttribute("data-x", 0);
	namePlacement.setAttribute("data-y", 0);
	namePlacement.setAttribute("data-size", 1);
	namePlacement.setAttribute("data-color", "#000000");
	namePlacement.style.left = "0in";
	namePlacement.style.top = "0in";
	namePlacement.innerHTML = "{{ NAME }}"
	namePlacement.onclick = function() { showNameInspector(namePlacement); };
	document.getElementById('page').appendChild(namePlacement);

	showNameInspector(namePlacement);
}

function removeNamePlacement(namePlacement)
{
	namePlacement.remove();
	showPageInspector();
}

function showNameInspector(namePlacement)
{
	removeAllInspectors();

	let id = namePlacement.getAttribute("data-id");
	let x = namePlacement.getAttribute("data-x");
	let y = namePlacement.getAttribute("data-y");
	let size = namePlacement.getAttribute("data-size");
	let color = namePlacement.getAttribute("data-color");

	let inspector = document.createElement('div');
	inspector.classList.add('inspector');

	let sizeLabel = document.createElement('label');
	sizeLabel.for = "namePlacementSize";
	sizeLabel.innerHTML = "Font Size:";
	sizeLabel.classList.add('label-column');
	inspector.appendChild(sizeLabel);

	let sizeInput = document.createElement('input');
	sizeInput.id = "namePlacementSize";
	sizeInput.type = "number";
	sizeInput.step = 0.01;
	sizeInput.min = 0;
	sizeInput.value = size;
	sizeInput.onchange = function() { updateNamePlacementSize(sizeInput, namePlacement); };
	inspector.appendChild(sizeInput);

	inspector.appendChild(document.createElement('br'));

	let xLabel = document.createElement('label');
	xLabel.for = "namePlacementX";
	xLabel.innerHTML = "X:";
	xLabel.classList.add('label-column');
	inspector.appendChild(xLabel);

	let xInput = document.createElement('input');
	xInput.id = "namePlacementX";
	xInput.type = "number";
	xInput.step = 0.01;
	xInput.min = 0;
	xInput.value = x;
	xInput.onchange = function() { updateNamePlacementX(xInput, namePlacement); };
	inspector.appendChild(xInput);

	inspector.appendChild(document.createElement('br'));

	let yLabel = document.createElement('label');
	yLabel.for = "namePlacementY";
	yLabel.innerHTML = "Y:";
	yLabel.classList.add('label-column');
	inspector.appendChild(yLabel);

	let yInput = document.createElement('input');
	yInput.id = "namePlacementY";
	yInput.type = "number";
	yInput.step = 0.01;
	yInput.min = 0;
	yInput.value = y;
	yInput.onchange = function() { updateNamePlacementY(yInput, namePlacement); };
	inspector.appendChild(yInput);

	inspector.appendChild(document.createElement('br'));

	let colorLabel = document.createElement('label');
	colorLabel.for = "namePlacementColor";
	colorLabel.innerHTML = "Color:";
	colorLabel.classList.add('label-column');
	inspector.appendChild(colorLabel);

	let colorInput = document.createElement('input');
	colorInput.id = "namePlacementColor";
	colorInput.value = color;
	colorInput.onchange = function() { updateNamePlacementColor(colorInput, namePlacement); };
	inspector.appendChild(colorInput);

	inspector.appendChild(document.createElement('br'));

	let hideButton = document.createElement('input');
	hideButton.type = "button";
	hideButton.value = "Done";
	hideButton.onclick = function() { showPageInspector(); };
	inspector.appendChild(hideButton);

	let deleteButton = document.createElement('input');
	deleteButton.type = "button";
	deleteButton.value = "Remove";
	deleteButton.onclick = function() { removeNamePlacement(namePlacement); };
	inspector.appendChild(deleteButton);

	document.getElementById('preview-section').appendChild(inspector);
}

function updateNamePlacementSize(dataSource, namePlacement)
{
	namePlacement.style.fontSize = dataSource.value + "pt";
	namePlacement.setAttribute("data-size", dataSource.value);
}

function updateNamePlacementX(dataSource, namePlacement)
{
	namePlacement.style.left = dataSource.value + "in";
	namePlacement.setAttribute("data-x", dataSource.value);
}

function updateNamePlacementY(dataSource, namePlacement)
{
	namePlacement.style.top = dataSource.value + "in";
	namePlacement.setAttribute("data-y", dataSource.value);
}

function updateNamePlacementColor(dataSource, namePlacement)
{
	namePlacement.style.color = dataSource.value;
	namePlacement.setAttribute("data-color", dataSource.value);
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

	page = document.getElementById('page')
	let width = page.getAttribute("data-width");
	let height = page.getAttribute("data-height");

	let pdf = new jsPDF({
		orientation: 'portrait',
		unit: 'in',
		format: [width, height]
	});

	width = pdf.internal.pageSize.width;
	height = pdf.internal.pageSize.height;

	pdf.addImage(template, templateFileType, 0, 0, width, height);

	let namePlacements = document.getElementsByClassName("name-placement-preview");
	for (let i = 0; i < namePlacements.length; i++)
	{
		let namePlacement = namePlacements[i];
		let size = parseFloat(namePlacement.getAttribute('data-size'));
		let x = parseFloat(namePlacement.getAttribute('data-x'));
		let y = parseFloat(namePlacement.getAttribute('data-y'));
		let color = namePlacement.getAttribute('data-color')
		pdf.setFontSize(size);
		pdf.setTextColor(color);
		pdf.text(x, y, variantName);
	}

	let qrCodePlacements = document.getElementsByClassName("qr-code-preview");
	for (let i = 0; i < qrCodePlacements.length; i++)
	{
		let qrCodePlacement = qrCodePlacements[i];
		let size = parseFloat(qrCodePlacement.getAttribute('data-size'));
		let x = parseFloat(qrCodePlacement.getAttribute('data-x'));
		let y = parseFloat(qrCodePlacement.getAttribute('data-y'));
		pdf.addImage(qrcode, 'png', x, y, size, size);
	}

	let filename = variantName + '.pdf';
	pdf.save(filename);
}