const data = "X1: -9588 Y1:  -728  X2: -6336 Y2:  6516  du:0 dd:0 dl:0 dr:0  back:0 guide:0 start:0  TL:0 TR:0  A:0 B:0 X:0 Y:0  LB:0 RB:0  LT:  0 RT:  0"

// coordinates json object
let coord = {
	leftX: 0,
	leftY: 0,
	rightX: 0,
	rightY: 0,
	lt: 0,
	rt: 0,
	a: 0,
	b: 0,
	x: 0,
	y: 0
}

// creates result array
let res = []

// transform the data string to array
data.split(":").join(" ").split(" ").forEach(x => {if (x != "") {res.push(x)}})

// function to pass the joystick coordinates to json object
function toCoord(x, n){
	coord[x] = Number(res[n+1])
}

// loop every element of result array and call toCoord function
res.forEach(x => {
	switch (x){
		case 'X1': toCoord("leftX", res.indexOf(x)); break;
		case 'Y1': toCoord("leftY", res.indexOf(x)); break;
		case 'X2': toCoord("rightX", res.indexOf(x)); break;
		case 'Y2': toCoord("rightY", res.indexOf(x)); break;
		case 'lt': toCoord("lt", res.indexOf(x)); break;
		case 'rt': toCoord("rt", res.indexOf(x)); break;
		case 'a': toCoord("a", res.indexOf(x)); break;
		case 'b': toCoord("b", res.indexOf(x)); break;
		case 'x': toCoord("x", res.indexOf(x)); break;
		case 'y': toCoord("y", res.indexOf(x)); break;
	}
})
