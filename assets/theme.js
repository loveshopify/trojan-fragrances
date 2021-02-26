/*
* This is an unminified version of the theme.min.js file used by your theme.
* If you want to use this file, you will need to change the script reference in your theme
* Change <script src="{{ 'theme.min.js' | asset_url }}"> to:
* <script src="{{ 'theme.js' | asset_url }}">
*/
(function ($,omit,find,throttle,a11y,remove,filter,fill,debounce,morphdom,defaultTo,findIndex,isArray,Hammer) {
$ = 'default' in $ ? $['default'] : $;
omit = 'default' in omit ? omit['default'] : omit;
find = 'default' in find ? find['default'] : find;
throttle = 'default' in throttle ? throttle['default'] : throttle;
remove = 'default' in remove ? remove['default'] : remove;
filter = 'default' in filter ? filter['default'] : filter;
fill = 'default' in fill ? fill['default'] : fill;
debounce = 'default' in debounce ? debounce['default'] : debounce;
morphdom = 'default' in morphdom ? morphdom['default'] : morphdom;
defaultTo = 'default' in defaultTo ? defaultTo['default'] : defaultTo;
findIndex = 'default' in findIndex ? findIndex['default'] : findIndex;
isArray = 'default' in isArray ? isArray['default'] : isArray;
Hammer = 'default' in Hammer ? Hammer['default'] : Hammer;

function Templates() {
  this.registered = {};
  this.instances = [];
  this.extensions = {
    '*': []
  };
}

Templates.prototype = {
  register: function(name, classname, properties) {
    function Template(container, extensions) {
      this.name = name.toLowerCase();
      this.container = container;
      this.$container = $(container);
      this.extensions = extensions;
      Master.call(this);
    }

    Template.classname = classname;
    Template.constructor = Template;
    Template.prototype = Object.create(Master.prototype);
    $.extend(Template.prototype, properties);

    this.registered[name] = Template;
  },

  extend: function(names, extension) {
    if (names === '*') {
      names = Object.keys(this.registered);
      names.push('*');
    } else if (typeof names === 'string') {
      names = [names];
    }

    names.forEach(
      function(name) {
        this.extensions[name] = this.extensions[name] || [];
        this.extensions[name].push(extension);

        if (typeof this.registered[name] === 'undefined' || name === '*')
          return;

        this.instances.forEach(function(instance) {
          if (instance.name !== name) return;

          instance.extend(extension);
        });
      }.bind(this)
    );
  },

  load: function(names) {
    if (names === '*') {
      names = Object.keys(this.registered);
    } else if (typeof names === 'string') {
      names = [names];
    }

    names.forEach(this._loadTemplate.bind(this));
  },

  _loadTemplate: function(name) {
    var Template = this.registered[name];
    var instance = find(this.instances, { name: name });
    var container;
    var extensions;

    // If the template name is not registered or already has an instance loaded,
    // then return
    if (typeof Template === 'undefined' || instance) return;

    // Get the container for the template
    if (Template.classname === '*') {
      container = document.body;
    } else {
      container = document.querySelector('body.' + Template.classname);
    }

    // If we don't have the specified container on the page then return
    if (!container) return;

    // Get all extensions for the new template instance
    extensions = this.extensions['*'].concat(this.extensions[name] || []);
    instance = new Template(container, extensions);

    // Call the onLoad function of the template if it exists
    if ($.isFunction(instance.onLoad)) {
      instance.onLoad(container);
    }

    // Push the template instance to storage
    this.instances.push(instance);
  }
};

function Master() {
  this.extensions.forEach(
    function(extension) {
      this.extend(extension);
    }.bind(this)
  );
}

Master.prototype = {
  extend: function(extension) {
    var init = extension.init;
    this.extensions.push(extension);

    if ($.isFunction(init)) {
      extension = omit(extension, 'init');
    }

    $.extend(this, extension);
    init.apply(this);
  }
};

var templates = new Templates();

var classes$1 = {
  disableScroll: 'disable-scroll'
};

var utils = {
  pointerEventToXY: function(event) {
    var position;

    if (event.originalEvent.touches) {
      position =
        event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
    } else {
      position = event;
    }
    return {
      x: position.pageX,
      y: position.pageY
    };
  },

  promiseRepeatSeries: function(promise, count) {
    count--;

    return promise().then(
      function() {
        // eslint-disable-line consistent-return
        if (count) {
          return this.promiseRepeatSeries(promise, count);
        }
      }.bind(this)
    );
  },

  mapPromiseSeries: function(iterable, cb, delay) {
    var series = $.Deferred().resolve();

    $.each(iterable, function(index, item) {
      series = series.then(function() {
        if (typeof delay === 'number') {
          return delayedReturn(index, item);
        } else {
          return cb(index, item);
        }
      });
    });

    function delayedReturn(index, item) {
      return $.Deferred(function(defer) {
        setTimeout(function() {
          defer.resolve(cb(index, item)); // eslint-disable-line callback-return
        }, delay);
      });
    }

    return series;
  },

  promiseAnimationEnd: function($el) {
    var events = 'animationend webkitAnimationEnd oAnimationEnd';
    var properties = [
      'animation-duration',
      '-moz-animation-duration',
      '-webkit-animation-duration',
      '-o-animation-duration'
    ];
    var duration = 0;
    var promise = $.Deferred().resolve();

    // check the various CSS properties to see if a duration has been set
    $.each(properties, function(index, value) {
      duration || (duration = parseFloat($el.css(value))); // eslint-disable-line no-unused-expressions
    });

    if (duration > 0) {
      promise = $.Deferred(function(defer) {
        $el.on(events, function(evt) {
          if (evt.target !== $el[0]) return;
          $el.off(events);
          defer.resolve();
        });
      });
    }

    return promise;
  },

  promiseTransitionEnd: function($el) {
    var events =
      'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
    var properties = [
      'transition-duration',
      '-moz-transition-duration',
      '-webkit-transition-duration',
      '-o-transition-duration'
    ];
    var duration = 0;
    var promise = $.Deferred().resolve();

    // check the various CSS properties to see if a duration has been set
    $.each(properties, function(index, value) {
      duration || (duration = parseFloat($el.css(value))); // eslint-disable-line no-unused-expressions
    });

    if (duration > 0) {
      promise = $.Deferred(function(defer) {
        $el.on(events, function(evt) {
          if (evt.target !== $el[0]) return;
          $el.off(events);
          defer.resolve();
        });
      });
    }

    return promise;
  },

  isLocalStorageSupported: function() {
    var mod = 'localStorageTest';
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch (error) {
      return false;
    }
  },

  isSessionStorageSupported: function() {
    var mod = 'sessionStorageTest';
    try {
      sessionStorage.setItem(mod, mod);
      sessionStorage.removeItem(mod);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Set all tabbable elements tabindex attribute to '-1' so that they are not
   * tabbable. Great for if you want to hide something with opacity: 0 or
   * visibility: hidden, but don't want interactivity
   *
   * @param {any} container - Container to look for children elements to disable
   */
  disableTabbingOfChildren: function(containers) {
    $(containers).each(function(index, container) {
      $(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]',
        container
      ).attr('tabindex', '-1');
    });
  },

  /**
   * Remove all tabbable elements' tabindex attribute so that they assume their
   * normal tabbing behaviour.
   *
   * @param {any} container - Container to look for children elements to reset
   */
  enableTabbingOfChildren: function(containers) {
    $(containers).each(function(index, container) {
      $(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]',
        container
      ).removeAttr('tabindex');
    });
  },

  isiOSSafari: function() {
    var userAgent = window.navigator.userAgent;
    var iOS =
      Boolean(userAgent.match(/iPad/i)) || Boolean(userAgent.match(/iPhone/i));
    var webkit = Boolean(userAgent.match(/WebKit/i));

    return iOS && webkit && !userAgent.match(/CriOS/i);
  },

  disableScrollBody: function() {
    // If the body isn't tall enough to scroll then we have nothing to disable
    if (document.body.scrollHeight - window.innerHeight === 0) return;

    $('html').addClass(classes$1.disableScroll);
  },

  enableScrollBody: function() {
    $('html').removeClass(classes$1.disableScroll);
  },

  updateUrlParameter: function(url, key, value) {
    var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    var separator = url.indexOf('?') === -1 ? '?' : '&';

    if (url.match(re)) {
      return url.replace(re, '$1' + key + '=' + value + '$2');
    } else {
      return url + separator + key + '=' + value;
    }
  },

  cookiesEnabled: function() {
    var cookieEnabled = navigator.cookieEnabled;

    if (!cookieEnabled) {
      document.cookie = 'testcookie';
      cookieEnabled = document.cookie.indexOf('testcookie') !== -1;
    }
    return cookieEnabled;
  },

  onFirst: function(name, fn) {
    // bind as you normally would
    // don't want to miss out on any jQuery magic
    this.on(name, fn);

    this.each(function() {
      var handlers = $._data(this, 'events')[name.split('.')[0]];
      // take out the handler we just inserted from the end
      var handler = handlers.pop();
      // move it at the beginning
      handlers.splice(0, 0, handler);
    });
  },

  // Returns a promise that is only resolved when the main stylesheet has been
  // downloaded.
  promiseStylesheet: function() {
    if (typeof this.stylesheetPromise === 'undefined') {
      this.stylesheetPromise = $.Deferred(function(defer) {
        var link = document.querySelector(
          'link[href="' + theme.stylesheet + '"]'
        );

        if (link.loaded) {
          defer.resolve();
        }

        /* eslint-disable no-undef */
        onloadCSS(link, function() {
          // Global onloadCSS function injected by load-css.liquid
          defer.resolve();
        });
      });
    }

    return this.stylesheetPromise;
  },

  isMobile: function() {
    // Create a scoped variable that stores the current status
    var status = false;

    // Replace utils.isMobile function with a function that returns the status.
    // This makes sure the code below is on executed once, and then from there
    // on the only thing that isMobile does is return var status.
    this.isMobile = function() {
      return status;
    };

    function checkIfMobile() {
      status = $(window).outerWidth() < theme.mediaQuerySmall;
      return status;
    }

    // Make sure that this resize handler is the first handler in the event loop
    $.fn.onFirst = this.onFirst;

    // This event handler is only assigned once.
    $(window).onFirst('resize', checkIfMobile);

    // Set the initial value of status and return that value. After this,
    // isMobile() will return `var status`
    return checkIfMobile();
  },

  isTablet: function() {
    // Create a scoped variable that stores the current status
    var status = false;

    // Replace utils.isTablet function with a function that returns the status.
    // This makes sure the code below is on executed once, and then from there
    // on the only thing that isTablet does is return var status.
    this.isTablet = function() {
      return status;
    };

    function checkIfTablet() {
      var width = $(window).outerWidth();
      status = width > theme.mediaQuerySmall && width < theme.mediaQueryMedium;
      return status;
    }

    // Make sure that this resize handler is the first handler in the event loop
    $.fn.onFirst = this.onFirst;

    // This event handler is only assigned once.
    $(window).onFirst('resize', checkIfTablet);

    // Set the initial value of status and return that value. After this,
    // isTablet() will return `var status`
    return checkIfTablet();
  },

  isInOrAboveViewport: function(element) {
    var rect = element.getBoundingClientRect();
    var offset = 50;

    return (
      // The top is in view: the top is more than 0 and less than the window height (the top of the element is in view)
      (rect.top + offset >= 0 && rect.top + offset <= window.innerHeight) ||
      // The bottom is in view: bottom position is greater than 0 and greater than the window height
      (rect.bottom + offset >= 0 &&
        rect.bottom + offset <= window.innerHeight) ||
      // The top is above the viewport and the bottom is below the viewport
      (rect.top + offset < 0 && rect.bottom + offset > window.innerHeight) ||
      // The bottom is above the viewport
      rect.bottom < 0
    );
  },

  keyboardKeys: {
    TAB: 9,
    ENTER: 13,
    SPACE: 32,
    LEFTARROW: 37,
    RIGHTARROW: 39
  }
};

var selectors = {
  elementsToAnimate: '[data-animate]'
};

var classes = {
  animated: 'has-animated',
  animationsDisabled: 'animations--disabled'
};

templates.register('Page animations', '*', {
  onLoad: function() {
    this.animationNamespace = '.animations';
    this.$elementsToAnimate = $(selectors.elementsToAnimate, this.$container);

    if (this.$elementsToAnimate.length === 0) return;

    // This extension is used for templates and sections. Templates don't have
    // event handling like sections so we need to use regular jQuery events
    var scrollEvent = 'scroll' + this.animationNamespace;

    if (Shopify.designMode) {
      scrollEvent += ' touchmove' + this.animationNamespace;
    }
    $(window).on(
      scrollEvent,
      throttle(this._animateElementsInViewport.bind(this), 200)
    );
    $(window).on(
      'resize' + this.animationNamespace,
      throttle(this._animateElementsInViewport.bind(this), 200)
    );

    if (Shopify && Shopify.designMode) {
      $(document).on(
        'shopify:section:load shopify:section:select',
        this._onSectionSelect.bind(this)
      );
      $(document).on(
        'shopify:section:unload shopify:section:deselect',
        this._onSectionDeselect.bind(this)
      );
    }

    // Put this on a loop to check if elements on page load need to be animated
    utils.promiseStylesheet().then(this._animateElementsInViewport.bind(this));
  },

  _animateElementsInViewport: function() {
    this.$elementsToAnimate = this.$elementsToAnimate.map(function(
      index,
      element
    ) {
      // If the element is not going to be animated, return it to the list of
      // elements to animate
      if (!utils.isInOrAboveViewport(element)) {
        return element;
      }

      // Debounce any style changes to the next frame.
      requestAnimationFrame(function() {
        $(element).addClass(classes.animated);

        // This extension is also used for template, which don't have trigger and
        // events functionality
        $(element).trigger('animate_element', [element]);
      });

      // Since this element was animated, we return null so its NOT added back
      // to the list of elements to animate
      return null;
    });

    if (this.$elementsToAnimate.length === 0) {
      $(window).off(this.animationNamespace);
    }
  },

  _onSectionSelect: function() {
    $(document.body).addClass(classes.animationsDisabled);
  },

  _onSectionDeselect: function(evt) {
    $(document.body).removeClass(classes.animationsDisabled);

    $(evt.target)
      .find(selectors.elementsToAnimate)
      .addClass(classes.animated);
  }
});

var selectors$2 = {
  socialSharing: '.social-sharing',
  socialSharingToggle: '.social-sharing__toggle',
  linkList: '.social-sharing__item-list'
};
var classes$3 = {
  socialSharingAction: 'social-sharing--active'
};

var socialSharing = {
  init: function() {
    this.$elements = $(selectors$2.socialSharing, this.$container);
    this.clicked = false;

    $(selectors$2.socialSharingToggle, this.$container)
      .on('click', this._onClick.bind(this))
      .one('click', function() {
        this.clicked = true;
      });

    this.$container.on('section_unload', this.destroySocialSharing.bind(this));
  },

  showSocialSharing: function() {
    $(selectors$2.socialSharing, this.$container).addClass(
      classes$3.socialSharingAction
    );
    $(selectors$2.socialSharingToggle, this.$container).attr(
      'aria-expanded',
      true
    );
    $(selectors$2.linkList, this.$container).attr('aria-hidden', false);
    utils.enableTabbingOfChildren($(selectors$2.linkList, this.$container));
  },

  hideSocialSharing: function() {
    $(selectors$2.socialSharing, this.$container).removeClass(
      classes$3.socialSharingAction
    );
    $(selectors$2.socialSharingToggle, this.$container).attr(
      'aria-expanded',
      false
    );
    $(selectors$2.linkList, this.$container).attr('aria-hidden', true);
    utils.disableTabbingOfChildren($(selectors$2.linkList, this.$container));
  },

  destroySocialSharing: function() {
    $(selectors$2.socialSharingToggle, this.$container).off();
  },

  _onClick: function(evt) {
    if ($(evt.currentTarget).attr('aria-expanded') === 'true') {
      this.hideSocialSharing();
    } else {
      this.showSocialSharing();
    }
  }
};

var selectors$1 = {
  articleContentWrapper: '.article__wrapper',
  articleShareDesktop: '.article__share-desktop',
  articleShareMobile: '.article__share-mobile',
  articleShareDesktopWrapper: '.article__share-desktop-wrapper',
  socialSharing: '.social-sharing'
};

var classes$2 = {
  shareFixed: 'article__share-desktop--fixed',
  shareBottom: 'article__share-desktop--bottom'
};

var settings = {
  shareExpandedHeight: 350
};

templates.register('Article Template', 'template-article', {
  onLoad: function() {
    this.extend(socialSharing);

    $(window)
      .on('scroll', this.setSharePosition.bind(this))
      .on('resize', this.updateMeasurements.bind(this));

    utils.promiseStylesheet().then(
      function() {
        this.updateMeasurements();
      }.bind(this)
    );
  },

  setSharePosition: function() {
    if (utils.isMobile() || utils.isTablet()) return;

    var scrollTop = $(window).scrollTop();

    // Debounce DOM edits to next frame with requestAnimationFrame
    requestAnimationFrame(
      function() {
        if (scrollTop > this.fixedTop) {
          if (scrollTop > this.fixedBottom) {
            // Fix to bottom
            $(selectors$1.articleShareDesktop)
              .removeClass(classes$2.shareFixed)
              .addClass(classes$2.shareBottom);
          } else {
            // Fix to top
            $(selectors$1.articleShareDesktop)
              .addClass(classes$2.shareFixed)
              .removeClass(classes$2.shareBottom);
          }
        } else {
          // Fix to side
          $(selectors$1.articleShareDesktop)
            .removeClass(classes$2.shareFixed)
            .removeClass(classes$2.shareBottom);
        }

        if (!this.clicked) {
          if (scrollTop > this.fixedBottom - settings.shareExpandedHeight) {
            this.showSocialSharing();
          } else {
            this.hideSocialSharing();
          }
        }
      }.bind(this)
    );
  },

  updateMeasurements: function() {
    this.fixedTop = $(selectors$1.articleContentWrapper).offset().top;
    this.fixedBottom =
      this.fixedTop +
      $(selectors$1.articleContentWrapper).height() -
      $(selectors$1.articleShareDesktopWrapper).height();
    this.windowHeight = $(window).outerHeight();

    this.setSharePosition();
  }
});

var selectors$3 = {
  addressCountrySelect: '.address-country-selector',
  newToggle: '.address-new-toggle',
  newAddressContainer: '.new-address',
  editToggle: '.address-edit-toggle',
  editAddressContainer: '.edit-address',
  editAddressContainerId: '#EditAddress_',
  deleteAddress: '.address-delete',
  currentAddresses: '.current-addresses',
  currentAddress: '#CurrentAddress_',
  currentAddressesItem: '.current-addresses__item'
};
var classes$4 = {
  newAddressHide: 'new-address--hidden',
  editAddressShow: 'edit-address--show'
};

templates.register(
  'Customer Addresses Template',
  'template-customers-addresses',
  {
    onLoad: function(container) {
      var $container = (this.$container = $(container));
      var $countryOptions = $(theme.countryOptionTags).filter('option');
      var $addressCountrySelect = $(selectors$3.addressCountrySelect, $container);
      var $newAddressContainer = $(selectors$3.newAddressContainer, $container);
      var $editAddressContainers = $(
        selectors$3.editAddressContainer,
        $container
      );

      $addressCountrySelect.each(
        function(index, countrySelect) {
          var $countrySelect = this._populateCountrySelect(
            countrySelect,
            $countryOptions
          );
          var currentProvinces = this._fetchCurrentProvinces($countrySelect);
          var $provinceSelect = $(
            $countrySelect.attr('data-province-select'),
            $container
          );
          var defaultProvince = $provinceSelect.data('default');

          this._populateProvinceSelect(
            $provinceSelect,
            currentProvinces,
            defaultProvince
          );
        }.bind(this)
      );

      $(selectors$3.newToggle).on('click', this._onNewAddressClick.bind(this));
      $(selectors$3.editToggle).on('click', this._onEditAddressClick.bind(this));
      $(selectors$3.deleteAddress).on(
        'click',
        this._onDeleteAddressClick.bind(this)
      );

      if ($('div.errors', $newAddressContainer).length !== 0) {
        $newAddressContainer.removeClass(classes$4.newAddressHide);
      }

      $editAddressContainers.each(function() {
        if ($('div.errors', this).length !== 0) {
          $(this).addClass(classes$4.editAddressShow);
        }
      });
    },

    _populateCountrySelect: function(countrySelect, countryOptions) {
      var $countrySelect = $(countrySelect);
      var defaultValue = $countrySelect.data('default');
      var defaultOption = countryOptions[0];

      // If the country <select> has a default value already set, that country
      // value is written in the theme language (not always english). The <option>
      // value attribute in the country <select> are always in English. We need to
      // find the <option> that has the same .text value as our default value.
      if (typeof defaultValue === 'string' && defaultValue !== '') {
        defaultOption = find(countryOptions, function(el) {
          return el.text === defaultValue;
        });
      }

      return $countrySelect
        .html(countryOptions.clone())
        .val(defaultOption.value)
        .on('change', this._onCountrySelectChange.bind(this));
    },

    _populateProvinceSelect: function(
      $provinceSelect,
      provinces,
      defaultValue
    ) {
      var $container = $provinceSelect.parent();
      var provinceOptions = provinces.map(this._createProvinceOption);
      var value = defaultValue || $(provinceOptions[0]).val();

      if (provinceOptions.length) {
        $container.show();
      } else {
        $container.hide();
      }

      return $provinceSelect.html(provinceOptions).val(value);
    },

    _createProvinceOption: function(province) {
      return $('<option>')
        .attr({
          value: province[1]
        })
        .text(province[1]);
    },

    _fetchCurrentProvinces: function($countrySelect) {
      return $countrySelect.find(':selected').data('provinces') || [];
    },

    _onCountrySelectChange: function(event) {
      var $countrySelect = $(event.target);
      var currentProvinces = this._fetchCurrentProvinces($countrySelect);
      var $provinceSelect = $($countrySelect.data('province-select'));

      this._populateProvinceSelect($provinceSelect, currentProvinces);
    },

    _onNewAddressClick: function() {
      $(selectors$3.newAddressContainer, this.$container).toggleClass(
        classes$4.newAddressHide
      );
    },

    _onEditAddressClick: function(event) {
      var formId = $(event.target).data('form-id');
      $(selectors$3.editAddressContainerId + formId, this.$container).toggleClass(
        classes$4.editAddressShow
      );
    },

    _onDeleteAddressClick: function(event) {
      var $button = $(event.target);
      var formId = $button.data('form-id');
      var addressUrl = $button.data('address-url');
      var confirmMessage = $button.data('confirm-message');
      var $container = $(selectors$3.currentAddress + formId, this.$container);

      if (confirm(confirmMessage)) {
        // eslint-disable-line no-alert
        $.post(addressUrl, {
          _method: 'delete'
        });
        $container.remove();

        if (!$(selectors$3.currentAddressesItem).length) {
          $(selectors$3.currentAddresses, this.$container).remove();
          $(selectors$3.newAddressContainer, this.$container).removeClass(
            classes$4.newAddressHide
          );
        }
      }
    }
  }
);

var selectors$4 = {
  recoverPasswordForm: '#RecoverPasswordForm',
  customerLoginForm: '#CustomerLoginForm',
  hideRecoverPasswordLink: '#HideRecoverPasswordLink',
  showRecoverPasswordLink: '#RecoverPassword'
};

templates.register('Customer Login Template', 'template-customers-login', {
  onLoad: function(container) {
    var $container = (this.$container = $(container));

    this.checkUrlHash();
    this.resetPasswordSuccess();

    $(selectors$4.showRecoverPasswordLink, $container).on(
      'click',
      this.onShowHidePasswordForm.bind(this)
    );
    $(selectors$4.hideRecoverPasswordLink, $container).on(
      'click',
      this.onShowHidePasswordForm.bind(this)
    );
  },

  onShowHidePasswordForm: function(evt) {
    evt.preventDefault();
    this.toggleRecoverPasswordForm();
  },

  checkUrlHash: function() {
    var hash = window.location.hash;

    if (hash === '#recover') {
      this.toggleRecoverPasswordForm();
    }
  },

  toggleRecoverPasswordForm: function() {
    $(selectors$4.recoverPasswordForm).toggleClass('hide');
    $(selectors$4.customerLoginForm).toggleClass('hide');
  },

  resetPasswordSuccess: function() {
    if (!$('.reset-password-success').length) {
      return;
    }

    $('#ResetSuccess').removeClass('hide');
  }
});

if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

/**
 * Rich Text Editor
 * -----------------------------------------------------------------------------
 * Wrap videos in div to force responsive layout.
 *
 * @namespace rte
 */

var rte = {
  wrapTable: function() {
    $('.rte table').wrap('<div class="rte__table-wrapper"></div>');
  },

  iframeReset: function() {
    var $iframeVideo = $(
      '.rte iframe[src*="youtube.com/embed"], .rte iframe[src*="player.vimeo"]'
    );
    var $iframeReset = $iframeVideo.add('.rte iframe#admin_bar_iframe');

    $iframeVideo.each(function() {
      // Add wrapper to make video responsive
      $(this).wrap('<div class="video-wrapper"></div>');
    });

    $iframeReset.each(function() {
      // Re-set the src attribute on each iframe after page load
      // for Chrome's "incorrect iFrame content on 'back'" bug.
      // https://code.google.com/p/chromium/issues/detail?id=395791
      // Need to specifically target video and admin bar
      this.src = this.src;
    });
  },

  imageLink: function() {
    // Add class to remove underline on image links.
    $('.rte a:has(img)').addClass('image-link');
  }
};

templates.register('Page Helpers', '*', {
  onLoad: function() {
    this.pageLinkFocus();
    this.rteFixes();
    this.disableOutlineOnClick();
    this.checkIfMobileOS();
  },

  pageLinkFocus: function() {
    // Common a11y fixes
    a11y.focusHash({
      className: 'js-focus-hidden'
    });

    a11y.bindInPageLinks({
      className: 'js-focus-hidden',
      ignore: '[data-link-no-focus]'
    });
  },

  rteFixes: function() {
    // Wrap videos in div to force responsive layout.
    rte.wrapTable();
    rte.iframeReset();
    // Remove underline on image links.
    rte.imageLink();
  },

  disableOutlineOnClick: function() {
    // Disable focus outline when clicking, enable when navigating with keys
    var classes = {
      outlineDisabled: 'outline-disabled'
    };

    $('html').addClass(classes.outlineDisabled);

    $(document).on('keyup', function() {
      $('html').removeClass(classes.outlineDisabled);
    });

    $(document).on('click', function(evt) {
      $('html').toggleClass(
        classes.outlineDisabled,
        !$(evt.target).is('input, textarea, select, button')
      );
    });
  },

  checkIfMobileOS: function() {
    var ua = navigator.userAgent.toLowerCase();
    var isIOS = /ipad|iphone|ipod/.test(ua) && !window.MSStream;
    var isAndroid = /android/.test(ua);

    if (isIOS) {
      $('html')
        .addClass('is-mobile-os')
        .addClass('is-ios');
    }
    if (isAndroid) {
      $('html')
        .addClass('is-mobile-os')
        .addClass('is-android');
    }
  }
});

/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */

var a11y$1 = {
  /**
   * For use when focus shifts to a container rather than a link
   * eg for In-page links, after scroll, focus shifts to content area so that
   * next `tab` is where user expects if focusing a link, just $link.focus();
   *
   * @param {JQuery} $element - The element to be acted upon
   */
  pageLinkFocus: function($element) {
    var focusClass = 'js-focus-hidden';

    $element
      .first()
      .attr('tabIndex', '-1')
      .focus()
      .addClass(focusClass)
      .one('blur', callback);

    function callback() {
      $element
        .first()
        .removeClass(focusClass)
        .removeAttr('tabindex');
    }
  },

  /**
   * Attempts to focus an element, and if unsuccessful adds tabindex to the
   * element and focuses it. Tabindex is removed on element blur.
   *
   * @param {jQuery} $element - The element to be focused
   */
  forceFocus: function($element) {
    $element.focus();

    if (!$element.is(document.activeElement)) {
      $element
        .attr('tabindex', '0')
        .focus()
        .one('blur', function() {
          $element.removeAttr('tabindex');
        });
    }
  },

  /**
   * If there's a hash in the url, focus the appropriate element
   */
  focusHash: function() {
    var hash = window.location.hash;

    // is there a hash in the url? is it an element on the page?
    if (hash && document.getElementById(hash.slice(1))) {
      this.pageLinkFocus($(hash));
    }
  },

  /**
   * When an in-page (url w/hash) link is clicked, focus the appropriate element
   */
  bindInPageLinks: function() {
    $('a[href*=#]').on(
      'click',
      function(evt) {
        this.pageLinkFocus($(evt.currentTarget.hash));
      }.bind(this)
    );
  },

  /**
   * Traps the focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  trapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container;
    }

    options.$container.attr('tabindex', '-1');
    options.$elementToFocus.focus();

    $(document).on(eventName, function(evt) {
      if (
        options.$container[0] !== evt.target &&
        !options.$container.has(evt.target).length
      ) {
        options.$container.focus();
      }
    });
  },

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  removeTrapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (options.$container && options.$container.length) {
      options.$container.removeAttr('tabindex');
    }

    $(document).off(eventName);
  }
};

/**
 *  prepareTransition
 *  jQuery Plugin for ensuring transitions with display:none or visibility:hidden
 *  are in the right state until the end of the transition
 *
 *  Developed by Jonathan Snook (http://snook.ca/)
 *  January 12, 2012
 *
 *  Requires the following CSS:
 *  .is-transitioning {
 *      display: block !important;
 *      visibility: visible !important;
 *  }
 *
 *  MIT license
 *  http://www.opensource.org/licenses/mit-license.php
 */

$.fn.prepareTransition = function(){
  return this.each(function(){
    var el = $(this);
    // remove the transition class upon completion
    el.one('TransitionEnd webkitTransitionEnd transitionend oTransitionEnd', function(){
      el.removeClass('is-transitioning');
    });

    // check the various CSS properties to see if a duration has been set
    var cl = ["transition-duration", "-moz-transition-duration", "-webkit-transition-duration", "-o-transition-duration"];
    var duration = 0;
    $.each(cl, function(idx, itm){
      duration || (duration = parseFloat( el.css( itm ) ));
    });

    // if I have a duration then add the class
    if (duration != 0) {
      el.addClass('is-transitioning');
      el[0].offsetWidth; // check offsetWidth to force the style rendering
    }
  });
};

var selectors$5 = {
  passwordModal: '.password-modal',
  modalOpenButton: '.password__open-modal',
  modalCloseButton: '.password-modal__close',
  modalInput: '.password-modal__input'
};
var classes$5 = {
  passwordModalOpen: 'password-modal--open',
  disableScroll: 'disable-scroll'
};

templates.register('Password Template', 'password-template', {
  onLoad: function(container) {
    var $container = (this.$container = $(container));

    $(selectors$5.modalOpenButton, $container).on(
      'click',
      this.showPasswordModal.bind(this)
    );
    $(selectors$5.modalCloseButton, $container).on(
      'click',
      this.hidePasswordModal.bind(this)
    );

    if ($('.errors', $container).length) {
      this.showPasswordModal();
    }
  },

  showPasswordModal: function() {
    var $container = this.$container;
    var $modal = $(selectors$5.passwordModal, $container);

    a11y$1.trapFocus({
      $container: $modal,
      namespace: 'passwordModal',
      $elementToFocus: $(selectors$5.modalCloseButton, $container)
    });

    $modal.prepareTransition().addClass(classes$5.passwordModalOpen);

    $(selectors$5.modalOpenButton, $container).attr('aria-expanded', true);
    $(selectors$5.modalInput, $container).focus();
    $(document.documentElement).addClass(classes$5.disableScroll);
    $(document).on('keyup', this.closeOnEscape.bind(this));
  },

  hidePasswordModal: function() {
    var $container = this.$container;
    var $modal = $(selectors$5.passwordModal, $container);

    a11y$1.removeTrapFocus({ namespace: 'passwordModal' });

    $modal.prepareTransition().removeClass(classes$5.passwordModalOpen);

    $(document.documentElement).removeClass(classes$5.disableScroll);
    $(selectors$5.modalOpenButton, $container)
      .attr('aria-expanded', false)
      .focus();

    $(document).off('keyup', this.closeOnEscape.bind(this));
  },

  closeOnEscape: function(evt) {
    if (evt.keyCode === 27) {
      this.hidePasswordModal();
    }
  }
});

function Sections() {
  this.$document = $(document);
  this.namespace = '.section-js-events';

  document.addEventListener(
    'shopify:section:load',
    function(evt) {
      var id = evt.detail.sectionId;
      var container = evt.target.querySelector(
        '[data-section-id="' + id + '"]'
      );
      var type = container.getAttribute('data-section-type');

      this.load(type, container);
    }.bind(this)
  );
}

$.extend(Sections.prototype, {
  /**
   * Indexed list of all registered section types
   */
  registered: {},

  /**
   * List of all section instances
   */
  instances: [],

  /**
   * Indexed list of all registered global extensions
   */
  extensions: {
    '*': []
  },

  /**
   * Registers a section type with properties. Adds a new section constructor to
   * the registered list of sections.
   *
   * @param {string} type
   * @param {object} properties
   */
  register: function(type, properties) {
    function Section(data) {
      this.type = type;
      Master$1.call(this, data);
    }

    Section.constructor = this.registered[type];
    Section.prototype = Object.create(Master$1.prototype);
    $.extend(Section.prototype, properties);

    this.registered[type] = Section;
  },

  /**
   * Loads all or the specified section types
   */
  load: function(types, containers) {
    types = this._normalizeTypeParam(types);
    containers = this._normalizeContainersParam(containers);

    types.forEach(
      function(type) {
        var Section = this.registered[type];
        var selection = containers;

        if (typeof Section === 'undefined') {
          return;
        }

        if (typeof selection === 'undefined') {
          selection = document.querySelectorAll(
            '[data-section-type="' + type + '"]'
          );
        }

        // Convert selection NodeList into an array
        selection = Array.prototype.slice.call(selection);

        selection.forEach(
          function(container) {
            if (this._instanceExists(container)) {
              return;
            }

            var extensions = this.extensions['*'].concat(
              this.extensions[type] || []
            );
            var instance = new Section({
              container: container,
              extensions: extensions,
              id: container.getAttribute('data-section-id')
            });

            instance.trigger('section_load');

            this.instances.push(instance);
          }.bind(this)
        );
      }.bind(this)
    );
  },

  /**
   * Extend single, multiple, or all sections with additional functionality.
   */
  extend: function(types, extension) {
    types = this._normalizeTypeParam(types);

    types.forEach(
      function(type) {
        this.extensions[type] = this.extensions[type] || [];
        this.extensions[type].push(extension);

        if (typeof this.registered[type] === 'undefined') {
          return;
        }

        this.instances.forEach(function(instance) {
          if (instance.type !== type) {
            return;
          }
          instance.extend(extension);
        });
      }.bind(this)
    );
  },

  /**
   * Checks if a particular section type has been loaded on the page.
   */
  isInstance: function(type) {
    return typeof find(this.instances, { type: type }) === 'object';
  },

  /**
   * Returns all instances of a section type on the page.
   */
  getInstances: function(type) {
    return $.Deferred(
      function(defer) {
        var instances = filter(this.instances, { type: type });

        if (instances.length === 0) {
          defer.reject();
        } else {
          defer.resolve(instances);
        }
      }.bind(this)
    );
  },

  /**
   * Attaches an event handler to the document that is fired whenever any section
   * instance triggers an event of specified type. Automatically adds a namespace
   * for easy removal with `sections.off('event')`
   */
  on: function() {
    // Convert arguments object into an array
    var args = Array.prototype.slice.call(arguments);

    // Apply the section namespace to any event handler created by this section
    args[0] = args[0].concat(this.namespace);

    this.$document.on.apply(this.$document, args);
  },

  /**
   * Removes an event handler attached using `sections.on()`.
   */
  off: function() {
    // Convert arguments object into an array
    var args = Array.prototype.slice.call(arguments);

    // Apply the section namespace to any event handler created by this section
    args[0] = args[0].concat(this.namespace);

    this.$document.off.apply(this.$document, arguments);
  },

  /**
   * Triggers and event in every section instance
   */
  trigger: function() {
    var triggerArgs = arguments;
    this.instances.forEach(function(instance) {
      instance.trigger.apply(instance, triggerArgs);
    });
  },

  _sectionTrigger: function() {
    this.$document.trigger.apply(this.$document, arguments);
  },

  _normalizeTypeParam: function(types) {
    if (types === '*') {
      types = Object.keys(this.registered);
    } else if (typeof types === 'string') {
      types = [types];
    }

    types = types.map(function(type) {
      return type.toLowerCase();
    });

    return types;
  },

  _normalizeContainersParam: function(containers) {
    if (!Array.isArray(containers) && typeof containers === 'object') {
      // If a single container object is specified not inside a function
      containers = [containers];
    }
    return containers;
  },

  _instanceExists: function(container) {
    var instance = find(this.instances, {
      id: container.getAttribute('data-section-id')
    });
    return typeof instance !== 'undefined';
  }
});

var sections = new Sections();
/**
 * Master section class that all sections inherit from
 * @constructor
 *
 */
function Master$1(data) {
  this.container = data.container;
  this.$container = $(this.container);
  this.id = data.id;
  this.namespace = '.' + data.id;
  this.extensions = data.extensions || [];
  this.$eventBinder = this.$container;

  _applyExtensions.call(this);
  _applyEditorHandlers.call(this);
  _applyDefaultHandlers.call(this);
}

Master$1.prototype = {
  /* eslint-disable no-empty-function */
  onLoad: function() {},
  onUnload: function() {},
  onSelect: function() {},
  onDeselect: function() {},
  onBlockSelect: function() {},
  onBlockDeselect: function() {},

  /* eslint-enable no-empty-function */

  /**
   * Attaches an event handler to an instance of a section. Only listens to
   * events triggered by that section instance.
   */
  on: function() {
    // Convert arguments object into an array
    var args = Array.prototype.slice.call(arguments);

    // Apply the section namespace to any event handler created by this section
    args[0] = args[0].concat(this.namespace);

    this.$eventBinder.on.apply(this.$eventBinder, args);
    this.$eventBinder = this.$container;
  },

  /**
   * Attaches an event handler to an instance of a section that is removed after
   * being called once. Only listens to events triggered by that section instance.
   */
  one: function() {
    // Convert arguments object into an array
    var args = Array.prototype.slice.call(arguments);

    // Apply the section namespace to any event handler created by this section
    args[0] = args[0].concat(this.namespace);

    this.$eventBinder.one.apply(this.$eventBinder, args);
    this.$eventBinder = this.$container;
  },

  /**
   * Removes an event handler that was attached using the `this.on()` method
   */
  off: function() {
    // Convert arguments object into an array
    var args = Array.prototype.slice.call(arguments);

    // Apply the section namespace to any event handler created by this section
    args[0] = args[0] || '';
    args[0] = args[0].concat(this.namespace);

    this.$eventBinder.off.apply(this.$eventBinder, arguments);
    this.$eventBinder = this.$container;
  },

  /*
   * Triggers an event on both this section instance and the sections object so
   * so that any event handlers attached using `sections.on()` will be also
   * triggered.
   */
  trigger: function() {
    // Convert arguments object into an array
    var args = Array.prototype.slice.call(arguments);

    // Check what the second argument is. If there is already an array keep it.
    args[1] = args[1] || [];

    // Add the section instance as the first item in the array. This will force
    // it to be the first param in the .on() callback
    args[1].splice(0, 0, this);

    this.$eventBinder.trigger.apply(this.$eventBinder, args);
    this.$eventBinder = this.$container;
  },

  /**
   * Extends this section instance with additional functionality.
   */
  extend: function(extension) {
    var init = extension.init;
    this.extensions.push(extension);

    $.extend(this, omit(extension, 'init'));

    if ($.isFunction(init)) {
      init.apply(this);
    }
  }
};

/**
 * Shortcut methods that are automatically namespaced for easy removal, e.g.
 * $(document).on('event' + this.namespace);
 */
Master$1.prototype.document = function() {
  var $document = $(document);
  var self = this;
  return {
    on: function() {
      self.$eventBinder = $document;
      self.on.apply(self, arguments);
    },
    off: function() {
      self.$eventBinder = $document;
      self.off.apply(self, arguments);
    },
    trigger: function() {
      self.$eventBinder = $document;
      self.trigger.apply(self, arguments);
    }
  };
};

/**
 * Shortcut methods that are automatically namespaced for easy removal, e.g.
 * $(window).on('event' + this.namespace);
 */
Master$1.prototype.window = function() {
  var $window = $(window);
  var self = this;
  return {
    on: function() {
      self.$eventBinder = $window;
      self.on.apply(self, arguments);
    },
    off: function() {
      self.$eventBinder = $window;
      self.off.apply(self, arguments);
    },
    trigger: function() {
      self.$eventBinder = $window;
      self.trigger.apply(self, arguments);
    }
  };
};

function _applyExtensions() {
  this.extensions.forEach(
    function(extension) {
      this.extend(extension);
    }.bind(this)
  );
}

function _applyEditorHandlers() {
  $(document)
    .on('shopify:section:unload' + this.namespace, _onSectionUnload.bind(this))
    .on('shopify:section:select' + this.namespace, _onSelect.bind(this))
    .on('shopify:section:deselect' + this.namespace, _onDeselect.bind(this))
    .on('shopify:block:select' + this.namespace, _onBlockSelect.bind(this))
    .on('shopify:block:deselect' + this.namespace, _onBlockDeselect.bind(this));
}

function _applyDefaultHandlers() {
  this.on('section_load', this.onLoad.bind(this));
  this.on('section_unload', this.onUnload.bind(this));
  this.on('section_select', this.onSelect.bind(this));
  this.on('section_deselect', this.onDeselect.bind(this));
  this.on('block_select', this.onBlockSelect.bind(this));
  this.on('block_deselect', this.onBlockDeselect.bind(this));
}

function _onSectionUnload(event) {
  if (this.id !== event.detail.sectionId) return;

  event.type = 'section_unload';
  this.trigger(event);

  this.off(this.namespace);
  sections.off(this.namespace);
  $(document).off(this.namespace);
  $(window).off(this.namespace);

  remove(sections.instances, { id: this.id });
}

function _onSelect(event) {
  if (this.id !== event.detail.sectionId) return;

  event.type = 'section_select';
  this.trigger(event);
}

function _onDeselect(event) {
  if (this.id !== event.detail.sectionId) return;

  event.type = 'section_deselect';
  this.trigger(event);
}

function _onBlockSelect(event) {
  if (this.id !== event.detail.sectionId) return;

  event.type = 'block_select';
  this.trigger(event);
}

function _onBlockDeselect(event) {
  if (this.id !== event.detail.sectionId) return;

  event.type = 'block_deselect';
  this.trigger(event);
}

/*

Card Manager Extension
--------------------------------------------------------------------------------
Manages the drawer functionilty of the cart drawer section


Events
------------

Name: cards_load_start
Description: Fired before cards start to load
Payload: none

Name: card_loaded
Description: Fired each time a card is loaded onto the page
Payload: { object } Card DOM element

Name: cards_load_done
Description: Fired when all cards have loaded
Payload: none

*/

var classes$6 = {
  cardListSubLoaded: 'card-list__sub-actions--loaded',
  cardReveal: 'card--reveal',
  searchTemplate: 'template-search'
};

var selectors$6 = {
  cardList: '.card-list',
  cardListColumn: '.card-list__column',
  cardListSub: '.card-list__sub-actions',
  card: '.card',
  cardWrapper: '.card__wrapper',
  cardInfo: '.card__info'
};

var cardManager = {
  init: function() {
    this.$cardList = $(selectors$6.cardList, this.$container);
    this.$emptyColumn = $(selectors$6.cardListColumn, this.$container)
      .clone()
      .empty();
    this.$cards = $(selectors$6.card, this.$container);

    this.desktopColumnCount = this.$cardList.data('desktop-columns') || 2;
    this.mobileColumnCount = this.$cardList.data('mobile-columns') || 1;
    this.columnCount = utils.isMobile()
      ? this.mobileColumnCount
      : this.desktopColumnCount;
    this.gridStyle = this.$cardList.data('grid-style') || 'collage';
    this.windowWidth = $(window).outerWidth();
    this.cardLoadPromises = [];

    this.window().on('resize', this._onResize.bind(this));

    this.on('keydown', selectors$6.cardWrapper, this._onCardTabDown.bind(this));
    this.on('keyup', this._onCardTabUp.bind(this));

    utils.promiseStylesheet().then(
      function() {
        this.cardsLoaded = this._loadCards();

        $('html').removeClass('site-footer--hidden');

        $(selectors$6.cardListSub, this.$container)
          .prepareTransition()
          .addClass(classes$6.cardListSubLoaded);
      }.bind(this)
    );
  },

  _onResize: function() {
    var columnCount = utils.isMobile()
      ? this.mobileColumnCount
      : this.desktopColumnCount;

    // Only replace columns if the number of columns changes.
    if (this.columnCount !== columnCount) {
      this.columnCount = columnCount;
      this.$columns = this._replaceColumns();
    }

    $.each(
      this.$cards,
      function(index) {
        if (utils.isMobile()) {
          this.$columns.find(selectors$6.cardWrapper).removeAttr('style');
        } else if (this._isAlignedRow(index + 1)) {
          var rowNumber =
            (index - (index % this.desktopColumnCount)) /
              this.desktopColumnCount +
            1;
          this._matchRowHeights(this.$columns, rowNumber);
        }
      }.bind(this)
    );
  },

  _onCardTabDown: function(evt) {
    if (evt.keyCode !== 9) return; // Only continue if tab key is pressed

    var index = $(evt.target).data('tabindex');

    this.tabFromList = true;

    if (evt.shiftKey) {
      if (index > 1) {
        evt.preventDefault();
        $('[data-tabindex=' + (index - 1) + ']').focus();
      }
    } else {
      if (index === this.$cards.length) {
        $(selectors$6.cardWrapper, this.$container)
          .last()
          .focus();
      } else {
        evt.preventDefault();
        $('[data-tabindex=' + (index + 1) + ']').focus();
      }
    }
  },

  _onCardTabUp: function(evt) {
    if (evt.keyCode !== 9) return;

    var tabFromList = this.tabFromList || false;
    this.tabFromList = false;

    if (!evt.shiftKey || tabFromList) return;

    if (
      $(selectors$6.cardWrapper, this.$container)
        .last()
        .is(evt.target)
    ) {
      $('[data-tabindex=' + this.$cards.length + ']').focus();
    }
  },

  _loadCards: function() {
    this.trigger('cards_load_start');

    this.$columns = this._addColumns();

    return this._promiseAllCardsReveal().always(
      function() {
        this.trigger('cards_load_done');
      }.bind(this)
    );
  },

  _addColumns: function() {
    var $columns;
    for (var i = 1; i < this.columnCount; i++) {
      this.$cardList.append(this.$emptyColumn.clone());
    }

    $columns = $(selectors$6.cardListColumn, this.$container);
    $columns.heights = fill(Array(this.columnCount), 0);
    $columns.lengths = fill(Array(this.columnCount), 0);

    return $columns;
  },

  _replaceColumns: function() {
    var $columns = this.$emptyColumn.clone();

    $columns.heights = fill(Array(this.columnCount), 0);
    $columns.lengths = fill(Array(this.columnCount), 0);

    for (var i = 1; i < this.columnCount; i++) {
      $columns.push(this.$emptyColumn.clone()[0]);
    }

    $.each(
      this.$cards,
      function(index, card) {
        this._positionCard($(card), index, $columns);
      }.bind(this)
    );

    this.$cardList.html($columns);

    return $columns;
  },

  _promiseAllCardsReveal: function() {
    var series = $.Deferred().resolve();

    this.$cards.each(
      function(index, card) {
        // Position the card in one of the available columns
        this._positionCard($(card), index, this.$columns);

        // Check that we have an aligned row and isMobile is false
        if (!utils.isMobile() && this._isAlignedRow(index + 1)) {
          var rowNumber = this.$columns.lengths[0];
          this._matchRowHeights(this.$columns, rowNumber);
        }

        // We want to check immediately if the card should be revealed, not after
        // a previous `.then()` in our series has been fulfilled.
        var promiseRevealReady = this._promiseRevealReady(card);

        // Add the following steps to our series of promises for each card:
        // 1. Promise the card is ready to be revealed
        // 2. Reveal the card
        // 3. Delay 80ms
        series = series
          .then(function() {
            return promiseRevealReady;
          })
          .then(this._revealCard.bind(this, card))
          .then(function() {
            return $.Deferred(function(defer) {
              setTimeout(defer.resolve, 80);
            });
          });
      }.bind(this)
    );
    return series;
  },

  _revealCard: function(card) {
    var $card = $(card);

    this.trigger('card_loaded', [$card[0]]);

    requestAnimationFrame($card.addClass.bind($card, classes$6.cardReveal));
  },

  // A promise that will be fulfilled when a card is ready to be revealed
  _promiseRevealReady: function(card) {
    return $.Deferred(function(defer) {
      var $card = $(card);

      if (!($('html').hasClass('is-ios') && Shopify.designMode)) {
        // If we already triggered the animation, then resolve the promise to show
        // the card. Wrap the position check in requestAnimationFrame to make sure
        // that the browser is done positioning the element before it reads its
        // position.
        requestAnimationFrame(function() {
          if (utils.isInOrAboveViewport(card)) {
            return defer.resolve();
          }
        });

        // If we haven't triggered the animation, then wait for the animation
        // event for this card and then resolve the promise to show the card.
        $card.on('animate_element', onAnimate);

        function onAnimate(evt, element) {
          if (element !== card) return;

          $card.off('animate_element', onAnimate);
          defer.resolve();
        }
      } else {
        $(card).addClass(classes$6.cardReveal);
        defer.resolve();
      }
    });
  },

  _positionCard: function($card, index, $columns) {
    var columnIndex = 0;
    var cardHeight = $card.outerHeight(true);

    if (this.gridStyle === 'collage') {
      columnIndex = $columns.heights.indexOf(
        Math.min.apply(Math, $columns.heights)
      ); // Default to shortest column
      var threshold = 150;
      for (var i = 0; i < $columns.heights.length; i++) {
        if ($columns.heights[columnIndex] > $columns.heights[i] - threshold) {
          columnIndex = i;
          break;
        }
      }
    } else {
      columnIndex = $columns.lengths.indexOf(
        Math.min.apply(Math, $columns.lengths)
      );
    }

    $columns.eq(columnIndex).append($card);

    // Restore the height if it is 0 (needed for matching heights in the
    // 'aligned' grid)
    if ($card.outerHeight() === 0 && !utils.isMobile()) {
      $card.find(selectors$6.cardWrapper).outerHeight(cardHeight);
    }

    if (this.gridStyle === 'collage') {
      $columns.heights[columnIndex] += cardHeight;
    }
    $columns.lengths[columnIndex]++;

    $card.find('a').attr('data-tabindex', index + 1);
  },

  _matchRowHeights: function($columns, rowNumber) {
    var maxHeight = 0;
    var currentCardHeight = 0;
    var rowSelector = '';
    var isArticle = false;

    // Construct the selector for the cards in the current row
    for (var i = 0; i < $columns.length; i++) {
      rowSelector +=
        "[data-tabindex='" + ((rowNumber - 1) * $columns.length + i + 1) + "']";
      if (i < $columns.length - 1) {
        rowSelector += ', ';
      }
    }
    var $row = $columns.find(rowSelector).parent();

    for (var j = 0; j < $row.length; j++) {
      isArticle = $($row[j])
        .find(selectors$6.cardWrapper)
        .is('.card--article');

      currentCardHeight = $($row[j])
        .find(selectors$6.cardWrapper)
        .outerWidth();
      if ($(document.body).hasClass(classes$6.searchTemplate) && isArticle) {
        currentCardHeight = $($row[j])
          .find(selectors$6.cardWrapper)
          .outerHeight();
      } else {
        currentCardHeight =
          $($row[j])
            .find(selectors$6.cardWrapper)
            .outerWidth() +
          $($row[j])
            .find(selectors$6.cardInfo)
            .outerHeight();
      }

      if (currentCardHeight > maxHeight) {
        maxHeight = currentCardHeight;
      }
    }

    $row.find(selectors$6.cardWrapper).outerHeight(maxHeight);
  },

  _isAlignedRow: function(index) {
    // Check if the gridStyle is 'grid', and if we are at the end of a row or
    // at the last card
    return (
      this.gridStyle === 'grid' &&
      (index % this.desktopColumnCount === 0 || index === this.$cards.length)
    );
  }
};

/*

Blog Template Section
--------------------------------------------------------------------------------
Creates a staggered card grid for the blog template.

*/

// Extensions
// Libs
sections.register('blog-template', {
  onLoad: function() {
    this.extend(cardManager);
  }
});

var cart = {
  isUpdating: false,

  getCart: function() {
    return $.getJSON('/cart.js');
  },

  on: function(event, cb) {
    $(this).on(event, cb);
  },

  trigger: function(event, data) {
    $(this).triggerHandler(event, data);
  },

  updateNote: function(note) {
    return this._promiseChange({
      url: '/cart/update.js',
      dataType: 'json',
      data: {
        note: note || ''
      }
    });
  },

  addItem: function(id, quantity) {
    return this._promiseChange({
      url: '/cart/add.js',
      dataType: 'json',
      data: {
        id: id,
        quantity: typeof quantity === 'undefined' ? 1 : quantity
      }
    });
  },

  addItemFromForm: function(data) {
    return this._promiseChange({
      url: '/cart/add.js',
      dataType: 'json',
      processData: false,
      contentType: false,
      type: 'POST',
      data: data
    });
  },

  removeItem: function(id) {
    return this._promiseChange({
      url: '/cart/change.js',
      dataType: 'json',
      data: {
        id: id,
        quantity: 0
      }
    });
  },

  changeItem: function(id, quantity) {
    return this._promiseChange({
      url: '/cart/change.js',
      dataType: 'json',
      data: {
        id: id,
        quantity: quantity
      }
    });
  },

  saveLocalState: function(state) {
    if (utils.isLocalStorageSupported()) {
      localStorage.shopify_cart_state = JSON.stringify(state); // eslint-disable-line camelcase
    }

    return state;
  },

  getLocalState: function() {
    // eslint-disable-line consistent-return
    if (utils.isLocalStorageSupported()) {
      return JSON.parse(localStorage.shopify_cart_state || '');
    }
  },

  _promiseChange: function(parameters) {
    var promiseRequest = $.ajax(parameters);

    this.isUpdating = true;

    // If offline, provide a rejected promise so that an error is thrown.
    if (navigator && !theme.isOnline) {
      promiseRequest = $.Deferred().reject();
    }

    return (
      promiseRequest
        // Some cart API requests don't return the cart object. If there is no
        // cart object then get one before proceeding.
        .then(
          function(state) {
            if (typeof state.token === 'undefined') {
              return this.getCart();
            } else {
              return state;
            }
          }.bind(this)
        )
        .then(this.saveLocalState)
        .then(this._triggerChangeEvent.bind(this))
        .catch(this._triggerErrorEvent.bind(this))
        .always(
          function() {
            this.isUpdating = false;
          }.bind(this)
        )
    );
  },

  _triggerChangeEvent: function(state) {
    this.trigger('change', state);
    return state;
  },

  _triggerErrorEvent: function(error) {
    this.trigger('error', error);

    // We want to throw an error event, but also let any future 'catch' down
    // the promise chain to catch this error, so we re-throw the error.
    throw error;
  }
};

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 * Alternatives
 * - Accounting.js - http://openexchangerates.github.io/accounting.js/
 *
 */

var moneyFormat = '${{amount}}'; // eslint-disable-line camelcase

var currency = {
  formatMoney: function(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || moneyFormat;

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultTo(precision, 2);
      thousands = defaultTo(thousands, ',');
      decimal = defaultTo(decimal, '.');

      if (isNaN(number) || number === null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1' + thousands
      );
      var centsAmount = parts[1] ? decimal + parts[1] : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
      case 'amount_with_apostrophe_separator':
        value = formatWithDelimiters(cents, 2, "'");
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }
};

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

var images = {
  /**
   * Preloads an image in memory and uses the browsers cache to store it until needed.
   *
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute
   */

  preload: function(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i];

      this.loadImage(this.getSizedImageUrl(image, size));
    }
  },

  /**
   * Loads and caches an image in the browsers cache.
   * @param {string} path - An image url
   */
  loadImage: function(path) {
    new Image().src = path;
  },

  /**
   * Swaps the src of an image for another OR returns the imageURL to the callback function
   * @param image
   * @param element
   * @param callback
   */
  switchImage: function(image, element, callback) {
    var size = this.imageSize(element.src);
    var imageUrl = this.getSizedImageUrl(image.src, size);

    if (callback) {
      callback(imageUrl, image, element); // eslint-disable-line callback-return
    } else {
      element.src = imageUrl;
    }
  },

  /**
   * +++ Useful
   * Find the Shopify image attribute size
   *
   * @param {string} src
   * @returns {null}
   */
  imageSize: function(src) {
    src = src || '';

    var match = src.match(
      /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\\.@]/
    );

    if (match !== null) {
      return match[1];
    }

    return null;
  },

  /**
   * +++ Useful
   * Adds a Shopify size attribute to a URL
   *
   * @param src
   * @param size
   * @returns {*}
   */
  getSizedImageUrl: function(src, size) {
    if (size === null) {
      return src;
    }

    if (size === 'master') {
      return this.removeProtocol(src);
    }

    var match = src.match(
      /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
    );

    if (match !== null) {
      var prefix = src.split(match[0]);
      var suffix = match[0];

      return this.removeProtocol(prefix[0] + '_' + size + suffix);
    }

    return null;
  },

  removeProtocol: function(path) {
    return path.replace(/http(s)?:/, '');
  }
};

