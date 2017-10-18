export const qs  = (query, el = document) => {
	return el.querySelector(query);
}

export const qsAll  = (query, el = document) => {
	return el.querySelectorAll(query);
}