(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("KlickCarousel", [], factory);
	else if(typeof exports === 'object')
		exports["KlickCarousel"] = factory();
	else
		root["KlickCarousel"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Hi :-) This is a class representing a KlickCarousel.
 */
var KlickCarousel = function () {
  /**
   * Create a Carousel.
   * @param {Object} options - Optional settings object.
   */
  function KlickCarousel(options) {
    var _this = this;

    _classCallCheck(this, KlickCarousel);

    // Merge defaults with user's settings
    this.config = KlickCarousel.mergeSettings(options);

    // Resolve selector's type
    this.selector = typeof this.config.selector === 'string' ? document.querySelector(this.config.selector) : this.config.selector;

    // Early throw if selector doesn't exists
    if (this.selector === null) {
      throw new Error('Something wrong with your selector');
    }

    // update perPage number dependable of user value
    this.resolveSlidesNumber();

    // Create global references
    this.selectorWidth = this.selector.offsetWidth;
    this.innerElements = [].slice.call(this.selector.children);
    this.currentSlide = this.config.loop ? this.config.startIndex % this.innerElements.length : Math.max(0, Math.min(this.config.startIndex, this.innerElements.length - this.perPage));
    this.transformProperty = KlickCarousel.webkitOrNot();

    // Bind all event handlers for referencability
    ['resizeHandler', 'touchstartHandler', 'touchendHandler', 'touchmoveHandler', 'mousedownHandler', 'mouseupHandler', 'mouseleaveHandler', 'clickHandler'].forEach(function (method) {
      _this[method] = _this[method].bind(_this);
    });

    // Build markup and apply required styling to elements

    this.init();
 
    
  }

  /**
   * Overrides default settings with custom ones.
   * @param {Object} options - Optional settings object.
   * @returns {Object} - Custom KlickCarousel settings.
   */


  _createClass(KlickCarousel, [{
    key: 'attachEvents',


    /**
     * Attaches listeners to required events.
     */
    value: function attachEvents() {
      // Resize element on window resize
      window.addEventListener('resize', this.resizeHandler);

      // If element is draggable / swipable, add event handlers
      if (this.config.draggable) {
        // Keep track pointer hold and dragging distance
        this.pointerDown = false;
        this.drag = {
          startX: 0,
          endX: 0,
          startY: 0,
          letItGo: null,
          preventClick: false
        };

        // Touch events
        this.selector.addEventListener('touchstart', this.touchstartHandler);
        this.selector.addEventListener('touchend', this.touchendHandler);
        this.selector.addEventListener('touchmove', this.touchmoveHandler);

        // Mouse events
        this.selector.addEventListener('mousedown', this.mousedownHandler);
        this.selector.addEventListener('mouseup', this.mouseupHandler);
        this.selector.addEventListener('mouseleave', this.mouseleaveHandler);

        // Click
        this.selector.addEventListener('click', this.clickHandler);
      }

    }

    /**
     * Detaches listeners from required events.
     */

  }, {
    key: 'detachEvents',
    value: function detachEvents() {
      window.removeEventListener('resize', this.resizeHandler);
      this.selector.removeEventListener('touchstart', this.touchstartHandler);
      this.selector.removeEventListener('touchend', this.touchendHandler);
      this.selector.removeEventListener('touchmove', this.touchmoveHandler);
      this.selector.removeEventListener('mousedown', this.mousedownHandler);
      this.selector.removeEventListener('mouseup', this.mouseupHandler);
      this.selector.removeEventListener('mouseleave', this.mouseleaveHandler);
      this.selector.removeEventListener('click', this.clickHandler);
    }

    /**
     * Builds the markup and attaches listeners to required events.
     */

  }, {
    key: 'init',
    value: function init() {
      var  _this = this;
      this.attachEvents();

      // build a frame and slide to a currentSlide
      this.buildSliderFrame();
      if(this.config.arrows){
          this.buildArrows();
      }

      if(this.config.dots){
        this.buildPagination();
        this.updatePagination();
      }

      document.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode == '37') {
            _this.prevSlide()
        } else if (e.keyCode == '39') {
            _this.nextSlide()
        }
      }
    }

  }, {
    key: 'buildPagination',
    value: function buildPagination() {
        // create a contnier for all dots
        // add a class 'dots' for styling reason
        this.dots = document.createElement('div');
        this.dots.classList.add('CarouselIndicator');

        // loop through slides to create a number of dots
        for(let i = 0; i < this.innerElements.length; i++) {
          // create a dot
          const dot = document.createElement('button');

          // add a class to dot
          dot.classList.add('CarouselIndicatorBullet');

          // add an event handler to each of them
          dot.addEventListener('click', () => {
            this.goTo(i);
          })

          // append dot to a container for all of them
          this.dots.appendChild(dot);
        }

        // add the container full of dots after selector
        this.selector.parentNode.replaceChild(this.dots, this.selector.nextSibling);       

    }
  }, {
    key: 'updatePagination',
    value: function() {
        // loop through all dots
          for(let i = 0; i < this.dots.querySelectorAll('button').length; i++) {
            // if current dot matches currentSlide prop, add a class to it, remove otherwise
            const addOrRemove = this.currentSlide === i ? 'add' : 'remove';
            this.dots.querySelectorAll('button')[i].classList[addOrRemove]('active');
          }
    }
  }, {
    key: 'buildArrows',
    value: function buildArrows() {
        var prev = document.createElement('button');
        prev.classList.add('KlickButtons','KlickPrev')

        var next = document.createElement('button');
        next.classList.add('KlickButtons', 'KlickNext')

        
          this.selector.appendChild(prev)
          this.selector.appendChild(next)
        

        
        var _this =  this;

        prev.addEventListener('click', function() {
            _this.prevSlide();
        });
        next.addEventListener('click', function () {
            _this.nextSlide();
        });
    }
  }, {
    key: 'buildSliderFrame',
    value: function buildSliderFrame() {
      var widthItem = this.selectorWidth / this.perPage;
      var itemsToBuild = this.config.loop ? this.innerElements.length + 2 * this.perPage : this.innerElements.length;

      // Create frame and apply styling
      this.sliderFrame = document.createElement('div');
      
      this.sliderFrame.style.width = widthItem * itemsToBuild + 'px';
      this.enableTransition();
      
      // Create a document fragment to put slides into it
      var docFragment = document.createDocumentFragment();

      // Loop through the slides, add styling and add them to document fragment
      if (this.config.loop) {
        for (var i = this.innerElements.length - this.perPage; i < this.innerElements.length; i++) {
          var element = this.buildSliderFrameItem(this.innerElements[i].cloneNode(true));
          docFragment.appendChild(element);
        }
      }
      for (var _i = 0; _i < this.innerElements.length; _i++) {
        var _element = this.buildSliderFrameItem(this.innerElements[_i]);
        docFragment.appendChild(_element);
      }


      // Add fragment to the frame
      this.sliderFrame.appendChild(docFragment);

      // Clear selector (just in case something is there) and insert a frame
      this.selector.innerHTML = '';
      this.selector.appendChild(this.sliderFrame);

      // Go to currently active slide after initial build
      this.slideToCurrent();
    }
  }, {
    key: 'buildSliderFrameItem',
    value: function buildSliderFrameItem(elm) {
      var elementContainer = document.createElement('div');
      
        elementContainer.classList.add('KlickSlide');
        elementContainer.style.width = (this.config.loop ? 100 / (this.innerElements.length + this.perPage * 2) : 100 / this.innerElements.length) + '%';

      elementContainer.appendChild(elm);
      return elementContainer;
    }

    /**
     * Determinates slides number accordingly to clients viewport.
     */

  }, {
    key: 'resolveSlidesNumber',
    value: function resolveSlidesNumber() {
      if (typeof this.config.perPage === 'number') {
        this.perPage = this.config.perPage;
      } else if (_typeof(this.config.perPage) === 'object') {
        this.perPage = 1;
        for (var viewport in this.config.perPage) {
          if (window.innerWidth >= viewport) {
            this.perPage = this.config.perPage[viewport];
          }
        }
      }
    }

    /**
     * Go to previous slide.
     * @param {number} [howManySlides=1] - How many items to slide backward.
     * @param {function} callback - Optional callback function.
     */

  }, {
    key: 'prevSlide',
    value: function prevSlide() {
      var howManySlides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var callback = arguments[1];

      // early return when there is nothing to slide
      if (this.innerElements.length <= this.perPage) {
        return;
      }

      var beforeChange = this.currentSlide;

      if (this.config.loop) {
        var isNewIndexClone = this.currentSlide - howManySlides < 0;
        if (isNewIndexClone) {
          this.disableTransition();

          var mirrorSlideIndex = this.currentSlide + this.innerElements.length;
          var mirrorSlideIndexOffset = this.perPage;
          var moveTo = mirrorSlideIndex + mirrorSlideIndexOffset;
          var offset = (-1 * moveTo) * (this.selectorWidth / this.perPage);
          var dragDistance = this.config.draggable ? this.drag.endX - this.drag.startX : 0;

          this.sliderFrame.style[this.transformProperty] = 'translate3d(' + (offset + dragDistance) + 'px, 0, 0)';
          this.currentSlide = mirrorSlideIndex - howManySlides;
        } else {
          this.currentSlide = this.currentSlide - howManySlides;
        }
      } else {
        this.currentSlide = Math.max(this.currentSlide - howManySlides, 0);
      }

      if (beforeChange !== this.currentSlide) {
        this.slideToCurrent(this.config.loop);
        this.updatePagination();
        if (callback) {
          callback.call(this);
        }
      }
    }

    /**
     * Go to next slide.
     * @param {number} [howManySlides=1] - How many items to slide forward.
     * @param {function} callback - Optional callback function.
     */

  }, {
    key: 'nextSlide',
    value: function nextSlide() {
      var howManySlides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var callback = arguments[1];

      // early return when there is nothing to slide
      if (this.innerElements.length <= this.perPage) {
        return;
      }

      var beforeChange = this.currentSlide;

      if (this.config.loop) {
        var isNewIndexClone = this.currentSlide + howManySlides > this.innerElements.length - this.perPage;
        if (isNewIndexClone) {
          this.disableTransition();

          var mirrorSlideIndex = this.currentSlide - this.innerElements.length;
          var mirrorSlideIndexOffset = this.perPage;
          var moveTo = mirrorSlideIndex + mirrorSlideIndexOffset;
          var offset = (-1* moveTo) * (this.selectorWidth / this.perPage);
          var dragDistance = this.config.draggable ? this.drag.endX - this.drag.startX : 0;

          this.sliderFrame.style[this.transformProperty] = 'translate3d(' + (offset + dragDistance) + 'px, 0, 0)';
          this.currentSlide = mirrorSlideIndex + howManySlides;
        } else {
          this.currentSlide = this.currentSlide + howManySlides;
        }
      } else {
        this.currentSlide = Math.min(this.currentSlide + howManySlides, this.innerElements.length - this.perPage);
      }
      if (beforeChange !== this.currentSlide) {
        this.slideToCurrent(this.config.loop);
        this.updatePagination();
        if (callback) {
          callback.call(this);
        }
      }
    }

    /**
     * Disable transition on sliderFrame.
     */

  }, {
    key: 'disableTransition',
    value: function disableTransition() {
      this.sliderFrame.style.webkitTransition = 'all 0ms ' + this.config.easing;
      this.sliderFrame.style.transition = 'all 0ms ' + this.config.easing;
    }

    /**
     * Enable transition on sliderFrame.
     */

  }, {
    key: 'enableTransition',
    value: function enableTransition() {
      this.sliderFrame.style.webkitTransition = 'all ' + this.config.duration + 'ms ' + this.config.easing;
      this.sliderFrame.style.transition = 'all ' + this.config.duration + 'ms ' + this.config.easing;
    }

    /**
     * Go to slide with particular index
     * @param {number} index - Item index to slide to.
     * @param {function} callback - Optional callback function.
     */

  }, {
    key: 'goTo',
    value: function goTo(index, callback) {
      if (this.innerElements.length <= this.perPage) {
        return;
      }
      var beforeChange = this.currentSlide;
      this.currentSlide = this.config.loop ? index % this.innerElements.length : Math.min(Math.max(index, 0), this.innerElements.length - this.perPage);
      if (beforeChange !== this.currentSlide) {
        this.slideToCurrent();
        this.updatePagination();
        if (callback) {
          callback.call(this);
        }
      }
    }

    /**
     * Moves sliders frame to position of currently active slide
     */

  }, {
    key: 'slideToCurrent',
    value: function slideToCurrent(enableTransition) {
      var _this2 = this;

      var currentSlide = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide;
      var offset = (-1 * currentSlide) * (this.selectorWidth / this.perPage);

      if (enableTransition) {
        // This one is tricky, I know but this is a perfect explanation:
        // https://youtu.be/cCOL7MC4Pl0
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            _this2.enableTransition();
            _this2.sliderFrame.style[_this2.transformProperty] = 'translate3d(' + offset + 'px, 0, 0)';
          });
        });
      } else {
        this.sliderFrame.style[this.transformProperty] = 'translate3d(' + offset + 'px, 0, 0)';
      }
    }

    /**
     * Recalculate drag /swipe event and reposition the frame of a slider
     */

  }, {
    key: 'updateAfterDrag',
    value: function updateAfterDrag() {
      var movement = this.drag.endX - this.drag.startX;
      var movementDistance = Math.abs(movement);
      var howManySliderToSlide = 1;

      var slideToNegativeClone = movement > 0 && this.currentSlide - howManySliderToSlide < 0;
      var slideToPositiveClone = movement < 0 && this.currentSlide + howManySliderToSlide > this.innerElements.length - this.perPage;

      if (movement > 0 && this.innerElements.length > this.perPage) {
        this.prevSlide(howManySliderToSlide);
      } else if (movement < 0 && this.innerElements.length > this.perPage) {
        this.nextSlide(howManySliderToSlide);
      }
      this.slideToCurrent(slideToNegativeClone || slideToPositiveClone);
    }

    /**
     * When window resizes, resize slider components as well
     */

  }, {
    key: 'resizeHandler',
    value: function resizeHandler() {
      // update perPage number dependable of user value
      this.resolveSlidesNumber();

      // relcalculate currentSlide
      // prevent hiding items when browser width increases
      if (this.currentSlide + this.perPage > this.innerElements.length) {
        this.currentSlide = this.innerElements.length <= this.perPage ? 0 : this.innerElements.length - this.perPage;
      }

      this.selectorWidth = this.selector.offsetWidth;



      
        this.buildSliderFrame();
        this.buildArrows();

    }

    /**
     * Clear drag after touchend and mouseup event
     */

  }, {
    key: 'clearDrag',
    value: function clearDrag() {
      this.drag = {
        startX: 0,
        endX: 0,
        startY: 0,
        letItGo: null,
        preventClick: this.drag.preventClick
      };
    }

    /**
     * touchstart event handler
     */

  }, {
    key: 'touchstartHandler',
    value: function touchstartHandler(e) {
      // Prevent dragging / swiping on inputs, selects and textareas
      var ignoreKlickCarousel = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(e.target.nodeName) !== -1;
      if (ignoreKlickCarousel) {
        return;
      }

      e.stopPropagation();
      this.pointerDown = true;
      this.drag.startX = e.touches[0].pageX;
      this.drag.startY = e.touches[0].pageY;
    }

    /**
     * touchend event handler
     */

  }, {
    key: 'touchendHandler',
    value: function touchendHandler(e) {
      e.stopPropagation();
      this.pointerDown = false;
      this.enableTransition();
      if (this.drag.endX) {
        this.updateAfterDrag();
      }
      this.clearDrag();
    }

    /**
     * touchmove event handler
     */

  }, {
    key: 'touchmoveHandler',
    value: function touchmoveHandler(e) {
      e.stopPropagation();

      if (this.drag.letItGo === null) {
        this.drag.letItGo = Math.abs(this.drag.startY - e.touches[0].pageY) < Math.abs(this.drag.startX - e.touches[0].pageX);
      }

      if (this.pointerDown && this.drag.letItGo) {
        e.preventDefault();
        this.drag.endX = e.touches[0].pageX;
        this.sliderFrame.style.webkitTransition = 'all 0ms ' + this.config.easing;
        this.sliderFrame.style.transition = 'all 0ms ' + this.config.easing;

        var currentSlide = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide;
        var currentOffset = currentSlide * (this.selectorWidth / this.perPage);
        var dragOffset = this.drag.endX - this.drag.startX;
        var offset = currentOffset - dragOffset;
        this.sliderFrame.style[this.transformProperty] = 'translate3d(' + (-1 * offset) + 'px, 0, 0)';
      }
    }

    /**
     * mousedown event handler
     */

  }, {
    key: 'mousedownHandler',
    value: function mousedownHandler(e) {
      // Prevent dragging / swiping on inputs, selects and textareas
      var ignoreKlickCarousel = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(e.target.nodeName) !== -1;
      if (ignoreKlickCarousel) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      this.pointerDown = true;
      this.drag.startX = e.pageX;
    }

    /**
     * mouseup event handler
     */

  }, {
    key: 'mouseupHandler',
    value: function mouseupHandler(e) {
      e.stopPropagation();
      this.pointerDown = false;
      this.enableTransition();
      if (this.drag.endX) {
        this.updateAfterDrag();
      }
      this.clearDrag();
    }

  }, {
    key: 'mouseleaveHandler',
    value: function mouseleaveHandler(e) {
      if (this.pointerDown) {
        this.pointerDown = false;
        this.drag.endX = e.pageX;
        this.drag.preventClick = false;
        this.enableTransition();
        this.updateAfterDrag();
        this.clearDrag();
      }
    }

    /**
     * click event handler
     */

  }, {
    key: 'clickHandler',
    value: function clickHandler(e) {
      // if the dragged element is a link
      // prevent browsers from folowing the link
      if (this.drag.preventClick) {
        e.preventDefault();
      }
      this.drag.preventClick = false;
    }

    /**
     * Remove item from carousel.
     * @param {number} index - Item index to remove.
     * @param {function} callback - Optional callback to call after remove.
     */

  }, {
    key: 'remove',
    value: function remove(index, callback) {
      if (index < 0 || index >= this.innerElements.length) {
        throw new Error('Item to remove doesn\'t exist');
      }

      // Shift sliderFrame back by one item when:
      // 1. Item with lower index than currenSlide is removed.
      // 2. Last item is removed.
      var lowerIndex = index < this.currentSlide;
      var lastItem = this.currentSlide + this.perPage - 1 === index;

      if (lowerIndex || lastItem) {
        this.currentSlide--;
      }

      this.innerElements.splice(index, 1);

      // build a frame and slide to a currentSlide
      this.buildSliderFrame();

      if (callback) {
        callback.call(this);
      }
    }

    /**
     * Insert item to carousel at particular index.
     * @param {HTMLElement} item - Item to insert.
     * @param {number} index - Index of new new item insertion.
     * @param {function} callback - Optional callback to call after insert.
     */

  }, {
    key: 'insert',
    value: function insert(item, index, callback) {
      if (index < 0 || index > this.innerElements.length + 1) {
        throw new Error('Unable to inset it at this index');
      }
      if (this.innerElements.indexOf(item) !== -1) {
        throw new Error('The same item in a carousel? Really? Nope');
      }

      // Avoid shifting content
      var shouldItShift = index <= this.currentSlide > 0 && this.innerElements.length;
      this.currentSlide = shouldItShift ? this.currentSlide + 1 : this.currentSlide;

      this.innerElements.splice(index, 0, item);

      // build a frame and slide to a currentSlide
      this.buildSliderFrame();

      if (callback) {
        callback.call(this);
      }
    }

    /**
     * Prepernd item to carousel.
     * @param {HTMLElement} item - Item to prepend.
     * @param {function} callback - Optional callback to call after prepend.
     */

  }, {
    key: 'prepend',
    value: function prepend(item, callback) {
      this.insert(item, 0);
      if (callback) {
        callback.call(this);
      }
    }

    /**
     * Append item to carousel.
     * @param {HTMLElement} item - Item to append.
     * @param {function} callback - Optional callback to call after append.
     */

  }, {
    key: 'append',
    value: function append(item, callback) {
      this.insert(item, this.innerElements.length + 1);
      if (callback) {
        callback.call(this);
      }
    }

    /**
     * Removes listeners and optionally restores to initial markup
     * @param {boolean} restoreMarkup - Determinants about restoring an initial markup.
     * @param {function} callback - Optional callback function.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      var restoreMarkup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var callback = arguments[1];

      this.detachEvents();

      this.selector.style.cursor = 'auto';

      if (restoreMarkup) {
        var slides = document.createDocumentFragment();
        for (var i = 0; i < this.innerElements.length; i++) {
          slides.appendChild(this.innerElements[i]);
        }
        this.selector.innerHTML = '';
        this.selector.appendChild(slides);
        this.selector.removeAttribute('style');
        
        
      }

      if (callback) {
        callback.call(this);
      }
    }
  }], [{
    key: 'mergeSettings',
    value: function mergeSettings(options) {
      var settings = {
        selector: '.KlickSlider',
        duration: 200,
        easing: 'ease-out',
        perPage: 1,
        startIndex: 0,
        draggable: true,
        loop: true,
        arrows: true,
        dots: true,
        disable: 0
      };

      var userSttings = options;
      for (var attrname in userSttings) {
        settings[attrname] = userSttings[attrname];
      }

      return settings;
    }

    /**
     * Determine if browser supports unprefixed transform property.
     * Google Chrome since version 26 supports prefix-less transform
     * @returns {string} - Transform property supported by client.
     */

  }, {
    key: 'webkitOrNot',
    value: function webkitOrNot() {
      var style = document.documentElement.style;
      if (typeof style.transform === 'string') {
        return 'transform';
      }
      return 'WebkitTransform';
    }
  }]);

  return KlickCarousel;
}();

exports.default = KlickCarousel;
module.exports = exports['default'];

/***/ })
/******/ ]);
});


var myCarousel;
new KlickCarousel({
  selector: '.testimonialSlider',
  duration: 500,
});

function donationSlider(){
  if(window.innerWidth > 1024){
    myCarousel.destroy(true);
    myCarousel.selector.classList.add('desktop')
    
  }else{
    myCarousel.init();
    myCarousel.selector.classList.remove('desktop')
  }
}
window.addEventListener("resize", donationSlider);
window.addEventListener("DOMContentLoaded", function() {
  myCarousel = new KlickCarousel({
    selector: '.supportSlider',
    duration: 500
  });

  donationSlider()
  
});