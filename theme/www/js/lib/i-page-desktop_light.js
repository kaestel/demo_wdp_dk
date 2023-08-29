Util.Objects["page"] = new function() {
	this.init = function(page) {

		u.bug_position = "fixed";
		u.flash_video_player = "/media/flash/videoplayer.swf";

		window.page = page;



		// MAIN ELEMENTS
		// header element
		page.hN = u.qs("#header", page);
		page.hN.page = page;
		// content element
		page.cN = u.qs("#content", page);
		page.cN.page = page;
		
		// navigation element
		page.nN = u.qs("#navigation", page);
		if(page.nN) {
			// move Navigation into Header and fade-in
			page.nN = page.hN.appendChild(page.nN);
			
			page.nN.page = page;
		}
		// footer element
		page.fN = u.qs("#footer", page);
		page.fN.page = page;


		page.nN.setSelected = function(id) {
			if(this.sel) {
				
				if(this.sel == "forside" && window.page.videoplayer && window.page.videoplayer.parentNode) {
					window.page.videoplayer = window.page.videoplayer.parentNode.removeChild(window.page.videoplayer);
					window.page.videoplayer.ready = false;
				}

				u.rc(u.qs("."+this.sel, this), "selected");
			}
			this.sel = id;
			u.ac(u.qs("."+this.sel, this), "selected");
		}


		page.ready = function() {

			// prepare for video player
			this.videoplayer = u.videoPlayer();
			u.ae(this.videoplayer, "div", {"class":"controls"});

			var video = u.qs(".scene.front .video");
			u.ce(video);
			video.clicked = function(event) {

				// specific play tracking
				u.stats.event(this, "play video", this.url);

				this.parentNode.appendChild(window.page.videoplayer);
				window.page.videoplayer.loadAndPlay("/media/movies/showreel_light.mp4");
				var controls = u.qs(".controls", window.page.videoplayer);
				window.page.videoplayer.t_hide = false;


				window.page.videoplayer.ended = function() {
					window.page.videoplayer = this.parentNode.removeChild(this);
				}


				u.e.click(controls);
				controls.clicked = function() {
					u.t.resetTimer(this.t_hide);
					this.show();

					if(u.hc(this.parentNode, "playing")) {
						this.parentNode.pause();
					}
					else {
						this.parentNode.play();
					}
				}

//				u.a.setOpacity(controls, 0);
				controls.show = function() {
					u.t.resetTimer(this.t_hide);

					// prevent IE eventclutter
					u.e.removeEvent(this, "mousemove", this.show);
					u.e.addEvent(this, "mousemove", this.show);

					if(u.hc(this, "hidden")) {
						u.rc(this, "hidden");
					}
					this.t_hide = u.t.setTimer(this, this.hide, 1000);
				}
				controls.hide = function() {
					u.t.resetTimer(this.t_hide);

					// prevent IE eventclutter
					u.e.removeEvent(this, "mousemove", this.show);
					u.e.addEvent(this, "mousemove", this.show);

					if(!u.hc(this, "hidden") && u.hc(this.parentNode, "playing")) {
						u.ac(this, "hidden");
					}
				}
				u.e.removeEvent(controls, "mousemove", controls.show);
				u.e.addEvent(controls, "mousemove", controls.show);
			}

		}

		// get all scenes
		page.scenes = u.qsa(".scene");

		// // load first scene image
		// page.scenes[0].loaded = function(event) {
		// 	u.as(this, "backgroundImage", "url("+event.target.src+")");
		// 	u.ac(this, "ready");
		// 	window.page.ready();
		// }
		// u.i.load(page.scenes[0], "/img/pi_front.jpg");


		window._resized = function() {
//			u.bug("resized")
			this.page._resized();
		}

		// global resize handler 
		page._resized = function() {

// 			var scale;
// 
// 			// go scale
// 			// max scaling reached
// 			if(u.browserW() > this._max_width && u.browserH() > this._max_height) {
// 
// 				scale = this._max_width/this._default_width;
// 			}
// 			else if(u.browserW() > this._default_width && u.browserH() > this._default_height) {
// 
// 				// size is defined by height
// 				if(u.browserW()/u.browserH() > this._default_width/this._default_height) {
// //					u.bug("size defined by height")
// 					scale = u.browserH()/this._default_height;
// 				}
// 				// size defined by width
// 				else {
// //					u.bug("size defined by width")
// 					scale = u.browserW()/this._default_width;
// 				}
// 			}
// 			// no scaling
// 			else {
// 				scale = 1;
// 			}
// 
// 			u.sc(document.body, "scale" + (Math.round(scale*10)*10));
// 
// //			u.bug("scale class:" + Math.round(scale*10)*10);
// 
// 			this._header_height = Math.round(this._default_header_height*scale);
// 			this._scene_padding = Math.round(this._default_padding*scale);
// 			this._scene_height = Math.round(this._default_height*scale - this._header_height - this._scene_padding);
// 			this._scene_width = Math.round(this._default_width*scale - (this._scene_padding*2));
// 			this._scene_margin_correction = Math.round(this._header_height - this._scene_padding);
// 
// 
// 			// set header height
// 			u.as(this.hN, "height", this._header_height + "px", false);
// 			// set navigation width
// 			u.as(this.nN, "width", this._scene_width + "px", false);
// 			// update scenes
// 			var i, scene;
// 			for(i = 0; scene = this.scenes[i]; i++) {
// 				u.as(scene, "paddingTop", this._header_height + "px", false);
// 				u.as(scene, "height", this._scene_height + "px", false);
// 				// all but first scene needs to have margin-top corrected
// 				if(i > 0) {
// 					u.as(scene, "marginTop", - (this._scene_margin_correction) + "px");
// 				}
// 			}
// 			// set content width (keep width on content to avoid scenes floating if window is wide and low)
// 			u.as(this.cN, "width", this._scene_width + "px", false);
// 
// 			// correct page height, so you can scroll last section all in
			var adjustment;
			if(u.browserH() > this.scenes[0].offsetHeight) {
				adjustment = u.browserH() - this.scenes[0].offsetHeight;
			}
			else {
				adjustment = 0;
			}
			u.as(this.cN, "paddingBottom", adjustment + "px", false);
// 
// 			// update_dom
// 			this.offsetTop;
		}
		u.e.addEvent(window, "resize", window._resized);
		page._resized();


		window._scrollCorrector = function(event) {
//			u.bug("scroll corrector")

			// set active menu
			var i, scene;
			for(i = 0; scene = this.page.scenes[i]; i++) {
				if(Math.abs(u.absY(scene) - u.scrollY()) < this.page.scenes[0].offsetHeight/2) {
					if(this.page.nN.sel != scene.id) {
						window.page.nN.setSelected(scene.id);
					}
				}

//				u.bug("focus on calc:abs-scene:" + u.absY(scene) + ":scrolly:" + u.scrollY() + ":bh:" + u.browserH());
			}

		}
		u.e.addEvent(window, "scroll", window._scrollCorrector);

		window._scrollToY = function(event) {
//			u.bug("window._scrollToY:" + this.page._scroll_y);

			if(this.page._scroll_y !== false) {
				u.t.resetTimer(this.page.t_scroll);
				this.page.t_scroll = u.t.setTimer(this.page, this.page._scrollToY, 50);
			}

		}

		page._scrollToY = function(y, node) {
//			u.bug("page._scrollToY:" + this._scroll_y);

			if(y !== undefined) {
//				u.bug("init scroll:" + y);

				// scroll destination
				this._scroll_y = y;

				// callback node
				this._scroll_notifier = node ? node : this;

//				u.bug("heading to:" + this._scroll_y);
//				u.bug("current y:" + u.scrollY());
//				u.bug("current scroll y:" + this._current_scroll_y);

				// scroll event catcher - use browser event, to be able to react appropriately if user scrolls against transition
				u.e.removeEvent(window, "scroll", window._scrollCorrector);
				u.e.addEvent(window, "scroll", window._scrollToY);
			}


			// still not at destination
			if(Math.abs(u.scrollY() - this._scroll_y) > 1) {

				// if scroll to top function is active and scrolling position is larger than last position, it 
				// must mean user is interacting with browser - so cancel auto-scroll

				// if first run or scrolling not interrupted
				if(!this._current_scroll_y || this._current_scroll_y == u.scrollY()) {

					// calculate next jump
					var jump = Math.round((this._scroll_y - u.scrollY()) / 4);
					// correct jump values less than abs(1)
					if(Math.abs(jump) < 1) {
						if(jump > 0) {
							jump = 1;
						}
						else {
							jump = -1;
						}
					}
					this._current_scroll_y = Math.round(u.scrollY() + jump);
//					u.bug("next jump:" + this._current_scroll_y)


					window.scrollTo(0, this._current_scroll_y);
				}
				// auto scroll interrupted
				else {
//					u.bug("auto scroll interrupted:" + this.t_scroll);

					u.t.resetTimer(this.t_scroll);
					u.e.removeEvent(window, "scroll", window._scrollToY);
					u.e.addEvent(window, "scroll", window._scrollCorrector);

					this._scroll_y = false;
					this._current_scroll_y = false;

					if(typeof(this._scroll_notifier.scrolledToY) == "function") {
						this._scroll_notifier.scrolledToY();
					}
				}
			}
			else {
//				u.bug("Scrolling done");

				u.t.resetTimer(this.t_scroll);
				u.e.removeEvent(window, "scroll", window._scrollToY);
				u.e.addEvent(window, "scroll", window._scrollCorrector);

				window.scrollTo(0, this._scroll_y);

				this._scroll_y = false;
				this._current_scroll_y = false;

				if(typeof(this._scroll_notifier.scrolledToY) == "function") {
					this._scroll_notifier.scrolledToY();
				}
			}
		}


		var i, node;

		// set up navigation
		page.nav_nodes = u.qsa("li", page.nN);
		for(i = 0; node = page.nav_nodes[i]; i++) {
//			u.a.translate(node, 0, -100);
			u.ce(node);
			node.clicked = function() {
				var section = this.url.split("#")[1];
				window.page._scrollToY(u.absY(u.qs("#" + section)));
			}
		}



		// contact
		// cookies
		page.cookie_link = u.qs(".scene.contact .readmore", page);
		page.cookie_text = u.qs("#cookies", page);


		u.ce(page.cookie_text);
		page.cookie_text.clicked = function(event) {

			this.transitioned = function() {
				u.a.transition(this, "none");
				this.transitioned = null;
				u.as(this, "display", "none");
			}

			u.a.transition(this, "all 1s ease-in");
			u.a.setOpacity(this, 0);

		}

		u.ce(page.cookie_link);
		page.cookie_link.clicked = function(event) {

			window.page.cookie_text.transitioned = function() {
				u.a.transition(this, "none");
				this.transitioned = null;
			}

			u.a.transition(window.page.cookie_text, "none");
			u.a.setOpacity(window.page.cookie_text, 0);
			u.as(window.page.cookie_text, "display", "block");

			u.a.transition(window.page.cookie_text, "all 1s ease-out");
			u.a.setOpacity(window.page.cookie_text, 1);

		}


		// add maps link - not used
		// var vcard = u.qs(".scene.contact .vcard", page);
		// var adr = u.qs(".adr", vcard);
		// var maps_link = u.ae(u.ae(adr, "div", {"class":"maps"}), "a", {"href":"http://maps.google.dk/maps?q="+u.qs(".street-address", vcard).innerHTML+"+"+u.qs(".postal-code", vcard).innerHTML+"+"+u.qs(".locality", vcard).innerHTML, "target":"_blank", "html":"Find vej"});
		


		// page is ready
		u.ac(page, "ready");

		// page is ready
		page.ready();
	}
}
