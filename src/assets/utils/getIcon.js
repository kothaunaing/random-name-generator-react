/** @format */

import menu from '../images/menu.svg';
import up from '../images/up.svg';
import down from '../images/down.svg';
import copy from '../images/copy.svg';
import copied from '../images/copied.svg';
import add from '../images/add.svg';
import added from '../images/added.svg';
import home from '../images/home.svg';
import favourite from '../images/favourite.svg';
import setting from '../images/setting.svg';
import deleteIcon from '../images/delete.svg';
import plus from '../images/plus.svg';
import edit from '../images/edit.svg';
import back from '../images/back.svg';
import save from '../images/save.svg';
import cancel from '../images/cancel.svg';

const icons = {
  menu,
  up,
  down,
  copy,
  copied,
  add,
  added,
  home,
  favourite,
  setting,
  deleteIcon,
  plus,
  edit,
  back,
  save,
  cancel,
};

function getIcon(name) {
  return icons[name] || null;
}

export default getIcon;
