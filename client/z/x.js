(function(a, d, p) {
    a.fn.backstretch = function(c, b) {
        (c === p || 0 === c.length) && a.error("No images were supplied for Backstretch");
        0 === a(d).scrollTop() && d.scrollTo(0, 0);
        return this.each(function() {
            var d = a(this),
                g = d.data("backstretch");
            if (g) {
                if ("string" == typeof c && "function" == typeof g[c]) {
                    g[c](b);
                    return
                }
                b = a.extend(g.options, b);
                g.destroy(!0)
            }
            g = new q(this, c, b);
            d.data("backstretch", g)
        })
    };
    a.backstretch = function(c, b) {
        return a("body").backstretch(c, b).data("backstretch")
    };
    a.expr[":"].backstretch = function(c) {
        return a(c).data("backstretch") !== p
    };
    a.fn.backstretch.defaults = {
        centeredX: !0,
        centeredY: !0,
        duration: 5E3,
        fade: 0
    };
    var r = {
            left: 0,
            top: 0,
            overflow: "hidden",
            margin: 0,
            padding: 0,
            height: "100%",
            width: "100%",
            zIndex: -999999
        },
        s = {
            position: "absolute",
            display: "none",
            margin: 0,
            padding: 0,
            border: "none",
            width: "auto",
            height: "auto",
            maxHeight: "none",
            maxWidth: "none",
            zIndex: -999999
        },
        q = function(c, b, e) {
            this.options = a.extend({}, a.fn.backstretch.defaults, e || {});
            this.images = a.isArray(b) ? b : [b];
            a.each(this.images, function() {
                a("<img />")[0].src = this
            });
            this.isBody = c === document.body;
            this.$container = a(c);
            this.$root = this.isBody ? l ? a(d) : a(document) : this.$container;
            c = this.$container.children(".backstretch").first();
            this.$wrap = c.length ? c : a('<div class="backstretch"></div>').css(r).appendTo(this.$container);
            this.isBody || (c = this.$container.css("position"), b = this.$container.css("zIndex"), this.$container.css({
                position: "static" === c ? "relative" : c,
                zIndex: "auto" === b ? 0 : b,
                background: "none"
            }), this.$wrap.css({
                zIndex: -999998
            }));
            this.$wrap.css({
                position: this.isBody && l ? "fixed" : "absolute"
            });
            this.index = 0;
            this.show(this.index);
            a(d).on("resize.backstretch", a.proxy(this.resize, this)).on("orientationchange.backstretch", a.proxy(function() {
                this.isBody && 0 === d.pageYOffset && (d.scrollTo(0, 1), this.resize())
            }, this))
        };
    q.prototype = {
        resize: function() {
            try {
                var a = {
                        left: 0,
                        top: 0
                    },
                    b = this.isBody ? this.$root.width() : this.$root.innerWidth(),
                    e = b,
                    g = this.isBody ? d.innerHeight ? d.innerHeight : this.$root.height() : this.$root.innerHeight(),
                    j = e / this.$img.data("ratio"),
                    f;
                j >= g ? (f = (j - g) / 2, this.options.centeredY && (a.top = "-" + f + "px")) : (j = g, e = j * this.$img.data("ratio"), f = (e - b) / 2, this.options.centeredX && (a.left = "-" + f + "px"));
                this.$wrap.css({
                    width: b,
                    height: g
                }).find("img:not(.deleteable)").css({
                    width: e,
                    height: j
                }).css(a)
            } catch (h) {}
            return this
        },
        show: function(c) {
            if (!(Math.abs(c) > this.images.length - 1)) {
                var b = this,
                    e = b.$wrap.find("img").addClass("deleteable"),
                    d = {
                        relatedTarget: b.$container[0]
                    };
                b.$container.trigger(a.Event("backstretch.before", d), [b, c]);
                this.index = c;
                clearInterval(b.interval);
                b.$img = a("<img />").css(s).bind("load", function(f) {
                    var h = this.width || a(f.target).width();
                    f = this.height || a(f.target).height();
                    a(this).data("ratio", h / f);
                    a(this).fadeIn(b.options.speed || b.options.fade, function() {
                        e.remove();
                        b.paused || b.cycle();
                        a(["after", "show"]).each(function() {
                            b.$container.trigger(a.Event("backstretch." + this, d), [b, c])
                        })
                    });
                    b.resize()
                }).appendTo(b.$wrap);
                b.$img.attr("src", b.images[c]);
                return b
            }
        },
        next: function() {
            return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0)
        },
        prev: function() {
            return this.show(0 === this.index ? this.images.length - 1 : this.index - 1)
        },
        pause: function() {
            this.paused = !0;
            return this
        },
        resume: function() {
            this.paused = !1;
            this.next();
            return this
        },
        cycle: function() {
            1 < this.images.length && (clearInterval(this.interval), this.interval = setInterval(a.proxy(function() {
                this.paused || this.next()
            }, this), this.options.duration));
            return this
        },
        destroy: function(c) {
            a(d).off("resize.backstretch orientationchange.backstretch");
            clearInterval(this.interval);
            c || this.$wrap.remove();
            this.$container.removeData("backstretch")
        }
    };
    var l, f = navigator.userAgent,
        m = navigator.platform,
        e = f.match(/AppleWebKit\/([0-9]+)/),
        e = !!e && e[1],
        h = f.match(/Fennec\/([0-9]+)/),
        h = !!h && h[1],
        n = f.match(/Opera Mobi\/([0-9]+)/),
        t = !!n && n[1],
        k = f.match(/MSIE ([0-9]+)/),
        k = !!k && k[1];
    l = !((-1 < m.indexOf("iPhone") || -1 < m.indexOf("iPad") || -1 < m.indexOf("iPod")) && e && 534 > e || d.operamini && "[object OperaMini]" === {}.toString.call(d.operamini) || n && 7458 > t || -1 < f.indexOf("Android") && e && 533 > e || h && 6 > h || "palmGetResource" in d && e && 534 > e || -1 < f.indexOf("MeeGo") && -1 < f.indexOf("NokiaBrowser/8.5.0") || k && 6 >= k)
})(jQuery, window);
!function(t){"use strict";var s=function(s,o){this.el=t(s),this.options=t.extend({},t.fn.typed.defaults,o),this.isInput=this.el.is("input"),this.attr=this.options.attr,this.showCursor=this.isInput?!1:this.options.showCursor,this.elContent=this.attr?this.el.attr(this.attr):this.el.text(),this.contentType=this.options.contentType,this.typeSpeed=this.options.typeSpeed,this.startDelay=this.options.startDelay,this.backSpeed=this.options.backSpeed,this.backDelay=this.options.backDelay,this.strings=this.options.strings,this.strPos=0,this.arrayPos=0,this.stopNum=0,this.loop=this.options.loop,this.loopCount=this.options.loopCount,this.curLoop=0,this.stop=!1,this.cursorChar=this.options.cursorChar,this.build()};s.prototype={constructor:s,init:function(){var t=this;t.timeout=setTimeout(function(){t.typewrite(t.strings[t.arrayPos],t.strPos)},t.startDelay)},build:function(){this.showCursor===!0&&(this.cursor=t('<span class="typed-cursor">'+this.cursorChar+"</span>"),this.el.after(this.cursor)),this.init()},typewrite:function(t,s){if(this.stop!==!0){var o=Math.round(70*Math.random())+this.typeSpeed,e=this;e.timeout=setTimeout(function(){var o=0,i=t.substr(s);if("^"===i.charAt(0)){var r=1;/^\^\d+/.test(i)&&(i=/\d+/.exec(i)[0],r+=i.length,o=parseInt(i)),t=t.substring(0,s)+t.substring(s+r)}if("html"===e.contentType){var n=t.substr(s).charAt(0);if("<"===n||"&"===n){var a="",h="";for(h="<"===n?">":";";t.substr(s).charAt(0)!==h;)a+=t.substr(s).charAt(0),s++;s++,a+=h}}e.timeout=setTimeout(function(){if(s===t.length){if(e.options.onStringTyped(e.arrayPos),e.arrayPos===e.strings.length-1&&(e.options.callback(),e.curLoop++,e.loop===!1||e.curLoop===e.loopCount))return;e.timeout=setTimeout(function(){e.backspace(t,s)},e.backDelay)}else{0===s&&e.options.preStringTyped(e.arrayPos);var o=t.substr(0,s+1);e.attr?e.el.attr(e.attr,o):e.isInput?e.el.val(o):"html"===e.contentType?e.el.html(o):e.el.text(o),s++,e.typewrite(t,s)}},o)},o)}},backspace:function(t,s){if(this.stop!==!0){var o=Math.round(70*Math.random())+this.backSpeed,e=this;e.timeout=setTimeout(function(){if("html"===e.contentType&&">"===t.substr(s).charAt(0)){for(var o="";"<"!==t.substr(s).charAt(0);)o-=t.substr(s).charAt(0),s--;s--,o+="<"}var i=t.substr(0,s);e.attr?e.el.attr(e.attr,i):e.isInput?e.el.val(i):"html"===e.contentType?e.el.html(i):e.el.text(i),s>e.stopNum?(s--,e.backspace(t,s)):s<=e.stopNum&&(e.arrayPos++,e.arrayPos===e.strings.length?(e.arrayPos=0,e.init()):e.typewrite(e.strings[e.arrayPos],s))},o)}},reset:function(){var t=this;clearInterval(t.timeout);var s=this.el.attr("id");this.el.after('<span id="'+s+'"/>'),this.el.remove(),"undefined"!=typeof this.cursor&&this.cursor.remove(),t.options.resetCallback()}},t.fn.typed=function(o){return this.each(function(){var e=t(this),i=e.data("typed"),r="object"==typeof o&&o;i||e.data("typed",i=new s(this,r)),"string"==typeof o&&i[o]()})},t.fn.typed.defaults={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],typeSpeed:0,startDelay:0,backSpeed:0,backDelay:500,loop:!1,loopCount:!1,showCursor:!0,cursorChar:"|",attr:null,contentType:"html",callback:function(){},preStringTyped:function(){},onStringTyped:function(){},resetCallback:function(){}}}(window.jQuery);

