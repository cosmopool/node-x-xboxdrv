import * as child_process from 'child_process'
import coordinates from './config.mjs'

const spawn = child_process.spawn

export default function xbox() {

	// function to pass coordinates on arr to json object
	function toCoord(newCoord, originalCoord) {
		//coordinate index
		let index = resultArr.indexOf(originalCoord)

		//value is the next element of coordinate index
		let value = Number(resultArr[index + 1])

		//deadzone implementation
		if (newCoord === 'leftX' || newCoord === 'leftY' || newCoord === 'rightX' || newCoord === 'rightY') {
			//modifies the axis range
			//console.log(`coord: ${newCoord}, value: ${value}, newValue: ${newRange(value)}`)
			value = newRange(value)

			if (value < deadzone && value > -deadzone) {
				value = 0
			}
		}

		//pass coordinate and value to object
		coordinates[newCoord] = value
	}

	function newRange (oldValue) {
		let oldMax = 32767
		let oldMin = -32768
		let newMax = 255
		let newMin = -255
		let oldRange = (oldMax - oldMin)
		let newRange = (newMax - newMin)
		let newValue = (((oldValue - oldMin) * newRange) / oldRange) + newMin

		return Math.round(newValue)
	}

	const xboxdrv = spawn('xboxdrv', ['--no-uinput', '--detach-kernel-driver'])
	const deadzone = 50

	let resultArr = []
	let prevCoordinates = {}
	let jsonCoord

	function dataToCoordinates(data){

		//clean the result array to not accumulate old values
		resultArr = []

		//data to string
		let dataString = data.toString()

		// transform data to array
		dataString.split(":").join(" ").split(" ").forEach(x => { if (x != "") { resultArr.push(x) } })

		// pass old and new coordinates to toCoord function
		resultArr.forEach(x => {
			switch (x) {
				case 'X1': toCoord('leftX', x); break;
				case 'Y1': toCoord('leftY', x); break;
				case 'X2': toCoord('rightX', x); break;
				case 'Y2': toCoord('rightY', x); break;
				case 'LT': toCoord('leftT', x); break;
				case 'RT': toCoord('rightT', x); break;
				case 'A': toCoord('a', x); break;
				case 'B': toCoord('b', x); break;
				case 'X': toCoord('x', x); break;
				case 'Y': toCoord('y', x); break;
					//we do not need deafult case
				default: ; break;
			}
		})

		if (JSON.stringify(coordinates) === prevCoordinates){
			return 0
		} else {
			prevCoordinates = JSON.stringify(coordinates)
			jsonCoord = JSON.stringify(coordinates)
			//console.log(`${JSON.stringify(coordinates)}`)
			//return JSON.stringify(coordinates)
		}
	}

	xboxdrv.stdout.on('data', dataToCoordinates.bind(this))

	xboxdrv.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`)
	})

	xboxdrv.on('close', (code) => {
		console.log(`child process exited with code ${code}`)
	})
}

xbox.prototype.all = () => {
	return JSON.stringify(coordinates)
}


xbox.prototype.print = () => {
	console.log(`test PRINTTTTTT`)
	//console.log(jsonCoord)
	//return console.log(this.jsonCoord)
	//xbox.prototype.call()
}
//xbox().print()