/*

Ajax Cart Extension
--------------------------------------------------------------------------------
Manages the AJAX powered cart functionality


Events
------------

Name: cart_update_start
Description: Fired before the cart DOM updates
Payload: { object } Cart state object

Name: cart_update_done
Description: Fired after the cart DOM updates
Payload: { object } Cart state object

Name: cart_error
Description: Fired when there is an with the last cart request
Payload: { object } Error object

Name: cart_item_quantity_error
Description: Fired when there is problem with the requested item quanitity
Payload: { object } Item with valid quantity

Name: cart_storage_state_change
Description: Fired when the cart state changes in another active tab
Payload: { object } Cart state object

Name: cart_item_quantity_change
Description: Fired when the user selects a new quantity in the item input
Payload: { string } Item ID
Payload: { number } Quantity

Name: cart_item_remove
Description: Fired when the user selects to remove an item
Payload: { string } Item ID

Name: cart_note_change
Description: Fired when the user changes the value in the note textarea
Payload: { string } Note value

Name: cart_submit
Description: Fired when the user submits the cart form and proceeds to the checkout
Payload: none

*/

var data = {
  itemId: 'data-cart-item-id'
};

var selectors$8 = {
  ajaxCart: '.cart-drawer',
  itemList: '[data-cart-item-list]',
  item: '[data-cart-item]',
  itemId: '[data-cart-item-id]',
  itemHref: '[data-cart-item-href]',
  itemImage: '[data-cart-item-image]',
  itemBackgroundImage: '[data-cart-item-background-image]',
  itemTitle: '[data-cart-item-title]',
  itemVariantTitle: '[data-cart-item-variant-title]',
  itemPropertyList: '[data-cart-item-property-list]',
  itemProperty: '[data-cart-item-property]',
  itemDiscountList: '[data-cart-item-discount-list]',
  itemDiscount: '[data-cart-item-discount]',
  itemDiscountTitle: '[data-cart-item-discount-title]',
  itemDiscountAmount: '[data-cart-item-discount-amount]',
  itemLabelQuantity: '[data-cart-item-label-quantity]',
  itemInputQuantity: '[data-cart-item-input-quantity]',
  itemDelete: '[data-cart-item-delete]',
  itemPriceContainer: '[data-cart-item-price-container]',
  itemLinePriceContainer: '[data-cart-item-line-price-container]',
  itemMessage: '[data-item-message]',
  cartDiscountContainer: '[data-cart-discount-container]',
  cartDiscount: '[data-cart-discount]',
  cartDiscountTitle: '[data-cart-discount-title]',
  cartDiscountAmount: '[data-cart-discount-amount]',
  cartNoteContainer: '[data-cart-note-container]',
  cartNoteInput: '[data-cart-note]',
  cartMessage: '[data-cart-message]',
  cartSubtotal: '[data-cart-subtotal]',
  cartSubmit: '[data-cart-submit]'
};

