webpackJsonp([7],{209:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function n(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),u=a(0),d=l(u),s=a(8),f=a(48),m=l(f),_=a(113),g=l(_),b=a(111),p=l(b);a(114);var v=a(11),h=a(21),y=l(h),E=function(e){function t(){o(this,t);var e=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={blogs:[],msg:!1,currentKey:"",modalOpen:!1,filterQuery:""},e.openModal=e.openModal.bind(e),e.closeModal=e.closeModal.bind(e),e}return i(t,e),c(t,[{key:"componentDidMount",value:function(){var e=this;v.blogsRef.on("value",function(t){var a=[];t.forEach(function(e){var t=e.val();t[".key"]=e.key,a.push(t)}),e.setState(function(){return{blogs:a}})})}},{key:"componentWillUnmount",value:function(){v.blogsRef.off()}},{key:"onDelete",value:function(e){var t=this;v.blogsRef.child(e).remove().then(function(){t.setState({msg:!0,modalOpen:!1}),setTimeout(function(){t.componentRef&&t.setState({msg:!1,deleteKey:null})},2e3)})}},{key:"closeModal",value:function(){this.setState(function(){return{modalOpen:!1}})}},{key:"openModal",value:function(e){this.setState(function(){return{modalOpen:!0,deleteKey:e}})}},{key:"render",value:function(){var e=this,t=[].concat(n(this.state.blogs)).reverse(),a=[{Header:function(){return d.default.createElement("div",{className:"blogInd__tableHead"},"Title")},accessor:"title",minWidth:150,Cell:function(e){return d.default.createElement("div",{className:"blogInd__cell"},d.default.createElement(s.Link,{className:"blogInd__title",to:"/blog/"+e.original.slug},e.original.title)," ")},Filter:function(e){var t=e.filter,a=e.onChange;return d.default.createElement("input",{type:"text",placeholder:"Search posts",onChange:function(e){return a(e.target.value)},style:{width:"100%"},value:t?t.value:""})},filterMethod:function(e,t){return(0,p.default)(t,e.value,{keys:["title"]})},filterAll:!0},{Header:function(){return d.default.createElement("div",{className:"blogInd__tableHead"},"Tags")},accessor:"tags",minWidth:40,Cell:function(e){return d.default.createElement("div",{className:"blogInd__cell"},e.original.tags?e.original.tags.map(function(t){return d.default.createElement("span",{className:"blogInd__tag",key:t+"-"+e.original.key},t)}):""," ")},filterMethod:function(e,t){return"homepage"===e.value?t[e.id].indexOf("Homepage")>-1:"faq"!==e.value||t[e.id].indexOf("FAQ")>-1},Filter:function(e){var t=e.filter,a=e.onChange;return d.default.createElement("select",{className:"blogInd__select",onChange:function(e){return a(e.target.value)},style:{width:"100%"},value:t?t.value:"all"},d.default.createElement("option",{value:"all"},"Show All"),d.default.createElement("option",{value:"homepage"},"Homepage"),d.default.createElement("option",{value:"faq"},"FAQ"))}},{Header:function(){return d.default.createElement("div",{className:"blogInd__tableHead"},"Image")},accessor:"image",minWidth:30,filterable:!1,Cell:function(e){return d.default.createElement("div",{className:"blogInd__cell center"},e.original.images&&e.original.images.featured&&d.default.createElement("img",{className:"blogInd__thumb",src:(0,v.resize)(50,e.original.images.featured.url),alt:e.original.images.featured.alt}))}},{Header:function(){return d.default.createElement("div",{className:"blogInd__tableHead"},"Date")},accessor:"date",minWidth:60,filterable:!1,defaultSortDesc:!0,Cell:function(e){return d.default.createElement("div",{className:"blogInd__cell center"}," ",(0,v.formatDate)(new Date(e.original.timestamp)))}},{Header:function(){return d.default.createElement("div",{className:"blogInd__tableHead"},"Edit")},accessor:"edit",minWidth:30,filterable:!1,Cell:function(e){return d.default.createElement("div",{className:"blogInd__cell center"},d.default.createElement(s.Link,{to:"/edit/"+e.original.key,className:""},d.default.createElement("i",{className:"fa fa-pencil blogInd__icon blogInd__icon--edit"}))," ")}},{Header:function(){return d.default.createElement("div",{className:"blogInd__tableHead"},"Delete")},accessor:"delete",minWidth:30,filterable:!1,Cell:function(t){return d.default.createElement("div",{className:"blogInd__cell center"}," ",d.default.createElement("button",{className:"fa fa-trash blogInd__icon blogInd__icon--delete",onClick:function(){return e.openModal(t.original[".key"])}}))}}];return d.default.createElement("div",{className:"blogInd__container",id:"blogInd"},d.default.createElement(m.default,{isOpen:this.state.modalOpen,onAfterOpen:this.afterOpenModal,onRequestClose:this.closeModal,className:"modal",contentLabel:"Confirm Delete"},d.default.createElement("div",{className:"modal__dialog"},d.default.createElement("div",{className:"modal__content"},d.default.createElement("div",{className:"modal__header"},d.default.createElement("button",{type:"button",onClick:this.closeModal,className:"modal__close--x","data-dismiss":"modal","aria-label":"Close"},d.default.createElement("span",{"aria-hidden":"true"},"×")),d.default.createElement("h2",{className:"modal__title",id:"modalTitle"},"Confirm Delete")),d.default.createElement("div",{className:"modal__body"},d.default.createElement("p",null,"Are you sure you want to delete this post? This cannot be undone.")),d.default.createElement("div",{className:"modal__footer"},d.default.createElement("button",{type:"button",onClick:this.closeModal,className:"modal__button modal__close--btn","data-dismiss":"modal"},"Cancel"),d.default.createElement("button",{type:"button",onClick:function(){return e.onDelete(e.state.deleteKey)},className:"modal__button modal__confirm modal__confirm--danger","data-dismiss":"modal"},"Delete"))))),this.state.msg&&d.default.createElement("div",{className:"blogInd__msg"},"Post successfully deleted."),t.length?d.default.createElement("div",{ref:function(t){e.componentRef=t},className:"blogInd__table-cont"},d.default.createElement(g.default,{className:"blogInd__grid -striped",data:t,columns:a,defaultPageSize:5,filterable:!0,defaultFilterMethod:function(e,t){return t[e.id].includes(e.value)}})):d.default.createElement(y.default,null))}}]),t}(u.Component);t.default=E}},[209]);