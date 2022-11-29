enum Methods {
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE"
}

interface IOptions {
	data: Record<string, string>,
	headers?: Record<string, string>,
	timeout?: number
}

function queryStringify(data: Record<string, string>) {
	const entries = Object.entries(data).reduce(
		([key, val]) => (`${key}=${val}&`),
		"?"
	);
	return entries;
}

export default class Request {
	get = (url: string, options: IOptions) => {
		const queryUrl = options.data ? `${url}${queryStringify(options.data)}` : url;
		console.log(queryUrl);
		return this.request(
			queryUrl,
			{ ...options, method: Methods.GET }
		);
	};

	put = (url: string, options: IOptions) => this.request(
		url,
		{ ...options, method: Methods.PUT }
	);

	post = (url: string, options: IOptions) => this.request(
		url,
		{ ...options, method: Methods.POST }
	);

	delete = (url: string, options: IOptions) => this.request(
		url,
		{ ...options, method: Methods.DELETE }
	);

	// options:
	// headers — obj
	// data — obj
	request = (url: string, options: IOptions & { method: Methods }) => {
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

			if (options.method === Methods.GET || !options.data) { xhr.send(); } else
			// @ts-ignore
			{ xhr.send(options.data); }
		});
	};
}
