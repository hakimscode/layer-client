(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{1119:function(e,a,t){"use strict";t.r(a);var s=t(142),n=t(143),r=t(145),o=t(144),l=t(146),c=t(4),u=t.n(c),i=t(917),d=t(918),b=t(919),f=t(922),m=t(920),g=t(923),p=t(235),v=t.n(p),j=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(r.a)(this,Object(o.a)(a).call(this,e))).API_URL="http://localhost:5000/gudang_telurs",t.state={gudang_telurs:[{id:"",jumlah:"",tonase:""}]},t}return Object(l.a)(a,e),Object(n.a)(a,[{key:"componentDidMount",value:function(){var e=this;v.a.get(this.API_URL).then(function(a){e.setState({gudang_telurs:a.data.data})})}},{key:"render",value:function(){return u.a.createElement("div",{className:"animated fadeIn"},u.a.createElement(i.a,null,u.a.createElement(d.a,{xs:"12",lg:"12"},u.a.createElement(b.a,null,u.a.createElement(f.a,null,u.a.createElement("i",{className:"fa fa-align-justify"})," Data Gudang Telur"),u.a.createElement(m.a,null,u.a.createElement(g.a,{responsive:!0},u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"No"),u.a.createElement("th",null,"Jumlah Telur"),u.a.createElement("th",null,"Tonase Telur"))),u.a.createElement("tbody",null,this.state.gudang_telurs.map(function(e,a){return u.a.createElement("tr",{key:e.id},u.a.createElement("td",null,a+1),u.a.createElement("td",null,e.jumlah),u.a.createElement("td",null,e.tonase))}))))))))}}]),a}(c.Component);a.default=j},913:function(e,a){e.exports=function(e){var a=typeof e;return!!e&&("object"==a||"function"==a)}},917:function(e,a,t){"use strict";var s=t(35),n=t(101),r=t(4),o=t.n(r),l=t(113),c=t.n(l),u=t(910),i=t.n(u),d=t(911),b={tag:d.d,noGutters:c.a.bool,className:c.a.string,cssModule:c.a.object,form:c.a.bool},f=function(e){var a=e.className,t=e.cssModule,r=e.noGutters,l=e.tag,c=e.form,u=Object(n.a)(e,["className","cssModule","noGutters","tag","form"]),b=Object(d.b)(i()(a,r?"no-gutters":null,c?"form-row":"row"),t);return o.a.createElement(l,Object(s.a)({},u,{className:b}))};f.propTypes=b,f.defaultProps={tag:"div"},a.a=f},918:function(e,a,t){"use strict";var s=t(35),n=t(101),r=t(913),o=t.n(r),l=t(4),c=t.n(l),u=t(113),i=t.n(u),d=t(910),b=t.n(d),f=t(911),m=i.a.oneOfType([i.a.number,i.a.string]),g=i.a.oneOfType([i.a.bool,i.a.number,i.a.string,i.a.shape({size:i.a.oneOfType([i.a.bool,i.a.number,i.a.string]),order:m,offset:m})]),p={tag:f.d,xs:g,sm:g,md:g,lg:g,xl:g,className:i.a.string,cssModule:i.a.object,widths:i.a.array},v={tag:"div",widths:["xs","sm","md","lg","xl"]},j=function(e,a,t){return!0===t||""===t?e?"col":"col-"+a:"auto"===t?e?"col-auto":"col-"+a+"-auto":e?"col-"+t:"col-"+a+"-"+t},h=function(e){var a=e.className,t=e.cssModule,r=e.widths,l=e.tag,u=Object(n.a)(e,["className","cssModule","widths","tag"]),i=[];r.forEach(function(a,s){var n=e[a];if(delete u[a],n||""===n){var r=!s;if(o()(n)){var l,c=r?"-":"-"+a+"-",d=j(r,a,n.size);i.push(Object(f.b)(b()(((l={})[d]=n.size||""===n.size,l["order"+c+n.order]=n.order||0===n.order,l["offset"+c+n.offset]=n.offset||0===n.offset,l)),t))}else{var m=j(r,a,n);i.push(m)}}}),i.length||i.push("col");var d=Object(f.b)(b()(a,i),t);return c.a.createElement(l,Object(s.a)({},u,{className:d}))};h.propTypes=p,h.defaultProps=v,a.a=h},919:function(e,a,t){"use strict";var s=t(35),n=t(101),r=t(4),o=t.n(r),l=t(113),c=t.n(l),u=t(910),i=t.n(u),d=t(911),b={tag:d.d,inverse:c.a.bool,color:c.a.string,body:c.a.bool,outline:c.a.bool,className:c.a.string,cssModule:c.a.object,innerRef:c.a.oneOfType([c.a.object,c.a.string,c.a.func])},f=function(e){var a=e.className,t=e.cssModule,r=e.color,l=e.body,c=e.inverse,u=e.outline,b=e.tag,f=e.innerRef,m=Object(n.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),g=Object(d.b)(i()(a,"card",!!c&&"text-white",!!l&&"card-body",!!r&&(u?"border":"bg")+"-"+r),t);return o.a.createElement(b,Object(s.a)({},m,{className:g,ref:f}))};f.propTypes=b,f.defaultProps={tag:"div"},a.a=f},920:function(e,a,t){"use strict";var s=t(35),n=t(101),r=t(4),o=t.n(r),l=t(113),c=t.n(l),u=t(910),i=t.n(u),d=t(911),b={tag:d.d,className:c.a.string,cssModule:c.a.object,innerRef:c.a.oneOfType([c.a.object,c.a.string,c.a.func])},f=function(e){var a=e.className,t=e.cssModule,r=e.innerRef,l=e.tag,c=Object(n.a)(e,["className","cssModule","innerRef","tag"]),u=Object(d.b)(i()(a,"card-body"),t);return o.a.createElement(l,Object(s.a)({},c,{className:u,ref:r}))};f.propTypes=b,f.defaultProps={tag:"div"},a.a=f},922:function(e,a,t){"use strict";var s=t(35),n=t(101),r=t(4),o=t.n(r),l=t(113),c=t.n(l),u=t(910),i=t.n(u),d=t(911),b={tag:d.d,className:c.a.string,cssModule:c.a.object},f=function(e){var a=e.className,t=e.cssModule,r=e.tag,l=Object(n.a)(e,["className","cssModule","tag"]),c=Object(d.b)(i()(a,"card-header"),t);return o.a.createElement(r,Object(s.a)({},l,{className:c}))};f.propTypes=b,f.defaultProps={tag:"div"},a.a=f},923:function(e,a,t){"use strict";var s=t(35),n=t(101),r=t(4),o=t.n(r),l=t(113),c=t.n(l),u=t(910),i=t.n(u),d=t(911),b={className:c.a.string,cssModule:c.a.object,size:c.a.string,bordered:c.a.bool,borderless:c.a.bool,striped:c.a.bool,dark:c.a.bool,hover:c.a.bool,responsive:c.a.oneOfType([c.a.bool,c.a.string]),tag:d.d,responsiveTag:d.d,innerRef:c.a.oneOfType([c.a.func,c.a.string,c.a.object])},f=function(e){var a=e.className,t=e.cssModule,r=e.size,l=e.bordered,c=e.borderless,u=e.striped,b=e.dark,f=e.hover,m=e.responsive,g=e.tag,p=e.responsiveTag,v=e.innerRef,j=Object(n.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),h=Object(d.b)(i()(a,"table",!!r&&"table-"+r,!!l&&"table-bordered",!!c&&"table-borderless",!!u&&"table-striped",!!b&&"table-dark",!!f&&"table-hover"),t),O=o.a.createElement(g,Object(s.a)({},j,{ref:v,className:h}));if(m){var N=Object(d.b)(!0===m?"table-responsive":"table-responsive-"+m,t);return o.a.createElement(p,{className:N},O)}return O};f.propTypes=b,f.defaultProps={tag:"table",responsiveTag:"div"},a.a=f}}]);
//# sourceMappingURL=18.3502d025.chunk.js.map