var classes$8 = {
  cartTemplate: 'ajax-cart__template',
  cartItemRemove: 'ajax-cart__item--remove',
  cartError: 'ajax-cart--error',
  visuallyHidden: 'visually-hidden',
  cartDiscountActive: 'ajax-cart__discount-container--active',
  btnLoaderActive: 'btn--loader-active'
};

var ajaxCart = {
  init: function() {
    this.$ajaxCart = $(selectors$8.ajaxCart, this.$container);
    this.$itemTemplate = $(selectors$8.item, this.$container)
      .first()
      .clone();
    this.$propertyTemplate = $(selectors$8.itemProperty, this.$container)
      .first()
      .clone();
    this.$discountTemplate = $(selectors$8.itemDiscount, this.$container)
      .first()
      .clone();
    this.$cartDiscountTemplate = $(selectors$8.cartDiscount, this.$container)
      .first()
      .clone();

    cart.on('quantity', this._onQuantityError.bind(this));
    cart.on(
      'change',
      function(event, state) {
        this.update(state);
      }.bind(this)
    );

    this.on(
      'input',
      selectors$8.itemInputQuantity,
      debounce(this._onItemQuantityChange.bind(this), 500)
    );
    this.on(
      'blur',
      selectors$8.itemInputQuantity,
      this._onItemQuantityEmptyBlur.bind(this)
    );
    this.on('focus', selectors$8.itemInputQuantity, this._highlightText);
    this.on('click', selectors$8.itemDelete, this._onItemDelete.bind(this));
    this.on('change', selectors$8.cartNoteInput, this._onNoteChange.bind(this));
    this.on('submit', this._onSubmit.bind(this));

    this.window().on('storage', this._onStorageStateChange.bind(this));
  },

  refresh: function() {
    cart.getCart().then(this.update.bind(this));
  },

  update: function(state) {
    this.trigger('cart_update_start', [state]);

    var $cart = this._createCart(state);
    morphdom(this.$container[0], $cart[0]);

    this.trigger('cart_update_done', [state]);
  },

  _onError: function(error) {
    this.trigger('cart_error', [error]);

    this.$container.addClass(classes$8.cartError);

    $(selectors$8.item, this.$container).removeClass(classes$8.cartItemRemove);
    $(selectors$8.cartMessage, this.$container).text(theme.strings.cartError);
  },

  _onQuantityError: function(event, item) {
    this.trigger('cart_item_quantity_error', [item]);

    this.$container.addClass(classes$8.cartError);

    var quantityError = theme.strings.cartQuantityError
      .replace('[quantity]', item.quantity)
      .replace('[title]', item.title);

    var $itemMessageElement = $(
      selectors$8.itemMessage,
      $('[' + data.itemId + '="' + item.key + '"]')
    );

    $itemMessageElement.removeAttr('aria-hidden');
    $itemMessageElement.html(quantityError);
  },

  _createCart: function(state) {
    var $container = this.$container.clone();

    $container.removeClass(classes$8.cartError);
    $(selectors$8.cartMessage, $container).text('');

    $(selectors$8.item, $container)
      .not(selectors$8.cartNoteContainer)
      .remove();

    $(selectors$8.itemList, $container).prepend(this._createItemList(state));

    $(selectors$8.cartNoteInput, $container).val(state.note);

    $(selectors$8.cartDiscountContainer, $container).toggleClass(
      classes$8.cartDiscountActive,
      state.total_discount !== 0
    );

    $(selectors$8.cartDiscountContainer, $container).html(
      this._createCartDiscountList(state)
    );

    $(selectors$8.cartSubtotal, $container).html(
      currency.formatMoney(state.total_price, theme.moneyFormat)
    );

    $(selectors$8.cartSubmit, $container).attr(
      'disabled',
      state.items.length === 0
    );

    return $container;
  },

  _createItemList: function(state) {
    return $.map(
      state.items,
      function(item) {
        var $item = this.$itemTemplate
          .clone()
          .removeClass(classes$8.cartTemplate);
        var propertyList = this._createPropertyList(item);
        var discountList = this._createDiscountList(item);
        var itemPrice = this._createItemPrice(item);
        var itemLinePrice = this._createItemTotalPrice(item);

        $item
          .find(selectors$8.itemId)
          .addBack(selectors$8.itemId)
          .attr(data.itemId, item.key);

        $(selectors$8.itemHref, $item).attr('href', item.url);

        $(selectors$8.itemImage, $item)
          .attr(
            'src',
            item.image ? images.getSizedImageUrl(item.image, 'medium') : ''
          )
          .toggleClass('hide', typeof item.image !== 'string');

        $(selectors$8.itemBackgroundImage, $item).css(
          'background-image',
          item.image
            ? 'url(' + images.getSizedImageUrl(item.image, 'medium') + ')'
            : 'none'
        );

        $(selectors$8.itemTitle, $item).text(item.product_title);

        $(selectors$8.itemVariantTitle, $item).text(item.variant_title);

        $(selectors$8.itemPriceContainer, $item).html(itemPrice);

        $(selectors$8.itemLinePriceContainer, $item).html(itemLinePrice);

        $(selectors$8.itemLabelQuantity, $item).attr(
          'for',
          'quantity_' + item.key
        );

        $(selectors$8.itemInputQuantity, $item)
          .attr('name', 'updates[' + item.key + ']')
          .attr('id', 'quantity_' + item.key)
          .val(item.quantity);

        $(selectors$8.itemPropertyList, $item).html(propertyList);

        $(selectors$8.itemDiscountList, $item).html(discountList);

        return $item[0];
      }.bind(this)
    );
  },

  _createItemPrice: function(item) {
    var itemPrice = '';

    itemPrice += this._createItemProductPrice(
      item.original_price,
      item.final_price
    );

    if (item.unit_price_measurement) {
      itemPrice += this._createItemUnitPrice(item);
    }

    return itemPrice;
  },

  _createItemTotalPrice: function(item) {
    var itemPrice = '';

    itemPrice += this._createItemProductPrice(
      item.original_line_price,
      item.final_line_price
    );

    return itemPrice;
  },

  _createItemProductPrice: function(original_price, final_price) {
    var itemPrice = '';

    if (original_price !== final_price) {
      itemPrice +=
        '<span class="visually-hidden">' +
        theme.strings.regularPrice +
        '</span>' +
        '<del class="cart-item__original-price">' +
        currency.formatMoney(original_price, theme.moneyFormat) +
        '</del>' +
        '<span class="visually-hidden">' +
        theme.strings.salePrice +
        '</span>' +
        '<span class="order-discount cart-item__price">' +
        currency.formatMoney(final_price, theme.moneyFormat) +
        '</span>';
    } else {
      itemPrice +=
        '<span class="cart-item__original-price cart-item__price">' +
        currency.formatMoney(original_price, theme.moneyFormat) +
        '</span>';
    }

    return itemPrice;
  },

  _createItemUnitPrice: function(item) {
    return (
      '<span class="product-price-unit">' +
      '<span class="visually-hidden">' +
      theme.strings.unitPrice +
      '</span>' +
      '<span>' +
      currency.formatMoney(item.unit_price, theme.moneyFormat) +
      '</span>' +
      '<span aria-hidden="true">/</span>' +
      '<span class="visually-hidden">&nbsp;' +
      theme.strings.unitPriceSeparator +
      '&nbsp;</span>' +
      '<span>' +
      (item.unit_price_measurement.reference_value !== 1
        ? item.unit_price_measurement.reference_value
        : '') +
      item.unit_price_measurement.reference_unit +
      '</span>' +
      '</span>'
    );
  },

  _createPropertyList: function(item) {
    return $.map(
      item.properties,
      function(value, key) {
        var $property = this.$propertyTemplate
          .clone()
          .removeClass(classes$8.cartTemplate);

        // Line item properties prefixed with an underscore are not to be displayed
        if (key.charAt(0) === '_') return;

        // Line item properties with no value are not to be displayed
        if (value === '') return;

        if (value.indexOf('/uploads/') === -1) {
          $property.text(key + ': ' + value);
        } else {
          $property.html(
            key + ': <a href="' + value + '">' + value.split('/').pop() + '</a>'
          );
        }

        return $property[0];
      }.bind(this)
    );
  },

  _createDiscountList: function(item) {
    return $.map(
      item.line_level_discount_allocations,
      function(discount) {
        var $discount = this.$discountTemplate
          .clone()
          .removeClass(classes$8.cartTemplate);
        $discount
          .find(selectors$8.itemDiscountTitle)
          .text(discount.discount_application.title);
        $discount
          .find(selectors$8.itemDiscountAmount)
          .html(currency.formatMoney(discount.amount, theme.moneyFormat));
        return $discount[0];
      }.bind(this)
    );
  },

  _createCartDiscountList: function(cart$$1) {
    return $.map(
      cart$$1.cart_level_discount_applications,
      function(discount) {
        var $discount = this.$cartDiscountTemplate
          .clone()
          .removeClass(classes$8.cartTemplate);
        $discount.find(selectors$8.cartDiscountTitle).text(discount.title);
        $discount
          .find(selectors$8.cartDiscountAmount)
          .html(
            currency.formatMoney(
              discount.total_allocated_amount,
              theme.moneyFormat
            )
          );
        return $discount[0];
      }.bind(this)
    );
  },

  _onStorageStateChange: function(evt) {
    if (evt.key !== 'shopify_cart_state') return;

    var state = cart.getLocalState();

    this.trigger('cart_storage_state_change', [state]);
    this.update(cart.getLocalState());
  },

  _onItemQuantityChange: function(evt) {
    var $input = $(evt.target);
    var id = $input.closest(selectors$8.item).attr(data.itemId);
    var quantity = $input.val();

    // Don't update the cart when a input is empty. Also make sure an input
    // does not remain empty by checking blur event.
    if (quantity === '') return;

    this.trigger('cart_item_quantity_change', [id, quantity]);

    cart.changeItem(id, quantity).catch(this._onError.bind(this));
  },

  _onItemQuantityEmptyBlur: function(evt) {
    var $input = $(evt.target);
    var value = $input.val();

    if (value !== '') return;

    this.refresh();
  },

  _onItemDelete: function(evt) {
    evt.preventDefault();

    var $deleteButton = $(evt.target);
    var $items = $(selectors$8.item, this.$container);
    var $item = $deleteButton.closest(selectors$8.item);
    var $note = $(selectors$8.cartNoteContainer, this.$container);
    var id = $item.attr(data.itemId);

    this.trigger('cart_item_remove', [id]);

    if ($items.length === 2 && $items.last().is($note)) {
      $note.addClass(classes$8.cartItemRemove);

      utils
        .promiseTransitionEnd($(selectors$8.itemList, this.$container))
        .then(function() {
          $note.removeClass(classes$8.cartItemRemove);
        });
    }

    $item.addClass(classes$8.cartItemRemove);

    utils.promiseAnimationEnd($item).then(
      function() {
        cart.removeItem(id).catch(this._onError.bind(this));
      }.bind(this)
    );
  },

  _onNoteChange: function(evt) {
    var value = $(evt.target).val();

    this.trigger('cart_note_change', [value]);

    cart.updateNote(value).catch(this._onError.bind(this));
  },

  _onSubmit: function(evt) {
    if (cart.isUpdating) {
      evt.preventDefault();
    } else {
      $(selectors$8.cartSubmit, this.$container).addClass(
        classes$8.btnLoaderActive
      );
      this.trigger('cart_submit');
    }
  },

  _highlightText: function(evt) {
    $(evt.target).select();
  }
};

/*

Cart Drawer Extension
--------------------------------------------------------------------------------
Manages the drawer functionality of the cart drawer section


Events
------------

Name: drawer_open_start
Description: Fired before the cart drawer starts to open
Payload: none

Name: drawer_open_transitioning
Description: Fired while the cart drawer is transitioning open
Payload: none

Name: drawer_open_done
Description: Fired while the cart drawer is done transitioning open
Payload: none

Name: drawer_close_start
Description: Fired before the cart drawer starts to close
Payload: none

Name: drawer_close_transitioning
Description: Fired while the cart drawer is transitioning close
Payload: none

Name: drawer_close_done
Description: Fired while the cart drawer is done transitioning close
Payload: none

Name: drawer_dragging
Description: Fired while the cart drawer is being dragged closed by the user
Payload: { object } Coordinates

*/

var classes$9 = {
  drawerActive: 'drawer--active',
  disableScroll: 'disable-scroll'
};

var selectors$9 = {
  drawerPush: '[data-drawer-push]',
  drawerCover: '.drawer-cover',
  mainContent: '.main-content',
  siteHeader: '.site-header'
};

var drawer = {
  init: function() {
    // Used to keep track of which button toggled the drawer so we can return
    // focus to it when the drawer closes.
    this.$toggleButton = null;
    this.draggingAction = null;
    this.namespaceTouch = '.onTouchStart';
    this.namespaceOpen = '.onOpen';

    // Drawer width might change when resizing the window. Make sure that we have
    // the right drawer width to translate the page with.
    this.document().on('resize', this._onWindowResize.bind(this));
  },

  drawerOpen: function(evt) {
    this.trigger('drawer_open_start');

    a11y$1.trapFocus({
      $container: this.$container,
      namespace: 'drawer'
    });

    // If this function is used as an event handler, e.g. a click event on a
    // button to open the drawer, than make sure to set whatever element that
    // triggered the event to aria-expanded = true
    if (evt && evt.currentTarget) {
      this.$toggleButton = $(evt.target).attr('aria-expanded', true);
    }

    utils.disableScrollBody();

    $('body').addClass(classes$9.drawerActive);
    this.trigger('drawer_open_transitioning');

    utils.promiseTransitionEnd(this.$container).then(
      function() {
        utils.enableTabbingOfChildren(this.$container);
        this.$container.attr('aria-hidden', false);

        this.document().on(
          'click touchend' + this.namespaceOpen,
          selectors$9.drawerCover,
          this.drawerClose.bind(this)
        );
        this.document().on(
          'keyup' + this.namespaceOpen,
          this._closeOnEscape.bind(this)
        );
        this.document().on(
          'touchstart' + this.namespaceOpen,
          this._onTouchStart.bind(this)
        );

        this.trigger('drawer_open_done');
      }.bind(this)
    );
  },

  drawerClose: function() {
    this.trigger('drawer_close_start');

    a11y$1.removeTrapFocus({ namespace: 'drawer' });

    // If we detected a toggle button on open and set one, then let's return the
    // focus to it and then remove our saved reference to it.
    if (this.$toggleButton && this.$toggleButton.length) {
      this.$toggleButton.focus().attr('aria-expanded', false);
      this.$toggleButton = null;
    }

    utils.enableScrollBody();
    utils.disableTabbingOfChildren(this.$container);
    this.$container.attr('aria-hidden', true);

    this.document().off(this.namespaceOpen);

    $('body').removeClass(classes$9.drawerActive);
    this.trigger('drawer_close_transitioning');

    utils.promiseTransitionEnd(this.$container).then(
      function() {
        this.trigger('drawer_close_done');
      }.bind(this)
    );
  },

  _onWindowResize: function() {
    // Reset in case width changes on resize. Used for determining how much we
    // want to translate the page to the side. Translating === sliderWidth.
    this.sliderWidth = 0;
  },

  _onTouchStart: function(event) {
    this.startPosition = utils.pointerEventToXY(event);
    this.$elementsToPush = this.$elementsToPush || $(selectors$9.drawerPush); // eslint-disable-line shopify/jquery-dollar-sign-reference
    this.sliderWidth = this.sliderWidth || this.$container.width();
    this.isDragging = false;

    this.document().on(
      'touchmove' + this.namespaceTouch,
      this._onTouchMove.bind(this)
    );
    this.document().on(
      'touchend' + this.namespaceTouch,
      this._onTouchEnd.bind(this)
    );
  },

  _onTouchMove: function(event) {
    var dx;
    var dy;
    var deg;
    var transform;

    this.isDragging = true;
    this.currentPosition = utils.pointerEventToXY(event);
    this.trigger('drawer_dragging', [this.currentPosition]);

    dx = this.currentPosition.x - this.startPosition.x;
    dy = this.currentPosition.y - this.startPosition.y;
    deg = Math.atan2(dx, dy) / (Math.PI / 180);
    this.translated = dx > 0 ? dx : 0;

    if (
      Math.abs(deg) > 65 &&
      Math.abs(deg) < 115 &&
      this.draggingAction === null
    ) {
      this.draggingAction = 'slide';
    } else if (
      (Math.abs(deg) < 65 || Math.abs(deg) > 115) &&
      this.draggingAction === null
    ) {
      this.draggingAction = 'scroll';
    }

    if (this.draggingAction === 'slide') {
      event.preventDefault();

      transform = {
        transform:
          'translateX(-' + (this.sliderWidth - this.translated) + 'px)',
        transition: 'none'
      };

      this.$elementsToPush.css(transform);
    }
  },

  _onTouchEnd: function() {
    var percentMoved;

    this.wasDragging = this.isDragging;
    this.isDragging = false;

    if (this.wasDragging) {
      percentMoved = this.translated / this.sliderWidth;
      if (percentMoved > 0.25 && this.draggingAction === 'slide') {
        this.drawerClose('ease-out');
        this.trigger('drawer_dragging_success');
      } else {
        this.trigger('drawer_dragging_fail');
      }

      this.$elementsToPush.removeAttr('style');
    }

    this.draggingAction = null;

    this.document().off(this.namespaceTouch);
  },

  _closeOnEscape: function(evt) {
    if (evt.keyCode === 27) {
      this.drawerClose();
    }
  }
};

