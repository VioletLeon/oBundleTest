(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_7__);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*
 Import all product specific js
 */









var Product = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Product, _PageManager);

  function Product(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = jquery__WEBPACK_IMPORTED_MODULE_7___default()('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = jquery__WEBPACK_IMPORTED_MODULE_7___default()('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal-review-form')[0];
    return _this;
  }

  var _proto = Product.prototype;

  _proto.onReady = function onReady() {
    var _this2 = this;

    // Listen for foundation modal close events to sanitize URL after review.
    jquery__WEBPACK_IMPORTED_MODULE_7___default()(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator; // Init collapsible

    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"](jquery__WEBPACK_IMPORTED_MODULE_7___default()('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.bulkPricingHandler();
    var $reviewForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.writeReview-form');
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]({
      $reviewForm: $reviewForm
    });
    jquery__WEBPACK_IMPORTED_MODULE_7___default()('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);

      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }

      return false;
    });
    this.productReviewHandler();
  };

  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find('[data-input]').each(function (_, input) {
      var $input = jquery__WEBPACK_IMPORTED_MODULE_7___default()(input);
      var msgSpanId = $input.attr('name') + "-msg";
      $input.siblings('span').attr('id', msgSpanId);
      $input.attr('aria-describedby', msgSpanId);
    });
  };

  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };

  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };

  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }

  var _proto = VideoGallery.prototype;

  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };

  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };

  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };

  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };

  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;

    if (isInitialized) {
      return;
    }

    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC92aWRlby1nYWxsZXJ5LmpzIl0sIm5hbWVzIjpbIlByb2R1Y3QiLCJjb250ZXh0IiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiJHJldmlld0xpbmsiLCIkIiwiJGJ1bGtQcmljaW5nTGluayIsInJldmlld01vZGFsIiwibW9kYWxGYWN0b3J5Iiwib25SZWFkeSIsImRvY3VtZW50Iiwib24iLCJpbmRleE9mIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInRpdGxlIiwicGF0aG5hbWUiLCJ2YWxpZGF0b3IiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJwcm9kdWN0RGV0YWlscyIsIlByb2R1Y3REZXRhaWxzIiwiQkNEYXRhIiwicHJvZHVjdF9hdHRyaWJ1dGVzIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJ2aWRlb0dhbGxlcnkiLCJidWxrUHJpY2luZ0hhbmRsZXIiLCIkcmV2aWV3Rm9ybSIsImNsYXNzaWZ5Rm9ybSIsImxlbmd0aCIsInJldmlldyIsIlJldmlldyIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsImFyaWFEZXNjcmliZVJldmlld0lucHV0cyIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByb2R1Y3RSZXZpZXdIYW5kbGVyIiwiJGZvcm0iLCJmaW5kIiwiZWFjaCIsIl8iLCJpbnB1dCIsIiRpbnB1dCIsIm1zZ1NwYW5JZCIsImF0dHIiLCJzaWJsaW5ncyIsInRyaWdnZXIiLCJQYWdlTWFuYWdlciIsIlZpZGVvR2FsbGVyeSIsIiRlbGVtZW50IiwiJHBsYXllciIsIiR2aWRlb3MiLCJjdXJyZW50VmlkZW8iLCJiaW5kRXZlbnRzIiwic2VsZWN0TmV3VmlkZW8iLCJlIiwicHJldmVudERlZmF1bHQiLCIkdGFyZ2V0IiwiY3VycmVudFRhcmdldCIsImlkIiwiZGF0YSIsIiRzZWxlY3RlZFRodW1iIiwic2V0TWFpblZpZGVvIiwic2V0QWN0aXZlVGh1bWIiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiYmluZCIsInBsdWdpbktleSIsIiR2aWRlb0dhbGxlcnkiLCJpbmRleCIsImVsZW1lbnQiLCIkZWwiLCJpc0luaXRpYWxpemVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFcUJBLE87OztBQUNuQixtQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNuQixvQ0FBTUEsT0FBTjtBQUNBLFVBQUtDLEdBQUwsR0FBV0MsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUEzQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUJDLDZDQUFDLENBQUMsc0NBQUQsQ0FBcEI7QUFDQSxVQUFLQyxnQkFBTCxHQUF3QkQsNkNBQUMsQ0FBQyx1Q0FBRCxDQUF6QjtBQUNBLFVBQUtFLFdBQUwsR0FBbUJDLDZEQUFZLENBQUMsb0JBQUQsQ0FBWixDQUFtQyxDQUFuQyxDQUFuQjtBQUxtQjtBQU1wQjs7OztTQUVEQyxPLEdBQUEsbUJBQVU7QUFBQTs7QUFDUjtBQUNBSixpREFBQyxDQUFDSyxRQUFELENBQUQsQ0FBWUMsRUFBWixDQUFlLG9CQUFmLEVBQXFDLFlBQU07QUFDekMsVUFDRSxNQUFJLENBQUNYLEdBQUwsQ0FBU1ksT0FBVCxDQUFpQixlQUFqQixNQUFzQyxDQUFDLENBQXZDLElBQ0EsT0FBT1gsTUFBTSxDQUFDWSxPQUFQLENBQWVDLFlBQXRCLEtBQXVDLFVBRnpDLEVBR0U7QUFDQWIsY0FBTSxDQUFDWSxPQUFQLENBQWVDLFlBQWYsQ0FDRSxJQURGLEVBRUVKLFFBQVEsQ0FBQ0ssS0FGWCxFQUdFZCxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JjLFFBSGxCO0FBS0Q7QUFDRixLQVhEO0FBYUEsUUFBSUMsU0FBSixDQWZRLENBaUJSOztBQUNBQyx1RUFBa0I7QUFFbEIsU0FBS0MsY0FBTCxHQUFzQixJ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cm9kdWN0IHNwZWNpZmljIGpzXG4gKi9cbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgUmV2aWV3IGZyb20gJy4vcHJvZHVjdC9yZXZpZXdzJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzIGZyb20gJy4vY29tbW9uL3Byb2R1Y3QtZGV0YWlscyc7XG5pbXBvcnQgdmlkZW9HYWxsZXJ5IGZyb20gJy4vcHJvZHVjdC92aWRlby1nYWxsZXJ5JztcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IG1vZGFsRmFjdG9yeSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgc3VwZXIoY29udGV4dCk7XG4gICAgdGhpcy51cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICB0aGlzLiRyZXZpZXdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nKTtcbiAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1idWxrLXByaWNpbmdcIl0nKTtcbiAgICB0aGlzLnJldmlld01vZGFsID0gbW9kYWxGYWN0b3J5KCcjbW9kYWwtcmV2aWV3LWZvcm0nKVswXTtcbiAgfVxuXG4gIG9uUmVhZHkoKSB7XG4gICAgLy8gTGlzdGVuIGZvciBmb3VuZGF0aW9uIG1vZGFsIGNsb3NlIGV2ZW50cyB0byBzYW5pdGl6ZSBVUkwgYWZ0ZXIgcmV2aWV3LlxuICAgICQoZG9jdW1lbnQpLm9uKCdjbG9zZS5mbmR0bi5yZXZlYWwnLCAoKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgKSB7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIGRvY3VtZW50LnRpdGxlLFxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IHZhbGlkYXRvcjtcblxuICAgIC8vIEluaXQgY29sbGFwc2libGVcbiAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgUHJvZHVjdERldGFpbHMoXG4gICAgICAkKCcucHJvZHVjdFZpZXcnKSxcbiAgICAgIHRoaXMuY29udGV4dCxcbiAgICAgIHdpbmRvdy5CQ0RhdGEucHJvZHVjdF9hdHRyaWJ1dGVzXG4gICAgKTtcbiAgICB0aGlzLnByb2R1Y3REZXRhaWxzLnNldFByb2R1Y3RWYXJpYW50KCk7XG5cbiAgICB2aWRlb0dhbGxlcnkoKTtcblxuICAgIHRoaXMuYnVsa1ByaWNpbmdIYW5kbGVyKCk7XG5cbiAgICBjb25zdCAkcmV2aWV3Rm9ybSA9IGNsYXNzaWZ5Rm9ybSgnLndyaXRlUmV2aWV3LWZvcm0nKTtcblxuICAgIGlmICgkcmV2aWV3Rm9ybS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIGNvbnN0IHJldmlldyA9IG5ldyBSZXZpZXcoeyAkcmV2aWV3Rm9ybSB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nLCAoKSA9PiB7XG4gICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XG4gICAgICB0aGlzLmFyaWFEZXNjcmliZVJldmlld0lucHV0cygkcmV2aWV3Rm9ybSk7XG4gICAgfSk7XG5cbiAgICAkcmV2aWV3Rm9ybS5vbignc3VibWl0JywgKCkgPT4ge1xuICAgICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgICB2YWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgIHJldHVybiB2YWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICB0aGlzLnByb2R1Y3RSZXZpZXdIYW5kbGVyKCk7XG4gIH1cblxuICBhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMoJGZvcm0pIHtcbiAgICAkZm9ybS5maW5kKCdbZGF0YS1pbnB1dF0nKS5lYWNoKChfLCBpbnB1dCkgPT4ge1xuICAgICAgY29uc3QgJGlucHV0ID0gJChpbnB1dCk7XG4gICAgICBjb25zdCBtc2dTcGFuSWQgPSBgJHskaW5wdXQuYXR0cignbmFtZScpfS1tc2dgO1xuXG4gICAgICAkaW5wdXQuc2libGluZ3MoJ3NwYW4nKS5hdHRyKCdpZCcsIG1zZ1NwYW5JZCk7XG4gICAgICAkaW5wdXQuYXR0cignYXJpYS1kZXNjcmliZWRieScsIG1zZ1NwYW5JZCk7XG4gICAgfSk7XG4gIH1cblxuICBwcm9kdWN0UmV2aWV3SGFuZGxlcigpIHtcbiAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI3dyaXRlX3JldmlldycpICE9PSAtMSkge1xuICAgICAgdGhpcy4kcmV2aWV3TGluay50cmlnZ2VyKCdjbGljaycpO1xuICAgIH1cbiAgfVxuXG4gIGJ1bGtQcmljaW5nSGFuZGxlcigpIHtcbiAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI2J1bGtfcHJpY2luZycpICE9PSAtMSkge1xuICAgICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVmlkZW9HYWxsZXJ5IHtcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRwbGF5ZXIgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1wbGF5ZXJdJyk7XG4gICAgICAgIHRoaXMuJHZpZGVvcyA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLWl0ZW1dJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge307XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIHNlbGVjdE5ld1ZpZGVvKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7XG4gICAgICAgICAgICBpZDogJHRhcmdldC5kYXRhKCd2aWRlb0lkJyksXG4gICAgICAgICAgICAkc2VsZWN0ZWRUaHVtYjogJHRhcmdldCxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNldE1haW5WaWRlbygpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZVRodW1iKCk7XG4gICAgfVxuXG4gICAgc2V0TWFpblZpZGVvKCkge1xuICAgICAgICB0aGlzLiRwbGF5ZXIuYXR0cignc3JjJywgYC8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dGhpcy5jdXJyZW50VmlkZW8uaWR9YCk7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlVGh1bWIoKSB7XG4gICAgICAgIHRoaXMuJHZpZGVvcy5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvLiRzZWxlY3RlZFRodW1iLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3Mub24oJ2NsaWNrJywgdGhpcy5zZWxlY3ROZXdWaWRlby5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpZGVvR2FsbGVyeSgpIHtcbiAgICBjb25zdCBwbHVnaW5LZXkgPSAndmlkZW8tZ2FsbGVyeSc7XG4gICAgY29uc3QgJHZpZGVvR2FsbGVyeSA9ICQoYFtkYXRhLSR7cGx1Z2luS2V5fV1gKTtcblxuICAgICR2aWRlb0dhbGxlcnkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgJGVsID0gJChlbGVtZW50KTtcbiAgICAgICAgY29uc3QgaXNJbml0aWFsaXplZCA9ICRlbC5kYXRhKHBsdWdpbktleSkgaW5zdGFuY2VvZiBWaWRlb0dhbGxlcnk7XG5cbiAgICAgICAgaWYgKGlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICRlbC5kYXRhKHBsdWdpbktleSwgbmV3IFZpZGVvR2FsbGVyeSgkZWwpKTtcbiAgICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=