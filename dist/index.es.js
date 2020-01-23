import React from 'react';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "/* add css styles here (optional) */\n\n.styles_modal__gNwvD {\n  position: fixed;\n  top: 50vh;\n  left: 50vw;\n  width: 400px;\n  transform: translate(-50%, -50%);\n  text-align: center;\n  background-color: lightgrey;\n  border: 5px solid grey;\n}\n\n.styles_modal__title__3Dkcn {\n  font-weight: bold;\n\n}\n\n.styles_modal__content__Yt4hU {\n  display: flex;\n  flex-direction: column;\n}\n\n.styles_modal__description__3C4LL {\n\n}\n\n.styles_modal__input__3B6xK {\n\n}\n\n.styles_modal__buttons__1A-L7 {\n\n}\n\n.styles_modal__accept-button__3BoVf {\n\n}\n\n.styles_modal__cancel-button__JoafJ {\n\n}";
styleInject(css);

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Prompt = function (_React$Component) {
    inherits(Prompt, _React$Component);

    function Prompt(props) {
        classCallCheck(this, Prompt);

        var _this = possibleConstructorReturn(this, (Prompt.__proto__ || Object.getPrototypeOf(Prompt)).call(this, props));

        _this.changeState = function (e) {
            _this.setState({ value: e.target.value });
        };

        _this.state = {
            value: props.defaultValue
        };
        return _this;
    }

    createClass(Prompt, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.defaultValue !== this.props.defaultValue) this.setState({ value: this.props.defaultValue });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                className = _props.className,
                style = _props.style,
                title = _props.title,
                description = _props.description,
                onAccept = _props.onAccept,
                onCancel = _props.onCancel,
                acceptCaption = _props.acceptCaption,
                cancelCaption = _props.cancelCaption,
                allowEmpty = _props.allowEmpty;


            return React.createElement(
                'div',
                { className: className, style: style },
                title ? React.createElement(
                    'div',
                    { className: 'modal__title' },
                    title
                ) : null,
                React.createElement(
                    'div',
                    { className: 'modal__content' },
                    description ? React.createElement(
                        'div',
                        { className: 'modal__description' },
                        description
                    ) : null,
                    React.createElement(
                        'div',
                        { className: 'modal__input' },
                        React.createElement('input', { value: this.state.value, onChange: this.changeState })
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal__buttons' },
                        allowEmpty && this.state.value === "" ? null : React.createElement(
                            'div',
                            { className: 'modal__accept-button', onClick: function onClick() {
                                    return onAccept(_this2.state.value);
                                } },
                            acceptCaption
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal__cancel-button', onClick: onCancel },
                            cancelCaption
                        )
                    )
                )
            );
        }
    }]);
    return Prompt;
}(React.Component);

// Singleton


