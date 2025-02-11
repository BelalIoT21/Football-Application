// Attach the function to the global `window` object
window.toggleMenu = function toggleMenu() {
    const menu = document.querySelector('.menu'); // Select the menu element
    const toggler = document.querySelector('.menu__toggler'); // Select the toggler element
    const menuText = document.getElementById('menuText'); // Select the menu text element
    const overlay = document.querySelector('.overlay'); // Select the overlay element
  
    // If the menu is currently active (open)
    if (menu.classList.contains('active')) {
      // Remove 'active' class from menu, toggler, and overlay
      menu.classList.remove('active');
      toggler.classList.remove('active');
      overlay.classList.remove('active');
      // Set text to 'Menu' when closing
      menuText.textContent = 'Menu';
      // Remove class to disable scrolling when overlay is active
      document.body.classList.remove('overlay-active');
    } else {
      // If the menu is not active (closed)
      // Add 'active' class to menu, toggler, and overlay
      menu.classList.add('active');
      toggler.classList.add('active');
      overlay.classList.add('active');
      // Set text to 'Close' when opening
      menuText.textContent = 'Close';
      // Add class to disable scrolling when overlay is active
      document.body.classList.add('overlay-active');
    }
  };  