{
	'use strict';
	
	/* init global variables */
	const activeNavColor = '#1d1d1f'; // same as css variable --grey--800
	let navbar; // the ul element inside the nav
	let navLine; // the underline for the active navigation item
	let content; // the div inside the content block, responsible to display local time

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
	function onResize() {
		const active = document.querySelector(".cm-navbar__list li.cm-navbar__item.active");
		if (active) {
			const { left, top } = active.getBoundingClientRect();
			navLine.style.left = `${left + window.scrollX}px`;
			navLine.style.top = `${top + window.scrollY + 1}px`;
		}
	};

	/* helper function to get local time for given city */
	function getCityTime(timeZone) {	
		/* format date and time using specified time zone */
		const options = {
			timeZone,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true, // set false to use 24-hour time format
			timeZoneName: 'long'
		};
	
		/* create a new Intl.DateTimeFormat object with the specified options */
		const formatter = new Intl.DateTimeFormat('en-US', options);
		const now = new Date();
		/* format current datetime */
		const timeString = formatter.format(now);
	
		return timeString;
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

		/* update content to show correct city and time */
		document.querySelectorAll('.cm-time-container__text').forEach((city) => {
			city.hidden = true;
			if (e.target.classList.contains(city.dataCity)) {
				city.removeAttribute('hidden');
				document.querySelector('.cm-time-container__city').innerHTML = `Local Time in ${city.label}`;
			}						
		});
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

			/* remove skeleton classes */
			if (navbar.classList.contains('cm-navbar__skeleton')) {
				navbar.classList.remove('cm-navbar__skeleton');
			}
			if (content.classList.contains('cm-time-container__skeleton')) {
				content.classList.remove('cm-time-container__skeleton');
				document.querySelector('.cm-time-container__city').removeAttribute('hidden');
			}

			/* append nav items to DOM */
			navItems.cities.forEach(item => {
				const listItem = document.createElement('li');
				listItem.className = 'cm-navbar__item';
				listItem.role = 'menuitem';

				const anchor = document.createElement('a');
				anchor.textContent = item.label;
				anchor.href = '#';
				anchor.className = `cm-navbar__link ${item.section}`;

				listItem.appendChild(anchor);
				navbar.appendChild(listItem);

				/* get all times for cities in navbar and append to DOM */
				const time = getCityTime(item.timeZone);
				const city = document.createElement('div');
				city.textContent = time;
				city.className = 'cm-time-container__text';
				city.dataCity = `${item.section}`;
				city.label = item.label;
				city.hidden = true;
				content.appendChild(city);
			});

			navbar.addEventListener('click', e => {
				if (e.target.classList.contains('cm-navbar__link')) {
					onNavbarClick(e);					
				}
			});

		} catch (error) {
			console.error('Error fetching or parsing navbar JSON:', error);
			/* remove skeleton classes */
			if (navbar.classList.contains('cm-navbar__skeleton')) {
				navbar.classList.remove('cm-navbar__skeleton');
			}
			navbar.querySelectorAll('.cm-navbar__error').forEach((item) => {
   			item.removeAttribute('hidden');
				item.removeAttribute('aria-hidden');
			});
			if (content.classList.contains('cm-time-container__skeleton')) {
				content.classList.remove('cm-time-container__skeleton');
			}
		}
	}


	/*	wait for DOM to be loaded before adding nav items	*/
	window.addEventListener('DOMContentLoaded', () => {
		navbar = document.getElementsByClassName('cm-navbar__list')[0];
		navLine = document.querySelector('.cm-navbar__underline');
		content = document.querySelector('.cm-time-container');

		createNavbar();
	});

}
