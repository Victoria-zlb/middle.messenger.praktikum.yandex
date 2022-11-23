enum METHODS {
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE"
}

function queryStringify(data: Record<string, string>) {
	const entries = Object.entries(data).map(
		([key, val]) => (`${key}=${val}`)
	);
	return `?${entries.join("&")}`;
}

export default class Request {
	get = (url: string, options: { data: Record<string, string>, timeout: number }) => {
		const queryUrl = options.data ? `${url}${queryStringify(options.data)}` : url;
		console.log(queryUrl);
		return this.request(
			queryUrl,
			{ ...options, method: METHODS.GET }
		);
	};

	put = (url: string, options: { data: Record<string, string>, timeout: number }) => this.request(
		url,
		{ ...options, method: METHODS.PUT }
	);

	post = (url: string, options: { data: Record<string, string>, timeout: number }) => this.request(
		url,
		{ ...options, method: METHODS.POST }
	);

	delete = (url: string, options: { data: Record<string, string>, timeout: number }) => this.request(
		url,
		{ ...options, method: METHODS.DELETE }
	);

	// options:
	// headers — obj
	// data — obj
	request = (url: string, options: { method: METHODS, data: Record<string, string>, headers?: Record<string, string>, timeout?: number }) => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(options.method, url);

			if (options.headers) {
				Object.entries(options.headers).forEach(
					([key, val]) => xhr.setRequestHeader(key, val)
				);
			}

			xhr.onload = () => resolve(xhr);
			xhr.onabort = () => reject("Aborted");
			xhr.onerror = () => reject("Error occured");
			xhr.timeout = options.timeout || 5000;
			xhr.ontimeout = () => reject("Timeout occured");

			if (options.method === METHODS.GET || !options.data) { xhr.send(); } else
			// @ts-ignore // eslint-disable-line
			{ xhr.send(options.data); }
		});
	};
}
