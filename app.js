// Selecting elements from the DOM
const header = document.querySelector('h1') // Select the first <h1> element
const app = document.getElementById('app') // Select the app element
const ddMenu = document.querySelector('#ddMenu') //Select the ddMenu element
const sandwitch = document.querySelectorAll('svg') //Select all svg elements
const html = document.documentElement //Select the html element

// Change the page theme mode: dark or light
const toggle = () => {
    html.classList.toggle('dark');
    updateThemeButton();
}


// Set the view based on menu item clicked
const setView = (v) => {
    header.innerText = v
    //toggleMenu(true)

    if (v === 'Calculator') {
        renderCalculator()
    } else if (v === 'About') {
        renderAbout()
    } else if (v === 'Contact') {
        renderContact()
    }
}

// Open and hide dropdown menu (original given function that uses constant svg)
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden')
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden')
        })
    } else {
        ddMenu.classList.add('hidden')
        document.querySelectorAll('svg')[0].classList.remove('hidden')
        document.querySelectorAll('svg')[1].classList.add('hidden')
    }
}

// Add a row element to the container with the given content
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`
    container.insertAdjacentHTML('beforeend', row)
}

// Add a monitor to the container with the given text
const addMonitor = (container, text) => {
    const t = text ?? ''
    const monitor = `<div id='monitor' class="bg-white border-4 dark:border-purple-400 border-blue-400 h-20 flex items-center col-span-5 dark:text-purple-800 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`
    container.insertAdjacentHTML('beforeend', monitor)
}

// Create a button with the given text
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : ''
    return `<div class='dark:bg-purple-600 bg-blue-400 dark:hover:bg-purple-900 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`
}

// Add the buttons to the container according to given numbers
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('')
    addRow(container, btnHTML)
}


// Action events for the buttons clicks in the calculator
const click = (event) => {
    const monitor = document.getElementById('monitor')
    const bac = monitor.innerText.trim()
    const a = event.target.innerText
    console.log(a)
    if (a === 'clear') {
        monitor.innerText = ''
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac)
    } else {
        monitor.innerText += a
    }
}

// Show the calculator view
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear']
    app.innerHTML = ''
    addMonitor(app)
    addButtons(app, labels)
    const buttons = document.querySelectorAll('.d-btn')
    buttons.forEach((el) => el.addEventListener('click', click))
}

// Show the about page view
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] dark:text-black flex items-center justify-center">Temp for About</div>'
}

//Show the contact page view
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] dark:text-black flex items-center justify-center">Temp for Contact</div>'
}

// Define an array of menu items for the application
const menuItems = [
    { name: 'Calculator', action: renderCalculator },
    { name: 'About', action: renderAbout },
    { name: 'Contact', action: renderContact }
];

//Create the menu list dynamicly
const createMenuList = () => {
    const menuList = document.createElement('ul');
    menuItems.forEach(item => {
        const menuItem = document.createElement('li');
        // Create button for each element in menu list
        const menuButton = document.createElement('button');
        menuButton.textContent = item.name;
        menuButton.addEventListener('click', () => { setView(item.name); });

        menuItem.appendChild(menuButton);
        menuList.appendChild(menuItem);
    });
    return menuList;
}

// Create the Hamburger SVG
const createHamburgerSVG = () => {
    const svgNS = "http://www.w3.org/2000/svg";
    // Creates an SVG element
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("height", "1.5em");
    svg.setAttribute("viewBox", "0 0 448 512");
    // Creates a path element for the SVG
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("fill", "#ffffff");
    path.setAttribute("d", "M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z");
    
    svg.appendChild(path);
    return svg;
}

// Open dropdown menu for small screens
const openDropDownMenu = () => {
    const ddMenu = document.getElementById('ddMenu');
    ddMenu.classList.remove('hidden');
    ddMenu.innerHTML = '';
    ddMenu.className = 'dark:bg-purple-300 bg-blue-300 p-4 w-full absolute top-[56px] left-0';
    // Creates the menu list for dropdown menu
    ddMenuList = createMenuList();
    ddMenu.appendChild(ddMenuList);
    ddMenuList.className = 'block py-1 px-2 text-black text-xl p-4';
}

// Close dropdown menu for small screens
const closeDropDownMenu = (menuList) => {
    const ddMenu = document.getElementById('ddMenu');
    ddMenu.classList.add('hidden');
}

// Show the menu on top of the page
const renderMenu = () => {
    const menuContainer = document.getElementById('top-menu');
    menuContainer.className = 'bg-blue-700 dark:bg-purple-900 text-white text-xl p-4 flex justify-between';
    //create normal menu view
    const menuList = createMenuList();
    menuList.className = 'justify-start gap-4 hidden sm:flex';

    //create hamburger menu view
    hamburgerMenuButton = document.createElement('button');
    const hamburgerSVG = createHamburgerSVG();
    hamburgerMenuButton.appendChild(hamburgerSVG);
    hamburgerMenuButton.className = 'sm:hidden';
    hamburgerMenuButton.addEventListener('click', () => {
        if (ddMenu.classList.contains('hidden')) {
            openDropDownMenu();
        } else {
            closeDropDownMenu();
        }
    });

    menuContainer.appendChild(hamburgerMenuButton);
    menuContainer.appendChild(menuList);
}

// Creates and appends the theme toggle button to the menu container
const renderThemeToggle = () => {
    const menuContainer = document.getElementById('top-menu');
    const themeToggleContainer = document.createElement('div');
    themeToggleContainer.className = 'ml-auto';
    const themeButton = document.createElement('button');
    
    themeButton.id = 'theme-button';
    themeButton.addEventListener('click', toggle);

    themeToggleContainer.appendChild(themeButton);
    menuContainer.appendChild(themeToggleContainer);
    updateThemeButton();
}

// Update the theme toggle button text based on current theme
const updateThemeButton = () => {
    const themeButton = document.getElementById('theme-button');
    if (html.classList.contains('dark')) {
        themeButton.textContent = "Light mode";
    } else {
        themeButton.textContent = "Dark mode";
    }
};



renderMenu()
renderThemeToggle()
renderCalculator()
