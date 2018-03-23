import {notification} from 'antd'

const readTextFilePromise = fileObj => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsText(fileObj.file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = error => reject(error)
	})
}

// const readDataURLPromise = fileObj => {
// 	return new Promise((resolve, reject) => {
// 		const reader = new FileReader()
// 		reader.readAsDataURL(fileObj)
// 		reader.onload = () => resolve(reader.result)
// 		reader.onerror = error => reject(error)
// 	})
// }

const errorHandler = error => {
	const config = {
		description: `File Upload error`,
		duration: null,
		message: `${error}`,
		placement: `topLeft`
	}

	notification[`error`](config)

	return null
}

export const readLocalTextFile = fileObj => {
	if (!`file` in fileObj) return ``

	return readTextFilePromise(fileObj)
		.then(result => result)
		.catch(errorHandler)
}

// export const readDataURLFile = fileObj => {
// 	// if (!`file` in fileObj) return ``

// 	return readDataURLPromise(fileObj)
// 		.then(result => result)
// 		.catch(errorHandler)
// }