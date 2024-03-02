
import moment from "moment";


export default {
		ifequal(a, b, options) {
		if (a == b) {
			return options.fn(this)
		}
		return options.inverse(this)

	},
	getFulName(firstName, lastName) {
		return firstName.charAt(0) + lastName.charAt(0)
	},
	FormatDate(date) {
		return moment(date).format('DD MMM, YYYY')
	},
}