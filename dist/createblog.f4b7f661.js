webpackJsonp([6],{251:function(e,t,n){"use strict";function o(e,t){if(!e||!e.length)throw new Error("react-modal: No elements were found for selector "+t+".")}function r(e){var t=e;if("string"==typeof t){var n=document.querySelectorAll(t);o(n,t),t="length"in n?n[0]:n}return d=t||d}function a(){return!(!document||!document.body)&&(r(document.body),!0)}function l(e){if(!e&&!d&&!a())throw new Error(["react-modal: Cannot fallback to `document.body`, because it's not ready or available.","If you are doing server-side rendering, use this function to defined an element.","`Modal.setAppElement(el)` to make this accessible"])}function s(e){l(e),(e||d).setAttribute("aria-hidden","true")}function i(e){l(e),(e||d).removeAttribute("aria-hidden")}function u(){d=null}function c(){d=document.body}Object.defineProperty(t,"__esModule",{value:!0}),t.assertNodeList=o,t.setElement=r,t.tryForceFallback=a,t.validateElement=l,t.hide=s,t.show=i,t.documentNotReadyOrSSRTesting=u,t.resetForTesting=c;var d=null},252:function(e,t,n){"use strict";function o(){return s}function r(e){return s[e]||(s[e]=0),s[e]+=1,e}function a(e){return s[e]&&(s[e]-=1),e}function l(){return Object.keys(s).reduce(function(e,t){return e+s[t]},0)}Object.defineProperty(t,"__esModule",{value:!0}),t.get=o,t.add=r,t.remove=a,t.totalCount=l;var s={}},253:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(324),r=function(e){return e&&e.__esModule?e:{default:e}}(o),a=r.default,l=a.canUseDOM?window.HTMLElement:{};t.default=l},254:function(e,t,n){"use strict";function o(e){return e.offsetWidth<=0&&e.offsetHeight<=0||"none"===e.style.display}function r(e){for(var t=e;t&&t!==document.body;){if(o(t))return!1;t=t.parentNode}return!0}function a(e,t){var n=e.nodeName.toLowerCase();return(i.test(n)&&!e.disabled||("a"===n?e.href||t:t))&&r(e)}function l(e){var t=e.getAttribute("tabindex");null===t&&(t=void 0);var n=isNaN(t);return(n||t>=0)&&a(e,!n)}function s(e){return[].slice.call(e.querySelectorAll("*"),0).filter(l)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=s;/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
var i=/input|select|textarea|button|object/},27:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=function(e){return e&&e.__esModule?e:{default:e}}(o),a=function(e){return r.default.createElement("div",{className:"spinner "+e.cssClass},r.default.createElement("i",{className:"fa fa-spinner fa-pulse fa-3x fa-fw"}),r.default.createElement("span",{className:"sr-only"},"Loading..."))};t.default=a},309:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=function(e){return e&&e.__esModule?e:{default:e}}(o),a=function(e){return r.default.createElement("div",null,r.default.createElement("div",{className:"newBlog__subhead newBlog__subhead--sm"},e.title),r.default.createElement("div",{className:"form__checkbox-group"},e.options.map(function(t){return r.default.createElement("label",{key:t,className:"form__checkbox-label",htmlFor:e.setName},r.default.createElement("input",{className:"form__checkbox",name:e.setName,id:e.setName,onChange:e.controlFunc,value:t,checked:e.selectedOptions.indexOf(t)>-1,type:e.type})," ",t)})))};t.default=a},316:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(1),d=o(c),f=n(15),p=n(74),h=o(p),m=n(313),y=o(m),v=n(37),b=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(v),g=n(17),w=n(27),_=o(w),O=n(396),C=o(O),E=n(129),k=o(E),S=n(309),T=o(S),B=function(e){function t(e){a(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={newBlog:{title:"",tags:["Homepage"],images:{featured:{},current:{success:"",progress:"",url:"",fileName:"",alt:"",inline:""}},body:"<br/>"},edit:"",modal:{open:!1,type:"",title:"",body:"",confirm:"",danger:!1,url:""},showErrors:!1,validationErrors:{},touched:{title:!1,body:!1,alt:!1},submit:!1},n.modules={toolbar:{container:[[{header:[3,4,!1]}],["bold","italic","underline","strike","blockquote",{color:["#007DC5","#ED1C24","#7a7a7a"]}],[{list:"ordered"},{list:"bullet"},{indent:"+1"},{indent:"-1"},"link","image","clean"]],handlers:{image:function(e){var t=i({},n.state.newBlog);t.images.current={success:"",progress:"",url:"",fileName:"",alt:"",inline:!0};n.setState({modal:{open:!0,type:"inline",title:"Choose image",confirm:"Insert image",danger:!1,value:e},newBlog:t})}}}},n.formats=["header","bold","italic","underline","strike","blockquote","color","list","bullet","indent","link","image"],n.quillRef=null,n.reactQuillRef=null,n.handleChange=n.handleChange.bind(n),n.handleFocus=n.handleFocus.bind(n),n.handleBlur=n.handleBlur.bind(n),n.handleQuillChange=n.handleQuillChange.bind(n),n.handleImgUpload=n.handleImgUpload.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n.handleTagSelection=n.handleTagSelection.bind(n),n.openModal=n.openModal.bind(n),n.closeModal=n.closeModal.bind(n),n.errorFor=n.errorFor.bind(n),n.setAltText=n.setAltText.bind(n),n.setFeatured=n.setFeatured.bind(n),n.removeImage=n.removeImage.bind(n),n.updateValidationErrors=n.updateValidationErrors.bind(n),n.updateErrorViz=n.updateErrorViz.bind(n),n}return s(t,e),u(t,[{key:"componentDidMount",value:function(){var e=this;if(this.attachQuillRefs(),this.props.match.params.key){var t=this.props.match.params.key;g.blogsRef.child(t).once("value",function(t){var n=t.val();n.tags||(n.tags=[""]),e.setState({newBlog:n,edit:!0})})}}},{key:"componentDidUpdate",value:function(){this.attachQuillRefs()}},{key:"setAltText",value:function(e,t){var n=i({},this.state.newBlog);if(e){var o=i({},n.images[t]);o.alt=n.images.current.alt,n.images[t]=o}else n.images.featured.alt=n.images.current.alt;this.setState({newBlog:n})}},{key:"setFeatured",value:function(){var e=i({},this.state.newBlog),t=e.images.current;e.images.featured=t,this.setState({newBlog:e})}},{key:"handleChange",value:function(e){var t=i({},this.state.newBlog);"alt"===e.target.name?t.images.current.alt=e.target.value:t[e.target.name]=e.target.value,t.timestamp=g.timeRef,t.slug=(0,g.generateSlug)(t.title),this.setState(i({},this.state,{newBlog:t}))}},{key:"handleTagSelection",value:function(e){var t=i({},this.state.newBlog),n=e.target.value,o=void 0;o=this.state.newBlog.tags.indexOf(n)>-1?this.state.newBlog.tags.filter(function(e){return e!==n}):[].concat(r(this.state.newBlog.tags),[n]),t.tags=o,this.setState({newBlog:t})}},{key:"handleBlur",value:function(e){var t=e.target.name,n=i({},this.state.newBlog);n[e.target.name]=e.target.value;var o=(0,g.run)(n,g.fieldValidations),r=i({},this.state.touched);r[t]=!0;var a=!(!Object.values(o).length||!r[t]);this.setState({validationErrors:o,showErrors:a,touched:r})}},{key:"handleFocus",value:function(e){var t=e.target.name,n=i({},this.state.newBlog),o=(0,g.run)(n,g.fieldValidations);o[t]=!1;this.setState({validationErrors:o,showErrors:!1})}},{key:"handleQuillChange",value:function(e){var t=i({},this.state.newBlog);t.body=e,this.setState({newBlog:t})}},{key:"handleImgUpload",value:function(e){var t=this;e.preventDefault();var n=i({},this.state.newBlog),o=e.target.files[0],r=b.storage().ref(),a=r.child("images/"+o.name).put(o);a.on("state_changed",function(e){var o=Math.round(e.bytesTransferred/e.totalBytes*100);n.images.current.progress=o,t.setState({newBlog:n})},function(e){n.images.current.error=e,console.log(e),t.setState({newBlog:n})},function(){var e=a.snapshot.downloadURL,r=o.name;if(n.images.current.url=e,n.images.current.success=!0,n.images.current.fileName=r,t.state.newBlog.images.current.inline){var l=i({},n.images.current),s=(0,g.generateSlug)(r);n.images[s]=l}t.setState({newBlog:n})})}},{key:"removeImage",value:function(e,t){var n=this,o=i({},this.state.newBlog);o.images.current={},"inline"===e?delete o.images[t]:o.featured={},this.setState({newBlog:o},function(){return n.closeModal()})}},{key:"errorFor",value:function(e){return this.state.validationErrors?this.state.validationErrors[e]||"":null}},{key:"attachQuillRefs",value:function(){if("function"==typeof this.reactQuillRef.getEditor&&null==this.quillRef){var e=this.reactQuillRef.getEditor();null!=e&&(this.quillRef=e)}}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),this.setState({showErrors:!0,submit:!0});var n=i({},this.state.newBlog),o=(0,g.run)(n,g.fieldValidations);this.setState({validationErrors:o},function(){if(o.title)return null;if(t.state.edit){var e=t.state.newBlog.key;return g.blogsRef.orderByChild("key").equalTo(e).once("value",function(n){return null===n.val()?(console.log("post not found"),null):(n.ref.child(e).update(t.state.newBlog).then(function(){t.props.history.push("/dashboard")}),null)}),null}var r=g.blogsRef.push().key;n.key=r;var a={};return a[r]=n,g.blogsRef.update(a).then(function(){t.setState({showErrors:!0}),t.props.history.push("/dashboard")}),null})}},{key:"closeModal",value:function(){this.setState({modal:{open:!1,title:""}})}},{key:"openModal",value:function(e,t,n,o,r){var a=i({},this.state.newBlog);a.images.current={success:"",progress:"",url:"",fileName:"",alt:"",inline:!1},this.setState({modal:{open:!0,type:e,title:t,confirm:n,danger:o,url:r},newBlog:a})}},{key:"updateValidationErrors",value:function(e,t){this.setState({validationErrors:e},function(){t()})}},{key:"updateErrorViz",value:function(){this.setState({showErrors:!0,submit:!0})}},{key:"render",value:function(){var e=this,t=this.state.newBlog,n=t.title,o=t.body,r=t.images,a=t.tags,l={overlay:{zIndex:10}};return d.default.createElement("div",{id:"cb"},d.default.createElement(h.default,{style:l,isOpen:this.state.modal.open,onRequestClose:this.closeModal,className:"modal",contentLabel:this.state.modal.title},d.default.createElement(C.default,{closeModal:this.closeModal,title:this.state.modal.title,handleImgUpload:this.handleImgUpload,images:this.state.newBlog.images,handleChange:this.handleChange,type:this.state.modal.type,danger:this.state.modal.danger,confirm:this.state.modal.confirm,handleInsertImage:this.handleInsertImage,quillRef:this.quillRef,handleBlur:this.handleBlur,handleFocus:this.handleFocus,setAltText:this.setAltText,validatonErrors:this.state.validationErrors,errorFor:this.errorFor,touched:this.state.touched,showError:this.state.showErrors,updateValidationErrors:this.updateValidationErrors,updateErrorViz:this.updateErrorViz,submit:this.state.submit,removeImage:this.removeImage,setFeatured:this.setFeatured})),d.default.createElement("h2",{className:"newBlog__banner newBlog__banner--crumbs"},this.state.edit?"Update Post":"New Blog Post"),this.state.edit&&""===n&&!o?d.default.createElement(_.default,null):d.default.createElement("div",{className:"newBlog__container"},d.default.createElement("form",{className:"newBlog__form"},d.default.createElement("h3",{className:"newBlog__subhead"},"Input"),d.default.createElement(k.default,{handleChange:this.handleChange,handleBlur:this.handleBlur,handleFocus:this.handleFocus,placeholder:"Blog Title",showError:this.state.showErrors,text:this.state.newBlog.title,errorText:this.errorFor("title"),touched:this.state.touched.title,name:"title",submit:this.state.submit}),d.default.createElement("br",null),d.default.createElement("h3",{className:"newBlog__subhead newBlog__subhead--sm"},"Set Featured Image"),d.default.createElement("a",{role:"button",tabIndex:"0",onKeyPress:function(t){var n=t.keyCode?t.keyCode:t.which;32!==n&&13!==n||e.openModal("featured","Set Featured Image","OK",!1)},className:"newBlog__button newBlog__button--featured",onClick:function(){return e.openModal("featured","Set Featured Image","OK",!1)}},"Choose File"),d.default.createElement("br",null),d.default.createElement("div",{className:"newBlog__editor"},d.default.createElement(y.default,{theme:"snow",value:o,placeholder:"Your blog post here",onChange:this.handleQuillChange,modules:this.modules,formats:this.formats,ref:function(t){e.reactQuillRef=t}},d.default.createElement("div",{key:"editor",className:"quill-contents"}))),d.default.createElement(T.default,{title:"Tags",setName:"tags",type:"checkbox",controlFunc:this.handleTagSelection,options:["Homepage","FAQ"],selectedOptions:a}),d.default.createElement("br",null),d.default.createElement("button",{className:"newBlog__submit newBlog__button",type:"submit",onClick:function(t){return e.handleSubmit(t)}},this.state.edit?"Update Post":"Create Post"),d.default.createElement(f.Link,{to:"/dashboard",className:"newBlog__cancel newBlog__button"},"Cancel")),d.default.createElement("div",{className:"newBlog__preview"},d.default.createElement("h3",{className:"newBlog__subhead"},"Preview"),d.default.createElement("div",{className:"newBlog__wrapper"},d.default.createElement("h3",{className:"newBlog__title"},n),d.default.createElement("div",{id:"imgCont"},r&&r.featured&&r.featured.url&&d.default.createElement("img",{className:"newBlog__img",src:(0,g.resize)(document.getElementById("imgCont").offsetWidth,r.featured.url),alt:r.featured.alt})),d.default.createElement("div",{className:"newBlog__body",dangerouslySetInnerHTML:(0,g.sanitize)(o)})))))}}]),t}(c.Component);t.default=B},324:function(e,t,n){var o;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
!function(){"use strict";var r=!("undefined"==typeof window||!window.document||!window.document.createElement),a={canUseDOM:r,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:r&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:r&&!!window.screen};void 0!==(o=function(){return a}.call(t,n,t,e))&&(e.exports=o)}()},356:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return e()}Object.defineProperty(t,"__esModule",{value:!0}),t.bodyOpenClassName=t.portalClassName=void 0;var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(1),d=o(c),f=n(73),p=o(f),h=n(6),m=o(h),y=n(357),v=o(y),b=n(251),g=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(b),w=n(253),_=o(w),O=t.portalClassName="ReactModalPortal",C=t.bodyOpenClassName="ReactModal__Body--open",E=p.default.unstable_renderSubtreeIntoContainer,k=function(e){function t(){var e,n,o,l;r(this,t);for(var u=arguments.length,c=Array(u),f=0;f<u;f++)c[f]=arguments[f];return n=o=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),o.removePortal=function(){p.default.unmountComponentAtNode(o.node),s(o.props.parentSelector).removeChild(o.node)},o.renderPortal=function(e){o.portal=E(o,d.default.createElement(v.default,i({defaultStyles:t.defaultStyles},e)),o.node)},l=n,a(o,l)}return l(t,e),u(t,[{key:"componentDidMount",value:function(){this.node=document.createElement("div"),this.node.className=this.props.portalClassName,s(this.props.parentSelector).appendChild(this.node),this.renderPortal(this.props)}},{key:"componentWillReceiveProps",value:function(e){var t=e.isOpen;if(this.props.isOpen||t){var n=s(this.props.parentSelector),o=s(e.parentSelector);o!==n&&(n.removeChild(this.node),o.appendChild(this.node)),this.renderPortal(e)}}},{key:"componentWillUpdate",value:function(e){e.portalClassName!==this.props.portalClassName&&(this.node.className=e.portalClassName)}},{key:"componentWillUnmount",value:function(){if(this.node){var e=this.portal.state,t=Date.now(),n=e.isOpen&&this.props.closeTimeoutMS&&(e.closesAt||t+this.props.closeTimeoutMS);n?(e.beforeClose||this.portal.closeWithTimeout(),setTimeout(this.removePortal,n-t)):this.removePortal()}}},{key:"render",value:function(){return null}}],[{key:"setAppElement",value:function(e){g.setElement(e)}},{key:"injectCSS",value:function(){}}]),t}(c.Component);k.propTypes={isOpen:m.default.bool.isRequired,style:m.default.shape({content:m.default.object,overlay:m.default.object}),portalClassName:m.default.string,bodyOpenClassName:m.default.string,className:m.default.oneOfType([m.default.string,m.default.object]),overlayClassName:m.default.oneOfType([m.default.string,m.default.object]),appElement:m.default.instanceOf(_.default),onAfterOpen:m.default.func,onRequestClose:m.default.func,closeTimeoutMS:m.default.number,ariaHideApp:m.default.bool,shouldCloseOnOverlayClick:m.default.bool,parentSelector:m.default.func,aria:m.default.object,role:m.default.string,contentLabel:m.default.string.isRequired},k.defaultProps={isOpen:!1,portalClassName:O,bodyOpenClassName:C,ariaHideApp:!0,closeTimeoutMS:0,shouldCloseOnOverlayClick:!0,parentSelector:function(){return document.body}},k.defaultStyles={overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.75)"},content:{position:"absolute",top:"40px",left:"40px",right:"40px",bottom:"40px",border:"1px solid #ccc",background:"#fff",overflow:"auto",WebkitOverflowScrolling:"touch",borderRadius:"4px",outline:"none",padding:"20px"}},t.default=k},357:function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),d=n(1),f=r(d),p=n(6),h=n(359),m=o(h),y=n(360),v=r(y),b=n(251),g=o(b),w=n(252),_=o(w),O=n(358),C=o(O),E=n(253),k=r(E),S={overlay:"ReactModal__Overlay",content:"ReactModal__Content"},T=9,B=27,P=function(e){function t(e){a(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.setFocusAfterRender=function(e){n.focusAfterRender=e},n.setOverlayRef=function(e){n.overlay=e},n.setContentRef=function(e){n.content=e},n.afterClose=function(){m.returnFocus(),m.teardownScopedFocus()},n.open=function(){n.beforeOpen(),n.state.afterOpen&&n.state.beforeClose?(clearTimeout(n.closeTimer),n.setState({beforeClose:!1})):(m.setupScopedFocus(n.node),m.markForFocusLater(),n.setState({isOpen:!0},function(){n.setState({afterOpen:!0}),n.props.isOpen&&n.props.onAfterOpen&&n.props.onAfterOpen()}))},n.close=function(){n.beforeClose(),n.props.closeTimeoutMS>0?n.closeWithTimeout():n.closeWithoutTimeout()},n.focusContent=function(){return n.content&&!n.contentHasFocus()&&n.content.focus()},n.closeWithTimeout=function(){var e=Date.now()+n.props.closeTimeoutMS;n.setState({beforeClose:!0,closesAt:e},function(){n.closeTimer=setTimeout(n.closeWithoutTimeout,n.state.closesAt-Date.now())})},n.closeWithoutTimeout=function(){n.setState({beforeClose:!1,isOpen:!1,afterOpen:!1,closesAt:null},n.afterClose)},n.handleKeyDown=function(e){e.keyCode===T&&(0,v.default)(n.content,e),e.keyCode===B&&(e.preventDefault(),n.requestClose(e))},n.handleOverlayOnClick=function(e){null===n.shouldClose&&(n.shouldClose=!0),n.shouldClose&&n.props.shouldCloseOnOverlayClick&&(n.ownerHandlesClose()?n.requestClose(e):n.focusContent()),n.shouldClose=null},n.handleContentOnClick=function(){n.shouldClose=!1},n.requestClose=function(e){return n.ownerHandlesClose()&&n.props.onRequestClose(e)},n.ownerHandlesClose=function(){return n.props.onRequestClose},n.shouldBeClosed=function(){return!n.state.isOpen&&!n.state.beforeClose},n.contentHasFocus=function(){return document.activeElement===n.content||n.content.contains(document.activeElement)},n.buildClassName=function(e,t){var o="object"===(void 0===t?"undefined":u(t))?t:{base:S[e],afterOpen:S[e]+"--after-open",beforeClose:S[e]+"--before-close"},r=o.base;return n.state.afterOpen&&(r=r+" "+o.afterOpen),n.state.beforeClose&&(r=r+" "+o.beforeClose),"string"==typeof t&&t?r+" "+t:r},n.ariaAttributes=function(e){return Object.keys(e).reduce(function(t,n){return t["aria-"+n]=e[n],t},{})},n.state={afterOpen:!1,beforeClose:!1},n.shouldClose=null,n}return s(t,e),c(t,[{key:"componentDidMount",value:function(){this.props.isOpen&&(this.setFocusAfterRender(!0),this.open())}},{key:"componentWillReceiveProps",value:function(e){!this.props.isOpen&&e.isOpen?(this.setFocusAfterRender(!0),this.open()):this.props.isOpen&&!e.isOpen&&this.close()}},{key:"componentDidUpdate",value:function(){this.focusAfterRender&&(this.focusContent(),this.setFocusAfterRender(!1))}},{key:"componentWillUnmount",value:function(){this.beforeClose(),clearTimeout(this.closeTimer)}},{key:"beforeOpen",value:function(){var e=this.props,t=e.appElement,n=e.ariaHideApp,o=e.bodyOpenClassName;C.add(o),n&&g.hide(t)}},{key:"beforeClose",value:function(){var e=this.props,t=e.appElement,n=e.ariaHideApp,o=e.bodyOpenClassName;C.remove(o),n&&_.totalCount()<1&&g.show(t)}},{key:"render",value:function(){var e=this.props,t=e.className,n=e.overlayClassName,o=e.defaultStyles,r=t?{}:o.content,a=n?{}:o.overlay;return this.shouldBeClosed()?null:f.default.createElement("div",{ref:this.setOverlayRef,className:this.buildClassName("overlay",n),style:i({},a,this.props.style.overlay),onClick:this.handleOverlayOnClick},f.default.createElement("div",i({ref:this.setContentRef,style:i({},r,this.props.style.content),className:this.buildClassName("content",t),tabIndex:"-1",onKeyDown:this.handleKeyDown,onClick:this.handleContentOnClick,role:this.props.role,"aria-label":this.props.contentLabel},this.ariaAttributes(this.props.aria||{})),this.props.children))}}]),t}(d.Component);P.defaultProps={style:{overlay:{},content:{}}},P.propTypes={isOpen:p.PropTypes.bool.isRequired,defaultStyles:p.PropTypes.shape({content:p.PropTypes.object,overlay:p.PropTypes.object}),style:p.PropTypes.shape({content:p.PropTypes.object,overlay:p.PropTypes.object}),className:p.PropTypes.oneOfType([p.PropTypes.string,p.PropTypes.object]),overlayClassName:p.PropTypes.oneOfType([p.PropTypes.string,p.PropTypes.object]),bodyOpenClassName:p.PropTypes.string,ariaHideApp:p.PropTypes.bool,appElement:p.PropTypes.instanceOf(k.default),onAfterOpen:p.PropTypes.func,onRequestClose:p.PropTypes.func,closeTimeoutMS:p.PropTypes.number,shouldCloseOnOverlayClick:p.PropTypes.bool,role:p.PropTypes.string,contentLabel:p.PropTypes.string,aria:p.PropTypes.object,children:p.PropTypes.node},t.default=P},358:function(e,t,n){"use strict";function o(e){e.split(" ").map(l.add).forEach(function(e){return document.body.classList.add(e)})}function r(e){var t=l.get();e.split(" ").map(l.remove).filter(function(e){return 0===t[e]}).forEach(function(e){return document.body.classList.remove(e)})}Object.defineProperty(t,"__esModule",{value:!0}),t.add=o,t.remove=r;var a=n(252),l=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(a)},359:function(e,t,n){"use strict";function o(){p=!0}function r(){if(p){if(p=!1,!f)return;setTimeout(function(){if(!f.contains(document.activeElement)){((0,c.default)(f)[0]||f).focus()}},0)}}function a(){d.push(document.activeElement)}function l(){var e=null;try{return e=d.pop(),void e.focus()}catch(t){console.warn(["You tried to return focus to",e,"but it is not in the DOM anymore"].join(" "))}}function s(e){f=e,window.addEventListener?(window.addEventListener("blur",o,!1),document.addEventListener("focus",r,!0)):(window.attachEvent("onBlur",o),document.attachEvent("onFocus",r))}function i(){f=null,window.addEventListener?(window.removeEventListener("blur",o),document.removeEventListener("focus",r)):(window.detachEvent("onBlur",o),document.detachEvent("onFocus",r))}Object.defineProperty(t,"__esModule",{value:!0}),t.handleBlur=o,t.handleFocus=r,t.markForFocusLater=a,t.returnFocus=l,t.setupScopedFocus=s,t.teardownScopedFocus=i;var u=n(254),c=function(e){return e&&e.__esModule?e:{default:e}}(u),d=[],f=null,p=!1},360:function(e,t,n){"use strict";function o(e,t){var n=(0,a.default)(e);if(!n.length)return void t.preventDefault();n[t.shiftKey?0:n.length-1]!==document.activeElement&&e!==document.activeElement||(t.preventDefault(),n[t.shiftKey?n.length-1:0].focus())}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var r=n(254),a=function(e){return e&&e.__esModule?e:{default:e}}(r)},74:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(356),r=function(e){return e&&e.__esModule?e:{default:e}}(o);t.default=r.default}},[316]);