class Page {
	constructor(title, html) {
		this.title = title;
		this.html = html;
	}

	setTitle() {
		document.title = this.title;
	}

	async renderHTML() {
		return this.html;
	}
}

export { Page };