/*

Cart Drawer Section
--------------------------------------------------------------------------------
Creates a page drawer with AJAX cart functionilty

*/

// Extensions
// Libs
var selectors$7 = {
  drawer: '.drawer',
  cartHeader: '.cart-drawer__header',
  cartTitle: '.cart-drawer__header-title',
  cartContent: '.cart-drawer__content',
  cartToggle: '.ajax-cart__toggle',
  cartCloseButton: '.cart-drawer__close-button',
  siteHeader: '.site-header'
};

var classes$7 = {
  cartTemplate: 'template-cart',
  cartEmpty: 'cart-drawer--empty',
  cartNoCookies: 'cart-drawer--no-cookies'
};

sections.register('cart-drawer', {
  onLoad: function() {
    if ($(document.body).hasClass(classes$7.cartTemplate)) return;

    // Setup the drawer functionality
    this.extend(drawer);
    this._setDrawerHeaderHeight();
    this.on('drawer_close_done', this._onDrawerClose.bind(this));
    this.document().on(
      'click',
      selectors$7.cartToggle,
      this._openCartDrawer.bind(this)
    );

    // If cookies are disabled, then add a class which shows a warning and don't
    // continue any further. We don't want the AJAX Cart functionality.
    if (!utils.cookiesEnabled()) {
      this.$container.addClass(classes$7.cartNoCookies);
      return;
    }

    this.extend(ajaxCart);
    cart.on(
      'change',
      function(event, state) {
        this.$ajaxCart.toggleClass(classes$7.cartEmpty, state.items.length === 0);
      }.bind(this)
    );
  },

  onSelect: function() {
    this._openCartDrawer();
  },

  onDeselect: function() {
    this._closeCartDrawer();
  },

  _onDrawerClose: function() {
    sections.getInstances('header-section').then(function(instances) {
      instances[0].scrollHandler = true;
    });
  },

  _setDrawerHeaderHeight: function() {
    var $cartHeader = $(selectors$7.cartHeader, this.$container);
    var siteHeaderHeight = $(selectors$7.siteHeader).outerHeight();

    $cartHeader.css('height', siteHeaderHeight);
  },

  _openCartDrawer: function(evt) {
    evt.preventDefault();

    sections
      .getInstances('header-section')
      .then(function(instances) {
        instances[0].scrollHandler = false;
        return instances[0].hideNavigation();
      })
      .then(
        function() {
          this.drawerOpen(evt);

          $(selectors$7.cartContent, this.$container).scrollTop(0);

          a11y$1.forceFocus($(selectors$7.cartTitle, this.$container));

          this.$container.on(
            'click',
            selectors$7.cartCloseButton,
            this._closeCartDrawer.bind(this)
          );
        }.bind(this)
      );
  },

  _closeCartDrawer: function() {
    this.drawerClose();
  }
});

/*

Cart Template Section
--------------------------------------------------------------------------------
Adds ajax cart functionality to the cart template

*/

// Extensions
// Libs
var classes$10 = {
  showClass: 'cart-item__update--show',
  showEditClass: 'cart-item__edit--active',
  cartEmpty: 'cart--empty',
  cartNoCookies: 'cart--no-cookies'
};

sections.register('cart-template', {
  onLoad: function() {
    var $container = $(this.container);

    if (!utils.cookiesEnabled()) {
      $container.addClass(classes$10.cartNoCookies);
      return;
    }

    this.extend(ajaxCart);

    cart.on('change', function(event, state) {
      $container.toggleClass(classes$10.cartEmpty, state.items.length === 0);
    });
  }
});

/*

Collection Template Section
--------------------------------------------------------------------------------
Creates a staggered card grid for the collection template. Manages filters.

*/

// Extensions
// Libs
var selectors$10 = {
  filterBy: '#FilterBy',
  sortBy: '#SortBy',
  collectionImage: '.section-header-image'
};
var defaultSort = 'title-ascending';
var queryParams = {};

sections.register('collection-template', {
  onLoad: function() {
    var $container = (this.$container = $(this.container));
    var $filterBy = $(selectors$10.filterBy, $container);
    var $sortBy = $(selectors$10.sortBy, $container);

    this.defaultSort = this.getDefaultSortValue();
    this.extend(cardManager);
    this.initParams();

    $filterBy.on('change', this.onFilterChange.bind(this));
    $sortBy.on('change', this.onSortChange.bind(this));
  },

  initParams: function() {
    if (!location.search.length) return;

    var aKeyValue;
    var aCouples = location.search.substr(1).split('&');

    for (var i = 0; i < aCouples.length; i++) {
      aKeyValue = aCouples[i].split('=');
      if (aKeyValue.length > 1) {
        queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(
          aKeyValue[1]
        );
      }
    }
  },

  onSortChange: function() {
    queryParams.sort_by = this.getSortValue();
    if (queryParams.page) {
      delete queryParams.page;
    }
    location.search = decodeURIComponent($.param(queryParams));
  },

  onFilterChange: function() {
    this.filter = this.getFilterValue();
    document.location.href = this.filter;
  },

  getSortValue: function() {
    return $(selectors$10.sortBy).val() || this.defaultSort;
  },

  getDefaultSortValue: function() {
    return $(selectors$10.sortBy, this.$container).val() || defaultSort;
  },

  getFilterValue: function() {
    return $(selectors$10.filterBy, this.$container).val() || 'collections/all';
  }
});

/*

Featured Blog Post Section
--------------------------------------------------------------------------------
Creates a staggered card grid for the featured blog post section.

*/

// Extensions
// Libs
sections.register('featured-blog', {
  onLoad: function() {
    this.extend(cardManager);
  }
});

var product = {
  validate: function(product) {
    if (typeof product !== 'object' || typeof product.id !== 'number') {
      throw Error(
        'Please pass a valid Product object to the Product Controller'
      );
    }

    return $.extend({}, product);
  },

  getVariant: function(product, value) {
    var variant;

    if (typeof value === 'string' || typeof value === 'number') {
      // If value is an id
      variant = this._getVariantFromId(product, value);
    } else if (typeof value === 'object' && typeof value.id === 'number') {
      // If value is a variant object containing an id key
      variant = this._getVariantFromId(product, value.id);
    } else if (isArray(value)) {
      // If value is an array of options
      if (typeof value[0] === 'object') {
        // If value is a collection of options with name and value keys
        variant = this._getVariantFromOptionCollection(product, value);
      } else {
        // If value is an array of option values, ordered by index of array
        variant = this._getVariantFromOptionArray(product, value);
      }
    }

    return variant;
  },

  optionArrayFromOptionCollection: function(product, collection) {
    var optionArray = [];

    collection.forEach(function(option) {
      var index;

      if (typeof option.name !== 'string') {
        throw Error(
          'Invalid value type passed for name of option ' +
            index +
            '. Value should be string.'
        );
      }

      index = findIndex(product.options, function(name) {
        return name.toLowerCase() === option.name.toLowerCase();
      });

      if (index === -1) {
        throw Error('Invalid option name, ' + option.name);
      }

      optionArray[index] = option.value;
    });

    return optionArray;
  },

  _getVariantFromId: function(product, id) {
    return find(product.variants, { id: id });
  },

  _getVariantFromOptionCollection: function(product, collection, closest) {
    var optionArray = this.optionArrayFromOptionCollection(product, collection);

    return this._getVariantFromOptionArray(product, optionArray, closest);
  },

  _getVariantFromOptionArray: function(product, options) {
    return find(product.variants, function(variant) {
      return options.every(function(option, index) {
        return variant.options[index] === option;
      });
    });
  }
};

/*

Product Display Extension
--------------------------------------------------------------------------------
Manages the state of the product selection display.


Events
------------

Name: variant_change
Description: Fired whenever a new variant is selected
Payload: { object } Product object of the item being selected
Payload: { object } Variant object resulted from options selection

Name: variant_change_undefined
Description: Fired when the product options selected result in a undefined variant
Payload: { object } Product object of the item being selected
Payload: { array } Collection of form option input names and values

Name: variant_change_successful
Description: Fired when the product options selected result in a variant
Payload: { object } Product object of the item being selected
Payload: { object } Variant object resulted from options selection

Name: variant_add_to_cart
Description: Fired when a product variant is added to the cart
Payload: { object } Product object of the item being added to the cart
Payload: { object } Variant object of the item being added to the cart
Payload: { object } Serialized form data being submitted to the cart API

Name: variant_add_to_cart_successful
Description: Fired when a product variant has been added to the cart successfully
Payload: { object } Product object of the item being added to the cart
Payload: { object } Variant object of the item being added to the cart
Payload: { object } Serialized form data being submitted to the cart API

Name: variant_add_to_cart_fail
Description: Fired when a product variant has failed to be added to the cart
Payload: { object } Product object of the item being added to the cart
Payload: { object } Variant object of the item being added to the cart
Payload: { string } Error string

*/

var classes$11 = {
  productPriceSale: 'product__price--sale',
  productPriceUnitUnavailable: 'product-price-unit--unavailable',
  productNotificationSuccess: 'product__notification--success',
  productNotificationError: 'product__notification--error',
  buttonTransition: 'btn--to-secondary-transitioned',
  ajaxCartToggle: 'ajax-cart__toggle',
  hide: 'hide',
  lazyPreload: 'lazypreload'
};

var selectors$12 = {
  productForm: '.product-form',
  selectorWrapper: '.product-form__item',
  ajaxCartToggle: '.ajax-cart__toggle',
  shopifyPaymentButton: '.shopify-payment-button',

  productJSON: '[data-product-json]',
  optionInputs: '[data-option-input]',
  masterSelect: '[data-master-select]',
  variantImage: '[data-variant-image]',
  variantImageToggleHide: '[data-variant-image-toggle-hide]',
  variantImageSrc: '[data-variant-image-src]',
  productPrice: '[data-product-price]',
  regularPrice: '[data-regular-price]',
  compareAtPrice: '[data-compare-price]',
  unitPrice: '[data-unit-price]',
  unitPriceBaseUnit: '[data-unit-price-base-unit]',
  unitPriceContainer: '[data-unit-price-container]',
  submitButton: '[data-cart-submit]',
  submitButtonPrimaryText: '[data-cart-primary-submit-text]',
  submitButtonSecondaryText: '[data-cart-secondary-submit-text]',
  notification: '[data-cart-notification]'
};

var productDisplay = {
  init: function() {
    var $productJSON = $(selectors$12.productJSON, this.container);

    if ($productJSON.length === 0) return;

    this.product = JSON.parse($productJSON.html());
    this.variant = product.getVariant(
      this.product,
      this.$container.data('variant-id')
    );

    this._formatVariantSelectors();

    this.on('submit', selectors$12.productForm, this._addItemToCart.bind(this));
    this.one(
      'focus',
      selectors$12.optionInputs,
      this._preloadVariantImages.bind(this)
    );
    this.on(
      'change.variantController',
      selectors$12.optionInputs,
      this.update.bind(this)
    );

    this.document().on(
      'click',
      selectors$12.ajaxCartToggle,
      this._resetAddToCartButton.bind(this)
    );

    this.window().on('online', this._updateOnlineStatus);
    this.window().on('offline', this._updateOfflineStatus);
  },

  update: function() {
    var $inputs = $(selectors$12.optionInputs, this.$container);
    var options = $inputs.serializeArray();
    var variant = product.getVariant(this.product, options);

    // If the variant we tried to find with the selected options does not exist
    // then modify and clone the currently selected variant and transform it
    // to an 'unavailable' product variant object.
    if (typeof variant === 'undefined') {
      this.trigger('variant_change_undefined', [this.product, options]);

      variant = $.extend({}, this.variant); // Clone variant because we are going to edit it
      variant.isUndefined = true;
      variant.available = false;
      variant.options = product.optionArrayFromOptionCollection(
        this.product,
        options
      );
    } else {
      this.trigger('variant_change_successful', [this.product, variant]);
    }

    this.variant = variant;

    // MorphDOM - Here is the old container, and the new container, only update
    // the DOM with things that have changed.
    morphdom(this.$container[0], this._updatedContainer(this.variant));

    this.trigger('variant_change', [this.product, variant]);
  },

  _preloadVariantImages: function() {
    $(selectors$12.variantImage, this.$container).addClass(classes$11.lazyPreload);
  },

  // The padding on the left side of the variant select's needs to be set
  // to the same width as the option label. This can only be done when the main
  // stylesheet has been downloaded, so we use utils.promiseStylesheet()
  _formatVariantSelectors: function() {
    utils.promiseStylesheet().then(
      function() {
        $(selectors$12.selectorWrapper, this.$container).each(function() {
          var $wrapper = $(this);
          var $label = $wrapper.find('label');
          var $input = $wrapper.find('select, input');

          $input.css({
            'padding-left': $label.outerWidth(),
            opacity: 1
          });
        });
      }.bind(this)
    );
  },

  // Clone the current version of the container and update elements with jQuery
  // according to the new variant values. This is an alternative to having a
  // duplicate Handlebars template that you would pass the cart object to
  // generate the updated container.
  _updatedContainer: function(variant) {
    var $container = this.$container.clone();

    $(selectors$12.masterSelect, $container).val(variant.id);

    this._updateInputValues(variant, $container);
    this._updateProductPrices(variant, $container);
    this._updateVariantImage(variant, $container);
    this._toggleVariantImageHide(variant, $container);
    this._updateCartButtonState(variant, $container);

    return $container[0];
  },

  _updateInputValues: function(variant, $container) {
    $(selectors$12.optionInputs, $container).each(function(index) {
      $(this).val(variant.options[index]);
    });
  },

  _updateCartButtonState: function(variant, $container) {
    var text;

    if (variant.isUndefined) {
      text = theme.strings.unavailable;
    } else {
      text = variant.available
        ? theme.strings.addToCart
        : theme.strings.soldOut;
    }

    this._resetAddToCartButton($container);

    if (variant.available) {
      $(selectors$12.shopifyPaymentButton, $container).show();
    } else {
      $(selectors$12.shopifyPaymentButton, $container).hide();
    }

    $(selectors$12.submitButton, $container)
      .prop('disabled', !variant.available)
      .attr('aria-label', text);

    $(selectors$12.submitButtonPrimaryText, $container).text(text);
  },

  _updateProductPrices: function(variant, $container) {
    var productPrice = variant.price;
    var comparePrice = variant.compare_at_price;

    $(selectors$12.regularPrice, $container).html(
      currency.formatMoney(productPrice, theme.moneyFormat)
    );

    $(selectors$12.compareAtPrice, $container).html(
      currency.formatMoney(comparePrice, theme.moneyFormat)
    );

    $(selectors$12.productPrice, $container).toggleClass(
      classes$11.productPriceSale,
      comparePrice > productPrice
    );

    $(selectors$12.unitPriceContainer, $container).addClass(
      classes$11.productPriceUnitUnavailable
    );
    if (variant.unit_price_measurement) {
      $(selectors$12.unitPrice, $container).html(
        currency.formatMoney(variant.unit_price, theme.moneyFormat)
      );
      $(selectors$12.unitPriceBaseUnit, $container).html(
        this.getBaseUnit(variant)
      );
      $(selectors$12.unitPriceContainer, $container).removeClass(
        classes$11.productPriceUnitUnavailable
      );
    }
  },

  _updateVariantImage: function(variant, $container) {
    var src =
      (variant.featured_image && variant.featured_image.src) ||
      this.product.featured_image;
    var $variantImage = $(selectors$12.variantImageSrc, $container);
    var size = images.imageSize($variantImage.attr('src'));
    var sizedImgUrl = images.getSizedImageUrl(src, size);

    $variantImage.attr('src', sizedImgUrl);
  },

  _toggleVariantImageHide: function(variant, $container) {
    if (!variant.featured_image && !this.product.featured_image) return;

    var image = variant.featured_image || this.product.featured_image.id;
    var id = image && image.id;
    var $images = $(selectors$12.variantImageToggleHide, $container);
    var $active = $images.filter('[data-id="' + id + '"]');

    $active
      .removeClass(classes$11.hide)
      .siblings()
      .addClass(classes$11.hide);
  },

  _addItemToCart: function(evt) {
    if (!sections.isInstance('cart-drawer')) return;

    evt.preventDefault();
    var $button = $(selectors$12.submitButton, this.$container);
    var data = new FormData(evt.target);
    if ($button.hasClass(classes$11.ajaxCartToggle)) return;

    cart
      .addItemFromForm(data)
      .then(this._transitionAddToCartButton.bind(this, data))
      .catch(this._onAddItemFail.bind(this))
      .always(
        function() {
          this.trigger('variant_add_to_cart', [
            this.product,
            this.variant,
            data
          ]);
        }.bind(this)
      );
  },

  _onAddItemFail: function(response) {
    var $notification = $(selectors$12.notification, this.$container);
    var responseText = response && response.responseText;

    if (responseText) {
      responseText = JSON.parse(responseText).description;
    } else {
      responseText = theme.strings.cartError;
    }

    $notification
      .addClass(classes$11.productNotificationError)
      .removeClass(classes$11.productNotificationSuccess)
      .html(responseText)
      .attr('role', 'alert');

    this.trigger('variant_add_to_cart_fail', [
      this.product,
      this.variant,
      responseText
    ]);

    return utils.promiseTransitionEnd($notification);
  },

  _transitionAddToCartButton: function(data) {
    var $notification = $(selectors$12.notification, this.$container);
    var $button = $(selectors$12.submitButton, this.$container);
    var $primaryButtonText = $(selectors$12.submitButtonPrimaryText, $button);
    var $secondaryButtonText = $(selectors$12.submitButtonSecondaryText, $button);

    $button
      .addClass([classes$11.buttonTransition, classes$11.ajaxCartToggle].join(' '))
      .attr('aria-label', theme.strings.viewCart);
    $primaryButtonText.attr('aria-hidden', true);
    $secondaryButtonText.attr('aria-hidden', false);

    $notification
      .removeClass(classes$11.productNotificationError)
      .addClass(classes$11.productNotificationSuccess)
      .text(theme.strings.addItemSuccess)
      .attr('role', 'alert');

    this.trigger('variant_add_to_cart_successful', [
      this.product,
      this.variant,
      data
    ]);

    return utils.promiseTransitionEnd($notification);
  },

  _resetAddToCartButton: function($container) {
    $container = $container.length ? $container : this.$container;
    var $notification = $(selectors$12.notification, $container);
    var $button = $(selectors$12.submitButton, $container);
    var $primaryButtonText = $(selectors$12.submitButtonPrimaryText, $button);
    var $secondaryButtonText = $(selectors$12.submitButtonSecondaryText, $button);

    $button
      .removeClass([classes$11.buttonTransition, classes$11.ajaxCartToggle].join(' '))
      .attr('aria-label', theme.strings.addToCart);
    $primaryButtonText.attr('aria-hidden', false);
    $secondaryButtonText.attr('aria-hidden', true);

    $notification
      .removeClass(classes$11.productNotificationError)
      .removeClass(classes$11.productNotificationSuccess)
      .text('')
      .attr('role', '');
  },

  _updateOnlineStatus: function() {
    theme.isOnline = true;
  },

  _updateOfflineStatus: function() {
    theme.isOnline = false;
  },

  getBaseUnit: function(variant) {
    return variant.unit_price_measurement.reference_value === 1
      ? variant.unit_price_measurement.reference_unit
      : variant.unit_price_measurement.reference_value +
          variant.unit_price_measurement.reference_unit;
  }
};

/*

Featured Product Section
--------------------------------------------------------------------------------
Shows a product and allows the user to select product variants and add the product
to their cart.

*/

// Extensions
// Libs
var selectors$11 = {
  socialSharing: '.social-sharing',
  detailsButton: '.product__more-details'
};

sections.register('featured-product', {
  onLoad: function() {
    this.extend(socialSharing);
    this.extend(productDisplay);
    this.on('variant_change', this._updateProductLink.bind(this));

    this.window().on(
      'resize',
      debounce(this._formatVariantSelectors.bind(this), 500)
    );
  },

  _updateProductLink: function(evt, instance, product, variant) {
    var $link = $(selectors$11.detailsButton, this.$container);
    var url = utils.updateUrlParameter(
      $link.attr('href'),
      'variant',
      variant.id
    );

    $link.attr('href', url);
  }
});

var selectors$14 = {
  slides: '.slider__slide',
  activeSlide: '.slider__slide--active'
};

var classes$13 = {
  activeSlide: 'slider__slide--active',
  previousSlide: 'slider__slide--previous',
  nextSlide: 'slider__slide--next',
  transitioningSlide: 'slider__slide--transitioning',
  draggingSlide: 'slider__slide--dragging'
};

var events = {
  nextSlide: 'nextslide',
  prevSlide: 'prevslide',
  transitionStart: 'slidetransitionstart',
  transitionEnd: 'slidetransitionend'
};

var defaults = {
  moveThreshold: 25
};

function Slider(element, settings) {
  this.$element = $(element);
  this.$slides = $(selectors$14.slides, this.$element);
  this.config = $.extend({}, defaults, settings);

  this._setCurrentSlide($(selectors$14.activeSlide, this.$element));
  this._assignTouchHandlers();

  // We need to store the binded version of each event handler so that we can
  // remove it in the `slider.destroy()` method.
  this.bindedOnFocus = this._onFocus.bind(this);
  this.bindedOnBlur = this._onBlur.bind(this);

  // Need useCapture parameter in .addEventListener (the last parameter, set here
  // to true) so we can't use jQuery `.on()`
  if (this.$slides.length) {
    this.$slides[0].addEventListener('focus', this.bindedOnFocus, true);
    this.$slides[0].addEventListener('blur', this.bindedOnBlur, true);
  }
}

