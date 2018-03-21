import {notification} from 'antd'

export default fileObj => {
	if (!fileObj.file) return null

	const reader = new FileReader()
	reader.readAsText(fileObj.file)
	reader.onload = () => reader.result
	reader.onerror = error => {
		const config = {
			description: `File Upload error`,
			duration: null,
			message: `${error}`,
			placement: `topLeft`
		}

		notification[`error`](config)

		return null
	}
}