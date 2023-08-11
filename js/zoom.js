let zoom = 0.5;

function zoomIn()
{
	zoom += .05;
	document.getElementById("page").style.zoom = zoom;
}

function zoomOut()
{
	zoom -= .05;
	document.getElementById("page").style.zoom = zoom;
}