Slider.prototype = $.extend({}, Slider.prototype, {
  // Public Methods
  // ---------------------------------------------------------------------------
  destroy: function() {
    this.$element.off('touchstart mousedown');
    if (this.$slides.length) {
      this.$slides[0].removeEventListener('focus', this.bindedOnFocus, true);
      this.$slides[0].removeEventListener('blur', this.bindedOnBlur, true);
    }

    return null;
  },

  nextSlide: function() {
    this._triggerEvent([events.nextSlide, events.transitionStart]);

    return this._promiseNextSlide().then(
      function() {
        this._triggerEvent(events.transitionEnd);
      }.bind(this)
    );
  },

  previousSlide: function() {
    this._triggerEvent([events.prevSlide, events.transitionStart]);

    return this._promisePrevSlide().then(
      function() {
        this._triggerEvent(events.transitionEnd);
      }.bind(this)
    );
  },

  setSlide: function(setIndex, animate) {
    var slidePromiseChain = this.slidePromiseChain || $.Deferred().resolve();
    var currentIndex = this.$currentSlide.index();
    var totalSlides = this.$slides.length;
    var promiseSlide = $.Deferred().resolve();

    this.slidePromiseChain = slidePromiseChain.then(
      function() {
        if (setIndex < totalSlides && setIndex !== currentIndex) {
          if (animate) {
            if (setIndex > currentIndex) {
              promiseSlide = utils.promiseRepeatSeries(
                this.nextSlide.bind(this),
                setIndex - currentIndex
              );
            } else if (setIndex < currentIndex) {
              promiseSlide = utils.promiseRepeatSeries(
                this.previousSlide.bind(this),
                currentIndex - setIndex
              );
            }
          } else {
            promiseSlide = this._promiseSlide(this.$slides.eq(setIndex));
          }
        }

        return promiseSlide;
      }.bind(this)
    );

    return this.slidePromiseChain;
  },

  // Slide Management
  // ---------------------------------------------------------------------------
  _promiseNextSlide: function() {
    requestAnimationFrame(
      function() {
        this.$nextSlide.addClass(classes$13.nextSlide);

        requestAnimationFrame(
          function() {
            this.$slides.removeAttr('style');

            this.$nextSlide
              .removeClass(classes$13.nextSlide)
              .addClass(classes$13.activeSlide)
              .addClass(classes$13.transitioningSlide);

            this.$currentSlide
              .removeClass(classes$13.activeSlide)
              .addClass(classes$13.previousSlide)
              .addClass(classes$13.transitioningSlide);
          }.bind(this)
        );
      }.bind(this)
    );

    return this._promiseSlideTransitionEnd().then(
      function() {
        this._setCurrentSlide(this.$nextSlide);
      }.bind(this)
    );
  },

  _promisePrevSlide: function() {
    requestAnimationFrame(
      function() {
        this.$previousSlide.addClass(classes$13.previousSlide);

        requestAnimationFrame(
          function() {
            this.$slides.removeAttr('style');

            this.$previousSlide
              .removeClass(classes$13.previousSlide)
              .addClass(classes$13.activeSlide)
              .addClass(classes$13.transitioningSlide);

            this.$currentSlide
              .removeClass(classes$13.activeSlide)
              .addClass(classes$13.nextSlide)
              .addClass(classes$13.transitioningSlide);
          }.bind(this)
        );
      }.bind(this)
    );

    return this._promiseSlideTransitionEnd().then(
      function() {
        this._setCurrentSlide(this.$previousSlide);
      }.bind(this)
    );
  },

  _promiseSlide: function($slide) {
    this._setCurrentSlide($slide);

    $slide
      .addClass(classes$13.activeSlide)
      .siblings()
      .removeClass(classes$13.activeSlide);

    return $.Deferred(
      function(defer) {
        requestAnimationFrame(
          function() {
            this._triggerEvent(events.transitionEnd);
            defer.resolve();
          }.bind(this)
        );
      }.bind(this)
    );
  },

  _promiseCancelSlide: function() {
    requestAnimationFrame(
      function() {
        this.$slides.removeAttr('style').addClass(classes$13.transitioningSlide);
      }.bind(this)
    );

    return this._promiseSlideTransitionEnd();
  },

  _promiseSlideTransitionEnd: function() {
    return $.Deferred(
      function(defer) {
        this.$currentSlide.one(
          'transitionend',
          function() {
            this.$slides.removeClass(
              [
                classes$13.transitioningSlide,
                classes$13.nextSlide,
                classes$13.previousSlide
              ].join(' ')
            );
            defer.resolve();
          }.bind(this)
        );
      }.bind(this)
    );
  },

  _setCurrentSlide: function($slide) {
    this.$currentSlide = $slide;
    this.$nextSlide = this._nextSlideIndex($slide, this.$slides);
    this.$previousSlide = this._prevSlideIndex($slide, this.$slides);
  },

  // Touch Handlers
  // ---------------------------------------------------------------------------

  _assignTouchHandlers: function() {
    this.bindedTouchStart = this._onTouchStart.bind(this);
    this.bindedTouchMove = this._onTouchMove.bind(this);
    this.bindedTouchEnd = this._onTouchEnd.bind(this);

    // When a touchstart OR mousedown event is fired, take action.
    this.$element
      .one('touchstart', this.bindedTouchStart)
      .one('mousedown', this.bindedTouchStart);
  },

  _onTouchStart: function(evt) {
    this.windowWidth = $(window).innerWidth();
    this.startPosition = utils.pointerEventToXY(evt);
    this.isDragging = false;

    this.$element
      .on('touchmove mousemove', this.bindedTouchMove)
      .on('touchend mouseup', this.bindedTouchEnd);
  },

  _onTouchMove: function(evt) {
    this.currentPosition = utils.pointerEventToXY(evt);
    this.percentMoved =
      ((this.currentPosition.x - this.startPosition.x) / this.windowWidth) *
      100;

    if (!this.isDragging) {
      this.isDragging = true;
    }

    if (this.percentMoved > 0) {
      this.$previousSlide.addClass(classes$13.previousSlide);
      this.$nextSlide.removeClass(classes$13.nextSlide);
      this.$previousSlide.css({
        transform: 'translateX(' + (this.percentMoved - 100) + '%)'
      });
    } else {
      this.$previousSlide.removeClass(classes$13.previousSlide);
      this.$nextSlide.addClass(classes$13.nextSlide);
      this.$nextSlide.css({
        transform: 'translateX(' + (100 + this.percentMoved) + '%)'
      });
    }

    this.$currentSlide
      .addClass(classes$13.draggingSlide)
      .css({ transform: 'translateX(' + this.percentMoved + '%)' });
  },

  _onTouchEnd: function() {
    var moveThreshold = this.config.moveThreshold;
    var promiseTransition = $.Deferred().resolve();

    this.$element.off();

    if (this.isDragging) {
      this.isDragging = false;

      this.$currentSlide.removeClass(classes$13.draggingSlide);

      if (this.percentMoved > moveThreshold) {
        promiseTransition = this.previousSlide();
      } else if (this.percentMoved < -moveThreshold) {
        promiseTransition = this.nextSlide();
      } else {
        promiseTransition = this._promiseCancelSlide();
      }
    }

    promiseTransition.then(
      function() {
        this.$element
          .one('touchstart', this.bindedTouchStart)
          .one('mousedown', this.bindedTouchStart);
      }.bind(this)
    );
  },

  // A11y
  // ---------------------------------------------------------------------------
  _onFocus: function() {
    this.$element.one('keyup', this._onKeyup.bind(this));
  },

  _onBlur: function() {
    this.$element.off('keyup');
  },

  _onKeyup: function(evt) {
    var promiseTransition = $.Deferred().resolve();
    var refocusOnSlideShow = false;

    switch (evt.keyCode) {
      case 37:
        promiseTransition = this.previousSlide();
        refocusOnSlideShow = $.contains(
          this.$element[0],
          document.activeElement
        );
        break;
      case 39:
        promiseTransition = this.nextSlide();
        refocusOnSlideShow = $.contains(
          this.$element[0],
          document.activeElement
        );
        break;
    }

    promiseTransition.then(
      function() {
        if (refocusOnSlideShow) {
          this.$element.focus();
        }
        this.$element.one('keyup', this._onKeyup.bind(this));
      }.bind(this)
    );
  },

  // Misc
  // ---------------------------------------------------------------------------
  _triggerEvent: function(names) {
    if (typeof names === 'string') {
      names = [names];
    }

    names.forEach(
      function(name) {
        this.$element.trigger(name, {
          $previousSlide: this.$previousSlide,
          $currentSlide: this.$currentSlide,
          $nextSlide: this.$nextSlide
        });
      }.bind(this)
    );
  },

  _nextSlideIndex: function($current, $slides) {
    var index = $current.index();
    var count = $slides.length;
    var next = index + 1;

    if (index + 1 === count) {
      next = 0;
    }

    return $slides.eq(next);
  },

  _prevSlideIndex: function($current, $slides) {
    var index = $current.index();
    var count = $slides.length;
    var prev = index - 1;

    if (index - 1 === -1) {
      prev = count - 1;
    }

    return $slides.eq(prev);
  }
});

/*

Reveal Slider Extension
--------------------------------------------------------------------------------
Manage the mobile reveal slider functionality.


Events
------------
Name: reveal_slider_init_start
Description: Fired at the start of the reveal slider initialization
Payload: none

Name: reveal_slider_init_done
Description: Fired at the end of the reveal slider initialization
Payload: none

Name: reveal_slider_destroy
Description: Fired when the reveal slider is destroyed
Payload: none

Name: reveal_slider_open_cover
Description: Fired when the  slider cover is opened
Payload: none

Name: reveal_slider_close_cover
Description: Fired when the  slider cover is closed
Payload: none

Name: reveal_slider_set_slide
Description: Fired when the slider nav buttons are clicked to change a slide
Payload: { number } Index of the slide to set as active

*/

var selectors$13 = {
  coverTopBackground: '.reveal-slider__cover-background--top',
  coverBottomBackground: '.reveal-slider__cover-background--bottom',
  coverContent: '.reveal-slider__cover-content',
  slideNavButtons: '.reveal-slider__nav-button',
  slidePreviousButton: '.reveal-slider__previous-button',
  slideNextButton: '.reveal-slider__next-button',
  closeCoverButton: '.reveal-slider__close',
  slider: '.slider'
};

var classes$12 = {
  navButtonActive: 'active',
  coverOpen: 'open'
};

var revealSlider = {
  initRevealSlider: function() {
    this.trigger('reveal_slider_init_start');

    this.revealSlider = true;
    this.coverIsOpen = false;
    this.revealSliderNamespace = '.revealSlider';
    this.mediaQuerySmall = theme.mediaQuerySmall;

    this.slider = new Slider($(selectors$13.slider, this.$container));
    this.hammertime = new Hammer(this.$container[0]);

    this.on(
      'click',
      selectors$13.slideNavButtons,
      this._onClickNavButton.bind(this)
    );
    this.on(
      'click',
      selectors$13.slidePreviousButton,
      this.slider.previousSlide.bind(this.slider)
    );
    this.on(
      'click',
      selectors$13.slideNextButton,
      this.slider.nextSlide.bind(this.slider)
    );
    this.on('click', selectors$13.closeCoverButton, this.closeCover.bind(this));
    this.on('click', selectors$13.coverContent, this.openCover.bind(this));
    this.on('nextslide prevslide', this._changeBackgroundColor.bind(this));
    this.on('slidetransitionend', this._onSlideTransitionEnd.bind(this));

    this.document().on(
      'touchstart' + this.revealSliderNamespace,
      this._onTouchStart.bind(this)
    );
    this.document().on(
      'touchend' + this.revealSliderNamespace,
      this._onTouchEnd.bind(this)
    );

    this.hammertime
      .on('pinchout pinchin', this._onPinch.bind(this))
      .on('pinchend pinchcancel', this._onPinchEnd.bind(this));

    this.trigger('reveal_slider_init_done');
  },

  destroyRevealSlider: function() {
    this.revealSlider = false;
    this.slider = this.slider.destroy();
    this.document().off(this.revealSliderNamespace);
    this.off();

    this.trigger('reveal_slider_destroy');
  },

  openCover: function() {
    this.$container.addClass(classes$12.coverOpen);
    this.coverIsOpen = true;
    this.trigger('reveal_slider_open_cover');
  },

  closeCover: function() {
    this.$container.removeClass(classes$12.coverOpen);
    this.coverIsOpen = false;
    this.trigger('reveal_slider_close_cover');
  },

  _changeBackgroundColor: function(evt, data) {
    var color;

    if (evt.type === 'nextslide') {
      color = data.$nextSlide.data('background-color');
    } else {
      color = data.$previousSlide.data('background-color');
    }

    $(selectors$13.slider, this.$container).css({ backgroundColor: color });
  },

  _onSlideTransitionEnd: function(evt, data) {
    var index = data.$currentSlide.index();

    $(selectors$13.slideNavButtons, this.$container)
      .eq(index)
      .addClass(classes$12.navButtonActive)
      .siblings()
      .removeClass(classes$12.navButtonActive);
  },

  _onClickNavButton: function(evt) {
    var $navButton = $(evt.target);
    var index = $navButton.index();
    this.slider.setSlide($navButton.index());
    this.trigger('reveal_slider_set_slide', [index]);
  },

  _onTouchStart: function(evt) {
    if (evt.originalEvent.touches.length <= 1) return;

    this.enablePinch = true;

    // Lock Scrolling over the zoom element by allowing Hammer.js to fire pinch events.
    this.hammertime.get('pinch').set({ enable: this.enablePinch });
  },

  _onTouchEnd: function() {
    if (!this.enablePinch) return;

    this.enablePinch = false;
    this.hammertime.get('pinch').set({ enable: this.enablePinch });
  },

  _onPinch: function(evt) {
    this.$coverTopBackground =
      this.$coverTopBackground ||
      $(selectors$13.coverTopBackground, this.$container); // eslint-disable-line shopify/jquery-dollar-sign-reference
    this.$coverBottomBackground =
      this.$coverBottomBackground ||
      $(selectors$13.coverBottomBackground, this.$container); // eslint-disable-line shopify/jquery-dollar-sign-reference
    this.$coverTitle =
      this.$coverTitle || $(selectors$13.coverContent, this.$container); // eslint-disable-line shopify/jquery-dollar-sign-reference

    if (
      (evt.type === 'pinchin' && !this.coverIsOpen) ||
      (evt.type === 'pinchout' && this.coverIsOpen)
    )
      return;

    // The distance of the top and bottom backgrounds (relative to the center
    // of the slider) will be calculated based on evt.scale, which represents
    // the scale factor between two pointersets (two finger points).
    this.distance = this.coverIsOpen ? 70 * evt.scale : (evt.scale - 1) * 25;

    if (this.distance < 0) {
      this.distance = 0;
    }

    this.$coverBottomBackground.css({
      transform: 'translateY(' + this.distance + '%)'
    });
    this.$coverTopBackground.css({
      transform: 'translateY(-' + this.distance + '%)'
    });
    this.$coverTitle.css({ opacity: 1 - this.distance / 30 });
  },

  // If the scale factor is greater than 2, the cover will open automatically.
  _onPinchEnd: function(evt) {
    if (evt.scale > 2) {
      this.$container.addClass(classes$12.coverOpen);
      this.coverIsOpen = true;
    } else {
      this.$container.removeClass(classes$12.coverOpen);
      this.coverIsOpen = false;
    }

    // When pinching, a style attribute is added to the following elements with
    // the distance percentage. This callback will only get fired once at the
    // end of a pinch and ensures the cover will either open or close automatically
    // based on the conditional above.
    requestAnimationFrame(
      function() {
        this.$coverTopBackground.removeAttr('style');
        this.$coverBottomBackground.removeAttr('style');
        this.$coverTitle.removeAttr('style');
      }.bind(this)
    );
  }
};

/*

Side Scroller Extension
--------------------------------------------------------------------------------
Manages the desktop side scrolling behavior


Events
------------

Name: side_scroller_init_start
Description: Fired at the start of the side scroller initialization
Payload: none

Name: side_scroller_init_done
Description: Fired at the end of the side scroller initialization
Payload: none

Name: side_scroller_destroy
Description: Fired when the side scroller is destroyed
Payload: none

Name: side_scroller_position_top
Description: Fired when the position of the side scroller sticky image is switched to the top
Payload: none

Name: side_scroller_position_fixed
Description: Fired when the position of the side scroller sticky image is switched to be fixed
Payload: none

Name: side_scroller_position_bottom
Description: Fired when the position of the side scroller sticky image is switched to the bottom
Payload: none

*/

var selectors$15 = {
  coverContent: '.side-scroller__cover-content',
  slidesContainer: '.side-scroller__slides-container',
  coverBackground: '.side-scroller__cover-background',
  slides: '.side-scroller__slide'
};

var classes$14 = {
  coverFixed: 'side-scroller--fixed',
  coverBottom: 'side-scroller--fixed-bottom'
};

var sideScroller = {
  initSideScroller: function() {
    this.trigger('side_scroller_init_start');

    this.$slides = $(selectors$15.slides, this.$container);
    this.$slidesContainer = $(selectors$15.slidesContainer, this.$container);

    this.sideScroller = true;
    this.sideScrollerNamespace = '.sideScroller';
    this.coverPosition = 'top';

    this.window().on(
      'scroll' + this.sideScrollerNamespace,
      this._onScroll.bind(this)
    );
    this.window().on(
      'resize' + this.sideScrollerNamespace,
      this._updateCoverPositionValues.bind(this)
    );
    this.window().on(
      'resize' + this.sideScrollerNamespace,
      this._onScroll.bind(this)
    );

    this.document().on(
      'drawer_open_start' + this.sideScrollerNamespace,
      this._handleFixedSideImage.bind(this)
    );
    this.document().on(
      'drawer_close_done' + this.sideScrollerNamespace,
      this._resetFixedSideImage.bind(this)
    );

    utils.promiseStylesheet().then(
      function() {
        this._updateCoverPositionValues();
        this._onScroll();

        this.trigger('side_scroller_init_done');
      }.bind(this)
    );
  },

  destroySideScroller: function() {
    this.sideScroller = false;
    this.window().off(this.sideScrollerNamespace);
    this.document().off(this.sideScrollerNamespace);

    this.trigger('side_scroller_destroy');
  },

  _handleFixedSideImage: function() {
    if (this.coverPosition !== 'fixed') return;

    var $coverContent = $(selectors$15.coverContent, this.$container);
    var coverContentHeight = $coverContent.outerHeight();
    var scrollTop = $(window).scrollTop();
    var translate = scrollTop - this.featuresOffset.top;

    $(selectors$15.coverBackground, this.$container).css({
      transform: 'translateY(' + translate + 'px)',
      position: 'absolute'
    });

    $(selectors$15.coverContent, this.$container).css({
      transform:
        'translate(-50%, ' + (translate - coverContentHeight / 2) + 'px)',
      position: 'absolute'
    });
  },

  _resetFixedSideImage: function() {
    if (this.coverPosition !== 'fixed') return;

    $(selectors$15.coverBackground, this.$container)
      .add(selectors$15.coverContent, this.$container)
      .css({
        transform: '',
        position: ''
      });
  },

  _onScroll: function() {
    var scrollTop = $(window).scrollTop();

    // If the top of the window has gone past the top of the featured slider
    // and the window has not gone past the bottom of the featured slider,
    // we set the cover to fixed.
    // Debounce any style changes to the next from with requestAnimationFrame.
    if (
      scrollTop > this.featuresOffset.top &&
      scrollTop + this.windowHeight <=
        this.featuresOffset.top + this.featuresHeight
    ) {
      requestAnimationFrame(this._setCoverPosition.bind(this, 'fixed'));
      requestAnimationFrame(this._updateBackgroundColor.bind(this, scrollTop));
    } else if (
      scrollTop + this.windowHeight >
      this.featuresOffset.top + this.featuresHeight
    ) {
      requestAnimationFrame(this._setCoverPosition.bind(this, 'bottom'));
    } else {
      requestAnimationFrame(this._setCoverPosition.bind(this, 'top'));
    }
  },

  _setCoverPosition: function(position) {
    if (this.coverPosition !== position) {
      switch (position) {
        case 'top':
          this.$container.removeClass(
            [classes$14.coverBottom, classes$14.coverFixed].join(' ')
          );
          this.trigger('side_scroller_position_top');
          break;
        case 'fixed':
          this.$container
            .removeClass(classes$14.coverBottom)
            .addClass(classes$14.coverFixed);
          this.trigger('side_scroller_position_fixed');
          break;
        case 'bottom':
          this.$container
            .removeClass(classes$14.coverFixed)
            .addClass(classes$14.coverBottom);
          this.trigger('side_scroller_position_bottom');
          break;
      }
    }

    this.coverPosition = position;
  },

  _updateBackgroundColor: function(scrollTop) {
    // The slide index is determined based on the current top position of the
    // window relative to the height of the slide.
    var currentSlideIndex = Math.floor(
      (scrollTop - this.featuresOffset.top + this.windowHeight / 2) /
        this.slideHeight
    );

    this.currentBackgroundIndex = this.currentBackgroundIndex || 0;

    if (currentSlideIndex !== this.currentBackgroundIndex) {
      this.currentBackgroundIndex = currentSlideIndex;
      this.$slidesContainer.css({
        backgroundColor: this.$slides
          .eq(currentSlideIndex)
          .data('background-color')
      });
    }
  },

  _updateCoverPositionValues: function() {
    this.slideHeight = this.$slides.first().height();
    this.featuresOffset = this.$container.offset();
    this.featuresHeight = this.$container.height();
    this.windowHeight = $(window).innerHeight();
    this.windowWidth = $(window).innerWidth();
  }
};

// Because the functionality is vastly different on mobile vs desktop, we
// require two different extensions and load them here into one section
sections.register('featured-slider', {
  onLoad: function() {
    this.coverIsOpen = false;

    this.extend(revealSlider);
    this.extend(sideScroller);

    this._toggleViewState();

    $(window).on('resize', debounce(this._toggleViewState.bind(this)));
  },

  onUnload: function() {
    this._destroyDesktopState();
    this._destroyMobileState();
  },

  onDeselect: function() {
    if (this.mobileViewEnabled) {
      this.closeCover();
    }
  },

  onBlockSelect: function(evt) {
    if (this.mobileViewEnabled) {
      this.openCover();
      this.slider.setSlide($(evt.target).index());
    } else {
      $('html, body').animate(
        {
          scrollTop: $(evt.target).offset().top
        },
        400
      );
    }
  },

  onBlockDeselect: function() {
    if (this.mobileViewEnabled) {
      this.revealSlider.closeCover();
    }
  },

  _toggleViewState: function() {
    var windowWidth = $(window).innerWidth();
    var enableMobileView;
    var enableDesktopView;

    if (typeof this.mobileViewEnabled === 'undefined') {
      enableMobileView = windowWidth < theme.mediaQuerySmall;
      enableDesktopView = windowWidth >= theme.mediaQuerySmall;
    } else {
      enableMobileView =
        windowWidth < theme.mediaQuerySmall && !this.mobileViewEnabled;
      enableDesktopView =
        windowWidth >= theme.mediaQuerySmall && this.mobileViewEnabled;
    }

    if (enableMobileView) {
      this.mobileViewEnabled = true;
      this._destroyDesktopState();
      this._enableMobileState();
    }

    if (enableDesktopView) {
      this.mobileViewEnabled = false;
      this._destroyMobileState();
      this._enableDesktopState();
    }
  },

  _enableDesktopState: function() {
    this.initSideScroller();
  },

  _destroyDesktopState: function() {
    if (typeof this.sideScroller !== 'undefined') {
      this.destroySideScroller();
    }
  },

  _enableMobileState: function() {
    this.initRevealSlider();
  },

  _destroyMobileState: function() {
    if (this.revealSlider) {
      this.destroyRevealSlider();
    }
  }
});

var classes$15 = {
  footerParallax: 'site-footer--parallax'
};

var selectors$16 = {
  contentForLayout: '.content-for-layout',
  footerCover: '.site-footer__drawer-cover '
};

sections.register('footer', {
  onLoad: function() {
    if (
      !this.container.hasAttribute('data-footer-parallax') ||
      ($('html').hasClass('is-ios') && Shopify.designMode)
    )
      return;

    this.window().on('resize', this._setParallax.bind(this));
    this.document().on(
      'drawer_open_start',
      this._handleDrawerOpenState.bind(this)
    );
    this.document().on(
      'drawer_close_done',
      this._resetDrawerOpenState.bind(this)
    );

    $(document.body).addClass(classes$15.footerParallax);

    utils.promiseStylesheet().then(this._setParallax.bind(this));
  },

  onUnload: function() {
    $(document.body).removeClass(classes$15.footerParallax);
    $(selectors$16.contentForLayout).css('margin-bottom', '');
  },

  _setParallax: function() {
    this.height = this.$container.innerHeight();
    $(selectors$16.contentForLayout).css('margin-bottom', this.height);
  },

  _handleDrawerOpenState: function() {
    if (document.body.scrollHeight - window.innerHeight === 0) {
      // If the page is smaller than the window
      this.$container.css(
        'margin-bottom',
        document.body.clientHeight - document.body.scrollHeight
      );
    } else {
      // If the page is longer than the window
      var distanceFromBottom =
        document.body.scrollHeight - window.innerHeight - window.scrollY;
      var adjustFooter = distanceFromBottom - this.height;

      this.$container.css('margin-bottom', adjustFooter);
      $(selectors$16.footerCover)
        .css('height', distanceFromBottom)
        .show();
    }
  },

  _resetDrawerOpenState: function() {
    this.$container.css('margin-bottom', '');
    $(selectors$16.footerCover).hide();
  }
});

var selectors$17 = {
  skipLink: '.skip-link',
  navigation: '.navigation',
  navAnimateElements: '.navigation__entrance-animation',
  cartBubble: '.site-header__cart-bubble',
  siteHeader: '.site-header',
  siteHeaderWrapper: '.site-header__wrapper',
  siteHeaderLogo: '.site-header__logo',
  siteHeaderCart: '.site-header__cart',
  siteNavigation: '[data-site-navigation]',
  navigationButton: '[data-navigation-button]',
  navigationExpandSublinks: '.navigation__expand-sublinks',
  navigationExpandChildSublinks: '.navigation__expand-sublinks--third-level',
  navigationSublinksContainer: '.navigation__sublinks-container',
  navigationSublink: '.navigation__sublink',
  navigationSublinks: '.navigation__sublinks',
  navigationChildSublinks: '.navigation__sublinks--third-level',
  navigationHasSublinks: '.navigation__has-sublinks',
  announcementBar: '.announcement-bar',
  announcementBarClose: '.announcement-bar__close'
};

var classes$16 = {
  themeEditor: 'theme-editor',
  headerFixed: 'site-header--fixed',
  headerHomepage: 'site-header--homepage',
  headerTransparent: 'site-header--transparent',
  cartBubbleVisible: 'site-header__cart-bubble--visible',
  bubblePulse: 'bubble-pulse',
  drawerActive: 'drawer--active',
  navigationExpandChildSublinks: 'navigation__expand-sublinks--third-level',
  navigationOpen: 'navigation-open',
  navigationOpenEditor: 'navigation-open--editor',
  navigationTransitioning: 'navigation--is-transitioning',
  navigationHasSublinksCollapsed: 'navigation__has-sublinks--collapsed',
  navigationEntranceActive: 'navigation__entrance-animation--active',
  siteHeaderWrapperTransitioning: 'site-header__wrapper--transitioning',
  announcementBarVisible: 'announcement-bar--visible'
};

