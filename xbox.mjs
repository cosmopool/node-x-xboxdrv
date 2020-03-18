import * as child_process from 'child_process'
import coord from './config.mjs'

const spawn = child_process.spawn
const xboxdrv = spawn('xboxdrv', ['--no-uinput', '--detach-kernel-driver'])

let res = []

function xbox(data) {
	//console.log(`data: ${data.toString()}, ${data}`)

	// transform the data string to array
	//data.toString().data.split(":").join(" ").split(" ").forEach(x => { if (x != "") { res.push(x) } })
	data.toString()


	// function to pass the joystick coordinates to json object
	function toCoord(x, n) {
		coord[x] = Number(res[n + 1])
	}

	// loop every element of result array and call toCoord function
	res.forEach(x => {
		switch (x) {
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
	//return res
	return console.log(data.toString)
}

xboxdrv.stdout.on('data', (data) => {
	//console.log(`out: ${xbox(data)}`)
	console.log(`out: ${data}`)
})

xboxdrv.stderr.on('data', (data) => {
	console.log(`stderr: ${data}`);
});

console.log(`coord: ${coord}`)

xboxdrv.on('close', (code) => {
	console.log(`child process exited with code ${code}`);
});