var Asker = function () {
    function Asker(viewKey) {
        var _this3 = this;

        classCallCheck(this, Asker);

        this.connectView = function (component) {
            _this3.component = component;
            _this3.updateView();
        };

        this.disconnectView = function () {
            _this3.component = null;
        };

        this.updateView = function () {
            if (_this3.component) _this3.component.setState(defineProperty({}, _this3.viewKey, _this3.element ? _extends({}, _this3.element) : null));
        };

        this.add = function (el) {
            if (!el.onAccept) return console.log("Asker element without onAccept method!", el);
            if (el.onAccept) {
                var onAccept = el.onAccept;
                el.onAccept = function () {
                    onAccept.apply(undefined, arguments);
                    _this3.close(el.id);
                };
            }
            _this3.element = el;
            _this3.updateView();
        };

        this.close = function () {
            _this3.element = null;
            _this3.updateView();
        };

        this.component = null;
        this.element = null;
        this.viewKey = viewKey;
    }

    createClass(Asker, [{
        key: 'prompt',
        value: function prompt(_ref) {
            var title = _ref.title,
                description = _ref.description,
                defaultValue = _ref.defaultValue,
                onAccept = _ref.onAccept,
                _ref$acceptCaption = _ref.acceptCaption,
                acceptCaption = _ref$acceptCaption === undefined ? "zapisz" : _ref$acceptCaption,
                _ref$cancelCaption = _ref.cancelCaption,
                cancelCaption = _ref$cancelCaption === undefined ? "porzuć" : _ref$cancelCaption,
                _ref$allowEmpty = _ref.allowEmpty,
                allowEmpty = _ref$allowEmpty === undefined ? false : _ref$allowEmpty,
                decoration = _ref.decoration;

            this.add({
                type: "prompt",
                title: title,
                description: description,
                defaultValue: defaultValue,
                onAccept: onAccept,
                acceptCaption: acceptCaption,
                cancelCaption: cancelCaption,
                allowEmpty: allowEmpty,
                decoration: decoration
            });
        }
    }, {
        key: 'confirm',
        value: function confirm(_ref2) {
            var _ref2$title = _ref2.title,
                title = _ref2$title === undefined ? "Czy jesteś tego pewny?" : _ref2$title,
                description = _ref2.description,
                onAccept = _ref2.onAccept,
                _ref2$acceptCaption = _ref2.acceptCaption,
                acceptCaption = _ref2$acceptCaption === undefined ? "tak" : _ref2$acceptCaption,
                _ref2$cancelCaption = _ref2.cancelCaption,
                cancelCaption = _ref2$cancelCaption === undefined ? "nie" : _ref2$cancelCaption,
                decoration = _ref2.decoration;

            this.add({
                type: "confirm",
                title: title,
                description: description,
                onAccept: onAccept,
                acceptCaption: acceptCaption,
                cancelCaption: cancelCaption,
                decoration: decoration
            });
        }
    }]);
    return Asker;
}();

var asker = new Asker("modal");

var AskerView = function (_React$Component2) {
    inherits(AskerView, _React$Component2);

    function AskerView(props) {
        classCallCheck(this, AskerView);

        var _this4 = possibleConstructorReturn(this, (AskerView.__proto__ || Object.getPrototypeOf(AskerView)).call(this, props));

        _this4.state = { modal: null };
        return _this4;
    }

    createClass(AskerView, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            asker.connectView(this);
        }
    }, {
        key: 'componentWillUnmout',
        value: function componentWillUnmout() {
            asker.disconnectView(this);
        }
    }, {
        key: 'render',
        value: function render() {
            var modal = this.state.modal;


            if (!modal) return null;

            var zIndex = this.props.zIndex || 10000;
            var className = "modal";
            if (modal.decoration) className += ' modal-' + modal.decoration;

            switch (modal.type) {
                case "confirm":
                    return React.createElement(
                        'div',
                        { className: className, style: { zIndex: zIndex } },
                        React.createElement(
                            'div',
                            { className: 'modal__title' },
                            modal.title
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal__content' },
                            React.createElement(
                                'div',
                                { className: 'modal__description' },
                                modal.description
                            ),
                            React.createElement(
                                'div',
                                { className: 'modal__buttons' },
                                React.createElement(
                                    'div',
                                    { className: 'modal__accept-button', onClick: modal.onAccept },
                                    modal.acceptCaption
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'modal__cancel-button', onClick: asker.close },
                                    modal.cancelCaption
                                )
                            )
                        )
                    );
                    break;
                case "prompt":
                    return React.createElement(Prompt, {
                        className: className,
                        style: { zIndex: zIndex },
                        title: modal.title,
                        description: modal.description,
                        defaultValue: modal.defaultValue,
                        onAccept: modal.onAccept,
                        onCancel: asker.close,
                        acceptCaption: modal.acceptCaption,
                        cancelCaption: modal.cancelCaption
                    });
                    break;
                default:
                    return null;
            }
        }
    }]);
    return AskerView;
}(React.Component);

export { AskerView, asker };
//# sourceMappingURL=index.es.js.map
