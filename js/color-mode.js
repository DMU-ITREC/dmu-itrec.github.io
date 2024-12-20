/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')
    const navbar = document.querySelector('.navbar');

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    navbar.classList.remove(theme === 'dark' ? 'bg-light' : 'bg-dark');
    navbar.classList.add(theme === 'dark' ? 'bg-dark' : 'bg-light');

    navbar.classList.remove(theme === 'dark' ? 'navbar-light' : 'navbar-dark');
    navbar.classList.add(theme === 'dark' ? 'navbar-dark' : 'navbar-light');

    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })

})()

// 导航栏按钮动画
document.addEventListener('click', function (e) {
  // Hamburger menu
  if (e.target.classList.contains('hamburger-toggle')) {
    e.target.children[0].classList.toggle('active');
  }
})


// width=1229

// const getWindowInfo = () => {
// 	const windowInfo = {
// 		width: window.innerWidth,
// 		hight: window.innerHeight
// 	}
// 	console.log(windowInfo);
// };
// window.addEventListener('resize', getWindowInfo);


// window.addEventListener('resize', function() {
//   let navbarItems = document.querySelectorAll('.navbar .nav-item');
//   let isMobile = window.innerWidth < 1229; // 或你自定义的断点

//   navbarItems.forEach(item => {
//       if (isMobile) {
//           console.log('Item is hidden on small screen: ', item);
//           // 执行相关操作，如添加特殊样式等
//       } else {
//           console.log('Item is visible on larger screen: ', item);
//           // 执行相关操作
//       }
//   });
// });

