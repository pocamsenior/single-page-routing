'use strict';
import * as view from '../views/index';
import * as dom from '../components/dom';
import { Page } from '../classes/Page';

const routes = [
	{ path: '/', view: view.page00 },
	{ path: '/page01', view: view.page01 },
	{ path: '/page02', view: view.page02 },
	{ path: '/page03', view: view.page03 },
];

const findActivePath = function (routes) {
	const testPath = routes.map(route => {
		return {
			route,
			isMatch: location.pathname == route.path,
		};
	});

	let activePath = testPath.find(path => path.isMatch);
	if (!activePath) activePath = testPath[0];

	return activePath;
};

const buildActivePage = async function (activePage) {
	const view = activePage.route.view;
	const page = new Page(view.title, view.html);
	page.setTitle();
	dom.main.app.innerHTML = await page.renderHTML();
};

const router = async function () {
	const activePath = findActivePath(routes);
	await buildActivePage(activePath);
};

const navigateToActivePath = function (url) {
	history.pushState(null, '', url);
	router();
};
const navigationHandler = function () {
	document.addEventListener('DOMContentLoaded', () => {
		router();
		document.body.addEventListener('click', e => {
			if (e.target.closest('[data-nav]')) {
				e.preventDefault();
				navigateToActivePath(e.target.closest('[data-nav]').href);
			}
		});

		window.addEventListener('popstate', router);
	});
};

export { navigationHandler };