var scrollHandler = true;
var blockEditorEvents = false;
var navigationManuallyToggled = false;

sections.register('header-section', {
  /*--------------------------------------------------------------------------*/
  /*                             Editor Events                                */
  /*--------------------------------------------------------------------------*/
  onLoad: function() {
    var $container = (this.$container = $(this.container));

    this.scrollTop = 0;
    this.isFixed = false;
    this.headerHeight = 0;
    this.promiseChain = $.Deferred().resolve();

    // Initially disable tabbing through site navigation
    utils.disableTabbingOfChildren(selectors$17.navigation);

    $(selectors$17.navigationButton)
      .one('click', this._toggleNavigationDisplay.bind(this))
      .one('click', this._setSublinksMaxHeight.bind(this));

    $(selectors$17.navigationExpandSublinks, $container).on(
      'click',
      this._toggleNavigationSublinks.bind(this)
    );

    $(selectors$17.announcementBarClose, $container).on(
      'click',
      this._closeAnnouncementBar.bind(this)
    );

    // Disable the sticky and/or transparent header in iOS editor
    if ($('html').hasClass('is-ios') && Shopify.designMode) {
      $(selectors$17.siteHeader)
        .removeClass(classes$16.headerHomepage)
        .removeClass(classes$16.headerTransparent);
    } else {
      // Don't call _toggleHeaderPosition on scroll in the iOS editor
      $(document).on(
        'scroll' + this.namespace,
        throttle(this._toggleHeaderPosition.bind(this), 200)
      );
    }

    $(window).on(
      'resize' + this.namespace,
      this._adjustNavigationPadding.bind(this)
    );

    cart.on('change', this._toggleCartBubble.bind(this));

    utils.promiseStylesheet().then(
      function() {
        this._setupAnnouncementBar();
      }.bind(this)
    );
  },

  onSelect: function() {
    this._adjustNavigationPadding();

    // If you close the navigation to view and edit the transparent header
    // settings, then you don't want the navigation to open when it reloads
    // with your changes. Skip opening the navigation if the user has clicked
    // on the 'X' of the navigation.
    if (navigationManuallyToggled) return;

    // Block the 'onDeselect' if it is fired within 100ms
    blockEditorEvents = true;

    this.showNavigation();
  },

  onDeselect: function() {
    // Make sure that we're not blocking editor events by default
    blockEditorEvents = false;

    // When a section is reloaded by the editor it fires the 'onDeselect',
    // 'onUnload', 'onLoad', and then 'onSelect' events. We don't want to hide
    // the navigation when the section reloads from an edit. If we receive a
    // `onSelect` event within 100ms of the 'onDeselect' event, then it is
    // canceled.
    setTimeout(
      function() {
        if (blockEditorEvents) return;

        navigationManuallyToggled = false;
        blockEditorEvents = false;

        this.hideNavigation();
      }.bind(this),
      100
    );
  },

  /*--------------------------------------------------------------------------*/
  /*                                 Header                                   */
  /*--------------------------------------------------------------------------*/
  _setupAnnouncementBar: function() {
    var $announcementBar = $(selectors$17.announcementBar, this.$container);

    if (!$announcementBar.length) return;

    if (
      utils.isSessionStorageSupported() &&
      sessionStorage.getItem('announcement-bar-hidden')
    )
      return;

    var $siteHeaderWrapper = $(selectors$17.siteHeaderWrapper);

    requestAnimationFrame(function() {
      $announcementBar.addClass(classes$16.announcementBarVisible);
      $siteHeaderWrapper.css(
        'margin-top',
        '-' + $announcementBar.outerHeight() + 'px'
      );

      requestAnimationFrame(function() {
        $siteHeaderWrapper
          .addClass(classes$16.siteHeaderWrapperTransitioning)
          .css('margin-top', '');
      });
    });
  },

  _closeAnnouncementBar: function(evt) {
    evt.preventDefault();

    if (Shopify.designMode) return;

    var $announcementBar = $(selectors$17.announcementBar);
    var $siteHeaderWrapper = $(selectors$17.siteHeaderWrapper);

    $siteHeaderWrapper.css(
      'margin-top',
      '-' + $announcementBar.outerHeight() + 'px'
    );

    $(selectors$17.announcementBarClose).attr('aria-expanded', false);

    if (utils.isSessionStorageSupported()) {
      sessionStorage.setItem('announcement-bar-hidden', true);
    }

    utils.promiseTransitionEnd($siteHeaderWrapper).then(function() {
      $announcementBar.remove();

      $siteHeaderWrapper
        .removeClass(classes$16.siteHeaderWrapperTransitioning)
        .css('margin-top', '');
    });
  },

  _toggleHeaderPosition: function() {
    // Check if toggle is disabled by other settings
    if (!scrollHandler || this.headerAnimating) return;

    var scrollTop = $(document).scrollTop();

    this.headerHeight = this.headerHeight || this.$container.outerHeight();

    // Check which header transformation needs to happen. Also check if a toggle
    // even needs to happen, i.e. if you're scrolling up and the header is
    // already displayed, why call slideOut again?
    // Debounce any style changes to the next frame using requestAnimationFrame
    if (scrollTop <= 0) {
      requestAnimationFrame(this._promiseHeaderReset.bind(this));
    } else if (
      scrollTop < this.scrollTop &&
      scrollTop > 0 &&
      !this.isFixed &&
      !this.isAnimating
    ) {
      requestAnimationFrame(this._promiseHeaderSlideIn.bind(this));
    } else if (
      scrollTop > this.scrollTop &&
      scrollTop > this.headerHeight &&
      this.isFixed &&
      !this.isAnimating
    ) {
      requestAnimationFrame(this._promiseHeaderSlideOut.bind(this));
    }

    this.scrollTop = scrollTop;

    // The scroll event is fired randomly and is not guaranteed to fire when
    // scrollTop === 0. Double check after a short period to see if we need to
    // reset the header.
    this._doubleCheckPosition();
  },

  _doubleCheckPosition: function() {
    if (typeof this.doubleCheckDebounced === 'undefined') {
      this.doubleCheckDebounced = debounce(
        function() {
          this.scrollTop = $(document).scrollTop();
          if (this.scrollTop <= 0) {
            this._promiseHeaderReset();
          }
        }.bind(this),
        500
      );
    }

    this.doubleCheckDebounced();
  },

  _promiseHeaderReset: function() {
    this.promiseChain = this.promiseChain.then(
      function() {
        this.$container.removeClass(classes$16.headerFixed);
        $('body').css('padding-top', '');
      }.bind(this)
    );
  },

  _promiseHeaderSlideIn: function() {
    this.isFixed = true;
    this.headerAnimating = true;
    $(selectors$17.siteHeaderWrapper).css('transform', 'translateY(-100%)');

    requestAnimationFrame(
      function() {
        this.$container.addClass(classes$16.headerFixed);

        if (!this.$container.hasClass(classes$16.headerHomepage)) {
          $('body').css('padding-top', this.headerHeight);
        }

        requestAnimationFrame(function() {
          $(selectors$17.siteHeaderWrapper).css({
            transform: 'translateY(0%)',
            transition: 'transform 0.25s ease-out'
          });
        });
      }.bind(this)
    );

    return utils.promiseTransitionEnd($(selectors$17.siteHeaderWrapper)).then(
      function() {
        this.headerAnimating = false;
        $(selectors$17.siteHeaderWrapper).attr('style', '');
      }.bind(this)
    );
  },

  _promiseHeaderSlideOut: function() {
    this.isFixed = false;
    this.headerAnimating = true;

    $(selectors$17.siteHeaderWrapper).css({
      transform: 'translateY(-100%)',
      transition: 'transform 0.25s ease-out'
    });

    return utils.promiseTransitionEnd($(selectors$17.siteHeaderWrapper)).then(
      function() {
        this.headerAnimating = false;
        $(selectors$17.siteHeaderWrapper).attr('style', '');
        $('body').css('padding-top', '');
        this.$container.removeClass(classes$16.headerFixed);
      }.bind(this)
    );
  },

  _toggleCartBubble: function(evt, state) {
    var $bubble = $(selectors$17.cartBubble, this.$container);

    $bubble.toggleClass(classes$16.cartBubbleVisible, state.items.length !== 0);

    if (!$('body').hasClass(classes$16.drawerActive)) {
      $bubble.addClass(classes$16.bubblePulse);

      utils.promiseAnimationEnd($bubble).then(function() {
        $bubble.removeClass(classes$16.bubblePulse);
      });
    }
  },

  /*--------------------------------------------------------------------------*/
  /*                              Navigation                                  */
  /*--------------------------------------------------------------------------*/
  showNavigation: function() {
    var isOpen = $(document.body).hasClass(classes$16.navigationOpen);
    this.siteNavigation = this.container.querySelector(
      selectors$17.siteNavigation
    );
    var navigationButton = this.siteNavigation.querySelector(
      selectors$17.navigationButton
    );

    if (!isOpen) {
      scrollHandler = false;

      this._adjustNavigationPadding();
      a11y.trapFocus(this.siteNavigation, {
        elementToFocus: navigationButton
      });

      utils.enableTabbingOfChildren(selectors$17.navigation);
      $(selectors$17.navigation).attr('aria-hidden', false);

      this.promiseChain = this.promiseChain
        .then(this._promiseNavTransition.bind(this, true))
        .then(
          this._promiseNavItemsTransition.bind(
            this,
            $(selectors$17.navAnimateElements, this.$container).toArray(),
            true
          )
        )
        .then(
          function() {
            $(document).on(
              'keyup' + this.namespace,
              this._closeOnEscape.bind(this)
            );
            $(selectors$17.navigationButton)
              .attr('aria-expanded', true)
              .off()
              .one('click', this._toggleNavigationDisplay.bind(this));
          }.bind(this)
        );
    }

    return this.promiseChain.then(function() {
      // This class is only applied in the Theme Editor and makes sure that
      // the navigation links show when the section reloads from settings
      // changes.
      if (Shopify.designMode) {
        $(document.body).addClass(classes$16.navigationOpenEditor);
      }
    });
  },

  hideNavigation: function() {
    var isOpen = $(document.body).hasClass(classes$16.navigationOpen);

    if (isOpen) {
      var $navElements = $(selectors$17.navAnimateElements, this.$container);

      a11y.removeTrapFocus();

      utils.disableTabbingOfChildren(selectors$17.navigation);
      $(selectors$17.navigation).attr('aria-hidden', true);

      if (Shopify.designMode) {
        $(document.body).removeClass(classes$16.navigationOpenEditor);
        $navElements.addClass(classes$16.navigationEntranceActive);
      }

      this.promiseChain = this.promiseChain
        .then(
          this._promiseNavItemsTransition.bind(
            this,
            $navElements.toArray().reverse(),
            false
          )
        )
        .then(this._promiseNavTransition.bind(this, false))
        .then(
          function() {
            scrollHandler = true;
            $(document).off('keyup' + this.namespace);
            $(selectors$17.navigationButton)
              .off()
              .one('click', this._toggleNavigationDisplay.bind(this))
              .attr('aria-expanded', false)
              .focus();
          }.bind(this)
        );
    }

    return this.promiseChain;
  },

  _toggleNavigationDisplay: function() {
    navigationManuallyToggled = true;

    if ($(document.body).hasClass(classes$16.navigationOpen)) {
      this.hideNavigation();
    } else {
      this.showNavigation();
    }
  },

  _adjustNavigationPadding: function() {
    this.headerHeight = $(selectors$17.siteHeader).height();
    $(selectors$17.navigation, this.$container).css({
      top: this.headerHeight + 'px',
      'min-height': 'calc(100vh - ' + this.headerHeight + 'px)',
      'max-height': 'calc(100vh - ' + this.headerHeight + 'px)'
    });
  },

  _promiseNavTransition: function(active) {
    $(document.body)
      .addClass(classes$16.navigationTransitioning)
      .toggleClass(classes$16.navigationOpen, active);

    $(window).scrollTop(this.scrollTop);

    return utils
      .promiseTransitionEnd($(selectors$17.navigation, this.$container))
      .then(function() {
        $(document.body).removeClass(classes$16.navigationTransitioning);
      });
  },

  _promiseNavItemsTransition: function(elements, active) {
    return utils.mapPromiseSeries(elements, function(index, element) {
      var $element = $(element);

      $element.toggleClass(classes$16.navigationEntranceActive, active);

      return utils.promiseTransitionEnd($element);
    });
  },

  _closeOnEscape: function(evt) {
    if (evt.keyCode === 27) {
      this.hideNavigation();
    }
  },

  _toggleNavigationSublinks: function(evt) {
    var $anchor = $(evt.currentTarget);
    var $parent = $anchor.parent();
    var isExpanded = $anchor.attr('aria-expanded') === 'true';
    var $childSublinks = $parent.find(selectors$17.navigationExpandChildSublinks);

    $parent.toggleClass(classes$16.navigationHasSublinksCollapsed);
    $parent
      .siblings(selectors$17.navigationHasSublinks)
      .addClass(classes$16.navigationHasSublinksCollapsed)
      .children(selectors$17.navigationExpandSublinks)
      .attr('aria-expanded', false);

    this._setMaxHeight($parent.siblings(selectors$17.navigationHasSublinks), '');

    if ($childSublinks.length) {
      this._updateSublinkMaxHeight($anchor);
    }

    $anchor.attr('aria-expanded', !isExpanded);
    this._toggleSubNavigationElementHeight($anchor);
  },

  _updateSublinkMaxHeight: function($anchor) {
    var isChildSublink = $anchor.hasClass(
      classes$16.navigationExpandChildSublinks
    );

    if (!isChildSublink) {
      return;
    }

    var $sublinkContainer = $anchor.closest(
      selectors$17.navigationSublinksContainer
    );
    var $childSublinks = $sublinkContainer.find(
      selectors$17.navigationHasSublinks
    );

    var maxHeight = $sublinkContainer.data('max-height');

    $childSublinks.each(function() {
      var $el = $(this);

      if ($el.hasClass(classes$16.navigationHasSublinksCollapsed)) {
        return;
      }

      var $childSublink = $el.find(selectors$17.navigationChildSublinks);
      var $parent = $childSublink.parent();

      maxHeight += $parent.data('max-height');
    });

    $sublinkContainer.css('max-height', maxHeight);
  },

  _setSublinksMaxHeight: function() {
    $(selectors$17.navigationSublinks, this.$container).each(function() {
      var $el = $(this);
      var $parent = $el.parent();
      var sublinkHeight = $el.outerHeight();

      $parent
        .data('max-height', sublinkHeight)
        .css('max-height', sublinkHeight);
    });
  },

  _toggleSubNavigationElementHeight: function($anchor) {
    var $currentListItem = $anchor.parent('li');
    if ($currentListItem.hasClass(classes$16.navigationHasSublinksCollapsed)) {
      this._setMaxHeight($currentListItem, '');
    } else {
      if ($currentListItem.hasClass(selectors$17.navigationSublink)) {
        this._updateSublinkMaxHeight($currentListItem);
        return;
      }
      this._setMaxHeight($currentListItem, 'none');
    }
  },

  _setMaxHeight: function(element, maxHeight) {
    element.css('max-height', maxHeight);
  }
});

/*

List Collections Template Section
--------------------------------------------------------------------------------
Creates a staggered card grid for the list collections template.

*/

// Extensions
// Libs
sections.register('list-collections-template', {
  onLoad: function() {
    this.extend(cardManager);
  }
});

var promiseGoogleMapsAPI;

var errors = {
  zeroResults: theme.strings.map && theme.strings.map.zeroResults,
  overQueryLimit: theme.strings.map && theme.strings.map.overQueryLimit,
  authError: theme.strings.map && theme.strings.map.authError,
  requestDenied: theme.strings.map && theme.strings.map.addressError,
  geocodeUnknownError: theme.strings.map && theme.strings.map.addressError,
  missingKey: theme.strings.map && theme.strings.map.addressError,
  apiLoadError: theme.strings.map && theme.strings.map.authError
};

function errorMessage(status) {
  var error;

  switch (status) {
    case 'ZERO_RESULTS':
      error = errors.zeroResults;
      break;
    case 'OVER_QUERY_LIMIT':
      error = errors.overQueryLimit;
      break;
    case 'REQUEST_DENIED':
      error = errors.requestDenied;
      break;
    case 'UNKNOWN_ERROR':
      error = errors.geocodeUnknownError;
      break;
    default:
      error = errors.geocodeUnknownError;
  }

  return error;
}

var googleMaps = {
  promiseAPI: function(key) {
    key = key || '';

    if (typeof promiseGoogleMapsAPI === 'undefined') {
      promiseGoogleMapsAPI = $.getScript(
        'https://maps.googleapis.com/maps/api/js?key=' + key
      );
    }

    return promiseGoogleMapsAPI.then(function() {
      return $.Deferred(function(defer) {
        if (!window.google || !window.google.maps) {
          defer.reject(errors.apiLoadError);
        }

        defer.resolve(window.google);
      });
    });
  },

  promiseGeocode: function(address) {
    return this.promiseAPI().then(function(google) {
      return $.Deferred(function(defer) {
        var geocoder;

        // Global function called by Google on auth errors.
        window.gm_authFailure = function() {
          // eslint-disable-line camelcase
          defer.reject(errors.authError);
        };

        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, function(results, status) {
          if (status !== google.maps.GeocoderStatus.OK) {
            defer.reject(errorMessage(status));
          }
          defer.resolve(results);
        });
      });
    });
  },

  promiseMap: function(config) {
    return $.when(
      this.promiseAPI(config.key),
      this.promiseGeocode(config.address)
    ).then(function(google, results) {
      return $.Deferred(function(defer) {
        var map;
        var center = results[0].geometry.location;
        var mapOptions = $.extend(
          {},
          {
            zoom: 14,
            center: center,
            disableDefaultUI: true
          },
          config
        );

        // Global function called by Google on auth errors.
        // Show an auto error message on all map instances.
        window.gm_authFailure = function() {
          // eslint-disable-line camelcase
          defer.reject(errors.authError);
        };

        map = new google.maps.Map(config.container, mapOptions);
        map.centerMarker = new google.maps.Marker({
          map: map,
          position: map.getCenter()
        });

        google.maps.event.addDomListener(
          window,
          'resize',
          debounce(function() {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
          }, 250)
        );

        return defer.resolve(map);
      });
    });
  }
};

/*

Map Section
--------------------------------------------------------------------------------
Loads a static map in the background of the section

*/

// Libs
var selectors$18 = {
  map: '.map-section__container',
  mapError: '.map-section__error-message'
};

var classes$17 = {
  mapError: 'map-section--load-error'
};

sections.register('map', {
  onLoad: function() {
    this.$container = $(this.container);
    this.$map = $(selectors$18.map, this.$container);
    this.key = this.$map.data('api-key');

    if (typeof this.key !== 'string' || this.key === '') return;

    var config = {
      key: this.key,
      container: this.$map[0],
      address: this.$map.data('address-setting')
    };

    utils
      .promiseStylesheet()
      .then(function() {
        return googleMaps.promiseMap(config);
      })
      .then(
        function(map) {
          this.map = map;
        }.bind(this)
      )
      .catch(
        function(error) {
          this.$container.addClass(classes$17.mapError);

          // Only show error in the theme editor
          if (Shopify.designMode) {
            $(selectors$18.mapError, this.$container)
              .html(error)
              .css('display', 'inline-block');
          }
        }.bind(this)
      );
  }
});

/*

Newsletter Section
--------------------------------------------------------------------------------
Overrides default HTML5 error checking for the newsletter section.

*/

// Libs
var selectors$19 = {
  emailField: '#EmailField',
  inputGroup: '.input-group--underline',
  submitButton: '.btn--newsletter__submit',
  newsletterMessage: '.newsletter__message'
};

var errors$1 = {
  blankError: theme.strings.newsletter && theme.strings.newsletter.blankError,
  invalidError:
    theme.strings.newsletter && theme.strings.newsletter.invalidError
};

sections.register('newsletter', {
  onLoad: function() {
    if ($('html').hasClass('is-ios') && Shopify.designMode) {
      $(selectors$19.inputGroup, this.$container).addClass('has-animated');
    }

    this.$container.on(
      'click',
      selectors$19.submitButton,
      this._checkEmail.bind(this)
    );
  },

  _checkEmail: function() {
    var emailFieldID =
      selectors$19.emailField + this.$container.data('section-id');
    var $emailField = $(emailFieldID, this.$container);
    var $newsletterMessage = $(selectors$19.newsletterMessage, this.$container);
    var errorMessage;
    var emailValue = $emailField[0].value;
    var emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailValue === '') {
      errorMessage = errors$1.blankError;
    } else if (!emailRegExp.test(emailValue)) {
      errorMessage = errors$1.invalidError;
    }

    if (typeof errorMessage !== 'undefined') {
      $newsletterMessage.html('<p class="errors">' + errorMessage + '</p>');
      return false;
    } else {
      $newsletterMessage.html('');
    }
  }
});

/*

Product Recommendations Section
--------------------------------------------------------------------------------
Creates a staggered card grid for the product recommendations section.

*/

// Libs
var selectors$20 = {
  productRecommendationSlider: '[data-recommendations-slider]',
  productRecommendationSlides: '[data-recommendations-slide]',
  indicatorsWrapper: '[data-recommendations-indicators]',
  indicator: '[data-recommendations-indicator]',
  productRecommendationIndicatorIndex: function(index) {
    return '[data-product-recommendation-indicator-index="' + index + '"]';
  }
};

var classes$18 = {
  indicatorActive: 'product-recommendations__slide-indicator--active'
};

var mobileMediaQuery = '(max-width: 749px)';

sections.register('product-recommendations', {
  onLoad: function() {
    this.didShowRecommendations = false;

    var productId = this.$container.data('productId');
    var recommendationsSectionUrl =
      '/recommendations/products?&section_id=product-recommendations&product_id=' +
      productId +
      '&limit=4';

    utils
      .promiseStylesheet()
      .then(function() {
        return $.get(recommendationsSectionUrl);
      })
      .then(
        function(section) {
          var recommendationsMarkup = $(section).html();
          if (recommendationsMarkup.trim() !== '') {
            this.$container.html(recommendationsMarkup);
            this._initProductRecommendations();

            this.didShowRecommendations = true;
          }
        }.bind(this)
      );
  },

  _initProductRecommendations: function() {
    this.eventHandlers = {};
    this.mql = window.matchMedia(mobileMediaQuery);
    this._setupEventHandlers();
    this._mediaQueryHandler();
  },

  _setupEventHandlers: function() {
    this.eventHandlers._mediaQueryHandler = this._mediaQueryHandler.bind(this);
    this.eventHandlers._updateIndicatorActiveState = this._updateIndicatorActiveState.bind(
      this
    );

    this.mql.addListener(this.eventHandlers._mediaQueryHandler);
  },

  _mediaQueryHandler: function() {
    if (this.mql.matches) {
      this._initializeMobileSlider();
    } else {
      this._destroyMobileSlider();
    }
  },

  _initializeMobileSlider: function() {
    this.$slider =
      this.$slider ||
      this.$container.find(selectors$20.productRecommendationSlider);
    this.$slides =
      this.$slides || this.$slider.find(selectors$20.productRecommendationSlides);

    // Don't init the slider if we have less than 2 slides
    if (this.$slides.length < 2) {
      return;
    }

    this.$indicatorsWrapper =
      this.$indicatorsWrapper ||
      this.$container.find(selectors$20.indicatorsWrapper);

    this.$indicators =
      this.$indicators || this.$indicatorsWrapper.find(selectors$20.indicator);

    this.$slider.on(
      'scroll',
      { passive: true },
      this.eventHandlers._updateIndicatorActiveState
    );

    this._updateIndicatorActiveState();
  },

  _destroyMobileSlider: function() {
    if (!this.$slider) {
      return;
    }

    this.$slider.off('scroll');
  },

  _updateIndicatorActiveState: function() {
    this.$indicators.removeClass(classes$18.indicatorActive);

    var scrollLeft = this.$slider.scrollLeft();
    var numberOfSlides = this.$slides.length;
    var slideWidth = this.$slider[0].scrollWidth / numberOfSlides;
    var activeIndicatorIndex = Math.round(scrollLeft / slideWidth) + 1;

    var $indicator = this.$container.find(
      selectors$20.productRecommendationIndicatorIndex(activeIndicatorIndex)
    );

    $indicator.addClass(classes$18.indicatorActive);
  },

  onUnload: function() {
    if (!this.didShowRecommendations) {
      return;
    }

    this.mql.removeListener(this.eventHandlers._mediaQueryHandler);
    this._destroyMobileSlider();
  }
});

/*

Product Slideshow Extension
--------------------------------------------------------------------------------
Adds the product slideshow functionality to a section

Events
---------

Name: product_slideshow_show
Description: Fired when the slideshow is opened
Payload: none

Name: product_slideshow_hide
Description: Fired when the slideshow is closed
Payload: none

Name: product_slideshow_set_slide
Description: Fired when the slide is being set
Payload: { number } Index of the slide

Name: product_slideshow_next
Description: Fired when the next button is clicked
Payload: none

Name: product_slideshow_previous
Description: Fired when the previous button is clicked
Payload: none

*/

