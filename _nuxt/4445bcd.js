(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{506:function(e,t,r){var content=r(507);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(15).default)("2d62e390",content,!0,{sourceMap:!1})},507:function(e,t,r){var o=r(14)(!1);o.push([e.i,':root{--color:#243746;--color-primary:#158876;--color-secondary:#0e2233;--bg:#f3f5f4;--bg-secondary:#fff;--border-color:#ddd}.dark-mode{--color:#ebf4f1;--color-primary:#41b38a;--color-secondary:#fdf9f3;--bg:#091a28;--bg-secondary:#071521;--border-color:#0d2538}.sepia-mode{--color:#433422;--color-secondary:#504231;--bg:#f1e7d0;--bg-secondary:#eae0c9;--border-color:#ded0bf}h2{position:relative;display:inline}h2:after{content:"";position:absolute;width:100%;height:4px;background-color:#ead11b;bottom:-10px;left:0}p{font-size:1rem}.absolute{position:absolute}.fill-width{width:100%}.gradient{background:#000;background:linear-gradient(90deg,rgba(0,0,0,.5),transparent 28%,rgba(0,0,0,.5004376751))!important}.h2,h2{font-size:30px!important;font-weight:400!important}.h2:after,h2:after{content:"";position:absolute;width:100%;height:4px;background-color:#ead11b;bottom:-10px;left:0}a{color:#507f88}.v-carousel{overflow:hidden;position:relative;width:100%}.v-carousel__controls{align-items:center;background:rgba(0,0,0,.3);bottom:0;display:flex;height:50px;justify-content:center;list-style-type:none;position:absolute;width:100%;z-index:1}.v-carousel__controls>.v-item-group{flex:0 1 auto}.v-carousel__controls__item{margin:0 8px}.v-carousel__controls__item .v-icon{opacity:.5}.v-carousel__controls__item--active .v-icon{opacity:1;vertical-align:middle}.v-carousel__controls__item:hover{background:none}.v-carousel__controls__item:hover .v-icon{opacity:.8}.v-carousel__progress{margin:0;position:absolute;bottom:0;left:0;right:0}.v-carousel .v-window-item{display:block;height:inherit;text-decoration:none}.v-carousel--hide-delimiter-background .v-carousel__controls{background:transparent}.v-carousel--vertical-delimiters .v-carousel__controls{height:100%!important;width:50px}',""]),e.exports=o},532:function(e,t,r){"use strict";r(9),r(8),r(7),r(10),r(6),r(11);var o=r(1),n=(r(25),r(59),r(506),r(171)),l=r(119),c=r(52),h=r(218),d=r(217),m=r(0),f=r(13);function v(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function y(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.a=n.a.extend({name:"v-carousel",props:{continuous:{type:Boolean,default:!0},cycle:Boolean,delimiterIcon:{type:String,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:function(e){return e>0}},mandatory:{type:Boolean,default:!0},progress:Boolean,progressColor:String,showArrows:{type:Boolean,default:!0},verticalDelimiters:{type:String,default:void 0}},data:function(){return{internalHeight:this.height,slideTimeout:void 0}},computed:{classes:function(){return y(y({},n.a.options.computed.classes.call(this)),{},{"v-carousel":!0,"v-carousel--hide-delimiter-background":this.hideDelimiterBackground,"v-carousel--vertical-delimiters":this.isVertical})},isDark:function(){return this.dark||!this.light},isVertical:function(){return null!=this.verticalDelimiters}},watch:{internalValue:"restartTimeout",interval:"restartTimeout",height:function(e,t){e!==t&&e&&(this.internalHeight=e)},cycle:function(e){e?this.restartTimeout():(clearTimeout(this.slideTimeout),this.slideTimeout=void 0)}},created:function(){this.$attrs.hasOwnProperty("hide-controls")&&Object(f.a)("hide-controls",':show-arrows="false"',this)},mounted:function(){this.startTimeout()},methods:{genControlIcons:function(){return this.isVertical?null:n.a.options.methods.genControlIcons.call(this)},genDelimiters:function(){return this.$createElement("div",{staticClass:"v-carousel__controls",style:{left:"left"===this.verticalDelimiters&&this.isVertical?0:"auto",right:"right"===this.verticalDelimiters?0:"auto"}},[this.genItems()])},genItems:function(){for(var e=this,t=this.items.length,r=[],i=0;i<t;i++){var o=this.$createElement(l.a,{staticClass:"v-carousel__controls__item",attrs:{"aria-label":this.$vuetify.lang.t("$vuetify.carousel.ariaLabel.delimiter",i+1,t)},props:{icon:!0,small:!0,value:this.getValue(this.items[i],i)}},[this.$createElement(c.a,{props:{size:18}},this.delimiterIcon)]);r.push(o)}return this.$createElement(d.a,{props:{value:this.internalValue,mandatory:this.mandatory},on:{change:function(t){e.internalValue=t}}},r)},genProgress:function(){return this.$createElement(h.a,{staticClass:"v-carousel__progress",props:{color:this.progressColor,value:(this.internalIndex+1)/this.items.length*100}})},restartTimeout:function(){this.slideTimeout&&clearTimeout(this.slideTimeout),this.slideTimeout=void 0,window.requestAnimationFrame(this.startTimeout)},startTimeout:function(){this.cycle&&(this.slideTimeout=window.setTimeout(this.next,+this.interval>0?+this.interval:6e3))}},render:function(e){var t=n.a.options.render.call(this,e);return t.data.style="height: ".concat(Object(m.g)(this.height),";"),this.hideDelimiters||t.children.push(this.genDelimiters()),(this.progress||this.progressColor)&&t.children.push(this.genProgress()),t}})},533:function(e,t,r){"use strict";r(9),r(8),r(7),r(10),r(6),r(11);var o=r(1),n=r(170),l=r(167),c=r(4),h=r(0),d=r(65);function m(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v=Object(c.a)(n.a,d.a);t.a=v.extend({name:"v-carousel-item",inheritAttrs:!1,methods:{genDefaultSlot:function(){return[this.$createElement(l.a,{staticClass:"v-carousel__item",props:f(f({},this.$attrs),{},{height:this.windowGroup.internalHeight}),on:this.$listeners,scopedSlots:{placeholder:this.$scopedSlots.placeholder}},Object(h.n)(this))]},genWindowItem:function(){var e=this.generateRouteLink(),t=e.tag,data=e.data;return data.staticClass="v-window-item",data.directives.push({name:"show",value:this.isActive}),this.$createElement(t,data,this.genDefaultSlot())}}})},604:function(e,t,r){"use strict";r.r(t);var o={props:{images:{type:Array,default:function(){return[]}}}},n=r(23),l=r(24),c=r.n(l),h=r(532),d=r(533),m=r(500),component=Object(n.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-carousel",e._l(e.sources,(function(source){return r("v-carousel-item",{key:source.acf.hero_image.id,attrs:{src:source.acf.hero_image.url,alt:source.acf.hero_image.alt}})})),1)],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{VCarousel:h.a,VCarouselItem:d.a,VContainer:m.a})}}]);