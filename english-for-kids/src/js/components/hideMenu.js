export default function hideMenu() {
  const isMenuOpened = document.querySelector('.menu__toggler').checked;

  if (isMenuOpened) {
    document.querySelector('.menu__toggler').checked = false;
  }
}
