const moment = require('moment');
const { Session } = require('../../../model');

function isDateWithinAvailableHours(givenDate, availableHours) {
	// Step 1:Parse the given date string to a Moment.js object

	const dateToCheck = moment(givenDate);
	const dateOnly = dateToCheck.format('YYYY-MM-DD');

	// Step 2: Parse the date and time strings from availableHours

	const fromDate = moment(availableHours.fromDate);
	const toDate = moment(availableHours.toDate);

	const fromTime = moment(
		`${dateOnly}T${availableHours.fromTime}`,
		'YYYY-MM-DDTHH:mm'
	);
	const toTime = moment(
		`${dateOnly}${availableHours.toTime}`,
		'YYYY-MM-DDTHH:mm'
	);

	const dayOfWeek = dateToCheck.day().toString();

	// console.log({
	// 	dateToCheck,
	// 	dateOnly,
	// 	fromDate,
	// 	toDate,
	// 	fromTime,
	// 	toTime,
	// 	dayOfWeek,
	// });

	// Step 3: Check if the given date is within the date range
	if (dateToCheck.isBetween(fromDate, toDate, null, '[]')) {
		// console.log('date is alright');
		// Step 4: Check if the time is within the working hours range
		if (dateToCheck.isBetween(fromTime, toTime, null, '[]')) {
			// console.log('time is okay');
			// Step 5: Check if the day of the week is included in daysOfWork array

			if (availableHours.daysOfWork.includes(dayOfWeek)) {
				// console.log('days are good all is good');
				return true;
			}
		}
	}
	// console.log('all is wrong');
	return false;
}

function isSessionValid(start, end, availableHours) {
	// console.log(start, end, availableHours);
	return (
		isDateWithinAvailableHours(start, availableHours) &&
		isDateWithinAvailableHours(end, availableHours)
	);
}

function isSessionTimeBooked(givenDate, availableHours) {
	const fromTime = moment(
		`${dateOnly}T${availableHours.fromTime}`,
		'YYYY-MM-DDTHH:mm'
	);
	const toTime = moment(
		`${dateOnly}${availableHours.toTime}`,
		'YYYY-MM-DDTHH:mm'
	);
}

module.exports = {
	isDateWithinAvailableHours,
	isSessionValid,
};

// const givenTime = '2023-08-21T11:30:00.000Z'; // Replace with the given time in the format "yyyy-mm-ddThh:mm:000Z"

// const availableHours = {
// 	// Assuming Monday to Friday are working days (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
// 	daysOfWork: [0, 1, 2, 3, 4, 5],
// 	fromTime: '08:00', // Working hours start from 8:00 AM
// 	toTime: '17:00', // Working hours end at 5:00 PM
// 	fromDate: '2023-07-20', // Available from July 20, 2023
// 	toDate: '2023-07-30', // Available until July 30, 2023
// };

// const givenDate = '2023-07-25T13:30:00'; // July 25, 2023, 1:30 PM
// const end = '2023-07-25T14:30:00'; //

// console.log(isSessionValid(givenDate, end, availableHours));
// console.log(moment().startOf('isoWeek').add(-1, 'day'));
