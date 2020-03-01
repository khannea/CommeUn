"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nodeChildrenToScrollState;

function nodeChildrenToScrollState(_ref) {
  var children = _ref.children,
      scrollTop = _ref.scrollTop;
  var list = []; // used to increment children view heights

  var start = 0; // Fix: default props
  // let { theshold } = this.props

  var theshold = 0.5; // TODO: experiment a map

  for (var i = 0; i < children.length; i++) {
    var _children$i = children[i],
        offsetHeight = _children$i.offsetHeight,
        attributes = _children$i.attributes; // interpreting native values

    var viewHeight = offsetHeight;
    var end = start + viewHeight; // current position values

    var position = start - scrollTop;
    var positionRatio = position / offsetHeight;
    var positionRatioRemainer = positionRatio <= -1 ? 1 : positionRatio >= 1 ? 1 : Math.abs(positionRatio % 1);
    /* Used for creating navigations and  to links to
    *  <Link to="Home" />
    */
    // Conditionals
    // FIX: use exact values

    var onView = positionRatio <= theshold && positionRatio >= -theshold;
    var onFrame = position === scrollTop; // TODO: review active
    // TODO: addfunction to run on activate()

    var active = onView;
    list.push({
      position: position,
      positionRatio: positionRatio,
      positionRatioRemainer: positionRatioRemainer,
      start: start,
      end: end,
      viewHeight: viewHeight,
      onView: onView,
      active: active,
      onFrame: onFrame
    }); // increament based on stacked item's height

    start += offsetHeight;
  }

  return {
    children: list
  };
}