var classes$20 = {
  lazypreload: 'lazypreload',
  showProductSlideshow: 'product-slideshow--show',
  productSlideshowSelectActive: 'product-slideshow__slide-select--active'
};

var selectors$22 = {
  slider: '.slider',
  productSlideshow: '.product-slideshow',
  productSlideshowOpen: '.product-slideshow__open',
  productSlideshowSlide: '[data-product-slideshow-slide]',
  productSlideshowImage: '[data-product-slideshow-image]',
  productSlideshowNext: '[data-product-slideshow-next]',
  productSlideshowSelect: '[data-product-slideshow-select]',
  productSlideshowPrevious: '[data-product-slideshow-previous]',
  productSlideshowClose: '[data-product-slideshow-close]'
};

var productSlideshow = {
  init: function() {
    this.$productSlideshow = $(selectors$22.productSlideshow, this.$container);

    // If there are not enough images on the page we won't have a slideshow, so
    // return.
    if (this.$productSlideshow.length === 0) return;

    $(selectors$22.productSlideshowOpen).on(
      'click',
      this._onImageClick.bind(this)
    );

    // The product slideshow is shipped from the server inside the product template
    // section HTML. For styling reasons, the slideshow HTML needs to live as
    // the last child of body.
    this.$productSlideshow.appendTo(document.body);

    // Check how many slides we have for the slideshow. If we only have one, then
    // we don't need any slide controls, so no need to initialize the Slider() lib
    this.slideCount = $(
      selectors$22.productSlideshowSlide,
      this.$productSlideshow
    ).length;
    if (this.slideCount > 1) {
      this.slider = new Slider($(selectors$22.slider, this.$productSlideshow));
    }
  },

  showSlideshow: function() {
    this.trigger('product_slideshow_show');

    // Cache the image that was clicked so that when we close the slideshow, we
    // can return the focus to it.
    this.$slideshowOpenFocus = $(document.activeElement);

    // Add the lazysizes preload class so that we start preloading all slideshow
    // images
    $(selectors$22.productSlideshowImage, this.$productSlideshow).addClass(
      classes$20.lazypreload
    );

    // Get the header section so that we can turn off the scroll handling so that
    // it doesn't disappear when we open the slideshow.
    return sections.getInstances('header-section').then(
      function(instances) {
        instances[0].scrollHandler = false;

        this._assignEventHandlers();

        a11y$1.trapFocus({
          $container: this.$productSlideshow,
          namespace: 'product-slideshow'
        });

        this.$productSlideshow
          .addClass(classes$20.showProductSlideshow)
          .attr('aria-hidden', false);

        utils.disableScrollBody();
        utils.enableTabbingOfChildren(this.$productSlideshow);
      }.bind(this)
    );
  },

  hideSlideshow: function() {
    this.trigger('product_slideshow_hide');

    return sections.getInstances('header-section').then(
      function(instances) {
        instances[0].scrollHandler = true;
        this._removeEventHandlers();

        a11y$1.removeTrapFocus({ namespace: 'product-slideshow' });

        utils.enableScrollBody();
        utils.disableTabbingOfChildren(this.$productSlideshow);

        this.$productSlideshow
          .removeClass(classes$20.showProductSlideshow)
          .attr('aria-hidden', true);
        this.$slideshowOpenFocus.focus();
      }.bind(this)
    );
  },

  setSlide: function(id) {
    if (this.slideCount <= 1) return;

    var index = this._getSlideIndex(id);

    this.trigger('product_slideshow_set_slide', [index]);

    return this.slider.setSlide(index); // eslint-disable-line consistent-return
  },

  _onImageClick: function(evt) {
    // By default the image is a link, so prevent going to the image link
    evt.preventDefault();
    var id = $(evt.currentTarget).data('id');

    if (typeof id === 'number') {
      this.setSlide(id);
      this.showSlideshow();
    }
  },

  _assignEventHandlers: function() {
    // Use `.one()` instead of `.on()` because we want to listen and respond
    // to one key input at a time. For example, if you hit the forward arrow button
    // really fast while the slide is still animating, we don't want it to keep
    // animating for all the times that you mashed the key.
    $(document).one('keyup.product-slideshow', this._onKeyup.bind(this));

    this.$productSlideshow
      .on('slidetransitionend', this._setSlideIndicator.bind(this))
      .on('click', selectors$22.productSlideshowSelect, this._setSlide.bind(this))
      .one(
        'click',
        selectors$22.productSlideshowClose,
        this.hideSlideshow.bind(this)
      )
      .one('click', selectors$22.productSlideshowNext, this._nextSlide.bind(this))
      .one(
        'click',
        selectors$22.productSlideshowPrevious,
        this._previousSlide.bind(this)
      );
  },

  _removeEventHandlers: function() {
    this.$productSlideshow.off();
    $(document).off('.product-slideshow');
  },

  _getSlideIndex: function(id) {
    return $(selectors$22.productSlideshowSlide, this.$productSlideshow)
      .filter('[data-id="' + id + '"]')
      .index();
  },

  _setSlide: function(evt) {
    var $navButton = $(evt.target);
    var index = $navButton.index();

    this.trigger('product_slideshow_set_slide', [index]);
    this.slider.setSlide(index, true);
  },

  _nextSlide: function() {
    this.trigger('product_slideshow_next');
    this.trigger('product_slideshow_set_slide', [
      this.slider.$nextSlide.index()
    ]);

    return this.slider.nextSlide().then(
      function() {
        this.$productSlideshow.one(
          'click',
          selectors$22.productSlideshowNext,
          this._nextSlide.bind(this)
        );
      }.bind(this)
    );
  },

  _previousSlide: function() {
    this.trigger('product_slideshow_previous');
    this.trigger('product_slideshow_set_slide', [
      this.slider.$previousSlide.index()
    ]);

    return this.slider.previousSlide().then(
      function() {
        this.$productSlideshow.one(
          'click',
          selectors$22.productSlideshowPrevious,
          this._previousSlide.bind(this)
        );
      }.bind(this)
    );
  },

  _setSlideIndicator: function(evt, data) {
    var index = data.$currentSlide.index();

    $(selectors$22.productSlideshowSelect, this.$productSlideshow)
      .eq(index)
      .addClass(classes$20.productSlideshowSelectActive)
      .siblings()
      .removeClass(classes$20.productSlideshowSelectActive);
  },

  _onKeyup: function(evt) {
    // Assign the default transition value to be a resolved promise so that if
    // we don't end up assigning a real transition (next, prev, esc) then we
    // immediately attach another keyup event handler.
    var promiseTransition = $.Deferred().resolve();

    switch (evt.keyCode) {
      case 37:
        promiseTransition = this.slider.previousSlide();
        break;
      case 39:
        promiseTransition = this.slider.nextSlide();
        break;
      case 27:
        this.hideSlideshow();
        promiseTransition = $.Deferred().reject();
        break;
    }

    promiseTransition.then(
      function() {
        // When the transition is done, then start listening for a keyup event again
        $(document).one('keyup', this._onKeyup.bind(this));
      }.bind(this)
    );
  }
};

/*

Product Template Section
--------------------------------------------------------------------------------
Shows a product and allows the user to select product variants and add the product
to their cart. Adds a product image slideshow that can be viewed when you select
an image on the page. Adds expanding social sharing buttons.

*/

// Extensions
// Libs
var selectors$21 = {
  productFormWrapper: '.product__form-wrapper',
  productDescription: '.product__description'
};

var classes$19 = {
  productFormFixed: 'product__form-wrapper--fixed',
  productFormBottom: 'product__form-wrapper--bottom'
};

var formStickyTop = 80;

sections.register('product-template', {
  onLoad: function() {
    this.coverPosition = 'top';

    this.extend(productSlideshow);
    this.extend(socialSharing);
    this.extend(productDisplay);

    this.window().on('scroll', this._setFormPosition.bind(this));
    this.window().on(
      'resize',
      debounce(this._callResizeFunctions.bind(this), 500)
    );

    this.on('variant_add_to_cart', this._updateMeasurements.bind(this));
    this.on('variant_change', this._updateHistoryState.bind(this));

    this.document().on(
      'drawer_open_start',
      this._handleFixedSideImage.bind(this)
    );
    this.document().on(
      'drawer_close_done',
      this._resetFixedSideImage.bind(this)
    );

    utils.promiseStylesheet().then(
      function() {
        this._updateMeasurements();
      }.bind(this)
    );
  },

  _callResizeFunctions: function() {
    this._updateMeasurements();
    this._formatVariantSelectors();
  },

  _handleFixedSideImage: function() {
    if (this.coverPosition !== 'fixed') return;

    var scrollTop = $(window).scrollTop();
    var translate = scrollTop - this.fixedTop + 2 * formStickyTop + 28;

    $(selectors$21.productFormWrapper, this.$container).css({
      transform: 'translateY(' + translate + 'px)',
      position: 'absolute'
    });
  },

  _resetFixedSideImage: function() {
    if (this.coverPosition !== 'fixed') return;

    $(selectors$21.productFormWrapper, this.$container).css({
      transform: '',
      position: ''
    });
  },

  _updateHistoryState: function(event, instance, product, variant) {
    if (!history.replaceState) return;

    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?variant=' +
      variant.id;
    window.history.replaceState({ path: newurl }, '', newurl);
  },

  _setFormPosition: function() {
    if (utils.isMobile() || !this.enableSticky) return;

    var scrollTop = $(window).scrollTop();

    // Debounce DOM edits to next frame with requestAnimationFrame
    requestAnimationFrame(
      function() {
        if (scrollTop > this.fixedTop) {
          if (scrollTop > this.fixedBottom) {
            // Fix to bottom
            this.coverPosition = 'bottom';
            $(selectors$21.productFormWrapper)
              .css('width', this.formWidth)
              .removeClass(classes$19.productFormFixed)
              .addClass(classes$19.productFormBottom);
          } else {
            // Fix to the side
            this.coverPosition = 'fixed';
            $(selectors$21.productFormWrapper)
              .css('width', this.formWidth)
              .addClass(classes$19.productFormFixed)
              .removeClass(classes$19.productFormBottom);
          }
        } else {
          // Fix to the top
          this.coverPosition = 'top';
          $(selectors$21.productFormWrapper)
            .css('width', '')
            .removeClass(classes$19.productFormFixed)
            .removeClass(classes$19.productFormBottom);
        }
      }.bind(this)
    );
  },

  _updateMeasurements: function() {
    var $formWrapper = $(selectors$21.productFormWrapper);
    var descriptionHeight = $(selectors$21.productDescription).outerHeight(true);
    var formHeight = $formWrapper.height();

    this.enableSticky = descriptionHeight > formHeight;

    if (!this.enableSticky) return;

    this.fixedTop = $formWrapper.parent().offset().top - formStickyTop;
    this.fixedBottom = this.fixedTop + descriptionHeight - formHeight;
    this.formWidth = $formWrapper.parent().width();

    this._setFormPosition();
  }
});

var selectors$23 = {
  slider: '.quotes-slider',
  slide: '.quotes-slide'
};

var classes$21 = {
  visible: 'quotes-slide--visible'
};

sections.register('quotes-section', {
  onLoad: function() {
    this.$container = $(this.container);
    this.$slider = $(selectors$23.slider, this.$container);
    this.totalSlides = this.$slider.data('count');
    this.speed = this.$slider.data('speed');
    this.currentSlide = 0;

    if (this.$slider.find(selectors$23.slide).length > 1) {
      this._startSlider();
    }
  },

  _startSlider: function() {
    this.interval = setInterval(
      function() {
        if (this.currentSlide + 1 >= this.totalSlides) {
          this.currentSlide = 0;
        } else {
          this.currentSlide++;
        }

        this._showSlide(selectors$23.slide + '--' + this.currentSlide);
      }.bind(this),
      this.speed
    );
  },

  _showSlide: function(slide) {
    this.$slider
      .find(selectors$23.slide)
      .removeClass(classes$21.visible)
      .end()
      .find(slide)
      .addClass(classes$21.visible);
  },

  onBlockSelect: function(evt) {
    clearInterval(this.interval);

    var $selectedSlide = this.$container.find(
      selectors$23.slide + '--' + evt.detail.blockId
    );

    this._showSlide($selectedSlide);
  },

  onBlockDeselect: function() {
    this._startSlider();
  }
});

/*

Search Template Section
--------------------------------------------------------------------------------
Creates a staggered card grid for the search template.

*/

// Extensions
// Libs
sections.register('search-template', {
  onLoad: function() {
    this.extend(cardManager);
  }
});

var promiseYoutubeAPI;

var youtube = {
  promiseAPI: function() {
    if (!promiseYoutubeAPI) {
      var tag = document.createElement('script');

      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      promiseYoutubeAPI = $.Deferred(function(defer) {
        window.onYouTubeIframeAPIReady = defer.resolve;

        setTimeout(function() {
          defer.reject('Request for YouTube API timed out after 30 seconds.');
        }, 30000);
      });
    }

    return promiseYoutubeAPI;
  },

  promisePlayer: function(id, options) {
    return this.promiseAPI().then(function() {
      return $.Deferred(function(defer) {
        if (typeof window.YT === 'undefined') {
          defer.reject(
            "We're sorry, something went wrong. The YouTube API has not loaded correctly."
          );
        }

        /* eslint-disable no-undef */
        var player = new YT.Player(id, options); // global YT variable injected by YouTube API

        player.addEventListener('onReady', function() {
          defer.resolve(player);
        });

        setTimeout(function() {
          defer.reject(
            'Request for YouTube player has timed out after 30 seconds.'
          );
        }, 30000);
      });
    });
  }
};

var promiseVimeoAPI;

var vimeo = {
  promiseAPI: function() {
    if (!promiseVimeoAPI) {
      promiseVimeoAPI = $.Deferred(function(defer) {
        var tag = document.createElement('script');
        tag.src = 'https://player.vimeo.com/api/player.js';
        tag.onload = tag.onreadystatechange = function() {
          if (!this.readyState || this.readyState === 'complete') {
            defer.resolve();
          }
        };

        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        setTimeout(function() {
          defer.reject('Request for Vimeo API timed out after 30 seconds.');
        }, 30000);
      });
    }

    return promiseVimeoAPI;
  },

  promisePlayer: function(id, options) {
    return this.promiseAPI().then(function() {
      return $.Deferred(function(defer) {
        if (typeof window.Vimeo === 'undefined') {
          defer.reject(
            "We're sorry, something went wrong. The Vimeo API has not loaded correctly."
          );
        }

        var player = new window.Vimeo.Player(id, options);

        setTimeout(function() {
          defer.reject(
            'Request for Vimeo player has timed out after 30 seconds.'
          );
        }, 30000);

        player.ready().then(function() {
          defer.resolve(player);
        });
      });
    });
  }
};

/*

Slideshow Desktop Extension
--------------------------------------------------------------------------------
Manages all the desktop behaviour of the home page slideshow


Events
------------

Name: slideshow_desktop_init_start
Description: Fired before the desktop slideshow begins to initialize
Payload: none

Name: slideshow_desktop_init_done
Description: Fired when the desktop slideshow is done initializing
Payload: none

Name: slideshow_desktop_destroy
Description: Fired when the desktop slideshow is destroyed
Payload: none

Name: slideshow_set_slide
Description: Fired when the user selects a specific slide
Payload: { number } Index of the slide being displayed

Name: slideshow_previous_slide
Description: Fired when the user selects the previous slide
Payload: { number } Index of the slide being displayed

Name: slideshow_next_slide
Description: Fired when the user selects the next slide
Payload: { number } Index of the slide being displayed

Name: slideshow_video_load
Description: Fired when a video is being loaded in the slideshow
Payload: { object } Video player DOM object

Name: slideshow_video_loaded
Description: Fired when the video is done loading in the slideshow
Payload: { object } Video player DOM object

*/

var selectors$25 = {
  buttons: '.slideshow__buttons',
  button: '.slideshow__button',
  pauseButton: '[data-pause-button]',
  label: '.slideshow__button-label',
  cta: '.slideshow__button-cta--desktop',
  ctaText: '.slideshow__heading-cta-text',
  slide: '.slideshow__slide',
  slideshow: '.slideshow',
  video: '.slideshow__video'
};

var classes$23 = {
  centredCta: 'slideshow--center-cta',
  buttonActive: 'slideshow__button--active',
  headingCtaActive: 'slideshow__heading-cta-text--active',
  headingCtaTransitioning: 'slideshow__heading-cta-text--transitioning',
  linkActive: 'slideshow__button--link',
  slideActive: 'slideshow__slide--active',
  slideActiveTransitioning: 'slideshow__slide--transitioning',
  videoLoaded: 'slideshow__video--loaded',
  videoPaused: 'slideshow__video--paused',
  paused: 'is-paused'
};

var config = {
  // Intensity for desktop mouse over effect (if more than 3 slides)
  easeIntensity: 10
};

var slideshowDesktop = {
  initDesktopSlideshow: function() {
    this.trigger('slideshow_desktop_init_start');

    this.$slideshow = $(selectors$25.slideshow, this.$container);
    this.$slide = $(selectors$25.slide, this.$container);
    this.$buttons = $(selectors$25.buttons, this.$container);
    this.$button = $(selectors$25.button, this.$container);

    this.desktopSlideshow = true;
    this.isAnimating = false;
    this.currentDesktopSlide = 0;
    this.totalSlides = this.$buttons.data('count');
    this.players = [];
    this.desktopSlideshowNamespace = '.desktopSlideshow';

    this.on(
      'mouseover' + this.desktopSlideshowNamespace,
      this._onHoverSlideshow.bind(this)
    );
    this.on(
      'mousemove' + this.desktopSlideshowNamespace,
      this._mouseMoveButtons.bind(this)
    );
    this.on(
      'mouseleave' + this.desktopSlideshowNamespace,
      this._resetButtonsPosition.bind(this)
    );
    this.on(
      'keydown' + this.desktopSlideshowNamespace,
      this._onTabButtons.bind(this)
    );
    this.on(
      'click' + this.desktopSlideshowNamespace,
      selectors$25.pauseButton,
      this._onPauseButton.bind(this)
    );
    this.on(
      'click' + this.desktopSlideshowNamespace,
      selectors$25.label,
      this._onClickButton.bind(this)
    );
    this.on(
      'keydown' + this.desktopSlideshowNamespace,
      this._addKeyBindingsDesktop.bind(this)
    );

    this.window().on(
      'resize' + this.desktopSlideshowNamespace,
      this._setButtonWrapperValues.bind(this)
    );

    utils.promiseStylesheet().then(
      function() {
        this._setButtonWrapperValues();
        this._setSlideDesktop(0);
        if (this.$container.hasClass(classes$23.centredCta)) {
          this._setButtonStatus(0);
        }
        this.trigger('slideshow_desktop_init_done');
      }.bind(this)
    );
  },

  destroyDesktopSlideshow: function() {
//     DOTMAGIC
//     return
    console.log('here');
    this.trigger('slideshow_desktop_destroy');

    this.desktopSlideshow = false;
    this.off(this.desktopSlideshowNamespace);
    this.window().off(this.desktopSlideshowNamespace);

    this._setButtonsTranslateX(0);

    // Loop over every video slide that is found as part of this.players
    // and explicitly call the YouTube and/or Vimeo destroy method
    // depending on the type of video player.
    for (var key in this.players) {
      if (!this.players.hasOwnProperty(key)) return;

      var player = this.players[key];

      if (typeof player.destroy === 'function') {
        player.destroy();
      } else if (typeof player.unload === 'function') {
        player.unload();
      }
    }

    this.players = [];
  },

  _onHoverSlideshow: function() {
    this._animateButtonFrame();
  },

  _mouseMoveButtons: function(evt) {
    if (this.totalSlides <= 3) return;

    this.mousePosition = evt.pageX - this.centerOfButtonsWrapper;

    if (!this.isAnimating) {
      this.isAnimating = true;
      this._animateButtonFrame();
    }
  },

  _resetButtonsPosition: function() {
    this.mousePosition = 0;
  },

  _onTabButtons: function(evt) {
    if (evt.which !== utils.keyboardKeys.TAB) return;

    var $nextButton;

    if (!evt.shiftKey) {
      $nextButton = $(evt.target)
        .closest(this.$button)
        .next();
    } else {
      $nextButton = $(evt.target)
        .closest(this.$button)
        .prev();
    }

    if (!$nextButton.length) return;

    var division = $(window).width() / this.totalSlides;
    var buttonIndex = $nextButton.index();

    this.mousePosition = division * buttonIndex - $nextButton.width();
    this._animateButtonFrame();
  },

  _onPauseButton: function(evt) {
    var $currentSlide = this.$slide.eq(this.currentDesktopSlide);
    var $pauseButton = $(evt.target);
    var isPaused = $pauseButton.hasClass(classes$23.paused);
    var blockId = this.$video.attr('data-block-id');

    $pauseButton.toggleClass(classes$23.paused, !isPaused).attr({
      'aria-label': isPaused
        ? $pauseButton.data('label-pause')
        : $pauseButton.data('label-play'),
      'aria-pressed': !isPaused
    });

    if (this.players[blockId]) {
      if (isPaused) {
        this.players[blockId].playVideo();
      } else {
        this.players[blockId].pauseVideo();
      }
    }
    $currentSlide.toggleClass(classes$23.videoPaused);
  },

  _onClickButton: function(evt) {
    var $buttonClicked = $(evt.target).closest(selectors$25.button);

    if ($buttonClicked.hasClass(classes$23.buttonActive)) return;

    var index = $buttonClicked.index();

    this._setSlideDesktop(index);

    // Allow first slide to be clicked after initial load
    if (!$buttonClicked.hasClass(classes$23.buttonActive)) {
      this._setButtonStatus(index);
    }
  },

  _setButtonStatus: function(index) {
    var $button = this.$button.eq(index);
    var $buttonText = $button.find(selectors$25.ctaText);

    this.$button
      .removeClass(classes$23.buttonActive)
      .find(selectors$25.label)
      .attr('aria-expanded', false);

    $button
      .addClass(classes$23.buttonActive)
      .find(selectors$25.label)
      .attr('aria-expanded', true)
      .focus();

    this.$buttons
      .find(selectors$25.ctaText)
      .empty()
      .attr('aria-hidden', true)
      .removeClass(classes$23.headingCtaActive)
      .removeAttr('style');

    if ($buttonText.parent().is('a')) {
      this._showButtonContent($buttonText);
    }

    this.$button.find(selectors$25.cta).attr('tabindex', '-1');
    if ($button.hasClass(classes$23.linkActive)) {
      $button.find(selectors$25.cta).attr('tabindex', '0');
    }
  },

  _animateButtonFrame: function() {
    var deltaPosition = this.mousePosition - this.xPosition;
    // Calculates the differential ratio between the width of the button wrapper
    // and the overflowed button element that actually animates.
    var widthDifferenceRatio =
      this.buttonsInnerWidth / this.buttonsWrapperWidth - 1;

    // deltaPosition represents the momentum and will increment down every frame
    // until it reaches < 1, the buttons will then stop animating.
    if (Math.abs(deltaPosition) < 1) {
      this.isAnimating = false;
      return;
    }

    // This represents the mouse position relative to the slideshow width
    // where this.xPosition equals 0 if the mouse position is in the center.
    this.xPosition += deltaPosition / config.easeIntensity;

    this._setButtonsTranslateX(-(this.xPosition * widthDifferenceRatio));

    // This function is called recursively until the condition above is met,
    // meaning once the buttons have stopped animating.
    requestAnimationFrame(this._animateButtonFrame.bind(this));
  },

  _showButtonContent: function($buttonText) {
    var buttonText = $buttonText.data('button-text');

    $buttonText.html(buttonText).attr('aria-hidden', false);

    if (
      !$buttonText.attr('data-new-width') ||
      !$buttonText.attr('data-new-height')
    ) {
      $buttonText.attr('data-new-width', $buttonText.outerWidth());
      $buttonText.attr('data-new-height', $buttonText.outerHeight());
    }

    var newButtonContentWidth = $buttonText.attr('data-new-width');
    var newButtonContentHeight = $buttonText.attr('data-new-height');

    $buttonText.empty();

    requestAnimationFrame(function() {
      $buttonText
        .css({
          minHeight: newButtonContentHeight + 'px',
          minWidth: newButtonContentWidth + 'px'
        })
        .addClass(classes$23.headingCtaTransitioning);
    });

    utils.promiseTransitionEnd($buttonText).then(function() {
      $buttonText
        .html(buttonText)
        .removeClass(classes$23.headingCtaTransitioning)
        .addClass(classes$23.headingCtaActive);
    });
  },

  _setButtonsTranslateX: function(xPosition) {
    this.$buttons.css({
      transform: 'translate3d(' + xPosition + 'px, 0, 0)'
    });
  },

  _addKeyBindingsDesktop: function(evt) {
    if (evt.which === utils.keyboardKeys.LEFTARROW) {
      this._previousSlideDesktop();
    } else if (evt.which === utils.keyboardKeys.RIGHTARROW) {
      this._nextSlideDesktop();
    }
  },

  _previousSlideDesktop: function() {
    if (this.currentDesktopSlide === 0) return;

    this._setSlideDesktop(this.currentDesktopSlide - 1);
  },

  _nextSlideDesktop: function() {
    if (this.currentDesktopSlide === this.totalSlides - 1) return;

    this._setSlideDesktop(this.currentDesktopSlide + 1);
  },

  _setSlideDesktop: function(slideIndex) {
    var $currentSlide = this.$slide.eq(this.currentDesktopSlide);
    var $nextSlide = this.$slide.eq(slideIndex);
    var $video = $nextSlide.find(selectors$25.video);

    // We call _loadVideo() before we check to see if
    // this.currentDesktopSlide === slideIndex (below). This would never fire
    // on initial load if it was after the condition below since 0 === 0
    // would return true.
    if ($video.length) {
      this._loadVideo($video, $nextSlide);
    }

    if (this.currentDesktopSlide === slideIndex) return;

    $nextSlide.addClass(classes$23.slideActive).attr('aria-hidden', false);
    $currentSlide.addClass(classes$23.slideActiveTransitioning);

    utils.promiseTransitionEnd($nextSlide).then(function() {
      $currentSlide
        .removeClass(classes$23.slideActive)
        .removeClass(classes$23.slideActiveTransitioning)
        .attr('aria-hidden', true);
    });

    this._setButtonStatus(slideIndex);

    this.currentDesktopSlide = slideIndex;

    this.trigger('slideshow_set_slide', [slideIndex]);

    if (this.currentDesktopSlide - 1 >= 0) {
      this.trigger('slideshow_previous_slide', [slideIndex - 1]);
    }

    if (this.currentDesktopSlide + 1 < this.totalSlides) {
      this.trigger('slideshow_next_slide', [slideIndex + 1]);
    }
  },

  _loadVideo: function($video, $slide) {
    this.$video = $video;

    this.trigger('slideshow_video_load', [$video[0]]);

    return this._promiseVideo().then(
      function() {
        $slide.addClass(classes$23.videoLoaded);
        $slide.find(selectors$25.pauseButton).prop('disabled', false);
        this.trigger('slideshow_video_loaded', [$video[0]]);
      }.bind(this)
    );
  },

  _promiseVideo: function() {
    var playerType = this.$video.attr('data-video-type');
    var promiseVideoPlayer;

    if (playerType === 'youtube') {
      promiseVideoPlayer = this._loadYoutubePlayer();
      this.$video.attr('tabindex', '-1');
    } else if (playerType === 'vimeo') {
      promiseVideoPlayer = this._loadVimeoPlayer();
      this.$video.find('iframe').attr('tabindex', '-1');
    }

    return promiseVideoPlayer;
  },

  _loadYoutubePlayer: function() {
    var blockId = this.$video.attr('data-block-id');
    var videoId = this.$video.attr('data-video-id');

    return youtube
      .promisePlayer(this.$video[0], {
        videoId: videoId,
        ratio: 16 / 9,
        playerVars: {
          // eslint-disable-next-line camelcase
          iv_load_policy: 3,
          modestbranding: 1,
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          wmode: 'opaque',
          branding: 0,
          autohide: 0,
          rel: 0
        },
        events: {
          onStateChange: function(evt) {
            // Video has ended, loop back to beginning
            if (evt.data === 0) {
              this.players[blockId].seekTo(0);
            }
          }.bind(this)
        }
      })
      .then(
        function(player) {
          this.players[blockId] = player;
          player.playVideo().mute();
          // The video will not play if the iframe is set to visibility: hidden
          // Need to set it seperately from other styles in order to resolve the promise
          $(player.a).css('visibility', 'visible');
          player.playVideo().mute();
          // set player to visible
          return $.Deferred(function(defer) {
            player.addEventListener('onStateChange', function(evt) {
              // Only resolve the promise if the video is playing
              if (evt.data === 1) {
                defer.resolve();
              }
            });
          });
        }.bind(this)
      );
  },

  _loadVimeoPlayer: function() {
    var blockId = this.$video.attr('data-block-id');
    var videoId = this.$video.attr('data-video-id');

    return vimeo
      .promisePlayer(this.$video[0], {
        id: videoId,
        loop: true,
        // This property isn't reliable. The user might see the Vimeo playbar flash
        // as the video begins to play.
        playbar: false,
        background: true
      })
      .then(
        function(player) {
          this.players[blockId] = player;
          player.play();
          player.setVolume(0);

          return $.Deferred(function(defer) {
            player.on('loaded', function() {
              defer.resolve();
            });
          });
        }.bind(this)
      );
  },

  _setButtonWrapperValues: function() {
    this.mousePosition = 0;
    this.xPosition = 0;
    this.buttonsWrapperWidth = this.$container.outerWidth();
    this.buttonsInnerWidth = this.$button.first().width() * this.totalSlides;
    this.centerOfButtonsWrapper = this.buttonsWrapperWidth / 2;
    this.$button
      .find(selectors$25.ctaText)
      .removeAttr(
        'style data-previous-width data-previous-height data-new-width data-new-height'
      );

    this._setButtonsTranslateX(0);
  }
};

