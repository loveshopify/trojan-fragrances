/**
 * @license
 * Lodash (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash core -o ./dist/lodash.core.js`
 */
;(function(){function n(n){return H(n)&&pn.call(n,"callee")&&!yn.call(n,"callee")}function t(n,t){return n.push.apply(n,t),n}function r(n){return function(t){return null==t?Z:t[n]}}function e(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)}),r}function u(n,t){return j(t,function(t){return n[t]})}function o(n){return n instanceof i?n:new i(n)}function i(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t}function c(n,t,r){if(typeof n!="function")throw new TypeError("Expected a function");
return setTimeout(function(){n.apply(Z,r)},t)}function f(n,t){var r=true;return mn(n,function(n,e,u){return r=!!t(n,e,u)}),r}function a(n,t,r){for(var e=-1,u=n.length;++e<u;){var o=n[e],i=t(o);if(null!=i&&(c===Z?i===i:r(i,c)))var c=i,f=o}return f}function l(n,t){var r=[];return mn(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function p(n,r,e,u,o){var i=-1,c=n.length;for(e||(e=R),o||(o=[]);++i<c;){var f=n[i];0<r&&e(f)?1<r?p(f,r-1,e,u,o):t(o,f):u||(o[o.length]=f)}return o}function s(n,t){return n&&On(n,t,Dn);
}function h(n,t){return l(t,function(t){return U(n[t])})}function v(n,t){return n>t}function b(n,t,r,e,u){return n===t||(null==n||null==t||!H(n)&&!H(t)?n!==n&&t!==t:y(n,t,r,e,b,u))}function y(n,t,r,e,u,o){var i=Nn(n),c=Nn(t),f=i?"[object Array]":hn.call(n),a=c?"[object Array]":hn.call(t),f="[object Arguments]"==f?"[object Object]":f,a="[object Arguments]"==a?"[object Object]":a,l="[object Object]"==f,c="[object Object]"==a,a=f==a;o||(o=[]);var p=An(o,function(t){return t[0]==n}),s=An(o,function(n){
return n[0]==t});if(p&&s)return p[1]==t;if(o.push([n,t]),o.push([t,n]),a&&!l){if(i)r=T(n,t,r,e,u,o);else n:{switch(f){case"[object Boolean]":case"[object Date]":case"[object Number]":r=J(+n,+t);break n;case"[object Error]":r=n.name==t.name&&n.message==t.message;break n;case"[object RegExp]":case"[object String]":r=n==t+"";break n}r=false}return o.pop(),r}return 1&r||(i=l&&pn.call(n,"__wrapped__"),f=c&&pn.call(t,"__wrapped__"),!i&&!f)?!!a&&(r=B(n,t,r,e,u,o),o.pop(),r):(i=i?n.value():n,f=f?t.value():t,
r=u(i,f,r,e,o),o.pop(),r)}function g(n){return typeof n=="function"?n:null==n?X:(typeof n=="object"?d:r)(n)}function _(n,t){return n<t}function j(n,t){var r=-1,e=M(n)?Array(n.length):[];return mn(n,function(n,u,o){e[++r]=t(n,u,o)}),e}function d(n){var t=_n(n);return function(r){var e=t.length;if(null==r)return!e;for(r=Object(r);e--;){var u=t[e];if(!(u in r&&b(n[u],r[u],3)))return false}return true}}function m(n,t){return n=Object(n),C(t,function(t,r){return r in n&&(t[r]=n[r]),t},{})}function O(n){return xn(I(n,void 0,X),n+"");
}function x(n,t,r){var e=-1,u=n.length;for(0>t&&(t=-t>u?0:u+t),r=r>u?u:r,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Array(u);++e<u;)r[e]=n[e+t];return r}function A(n){return x(n,0,n.length)}function E(n,t){var r;return mn(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function w(n,r){return C(r,function(n,r){return r.func.apply(r.thisArg,t([n],r.args))},n)}function k(n,t,r){var e=!r;r||(r={});for(var u=-1,o=t.length;++u<o;){var i=t[u],c=Z;if(c===Z&&(c=n[i]),e)r[i]=c;else{var f=r,a=f[i];pn.call(f,i)&&J(a,c)&&(c!==Z||i in f)||(f[i]=c);
}}return r}function N(n){return O(function(t,r){var e=-1,u=r.length,o=1<u?r[u-1]:Z,o=3<n.length&&typeof o=="function"?(u--,o):Z;for(t=Object(t);++e<u;){var i=r[e];i&&n(t,i,e,o)}return t})}function F(n){return function(){var t=arguments,r=dn(n.prototype),t=n.apply(r,t);return V(t)?t:r}}function S(n,t,r){function e(){for(var o=-1,i=arguments.length,c=-1,f=r.length,a=Array(f+i),l=this&&this!==on&&this instanceof e?u:n;++c<f;)a[c]=r[c];for(;i--;)a[c++]=arguments[++o];return l.apply(t,a)}if(typeof n!="function")throw new TypeError("Expected a function");
var u=F(n);return e}function T(n,t,r,e,u,o){var i=n.length,c=t.length;if(i!=c&&!(1&r&&c>i))return false;for(var c=-1,f=true,a=2&r?[]:Z;++c<i;){var l=n[c],p=t[c];if(void 0!==Z){f=false;break}if(a){if(!E(t,function(n,t){if(!P(a,t)&&(l===n||u(l,n,r,e,o)))return a.push(t)})){f=false;break}}else if(l!==p&&!u(l,p,r,e,o)){f=false;break}}return f}function B(n,t,r,e,u,o){var i=1&r,c=Dn(n),f=c.length,a=Dn(t).length;if(f!=a&&!i)return false;for(var l=f;l--;){var p=c[l];if(!(i?p in t:pn.call(t,p)))return false}for(a=true;++l<f;){var p=c[l],s=n[p],h=t[p];
if(void 0!==Z||s!==h&&!u(s,h,r,e,o)){a=false;break}i||(i="constructor"==p)}return a&&!i&&(r=n.constructor,e=t.constructor,r!=e&&"constructor"in n&&"constructor"in t&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(a=false)),a}function R(t){return Nn(t)||n(t)}function D(n){var t=[];if(null!=n)for(var r in Object(n))t.push(r);return t}function I(n,t,r){return t=jn(t===Z?n.length-1:t,0),function(){for(var e=arguments,u=-1,o=jn(e.length-t,0),i=Array(o);++u<o;)i[u]=e[t+u];for(u=-1,
o=Array(t+1);++u<t;)o[u]=e[u];return o[t]=r(i),n.apply(this,o)}}function $(n){return(null==n?0:n.length)?p(n,1):[]}function q(n){return n&&n.length?n[0]:Z}function P(n,t,r){var e=null==n?0:n.length;r=typeof r=="number"?0>r?jn(e+r,0):r:0,r=(r||0)-1;for(var u=t===t;++r<e;){var o=n[r];if(u?o===t:o!==o)return r}return-1}function z(n,t){return mn(n,g(t))}function C(n,t,r){return e(n,g(t),r,3>arguments.length,mn)}function G(n,t){var r;if(typeof t!="function")throw new TypeError("Expected a function");return n=Fn(n),
function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=Z),r}}function J(n,t){return n===t||n!==n&&t!==t}function M(n){var t;return(t=null!=n)&&(t=n.length,t=typeof t=="number"&&-1<t&&0==t%1&&9007199254740991>=t),t&&!U(n)}function U(n){return!!V(n)&&(n=hn.call(n),"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n)}function V(n){var t=typeof n;return null!=n&&("object"==t||"function"==t)}function H(n){return null!=n&&typeof n=="object"}function K(n){
return typeof n=="number"||H(n)&&"[object Number]"==hn.call(n)}function L(n){return typeof n=="string"||!Nn(n)&&H(n)&&"[object String]"==hn.call(n)}function Q(n){return typeof n=="string"?n:null==n?"":n+""}function W(n){return null==n?[]:u(n,Dn(n))}function X(n){return n}function Y(n,r,e){var u=Dn(r),o=h(r,u);null!=e||V(r)&&(o.length||!u.length)||(e=r,r=n,n=this,o=h(r,Dn(r)));var i=!(V(e)&&"chain"in e&&!e.chain),c=U(n);return mn(o,function(e){var u=r[e];n[e]=u,c&&(n.prototype[e]=function(){var r=this.__chain__;
if(i||r){var e=n(this.__wrapped__);return(e.__actions__=A(this.__actions__)).push({func:u,args:arguments,thisArg:n}),e.__chain__=r,e}return u.apply(n,t([this.value()],arguments))})}),n}var Z,nn=1/0,tn=/[&<>"']/g,rn=RegExp(tn.source),en=/^(?:0|[1-9]\d*)$/,un=typeof self=="object"&&self&&self.Object===Object&&self,on=typeof global=="object"&&global&&global.Object===Object&&global||un||Function("return this")(),cn=(un=typeof exports=="object"&&exports&&!exports.nodeType&&exports)&&typeof module=="object"&&module&&!module.nodeType&&module,fn=function(n){
return function(t){return null==n?Z:n[t]}}({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}),an=Array.prototype,ln=Object.prototype,pn=ln.hasOwnProperty,sn=0,hn=ln.toString,vn=on._,bn=Object.create,yn=ln.propertyIsEnumerable,gn=on.isFinite,_n=function(n,t){return function(r){return n(t(r))}}(Object.keys,Object),jn=Math.max,dn=function(){function n(){}return function(t){return V(t)?bn?bn(t):(n.prototype=t,t=new n,n.prototype=Z,t):{}}}();i.prototype=dn(o.prototype),i.prototype.constructor=i;
var mn=function(n,t){return function(r,e){if(null==r)return r;if(!M(r))return n(r,e);for(var u=r.length,o=t?u:-1,i=Object(r);(t?o--:++o<u)&&false!==e(i[o],o,i););return r}}(s),On=function(n){return function(t,r,e){var u=-1,o=Object(t);e=e(t);for(var i=e.length;i--;){var c=e[n?i:++u];if(false===r(o[c],c,o))break}return t}}(),xn=X,An=function(n){return function(t,r,e){var u=Object(t);if(!M(t)){var o=g(r);t=Dn(t),r=function(n){return o(u[n],n,u)}}return r=n(t,r,e),-1<r?u[o?t[r]:r]:Z}}(function(n,t,r){var e=null==n?0:n.length;
if(!e)return-1;r=null==r?0:Fn(r),0>r&&(r=jn(e+r,0));n:{for(t=g(t),e=n.length,r+=-1;++r<e;)if(t(n[r],r,n)){n=r;break n}n=-1}return n}),En=O(function(n,t,r){return S(n,t,r)}),wn=O(function(n,t){return c(n,1,t)}),kn=O(function(n,t,r){return c(n,Sn(t)||0,r)}),Nn=Array.isArray,Fn=Number,Sn=Number,Tn=N(function(n,t){k(t,_n(t),n)}),Bn=N(function(n,t){k(t,D(t),n)}),Rn=O(function(n,t){n=Object(n);var r,e=-1,u=t.length,o=2<u?t[2]:Z;if(r=o){r=t[0];var i=t[1];if(V(o)){var c=typeof i;if("number"==c){if(c=M(o))var c=o.length,f=typeof i,c=null==c?9007199254740991:c,c=!!c&&("number"==f||"symbol"!=f&&en.test(i))&&-1<i&&0==i%1&&i<c;
}else c="string"==c&&i in o;r=!!c&&J(o[i],r)}else r=false}for(r&&(u=1);++e<u;)for(o=t[e],r=In(o),i=-1,c=r.length;++i<c;){var f=r[i],a=n[f];(a===Z||J(a,ln[f])&&!pn.call(n,f))&&(n[f]=o[f])}return n}),Dn=_n,In=D,$n=function(n){return xn(I(n,Z,$),n+"")}(function(n,t){return null==n?{}:m(n,t)});o.assignIn=Bn,o.before=G,o.bind=En,o.chain=function(n){return n=o(n),n.__chain__=true,n},o.compact=function(n){return l(n,Boolean)},o.concat=function(){var n=arguments.length;if(!n)return[];for(var r=Array(n-1),e=arguments[0];n--;)r[n-1]=arguments[n];
return t(Nn(e)?A(e):[e],p(r,1))},o.create=function(n,t){var r=dn(n);return null==t?r:Tn(r,t)},o.defaults=Rn,o.defer=wn,o.delay=kn,o.filter=function(n,t){return l(n,g(t))},o.flatten=$,o.flattenDeep=function(n){return(null==n?0:n.length)?p(n,nn):[]},o.iteratee=g,o.keys=Dn,o.map=function(n,t){return j(n,g(t))},o.matches=function(n){return d(Tn({},n))},o.mixin=Y,o.negate=function(n){if(typeof n!="function")throw new TypeError("Expected a function");return function(){return!n.apply(this,arguments)}},o.once=function(n){
return G(2,n)},o.pick=$n,o.slice=function(n,t,r){var e=null==n?0:n.length;return r=r===Z?e:+r,e?x(n,null==t?0:+t,r):[]},o.sortBy=function(n,t){var e=0;return t=g(t),j(j(n,function(n,r,u){return{value:n,index:e++,criteria:t(n,r,u)}}).sort(function(n,t){var r;n:{r=n.criteria;var e=t.criteria;if(r!==e){var u=r!==Z,o=null===r,i=r===r,c=e!==Z,f=null===e,a=e===e;if(!f&&r>e||o&&c&&a||!u&&a||!i){r=1;break n}if(!o&&r<e||f&&u&&i||!c&&i||!a){r=-1;break n}}r=0}return r||n.index-t.index}),r("value"))},o.tap=function(n,t){
return t(n),n},o.thru=function(n,t){return t(n)},o.toArray=function(n){return M(n)?n.length?A(n):[]:W(n)},o.values=W,o.extend=Bn,Y(o,o),o.clone=function(n){return V(n)?Nn(n)?A(n):k(n,_n(n)):n},o.escape=function(n){return(n=Q(n))&&rn.test(n)?n.replace(tn,fn):n},o.every=function(n,t,r){return t=r?Z:t,f(n,g(t))},o.find=An,o.forEach=z,o.has=function(n,t){return null!=n&&pn.call(n,t)},o.head=q,o.identity=X,o.indexOf=P,o.isArguments=n,o.isArray=Nn,o.isBoolean=function(n){return true===n||false===n||H(n)&&"[object Boolean]"==hn.call(n);
},o.isDate=function(n){return H(n)&&"[object Date]"==hn.call(n)},o.isEmpty=function(t){return M(t)&&(Nn(t)||L(t)||U(t.splice)||n(t))?!t.length:!_n(t).length},o.isEqual=function(n,t){return b(n,t)},o.isFinite=function(n){return typeof n=="number"&&gn(n)},o.isFunction=U,o.isNaN=function(n){return K(n)&&n!=+n},o.isNull=function(n){return null===n},o.isNumber=K,o.isObject=V,o.isRegExp=function(n){return H(n)&&"[object RegExp]"==hn.call(n)},o.isString=L,o.isUndefined=function(n){return n===Z},o.last=function(n){
var t=null==n?0:n.length;return t?n[t-1]:Z},o.max=function(n){return n&&n.length?a(n,X,v):Z},o.min=function(n){return n&&n.length?a(n,X,_):Z},o.noConflict=function(){return on._===this&&(on._=vn),this},o.noop=function(){},o.reduce=C,o.result=function(n,t,r){return t=null==n?Z:n[t],t===Z&&(t=r),U(t)?t.call(n):t},o.size=function(n){return null==n?0:(n=M(n)?n:_n(n),n.length)},o.some=function(n,t,r){return t=r?Z:t,E(n,g(t))},o.uniqueId=function(n){var t=++sn;return Q(n)+t},o.each=z,o.first=q,Y(o,function(){
var n={};return s(o,function(t,r){pn.call(o.prototype,r)||(n[r]=t)}),n}(),{chain:false}),o.VERSION="4.17.15",mn("pop join replace reverse split push shift sort splice unshift".split(" "),function(n){var t=(/^(?:replace|split)$/.test(n)?String.prototype:an)[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|join|replace|shift)$/.test(n);o.prototype[n]=function(){var n=arguments;if(e&&!this.__chain__){var u=this.value();return t.apply(Nn(u)?u:[],n)}return this[r](function(r){return t.apply(Nn(r)?r:[],n);
})}}),o.prototype.toJSON=o.prototype.valueOf=o.prototype.value=function(){return w(this.__wrapped__,this.__actions__)},typeof define=="function"&&typeof define.amd=="object"&&define.amd?(on._=o, define(function(){return o})):cn?((cn.exports=o)._=o,un._=o):on._=o}).call(this);

/*!
 * validate.js 0.13.1
 * http://validatejs.org/
 * (c) 2013-2015 Nicklas Ansman, 2013 Wrapp
 * validate.js may be freely distributed under the MIT license.
*/

(function(a,b,c){"use strict";var d=function(a,b,c){c=e.extend({},e.options,c);var f=e.runValidations(a,b,c);if(f.some(function(a){return e.isPromise(a.error)}))throw new Error("Use validate.async if you want support for promises");return d.processValidationResults(f,c)},e=d;e.extend=function(a){return[].slice.call(arguments,1).forEach(function(b){for(var c in b)a[c]=b[c]}),a},e.extend(d,{version:{major:0,minor:13,patch:1,metadata:null,toString:function(){var a=e.format("%{major}.%{minor}.%{patch}",e.version);return e.isEmpty(e.version.metadata)||(a+="+"+e.version.metadata),a}},Promise:"undefined"!=typeof Promise?Promise:null,EMPTY_STRING_REGEXP:/^\s*$/,runValidations:function(a,b,c){var d,f,g,h,i,j,k,l=[];(e.isDomElement(a)||e.isJqueryElement(a))&&(a=e.collectFormValues(a));for(d in b){g=e.getDeepObjectValue(a,d),h=e.result(b[d],g,a,d,c,b);for(f in h){if(i=e.validators[f],!i)throw k=e.format("Unknown validator %{name}",{name:f}),new Error(k);j=h[f],j=e.result(j,g,a,d,c,b),j&&l.push({attribute:d,value:g,validator:f,globalOptions:c,attributes:a,options:j,error:i.call(i,g,j,d,a,c)})}}return l},processValidationResults:function(a,b){a=e.pruneEmptyErrors(a,b),a=e.expandMultipleErrors(a,b),a=e.convertErrorMessages(a,b);var c=b.format||"grouped";if("function"!=typeof e.formatters[c])throw new Error(e.format("Unknown format %{format}",b));return a=e.formatters[c](a),e.isEmpty(a)?void 0:a},async:function(a,b,c){c=e.extend({},e.async.options,c);var d=c.wrapErrors||function(a){return a};c.cleanAttributes!==!1&&(a=e.cleanAttributes(a,b));var f=e.runValidations(a,b,c);return new e.Promise(function(g,h){e.waitForResults(f).then(function(){var i=e.processValidationResults(f,c);i?h(new d(i,c,a,b)):g(a)},function(a){h(a)})})},single:function(a,b,c){return c=e.extend({},e.single.options,c,{format:"flat",fullMessages:!1}),e({single:a},{single:b},c)},waitForResults:function(a){return a.reduce(function(a,b){return e.isPromise(b.error)?a.then(function(){return b.error.then(function(a){b.error=a||null})}):a},new e.Promise(function(a){a()}))},result:function(a){var b=[].slice.call(arguments,1);return"function"==typeof a&&(a=a.apply(null,b)),a},isNumber:function(a){return"number"==typeof a&&!isNaN(a)},isFunction:function(a){return"function"==typeof a},isInteger:function(a){return e.isNumber(a)&&a%1===0},isBoolean:function(a){return"boolean"==typeof a},isObject:function(a){return a===Object(a)},isDate:function(a){return a instanceof Date},isDefined:function(a){return null!==a&&void 0!==a},isPromise:function(a){return!!a&&e.isFunction(a.then)},isJqueryElement:function(a){return a&&e.isString(a.jquery)},isDomElement:function(a){return!!a&&(!(!a.querySelectorAll||!a.querySelector)&&(!(!e.isObject(document)||a!==document)||("object"==typeof HTMLElement?a instanceof HTMLElement:a&&"object"==typeof a&&null!==a&&1===a.nodeType&&"string"==typeof a.nodeName)))},isEmpty:function(a){var b;if(!e.isDefined(a))return!0;if(e.isFunction(a))return!1;if(e.isString(a))return e.EMPTY_STRING_REGEXP.test(a);if(e.isArray(a))return 0===a.length;if(e.isDate(a))return!1;if(e.isObject(a)){for(b in a)return!1;return!0}return!1},format:e.extend(function(a,b){return e.isString(a)?a.replace(e.format.FORMAT_REGEXP,function(a,c,d){return"%"===c?"%{"+d+"}":String(b[d])}):a},{FORMAT_REGEXP:/(%?)%\{([^\}]+)\}/g}),prettify:function(a){return e.isNumber(a)?100*a%1===0?""+a:parseFloat(Math.round(100*a)/100).toFixed(2):e.isArray(a)?a.map(function(a){return e.prettify(a)}).join(", "):e.isObject(a)?e.isDefined(a.toString)?a.toString():JSON.stringify(a):(a=""+a,a.replace(/([^\s])\.([^\s])/g,"$1 $2").replace(/\\+/g,"").replace(/[_-]/g," ").replace(/([a-z])([A-Z])/g,function(a,b,c){return""+b+" "+c.toLowerCase()}).toLowerCase())},stringifyValue:function(a,b){var c=b&&b.prettify||e.prettify;return c(a)},isString:function(a){return"string"==typeof a},isArray:function(a){return"[object Array]"==={}.toString.call(a)},isHash:function(a){return e.isObject(a)&&!e.isArray(a)&&!e.isFunction(a)},contains:function(a,b){return!!e.isDefined(a)&&(e.isArray(a)?a.indexOf(b)!==-1:b in a)},unique:function(a){return e.isArray(a)?a.filter(function(a,b,c){return c.indexOf(a)==b}):a},forEachKeyInKeypath:function(a,b,c){if(e.isString(b)){var d,f="",g=!1;for(d=0;d<b.length;++d)switch(b[d]){case".":g?(g=!1,f+="."):(a=c(a,f,!1),f="");break;case"\\":g?(g=!1,f+="\\"):g=!0;break;default:g=!1,f+=b[d]}return c(a,f,!0)}},getDeepObjectValue:function(a,b){if(e.isObject(a))return e.forEachKeyInKeypath(a,b,function(a,b){if(e.isObject(a))return a[b]})},collectFormValues:function(a,b){var c,d,f,g,h,i,j={};if(e.isJqueryElement(a)&&(a=a[0]),!a)return j;for(b=b||{},g=a.querySelectorAll("input[name], textarea[name]"),c=0;c<g.length;++c)if(f=g.item(c),!e.isDefined(f.getAttribute("data-ignored"))){var k=f.name.replace(/\./g,"\\\\.");i=e.sanitizeFormValue(f.value,b),"number"===f.type?i=i?+i:null:"checkbox"===f.type?f.attributes.value?f.checked||(i=j[k]||null):i=f.checked:"radio"===f.type&&(f.checked||(i=j[k]||null)),j[k]=i}for(g=a.querySelectorAll("select[name]"),c=0;c<g.length;++c)if(f=g.item(c),!e.isDefined(f.getAttribute("data-ignored"))){if(f.multiple){i=[];for(d in f.options)h=f.options[d],h&&h.selected&&i.push(e.sanitizeFormValue(h.value,b))}else{var l="undefined"!=typeof f.options[f.selectedIndex]?f.options[f.selectedIndex].value:"";i=e.sanitizeFormValue(l,b)}j[f.name]=i}return j},sanitizeFormValue:function(a,b){return b.trim&&e.isString(a)&&(a=a.trim()),b.nullify!==!1&&""===a?null:a},capitalize:function(a){return e.isString(a)?a[0].toUpperCase()+a.slice(1):a},pruneEmptyErrors:function(a){return a.filter(function(a){return!e.isEmpty(a.error)})},expandMultipleErrors:function(a){var b=[];return a.forEach(function(a){e.isArray(a.error)?a.error.forEach(function(c){b.push(e.extend({},a,{error:c}))}):b.push(a)}),b},convertErrorMessages:function(a,b){b=b||{};var c=[],d=b.prettify||e.prettify;return a.forEach(function(a){var f=e.result(a.error,a.value,a.attribute,a.options,a.attributes,a.globalOptions);return e.isString(f)?("^"===f[0]?f=f.slice(1):b.fullMessages!==!1&&(f=e.capitalize(d(a.attribute))+" "+f),f=f.replace(/\\\^/g,"^"),f=e.format(f,{value:e.stringifyValue(a.value,b)}),void c.push(e.extend({},a,{error:f}))):void c.push(a)}),c},groupErrorsByAttribute:function(a){var b={};return a.forEach(function(a){var c=b[a.attribute];c?c.push(a):b[a.attribute]=[a]}),b},flattenErrorsToArray:function(a){return a.map(function(a){return a.error}).filter(function(a,b,c){return c.indexOf(a)===b})},cleanAttributes:function(a,b){function c(a,b,c){return e.isObject(a[b])?a[b]:a[b]=!!c||{}}function d(a){var b,d={};for(b in a)a[b]&&e.forEachKeyInKeypath(d,b,c);return d}function f(a,b){if(!e.isObject(a))return a;var c,d,g=e.extend({},a);for(d in a)c=b[d],e.isObject(c)?g[d]=f(g[d],c):c||delete g[d];return g}return e.isObject(b)&&e.isObject(a)?(b=d(b),f(a,b)):{}},exposeModule:function(a,b,c,d,e){c?(d&&d.exports&&(c=d.exports=a),c.validate=a):(b.validate=a,a.isFunction(e)&&e.amd&&e([],function(){return a}))},warn:function(a){"undefined"!=typeof console&&console.warn&&console.warn("[validate.js] "+a)},error:function(a){"undefined"!=typeof console&&console.error&&console.error("[validate.js] "+a)}}),d.validators={presence:function(a,b){if(b=e.extend({},this.options,b),b.allowEmpty!==!1?!e.isDefined(a):e.isEmpty(a))return b.message||this.message||"can't be blank"},length:function(a,b,c){if(e.isDefined(a)){b=e.extend({},this.options,b);var d,f=b.is,g=b.maximum,h=b.minimum,i=b.tokenizer||function(a){return a},j=[];a=i(a);var k=a.length;return e.isNumber(k)?(e.isNumber(f)&&k!==f&&(d=b.wrongLength||this.wrongLength||"is the wrong length (should be %{count} characters)",j.push(e.format(d,{count:f}))),e.isNumber(h)&&k<h&&(d=b.tooShort||this.tooShort||"is too short (minimum is %{count} characters)",j.push(e.format(d,{count:h}))),e.isNumber(g)&&k>g&&(d=b.tooLong||this.tooLong||"is too long (maximum is %{count} characters)",j.push(e.format(d,{count:g}))),j.length>0?b.message||j:void 0):b.message||this.notValid||"has an incorrect length"}},numericality:function(a,b,c,d,f){if(e.isDefined(a)){b=e.extend({},this.options,b);var g,h,i=[],j={greaterThan:function(a,b){return a>b},greaterThanOrEqualTo:function(a,b){return a>=b},equalTo:function(a,b){return a===b},lessThan:function(a,b){return a<b},lessThanOrEqualTo:function(a,b){return a<=b},divisibleBy:function(a,b){return a%b===0}},k=b.prettify||f&&f.prettify||e.prettify;if(e.isString(a)&&b.strict){var l="^-?(0|[1-9]\\d*)";if(b.onlyInteger||(l+="(\\.\\d+)?"),l+="$",!new RegExp(l).test(a))return b.message||b.notValid||this.notValid||this.message||"must be a valid number"}if(b.noStrings!==!0&&e.isString(a)&&!e.isEmpty(a)&&(a=+a),!e.isNumber(a))return b.message||b.notValid||this.notValid||this.message||"is not a number";if(b.onlyInteger&&!e.isInteger(a))return b.message||b.notInteger||this.notInteger||this.message||"must be an integer";for(g in j)if(h=b[g],e.isNumber(h)&&!j[g](a,h)){var m="not"+e.capitalize(g),n=b[m]||this[m]||this.message||"must be %{type} %{count}";i.push(e.format(n,{count:h,type:k(g)}))}return b.odd&&a%2!==1&&i.push(b.notOdd||this.notOdd||this.message||"must be odd"),b.even&&a%2!==0&&i.push(b.notEven||this.notEven||this.message||"must be even"),i.length?b.message||i:void 0}},datetime:e.extend(function(a,b){if(!e.isFunction(this.parse)||!e.isFunction(this.format))throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator");if(e.isDefined(a)){b=e.extend({},this.options,b);var c,d=[],f=b.earliest?this.parse(b.earliest,b):NaN,g=b.latest?this.parse(b.latest,b):NaN;return a=this.parse(a,b),isNaN(a)||b.dateOnly&&a%864e5!==0?(c=b.notValid||b.message||this.notValid||"must be a valid date",e.format(c,{value:arguments[0]})):(!isNaN(f)&&a<f&&(c=b.tooEarly||b.message||this.tooEarly||"must be no earlier than %{date}",c=e.format(c,{value:this.format(a,b),date:this.format(f,b)}),d.push(c)),!isNaN(g)&&a>g&&(c=b.tooLate||b.message||this.tooLate||"must be no later than %{date}",c=e.format(c,{date:this.format(g,b),value:this.format(a,b)}),d.push(c)),d.length?e.unique(d):void 0)}},{parse:null,format:null}),date:function(a,b){return b=e.extend({},b,{dateOnly:!0}),e.validators.datetime.call(e.validators.datetime,a,b)},format:function(a,b){(e.isString(b)||b instanceof RegExp)&&(b={pattern:b}),b=e.extend({},this.options,b);var c,d=b.message||this.message||"is invalid",f=b.pattern;if(e.isDefined(a))return e.isString(a)?(e.isString(f)&&(f=new RegExp(b.pattern,b.flags)),c=f.exec(a),c&&c[0].length==a.length?void 0:d):d},inclusion:function(a,b){if(e.isDefined(a)&&(e.isArray(b)&&(b={within:b}),b=e.extend({},this.options,b),!e.contains(b.within,a))){var c=b.message||this.message||"^%{value} is not included in the list";return e.format(c,{value:a})}},exclusion:function(a,b){if(e.isDefined(a)&&(e.isArray(b)&&(b={within:b}),b=e.extend({},this.options,b),e.contains(b.within,a))){var c=b.message||this.message||"^%{value} is restricted";return e.isString(b.within[a])&&(a=b.within[a]),e.format(c,{value:a})}},email:e.extend(function(a,b){b=e.extend({},this.options,b);var c=b.message||this.message||"is not a valid email";if(e.isDefined(a))return e.isString(a)&&this.PATTERN.exec(a)?void 0:c},{PATTERN:/^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i}),equality:function(a,b,c,d,f){if(e.isDefined(a)){e.isString(b)&&(b={attribute:b}),b=e.extend({},this.options,b);var g=b.message||this.message||"is not equal to %{attribute}";if(e.isEmpty(b.attribute)||!e.isString(b.attribute))throw new Error("The attribute must be a non empty string");var h=e.getDeepObjectValue(d,b.attribute),i=b.comparator||function(a,b){return a===b},j=b.prettify||f&&f.prettify||e.prettify;return i(a,h,b,c,d)?void 0:e.format(g,{attribute:j(b.attribute)})}},url:function(a,b){if(e.isDefined(a)){b=e.extend({},this.options,b);var c=b.message||this.message||"is not a valid url",d=b.schemes||this.schemes||["http","https"],f=b.allowLocal||this.allowLocal||!1,g=b.allowDataUrl||this.allowDataUrl||!1;if(!e.isString(a))return c;var h="^(?:(?:"+d.join("|")+")://)(?:\\S+(?::\\S*)?@)?(?:",i="(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";if(f?i+="?":h+="(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})",h+="(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*"+i+")(?::\\d{2,5})?(?:[/?#]\\S*)?$",g){var j="\\w+\\/[-+.\\w]+(?:;[\\w=]+)*",k="[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*",l="data:(?:"+j+")?(?:;base64)?,"+k;h="(?:"+h+")|(?:^"+l+"$)"}var m=new RegExp(h,"i");return m.exec(a)?void 0:c}},type:e.extend(function(a,b,c,d,f){if(e.isString(b)&&(b={type:b}),e.isDefined(a)){var g=e.extend({},this.options,b),h=g.type;if(!e.isDefined(h))throw new Error("No type was specified");var i;if(i=e.isFunction(h)?h:this.types[h],!e.isFunction(i))throw new Error("validate.validators.type.types."+h+" must be a function.");if(!i(a,g,c,d,f)){var j=b.message||this.messages[h]||this.message||g.message||(e.isFunction(h)?"must be of the correct type":"must be of type %{type}");return e.isFunction(j)&&(j=j(a,b,c,d,f)),e.format(j,{attribute:e.prettify(c),type:h})}}},{types:{object:function(a){return e.isObject(a)&&!e.isArray(a)},array:e.isArray,integer:e.isInteger,number:e.isNumber,string:e.isString,date:e.isDate,"boolean":e.isBoolean},messages:{}})},d.formatters={detailed:function(a){return a},flat:e.flattenErrorsToArray,grouped:function(a){var b;a=e.groupErrorsByAttribute(a);for(b in a)a[b]=e.flattenErrorsToArray(a[b]);return a},constraint:function(a){var b;a=e.groupErrorsByAttribute(a);for(b in a)a[b]=a[b].map(function(a){return a.validator}).sort();return a}},d.exposeModule(d,this,a,b,c)}).call(this,"undefined"!=typeof exports?exports:null,"undefined"!=typeof module?module:null,"undefined"!=typeof define?define:null);


/* flatpickr v4.6.3,, @license MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).flatpickr=t()}(this,function(){"use strict";var e=function(){return(e=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},t=["onChange","onClose","onDayCreate","onDestroy","onKeyDown","onMonthChange","onOpen","onParseConfig","onReady","onValueUpdate","onYearChange","onPreCalendarPosition"],n={_disable:[],_enable:[],allowInput:!1,altFormat:"F j, Y",altInput:!1,altInputClass:"form-control input",animate:"object"==typeof window&&-1===window.navigator.userAgent.indexOf("MSIE"),ariaDateFormat:"F j, Y",clickOpens:!0,closeOnSelect:!0,conjunction:", ",dateFormat:"Y-m-d",defaultHour:12,defaultMinute:0,defaultSeconds:0,disable:[],disableMobile:!1,enable:[],enableSeconds:!1,enableTime:!1,errorHandler:function(e){return"undefined"!=typeof console&&console.warn(e)},getWeek:function(e){var t=new Date(e.getTime());t.setHours(0,0,0,0),t.setDate(t.getDate()+3-(t.getDay()+6)%7);var n=new Date(t.getFullYear(),0,4);return 1+Math.round(((t.getTime()-n.getTime())/864e5-3+(n.getDay()+6)%7)/7)},hourIncrement:1,ignoredFocusElements:[],inline:!1,locale:"default",minuteIncrement:5,mode:"single",monthSelectorType:"dropdown",nextArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",noCalendar:!1,now:new Date,onChange:[],onClose:[],onDayCreate:[],onDestroy:[],onKeyDown:[],onMonthChange:[],onOpen:[],onParseConfig:[],onReady:[],onValueUpdate:[],onYearChange:[],onPreCalendarPosition:[],plugins:[],position:"auto",positionElement:void 0,prevArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",shorthandCurrentMonth:!1,showMonths:1,static:!1,time_24hr:!1,weekNumbers:!1,wrap:!1},a={weekdays:{shorthand:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longhand:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},months:{shorthand:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longhand:["January","February","March","April","May","June","July","August","September","October","November","December"]},daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],firstDayOfWeek:0,ordinal:function(e){var t=e%100;if(t>3&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},rangeSeparator:" to ",weekAbbreviation:"Wk",scrollTitle:"Scroll to increment",toggleTitle:"Click to toggle",amPM:["AM","PM"],yearAriaLabel:"Year",hourAriaLabel:"Hour",minuteAriaLabel:"Minute",time_24hr:!1},i=function(e){return("0"+e).slice(-2)},o=function(e){return!0===e?1:0};function r(e,t,n){var a;return void 0===n&&(n=!1),function(){var i=this,o=arguments;null!==a&&clearTimeout(a),a=window.setTimeout(function(){a=null,n||e.apply(i,o)},t),n&&!a&&e.apply(i,o)}}var l=function(e){return e instanceof Array?e:[e]};function c(e,t,n){if(!0===n)return e.classList.add(t);e.classList.remove(t)}function d(e,t,n){var a=window.document.createElement(e);return t=t||"",n=n||"",a.className=t,void 0!==n&&(a.textContent=n),a}function s(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function u(e,t){var n=d("div","numInputWrapper"),a=d("input","numInput "+e),i=d("span","arrowUp"),o=d("span","arrowDown");if(-1===navigator.userAgent.indexOf("MSIE 9.0")?a.type="number":(a.type="text",a.pattern="\\d*"),void 0!==t)for(var r in t)a.setAttribute(r,t[r]);return n.appendChild(a),n.appendChild(i),n.appendChild(o),n}var f=function(){},m=function(e,t,n){return n.months[t?"shorthand":"longhand"][e]},g={D:f,F:function(e,t,n){e.setMonth(n.months.longhand.indexOf(t))},G:function(e,t){e.setHours(parseFloat(t))},H:function(e,t){e.setHours(parseFloat(t))},J:function(e,t){e.setDate(parseFloat(t))},K:function(e,t,n){e.setHours(e.getHours()%12+12*o(new RegExp(n.amPM[1],"i").test(t)))},M:function(e,t,n){e.setMonth(n.months.shorthand.indexOf(t))},S:function(e,t){e.setSeconds(parseFloat(t))},U:function(e,t){return new Date(1e3*parseFloat(t))},W:function(e,t,n){var a=parseInt(t),i=new Date(e.getFullYear(),0,2+7*(a-1),0,0,0,0);return i.setDate(i.getDate()-i.getDay()+n.firstDayOfWeek),i},Y:function(e,t){e.setFullYear(parseFloat(t))},Z:function(e,t){return new Date(t)},d:function(e,t){e.setDate(parseFloat(t))},h:function(e,t){e.setHours(parseFloat(t))},i:function(e,t){e.setMinutes(parseFloat(t))},j:function(e,t){e.setDate(parseFloat(t))},l:f,m:function(e,t){e.setMonth(parseFloat(t)-1)},n:function(e,t){e.setMonth(parseFloat(t)-1)},s:function(e,t){e.setSeconds(parseFloat(t))},u:function(e,t){return new Date(parseFloat(t))},w:f,y:function(e,t){e.setFullYear(2e3+parseFloat(t))}},p={D:"(\\w+)",F:"(\\w+)",G:"(\\d\\d|\\d)",H:"(\\d\\d|\\d)",J:"(\\d\\d|\\d)\\w+",K:"",M:"(\\w+)",S:"(\\d\\d|\\d)",U:"(.+)",W:"(\\d\\d|\\d)",Y:"(\\d{4})",Z:"(.+)",d:"(\\d\\d|\\d)",h:"(\\d\\d|\\d)",i:"(\\d\\d|\\d)",j:"(\\d\\d|\\d)",l:"(\\w+)",m:"(\\d\\d|\\d)",n:"(\\d\\d|\\d)",s:"(\\d\\d|\\d)",u:"(.+)",w:"(\\d\\d|\\d)",y:"(\\d{2})"},h={Z:function(e){return e.toISOString()},D:function(e,t,n){return t.weekdays.shorthand[h.w(e,t,n)]},F:function(e,t,n){return m(h.n(e,t,n)-1,!1,t)},G:function(e,t,n){return i(h.h(e,t,n))},H:function(e){return i(e.getHours())},J:function(e,t){return void 0!==t.ordinal?e.getDate()+t.ordinal(e.getDate()):e.getDate()},K:function(e,t){return t.amPM[o(e.getHours()>11)]},M:function(e,t){return m(e.getMonth(),!0,t)},S:function(e){return i(e.getSeconds())},U:function(e){return e.getTime()/1e3},W:function(e,t,n){return n.getWeek(e)},Y:function(e){return e.getFullYear()},d:function(e){return i(e.getDate())},h:function(e){return e.getHours()%12?e.getHours()%12:12},i:function(e){return i(e.getMinutes())},j:function(e){return e.getDate()},l:function(e,t){return t.weekdays.longhand[e.getDay()]},m:function(e){return i(e.getMonth()+1)},n:function(e){return e.getMonth()+1},s:function(e){return e.getSeconds()},u:function(e){return e.getTime()},w:function(e){return e.getDay()},y:function(e){return String(e.getFullYear()).substring(2)}},v=function(e){var t=e.config,i=void 0===t?n:t,o=e.l10n,r=void 0===o?a:o;return function(e,t,n){var a=n||r;return void 0!==i.formatDate?i.formatDate(e,t,a):t.split("").map(function(t,n,o){return h[t]&&"\\"!==o[n-1]?h[t](e,a,i):"\\"!==t?t:""}).join("")}},D=function(e){var t=e.config,i=void 0===t?n:t,o=e.l10n,r=void 0===o?a:o;return function(e,t,a,o){if(0===e||e){var l,c=o||r,d=e;if(e instanceof Date)l=new Date(e.getTime());else if("string"!=typeof e&&void 0!==e.toFixed)l=new Date(e);else if("string"==typeof e){var s=t||(i||n).dateFormat,u=String(e).trim();if("today"===u)l=new Date,a=!0;else if(/Z$/.test(u)||/GMT$/.test(u))l=new Date(e);else if(i&&i.parseDate)l=i.parseDate(e,s);else{l=i&&i.noCalendar?new Date((new Date).setHours(0,0,0,0)):new Date((new Date).getFullYear(),0,1,0,0,0,0);for(var f=void 0,m=[],h=0,v=0,D="";h<s.length;h++){var w=s[h],b="\\"===w,C="\\"===s[h-1]||b;if(p[w]&&!C){D+=p[w];var M=new RegExp(D).exec(e);M&&(f=!0)&&m["Y"!==w?"push":"unshift"]({fn:g[w],val:M[++v]})}else b||(D+=".");m.forEach(function(e){var t=e.fn,n=e.val;return l=t(l,n,c)||l})}l=f?l:void 0}}if(l instanceof Date&&!isNaN(l.getTime()))return!0===a&&l.setHours(0,0,0,0),l;i.errorHandler(new Error("Invalid date provided: "+d))}}};function w(e,t,n){return void 0===n&&(n=!0),!1!==n?new Date(e.getTime()).setHours(0,0,0,0)-new Date(t.getTime()).setHours(0,0,0,0):e.getTime()-t.getTime()}var b=function(e,t,n){return e>Math.min(t,n)&&e<Math.max(t,n)},C={DAY:864e5};"function"!=typeof Object.assign&&(Object.assign=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(!e)throw TypeError("Cannot convert undefined or null to object");for(var a=function(t){t&&Object.keys(t).forEach(function(n){return e[n]=t[n]})},i=0,o=t;i<o.length;i++){a(o[i])}return e});var M=300;function y(f,g){var h={config:e({},n,E.defaultConfig),l10n:a};function y(e){return e.bind(h)}function x(){var e=h.config;!1===e.weekNumbers&&1===e.showMonths||!0!==e.noCalendar&&window.requestAnimationFrame(function(){if(void 0!==h.calendarContainer&&(h.calendarContainer.style.visibility="hidden",h.calendarContainer.style.display="block"),void 0!==h.daysContainer){var t=(h.days.offsetWidth+1)*e.showMonths;h.daysContainer.style.width=t+"px",h.calendarContainer.style.width=t+(void 0!==h.weekWrapper?h.weekWrapper.offsetWidth:0)+"px",h.calendarContainer.style.removeProperty("visibility"),h.calendarContainer.style.removeProperty("display")}})}function T(e){0===h.selectedDates.length&&ie(),void 0!==e&&"blur"!==e.type&&function(e){e.preventDefault();var t="keydown"===e.type,n=e.target;void 0!==h.amPM&&e.target===h.amPM&&(h.amPM.textContent=h.l10n.amPM[o(h.amPM.textContent===h.l10n.amPM[0])]);var a=parseFloat(n.getAttribute("min")),r=parseFloat(n.getAttribute("max")),l=parseFloat(n.getAttribute("step")),c=parseInt(n.value,10),d=e.delta||(t?38===e.which?1:-1:0),s=c+l*d;if(void 0!==n.value&&2===n.value.length){var u=n===h.hourElement,f=n===h.minuteElement;s<a?(s=r+s+o(!u)+(o(u)&&o(!h.amPM)),f&&j(void 0,-1,h.hourElement)):s>r&&(s=n===h.hourElement?s-r-o(!h.amPM):a,f&&j(void 0,1,h.hourElement)),h.amPM&&u&&(1===l?s+c===23:Math.abs(s-c)>l)&&(h.amPM.textContent=h.l10n.amPM[o(h.amPM.textContent===h.l10n.amPM[0])]),n.value=i(s)}}(e);var t=h._input.value;k(),we(),h._input.value!==t&&h._debouncedChange()}function k(){if(void 0!==h.hourElement&&void 0!==h.minuteElement){var e,t,n=(parseInt(h.hourElement.value.slice(-2),10)||0)%24,a=(parseInt(h.minuteElement.value,10)||0)%60,i=void 0!==h.secondElement?(parseInt(h.secondElement.value,10)||0)%60:0;void 0!==h.amPM&&(e=n,t=h.amPM.textContent,n=e%12+12*o(t===h.l10n.amPM[1]));var r=void 0!==h.config.minTime||h.config.minDate&&h.minDateHasTime&&h.latestSelectedDateObj&&0===w(h.latestSelectedDateObj,h.config.minDate,!0);if(void 0!==h.config.maxTime||h.config.maxDate&&h.maxDateHasTime&&h.latestSelectedDateObj&&0===w(h.latestSelectedDateObj,h.config.maxDate,!0)){var l=void 0!==h.config.maxTime?h.config.maxTime:h.config.maxDate;(n=Math.min(n,l.getHours()))===l.getHours()&&(a=Math.min(a,l.getMinutes())),a===l.getMinutes()&&(i=Math.min(i,l.getSeconds()))}if(r){var c=void 0!==h.config.minTime?h.config.minTime:h.config.minDate;(n=Math.max(n,c.getHours()))===c.getHours()&&(a=Math.max(a,c.getMinutes())),a===c.getMinutes()&&(i=Math.max(i,c.getSeconds()))}O(n,a,i)}}function I(e){var t=e||h.latestSelectedDateObj;t&&O(t.getHours(),t.getMinutes(),t.getSeconds())}function S(){var e=h.config.defaultHour,t=h.config.defaultMinute,n=h.config.defaultSeconds;if(void 0!==h.config.minDate){var a=h.config.minDate.getHours(),i=h.config.minDate.getMinutes();(e=Math.max(e,a))===a&&(t=Math.max(i,t)),e===a&&t===i&&(n=h.config.minDate.getSeconds())}if(void 0!==h.config.maxDate){var o=h.config.maxDate.getHours(),r=h.config.maxDate.getMinutes();(e=Math.min(e,o))===o&&(t=Math.min(r,t)),e===o&&t===r&&(n=h.config.maxDate.getSeconds())}O(e,t,n)}function O(e,t,n){void 0!==h.latestSelectedDateObj&&h.latestSelectedDateObj.setHours(e%24,t,n||0,0),h.hourElement&&h.minuteElement&&!h.isMobile&&(h.hourElement.value=i(h.config.time_24hr?e:(12+e)%12+12*o(e%12==0)),h.minuteElement.value=i(t),void 0!==h.amPM&&(h.amPM.textContent=h.l10n.amPM[o(e>=12)]),void 0!==h.secondElement&&(h.secondElement.value=i(n)))}function _(e){var t=parseInt(e.target.value)+(e.delta||0);(t/1e3>1||"Enter"===e.key&&!/[^\d]/.test(t.toString()))&&Q(t)}function F(e,t,n,a){return t instanceof Array?t.forEach(function(t){return F(e,t,n,a)}):e instanceof Array?e.forEach(function(e){return F(e,t,n,a)}):(e.addEventListener(t,n,a),void h._handlers.push({element:e,event:t,handler:n,options:a}))}function N(e){return function(t){1===t.which&&e(t)}}function Y(){ge("onChange")}function A(e,t){var n=void 0!==e?h.parseDate(e):h.latestSelectedDateObj||(h.config.minDate&&h.config.minDate>h.now?h.config.minDate:h.config.maxDate&&h.config.maxDate<h.now?h.config.maxDate:h.now),a=h.currentYear,i=h.currentMonth;try{void 0!==n&&(h.currentYear=n.getFullYear(),h.currentMonth=n.getMonth())}catch(e){e.message="Invalid date supplied: "+n,h.config.errorHandler(e)}t&&h.currentYear!==a&&(ge("onYearChange"),K()),!t||h.currentYear===a&&h.currentMonth===i||ge("onMonthChange"),h.redraw()}function P(e){~e.target.className.indexOf("arrow")&&j(e,e.target.classList.contains("arrowUp")?1:-1)}function j(e,t,n){var a=e&&e.target,i=n||a&&a.parentNode&&a.parentNode.firstChild,o=pe("increment");o.delta=t,i&&i.dispatchEvent(o)}function H(e,t,n,a){var i=X(t,!0),o=d("span","flatpickr-day "+e,t.getDate().toString());return o.dateObj=t,o.$i=a,o.setAttribute("aria-label",h.formatDate(t,h.config.ariaDateFormat)),-1===e.indexOf("hidden")&&0===w(t,h.now)&&(h.todayDateElem=o,o.classList.add("today"),o.setAttribute("aria-current","date")),i?(o.tabIndex=-1,he(t)&&(o.classList.add("selected"),h.selectedDateElem=o,"range"===h.config.mode&&(c(o,"startRange",h.selectedDates[0]&&0===w(t,h.selectedDates[0],!0)),c(o,"endRange",h.selectedDates[1]&&0===w(t,h.selectedDates[1],!0)),"nextMonthDay"===e&&o.classList.add("inRange")))):o.classList.add("flatpickr-disabled"),"range"===h.config.mode&&function(e){return!("range"!==h.config.mode||h.selectedDates.length<2)&&w(e,h.selectedDates[0])>=0&&w(e,h.selectedDates[1])<=0}(t)&&!he(t)&&o.classList.add("inRange"),h.weekNumbers&&1===h.config.showMonths&&"prevMonthDay"!==e&&n%7==1&&h.weekNumbers.insertAdjacentHTML("beforeend","<span class='flatpickr-day'>"+h.config.getWeek(t)+"</span>"),ge("onDayCreate",o),o}function L(e){e.focus(),"range"===h.config.mode&&ne(e)}function W(e){for(var t=e>0?0:h.config.showMonths-1,n=e>0?h.config.showMonths:-1,a=t;a!=n;a+=e)for(var i=h.daysContainer.children[a],o=e>0?0:i.children.length-1,r=e>0?i.children.length:-1,l=o;l!=r;l+=e){var c=i.children[l];if(-1===c.className.indexOf("hidden")&&X(c.dateObj))return c}}function R(e,t){var n=ee(document.activeElement||document.body),a=void 0!==e?e:n?document.activeElement:void 0!==h.selectedDateElem&&ee(h.selectedDateElem)?h.selectedDateElem:void 0!==h.todayDateElem&&ee(h.todayDateElem)?h.todayDateElem:W(t>0?1:-1);return void 0===a?h._input.focus():n?void function(e,t){for(var n=-1===e.className.indexOf("Month")?e.dateObj.getMonth():h.currentMonth,a=t>0?h.config.showMonths:-1,i=t>0?1:-1,o=n-h.currentMonth;o!=a;o+=i)for(var r=h.daysContainer.children[o],l=n-h.currentMonth===o?e.$i+t:t<0?r.children.length-1:0,c=r.children.length,d=l;d>=0&&d<c&&d!=(t>0?c:-1);d+=i){var s=r.children[d];if(-1===s.className.indexOf("hidden")&&X(s.dateObj)&&Math.abs(e.$i-d)>=Math.abs(t))return L(s)}h.changeMonth(i),R(W(i),0)}(a,t):L(a)}function B(e,t){for(var n=(new Date(e,t,1).getDay()-h.l10n.firstDayOfWeek+7)%7,a=h.utils.getDaysInMonth((t-1+12)%12),i=h.utils.getDaysInMonth(t),o=window.document.createDocumentFragment(),r=h.config.showMonths>1,l=r?"prevMonthDay hidden":"prevMonthDay",c=r?"nextMonthDay hidden":"nextMonthDay",s=a+1-n,u=0;s<=a;s++,u++)o.appendChild(H(l,new Date(e,t-1,s),s,u));for(s=1;s<=i;s++,u++)o.appendChild(H("",new Date(e,t,s),s,u));for(var f=i+1;f<=42-n&&(1===h.config.showMonths||u%7!=0);f++,u++)o.appendChild(H(c,new Date(e,t+1,f%i),f,u));var m=d("div","dayContainer");return m.appendChild(o),m}function J(){if(void 0!==h.daysContainer){s(h.daysContainer),h.weekNumbers&&s(h.weekNumbers);for(var e=document.createDocumentFragment(),t=0;t<h.config.showMonths;t++){var n=new Date(h.currentYear,h.currentMonth,1);n.setMonth(h.currentMonth+t),e.appendChild(B(n.getFullYear(),n.getMonth()))}h.daysContainer.appendChild(e),h.days=h.daysContainer.firstChild,"range"===h.config.mode&&1===h.selectedDates.length&&ne()}}function K(){if(!(h.config.showMonths>1||"dropdown"!==h.config.monthSelectorType)){var e=function(e){return!(void 0!==h.config.minDate&&h.currentYear===h.config.minDate.getFullYear()&&e<h.config.minDate.getMonth())&&!(void 0!==h.config.maxDate&&h.currentYear===h.config.maxDate.getFullYear()&&e>h.config.maxDate.getMonth())};h.monthsDropdownContainer.tabIndex=-1,h.monthsDropdownContainer.innerHTML="";for(var t=0;t<12;t++)if(e(t)){var n=d("option","flatpickr-monthDropdown-month");n.value=new Date(h.currentYear,t).getMonth().toString(),n.textContent=m(t,h.config.shorthandCurrentMonth,h.l10n),n.tabIndex=-1,h.currentMonth===t&&(n.selected=!0),h.monthsDropdownContainer.appendChild(n)}}}function U(){var e,t=d("div","flatpickr-month"),n=window.document.createDocumentFragment();h.config.showMonths>1||"static"===h.config.monthSelectorType?e=d("span","cur-month"):(h.monthsDropdownContainer=d("select","flatpickr-monthDropdown-months"),F(h.monthsDropdownContainer,"change",function(e){var t=e.target,n=parseInt(t.value,10);h.changeMonth(n-h.currentMonth),ge("onMonthChange")}),K(),e=h.monthsDropdownContainer);var a=u("cur-year",{tabindex:"-1"}),i=a.getElementsByTagName("input")[0];i.setAttribute("aria-label",h.l10n.yearAriaLabel),h.config.minDate&&i.setAttribute("min",h.config.minDate.getFullYear().toString()),h.config.maxDate&&(i.setAttribute("max",h.config.maxDate.getFullYear().toString()),i.disabled=!!h.config.minDate&&h.config.minDate.getFullYear()===h.config.maxDate.getFullYear());var o=d("div","flatpickr-current-month");return o.appendChild(e),o.appendChild(a),n.appendChild(o),t.appendChild(n),{container:t,yearElement:i,monthElement:e}}function q(){s(h.monthNav),h.monthNav.appendChild(h.prevMonthNav),h.config.showMonths&&(h.yearElements=[],h.monthElements=[]);for(var e=h.config.showMonths;e--;){var t=U();h.yearElements.push(t.yearElement),h.monthElements.push(t.monthElement),h.monthNav.appendChild(t.container)}h.monthNav.appendChild(h.nextMonthNav)}function $(){h.weekdayContainer?s(h.weekdayContainer):h.weekdayContainer=d("div","flatpickr-weekdays");for(var e=h.config.showMonths;e--;){var t=d("div","flatpickr-weekdaycontainer");h.weekdayContainer.appendChild(t)}return z(),h.weekdayContainer}function z(){if(h.weekdayContainer){var e=h.l10n.firstDayOfWeek,t=h.l10n.weekdays.shorthand.slice();e>0&&e<t.length&&(t=t.splice(e,t.length).concat(t.splice(0,e)));for(var n=h.config.showMonths;n--;)h.weekdayContainer.children[n].innerHTML="\n      <span class='flatpickr-weekday'>\n        "+t.join("</span><span class='flatpickr-weekday'>")+"\n      </span>\n      "}}function G(e,t){void 0===t&&(t=!0);var n=t?e:e-h.currentMonth;n<0&&!0===h._hidePrevMonthArrow||n>0&&!0===h._hideNextMonthArrow||(h.currentMonth+=n,(h.currentMonth<0||h.currentMonth>11)&&(h.currentYear+=h.currentMonth>11?1:-1,h.currentMonth=(h.currentMonth+12)%12,ge("onYearChange"),K()),J(),ge("onMonthChange"),ve())}function V(e){return!(!h.config.appendTo||!h.config.appendTo.contains(e))||h.calendarContainer.contains(e)}function Z(e){if(h.isOpen&&!h.config.inline){var t="function"==typeof(r=e).composedPath?r.composedPath()[0]:r.target,n=V(t),a=t===h.input||t===h.altInput||h.element.contains(t)||e.path&&e.path.indexOf&&(~e.path.indexOf(h.input)||~e.path.indexOf(h.altInput)),i="blur"===e.type?a&&e.relatedTarget&&!V(e.relatedTarget):!a&&!n&&!V(e.relatedTarget),o=!h.config.ignoredFocusElements.some(function(e){return e.contains(t)});i&&o&&(void 0!==h.timeContainer&&void 0!==h.minuteElement&&void 0!==h.hourElement&&T(),h.close(),"range"===h.config.mode&&1===h.selectedDates.length&&(h.clear(!1),h.redraw()))}var r}function Q(e){if(!(!e||h.config.minDate&&e<h.config.minDate.getFullYear()||h.config.maxDate&&e>h.config.maxDate.getFullYear())){var t=e,n=h.currentYear!==t;h.currentYear=t||h.currentYear,h.config.maxDate&&h.currentYear===h.config.maxDate.getFullYear()?h.currentMonth=Math.min(h.config.maxDate.getMonth(),h.currentMonth):h.config.minDate&&h.currentYear===h.config.minDate.getFullYear()&&(h.currentMonth=Math.max(h.config.minDate.getMonth(),h.currentMonth)),n&&(h.redraw(),ge("onYearChange"),K())}}function X(e,t){void 0===t&&(t=!0);var n=h.parseDate(e,void 0,t);if(h.config.minDate&&n&&w(n,h.config.minDate,void 0!==t?t:!h.minDateHasTime)<0||h.config.maxDate&&n&&w(n,h.config.maxDate,void 0!==t?t:!h.maxDateHasTime)>0)return!1;if(0===h.config.enable.length&&0===h.config.disable.length)return!0;if(void 0===n)return!1;for(var a=h.config.enable.length>0,i=a?h.config.enable:h.config.disable,o=0,r=void 0;o<i.length;o++){if("function"==typeof(r=i[o])&&r(n))return a;if(r instanceof Date&&void 0!==n&&r.getTime()===n.getTime())return a;if("string"==typeof r&&void 0!==n){var l=h.parseDate(r,void 0,!0);return l&&l.getTime()===n.getTime()?a:!a}if("object"==typeof r&&void 0!==n&&r.from&&r.to&&n.getTime()>=r.from.getTime()&&n.getTime()<=r.to.getTime())return a}return!a}function ee(e){return void 0!==h.daysContainer&&(-1===e.className.indexOf("hidden")&&h.daysContainer.contains(e))}function te(e){var t=e.target===h._input,n=h.config.allowInput,a=h.isOpen&&(!n||!t),i=h.config.inline&&t&&!n;if(13===e.keyCode&&t){if(n)return h.setDate(h._input.value,!0,e.target===h.altInput?h.config.altFormat:h.config.dateFormat),e.target.blur();h.open()}else if(V(e.target)||a||i){var o=!!h.timeContainer&&h.timeContainer.contains(e.target);switch(e.keyCode){case 13:o?(e.preventDefault(),T(),de()):se(e);break;case 27:e.preventDefault(),de();break;case 8:case 46:t&&!h.config.allowInput&&(e.preventDefault(),h.clear());break;case 37:case 39:if(o||t)h.hourElement&&h.hourElement.focus();else if(e.preventDefault(),void 0!==h.daysContainer&&(!1===n||document.activeElement&&ee(document.activeElement))){var r=39===e.keyCode?1:-1;e.ctrlKey?(e.stopPropagation(),G(r),R(W(1),0)):R(void 0,r)}break;case 38:case 40:e.preventDefault();var l=40===e.keyCode?1:-1;h.daysContainer&&void 0!==e.target.$i||e.target===h.input||e.target===h.altInput?e.ctrlKey?(e.stopPropagation(),Q(h.currentYear-l),R(W(1),0)):o||R(void 0,7*l):e.target===h.currentYearElement?Q(h.currentYear-l):h.config.enableTime&&(!o&&h.hourElement&&h.hourElement.focus(),T(e),h._debouncedChange());break;case 9:if(o){var c=[h.hourElement,h.minuteElement,h.secondElement,h.amPM].concat(h.pluginElements).filter(function(e){return e}),d=c.indexOf(e.target);if(-1!==d){var s=c[d+(e.shiftKey?-1:1)];e.preventDefault(),(s||h._input).focus()}}else!h.config.noCalendar&&h.daysContainer&&h.daysContainer.contains(e.target)&&e.shiftKey&&(e.preventDefault(),h._input.focus())}}if(void 0!==h.amPM&&e.target===h.amPM)switch(e.key){case h.l10n.amPM[0].charAt(0):case h.l10n.amPM[0].charAt(0).toLowerCase():h.amPM.textContent=h.l10n.amPM[0],k(),we();break;case h.l10n.amPM[1].charAt(0):case h.l10n.amPM[1].charAt(0).toLowerCase():h.amPM.textContent=h.l10n.amPM[1],k(),we()}(t||V(e.target))&&ge("onKeyDown",e)}function ne(e){if(1===h.selectedDates.length&&(!e||e.classList.contains("flatpickr-day")&&!e.classList.contains("flatpickr-disabled"))){for(var t=e?e.dateObj.getTime():h.days.firstElementChild.dateObj.getTime(),n=h.parseDate(h.selectedDates[0],void 0,!0).getTime(),a=Math.min(t,h.selectedDates[0].getTime()),i=Math.max(t,h.selectedDates[0].getTime()),o=!1,r=0,l=0,c=a;c<i;c+=C.DAY)X(new Date(c),!0)||(o=o||c>a&&c<i,c<n&&(!r||c>r)?r=c:c>n&&(!l||c<l)&&(l=c));for(var d=0;d<h.config.showMonths;d++)for(var s=h.daysContainer.children[d],u=function(a,i){var c=s.children[a],d=c.dateObj.getTime(),u=r>0&&d<r||l>0&&d>l;return u?(c.classList.add("notAllowed"),["inRange","startRange","endRange"].forEach(function(e){c.classList.remove(e)}),"continue"):o&&!u?"continue":(["startRange","inRange","endRange","notAllowed"].forEach(function(e){c.classList.remove(e)}),void(void 0!==e&&(e.classList.add(t<=h.selectedDates[0].getTime()?"startRange":"endRange"),n<t&&d===n?c.classList.add("startRange"):n>t&&d===n&&c.classList.add("endRange"),d>=r&&(0===l||d<=l)&&b(d,n,t)&&c.classList.add("inRange"))))},f=0,m=s.children.length;f<m;f++)u(f)}}function ae(){!h.isOpen||h.config.static||h.config.inline||le()}function ie(){h.setDate(void 0!==h.config.minDate?new Date(h.config.minDate.getTime()):new Date,!0),S(),we()}function oe(e){return function(t){var n=h.config["_"+e+"Date"]=h.parseDate(t,h.config.dateFormat),a=h.config["_"+("min"===e?"max":"min")+"Date"];void 0!==n&&(h["min"===e?"minDateHasTime":"maxDateHasTime"]=n.getHours()>0||n.getMinutes()>0||n.getSeconds()>0),h.selectedDates&&(h.selectedDates=h.selectedDates.filter(function(e){return X(e)}),h.selectedDates.length||"min"!==e||I(n),we()),h.daysContainer&&(ce(),void 0!==n?h.currentYearElement[e]=n.getFullYear().toString():h.currentYearElement.removeAttribute(e),h.currentYearElement.disabled=!!a&&void 0!==n&&a.getFullYear()===n.getFullYear())}}function re(){"object"!=typeof h.config.locale&&void 0===E.l10ns[h.config.locale]&&h.config.errorHandler(new Error("flatpickr: invalid locale "+h.config.locale)),h.l10n=e({},E.l10ns.default,"object"==typeof h.config.locale?h.config.locale:"default"!==h.config.locale?E.l10ns[h.config.locale]:void 0),p.K="("+h.l10n.amPM[0]+"|"+h.l10n.amPM[1]+"|"+h.l10n.amPM[0].toLowerCase()+"|"+h.l10n.amPM[1].toLowerCase()+")",void 0===e({},g,JSON.parse(JSON.stringify(f.dataset||{}))).time_24hr&&void 0===E.defaultConfig.time_24hr&&(h.config.time_24hr=h.l10n.time_24hr),h.formatDate=v(h),h.parseDate=D({config:h.config,l10n:h.l10n})}function le(e){if(void 0!==h.calendarContainer){ge("onPreCalendarPosition");var t=e||h._positionElement,n=Array.prototype.reduce.call(h.calendarContainer.children,function(e,t){return e+t.offsetHeight},0),a=h.calendarContainer.offsetWidth,i=h.config.position.split(" "),o=i[0],r=i.length>1?i[1]:null,l=t.getBoundingClientRect(),d=window.innerHeight-l.bottom,s="above"===o||"below"!==o&&d<n&&l.top>n,u=window.pageYOffset+l.top+(s?-n-2:t.offsetHeight+2);if(c(h.calendarContainer,"arrowTop",!s),c(h.calendarContainer,"arrowBottom",s),!h.config.inline){var f=window.pageXOffset+l.left-(null!=r&&"center"===r?(a-l.width)/2:0),m=window.document.body.offsetWidth-(window.pageXOffset+l.right),g=f+a>window.document.body.offsetWidth,p=m+a>window.document.body.offsetWidth;if(c(h.calendarContainer,"rightMost",g),!h.config.static)if(h.calendarContainer.style.top=u+"px",g)if(p){var v=document.styleSheets[0];if(void 0===v)return;var D=window.document.body.offsetWidth,w=Math.max(0,D/2-a/2),b=v.cssRules.length,C="{left:"+l.left+"px;right:auto;}";c(h.calendarContainer,"rightMost",!1),c(h.calendarContainer,"centerMost",!0),v.insertRule(".flatpickr-calendar.centerMost:before,.flatpickr-calendar.centerMost:after"+C,b),h.calendarContainer.style.left=w+"px",h.calendarContainer.style.right="auto"}else h.calendarContainer.style.left="auto",h.calendarContainer.style.right=m+"px";else h.calendarContainer.style.left=f+"px",h.calendarContainer.style.right="auto"}}}function ce(){h.config.noCalendar||h.isMobile||(ve(),J())}function de(){h._input.focus(),-1!==window.navigator.userAgent.indexOf("MSIE")||void 0!==navigator.msMaxTouchPoints?setTimeout(h.close,0):h.close()}function se(e){e.preventDefault(),e.stopPropagation();var t=function e(t,n){return n(t)?t:t.parentNode?e(t.parentNode,n):void 0}(e.target,function(e){return e.classList&&e.classList.contains("flatpickr-day")&&!e.classList.contains("flatpickr-disabled")&&!e.classList.contains("notAllowed")});if(void 0!==t){var n=t,a=h.latestSelectedDateObj=new Date(n.dateObj.getTime()),i=(a.getMonth()<h.currentMonth||a.getMonth()>h.currentMonth+h.config.showMonths-1)&&"range"!==h.config.mode;if(h.selectedDateElem=n,"single"===h.config.mode)h.selectedDates=[a];else if("multiple"===h.config.mode){var o=he(a);o?h.selectedDates.splice(parseInt(o),1):h.selectedDates.push(a)}else"range"===h.config.mode&&(2===h.selectedDates.length&&h.clear(!1,!1),h.latestSelectedDateObj=a,h.selectedDates.push(a),0!==w(a,h.selectedDates[0],!0)&&h.selectedDates.sort(function(e,t){return e.getTime()-t.getTime()}));if(k(),i){var r=h.currentYear!==a.getFullYear();h.currentYear=a.getFullYear(),h.currentMonth=a.getMonth(),r&&(ge("onYearChange"),K()),ge("onMonthChange")}if(ve(),J(),we(),h.config.enableTime&&setTimeout(function(){return h.showTimeInput=!0},50),i||"range"===h.config.mode||1!==h.config.showMonths?void 0!==h.selectedDateElem&&void 0===h.hourElement&&h.selectedDateElem&&h.selectedDateElem.focus():L(n),void 0!==h.hourElement&&void 0!==h.hourElement&&h.hourElement.focus(),h.config.closeOnSelect){var l="single"===h.config.mode&&!h.config.enableTime,c="range"===h.config.mode&&2===h.selectedDates.length&&!h.config.enableTime;(l||c)&&de()}Y()}}h.parseDate=D({config:h.config,l10n:h.l10n}),h._handlers=[],h.pluginElements=[],h.loadedPlugins=[],h._bind=F,h._setHoursFromDate=I,h._positionCalendar=le,h.changeMonth=G,h.changeYear=Q,h.clear=function(e,t){void 0===e&&(e=!0);void 0===t&&(t=!0);h.input.value="",void 0!==h.altInput&&(h.altInput.value="");void 0!==h.mobileInput&&(h.mobileInput.value="");h.selectedDates=[],h.latestSelectedDateObj=void 0,!0===t&&(h.currentYear=h._initialDate.getFullYear(),h.currentMonth=h._initialDate.getMonth());h.showTimeInput=!1,!0===h.config.enableTime&&S();h.redraw(),e&&ge("onChange")},h.close=function(){h.isOpen=!1,h.isMobile||(void 0!==h.calendarContainer&&h.calendarContainer.classList.remove("open"),void 0!==h._input&&h._input.classList.remove("active"));ge("onClose")},h._createElement=d,h.destroy=function(){void 0!==h.config&&ge("onDestroy");for(var e=h._handlers.length;e--;){var t=h._handlers[e];t.element.removeEventListener(t.event,t.handler,t.options)}if(h._handlers=[],h.mobileInput)h.mobileInput.parentNode&&h.mobileInput.parentNode.removeChild(h.mobileInput),h.mobileInput=void 0;else if(h.calendarContainer&&h.calendarContainer.parentNode)if(h.config.static&&h.calendarContainer.parentNode){var n=h.calendarContainer.parentNode;if(n.lastChild&&n.removeChild(n.lastChild),n.parentNode){for(;n.firstChild;)n.parentNode.insertBefore(n.firstChild,n);n.parentNode.removeChild(n)}}else h.calendarContainer.parentNode.removeChild(h.calendarContainer);h.altInput&&(h.input.type="text",h.altInput.parentNode&&h.altInput.parentNode.removeChild(h.altInput),delete h.altInput);h.input&&(h.input.type=h.input._type,h.input.classList.remove("flatpickr-input"),h.input.removeAttribute("readonly"),h.input.value="");["_showTimeInput","latestSelectedDateObj","_hideNextMonthArrow","_hidePrevMonthArrow","__hideNextMonthArrow","__hidePrevMonthArrow","isMobile","isOpen","selectedDateElem","minDateHasTime","maxDateHasTime","days","daysContainer","_input","_positionElement","innerContainer","rContainer","monthNav","todayDateElem","calendarContainer","weekdayContainer","prevMonthNav","nextMonthNav","monthsDropdownContainer","currentMonthElement","currentYearElement","navigationCurrentMonth","selectedDateElem","config"].forEach(function(e){try{delete h[e]}catch(e){}})},h.isEnabled=X,h.jumpToDate=A,h.open=function(e,t){void 0===t&&(t=h._positionElement);if(!0===h.isMobile)return e&&(e.preventDefault(),e.target&&e.target.blur()),void 0!==h.mobileInput&&(h.mobileInput.focus(),h.mobileInput.click()),void ge("onOpen");if(h._input.disabled||h.config.inline)return;var n=h.isOpen;h.isOpen=!0,n||(h.calendarContainer.classList.add("open"),h._input.classList.add("active"),ge("onOpen"),le(t));!0===h.config.enableTime&&!0===h.config.noCalendar&&(0===h.selectedDates.length&&ie(),!1!==h.config.allowInput||void 0!==e&&h.timeContainer.contains(e.relatedTarget)||setTimeout(function(){return h.hourElement.select()},50))},h.redraw=ce,h.set=function(e,n){if(null!==e&&"object"==typeof e)for(var a in Object.assign(h.config,e),e)void 0!==ue[a]&&ue[a].forEach(function(e){return e()});else h.config[e]=n,void 0!==ue[e]?ue[e].forEach(function(e){return e()}):t.indexOf(e)>-1&&(h.config[e]=l(n));h.redraw(),we(!1)},h.setDate=function(e,t,n){void 0===t&&(t=!1);void 0===n&&(n=h.config.dateFormat);if(0!==e&&!e||e instanceof Array&&0===e.length)return h.clear(t);fe(e,n),h.showTimeInput=h.selectedDates.length>0,h.latestSelectedDateObj=h.selectedDates[h.selectedDates.length-1],h.redraw(),A(),I(),0===h.selectedDates.length&&h.clear(!1);we(t),t&&ge("onChange")},h.toggle=function(e){if(!0===h.isOpen)return h.close();h.open(e)};var ue={locale:[re,z],showMonths:[q,x,$],minDate:[A],maxDate:[A]};function fe(e,t){var n=[];if(e instanceof Array)n=e.map(function(e){return h.parseDate(e,t)});else if(e instanceof Date||"number"==typeof e)n=[h.parseDate(e,t)];else if("string"==typeof e)switch(h.config.mode){case"single":case"time":n=[h.parseDate(e,t)];break;case"multiple":n=e.split(h.config.conjunction).map(function(e){return h.parseDate(e,t)});break;case"range":n=e.split(h.l10n.rangeSeparator).map(function(e){return h.parseDate(e,t)})}else h.config.errorHandler(new Error("Invalid date supplied: "+JSON.stringify(e)));h.selectedDates=n.filter(function(e){return e instanceof Date&&X(e,!1)}),"range"===h.config.mode&&h.selectedDates.sort(function(e,t){return e.getTime()-t.getTime()})}function me(e){return e.slice().map(function(e){return"string"==typeof e||"number"==typeof e||e instanceof Date?h.parseDate(e,void 0,!0):e&&"object"==typeof e&&e.from&&e.to?{from:h.parseDate(e.from,void 0),to:h.parseDate(e.to,void 0)}:e}).filter(function(e){return e})}function ge(e,t){if(void 0!==h.config){var n=h.config[e];if(void 0!==n&&n.length>0)for(var a=0;n[a]&&a<n.length;a++)n[a](h.selectedDates,h.input.value,h,t);"onChange"===e&&(h.input.dispatchEvent(pe("change")),h.input.dispatchEvent(pe("input")))}}function pe(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!0),t}function he(e){for(var t=0;t<h.selectedDates.length;t++)if(0===w(h.selectedDates[t],e))return""+t;return!1}function ve(){h.config.noCalendar||h.isMobile||!h.monthNav||(h.yearElements.forEach(function(e,t){var n=new Date(h.currentYear,h.currentMonth,1);n.setMonth(h.currentMonth+t),h.config.showMonths>1||"static"===h.config.monthSelectorType?h.monthElements[t].textContent=m(n.getMonth(),h.config.shorthandCurrentMonth,h.l10n)+" ":h.monthsDropdownContainer.value=n.getMonth().toString(),e.value=n.getFullYear().toString()}),h._hidePrevMonthArrow=void 0!==h.config.minDate&&(h.currentYear===h.config.minDate.getFullYear()?h.currentMonth<=h.config.minDate.getMonth():h.currentYear<h.config.minDate.getFullYear()),h._hideNextMonthArrow=void 0!==h.config.maxDate&&(h.currentYear===h.config.maxDate.getFullYear()?h.currentMonth+1>h.config.maxDate.getMonth():h.currentYear>h.config.maxDate.getFullYear()))}function De(e){return h.selectedDates.map(function(t){return h.formatDate(t,e)}).filter(function(e,t,n){return"range"!==h.config.mode||h.config.enableTime||n.indexOf(e)===t}).join("range"!==h.config.mode?h.config.conjunction:h.l10n.rangeSeparator)}function we(e){void 0===e&&(e=!0),void 0!==h.mobileInput&&h.mobileFormatStr&&(h.mobileInput.value=void 0!==h.latestSelectedDateObj?h.formatDate(h.latestSelectedDateObj,h.mobileFormatStr):""),h.input.value=De(h.config.dateFormat),void 0!==h.altInput&&(h.altInput.value=De(h.config.altFormat)),!1!==e&&ge("onValueUpdate")}function be(e){var t=h.prevMonthNav.contains(e.target),n=h.nextMonthNav.contains(e.target);t||n?G(t?-1:1):h.yearElements.indexOf(e.target)>=0?e.target.select():e.target.classList.contains("arrowUp")?h.changeYear(h.currentYear+1):e.target.classList.contains("arrowDown")&&h.changeYear(h.currentYear-1)}return function(){h.element=h.input=f,h.isOpen=!1,function(){var a=["wrap","weekNumbers","allowInput","clickOpens","time_24hr","enableTime","noCalendar","altInput","shorthandCurrentMonth","inline","static","enableSeconds","disableMobile"],i=e({},g,JSON.parse(JSON.stringify(f.dataset||{}))),o={};h.config.parseDate=i.parseDate,h.config.formatDate=i.formatDate,Object.defineProperty(h.config,"enable",{get:function(){return h.config._enable},set:function(e){h.config._enable=me(e)}}),Object.defineProperty(h.config,"disable",{get:function(){return h.config._disable},set:function(e){h.config._disable=me(e)}});var r="time"===i.mode;if(!i.dateFormat&&(i.enableTime||r)){var c=E.defaultConfig.dateFormat||n.dateFormat;o.dateFormat=i.noCalendar||r?"H:i"+(i.enableSeconds?":S":""):c+" H:i"+(i.enableSeconds?":S":"")}if(i.altInput&&(i.enableTime||r)&&!i.altFormat){var d=E.defaultConfig.altFormat||n.altFormat;o.altFormat=i.noCalendar||r?"h:i"+(i.enableSeconds?":S K":" K"):d+" h:i"+(i.enableSeconds?":S":"")+" K"}i.altInputClass||(h.config.altInputClass=h.input.className+" "+h.config.altInputClass),Object.defineProperty(h.config,"minDate",{get:function(){return h.config._minDate},set:oe("min")}),Object.defineProperty(h.config,"maxDate",{get:function(){return h.config._maxDate},set:oe("max")});var s=function(e){return function(t){h.config["min"===e?"_minTime":"_maxTime"]=h.parseDate(t,"H:i:S")}};Object.defineProperty(h.config,"minTime",{get:function(){return h.config._minTime},set:s("min")}),Object.defineProperty(h.config,"maxTime",{get:function(){return h.config._maxTime},set:s("max")}),"time"===i.mode&&(h.config.noCalendar=!0,h.config.enableTime=!0),Object.assign(h.config,o,i);for(var u=0;u<a.length;u++)h.config[a[u]]=!0===h.config[a[u]]||"true"===h.config[a[u]];t.filter(function(e){return void 0!==h.config[e]}).forEach(function(e){h.config[e]=l(h.config[e]||[]).map(y)}),h.isMobile=!h.config.disableMobile&&!h.config.inline&&"single"===h.config.mode&&!h.config.disable.length&&!h.config.enable.length&&!h.config.weekNumbers&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);for(var u=0;u<h.config.plugins.length;u++){var m=h.config.plugins[u](h)||{};for(var p in m)t.indexOf(p)>-1?h.config[p]=l(m[p]).map(y).concat(h.config[p]):void 0===i[p]&&(h.config[p]=m[p])}ge("onParseConfig")}(),re(),h.input=h.config.wrap?f.querySelector("[data-input]"):f,h.input?(h.input._type=h.input.type,h.input.type="text",h.input.classList.add("flatpickr-input"),h._input=h.input,h.config.altInput&&(h.altInput=d(h.input.nodeName,h.config.altInputClass),h._input=h.altInput,h.altInput.placeholder=h.input.placeholder,h.altInput.disabled=h.input.disabled,h.altInput.required=h.input.required,h.altInput.tabIndex=h.input.tabIndex,h.altInput.type="text",h.input.setAttribute("type","hidden"),!h.config.static&&h.input.parentNode&&h.input.parentNode.insertBefore(h.altInput,h.input.nextSibling)),h.config.allowInput||h._input.setAttribute("readonly","readonly"),h._positionElement=h.config.positionElement||h._input):h.config.errorHandler(new Error("Invalid input element specified")),function(){h.selectedDates=[],h.now=h.parseDate(h.config.now)||new Date;var e=h.config.defaultDate||("INPUT"!==h.input.nodeName&&"TEXTAREA"!==h.input.nodeName||!h.input.placeholder||h.input.value!==h.input.placeholder?h.input.value:null);e&&fe(e,h.config.dateFormat),h._initialDate=h.selectedDates.length>0?h.selectedDates[0]:h.config.minDate&&h.config.minDate.getTime()>h.now.getTime()?h.config.minDate:h.config.maxDate&&h.config.maxDate.getTime()<h.now.getTime()?h.config.maxDate:h.now,h.currentYear=h._initialDate.getFullYear(),h.currentMonth=h._initialDate.getMonth(),h.selectedDates.length>0&&(h.latestSelectedDateObj=h.selectedDates[0]),void 0!==h.config.minTime&&(h.config.minTime=h.parseDate(h.config.minTime,"H:i")),void 0!==h.config.maxTime&&(h.config.maxTime=h.parseDate(h.config.maxTime,"H:i")),h.minDateHasTime=!!h.config.minDate&&(h.config.minDate.getHours()>0||h.config.minDate.getMinutes()>0||h.config.minDate.getSeconds()>0),h.maxDateHasTime=!!h.config.maxDate&&(h.config.maxDate.getHours()>0||h.config.maxDate.getMinutes()>0||h.config.maxDate.getSeconds()>0),Object.defineProperty(h,"showTimeInput",{get:function(){return h._showTimeInput},set:function(e){h._showTimeInput=e,h.calendarContainer&&c(h.calendarContainer,"showTimeInput",e),h.isOpen&&le()}})}(),h.utils={getDaysInMonth:function(e,t){return void 0===e&&(e=h.currentMonth),void 0===t&&(t=h.currentYear),1===e&&(t%4==0&&t%100!=0||t%400==0)?29:h.l10n.daysInMonth[e]}},h.isMobile||function(){var e=window.document.createDocumentFragment();if(h.calendarContainer=d("div","flatpickr-calendar"),h.calendarContainer.tabIndex=-1,!h.config.noCalendar){if(e.appendChild((h.monthNav=d("div","flatpickr-months"),h.yearElements=[],h.monthElements=[],h.prevMonthNav=d("span","flatpickr-prev-month"),h.prevMonthNav.innerHTML=h.config.prevArrow,h.nextMonthNav=d("span","flatpickr-next-month"),h.nextMonthNav.innerHTML=h.config.nextArrow,q(),Object.defineProperty(h,"_hidePrevMonthArrow",{get:function(){return h.__hidePrevMonthArrow},set:function(e){h.__hidePrevMonthArrow!==e&&(c(h.prevMonthNav,"flatpickr-disabled",e),h.__hidePrevMonthArrow=e)}}),Object.defineProperty(h,"_hideNextMonthArrow",{get:function(){return h.__hideNextMonthArrow},set:function(e){h.__hideNextMonthArrow!==e&&(c(h.nextMonthNav,"flatpickr-disabled",e),h.__hideNextMonthArrow=e)}}),h.currentYearElement=h.yearElements[0],ve(),h.monthNav)),h.innerContainer=d("div","flatpickr-innerContainer"),h.config.weekNumbers){var t=function(){h.calendarContainer.classList.add("hasWeeks");var e=d("div","flatpickr-weekwrapper");e.appendChild(d("span","flatpickr-weekday",h.l10n.weekAbbreviation));var t=d("div","flatpickr-weeks");return e.appendChild(t),{weekWrapper:e,weekNumbers:t}}(),n=t.weekWrapper,a=t.weekNumbers;h.innerContainer.appendChild(n),h.weekNumbers=a,h.weekWrapper=n}h.rContainer=d("div","flatpickr-rContainer"),h.rContainer.appendChild($()),h.daysContainer||(h.daysContainer=d("div","flatpickr-days"),h.daysContainer.tabIndex=-1),J(),h.rContainer.appendChild(h.daysContainer),h.innerContainer.appendChild(h.rContainer),e.appendChild(h.innerContainer)}h.config.enableTime&&e.appendChild(function(){h.calendarContainer.classList.add("hasTime"),h.config.noCalendar&&h.calendarContainer.classList.add("noCalendar"),h.timeContainer=d("div","flatpickr-time"),h.timeContainer.tabIndex=-1;var e=d("span","flatpickr-time-separator",":"),t=u("flatpickr-hour",{"aria-label":h.l10n.hourAriaLabel});h.hourElement=t.getElementsByTagName("input")[0];var n=u("flatpickr-minute",{"aria-label":h.l10n.minuteAriaLabel});if(h.minuteElement=n.getElementsByTagName("input")[0],h.hourElement.tabIndex=h.minuteElement.tabIndex=-1,h.hourElement.value=i(h.latestSelectedDateObj?h.latestSelectedDateObj.getHours():h.config.time_24hr?h.config.defaultHour:function(e){switch(e%24){case 0:case 12:return 12;default:return e%12}}(h.config.defaultHour)),h.minuteElement.value=i(h.latestSelectedDateObj?h.latestSelectedDateObj.getMinutes():h.config.defaultMinute),h.hourElement.setAttribute("step",h.config.hourIncrement.toString()),h.minuteElement.setAttribute("step",h.config.minuteIncrement.toString()),h.hourElement.setAttribute("min",h.config.time_24hr?"0":"1"),h.hourElement.setAttribute("max",h.config.time_24hr?"23":"12"),h.minuteElement.setAttribute("min","0"),h.minuteElement.setAttribute("max","59"),h.timeContainer.appendChild(t),h.timeContainer.appendChild(e),h.timeContainer.appendChild(n),h.config.time_24hr&&h.timeContainer.classList.add("time24hr"),h.config.enableSeconds){h.timeContainer.classList.add("hasSeconds");var a=u("flatpickr-second");h.secondElement=a.getElementsByTagName("input")[0],h.secondElement.value=i(h.latestSelectedDateObj?h.latestSelectedDateObj.getSeconds():h.config.defaultSeconds),h.secondElement.setAttribute("step",h.minuteElement.getAttribute("step")),h.secondElement.setAttribute("min","0"),h.secondElement.setAttribute("max","59"),h.timeContainer.appendChild(d("span","flatpickr-time-separator",":")),h.timeContainer.appendChild(a)}return h.config.time_24hr||(h.amPM=d("span","flatpickr-am-pm",h.l10n.amPM[o((h.latestSelectedDateObj?h.hourElement.value:h.config.defaultHour)>11)]),h.amPM.title=h.l10n.toggleTitle,h.amPM.tabIndex=-1,h.timeContainer.appendChild(h.amPM)),h.timeContainer}()),c(h.calendarContainer,"rangeMode","range"===h.config.mode),c(h.calendarContainer,"animate",!0===h.config.animate),c(h.calendarContainer,"multiMonth",h.config.showMonths>1),h.calendarContainer.appendChild(e);var r=void 0!==h.config.appendTo&&void 0!==h.config.appendTo.nodeType;if((h.config.inline||h.config.static)&&(h.calendarContainer.classList.add(h.config.inline?"inline":"static"),h.config.inline&&(!r&&h.element.parentNode?h.element.parentNode.insertBefore(h.calendarContainer,h._input.nextSibling):void 0!==h.config.appendTo&&h.config.appendTo.appendChild(h.calendarContainer)),h.config.static)){var l=d("div","flatpickr-wrapper");h.element.parentNode&&h.element.parentNode.insertBefore(l,h.element),l.appendChild(h.element),h.altInput&&l.appendChild(h.altInput),l.appendChild(h.calendarContainer)}h.config.static||h.config.inline||(void 0!==h.config.appendTo?h.config.appendTo:window.document.body).appendChild(h.calendarContainer)}(),function(){if(h.config.wrap&&["open","close","toggle","clear"].forEach(function(e){Array.prototype.forEach.call(h.element.querySelectorAll("[data-"+e+"]"),function(t){return F(t,"click",h[e])})}),h.isMobile)!function(){var e=h.config.enableTime?h.config.noCalendar?"time":"datetime-local":"date";h.mobileInput=d("input",h.input.className+" flatpickr-mobile"),h.mobileInput.step=h.input.getAttribute("step")||"any",h.mobileInput.tabIndex=1,h.mobileInput.type=e,h.mobileInput.disabled=h.input.disabled,h.mobileInput.required=h.input.required,h.mobileInput.placeholder=h.input.placeholder,h.mobileFormatStr="datetime-local"===e?"Y-m-d\\TH:i:S":"date"===e?"Y-m-d":"H:i:S",h.selectedDates.length>0&&(h.mobileInput.defaultValue=h.mobileInput.value=h.formatDate(h.selectedDates[0],h.mobileFormatStr)),h.config.minDate&&(h.mobileInput.min=h.formatDate(h.config.minDate,"Y-m-d")),h.config.maxDate&&(h.mobileInput.max=h.formatDate(h.config.maxDate,"Y-m-d")),h.input.type="hidden",void 0!==h.altInput&&(h.altInput.type="hidden");try{h.input.parentNode&&h.input.parentNode.insertBefore(h.mobileInput,h.input.nextSibling)}catch(e){}F(h.mobileInput,"change",function(e){h.setDate(e.target.value,!1,h.mobileFormatStr),ge("onChange"),ge("onClose")})}();else{var e=r(ae,50);h._debouncedChange=r(Y,M),h.daysContainer&&!/iPhone|iPad|iPod/i.test(navigator.userAgent)&&F(h.daysContainer,"mouseover",function(e){"range"===h.config.mode&&ne(e.target)}),F(window.document.body,"keydown",te),h.config.inline||h.config.static||F(window,"resize",e),void 0!==window.ontouchstart?F(window.document,"touchstart",Z):F(window.document,"mousedown",N(Z)),F(window.document,"focus",Z,{capture:!0}),!0===h.config.clickOpens&&(F(h._input,"focus",h.open),F(h._input,"mousedown",N(h.open))),void 0!==h.daysContainer&&(F(h.monthNav,"mousedown",N(be)),F(h.monthNav,["keyup","increment"],_),F(h.daysContainer,"mousedown",N(se))),void 0!==h.timeContainer&&void 0!==h.minuteElement&&void 0!==h.hourElement&&(F(h.timeContainer,["increment"],T),F(h.timeContainer,"blur",T,{capture:!0}),F(h.timeContainer,"mousedown",N(P)),F([h.hourElement,h.minuteElement],["focus","click"],function(e){return e.target.select()}),void 0!==h.secondElement&&F(h.secondElement,"focus",function(){return h.secondElement&&h.secondElement.select()}),void 0!==h.amPM&&F(h.amPM,"mousedown",N(function(e){T(e),Y()})))}}(),(h.selectedDates.length||h.config.noCalendar)&&(h.config.enableTime&&I(h.config.noCalendar?h.latestSelectedDateObj||h.config.minDate:void 0),we(!1)),x(),h.showTimeInput=h.selectedDates.length>0||h.config.noCalendar;var a=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);!h.isMobile&&a&&le(),ge("onReady")}(),h}function x(e,t){for(var n=Array.prototype.slice.call(e).filter(function(e){return e instanceof HTMLElement}),a=[],i=0;i<n.length;i++){var o=n[i];try{if(null!==o.getAttribute("data-fp-omit"))continue;void 0!==o._flatpickr&&(o._flatpickr.destroy(),o._flatpickr=void 0),o._flatpickr=y(o,t||{}),a.push(o._flatpickr)}catch(e){console.error(e)}}return 1===a.length?a[0]:a}"undefined"!=typeof HTMLElement&&"undefined"!=typeof HTMLCollection&&"undefined"!=typeof NodeList&&(HTMLCollection.prototype.flatpickr=NodeList.prototype.flatpickr=function(e){return x(this,e)},HTMLElement.prototype.flatpickr=function(e){return x([this],e)});var E=function(e,t){return"string"==typeof e?x(window.document.querySelectorAll(e),t):e instanceof Node?x([e],t):x(e,t)};return E.defaultConfig={},E.l10ns={en:e({},a),default:e({},a)},E.localize=function(t){E.l10ns.default=e({},E.l10ns.default,t)},E.setDefaults=function(t){E.defaultConfig=e({},E.defaultConfig,t)},E.parseDate=D({}),E.formatDate=v({}),E.compareDates=w,"undefined"!=typeof jQuery&&void 0!==jQuery.fn&&(jQuery.fn.flatpickr=function(e){return x(this,e)}),Date.prototype.fp_incr=function(e){return new Date(this.getFullYear(),this.getMonth(),this.getDate()+("string"==typeof e?parseInt(e,10):e))},"undefined"!=typeof window&&(window.flatpickr=E),E});

/* liquidjs */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).liquidjs={})}(this,function(e){"use strict";var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};function t(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var y=function(){return(y=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function s(s,o,u,a){return new(u=u||Promise)(function(e,t){function r(e){try{i(a.next(e))}catch(e){t(e)}}function n(e){try{i(a.throw(e))}catch(e){t(e)}}function i(t){t.done?e(t.value):new u(function(e){e(t.value)}).then(r,n)}i((a=a.apply(s,o||[])).next())})}function w(r,n){var i,s,o,e,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(i)throw new TypeError("Generator is already executing.");for(;u;)try{if(i=1,s&&(o=2&t[0]?s.return:t[0]?s.throw||((o=s.return)&&o.call(s),0):s.next)&&!(o=o.call(s,t[1])).done)return o;switch(s=0,o&&(t=[2&t[0],o.value]),t[0]){case 0:case 1:o=t;break;case 4:return u.label++,{value:t[1],done:!1};case 5:u.label++,s=t[1],t=[0];continue;case 7:t=u.ops.pop(),u.trys.pop();continue;default:if(!(o=0<(o=u.trys).length&&o[o.length-1])&&(6===t[0]||2===t[0])){u=0;continue}if(3===t[0]&&(!o||t[1]>o[0]&&t[1]<o[3])){u.label=t[1];break}if(6===t[0]&&u.label<o[1]){u.label=o[1],o=t;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(t);break}o[2]&&u.ops.pop(),u.trys.pop();continue}t=n.call(r,u)}catch(e){t=[6,e],s=0}finally{i=o=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}}function m(e){var t="function"==typeof Symbol&&e[Symbol.iterator],r=0;return t?t.call(e):{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}}}function r(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,i,s=r.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(n=s.next()).done;)o.push(n.value)}catch(e){i={error:e}}finally{try{n&&!n.done&&(r=s.return)&&r.call(s)}finally{if(i)throw i.error}}return o}function v(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(r(arguments[t]));return e}var i=(o.prototype.valueOf=function(){},o.prototype.liquidMethodMissing=function(e){},o);function o(){}var u=Object.prototype.toString;function g(e){return"[object String]"===u.call(e)}function a(e){return"function"==typeof e}function c(e){return h(e=l(e))?"":String(e)}function l(e){return e instanceof i?e.valueOf():e}function p(e){return"number"==typeof e}function h(e){return null==e}function b(e){return"[object Array]"===u.call(e)}function f(e,t){for(var r in e=e||{})if(e.hasOwnProperty(r)&&!1===t(e[r],r,e))break;return e}function d(e){return e[e.length-1]}function x(e){var t=typeof e;return null!==e&&("object"==t||"function"==t)}function T(e,t,r){void 0===r&&(r=1);for(var n=[],i=e;i<t;i+=r)n.push(i);return n}function k(e,t,r){void 0===r&&(r=" ");for(var n=t-(e=String(e)).length;0<n--;)e=r+e;return e}var R,E=(t(S,R=Error),S.prototype.update=function(){var e=this.originalError,t=function(t){var r=t.input.split("\n"),e=Math.max(t.line-2,1),n=Math.min(t.line+3,r.length);return T(e,n+1).map(function(e){return(e===t.line?">> ":"   ")+k(String(e),String(n).length)+"| "+r[e-1]}).join("\n")}(this.token);this.message=function(e,t){return t.file&&(e+=", file:"+t.file),e+=", line:"+t.line+", col:"+t.col}(e.message,this.token),this.stack=this.message+"\n"+t+"\n"+this.stack+"\nFrom "+e.stack},S);function S(e,t){var r=R.call(this,e.message)||this;return r.originalError=e,r.token=t,r}var q,O=(t(M,q=E),M);function M(e,t){var r=q.call(this,new Error(e),t)||this;return r.name="TokenizationError",q.prototype.update.call(r),r}var _,F=(t(L,_=E),L);function L(e,t){var r=_.call(this,e,t)||this;return r.name="ParseError",r.message=e.message,_.prototype.update.call(r),r}var P,D=(t(j,P=E),j.is=function(e){return e instanceof j},j);function j(e,t){var r=P.call(this,e,t.token)||this;return r.name="RenderError",r.message=e.message,P.prototype.update.call(r),r}var U,A=(t(N,U=Error),N);function N(e){var t=U.call(this,e)||this;return t.name="AssertionError",t.message=e+"",t}function H(e,t){if(!e)throw new A(t=t||"expect "+e+" to be true")}var z={root:["."],cache:!1,extname:"",dynamicPartials:!0,trimTagRight:!1,trimTagLeft:!1,trimOutputRight:!1,trimOutputLeft:!1,greedy:!0,tagDelimiterLeft:"{%",tagDelimiterRight:"%}",outputDelimiterLeft:"{{",outputDelimiterRight:"}}",strictFilters:!1,strictVariables:!1};function Y(e){return(e=e||{}).hasOwnProperty("root")&&(e.root=V(e.root)),e}function $(e){return y({},z,e)}function V(e){return b(e)?e:g(e)?[e]:[]}var C=(I.prototype.getRegister=function(e,t){return void 0===t&&(t={}),this.registers[e]=this.registers[e]||t},I.prototype.setRegister=function(e,t){return this.registers[e]=t},I.prototype.getAll=function(){return v([this.environments],this.scopes).reduce(function(e,t){return y(e,t)},{})},I.prototype.get=function(e){var t,r,n=this.parseProp(e),i=this.findScope(n[0])||this.environments;try{for(var s=m(n),o=s.next();!o.done;o=s.next()){var u=o.value;if(h(i=G(i,u))&&this.opts.strictVariables)throw new TypeError("undefined variable: "+u)}}catch(e){t={error:e}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}return i},I.prototype.push=function(e){return this.scopes.push(e)},I.prototype.pop=function(){return this.scopes.pop()},I.prototype.front=function(){return this.scopes[0]},I.prototype.findScope=function(e){for(var t=this.scopes.length-1;0<=t;t--){var r=this.scopes[t];if(e in r)return r}return null},I.prototype.parseProp=function(e){e=String(e);for(var t,r=[],n="",i=0;i<e.length;)switch(e[i]){case"[":o();var s=e[i+1];i=/['"]/.test(s)?(H(-1!==(t=e.indexOf(s,i+2)),"unbalanced "+s+": "+e),n=e.slice(i+2,t),o(),t+2):(H(-1!==(t=W(e,i+1)),"unbalanced []: "+e),n=e.slice(i+1,t),/^[+-]?\d+$/.test(n)||(n=String(this.get(n))),o(),t+1);break;case".":o(),i++;break;default:n+=e[i++]}if(o(),!r.length)throw new TypeError('invalid path:"'+e+'"');return r;function o(){n.length&&r.push(n),n=""}},I);function I(e,t,r){void 0===e&&(e={}),void 0===r&&(r=!1),this.scopes=[{}],this.registers={},this.sync=r,this.opts=$(t),this.environments=e}function G(e,t){return h(e)?e:(e=function e(t){return t&&a(t.toLiquid)?e(t.toLiquid()):t}(e))instanceof i?a(e[t])?e[t]():e.hasOwnProperty(t)?e[t]:e.liquidMethodMissing(t):"size"===t?function(e){return h(e.size)&&(b(e)||g(e))?e.length:e.size}(e):e[t]}function W(e,t){for(var r=1,n=t;n<e.length;n++)if("["===e[n]&&r++,"]"===e[n]&&0===--r)return n;return-1}var J,B={readFile:function(n){return s(this,void 0,void 0,function(){return w(this,function(e){return[2,new Promise(function(e,t){var r=new XMLHttpRequest;r.onload=function(){200<=r.status&&r.status<300?e(r.responseText):t(new Error(r.statusText))},r.onerror=function(){t(new Error("An error occurred whilst receiving the response."))},r.open("GET",n),r.send()})]})})},resolve:function(e,t,i){return e.length&&"/"!==d(e)&&(e+="/"),function(e,t){var r=document.createElement("base");r.href=e;var n=document.getElementsByTagName("head")[0];n.insertBefore(r,n.firstChild);var i=document.createElement("a");i.href=t;var s=i.href;return n.removeChild(r),s}(e,t).replace(/^(\w+:\/\/[^/]+)(\/[^?]+)/,function(e,t,r){var n=r.split("/").pop();return/\.\w+$/.test(n)?e:t+r+i})},exists:function(){return s(this,void 0,void 0,function(){return w(this,function(e){return[2,!0]})})},existsSync:function(){return!0},readFileSync:function(e){var t=new XMLHttpRequest;if(t.open("GET",e,!1),t.send(),t.status<200||300<=t.status)throw new Error(t.statusText);return t.responseText}},X=function(e,t,r,n,i){this.trimLeft=!1,this.trimRight=!1,this.type="notset",this.col=n,this.line=r,this.raw=e,this.value=e,this.input=t,this.file=i},K=(t(Q,J=X),Q);function Q(e,t,r,n,i,s,o,u){var a=J.call(this,e,r,n,i,u)||this,c="-"===t[0],l="-"===d(t);return a.value=t.slice(c?1:0,l?-1:t.length).trim(),a.trimLeft=c||s,a.trimRight=l||o,a}var Z,ee=new RegExp(/'[^']*'/.source+"|"+/"[^"]*"/.source),te=/[+-]?(?:\d+\.?\d*|\.?\d+)/,re=/[\w-]+[?]?/,ne=new RegExp("\\[(?:"+ee.source+"|[\\w-\\.]+)\\]"),ie=new RegExp("(?:"+ee.source+"|"+/true|false/.source+"|"+te.source+")"),se=new RegExp(re.source+"(?:\\."+re.source+"|"+ne.source+")*"),oe=new RegExp("(?:"+se.source+"|"+te.source+")"),ue=new RegExp("\\("+oe.source+"\\.\\."+oe.source+"\\)"),ae=new RegExp("\\(("+oe.source+")\\.\\.("+oe.source+")\\)"),ce=new RegExp("(?:"+se.source+"|"+ie.source+"|"+ue.source+")"),le=new RegExp("(?:"+re.source+")\\s*:\\s*(?:"+ce.source+")"),pe=new RegExp("("+re.source+")\\s*:\\s*("+ce.source+")","g"),he=new RegExp("^\\s*("+re.source+")\\s*([\\s\\S]*?)\\s*$"),fe=new RegExp("^"+ee.source+"$"),de=new RegExp("^"+ae.source+"$"),ve=(t(ge,Z=K),ge.is=function(e){return"tag"===e.type},ge);function ge(e,t,r,n,i,s,o){var u=Z.call(this,e,t,r,n,i,s.trimTagLeft,s.trimTagRight,o)||this;u.type="tag";var a=u.value.match(he);if(!a)throw new O("illegal tag syntax",u);return u.name=a[1],u.args=a[2],u}var ye,we=(t(me,ye=X),me.is=function(e){return"html"===e.type},me);function me(e,t,r,n,i){var s=ye.call(this,e,t,r,n,i)||this;return s.type="html",s.value=e,s}function be(e,t){if(e&&we.is(e)){var r=t?/\s+$/g:/[\t\r ]*$/g;e.value=e.value.replace(r,"")}}function xe(e,t){if(e&&we.is(e)){var r=t?/^\s+/g:/^[\t\r ]*\n?/g;e.value=e.value.replace(r,"")}}var Te,ke,Re,Ee=(t(Se,Te=K),Se.is=function(e){return"output"===e.type},Se);function Se(e,t,r,n,i,s,o){var u=Te.call(this,e,t,r,n,i,s.trimOutputLeft,s.trimOutputRight,o)||this;return u.type="output",u}function qe(e){return e}(Re=ke=ke||{})[Re.HTML=0]="HTML",Re[Re.OUTPUT=1]="OUTPUT",Re[Re.TAG=2]="TAG";var Oe=(Me.prototype.tokenize=function(e,t){for(var r=[],n=this.options,i=n.tagDelimiterLeft,s=n.tagDelimiterRight,o=n.outputDelimiterLeft,u=n.outputDelimiterRight,a=0,c=1,l=ke.HTML,p="",h=0,f=1,d=1;a<e.length;){if("\n"===e[a]&&(c++,h=a+1),l===ke.HTML){if(e.substr(a,o.length)===o){p&&r.push(new we(qe(p),e,f,d,t)),f=c,d=a-h+1,a+=(p=o).length,l=ke.OUTPUT;continue}if(e.substr(a,i.length)===i){p&&r.push(new we(qe(p),e,f,d,t)),f=c,d=a-h+1,a+=(p=i).length,l=ke.TAG;continue}}else{if(l===ke.OUTPUT&&e.substr(a,u.length)===u){p+=u,r.push(new Ee(qe(p),p.slice(o.length,-u.length),e,f,d,this.options,t)),p="",f=c,d=(a+=u.length)-h+1,l=ke.HTML;continue}if(e.substr(a,s.length)===s){p+=s,r.push(new ve(qe(p),p.slice(i.length,-s.length),e,f,d,this.options,t)),p="",f=c,d=(a+=s.length)-h+1,l=ke.HTML;continue}}p+=e[a++]}if(l===ke.HTML)return p&&r.push(new we(qe(p),e,f,d,t)),function(e,t){t=y({greedy:!0},t);for(var r=!1,n=0;n<e.length;n++){var i=e[n];!r&&i.trimLeft&&be(e[n-1],t.greedy),ve.is(i)&&("raw"===i.name?r=!0:"endraw"===i.name&&(r=!1)),!r&&i.trimRight&&xe(e[n+1],t.greedy)}}(r,this.options),r;var v=l===ke.OUTPUT?"output":"tag",g=16<p.length?p.slice(0,13)+"...":p;throw new O(v+' "'+g+'" not closed',new X(qe(p),e,f,d,t))},Me);function Me(e){this.options=$(e)}var _e=(Fe.prototype.write=function(e){this.html+=e},Fe);function Fe(){this.html="",this.break=!1,this.continue=!1}var Le=(Pe.prototype.renderTemplates=function(t,r,n){var i,s,o,u,a,c,l,p;return void 0===n&&(n=new _e),w(this,function(e){switch(e.label){case 0:e.trys.push([0,7,8,9]),i=m(t),s=i.next(),e.label=1;case 1:if(s.done)return[3,6];o=s.value,e.label=2;case 2:return e.trys.push([2,4,,5]),[4,o.render(r,n)];case 3:return(u=e.sent())&&n.write(u),n.break||n.continue?[3,6]:[3,5];case 4:throw a=e.sent(),D.is(a)?a:new D(a,o);case 5:return s=i.next(),[3,1];case 6:return[3,9];case 7:return c=e.sent(),l={error:c},[3,9];case 8:try{s&&!s.done&&(p=i.return)&&p.call(i)}finally{if(l)throw l.error}return[7];case 9:return[2,n.html]}})},Pe);function Pe(){}function De(e){this.token=e}var je,Ue=(t(Ae,je=i),Ae.prototype.equals=function(e){return g(e)||b(e)?0===e.length:!!x(e)&&0===Object.keys(e).length},Ae.prototype.gt=function(){return!1},Ae.prototype.geq=function(){return!1},Ae.prototype.lt=function(){return!1},Ae.prototype.leq=function(){return!1},Ae.prototype.valueOf=function(){return""},Ae);function Ae(){return null!==je&&je.apply(this,arguments)||this}var Ne,He=(t(ze,Ne=Ue),ze.prototype.equals=function(e){return!1===e||!!h(l(e))||(g(e)?/^\s*$/.test(e):Ne.prototype.equals.call(this,e))},ze);function ze(){return null!==Ne&&Ne.apply(this,arguments)||this}var Ye,$e=(t(Ve,Ye=i),Ve.prototype.equals=function(e){return h(l(e))||e instanceof He},Ve.prototype.gt=function(){return!1},Ve.prototype.geq=function(){return!1},Ve.prototype.lt=function(){return!1},Ve.prototype.leq=function(){return!1},Ve.prototype.valueOf=function(){return null},Ve);function Ve(){return null!==Ye&&Ye.apply(this,arguments)||this}var Ce=(Ie.prototype.evaluate=function(e){var t=function(e){return"true"===(e=e.trim())||"false"!==e&&("nil"===e||"null"===e?new $e:"empty"===e?new Ue:"blank"===e?new He:isNaN(Number(e))?'"'!==e[0]&&"'"!==e[0]||e[0]!==d(e)?void 0:e.slice(1,-1):Number(e))}(this.str);return void 0!==t?t:e.get(this.str)},Ie.prototype.value=function(e){return l(this.evaluate(e))},Ie);function Ie(e){this.str=e}function Ge(e){return e&&a(e.equals)}function We(e){return!Je(e)}function Je(e){return!1===e||null==e}var Be={"==":1,"!=":1,">":1,"<":1,">=":1,"<=":1,contains:1,and:0,or:0},Xe={"==":function(e,t){return Ge(e)?e.equals(t):Ge(t)?t.equals(e):e===t},"!=":function(e,t){return Ge(e)?!e.equals(t):Ge(t)?!t.equals(e):e!==t},">":function(e,t){return Ge(e)?e.gt(t):Ge(t)?t.lt(e):t<e},"<":function(e,t){return Ge(e)?e.lt(t):Ge(t)?t.gt(e):e<t},">=":function(e,t){return Ge(e)?e.geq(t):Ge(t)?t.leq(e):t<=e},"<=":function(e,t){return Ge(e)?e.leq(t):Ge(t)?t.geq(e):e<=t},contains:function(e,t){return!(!e||!a(e.indexOf))&&-1<e.indexOf(t)},and:function(e,t){return We(e)&&We(t)},or:function(e,t){return We(e)||We(t)}},Ke=Object.keys(Be);function Qe(e){return Ke.includes(e)}var Ze=(et.prototype.evaluate=function(t){var r,n,i,s,o,u,a,c,l,p;return w(this,function(e){switch(e.label){case 0:H(t,"unable to evaluate: context not defined"),e.label=1;case 1:e.trys.push([1,9,10,11]),r=m(this.postfix),n=r.next(),e.label=2;case 2:return n.done?[3,8]:Qe(i=n.value)?(this.evaluateOnce(i),[3,7]):[3,3];case 3:return function(e){return"("===e[0]&&")"===e[e.length-1]}(i)?(o=(s=this.operands).push,[4,function(t,r){var n,i,s;return w(this,function(e){switch(e.label){case 0:return(n=t.match(de))?[4,new Ce(n[1]).value(r)]:[3,3];case 1:return i=e.sent(),[4,new Ce(n[2]).value(r)];case 2:return s=e.sent(),[2,T(+i,+s+1)];case 3:return[2]}})}(i,t)]):[3,5];case 4:return o.apply(s,[e.sent()]),[3,7];case 5:return a=(u=this.operands).push,[4,new Ce(i).evaluate(t)];case 6:a.apply(u,[e.sent()]),e.label=7;case 7:return n=r.next(),[3,2];case 8:return[3,11];case 9:return c=e.sent(),l={error:c},[3,11];case 10:try{n&&!n.done&&(p=r.return)&&p.call(r)}finally{if(l)throw l.error}return[7];case 11:return[2,this.operands[0]]}})},et.prototype.value=function(t){var r;return w(this,function(e){switch(e.label){case 0:return r=l,[4,this.evaluate(t)];case 1:return[2,r.apply(void 0,[e.sent()])]}})},et.prototype.evaluateOnce=function(e){var t=this.operands.pop(),r=this.operands.pop(),n=Xe[e](r,t);this.operands.push(n)},et);function et(e){void 0===e&&(e=""),this.operands=[],this.postfix=v(function(t){var r,n,i,s,o,u,a;return w(this,function(e){switch(e.label){case 0:r=[],e.label=1;case 1:e.trys.push([1,10,11,12]),n=m(function(t){var r,n,i,s,o;return w(this,function(e){switch(e.label){case 0:r=t.length,n="",i={'"':'"',"'":"'","[":"]","(":")"},s=0,e.label=1;case 1:if(!(s<r))return[3,8];switch(o=t[s],o){case"[":case'"':case"'":return[3,2];case" ":case"\t":case"\n":return[3,3]}return[3,6];case 2:for(n+=o;s+1<r&&(n+=t[++s],t[s]!==i[o]););return[3,7];case 3:return n?[4,n]:[3,5];case 4:e.sent(),e.label=5;case 5:return n="",[3,7];case 6:n+=o,e.label=7;case 7:return s++,[3,1];case 8:return n?[4,n]:[3,10];case 9:e.sent(),e.label=10;case 10:return[2]}})}(t)),i=n.next(),e.label=2;case 2:if(i.done)return[3,9];if(!Qe(s=i.value))return[3,6];e.label=3;case 3:return r.length&&Be[r[r.length-1]]>Be[s]?[4,r.pop()]:[3,5];case 4:return e.sent(),[3,3];case 5:return r.push(s),[3,8];case 6:return[4,s];case 7:e.sent(),e.label=8;case 8:return i=n.next(),[3,2];case 9:return[3,12];case 10:return o=e.sent(),u={error:o},[3,12];case 11:try{i&&!i.done&&(a=n.return)&&a.call(n)}finally{if(u)throw u.error}return[7];case 12:return r.length?[4,r.pop()]:[3,14];case 13:return e.sent(),[3,12];case 14:return[2]}})}(e))}var tt=(rt.prototype.on=function(e,t){return this.handlers[e]=t,this},rt.prototype.trigger=function(e,t){var r=this.handlers[e];return!!r&&(r(t),!0)},rt.prototype.start=function(){var e;for(this.trigger("start");!this.stopRequested&&(e=this.tokens.shift());)if(!(this.trigger("token",e)||ve.is(e)&&this.trigger("tag:"+e.name,e))){var t=this.parseToken(e,this.tokens);this.trigger("template",t)}return this.stopRequested||this.trigger("end"),this},rt.prototype.stop=function(){return this.stopRequested=!0,this},rt);function rt(e,t){this.handlers={},this.stopRequested=!1,this.tokens=e,this.parseToken=t}var nt=(it.parse=function(e){var t,r=new it;for(pe.lastIndex=0;t=pe.exec(e);){var n=t[1],i=t[2];r[n]=i}return r},it.create=function(t,r){var n,i,s,o,u,a,c,l,p;return w(this,function(e){switch(e.label){case 0:n=it.parse(t),e.label=1;case 1:e.trys.push([1,6,7,8]),i=m(Object.keys(n)),s=i.next(),e.label=2;case 2:return s.done?[3,5]:(o=s.value,[4,new Ze((u=n)[a=o]).evaluate(r)]);case 3:u[a]=e.sent(),e.label=4;case 4:return s=i.next(),[3,2];case 5:return[3,8];case 6:return c=e.sent(),l={error:c},[3,8];case 7:try{s&&!s.done&&(p=i.return)&&p.call(i)}finally{if(l)throw l.error}return[7];case 8:return[2,n]}})},it);function it(){}var st,ot=(t(ut,st=De),ut.prototype.render=function(t,r){var n,i;return w(this,function(e){switch(e.label){case 0:return[4,nt.create(this.token.args,t)];case 1:return n=e.sent(),a((i=this.impl).render)?[4,i.render(t,n,r)]:[3,3];case 2:return[2,e.sent()];case 3:return[2]}})},ut.register=function(e,t){ut.impls[e]=t},ut.clear=function(){ut.impls={}},ut.impls={},ut);function ut(e,t,r){var n=st.call(this,e)||this;n.name=e.name;var i=ut.impls[e.name];return H(i,"tag "+e.name+" not found"),n.impl=Object.create(i),n.impl.liquid=r,n.impl.parse&&n.impl.parse(e,t),n}var at=(ct.prototype.render=function(t,r){var n,i,s,o,u,a,c,l,p,h,f,d;return w(this,function(e){switch(e.label){case 0:n=[],e.label=1;case 1:e.trys.push([1,8,9,10]),i=m(this.args),s=i.next(),e.label=2;case 2:return s.done?[3,7]:function(e){return b(e)}(o=s.value)?(a=(u=n).push,c=[o[0]],[4,new Ze(o[1]).evaluate(r)]):[3,4];case 3:return a.apply(u,[c.concat([e.sent()])]),[3,6];case 4:return p=(l=n).push,[4,new Ze(o).evaluate(r)];case 5:p.apply(l,[e.sent()]),e.label=6;case 6:return s=i.next(),[3,2];case 7:return[3,10];case 8:return h=e.sent(),f={error:h},[3,10];case 9:try{s&&!s.done&&(d=i.return)&&d.call(i)}finally{if(f)throw f.error}return[7];case 10:return[2,this.impl.apply({context:r},v([t],n))]}})},ct.register=function(e,t){ct.impls[e]=t},ct.clear=function(){ct.impls={}},ct.impls={},ct);function ct(e,t,r){var n=ct.impls[e];if(!n&&r)throw new TypeError("undefined filter: "+e);this.name=e,this.impl=n||function(e){return e},this.args=t}var lt=(pt.prototype.parseFilters=function(e,t){for(var r=t;r<e.length;)if("|"===e[r]){for(var n=++r;r<e.length&&"|"!==e[r];)r++;this.parseFilter(e,n,r)}else r++},pt.prototype.parseFilter=function(e,t,r){for(var n,i,s=e[t],o=[],u=t+1;u<r+1;u++)u===r||","===e[u]?((n||i)&&o.push(n?[n,i]:i),i=n=void 0):":"===e[u]?(n=i,i=void 0):void 0===i&&(i=e[u]);this.filters.push(new at(s,o,this.strictFilters))},pt.prototype.value=function(t){var r,n,i,s,o,u;return w(this,function(e){switch(e.label){case 0:return[4,new Ze(this.initial).evaluate(t)];case 1:r=e.sent(),e.label=2;case 2:e.trys.push([2,7,8,9]),n=m(this.filters),i=n.next(),e.label=3;case 3:return i.done?[3,6]:[4,i.value.render(r,t)];case 4:r=e.sent(),e.label=5;case 5:return i=n.next(),[3,3];case 6:return[3,9];case 7:return s=e.sent(),o={error:s},[3,9];case 8:try{i&&!i.done&&(u=n.return)&&u.call(n)}finally{if(o)throw o.error}return[7];case 9:return[2,r]}})},pt.tokenize=function(e){for(var t=[],r=0;r<e.length;){var n=e[r];if('"'===n||"'"===n){var i=r;for(r+=2;r<e.length&&e[r-1]!==n;++r);t.push(e.slice(i,r))}else if(/\s/.test(n))r++;else if(/[|,:]/.test(n))t.push(e[r++]);else{i=r++;for(var s=void 0;r<e.length&&!/[|,:\s]/.test(s=e[r]);++r)if('"'===s||"'"===s)for(r+=2;r<e.length&&e[r-1]!==s;++r);t.push(e.slice(i,r))}}return t},pt);function pt(e,t){this.filters=[];var r=pt.tokenize(e);this.strictFilters=t,this.initial=r[0],this.parseFilters(r,1)}var ht,ft=(t(dt,ht=De),dt.prototype.render=function(t,r){var n;return w(this,function(e){switch(e.label){case 0:return[4,this.value.value(t)];case 1:return n=e.sent(),r.write(c(l(n))),[2]}})},dt);function dt(e,t){var r=ht.call(this,e)||this;return r.value=new lt(e.value,t),r}var vt,gt=(t(yt,vt=De),yt.prototype.render=function(e,t){return w(this,function(e){return t.write(this.str),[2]})},yt);function yt(e){var t=vt.call(this,e)||this;return t.str=e.value,t}var wt=(mt.prototype.parse=function(e){for(var t,r=[];t=e.shift();)r.push(this.parseToken(t,e));return r},mt.prototype.parseToken=function(t,e){try{return ve.is(t)?new ot(t,e,this.liquid):Ee.is(t)?new ft(t,this.liquid.options.strictFilters):new gt(t)}catch(e){throw new F(e,t)}},mt.prototype.parseStream=function(e){var r=this;return new tt(e,function(e,t){return r.parseToken(e,t)})},mt);function mt(e){this.liquid=e}var bt,xt=new RegExp("("+re.source+")\\s*=([^]*)"),Tt={parse:function(e){var t=e.args.match(xt);H(t,"illegal token "+e.raw),this.key=t[1],this.value=t[2]},render:function(t){var r,n;return w(this,function(e){switch(e.label){case 0:return r=t.front(),n=this.key,[4,this.liquid._evalValue(this.value,t)];case 1:return r[n]=e.sent(),[2]}})}},kt=(t(Rt,bt=i),Rt.prototype.next=function(){this.i++},Rt.prototype.index0=function(){return this.i},Rt.prototype.index=function(){return this.i+1},Rt.prototype.first=function(){return 0===this.i},Rt.prototype.last=function(){return this.i===this.length-1},Rt.prototype.rindex=function(){return this.length-this.i},Rt.prototype.rindex0=function(){return this.length-this.i-1},Rt.prototype.valueOf=function(){return JSON.stringify(this)},Rt);function Rt(e){var t=bt.call(this)||this;return t.i=0,t.length=e,t}var Et,St,qt=new RegExp("^("+re.source+")\\s+in\\s+("+ce.source+")(?:\\s+"+le.source+")*(?:\\s+(reversed))?(?:\\s+"+le.source+")*$"),Ot={type:"block",parse:function(e,t){var r,n=this,i=qt.exec(e.args);H(i,"illegal tag: "+e.raw),this.variable=i[1],this.collection=i[2],this.reversed=!!i[3],this.templates=[],this.elseTemplates=[];var s=this.liquid.parser.parseStream(t).on("start",function(){return r=n.templates}).on("tag:else",function(){return r=n.elseTemplates}).on("tag:endfor",function(){return s.stop()}).on("template",function(e){return r.push(e)}).on("end",function(){throw new Error("tag "+e.raw+" not closed")});s.start()},render:function(t,r,n){var i,s,o,u,a,c,l,p,h,f,d;return w(this,function(e){switch(e.label){case 0:return i=this.liquid.renderer,[4,new Ze(this.collection).value(t)];case 1:return b(s=e.sent())||(g(s)&&0<s.length?s=[s]:x(s)&&(s=Object.keys(s).map(function(e){return[e,s[e]]}))),b(s)&&s.length?[3,3]:[4,i.renderTemplates(this.elseTemplates,t,n)];case 2:return e.sent(),[2];case 3:o=r.offset||0,u=void 0===r.limit?s.length:r.limit,s=s.slice(o,o+u),this.reversed&&s.reverse(),a={forloop:new kt(s.length)},t.push(a),e.label=4;case 4:e.trys.push([4,9,10,11]),c=m(s),l=c.next(),e.label=5;case 5:return l.done?[3,8]:(p=l.value,a[this.variable]=p,[4,i.renderTemplates(this.templates,t,n)]);case 6:if(e.sent(),n.break)return n.break=!1,[3,8];n.continue=!1,a.forloop.next(),e.label=7;case 7:return l=c.next(),[3,5];case 8:return[3,11];case 9:return h=e.sent(),f={error:h},[3,11];case 10:try{l&&!l.done&&(d=c.return)&&d.call(c)}finally{if(f)throw f.error}return[7];case 11:return t.pop(),[2]}})}},Mt=new RegExp("("+re.source+")"),_t={parse:function(e,t){var r=this,n=e.args.match(Mt);H(n,e.args+" not valid identifier"),this.variable=n[1],this.templates=[];var i=this.liquid.parser.parseStream(t);i.on("tag:endcapture",function(){return i.stop()}).on("template",function(e){return r.templates.push(e)}).on("end",function(){throw new Error("tag "+e.raw+" not closed")}),i.start()},render:function(t){var r;return w(this,function(e){switch(e.label){case 0:return[4,this.liquid.renderer.renderTemplates(this.templates,t)];case 1:return r=e.sent(),t.front()[this.variable]=r,[2]}})}},Ft={parse:function(e,t){var r=this;this.cond=e.args,this.cases=[],this.elseTemplates=[];var n=[],i=this.liquid.parser.parseStream(t).on("tag:when",function(e){r.cases.push({val:e.args,templates:n=[]})}).on("tag:else",function(){return n=r.elseTemplates}).on("tag:endcase",function(){return i.stop()}).on("template",function(e){return n.push(e)}).on("end",function(){throw new Error("tag "+e.raw+" not closed")});i.start()},render:function(t,e,r){var n,i,s,o,u;return w(this,function(e){switch(e.label){case 0:n=this.liquid.renderer,i=0,e.label=1;case 1:return i<this.cases.length?(s=this.cases[i],[4,new Ze(s.val).value(t)]):[3,6];case 2:return o=e.sent(),[4,new Ze(this.cond).value(t)];case 3:return u=e.sent(),o!==u?[3,5]:[4,n.renderTemplates(s.templates,t,r)];case 4:return e.sent(),[2];case 5:return i++,[3,1];case 6:return[4,n.renderTemplates(this.elseTemplates,t,r)];case 7:return e.sent(),[2]}})}},Lt={parse:function(e,t){var r=this.liquid.parser.parseStream(t);r.on("token",function(e){"endcomment"===e.name&&r.stop()}).on("end",function(){throw new Error("tag "+e.raw+" not closed")}),r.start()}};(St=Et=Et||{})[St.OUTPUT=0]="OUTPUT",St[St.STORE=1]="STORE";var Pt,Dt=Et,jt=/[^\s,]+/,Ut=new RegExp("with\\s+("+ce.source+")"),At={parse:function(e){var t=jt.exec(e.args);t&&(this.staticValue=t[0]),(t=ce.exec(e.args))&&(this.value=t[0]),(t=Ut.exec(e.args))&&(this.with=t[1])},render:function(t,r,n){var i,s,o,u,a,c,l;return w(this,function(e){switch(e.label){case 0:return t.opts.dynamicPartials?fe.exec(this.value)?(s=this.value.slice(1,-1),[4,this.liquid._parseAndRender(s,t.getAll(),t.opts,t.sync)]):[3,2]:[3,5];case 1:return i=e.sent(),[3,4];case 2:return[4,new Ze(this.value).value(t)];case 3:i=e.sent(),e.label=4;case 4:return[3,6];case 5:i=this.staticValue,e.label=6;case 6:return H(i,"cannot include with empty filename"),o=t.getRegister("blocks"),u=t.getRegister("blockMode"),t.setRegister("blocks",{}),t.setRegister("blockMode",Dt.OUTPUT),this.with?(a=r,c=i,[4,new Ze(this.with).evaluate(t)]):[3,8];case 7:a[c]=e.sent(),e.label=8;case 8:return[4,this.liquid._parseFile(i,t.opts,t.sync)];case 9:return l=e.sent(),t.push(r),[4,this.liquid.renderer.renderTemplates(l,t,n)];case 10:return e.sent(),t.pop(),t.setRegister("blocks",o),t.setRegister("blockMode",u),[2]}})}},Nt=/[^\s,]+/,Ht=new RegExp("with\\s+("+ce.source+")"),zt={parse:function(e){var t=Nt.exec(e.args);t&&(this.staticValue=t[0]),(t=ce.exec(e.args))&&(this.value=t[0]),(t=Ht.exec(e.args))&&(this.with=t[1])},render:function(t,r,n){var i,s,o,u,a,c,l,p;return w(this,function(e){switch(e.label){case 0:return t.opts.dynamicPartials?fe.exec(this.value)?(s=this.value.slice(1,-1),[4,this.liquid._parseAndRender(s,t.getAll(),t.opts,t.sync)]):[3,2]:[3,5];case 1:return i=e.sent(),[3,4];case 2:return[4,new Ze(this.value).value(t)];case 3:i=e.sent(),e.label=4;case 4:return[3,6];case 5:i=this.staticValue,e.label=6;case 6:return H(i,"cannot render with empty filename"),o=t.getRegister("blocks"),u=t.getRegister("blockMode"),(a=new C({},t.opts,t.sync)).setRegister("blocks",{}),a.setRegister("blockMode",Dt.OUTPUT),this.with?(c=r,l=i,[4,new Ze(this.with).evaluate(t)]):[3,8];case 7:c[l]=e.sent(),e.label=8;case 8:return a.push(r),[4,this.liquid._parseFile(i,a.opts,a.sync)];case 9:return p=e.sent(),[4,this.liquid.renderer.renderTemplates(p,a,n)];case 10:return e.sent(),a.setRegister("blocks",o),a.setRegister("blockMode",u),[2]}})}},Yt={parse:function(e){var t=e.args.match(re);H(t,"illegal identifier "+e.args),this.variable=t[0]},render:function(e,t,r){var n=e.environments;p(n[this.variable])||(n[this.variable]=0),r.write(c(--n[this.variable]))}},$t=new RegExp("^(?:("+ce.source+")\\s*:\\s*)?(.*)$"),Vt=new RegExp(ce.source,"g"),Ct={parse:function(e){var t=$t.exec(e.args);H(t,"illegal tag: "+e.raw),this.group=new Ze(t[1]);var r=t[2];for(this.candidates=[];t=Vt.exec(r);)this.candidates.push(t[0]);H(this.candidates.length,"empty candidates: "+e.raw)},render:function(t,e,r){var n,i,s,o,u,a;return w(this,function(e){switch(e.label){case 0:return[4,this.group.value(t)];case 1:return n=e.sent(),i="cycle:"+n+":"+this.candidates.join(","),s=t.getRegister("cycle"),void 0===(o=s[i])&&(o=s[i]=0),u=this.candidates[o],o=(o+1)%this.candidates.length,s[i]=o,[4,new Ze(u).value(t)];case 2:return a=e.sent(),r.write(a),[2]}})}},It={parse:function(e,t){var r,n=this;this.branches=[],this.elseTemplates=[];var i=this.liquid.parser.parseStream(t).on("start",function(){return n.branches.push({cond:e.args,templates:r=[]})}).on("tag:elsif",function(e){n.branches.push({cond:e.args,templates:r=[]})}).on("tag:else",function(){return r=n.elseTemplates}).on("tag:endif",function(){return i.stop()}).on("template",function(e){return r.push(e)}).on("end",function(){throw new Error("tag "+e.raw+" not closed")});i.start()},render:function(t,e,r){var n,i,s,o,u,a,c;return w(this,function(e){switch(e.label){case 0:n=this.liquid.renderer,e.label=1;case 1:e.trys.push([1,7,8,9]),i=m(this.branches),s=i.next(),e.label=2;case 2:return s.done?[3,6]:(o=s.value,[4,new Ze(o.cond).value(t)]);case 3:return We(e.sent())?[4,n.renderTemplates(o.templates,t,r)]:[3,5];case 4:return e.sent(),[2];case 5:return s=i.next(),[3,2];case 6:return[3,9];case 7:return u=e.sent(),a={error:u},[3,9];case 8:try{s&&!s.done&&(c=i.return)&&c.call(i)}finally{if(a)throw a.error}return[7];case 9:return[4,n.renderTemplates(this.elseTemplates,t,r)];case 10:return e.sent(),[2]}})}},Gt={parse:function(e){var t=e.args.match(re);H(t,"illegal identifier "+e.args),this.variable=t[0]},render:function(e,t,r){var n=e.environments;p(n[this.variable])||(n[this.variable]=0);var i=n[this.variable];n[this.variable]++,r.write(c(i))}},Wt=/\S+/,Jt={parse:function(e,t){var r=Wt.exec(e.args);r&&(this.staticLayout=r[0]),(r=ce.exec(e.args))&&(this.layout=r[0]),this.tpls=this.liquid.parser.parse(t)},render:function(t,r,n){var i,s,o,u,a,c,l;return w(this,function(e){switch(e.label){case 0:return t.opts.dynamicPartials?[4,new Ze(this.layout).value(t)]:[3,2];case 1:return s=e.sent(),[3,3];case 2:s=this.staticLayout,e.label=3;case 3:return H(i=s,"cannot apply layout with empty filename"),t.setRegister("blockMode",Dt.STORE),o=t.getRegister("blocks"),[4,(u=this.liquid.renderer).renderTemplates(this.tpls,t)];case 4:return a=e.sent(),void 0===o[""]&&(o[""]=a),[4,this.liquid._parseFile(i,t.opts,t.sync)];case 5:return c=e.sent(),t.push(r),t.setRegister("blockMode",Dt.OUTPUT),[4,u.renderTemplates(c,t)];case 6:return l=e.sent(),t.pop(),n.write(l),[2]}})}},Bt={parse:function(e,t){var r=this,n=/\w+/.exec(e.args);this.block=n?n[0]:"",this.tpls=[];var i=this.liquid.parser.parseStream(t).on("tag:endblock",function(){return i.stop()}).on("template",function(e){return r.tpls.push(e)}).on("end",function(){throw new Error("tag "+e.raw+" not closed")});i.start()},render:function(t,e,r){var n,i,s,o,u;return w(this,function(e){switch(e.label){case 0:return n=t.getRegister("blocks"),i=n[this.block],s=this.liquid.renderer,void 0===i?[3,1]:(u=i,[3,3]);case 1:return[4,s.renderTemplates(this.tpls,t)];case 2:u=e.sent(),e.label=3;case 3:return o=u,t.getRegister("blockMode",Dt.OUTPUT)===Dt.STORE?(n[this.block]=o,[2]):(r.write(o),[2])}})}},Xt={parse:function(e,t){var r=this;this.tokens=[];var n=this.liquid.parser.parseStream(t);n.on("token",function(e){"endraw"===e.name?n.stop():r.tokens.push(e)}).on("end",function(){throw new Error("tag "+e.raw+" not closed")}),n.start()},render:function(){return this.tokens.map(function(e){return e.raw}).join("")}},Kt=(t(Qt,Pt=kt),Qt.prototype.row=function(){return Math.floor(this.i/this.cols)+1},Qt.prototype.col0=function(){return this.i%this.cols},Qt.prototype.col=function(){return this.col0()+1},Qt.prototype.col_first=function(){return 0===this.col0()},Qt.prototype.col_last=function(){return this.col()===this.cols},Qt);function Qt(e,t){var r=Pt.call(this,e)||this;return r.length=e,r.cols=t,r}var Zt=new RegExp("^("+re.source+")\\s+in\\s+("+ce.source+")(?:\\s+"+le.source+")*$"),er={assign:Tt,for:Ot,capture:_t,case:Ft,comment:Lt,include:At,render:zt,decrement:Yt,increment:Gt,cycle:Ct,if:It,layout:Jt,block:Bt,raw:Xt,tablerow:{parse:function(e,t){var r,n=this,i=Zt.exec(e.args);H(i,"illegal tag: "+e.raw),this.variable=i[1],this.collection=i[2],this.templates=[];var s=this.liquid.parser.parseStream(t).on("start",function(){return r=n.templates}).on("tag:endtablerow",function(){return s.stop()}).on("template",function(e){return r.push(e)}).on("end",function(){throw new Error("tag "+e.raw+" not closed")});s.start()},render:function(t,r,n){var i,s,o,u,a,c,l,p;return w(this,function(e){switch(e.label){case 0:return[4,new Ze(this.collection).value(t)];case 1:i=e.sent()||[],s=r.offset||0,o=void 0===r.limit?i.length:r.limit,i=i.slice(s,s+o),u=r.cols||i.length,a=this.liquid.renderer,c=new Kt(i.length,u),l={tablerowloop:c},t.push(l),p=0,e.label=2;case 2:return p<i.length?(l[this.variable]=i[p],0===c.col0()&&(1!==c.row()&&n.write("</tr>"),n.write('<tr class="row'+c.row()+'">')),n.write('<td class="col'+c.col()+'">'),[4,a.renderTemplates(this.templates,t,n)]):[3,5];case 3:e.sent(),n.write("</td>"),e.label=4;case 4:return p++,c.next(),[3,2];case 5:return i.length&&n.write("</tr>"),t.pop(),[2]}})}},unless:{parse:function(e,t){var r,n=this;this.templates=[],this.elseTemplates=[];var i=this.liquid.parser.parseStream(t).on("start",function(){r=n.templates,n.cond=e.args}).on("tag:else",function(){return r=n.elseTemplates}).on("tag:endunless",function(){return i.stop()}).on("template",function(e){return r.push(e)}).on("end",function(){throw new Error("tag "+e.raw+" not closed")});i.start()},render:function(t,e,r){var n;return w(this,function(e){switch(e.label){case 0:return n=this.liquid.renderer,[4,new Ze(this.cond).value(t)];case 1:return[4,Je(e.sent())?n.renderTemplates(this.templates,t,r):n.renderTemplates(this.elseTemplates,t,r)];case 2:return e.sent(),[2]}})}},break:{render:function(e,t,r){r.break=!0}},continue:{render:function(e,t,r){r.continue=!0}}},tr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},rr={"&amp;":"&","&lt;":"<","&gt;":">","&#34;":'"',"&#39;":"'"};function nr(e){return c(e).replace(/&|<|>|"|'/g,function(e){return tr[e]})}var ir={escape:nr,escape_once:function(e){return nr(function(e){return String(e).replace(/&(amp|lt|gt|#34|#39);/g,function(e){return rr[e]})}(e))},newline_to_br:function(e){return e.replace(/\n/g,"<br />")},strip_html:function(e){return e.replace(/<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g,"")}},sr={append:function(e,t){return c(e)+c(t)},prepend:function(e,t){return c(t)+c(e)},capitalize:function(e){return(e=c(e)).charAt(0).toUpperCase()+e.slice(1)},lstrip:function(e){return c(e).replace(/^\s+/,"")},downcase:function(e){return c(e).toLowerCase()},upcase:function(e){return c(e).toUpperCase()},remove:function(e,t){return c(e).split(t).join("")},remove_first:function(e,t){return c(e).replace(t,"")},replace:function(e,t,r){return c(e).split(t).join(r)},replace_first:function(e,t,r){return c(e).replace(t,r)},rstrip:function(e){return c(e).replace(/\s+$/,"")},split:function(e,t){return c(e).split(t)},strip:function(e){return c(e).trim()},strip_newlines:function(e){return c(e).replace(/\n/g,"")},truncate:function(e,t,r){void 0===t&&(t=50);void 0===r&&(r="...");return(e=c(e)).length<=t?e:e.substr(0,t-r.length)+r},truncatewords:function(e,t,r){void 0===t&&(t=15);void 0===r&&(r="...");var n=e.split(/\s+/),i=n.slice(0,t).join(" ");n.length>=t&&(i+=r);return i}};var or=String.prototype.toLowerCase,ur={abs:function(e){return Math.abs(e)},at_least:function(e,t){return Math.max(e,t)},at_most:function(e,t){return Math.min(e,t)},ceil:function(e){return Math.ceil(e)},divided_by:function(e,t){return e/t},floor:function(e){return Math.floor(e)},minus:function(e,t){return e-t},modulo:function(e,t){return e%t},round:function(e,t){void 0===t&&(t=0);var r=Math.pow(10,t);return Math.round(e*r)/r},plus:function(e,t){return Number(e)+Number(t)},sort_natural:function(e,r){return e&&e.sort?void 0===r?v(e).sort(ar):v(e).sort(function(e,t){return ar(e[r],t[r])}):[]},times:function(e,t){return e*t}};function ar(e,t){return t?e?(e=or.call(e))<(t=or.call(t))?-1:t<e?1:0:1:-1}var cr={url_decode:function(e){return e.split("+").map(decodeURIComponent).join(" ")},url_encode:function(e){return e.split(" ").map(encodeURIComponent).join("+")}},lr={join:function(e,t){return e.join(void 0===t?" ":t)},last:function(e){return b(e)?d(e):""},first:function(e){return b(e)?e[0]:""},map:function(e,t){return e.map(function(e){return e[t]})},reverse:function(e){return v(e).reverse()},sort:function(e,t){return e.sort(t)},size:function(e){return e&&e.length||0},concat:function(e,t){return Array.prototype.concat.call(e,t)},slice:function(e,t,r){void 0===r&&(r=1);return t=t<0?e.length+t:t,e.slice(t,t+r)},uniq:function(e){var t={};return(e||[]).filter(function(e){return!t.hasOwnProperty(String(e))&&(t[String(e)]=!0)})},where:function(e,t,r){return e.filter(function(e){return void 0===r?We(e[t]):e[t]===r})}};var pr=["January","February","March","April","May","June","July","August","September","October","November","December"],hr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],fr=pr.map(gr),dr=hr.map(gr),vr={1:"st",2:"nd",3:"rd",default:"th"};function gr(e){return e.slice(0,3)}var yr={daysInMonth:function(e){return[31,yr.isLeapYear(e)?29:28,31,30,31,30,31,31,30,31,30,31]},getDayOfYear:function(e){for(var t=0,r=0;r<e.getMonth();++r)t+=yr.daysInMonth(e)[r];return t+e.getDate()},getWeekOfYear:function(e,t){var r=this.getDayOfYear(e)+(t-e.getDay()),n=7-new Date(e.getFullYear(),0,1).getDay()+t;return k(String(Math.floor((r-n)/7)+1),2,"0")},isLeapYear:function(e){var t=e.getFullYear();return!(0!=(3&t)||!(t%100||t%400==0&&t))},getSuffix:function(e){var t=e.getDate().toString(),r=parseInt(t.slice(-1));return vr[r]||vr.default},century:function(e){return parseInt(e.getFullYear().toString().substring(0,2),10)}},wr={a:function(e){return dr[e.getDay()]},A:function(e){return hr[e.getDay()]},b:function(e){return fr[e.getMonth()]},B:function(e){return pr[e.getMonth()]},c:function(e){return e.toLocaleString()},C:function(e){return yr.century(e)},d:function(e){return k(e.getDate(),2,"0")},e:function(e){return k(e.getDate(),2)},H:function(e){return k(e.getHours(),2,"0")},I:function(e){return k(String(e.getHours()%12||12),2,"0")},j:function(e){return k(yr.getDayOfYear(e),3,"0")},k:function(e){return k(e.getHours(),2)},l:function(e){return k(String(e.getHours()%12||12),2)},L:function(e){return k(e.getMilliseconds(),3,"0")},m:function(e){return k(e.getMonth()+1,2,"0")},M:function(e){return k(e.getMinutes(),2,"0")},p:function(e){return e.getHours()<12?"AM":"PM"},P:function(e){return e.getHours()<12?"am":"pm"},q:function(e){return yr.getSuffix(e)},s:function(e){return Math.round(e.valueOf()/1e3)},S:function(e){return k(e.getSeconds(),2,"0")},u:function(e){return e.getDay()||7},U:function(e){return yr.getWeekOfYear(e,0)},w:function(e){return e.getDay()},W:function(e){return yr.getWeekOfYear(e,1)},x:function(e){return e.toLocaleDateString()},X:function(e){return e.toLocaleTimeString()},y:function(e){return e.getFullYear().toString().substring(2,4)},Y:function(e){return e.getFullYear()},z:function(e){var t=e.getTimezoneOffset()/60*100;return(0<t?"-":"+")+k(String(Math.abs(t)),4,"0")},"%":function(){return"%"}};wr.h=wr.b,wr.N=wr.L;var mr=y({},ir,sr,ur,cr,{date:function(e,t){var r=e;return"now"===e?r=new Date:p(e)?r=new Date(1e3*e):g(e)&&(r=/^\d+$/.test(e)?new Date(1e3*+e):new Date(e)),function(e){return e instanceof Date&&!isNaN(e.getTime())}(r)?function(e,t){for(var r="",n=t;;){var i=/%./g,s=i.exec(n);if(!s)return r+n;r+=n.slice(0,i.lastIndex-2),n=n.slice(i.lastIndex);var o=s[0].charAt(1),u=wr[o];r+=u?u(e):"%"+o}}(r,t):e}},{default:function(e,t){return Je(l(e))||""===e?t:e}},lr);function br(t){var e={then:function(e){return e(t)},catch:function(){return e}};return e}function xr(r){var n={then:function(e,t){return t?t(r):n},catch:function(e){return e(r)}};return n}function Tr(n){return function(e){return e&&a(e.then)}(n)?n:function(e){return e&&a(e.next)&&a(e.throw)&&a(e.return)}(n)?function r(e){var t;try{t=n.next(e)}catch(e){return xr(e)}if(t.done)return br(t.value);return Tr(t.value).then(r,function(e){var t;try{t=n.throw(e)}catch(e){return xr(e)}return t.done?br(t.value):r(t.value)})}():br(n)}function kr(e){var t;return Tr(e).then(function(e){return br(t=e)}).catch(function(e){throw e}),t}var Rr=(Er.prototype.parse=function(e,t){var r=this.tokenizer.tokenize(e,t);return this.parser.parse(r)},Er.prototype._render=function(e,t,r,n){var i=y({},this.options,Y(r)),s=new C(t,i,n);return this.renderer.renderTemplates(e,s)},Er.prototype.render=function(t,r,n){return s(this,void 0,void 0,function(){return w(this,function(e){return[2,Tr(this._render(t,r,n,!1))]})})},Er.prototype.renderSync=function(e,t,r){return kr(this._render(e,t,r,!0))},Er.prototype._parseAndRender=function(e,t,r,n){var i=this.parse(e);return this._render(i,t,r,n)},Er.prototype.parseAndRender=function(t,r,n){return s(this,void 0,void 0,function(){return w(this,function(e){return[2,Tr(this._parseAndRender(t,r,n,!1))]})})},Er.prototype.parseAndRenderSync=function(e,t,r){return kr(this._parseAndRender(e,t,r,!0))},Er.prototype._parseFile=function(t,r,n){var i,s,o,u,a,c,l,p,h,f,d,v,g=this;return w(this,function(e){switch(e.label){case 0:i=y({},this.options,Y(r)),s=i.root.map(function(e){return g.fs.resolve(e,t,i.extname)}),e.label=1;case 1:e.trys.push([1,11,12,13]),o=m(s),u=o.next(),e.label=2;case 2:return u.done?[3,10]:(a=u.value,this.options.cache&&this.cache[a]?[2,this.cache[a]]:n?(c=this.fs.existsSync(a),[3,5]):[3,3]);case 3:return[4,this.fs.exists(a)];case 4:c=e.sent(),e.label=5;case 5:return c?(p=this.parse,n?(h=B.readFileSync(a),[3,8]):[3,6]):[3,9];case 6:return[4,this.fs.readFile(a)];case 7:h=e.sent(),e.label=8;case 8:return l=p.apply(this,[h,a]),[2,this.cache[a]=l];case 9:return u=o.next(),[3,2];case 10:return[3,13];case 11:return f=e.sent(),d={error:f},[3,13];case 12:try{u&&!u.done&&(v=o.return)&&v.call(o)}finally{if(d)throw d.error}return[7];case 13:throw this.lookupError(t,i.root)}})},Er.prototype.parseFile=function(t,r){return s(this,void 0,void 0,function(){return w(this,function(e){return[2,Tr(this._parseFile(t,r,!1))]})})},Er.prototype.parseFileSync=function(e,t){return kr(this._parseFile(e,t,!0))},Er.prototype.renderFile=function(r,n,i){return s(this,void 0,void 0,function(){var t;return w(this,function(e){switch(e.label){case 0:return[4,this.parseFile(r,i)];case 1:return t=e.sent(),[2,this.render(t,n,i)]}})})},Er.prototype.renderFileSync=function(e,t,r){var n=Y(r),i=this.parseFileSync(e,n);return this.renderSync(i,t,r)},Er.prototype._evalValue=function(e,t){return new lt(e,this.options.strictFilters).value(t)},Er.prototype.evalValue=function(t,r){return s(this,void 0,void 0,function(){return w(this,function(e){return[2,Tr(this._evalValue(t,r))]})})},Er.prototype.evalValueSync=function(e,t){return kr(this._evalValue(e,t))},Er.prototype.registerFilter=function(e,t){return at.register(e,t)},Er.prototype.registerTag=function(e,t){return ot.register(e,t)},Er.prototype.plugin=function(e){return e.call(this,Er)},Er.prototype.express=function(){var i=this;return function(e,t,r){var n={root:v(V(this.root),i.options.root)};i.renderFile(e,t,n).then(function(e){return r(null,e)},r)}},Er.prototype.lookupError=function(e,t){var r=new Error("ENOENT");return r.message='ENOENT: Failed to lookup "'+e+'" in "'+t+'"',r.code="ENOENT",r},Er.prototype.getTemplate=function(t,r){return s(this,void 0,void 0,function(){return w(this,function(e){return[2,this.parseFile(t,r)]})})},Er.prototype.getTemplateSync=function(e,t){return this.parseFileSync(e,t)},Er);function Er(e){var r=this;void 0===e&&(e={}),this.cache={},this.options=$(Y(e)),this.parser=new wt(this),this.renderer=new Le,this.tokenizer=new Oe(this.options),this.fs=e.fs||B,f(er,function(e,t){return r.registerTag(t,e)}),f(mr,function(e,t){return r.registerFilter(t,e)})}e.AssertionError=A,e.Context=C,e.Drop=i,e.Emitter=_e,e.Expression=Ze,e.Hash=nt,e.Liquid=Rr,e.ParseError=F,e.ParseStream=tt,e.TagToken=ve,e.Token=X,e.TokenizationError=O,e.isFalsy=Je,e.isTruthy=We,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=liquid.min.js.map

var Globo = Globo || {};
Globo.FormBuilder = Globo.FormBuilder || {};
Globo.FormBuilder.init = function(form) {
    // If is Floating form, move form to body
    if (form.querySelector(".globo-form").classList.contains("float-form")) {
        document.body.appendChild(form);
    }
    if (form && form.addEventListener) {
        form.addEventListener("submit", Globo.FormBuilder.handleSubmit, false); //Modern browsers
    } else if (form && form.attachEvent) {
        form.attachEvent("onsubmit", Globo.FormBuilder.handleSubmit); //Old IE
    }

    // For wizard
    var wizardElement = form.querySelector(".globo-formbuilder-wizard");
    if (wizardElement) {
        var wizard = new Globo.Wizard(wizardElement);
        var buttonNext = form.querySelector(".next");
        var buttonPrevious = form.querySelector(".previous");

        wizard.addControls(buttonPrevious, buttonNext);
        wizard.setStep(0);
    }

    // For datetimepicker
    var dateTimeInputs = document.querySelectorAll('.globo-form-app [data-type="datetime"]');
    Globo.FormBuilder.handleDateTimePicker(dateTimeInputs);

    // For conditional field
    var conditionalFields = document.querySelectorAll(".globo-form-app .conditional-field");
    Globo.FormBuilder.handleConditionalField(conditionalFields);

    // For Captcha
    var grecaptchaElement = form.querySelector(".globo-g-recaptcha");
    if (typeof grecaptcha !== "undefined" && grecaptchaElement) {
        try {
            var widgetId = grecaptcha.render(grecaptchaElement, {
                sitekey: grecaptchaElement.getAttribute("data-sitekey")
            });
            grecaptchaElement.nextElementSibling.setAttribute("reCaptcha-widget-id", widgetId);
        } catch (error) {}
    }

    // For label
    var elements = form.querySelectorAll('.globo-form-control')
    var keyLabel = {}
    _.each(elements, function (element) {
        var labelEl = element.querySelector('label,legend')
        if (labelEl !== null && labelEl) {
            var keyEl = element.querySelector('[name]')
            if (keyEl !== null && keyEl) {
                var key = keyEl.getAttribute('name').replace("[]", "");
                keyLabel[key] = labelEl.querySelector('.label-content').innerHTML
            }
        }
    })
    form.querySelector('[name="_keyLabel"]').value = JSON.stringify(keyLabel)
    
};
Globo.FormBuilder.showFloatingForm = function(e) {
    e.parentNode.querySelector(".globo-form-app").classList.add("active");
};
Globo.FormBuilder.hideFloatingForm = function(e) {
    e.parentNode.querySelector(".globo-form-app").classList.remove("active");
};
Globo.FormBuilder.showMessage = function(el) {
    var content = el.querySelector(".content");
    if (content !== null && content.innerHTML != "") {
        el.style.display = 'block';
    }
};
Globo.FormBuilder.handleValidate = function(form) {
    // These are the constraints used to validate the form
    let panel = form.querySelector(".block-container");
    var constraints = {};
    _.map(panel.querySelectorAll("input, textarea, select"), function(input) {
        var isRequired = input.getAttribute("presence") !== null ? true : false;
        var isDisabled = input.getAttribute("disabled") !== null ? true : false;
        var type = input.getAttribute("data-type") !== null ? input.getAttribute("data-type") : false;
        constraints[input.name] = {};
        if(isDisabled){
            constraints[input.name]['ignore'] = {}
        }else if (isRequired) {
            constraints[input.name].presence = { message: Globo.FormBuilder.forms[panel.getAttribute("data-id")].errorMessage.required };
        }
        if (type == "email") {
            constraints[input.name][type] = { message: Globo.FormBuilder.forms[panel.getAttribute("data-id")].errorMessage.invalidEmail };
        }
        if (type == "url") {
            constraints[input.name][type] = { message: Globo.FormBuilder.forms[panel.getAttribute("data-id")].errorMessage.invalidURL };
        }
        if (type == "phone") {
            constraints[input.name].format = {
                pattern: "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$",
                flags: "i",
                message: "Invalid phone"
            };
        }
        if (type == "file") {
            constraints[input.name][type] = {
                notAllowedExtension: Globo.FormBuilder.forms[panel.getAttribute("data-id")].errorMessage.fileNotAllowed,
                sizeLimitMessage: Globo.FormBuilder.forms[panel.getAttribute("data-id")].errorMessage.fileSizeLimit,
                allowedExtension: input.getAttribute("data-allowed-extensions").split(','),
                maxFileSize: 2048
            };
        }
        if (type == "checkbox") {
            constraints[input.name][type] = {
                requiredMessage: Globo.FormBuilder.forms[form.getAttribute("data-id")].errorMessage.required
            };
            constraints[input.name][type].isRequired = typeof constraints[input.name].presence !== "undefined" ? true : false;
        }
    });
    // Add reCaptcha Rule
    constraints["reCaptcha"] = {
        reCaptcha: {
            isRequired: true,
            requiredMessage: Globo.FormBuilder.forms[panel.getAttribute("data-id")].errorMessage.requiredCaptcha
        }
    };
    // Custom File Validation
    validate.validators.file = function(value, options, key) {
        var filesInput = form.querySelector('[name="' + key + '"]');
        var filesSize = 0,
            validExtension = true;
        _.each(filesInput.files, function(f) {
            filesSize += f.size;
            if (options.allowedExtension.indexOf(getFilePathExtension(f.name)) === -1) {
                validExtension = false;
            }
        });
        if (filesSize / 1000 > options.maxFileSize) return options.sizeLimitMessage;
        if (!validExtension) return options.notAllowedExtension;
        return null;
    };
    // End Custom File validation

    // Custom Checkbox Validation
    validate.validators.checkbox = function(value, options, key, attributes) {
        if (!options.isRequired) return null;
        var inputs = form.querySelectorAll("[name='" + key + "']");
        var isChecked = false;
        _.each(inputs, function(input) {
            input.checked && (isChecked = true);
        });
        return isChecked ? null : options.requiredMessage;
    };
    // End Custom Checkbox Validation

    // Custom reCaptcha Validation
    validate.validators.reCaptcha = function(value, options, key, attributes) {
        var responseInput = form.querySelector("[name='" + key + "']");
        if (responseInput){
            var response = grecaptcha.getResponse(responseInput.getAttribute("reCaptcha-widget-id"));
            responseInput.value = response;
            return responseInput.value != "" ? null : options.requiredMessage;
        } 
        return null
    };

    // Custom Ignore Validation
    validate.validators.ignore = function() {
        return null
    };
    // End Custom reCaptcha Validation

    // validate the form against the constraints
    var errors = validate(panel, constraints, { fullMessages: false });
    // then we update the form to reflect the results
    showErrors(panel, errors || {});
    !_.isEmpty(errors, true) ? panel.classList.add("errors") : panel.classList.remove("errors");

    // Hook up the inputs to validate on the fly
    var inputs = panel.querySelectorAll("input, textarea, select");
    for (var i = 0; i < inputs.length; ++i) {
        inputs.item(i).addEventListener("change", function(ev) {
            var errors = validate(panel, constraints, { fullMessages: false }) || {};
            !_.isEmpty(errors, true) ? panel.classList.add("errors") : panel.classList.remove("errors");
            showErrorsForInput(this, errors[this.name]);
        });
    }
    // Updates the inputs with the validation errors
    function showErrors(form, errors) {
        // We loop through all the inputs and show the errors for that input
        _.each(form.querySelectorAll("input[name], select[name], textarea[name]"), function(input) {
            // Since the errors can be null if no errors were found we need to handle
            // that
            showErrorsForInput(input, errors && errors[input.name]);
        });
    }

    // Shows the errors for a specific input
    function showErrorsForInput(input, errors) {
        // This is the root of the input
        var formGroup = closestParent(input.parentNode, "globo-form-control"),
            // Find where the error messages will be insert into
            messages = formGroup.querySelector(".messages");
        // First we remove any old messages and resets the classes
        resetFormGroup(formGroup);
        // If we have errors
        if (errors) {
            // we first mark the group has having errors
            formGroup.classList.add("has-error");
            // then we append all the errors
            _.each(errors, function(error) {
                addError(messages, error);
            });
        } else {
            // otherwise we simply mark it as success
            formGroup.classList.add("has-success");
        }
    }

    // Recusively finds the closest parent that has the specified class
    function closestParent(child, className) {
        if (!child || child == document) {
            return null;
        }
        if (child.classList.contains(className)) {
            return child;
        } else {
            return closestParent(child.parentNode, className);
        }
    }

    function resetFormGroup(formGroup) {
        // Remove the success and error classes
        formGroup.classList.remove("has-error");
        formGroup.classList.remove("has-success");
        // and remove any old messages
        _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
            el.parentNode.removeChild(el);
        });
    }

    // Adds the specified error with the following markup
    // <p class="help-block error">[message]</p>
    function addError(messages, error) {
        var block = document.createElement("p");
        block.classList.add("help-block");
        block.classList.add("error");
        block.innerText = error;
        messages.appendChild(block);
    }
    function getFilePathExtension(path) {
        var filename = path
            .split("\\")
            .pop()
            .split("/")
            .pop();
        var lastIndex = filename.lastIndexOf(".");
        if (lastIndex < 1) return "";
        return filename.substr(lastIndex + 1);
    }
};
Globo.FormBuilder.handleDateTimePicker = function(elements) {
    _.each(elements, function(field) {
        var options = {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            time_24hr: true
        };
        var format,
            dateFormat,
            timeFormat,
            t = "H:i";
        format = field.getAttribute("data-format");
        dateFormat = field.getAttribute("dataDateFormat");
        timeFormat = field.getAttribute("dataTimeFormat");

        if (timeFormat == "12h") {
            options.time_24hr = false;
            t = "h:i K";
        }

        if (format == "date-and-time") {
            options.dateFormat = dateFormat + " " + t;
        } else if (format == "date") {
            options.enableTime = false;
            options.dateFormat = dateFormat;
        } else if (format == "time") {
            options.noCalendar = true;
            options.dateFormat = t;
        }
        flatpickr(field, options);
    });
};
Globo.FormBuilder.handleConditionalField = function(elements) {
    _.each(elements, function(element) {
        var connectedId = element.getAttribute("data-connected-id");
        var connectedValue = element.getAttribute("data-connected-value");
        var parentForm = Globo.closest(element, "form");
        var controlElements = parentForm.querySelectorAll('[name="' + connectedId + '"]');
        if (!controlElements.length) {
            controlElements = parentForm.querySelectorAll('[name="' + connectedId + '[]"]');
        }
        if (controlElements.length) {
            _.each(controlElements, function(el) {
                el.addEventListener("change", function() {
                    if (this.type == "checkbox") {
                        if (this.value === connectedValue) {
                            if (this.checked) {
                                element.style.display = "block";
                                _.each(element.querySelectorAll('[name]'),function (el){
                                    el.removeAttribute('disabled','disabled')
                                })
                            } else {
                                element.style.display = "";
                                _.each(element.querySelectorAll('[name]'),function (el){
                                    el.setAttribute('disabled','disabled')
                                })
                            }
                        }
                    } else {
                        if (this.value === connectedValue) {
                            element.style.display = "block";
                            _.each(element.querySelectorAll('[name]'),function (el){
                                el.removeAttribute('disabled','disabled')
                            })
                        } else {
                            element.style.display = "";
                            _.each(element.querySelectorAll('[name]'),function (el){
                                el.setAttribute('disabled','disabled')
                            })
                        }
                    }
                    // ( Update Panel Height when form is multiple step)
                    var panels = Globo.closest(element, ".panels");
                    var panel = Globo.closest(element, ".panel.movingIn");
                    if(panel){
                        panels.style.height = panel.offsetHeight+'px'
                    }
                    
                    if ((this.type == "checkbox" && !this.checked && this.value == connectedValue) || (this.type == "radio" || this.type == "select")) {
                        // Reset input value to make related element response
                        var options = element.querySelectorAll("input[name],select");
                        var eventChange = new Event("change");
                        _.each(options, function(input) {
                            if (input.type == "checkbox" || input.type == "radio") {
                                input.checked = false;
                            } else {
                                input.value = "";
                            }
                            input.dispatchEvent(eventChange);
                        });
                    }
                });
            });
        }
    });
};
Globo.FormBuilder.handleSubmit = function(e) {
    e.preventDefault();
    e.stopPropagation();
    Globo.FormBuilder.handleValidate(e.target);
    if (!_.isNull(e.target.querySelector(".block-container.errors"))) return; // has error(s)

    var submitButton = e.target.querySelector(".action.submit");
    // Make loading button
    submitButton.classList.add("loading");

    Globo.xhr(e.target, function() {
        // get response = this.response
        submitButton.classList.remove("loading");
        if (this.response.success == 'true') {
            var afterSubmit = Globo.FormBuilder.forms[e.target.getAttribute("data-id")].afterSubmit;
            if (afterSubmit.action == "redirectToPage") {
                window.location.href = afterSubmit.redirectUrl;
            }
            if (afterSubmit.action == "clearForm") {
                e.target.reset();
                Globo.FormBuilder.showMessage(e.target.querySelector(".message.success"));
                // reset Captcha
                var recaptcha = e.target.querySelector(".globo-g-recaptcha");
                if (recaptcha) {
                    grecaptcha.reset(recaptcha.nextElementSibling.getAttribute("reCaptcha-widget-id"));
                }

                // For wizard
                var wizardElement = e.target.querySelector(".globo-formbuilder-wizard");
                if (wizardElement) {
                    var wizard = new Globo.Wizard(wizardElement);
                    wizard.reset();
                }
            }
            if (afterSubmit.action == "hideForm") {
                e.target.style.display = "none";
                Globo.FormBuilder.showMessage(_.last(e.target.parentNode.querySelectorAll(".message.success")));
            }
        }else{
            var message = e.target.querySelector(".message.error .content")
            var errors = typeof this.response.errors !== 'undefined' ? this.response.errors : false
            if (errors) {
                var html = ''
                for (var i = 0; i < Object.keys(errors).length; i++) {
                    if (typeof errors[i] === 'string') {
                        html += '<div class="err-item"><span class="label"></span><span class="err">' + errors[i] + '</span></div>'
                    } else {
                        var formData = e.target.querySelector('[name="_keyLabel"]');
                        if (formData) formData = JSON.parse(formData.value)
                        if(typeof formData[Object.keys(errors)[i]] !== 'undefined' )
                        	html += '<div class="err-item"><span class="label">' + formData[Object.keys(errors)[i]] + '</span> : <span class="err">' + errors[Object.keys(errors)[i]] + '</span></div>'
                        else
                        	html += '<div class="err-item"><span class="label"></span><span class="err">' + errors[Object.keys(errors)[i]] + '</span></div>'  
                    }
                }
                message.innerHTML = html
            }
            Globo.FormBuilder.showMessage(e.target.querySelector(".message.error"));
        }
    });
};

Globo.Wizard =
    Globo.Wizard ||
    class Wizard {
        constructor(obj) {
            this.wizard = obj;
            this.panels = new Globo.Panels(this.wizard);
            this.steps = new Globo.Steps(this.wizard);
            this.stepsQuantity = this.steps.getStepsQuantity();
            this.currentStep = this.steps.currentStep;
            this.nextText = obj.querySelector(".action.next").getAttribute("data-next-text");
            this.submitText = obj.querySelector(".action.next").getAttribute("data-submit-text");
            this.submittingText = obj.querySelector(".action.next").getAttribute("data-submitting-text");

            this.concludeControlMoveStepMethod = this.steps.handleConcludeStep.bind(this.steps);
            this.wizardConclusionMethod = this.handleWizardConclusion.bind(this);
        }

        updateButtonsStatus() {
            if (this.currentStep === 0) this.previousControl.classList.add("disabled");
            else this.previousControl.classList.remove("disabled");
        }

        updtadeCurrentStep(movement) {
            this.currentStep += movement;
            this.steps.setCurrentStep(this.currentStep);
            this.panels.setCurrentStep(this.currentStep);

            this.handleNextStepButton();
            this.updateButtonsStatus();
        }
        setStep(index) {
            this.currentStep = index;
            this.steps.setCurrentStep(this.currentStep);
            this.panels.setCurrentStep(this.currentStep);

            this.handleNextStepButton();
            this.updateButtonsStatus();
        }

        handleNextStepButton() {
            this.nextControl.type = 'button'
            if (this.currentStep === this.stepsQuantity - 1) {
                this.nextControl.innerHTML = this.submitText;

                this.nextControl.removeEventListener("click", this.nextControlMoveStepMethod);
                this.nextControl.addEventListener("click", this.concludeControlMoveStepMethod);
                this.nextControl.addEventListener("click", this.wizardConclusionMethod);
            } else {
                this.nextControl.innerHTML = this.nextText;

                this.nextControl.addEventListener("click", this.nextControlMoveStepMethod);
                this.nextControl.removeEventListener("click", this.concludeControlMoveStepMethod);
                this.nextControl.removeEventListener("click", this.wizardConclusionMethod);
            }
        }

        handleWizardConclusion() {
            this.wizard.classList.add("completed");
            this.nextControl.type = 'submit'
        }

        addControls(previousControl, nextControl) {
            this.previousControl = previousControl;
            this.nextControl = nextControl;
            this.previousControlMoveStepMethod = this.moveStep.bind(this, -1);
            this.nextControlMoveStepMethod = this.moveStep.bind(this, 1);

            previousControl.addEventListener("click", this.previousControlMoveStepMethod);
            nextControl.addEventListener("click", this.nextControlMoveStepMethod);

            this.updateButtonsStatus();
        }

        moveStep(movement) {
            // Validate before movement
            Globo.FormBuilder.handleValidate(this.wizard);

            // If has error and click Next -> return
            if (movement == 1 && !_.isNull(this.wizard.querySelector(".block-container.errors"))) return;
            //

            // If current Step equal to stepQuantity then update type button to submit
            if(this.stepsQuantity == movement){
                
            }else{
                
            }

            if (this.validateMovement(movement)) {
                this.updtadeCurrentStep(movement);
                this.steps.handleStepsClasses(movement);
            } else {
                throw "This was an invalid movement";
            }
        }

        validateMovement(movement) {
            const fowardMov = movement > 0 && this.currentStep < this.stepsQuantity - 1;
            const backMov = movement < 0 && this.currentStep > 0;

            return fowardMov || backMov;
        }
        reset(){
            var buttonNext = this.wizard.querySelector(".next");
            var buttonPrevious = this.wizard.querySelector(".previous");

            this.addControls(buttonPrevious, buttonNext);
            this.steps.handleRemoveAllConcludeStep()
            this.setStep(0);
      }
    };

Globo.Steps =
    Globo.Steps ||
    class Steps {
        constructor(wizard) {
            this.wizard = wizard;
            this.steps = this.getSteps();
            this.stepsQuantity = this.getStepsQuantity();
            this.currentStep = 0;
        }

        setCurrentStep(currentStep) {
            this.currentStep = currentStep;
        }

        getSteps() {
            return this.wizard.getElementsByClassName("step");
        }

        getStepsQuantity() {
            return this.getSteps().length;
        }

        handleConcludeStep() {
            this.steps[this.currentStep].classList.add("-completed");
        }
        handleRemoveAllConcludeStep() {
            for(var i=0;i<this.stepsQuantity;i++){
            	this.steps[i].classList.remove("-completed");
            }
        }

        handleStepsClasses(movement) {
            if (movement > 0) this.steps[this.currentStep - 1].classList.add("-completed");
            else if (movement < 0) this.steps[this.currentStep].classList.remove("-completed");
          	this.steps[this.stepsQuantity - 1].classList.remove("-completed");
        }
    };

Globo.Panels =
    Globo.Panels ||
    class Panels {
        constructor(wizard) {
            this.wizard = wizard;
            this.panelWidth = this.wizard.offsetWidth;
            this.panelsContainer = this.getPanelsContainer();
            this.panels = this.getPanels();
            this.currentStep = 0;

            this.updatePanelsPosition(this.currentStep);
            this.updatePanelsContainerHeight();
        }

        getCurrentPanelHeight() {
            return `${this.getPanels()[this.currentStep].offsetHeight}px`;
        }

        getPanelsContainer() {
            return this.wizard.querySelector(".panels");
        }

        getPanels() {
            return this.wizard.getElementsByClassName("panel");
        }

        updatePanelsContainerHeight() {
            this.panelsContainer.style.height = this.getCurrentPanelHeight();
        }

        updatePanelsPosition(currentStep) {
            const panels = this.panels;
            const panelWidth = this.panelWidth;

            for (let i = 0; i < panels.length; i++) {
                panels[i].classList.remove("movingIn", "movingOutBackward", "movingOutFoward", "block-container");

                if (i !== currentStep) {
                    if (i < currentStep) panels[i].classList.add("movingOutBackward");
                    else if (i > currentStep) panels[i].classList.add("movingOutFoward");
                } else {
                    panels[i].classList.add("movingIn", "block-container");
                }
            }

            this.updatePanelsContainerHeight();
        }

        setCurrentStep(currentStep) {
            this.currentStep = currentStep;
            this.updatePanelsPosition(currentStep);
        }
    };
Globo.xhr = function(form, callback) {
    var action = form.getAttribute("action");
    var method = form.getAttribute("method");
    // get new XHR object
    var newXHR = new XMLHttpRequest();
    newXHR.responseType = "json";
    // bind our event listener to the "load" event.
    // "load" is fired when the response to our request is completed and without error.
    newXHR.addEventListener("load", callback);
    newXHR.open(method, action);

    var formData = new FormData(form);
    newXHR.send(formData);
};
Globo.dismiss = function(e) {
    e.parentNode.style.display = "none";
};
Globo.closest = function(el, selector) {
    var matchesFn;

    // find vendor prefix
    ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].some(function(fn) {
        if (typeof document.body[fn] == "function") {
            matchesFn = fn;
            return true;
        }
        return false;
    });

    var parent;

    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
            return parent;
        }
        el = parent;
    }

    return null;
};
Globo.idealTextColor = function(bgColor) {
    var nThreshold = 105;
    var components =
        bgColor.indexOf("#") === 0
            ? Globo.getRGBComponents(bgColor)
            : bgColor
                  .substring(5, bgColor.length - 1)
                  .replace(/ /g, "")
                  .split(",");
    var bgDelta = components[0] * 0.299 + components[1] * 0.587 + components[2] * 0.114;

    return 255 - bgDelta < nThreshold ? "#000000" : "#ffffff";
};

Globo.getRGBComponents = function(color) {
    var r = color.substring(1, 3);
    var g = color.substring(3, 5);
    var b = color.substring(5, 7);

    return {
        R: parseInt(r, 16),
        G: parseInt(g, 16),
        B: parseInt(b, 16)
    };
};
Globo.containsText = function (selector, text) {
    var elements = document.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function (element) {
        return RegExp(text).test(element.textContent);
    });
}
Globo.docReady = function(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
};

// Render a Form
Globo.docReady(function() {
    document.body.onload = function() {
        var installed = false;
        var scripts = document.querySelectorAll("script");
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.indexOf("globo.formbuilder.init.js?") != -1) {
                installed = true;
                break;
            }
            if (typeof GFBInstalled !== "undefined") {
                installed = true;
                break;
            }
        }
        if (!installed) {
            return false;
        }

        var element = document.getElementById("globo-formbuilder-element").innerHTML;
        var template = document.getElementById("globo-formbuilder-template").innerHTML;
        var dynamicCSS = document.getElementById("globo-formbuilder-dynamicCSS").innerHTML;

        var engine = new liquidjs.Liquid();
        engine.registerFilter("renderElement", (element, template, configs) => {
            return engine.parseAndRenderSync(template, { element: element, configs: configs });
        });
        engine.registerFilter("parseInt", v => parseInt(100 / v));
        engine.registerFilter("optionsToArray", (v, c) => v.split(/\r?\n/));
        engine.registerFilter("encodeHexColor", v => typeof v !== "undefined" && v.replace("#", "%23"));
        engine.registerFilter("idealTextColor", v => typeof v !== "undefined" && Globo.idealTextColor(v));
        engine.registerFilter("escapeHtml", v => {
            if (typeof v !== "string") return v;
            return v
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        });
        var forms = document.querySelectorAll(".globo-formbuilder");
        _.each(forms, function(form) {
            var formId = form.getAttribute("data-id");
            engine.parseAndRender(template, { configs: Globo.FormBuilder.forms[formId], partialElement: element, dynamicCSS: dynamicCSS, formId: formId, Globo: Globo }).then(html => {
                form.innerHTML = html;
                Globo.FormBuilder.init(form);
            });
        });

        var shortCodeForms = Globo.containsText('div', '{formbuilder:')
        var regexFindFormId = /{formbuilder:(.*)}/g;
        var renderFormId = []
        _.each(shortCodeForms, function (formWrapper) {
            var m;
            while ((m = regexFindFormId.exec(formWrapper.innerText)) !== null) {
                if (m.index === regexFindFormId.lastIndex) {
                    regexFindFormId.lastIndex++;
                }
                if (m.length) {
                    var formId = m[1];
                    if (typeof Globo.FormBuilder.forms[formId] !== 'undefined' && renderFormId.indexOf(formId) == -1) {
                        var html = engine.parseAndRenderSync(template, { configs: Globo.FormBuilder.forms[formId], partialElement: element, dynamicCSS: dynamicCSS, formId: formId, Globo: Globo })
                        formWrapper.innerHTML = formWrapper.innerHTML.replace(`{formbuilder:${formId}}`, '<div class="globo-formbuilder" data-id="' + formId + '">' + html + '</div>');
                        renderFormId.push(formId)
                    }
                }
            }
        });
        for (var i = 0; i < renderFormId.length; i++) {
            Globo.FormBuilder.init(document.querySelector('.globo-formbuilder[data-id="' + renderFormId[i] + '"]'));
        }
    };
});
