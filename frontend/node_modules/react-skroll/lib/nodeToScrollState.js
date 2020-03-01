"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nodeToScrollState;

function nodeToScrollState(_ref) {
  var scrollTop = _ref.scrollTop,
      scrollHeight = _ref.scrollHeight,
      offsetHeight = _ref.offsetHeight,
      children = _ref.children;
  // Interpreting native values
  var start = 0;
  var viewHeight = offsetHeight;
  var end = scrollHeight - viewHeight; // current position

  var position = scrollTop;
  var positionRatio = scrollTop / end; // Conditionals

  var onStart = position <= start;
  var onEnd = position >= end;
  var onMiddle = !onStart && !onEnd; // let scrolling = true / false

  var positionRelativeRatio = Math.abs(start - scrollTop / offsetHeight);
  return {
    position: position,
    positionRatio: positionRatio,
    // positionIndex,
    positionRelativeRatio: positionRelativeRatio,
    start: start,
    end: end,
    viewHeight: viewHeight,
    scrollHeight: scrollHeight,
    onStart: onStart,
    onMiddle: onMiddle,
    onEnd: onEnd
  };
}