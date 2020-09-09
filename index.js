module.exports=function(e){var n={};function r(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)r.d(t,i,function(n){return e[n]}.bind(null,i));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="/",r(r.s=2)}([function(e,n){e.exports=require("react")},function(e,n,r){"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var r=function(e,n){var r=e[1]||"",t=e[3];if(!t)return r;if(n&&"function"==typeof btoa){var i=(o=t,c=btoa(unescape(encodeURIComponent(JSON.stringify(o)))),u="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(u," */")),a=t.sources.map((function(e){return"/*# sourceURL=".concat(t.sourceRoot||"").concat(e," */")}));return[r].concat(a).concat([i]).join("\n")}var o,c,u;return[r].join("\n")}(n,e);return n[2]?"@media ".concat(n[2]," {").concat(r,"}"):r})).join("")},n.i=function(e,r,t){"string"==typeof e&&(e=[[null,e,""]]);var i={};if(t)for(var a=0;a<this.length;a++){var o=this[a][0];null!=o&&(i[o]=!0)}for(var c=0;c<e.length;c++){var u=[].concat(e[c]);t&&i[u[0]]||(r&&(u[2]?u[2]="".concat(r," and ").concat(u[2]):u[2]=r),n.push(u))}},n}},function(e,n,r){"use strict";r.r(n),r.d(n,"MenuBar",(function(){return b})),r.d(n,"Menu",(function(){return g})),r.d(n,"MenuBranch",(function(){return h})),r.d(n,"MenuItem",(function(){return y}));var t=r(0),i=r.n(t);r(3);function a(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function o(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?a(Object(r),!0).forEach((function(n){c(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function c(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function u(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],t=!0,i=!1,a=void 0;try{for(var o,c=e[Symbol.iterator]();!(t=(o=c.next()).done)&&(r.push(o.value),!n||r.length!==n);t=!0);}catch(e){i=!0,a=e}finally{try{t||null==c.return||c.return()}finally{if(i)throw a}}return r}(e,n)||function(e,n){if(!e)return;if("string"==typeof e)return l(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}var s=i.a.createContext(),d={menuIsActive:!1,menuIsDisabled:!1,activeMenu:null,activeMenuBranch:null,colors:{primary:"#303030",secondary:"#444444",terciary:"#555555"},size:"medium"},f=function(e){return e.toLowerCase()in["small","medium","large"]?e.toLowerCase():"medium"},m=function(e){return e&&"size"in e&&(e.size=f(e.size)),e};function p(e){var n=e.overrideInit,r=e.children,a=u(Object(t.useState)(o(o({},d),m(n))),2),c=a[0],l=a[1],p={setMenuIsActive:function(e){return l((function(n){return o(o({},n),{},{menuIsActive:e})}))},setMenuIsDisabled:function(e){return l((function(n){return o(o({},n),{},{menuIsDisabled:e})}))},setActiveMenu:function(e){return l((function(n){return o(o({},n),{},{activeMenu:e})}))},setActiveMenuBranch:function(e){return l((function(n){return o(o({},n),{},{activeMenuBranch:e})}))},setColors:function(e){return l((function(n){return o(o({},n),{},{colors:o(o({},n.colors),e)})}))},setSize:function(e){return l((function(n){return o(o({},n),{},{size:f(e)})}))},resetMenu:function(){return l(o(o({},d),m(n)))}};return i.a.createElement(s.Provider,{value:o(o({},c),p)},i.a.createElement(v,null,r))}function b(e){var n=e.colors,r=e.children,t=e.disabled,a=void 0!==t&&t;return i.a.createElement(p,{overrideInit:n},i.a.createElement(v,{disabled:a},r))}function v(e){var n=e.children,r=e.disabled,a=Object(t.useContext)(s),o=a.menuIsActive,c=a.setMenuIsActive,u=a.setMenuIsDisabled,l=a.colors,d=a.size,f=Object(t.useCallback)((function(){o&&c(!1)}),[o,c]);return Object(t.useEffect)((function(){return window.addEventListener("click",f),function(){window.removeEventListener("click",f)}}),[f]),Object(t.useEffect)((function(){u(r)}),[r]),i.a.createElement("div",{className:"menu-group ".concat(d),style:{background:l.primary},onClick:function(e){e.stopPropagation(),c(!o)}},n)}function g(e){var n=e.id,r=e.label,a=e.children,o=Object(t.useContext)(s),c=o.menuIsActive,u=o.activeMenu,l=o.setActiveMenu,d=o.colors,f=o.size,m=u===n;return i.a.createElement("div",{className:"menu",style:{background:c&&m?d.secondary:d.primary}},i.a.createElement("div",{className:"menu-label ".concat(f),style:{background:d.secondary},onMouseOver:function(){l(n)}},i.a.createElement("p",null,r)),c&&m&&i.a.createElement("div",{className:"menu-panel ".concat(f),style:{background:d.secondary}},a))}function h(e){var n,r=e.id,a=e.label,o=e.children,c=Object(t.useContext)(s),l=c.colors,d=c.size,f=c.activeMenuBranch,m=c.setActiveMenuBranch,p=u(Object(t.useState)(!1),2),b=p[0],v=p[1],g=u(Object(t.useState)(!1),2),h=g[0],y=g[1];return Object(t.useEffect)((function(){b&&f!==r&&v(!1)}),[r,b,f]),i.a.createElement("div",{className:"menu-branch",onMouseEnter:function(){n=setTimeout((function(){v(!0),m(r)}),500)},onMouseLeave:function(){clearTimeout(n)},onClick:function(e){clearTimeout(n),v(!0),m(r),e.stopPropagation()}},i.a.createElement("div",{className:"menu-item ".concat(d),style:{background:h?l.terciary:"none"}},i.a.createElement("p",{className:"menu-item-section ".concat(d)},a),i.a.createElement("p",{className:"menu-item-section ".concat(d)},">")),b&&i.a.createElement("div",{className:"menu-branch-panel ".concat(d),onMouseEnter:function(){y(!0)},onMouseLeave:function(){y(!1)},style:{background:l.secondary}},o))}function y(e){var n=e.onClick,r=void 0===n?null:n,a=e.disabled,o=void 0!==a&&a,c=e.label,u=e.hotkey,l=e.children,d=Object(t.useContext)(s),f=d.menuIsDisabled,m=d.colors,p=d.size,b=d.resetMenu;return i.a.createElement("div",{className:"menu-item ".concat(p),style:{background:o||f?"none":m.terciary},onClick:function(e){return o||f?e.stopPropagation():(b(),r(e))}},l?i.a.createElement("p",{className:"menu-item-section ".concat(p)},l):i.a.createElement(i.a.Fragment,null,i.a.createElement("p",{className:"menu-item-section ".concat(p)},c),i.a.createElement("p",{className:"menu-item-section ".concat(p)},u)))}},function(e,n,r){var t=r(4),i=r(5);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var a={insert:"head",singleton:!1};t(i,a);e.exports=i.locals||{}},function(e,n,r){"use strict";var t,i=function(){return void 0===t&&(t=Boolean(window&&document&&document.all&&!window.atob)),t},a=function(){var e={};return function(n){if(void 0===e[n]){var r=document.querySelector(n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}e[n]=r}return e[n]}}(),o=[];function c(e){for(var n=-1,r=0;r<o.length;r++)if(o[r].identifier===e){n=r;break}return n}function u(e,n){for(var r={},t=[],i=0;i<e.length;i++){var a=e[i],u=n.base?a[0]+n.base:a[0],l=r[u]||0,s="".concat(u," ").concat(l);r[u]=l+1;var d=c(s),f={css:a[1],media:a[2],sourceMap:a[3]};-1!==d?(o[d].references++,o[d].updater(f)):o.push({identifier:s,updater:v(f,n),references:1}),t.push(s)}return t}function l(e){var n=document.createElement("style"),t=e.attributes||{};if(void 0===t.nonce){var i=r.nc;i&&(t.nonce=i)}if(Object.keys(t).forEach((function(e){n.setAttribute(e,t[e])})),"function"==typeof e.insert)e.insert(n);else{var o=a(e.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}return n}var s,d=(s=[],function(e,n){return s[e]=n,s.filter(Boolean).join("\n")});function f(e,n,r,t){var i=r?"":t.media?"@media ".concat(t.media," {").concat(t.css,"}"):t.css;if(e.styleSheet)e.styleSheet.cssText=d(n,i);else{var a=document.createTextNode(i),o=e.childNodes;o[n]&&e.removeChild(o[n]),o.length?e.insertBefore(a,o[n]):e.appendChild(a)}}function m(e,n,r){var t=r.css,i=r.media,a=r.sourceMap;if(i?e.setAttribute("media",i):e.removeAttribute("media"),a&&btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}var p=null,b=0;function v(e,n){var r,t,i;if(n.singleton){var a=b++;r=p||(p=l(n)),t=f.bind(null,r,a,!1),i=f.bind(null,r,a,!0)}else r=l(n),t=m.bind(null,r,n),i=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(r)};return t(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;t(e=n)}else i()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=i());var r=u(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var t=0;t<r.length;t++){var i=c(r[t]);o[i].references--}for(var a=u(e,n),l=0;l<r.length;l++){var s=c(r[l]);0===o[s].references&&(o[s].updater(),o.splice(s,1))}r=a}}}},function(e,n,r){"use strict";r.r(n);var t=r(1),i=r.n(t)()(!1);i.push([e.i,".menu-group{\r\n  display: flex;\r\n  height: 100%;\r\n  justify-content: flex-start;\r\n  align-items: flex-end;\r\n  overflow: visible;\r\n  user-select: none;\r\n}\r\n\r\n.menu-group.small {\r\n  font-size: .72rem;\r\n}\r\n\r\n.menu-group.medium {\r\n  font-size: .9rem;\r\n}\r\n\r\n.menu-group.large {\r\n  font-size: 1.08rem;\r\n}\r\n  \r\n.menu-item {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  white-space: nowrap;\r\n}\r\n\r\n.menu-item.disabled {\r\n  color: grey;\r\n}\r\n\r\n.menu-item.small {\r\n  padding: 5.6px 3.2px;\r\n}\r\n\r\n.menu-item.medium {\r\n  padding: 7px 4px;\r\n}\r\n\r\n.menu-item.large {\r\n  padding: 8.4px 4.8px;\r\n}\r\n\r\n.menu {\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.menu-panel {\r\n  position: absolute;\r\n}\r\n\r\n.menu-panel.small {\r\n  padding: 3.2px 0;\r\n}\r\n\r\n.menu-panel.medium {\r\n  padding: 4px 0;\r\n}\r\n\r\n.menu-panel.large {\r\n  padding: 4.8px 0;\r\n}\r\n\r\n.menu-label {\r\n  display: flex;\r\n  align-items: flex-end;\r\n  height: 100%;\r\n}\r\n\r\n.menu-label:hover, .menu-item:hover {\r\n  filter: brightness(75%);\r\n}\r\n\r\n.menu-item.disabled:hover {\r\n  filter: none;\r\n}\r\n\r\n.menu-label p.small {\r\n  padding: 8px 6.4px 4.8px;\r\n}\r\n\r\n.menu-label p.medium {\r\n  padding: 10px 8px 6px;\r\n}\r\n\r\n.menu-label p.large {\r\n  padding: 12px 9.6px 7.2px;\r\n}\r\n\r\n.menu-branch {\r\n  position: relative;\r\n}\r\n\r\n.menu-branch-panel {\r\n  position: absolute;\r\n  width: auto;\r\n  left: 100%;\r\n}\r\n\r\n.menu-branch-panel.small {\r\n  top: -3.2px;\r\n  padding: 3.2px 0;\r\n}\r\n\r\n.menu-branch-panel.medium {\r\n  top: -4px;\r\n  padding: 4px 0;\r\n}\r\n\r\n.menu-branch-panel.large {\r\n  top: -4.8px;\r\n  padding: 4.8px 0;\r\n}\r\n\r\n.menu-item-section.small:first-child {\r\n  padding-left: 12.8px;\r\n  padding-right: 25.6px;\r\n}\r\n\r\n.menu-item-section.medium:first-child {\r\n  padding-left: 16px;\r\n  padding-right: 32px;\r\n}\r\n\r\n.menu-item-section.large:first-child {\r\n  padding-left: 19.2px;\r\n  padding-right: 38.4px;\r\n}\r\n\r\n.menu-item-section.small:last-child {\r\n  padding-right: 12.8px;\r\n}\r\n\r\n.menu-item-section.medium:last-child {\r\n  padding-right: 16px;\r\n}\r\n\r\n.menu-item-section.large:last-child {\r\n  padding-right: 19.2px;\r\n}",""]),n.default=i}]);