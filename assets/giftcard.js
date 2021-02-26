/*
* This is an unminified version of the giftcard.min.js file used by your theme.
* If you want to use this file, you will need to change the script reference in your theme
* Change <script src="{{ 'giftcard.min.js' | asset_url }}"> to:
* <script src="{{ 'giftcard.js' | asset_url }}">
*/
(function ($,omit,find) {
$ = 'default' in $ ? $['default'] : $;
omit = 'default' in omit ? omit['default'] : omit;
find = 'default' in find ? find['default'] : find;

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

var selectors = {
  qrCode: '#QrCode',
  printButton: '#PrintGiftCard',
  giftCardCode: '.giftcard__code'
};

templates.register('Giftcard Template', 'template-giftcard', {
  onLoad: function() {
    var $qrCode = $(selectors.qrCode);

    // eslint-disable-next-line no-new
    new QRCode($qrCode[0], {
      text: $qrCode.attr('data-identifier'),
      width: 120,
      height: 120
    });

    $(selectors.printButton).on('click', function() {
      window.print();
    });

    // Auto-select gift card code on click, based on ID passed to the function
    $(selectors.giftCardCode).on(
      'click',
      { element: 'GiftCardDigits' },
      this.selectText
    );
  },

  selectText: function(evt) {
    var range = '';
    var text = document.getElementById(evt.data.element);

    if (document.body.createTextRange) {
      // ms method
      range = document.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) {
      // moz, opera, webkit method
      var selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
});

$(document).ready(function() {
  templates.load('*');
});

}(jQuery,_.omit,_.find));
