webpackJsonp([2],{14:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=r(0),s=n(u),c=r(19),p=n(c),f=function(e){function t(e){o(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.shouldDisplayError=r.shouldDisplayError.bind(r),r}return l(t,e),i(t,[{key:"shouldDisplayError",value:function(){return this.props.showError&&this.props.errorText&&(this.props.touched||this.props.submit)}},{key:"render",value:function(){return s.default.createElement("div",{className:"form__field-group"},s.default.createElement("label",{className:"sr-only",htmlFor:this.props.name},this.props.placeholder),s.default.createElement("input",{className:this.shouldDisplayError()?"form__input form__input--error":"form__input",type:this.props.type||"text",placeholder:this.props.placeholder,value:this.props.text,onChange:this.props.handleChange,onBlur:this.props.handleBlur,onFocus:this.props.handleFocus,name:this.props.name,id:this.props.name}),s.default.createElement(p.default,{display:this.shouldDisplayError()},s.default.createElement("div",{className:"form__error-wrap"},s.default.createElement("span",{className:"form__error-content"},this.props.errorText))))}}]),t}(u.Component);t.default=f},19:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(0),u=function(e){return e&&e.__esModule?e:{default:e}}(i),s=function(e){function t(){return n(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),l(t,[{key:"render",value:function(){return!0===this.props.display?u.default.createElement("div",null,this.props.children):null}}]),t}(i.Component);t.default=s},3:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(t,"__esModule",{value:!0}),t.skip=t.fieldValidationsModal=t.fieldValidationsPhotoGallery=t.fieldValidations=t.run=t.ruleRunner=t.minLength=t.mustMatch=t.conditionalRequired=t.required=t.cardWidth=t.cropSquare=t.resize=t.sanitizeExcerpt=t.sanitize=t.generateSlug=t.formatDate=t.galleriesDbRef=t.timeRef=t.galleriesRef=t.contattiRef=t.blogsRef=t.rootRef=void 0;var o=r(10),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(o),l=r(39),i=function(e){return e&&e.__esModule?e:{default:e}}(l),u={apiKey:"AIzaSyDorzqQG5pgETcGGmQ58DrQhQUHYnVERHU",authDomain:"avis-website-dac6e.firebaseapp.com",databaseURL:"https://avis-website-dac6e.firebaseio.com",projectId:"avis-website-dac6e",storageBucket:"avis-website-dac6e.appspot.com",messagingSenderId:"115042660818"};a.initializeApp(u);var s=t.rootRef=a.database().ref().child("avis"),c=(t.blogsRef=s.child("blogs"),t.contattiRef=s.child("contatti"),t.galleriesRef=s.child("galleries"),t.timeRef=a.database.ServerValue.TIMESTAMP,t.galleriesDbRef=a.storage().ref().child("images/galleries"),t.formatDate=function(e){var t=["genn","febbr","mar","apr","magg","giugno","luglio","ag","sett","ott","nov","dic"];return e.getDate()+" "+t[e.getMonth()]+" "+e.getFullYear()},t.generateSlug=function(e){return e.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,"")},t.sanitize=function(e){return{__html:(0,i.default)(e,{allowedTags:i.default.defaults.allowedTags.concat(["img","span"]),allowedAttributes:{a:["href","name","target"],img:["alt","src"],"*":["style","align"]}})}},t.sanitizeExcerpt=function(e){return{__html:(0,i.default)(e,{allowedTags:["b","i","em","strong","a"],allowedAttributes:{a:["href"]}})}},t.resize=function(e,t){return"http://res.cloudinary.com/avis-rovigo/image/fetch/w_"+e+",c_scale/"+encodeURIComponent(t).replace(/'/g,"%27").replace(/"/g,"%22")},t.cropSquare=function(e,t){return"http://res.cloudinary.com/avis-rovigo/image/fetch/w_"+e+",h_"+e+",c_fill/"+encodeURIComponent(t).replace(/'/g,"%27").replace(/"/g,"%22")},t.cardWidth=function(){return window.innerWidth>600?Math.floor(window.innerWidth/3):window.innerWidth<600&&window.innerWidth>480?Math.floor(window.innerWidth/2):Math.floor(window.innerWidth)},function(e){return e+" is required"}),p=function(e){return function(t){return t+" must match "+e}},f=function(e){return function(t){return t+" must be at least "+e+" characters"}},d=t.required=function(e){return e?null:c},m=(t.conditionalRequired=function(e,t){return function(e,r){return""!==r[t]&&""===e?c:null}},t.mustMatch=function(e,t){return function(r,n){return n[e]===r?null:p(t)}},t.minLength=function(e){return function(t){return t.length>=e?null:f(e)}},t.ruleRunner=function(e,t){for(var r=arguments.length,o=Array(r>2?r-2:0),a=2;a<r;a++)o[a-2]=arguments[a];return function(r){var a=o.find(function(t){return t(r[e],r)});return a?n({},e,a(r[e],r)(t)):{}}});t.run=function(e,t){return t.reduce(function(t,r){return Object.assign(t,r(e))},{})},t.fieldValidations=[m("title","Title",d)],t.fieldValidationsPhotoGallery=[m("title","Gallery Name",d)],t.fieldValidationsModal=[m("alt","Alt text",d)],t.skip=function(e){var t=function(e){e.target.removeAttribute("tabindex")},r=document.getElementById(e);r.tabIndex=-1,r.focus(),r.addEventListener("blur",t)}},40:function(e,t){},41:function(e,t){},42:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=function e(t,r,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,r);if(void 0===o){var a=Object.getPrototypeOf(t);return null===a?void 0:e(a,r,n)}if("value"in o)return o.value;var l=o.get;if(void 0!==l)return l.call(n)},s=r(0),c=n(s),p=r(32),f=n(p),d=r(3),m=r(14),h=n(m),g=function(){document.getElementById("btn-focus").classList.add("fake-focus")},b=function(){document.getElementById("btn-focus").classList.remove("fake-focus")},_=f.default.Quill,y=_.import("blots/block/embed"),v=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),i(t,null,[{key:"create",value:function(e){var r=u(t.__proto__||Object.getPrototypeOf(t),"create",this).call(this);return r.setAttribute("alt",e.alt),r.setAttribute("src",e.url),r}},{key:"value",value:function(e){return{alt:e.getAttribute("alt"),url:e.getAttribute("src")}}}]),t}(y);v.blotName="image",v.tagName="img",v.className="inline-img",_.register(v);var w=function(e){function t(e){o(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.handleModalSubmit=r.handleModalSubmit.bind(r),r.handleInsertImage=r.handleInsertImage.bind(r),r}return l(t,e),i(t,[{key:"handleInsertImage",value:function(e,t){if(e){var r=(0,d.resize)(600,e);this.props.quillRef.focus();var n=this.props.quillRef.getSelection();this.props.quillRef.insertText(n.index,"\n","user"),this.props.quillRef.insertEmbed(n.index+1,"image",{alt:t,url:r},"user"),this.props.quillRef.setSelection(n.index+2,"silent"),this.props.closeModal()}}},{key:"handleModalSubmit",value:function(){var e=this;this.props.updateErrorViz();var t=(0,d.run)(this.props.images.current,d.fieldValidationsModal),r=function(){if(t.alt||t.file)return null;if("inline"===e.props.type){var r=(0,d.generateSlug)(e.props.images.current.fileName);e.props.setAltText(!0,r);var n=e.props.images.current;return e.handleInsertImage(n.url,n.alt),e.props.closeModal(),null}return"featured"===e.props.type?(e.props.setFeatured(),e.props.setAltText(!1),e.props.closeModal(),null):null};return this.props.updateValidationErrors(t,r),null}},{key:"handleCancel",value:function(){var e=null;"inline"===this.props.type&&(e=(0,d.generateSlug)(this.props.images.current.fileName)),this.props.removeImage(this.props.type,e)}},{key:"render",value:function(){var e=this;return c.default.createElement("div",{className:"modal__dialog"},c.default.createElement("div",{className:"modal__content"},c.default.createElement("div",{className:"modal__header"},c.default.createElement("button",{type:"button",onClick:this.props.closeModal,className:"modal__close--x","data-dismiss":"modal","aria-label":"Close"},c.default.createElement("span",{"aria-hidden":"true"},"×")),c.default.createElement("h2",{className:"modal__title",id:"modalTitle"},this.props.title)),c.default.createElement("div",{className:"modal__body"},c.default.createElement("div",{className:"newBlog__fileUploadWrap newBlog__button",id:"btn-focus"},c.default.createElement("span",null,"Choose File"),c.default.createElement("input",{type:"file",value:"",className:"newBlog__uploadBtn",title:"uploadFile",name:"uploadFile",id:"uploadFile",onChange:function(t){return e.props.handleImgUpload(t)},onFocus:function(){return g()},onBlur:function(){return b()}})),this.props.images.current.progress>0&&!this.props.images.current.success&&c.default.createElement("span",{className:"newBlog__imgProg"},c.default.createElement("span",{className:"newBlog__img-upload-progress"},"Uploading... ",this.props.images.current.progress,"%")),c.default.createElement("div",{id:"modalImgCont"},this.props.images.current.success&&c.default.createElement("div",null,c.default.createElement("img",{className:"newBlog__img--modal",src:(0,d.resize)(document.getElementById("modalImgCont").offsetWidth,this.props.images.current.url),alt:this.props.images.current.alt}),c.default.createElement("div",{className:"newBlog__img-upload-success"},"Upload Successful "))),c.default.createElement(h.default,{className:"newBlog__input",handleChange:function(t){return e.props.handleChange(t)},handleBlur:function(t){return e.props.handleBlur(t)},handleFocus:function(t){return e.props.handleFocus(t)},placeholder:"Alt text for image",showError:this.props.showError,text:this.props.images.current.alt,errorText:this.props.errorFor("alt"),touched:this.props.touched.alt,name:"alt",submit:this.props.submit})),c.default.createElement("div",{className:"modal__footer"},c.default.createElement("button",{type:"button",onClick:function(){return e.handleCancel()},className:"modal__button modal__close--btn","data-dismiss":"modal"},"Cancel"),c.default.createElement("button",{type:"button",onClick:this.handleModalSubmit,className:this.props.danger?"modal__button modal__confirm modal__confirm--danger":"modal__button modal__confirm","data-dismiss":"modal"},this.props.confirm))))}}]),t}(s.Component);t.default=w}},[42]);