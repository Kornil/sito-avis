webpackJsonp([5],{378:function(e,t,l){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(e){if(Array.isArray(e)){for(var t=0,l=Array(e.length);t<e.length;t++)l[t]=e[t];return l}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var l=0;l<t.length;l++){var a=t[l];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,l,a){return l&&e(t.prototype,l),a&&e(t,a),t}}(),s=l(0),d=a(s),u=l(17),f=l(102),m=a(f),_=l(252),b=a(_),g=l(251),h=a(g);l(253);var p=l(19),v=l(40),y=a(v),E=function(e){function t(){o(this,t);var e=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={galleries:[],msg:!1,modalOpen:!1,galleriesExistInDb:!1},e.openModal=e.openModal.bind(e),e.closeModal=e.closeModal.bind(e),e}return i(t,e),c(t,[{key:"componentDidMount",value:function(){var e=this;p.galleriesRef.on("value",function(t){e.setState({galleriesExistInDb:!!t.val()});var l=[];t.forEach(function(e){var t=e.val();t[".key"]=e.key,l.push(t)}),e.setState(function(){return{galleries:l}})})}},{key:"componentWillUnmount",value:function(){p.galleriesRef.off()}},{key:"onDelete",value:function(e){var t=this;this.state.galleries.find(function(t){return t.key===e}).images.map(function(e){return e.fileName}).forEach(function(t){p.galleriesDbRef.child(e+"/"+t).delete().catch(function(e){return console.log("error deleting "+t+": "+e)})}),p.galleriesRef.child(e).remove().then(function(){t.setState({msg:!0,modalOpen:!1}),setTimeout(function(){t.componentRef&&t.setState({msg:!1,deleteKey:null})},2e3)})}},{key:"closeModal",value:function(){this.setState(function(){return{modalOpen:!1}})}},{key:"openModal",value:function(e){this.setState(function(){return{modalOpen:!0,deleteKey:e}})}},{key:"render",value:function(){var e=this,t=[{Header:function(){return d.default.createElement("div",{className:"blogInd__tableHead"},"Title")},accessor:"title",minWidth:160,Cell:function(e){return d.default.createElement("div",{className:"blogInd__cell"},d.default.createElement(u.Link,{className:"blogInd__title",to:"/gallery/"+e.original.slug},e.original.title))},Filter:function(e){var t=e.filter,l=e.onChange;return d.default.createElement("input",{type:"text",placeholder:"Search galleries",onChange:function(e){return l(e.target.value)},style:{width:"100%"},value:t?t.value:""})},filterMethod:function(e,t){return(0,h.default)(t,e.value,{keys:["title"]})},filterAll:!0},{Header:function(){return d.default.createElement("div",{className:"blogInd__tableHead"})},accessor:"image",minWidth:30,filterable:!1,Cell:function(e){return d.default.createElement("div",{className:"blogInd__cell center"},d.default.createElement("img",{className:"blogInd__thumb",src:(0,p.resize)(50,e.original.images[0].url),alt:e.original.images[0].alt})," ")}},{Header:function(){return d.default.createElement("div",{className:"blogInd__tableHead"},"Date")},accessor:"date",minWidth:60,filterable:!1,defaultSortDesc:!0,Cell:function(e){return d.default.createElement("div",{className:"blogInd__cell center"}," ",(0,p.formatDate)(new Date(e.original.timestamp)))}},{Header:function(){return d.default.createElement("div",{className:"blogInd__tableHead"},"Edit")},accessor:"edit",minWidth:40,filterable:!1,Cell:function(e){return d.default.createElement("div",{className:"blogInd__cell center"},d.default.createElement(u.Link,{to:"/edit-gallery/"+e.original.key,className:""},d.default.createElement("i",{className:"fa fa-pencil blogInd__icon blogInd__icon--edit"})))}},{Header:function(){return d.default.createElement("div",{className:"blogInd__tableHead"},"Delete")},accessor:"delete",minWidth:40,filterable:!1,Cell:function(t){return d.default.createElement("div",{className:"blogInd__cell center"}," ",d.default.createElement("button",{className:"fa fa-trash blogInd__icon blogInd__icon--delete",onClick:function(){return e.openModal(t.original[".key"])}}))}}],l=[].concat(n(this.state.galleries)).reverse(),a=d.default.createElement(y.default,null);return this.state.galleriesExistInDb||(a=d.default.createElement("div",null,"There are no galleries to display")),d.default.createElement("div",{className:"blogInd__container",id:"blogInd"},d.default.createElement(m.default,{isOpen:this.state.modalOpen,onAfterOpen:this.afterOpenModal,onRequestClose:this.closeModal,className:"modal",contentLabel:"Confirm Delete"},d.default.createElement("div",{className:"modal__dialog"},d.default.createElement("div",{className:"modal__content"},d.default.createElement("div",{className:"modal__header"},d.default.createElement("button",{type:"button",onClick:this.closeModal,className:"modal__close--x","data-dismiss":"modal","aria-label":"Close"},d.default.createElement("span",{"aria-hidden":"true"},"×")),d.default.createElement("h2",{className:"modal__title",id:"modalTitle"},"Confirm Delete")),d.default.createElement("div",{className:"modal__body"},d.default.createElement("p",null,"Are you sure you want to delete this gallery? This cannot be undone.")),d.default.createElement("div",{className:"modal__footer"},d.default.createElement("button",{type:"button",onClick:this.closeModal,className:"modal__button modal__close--btn","data-dismiss":"modal"},"Cancel"),d.default.createElement("button",{type:"button",onClick:function(){return e.onDelete(e.state.deleteKey)},className:"modal__button modal__confirm","data-dismiss":"modal"},"Delete"))))),this.state.msg&&d.default.createElement("div",{className:"blogInd__msg"},"Gallery successfully deleted."),d.default.createElement("div",{className:"dash__container"},d.default.createElement("div",{className:"dash__buttons-cont"},d.default.createElement(u.Link,{to:"/createphotogallery",className:"dash__button"},"Create New Photo Gallery"))),0===l.length?a:d.default.createElement("div",{ref:function(t){e.componentRef=t},className:"blogInd__table-cont"},d.default.createElement(b.default,{className:"blogInd__grid -striped",data:l,columns:t,defaultPageSize:5,defaultFilterMethod:function(e,t){return t[e.id].includes(e.value)}})))}}]),t}(s.Component);t.default=E}},[378]);