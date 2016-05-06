  'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTypeahead = require('react-typeahead');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SamplePostTypeahead = function (_Component) {
  _inherits(SamplePostTypeahead, _Component);

  function SamplePostTypeahead(props) {
    _classCallCheck(this, SamplePostTypeahead);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SamplePostTypeahead).call(this, props));

    _this.state = {
      posts: [],
      selectedPost: null
    };
    return _this;
  }

  _createClass(SamplePostTypeahead, [{
    key: 'resetState',
    value: function resetState() {
      this.setState({
        posts: [],
        selectedPost: null
      });
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      this.setState({
        posts: data.map(function (post) {
          return post.title;
        })
      });
    }
  }, {
    key: 'fetchSuggestions',
    value: function fetchSuggestions(value) {
      $.getJSON('http://jsonplaceholder.typicode.com/posts?userId=1', this.setData.bind(this));
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var value = e.currentTarget.value.trim();
      var minLength = this.props.minLength || 1;

      if (value.length === 0) {
        this.resetState();
      } else if (value.length >= minLength) {
        this.fetchSuggestions(value);
      }
    }
  }, {
    key: 'onOptionSelected',
    value: function onOptionSelected(post) {
      this.setState({
        selectedPost: post
      });
    }
  }, {
    key: 'getSelection',
    value: function getSelection() {
      return _react2.default.createElement(
        'p',
        null,
        this.state.selectedPost
      );
    }
  }, {
    key: 'displayOption',
    value: function displayOption(option, index) {
      return option.substr(0, 10);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactTypeahead.Typeahead, {
          ref: 'typeaheadSearch',
          maxVisible: 10,
          placeholder: this.props.placeholder,
          onOptionSelected: this.onOptionSelected.bind(this),
          options: this.state.posts,
          onChange: this.onChange.bind(this),
          displayOption: this.displayOption.bind(this)
        }),
        this.state.selectedPost && this.getSelection()
      );
    }
  }]);

  return SamplePostTypeahead;
}(_react.Component);

exports.default = SamplePostTypeahead;
