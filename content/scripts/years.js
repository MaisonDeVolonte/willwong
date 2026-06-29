/*
========================================================================================
years.js: automatically calculate time periods so i don't have to
========================================================================================
- i wrote this so i never have to manually update "years" info on websites i maintain.
- years() looks for 'data-starting-year' attributes and calculates the current year gap.
- copyright() looks for a 'data-copyright-year' attribute and inserts the current year.
- should be pretty future-proof as i haven't had to change anything so...
*/

(function () {
  const currentYear = new Date().getFullYear();

  function years() {
    const startingYears = document.querySelectorAll('[data-starting-year]');
    if (startingYears.length === 0) {return;}

    startingYears.forEach(element => {
      const attr = element.getAttribute('data-starting-year');
      if (!attr) { return; }

      const startingYear = parseInt(attr, 10);
      if (isNaN(startingYear)) {return;}
      if (startingYear > currentYear) { return; }

      element.textContent = (currentYear - startingYear).toString();
    });
  }

  function copyright() {
    const copyrightYear = document.querySelector('[data-copyright-year]');
    if (copyrightYear) { copyrightYear.textContent = currentYear.toString(); }
  }

  years();
  copyright();
})();