/*

Slideshow Mobile Extension
--------------------------------------------------------------------------------
Manages all the mobile behaviour of the home page slideshow


Events
------------

Name: slideshow_mobile_init_start
Description: Fired before the mobile slideshow begins to initialize
Payload: none

Name: slideshow_mobile_init_done
Description: Fired when the mobile slideshow is done initializing
Payload: none

Name: slideshow_mobile_destroy
Description: Fired when the mobile slideshow is destroyed
Payload: none

Name: slideshow_set_slide
Description: Fired when the user selects a specific slide
Payload: { number } Index of the slide being displayed

Name: slideshow_previous_slide
Description: Fired when the user selects the previous slide
Payload: { number } Index of the slide being displayed

Name: slideshow_next_slide
Description: Fired when the user selects the next slide
Payload: { number } Index of the slide being displayed

*/

var selectors$26 = {
  button: '.slideshow__button',
  buttons: '.slideshow__buttons',
  ctaMultipleSlides: '.slideshow__button-cta--multiple',
  ctaSingleSlide: '.slideshow__button-cta-single',
  label: '.slideshow__button-label',
  mobileTextContainer: '.slideshow__text-container-mobile',
  mobileTextContent: '.slideshow__text-content-mobile',
  navigationButtons: '[data-slider-navigation]',
  nextButton: '[data-slider-navigation-next]',
  previousButton: '[data-slider-navigation-previous]',
  slide: '.slideshow__slide',
  slideshow: '.slideshow',
  indicatorDots: '.slideshow__indicator'
};

var classes$24 = {
  buttonActive: 'slideshow__button--active',
  dotActive: 'slideshow__indicator--active',
  linkActive: 'slideshow__button--link',
  slideActive: 'slideshow__slide--active',
  slideActiveTransitioning: 'slideshow__slide--transitioning',
  navigationNoFocus: 'slideshow__navigation-item--no-focus'
};

var slideshowMobile = {
  initMobileSlideshow: function() {
    this.trigger('slideshow_mobile_init_start');

    this.$slideshow = $(selectors$26.slideshow, this.$container);
    this.$buttons = $(selectors$26.buttons, this.$container);
    this.$button = $(selectors$26.button, this.$container);
    this.$navigationButtons = $(selectors$26.navigationButtons, this.$container);
    this.$ctaMultipleSlides = $(selectors$26.ctaMultipleSlides, this.$container);
    this.$ctaSingleSlide = $(selectors$26.ctaSingleSlide, this.$container);
    this.$indicatorDots = $(selectors$26.indicatorDots, this.$container);
    this.$mobileTextContainer = $(
      selectors$26.mobileTextContainer,
      this.$container
    );
    this.$mobileTextContent = $(selectors$26.mobileTextContent, this.$container);

    this.mobileSlideshow = true;
    this.currentMobileSlide = 0;
    this.totalSlides = this.$buttons.data('count');
    this.xPosition = 0;
    this.mobileSlideshowNamespace = '.mobileSlideshow';

    // The header is above the slideshow in the iOS editor, so we need to
    // reduce it's height by the height of the header.
    if ($('html').hasClass('is-ios') && Shopify.designMode) {
      this.$slideshow.css('height', '-=60px');
    }

    this.on(
      'click keyup' + this.mobileSlideshowNamespace,
      selectors$26.indicatorDots,
      this._onClickIndicatorDot.bind(this)
    );
    this.on(
      'click keyup' + this.mobileSlideshowNamespace,
      selectors$26.previousButton,
      this._previousSlideMobile.bind(this)
    );
    this.on(
      'click keyup' + this.mobileSlideshowNamespace,
      selectors$26.nextButton,
      this._nextSlideMobile.bind(this)
    );
    this.on(
      'keydown' + this.mobileSlideshowNamespace,
      this._addKeyBindingsMobile.bind(this)
    );

    if (this.totalSlides > 1) {
      this.hammertime = new Hammer(this.$container[0]);

      // Import swipe gestures and only allow these two events
      this.hammertime
        .on('swipeleft', this._nextSlideMobile.bind(this))
        .on('swiperight', this._previousSlideMobile.bind(this));
    }

    this.$button.first().addClass(classes$24.buttonActive);

    utils.promiseStylesheet().then(
      function() {
        this._setSlideMobile(0);
        this._setMobileText(0);
        this._setSlideshowA11y();
        this.trigger('slideshow_mobile_init_done');
      }.bind(this)
    );
  },

  destroyMobileSlideshow: function() {
    this.trigger('slideshow_mobile_destroy');

    this.mobileSlideshow = false;
    this.$container.off(this.mobileSlideshowNamespace);

    if (this.totalSlides > 1) {
      this.hammertime.destroy();
    }
  },

  _onClickIndicatorDot: function(evt) {
    var $indicatorDot = $(evt.target);
    var index = $indicatorDot.data('slide-index');

    evt.preventDefault();

    if (
      evt.type === 'keyup' &&
      !(
        evt.keyCode === utils.keyboardKeys.ENTER ||
        evt.keyCode === utils.keyboardKeys.SPACE
      )
    )
      return;

    this._setSlideMobile(index);

    if (evt.type === 'keyup' || evt.detail === 0) {
      this.$slideshow.focus();
    }
  },

  _addKeyBindingsMobile: function(evt) {
    if (evt.which === utils.keyboardKeys.LEFTARROW) {
      this._previousSlideMobile(evt);
    } else if (evt.which === utils.keyboardKeys.RIGHTARROW) {
      this._nextSlideMobile(evt);
    }
  },

  _previousSlideMobile: function(evt) {
    if (evt.type === 'click') {
      $(evt.target).addClass(classes$24.navigationNoFocus);
    }
    if (
      (evt.type === 'keyup' &&
        !(
          evt.keyCode === utils.keyboardKeys.ENTER ||
          evt.keyCode === utils.keyboardKeys.SPACE
        )) ||
      this.currentMobileSlide === 0
    ) {
      return;
    }

    this._setSlideMobile(this.currentMobileSlide - 1);
  },

  _nextSlideMobile: function(evt) {
    if (evt.type === 'click') {
      $(evt.target).addClass(classes$24.navigationNoFocus);
    }
    if (
      (evt.type === 'keyup' &&
        !(
          evt.keyCode === utils.keyboardKeys.ENTER ||
          evt.keyCode === utils.keyboardKeys.SPACE
        )) ||
      this.currentMobileSlide === this.totalSlides - 1
    ) {
      return;
    }

    this._setSlideMobile(this.currentMobileSlide + 1);
  },

  _setSlideMobile: function(slideIndex) {
    if (this.currentMobileSlide === slideIndex) return;

    this.xPosition = slideIndex * 50;

    this.$buttons.css({
      transform: 'translate3d(-' + this.xPosition + '%, 0, 0)'
    });

    this._setActiveStates(slideIndex);
    this._setSlideA11y(slideIndex);
    this._setMobileText(slideIndex);

    this.currentMobileSlide = slideIndex;

    this.trigger('slideshow_set_slide', [slideIndex]);

    this.$navigationButtons.attr('disabled', false);

    if (this.currentMobileSlide === 0) {
      this.$navigationButtons
        .filter(selectors$26.previousButton)
        .attr('disabled', true);
    }

    if (this.currentMobileSlide === this.totalSlides - 1) {
      this.$navigationButtons
        .not(selectors$26.previousButton)
        .attr('disabled', true);
    }

    if (this.currentMobileSlide - 1 >= 0) {
      this.trigger('slideshow_previous_slide', [slideIndex - 1]);
    }

    if (this.currentMobileSlide + 1 < this.totalSlides) {
      this.trigger('slideshow_next_slide', [slideIndex + 1]);
    }
  },

  _setActiveStates: function(slideIndex) {
    this.$slide = this.$slide || $(selectors$26.slide, this.$container); // eslint-disable-line shopify/jquery-dollar-sign-reference
    this.$button = this.$button || $(selectors$26.button, this.$container); // eslint-disable-line shopify/jquery-dollar-sign-reference
    this.$dot = this.$dot || $(selectors$26.indicatorDots, this.$container); // eslint-disable-line shopify/jquery-dollar-sign-reference

    var $currentSlide = this.$slide.eq(this.currentMobileSlide);
    var $nextSlide = this.$slide.eq(slideIndex);

    $nextSlide.addClass(classes$24.slideActive).attr('aria-hidden', false);
    $currentSlide.addClass(classes$24.slideActiveTransitioning);

    utils.promiseTransitionEnd($nextSlide).then(function() {
      $currentSlide
        .removeClass(classes$24.slideActive)
        .removeClass(classes$24.slideActiveTransitioning)
        .attr('aria-hidden', true);
    });

    this.$button.removeClass(classes$24.buttonActive);

    this.$button.eq(slideIndex).addClass(classes$24.buttonActive);

    this.$dot.removeClass(classes$24.dotActive);
    this.$dot.eq(slideIndex).addClass(classes$24.dotActive);
  },

  _setSlideshowA11y: function() {
    this.$labels = this.$labels || this.$button.find(selectors$26.label); // eslint-disable-line shopify/jquery-dollar-sign-reference
    this.$ctaSingleSlide =
      this.$ctaSingleSlide || this.$button.find(selectors$26.ctaSingleSlide); // eslint-disable-line shopify/jquery-dollar-sign-reference

    this.$ctaSingleSlide.attr('tabindex', '0');
    this.$labels.attr('tabindex', '-1');
    this._setSlideA11y(0);

    $.each(
      this.$indicatorDots,
      function(index, indicatorDot) {
        $(indicatorDot).attr({
          'aria-controls': 'Slide' + index
        });
      }.bind(this)
    );
  },

  _setSlideA11y: function(slideIndex) {
    var $button = this.$button.eq(slideIndex);

    this.$ctasMultipleSlides =
      this.$ctasMultipleSlides ||
      this.$button.find(selectors$26.ctaMultipleSlides); // eslint-disable-line shopify/jquery-dollar-sign-reference

    if (this.$ctasMultipleSlides) {
      this.$ctasMultipleSlides.attr('tabindex', '-1');

      // All slide titles are tabbable. If the currently active button has a CTA
      // link, the CTA link becomes tabbable as well.
      if ($button.hasClass(classes$24.linkActive)) {
        this.$ctasMultipleSlides.eq(slideIndex).attr('tabindex', '0');
      }
    }

    $.each(
      this.$indicatorDots,
      function(index, indicatorDot) {
        $(indicatorDot).attr({
          'aria-label': this._slideLabel(slideIndex, index),
          'aria-current': slideIndex === index ? true : false
        });
      }.bind(this)
    );
  },

  _setMobileText: function(slideIndex) {
    var $currentTextContent = this.$mobileTextContent.eq(slideIndex);
    this.$ctaSingleSlide =
      this.$ctaSingleSlide || this.$button.find(selectors$26.ctaSingleSlide); // eslint-disable-line shopify/jquery-dollar-sign-reference

    if (this.$ctaSingleSlide.length) {
      // Adjust for buttons with labels on multiple lines.
      var paddingAdjustment =
        (this.$ctaSingleSlide.outerHeight() - 50) / 2 + 40;
      this.$mobileTextContent.css('padding-top', paddingAdjustment + 'px');
    }

    this.$mobileTextContent.hide();
    $currentTextContent.show();
  },

  _slideLabel: function(activeSlideIndex, currentIndex) {
    var label =
      activeSlideIndex === currentIndex
        ? theme.strings.slideshow.activeSlideA11yString
        : theme.strings.slideshow.loadSlideA11yString;

    return label.replace('[slide_number]', currentIndex + 1);
  }
};

/*

Slideshow Section
--------------------------------------------------------------------------------
Manages the functionality of the both mobile and desktop slideshow

*/

// Extensions
// Libs
var selectors$24 = {
  button: '.slideshow__button',
  slide: '.slideshow__slide'
};

var classes$22 = {
  buttonActive: 'slideshow__button--active',
  slideActive: 'slideshow__slide--active'
};

sections.register('slideshow-section', {
  onLoad: function() {
    this.extend(slideshowDesktop);
    this.extend(slideshowMobile);

    this.$container.on('focusin' + this.namespace, this._onFocusIn.bind(this));
    this.$container.on(
      'focusout' + this.namespace,
      this._onFocusOut.bind(this)
    );
    this._toggleViewState();

    this.window().on('resize', this._toggleViewState.bind(this));
  },

  onUnload: function() {
    this._destroyDesktopState();
    this._destroyMobileState();
  },

  onBlockSelect: function(evt) {
    utils.promiseStylesheet().then(
      function() {
        var index = $(evt.target).index();

        if (this.mobileViewEnabled) {
          this._setSlideMobile(index);
        } else {
          this._setSlideDesktop(index);
        }
      }.bind(this)
    );
  },

  _toggleViewState: function() {
    var windowWidth = $(window).innerWidth();
    var enableMobileView;
    var enableDesktopView;

    if (typeof this.mobileViewEnabled === 'undefined') {
      enableMobileView = windowWidth < theme.mediaQuerySmall;
      enableDesktopView = windowWidth >= theme.mediaQuerySmall;
    } else {
      enableMobileView =
        windowWidth < theme.mediaQuerySmall && !this.mobileViewEnabled;
      enableDesktopView =
        windowWidth >= theme.mediaQuerySmall && this.mobileViewEnabled;
    }

    if (enableMobileView) {
      this.mobileViewEnabled = true;
      this._destroyDesktopState();
      this._enableMobileState();
    }

    if (enableDesktopView) {
      this.mobileViewEnabled = false;
      this._destroyMobileState();
      this._enableDesktopState();
    }
  },

  _enableDesktopState: function() {
    this.initDesktopSlideshow();
  },

  _destroyDesktopState: function() {
    if (!this.desktopSlideshow) return;

    this.destroyDesktopSlideshow();
    this._resetSlideshowValues();
  },

  _enableMobileState: function() {
//     this.initMobileSlideshow();
    this.initDesktopSlideshow();
  },

  _destroyMobileState: function() {
    if (!this.mobileSlideshow) return;

    this.destroyMobileSlideshow();
    this._resetSlideshowValues();
  },

  // This method is called when the viewport goes from mobile to desktop
  // and vice versa. It ensures the slideshow resets to the first slide,
  // which helps with potential conflicting values based on shared markup.
  _resetSlideshowValues: function() {
    $(selectors$24.slide)
      .removeClass(classes$22.slideActive)
      .first()
      .addClass(classes$22.slideActive);

    $(selectors$24.button)
      .removeClass(classes$22.buttonActive)
      .first()
      .addClass(classes$22.buttonActive);
  },

  _onFocusIn: function(evt) {
    if (
      this.$container.has(evt.target).length &&
      this.$slideshow.attr('aria-live') === 'polite'
    ) {
      return;
    }

    this.$slideshow.attr('aria-live', 'polite');
  },

  _onFocusOut: function(evt) {
    if (this.$container.has(evt.relatedTarget).length) {
      return;
    }

    this.$slideshow.removeAttr('aria-live');
  }
});

var selectors$27 = {
  loadPlayerButton: '.video-section__load-player-button',
  closePlayerButton: '.video-section__player-close',
  playerContainer: '.video-section__player',
  cover: '.video-section__cover',
  errorMessage: '.video-section__error',
  bodyOverlay: '.video-section__body-overlay'
};

var classes$25 = {
  playerLoading: 'video-section--loading',
  playerLoaded: 'video-section--loaded',
  playerError: 'video-section--error',
  animateButton: 'animated pulse'
};

sections.register('video-section', {
  onLoad: function() {
    this.$container = $(this.container);

    this.$container
      .on('click', selectors$27.loadPlayerButton, this._loadPlayer.bind(this))
      .on('click', selectors$27.closePlayerButton, this._closePlayer.bind(this))
      .on('click', selectors$27.bodyOverlay, this._closePlayer.bind(this));
  },

  _loadPlayer: function() {
    var $container = this.$container;
    var $loadButton = $(selectors$27.loadPlayerButton, $container);
    var $playerContainer = $(selectors$27.playerContainer, $container);
    var playerType = this.$container.attr('data-video-type');
    var promiseVideoPlayer;

    $loadButton.addClass(classes$25.animateButton);

    this._scrollToPlayer($container);

    if (playerType === 'youtube') {
      promiseVideoPlayer = this._loadYoutubePlayer($playerContainer[0]);
    } else if (playerType === 'vimeo') {
      promiseVideoPlayer = this._loadVimeoPlayer($playerContainer[0]);
    }

    return promiseVideoPlayer
      .then(this._onPlayerLoadReady.bind(this))
      .catch(this._onPlayerLoadError.bind(this))
      .always(function() {
        $loadButton.removeClass(classes$25.animateButton);
      });
  },

  _scrollToPlayer: function(container) {
    var containerTop = container.offset().top;
    var offset = ($(window).height() - container.height()) / 2;

    $('html, body').animate(
      {
        scrollTop: containerTop - offset
      },
      400
    );
  },

  _loadYoutubePlayer: function(container) {
    return youtube
      .promisePlayer(container, {
        videoId: this.$container.attr('data-video-id'),
        ratio: 16 / 9,
        playerVars: {
          modestbranding: 1,
          autoplay: 1,
          showinfo: 0,
          rel: 0
        }
      })
      .then(
        function(player) {
          this.player = player;
        }.bind(this)
      );
  },

  _loadVimeoPlayer: function(container) {
    return vimeo
      .promisePlayer(container, {
        id: this.$container.attr('data-video-id')
      })
      .then(
        function(player) {
          this.player = player;
          this.player.play();
        }.bind(this)
      );
  },

  _onPlayerLoadReady: function() {
    $(selectors$27.closePlayerButton, this.$container)
      .show()
      .focus();
    $(selectors$27.cover, this.$container)
      .prepareTransition()
      .addClass(classes$25.playerLoaded);
    this.$container.addClass(classes$25.playerLoaded);

    this._setScrollPositionValues();

    $(document)
      .one('keyup' + this.namespace, this._closeOnEscape.bind(this))
      .on('scroll' + this.namespace, this._onScroll.bind(this));

    $(window).on(
      'resize' + this.namespace,
      this._setScrollPositionValues.bind(this)
    );
  },

  _onPlayerLoadError: function(err) {
    this.$container.addClass(classes$25.playerError);
    $(selectors$27.errorMessage, this.$container).text(err);
  },

  _closeOnEscape: function(evt) {
    if (evt.keyCode !== 27) return;

    this._closePlayer();
    $(selectors$27.loadPlayerButton, this.$container).focus();
  },

  _onScroll: function() {
    var scrollTop = $(window).scrollTop();

    if (
      scrollTop > this.videoTop + 0.25 * this.videoHeight ||
      scrollTop + this.windowHeight < this.videoBottom - 0.25 * this.videoHeight
    ) {
      // Debounce DOM edits to the next frame with requestAnimationFrame
      requestAnimationFrame(this._closePlayer.bind(this));
    }
  },

  _setScrollPositionValues: function() {
    this.videoHeight = this.$container.outerHeight(true);
    this.videoTop = this.$container.offset().top;
    this.videoBottom = this.videoTop + this.videoHeight;
    this.windowHeight = $(window).innerHeight();
  },

  _closePlayer: function() {
    $(selectors$27.cover, this.$container)
      .prepareTransition()
      .removeClass(classes$25.playerLoaded);
    this.$container.removeClass(classes$25.playerLoaded);
    $(selectors$27.closePlayerButton, this.$container).hide();

    if (typeof this.player.destroy === 'function') {
      this.player.destroy();
    } else if (typeof this.player.unload === 'function') {
      this.player.unload();
    }

    $(document).off(this.namespace);
    $(window).off(this.namespace);
  }
});

// import templates.js and assign it to the global theme object
window.theme.templates = templates;

// import all templates js
// import sections.js and assign it to the global theme object
window.theme.sections = sections;

// import all sections js
$(document).ready(function() {
  templates.load('*');
  sections.load('*');
});

}(jQuery,_.omit,_.find,_.throttle,Shopify.theme.a11y,_.remove,_.filter,_.fill,_.debounce,morphdom,_.defaultTo,_.findIndex,_.isArray,Hammer));


if($('body').hasClass('template-index')){
  setTimeout(function(){
    ChangeSlide(2);
  },11000);
  
  $.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };
}

function ChangeSlide(n){
var	$this = $('#Slideshow-slideshow .slideshow__buttons.critical-hide'),
 	TotalCount = $this.data('count');
    
    if($('#Slideshow-slideshow').isInViewport()){

      if(window.innerWidth > 749){
        $this.find('.slideshow__button[dm-index='+n+'] button.slideshow__button-label').click();
      } else{
        document.getElementById("DM-Slider-show-indicate-"+n).click();
      }

    }
   
    n++;
    if(n > TotalCount){
      n = 1;
    }
  if(n == 2){
    setTimeout(function(){ ChangeSlide(n); },10000);
  } else{
    setTimeout(function(){ ChangeSlide(n); },5000);
  }
}

$("#shopify-section-1476381658595 .btn.btn--secondary.hero__btn").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#shopify-section-1576835813002").offset().top
    }, 2000);
  $("#shopify-section-1576835813002 .btn.btn--clear.video-section__load-player-button").click();
});