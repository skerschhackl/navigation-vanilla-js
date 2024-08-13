{
	'use strict';
	
	/* init global variables */
	const activeNavColor = '#1d1d1f'; // same as css variable --grey--800
	let navbar; 
	let navLine; 

	/* Debounce function to limit the rate at which a function can fire */
	const debounce = (func, wait) => {
		let timeout;
		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, args), wait);
			};
	};
	/* resize event listener to update position of underline */
	window.addEventListener("resize", debounce(onResize, 100));
	function onResize(){
		const active = document.querySelector(".cm-navbar__list li.cm-navbar__item.active");
		if (active) {
			const { left, top } = active.getBoundingClientRect();
			navLine.style.left = `${left + window.scrollX}px`;
			navLine.style.top = `${top + window.scrollY + 1}px`;
		}
	}

	/* onClick function for navbar */
	const onNavbarClick = e => {
		e.preventDefault();
		const { target } = e;
		const parent = target.parentNode;
		
		/* return if clicked link is already active */
		if (parent.classList.contains('active')) return;
	
		/* remove 'active' class from all active links */
		document.querySelectorAll('.cm-navbar__item.active').forEach(link => {
			link.classList.remove('active');
		});
		/* add 'active' class to clicked link */
		parent.classList.add('active');

		const { width, height, left, top } = e.target.getBoundingClientRect();
		navLine.style.cssText = `
			width: ${width}px;
			height: ${height}px;
			left: ${left + window.scrollX}px;
			top: ${top + window.scrollY + 1}px;
			border-color: ${activeNavColor};
			transform: none;
			z-index: 2;
		`;
	}

	/*
		load JSON, build navbar list items and add to DOM
		attach event listener for onClick 
	*/
	async function createNavbar() {
		try {
			const response = await fetch('./files/navigation.json');
			if (!response.ok) {
				/* 
					Todo: discuss how we handle errros here
					for now I decided to just console log 
				*/
				// throw new Error(`There was an HTTP error! status: ${response.status}`);
				console.error(`There was an HTTP error! status: ${response.status}`);
			}

			const navItems = await response.json();

			/* remove skeleton class */
			if (navbar.classList.contains('cm-navbar__skeleton')) {
				navbar.classList.remove('cm-navbar__skeleton');
			}

			navItems.cities.forEach(item => {
				const listItem = document.createElement('li');
				listItem.className = 'cm-navbar__item';
				listItem.role = 'menuitem';

				const anchor = document.createElement('a');
				anchor.textContent = item.label;
				anchor.href = `#${item.section}`;
				anchor.className = 'cm-navbar__link';

				listItem.appendChild(anchor);
				navbar.appendChild(listItem);
			});

			navbar.addEventListener('click', e => {
				if (e.target.classList.contains('cm-navbar__link')) {
					onNavbarClick(e);
				}
			});

		} catch (error) {
			console.error('Error fetching or parsing navbar JSON:', error);
			/* remove skeleton class */
			if (navbar.classList.contains('cm-navbar__skeleton')) {
				navbar.classList.remove('cm-navbar__skeleton');
			}
			navbar.querySelectorAll('.cm-navbar__error').forEach((item) => {
   			item.removeAttribute('hidden');
				item.removeAttribute('aria-hidden');
			});
		}
	}


	/*	wait for DOM to be loaded before adding nav items	*/
	window.addEventListener('DOMContentLoaded', () => {
		navbar = document.getElementsByClassName('cm-navbar__list')[0];
		navLine = document.querySelector('.cm-navbar__underline');

		createNavbar();
	});

}