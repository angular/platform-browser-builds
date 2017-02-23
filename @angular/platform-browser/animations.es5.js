var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { Injectable, RendererFactoryV2, NgModule } from '@angular/core';
import { ɵDomRendererFactoryV2, BrowserModule } from '@angular/platform-browser';
import { NoOpAnimationPlayer, ɵAnimationGroupPlayer, sequence, AUTO_STYLE } from '@angular/animations';

/**
 * \@experimental Animation support is experimental.
 * @abstract
 */

var AnimationStyleNormalizer = function () {
    function AnimationStyleNormalizer() {
        _classCallCheck(this, AnimationStyleNormalizer);
    }

    _createClass(AnimationStyleNormalizer, [{
        key: 'normalizePropertyName',

        /**
         * @abstract
         * @param {?} propertyName
         * @param {?} errors
         * @return {?}
         */
        value: function normalizePropertyName(propertyName, errors) {}
        /**
         * @abstract
         * @param {?} userProvidedProperty
         * @param {?} normalizedProperty
         * @param {?} value
         * @param {?} errors
         * @return {?}
         */

    }, {
        key: 'normalizeStyleValue',
        value: function normalizeStyleValue(userProvidedProperty, normalizedProperty, value, errors) {}
    }]);

    return AnimationStyleNormalizer;
}();

var WebAnimationsStyleNormalizer = function (_AnimationStyleNormal) {
    _inherits(WebAnimationsStyleNormalizer, _AnimationStyleNormal);

    function WebAnimationsStyleNormalizer() {
        _classCallCheck(this, WebAnimationsStyleNormalizer);

        return _possibleConstructorReturn(this, (WebAnimationsStyleNormalizer.__proto__ || Object.getPrototypeOf(WebAnimationsStyleNormalizer)).apply(this, arguments));
    }

    _createClass(WebAnimationsStyleNormalizer, [{
        key: 'normalizePropertyName',

        /**
         * @param {?} propertyName
         * @param {?} errors
         * @return {?}
         */
        value: function normalizePropertyName(propertyName, errors) {
            return dashCaseToCamelCase(propertyName);
        }
        /**
         * @param {?} userProvidedProperty
         * @param {?} normalizedProperty
         * @param {?} value
         * @param {?} errors
         * @return {?}
         */

    }, {
        key: 'normalizeStyleValue',
        value: function normalizeStyleValue(userProvidedProperty, normalizedProperty, value, errors) {
            var /** @type {?} */unit = '';
            var /** @type {?} */strVal = value.toString().trim();
            if (DIMENSIONAL_PROP_MAP[normalizedProperty] && value !== 0 && value !== '0') {
                if (typeof value === 'number') {
                    unit = 'px';
                } else {
                    var /** @type {?} */valAndSuffixMatch = value.match(/^[+-]?[\d\.]+([a-z]*)$/);
                    if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
                        errors.push('Please provide a CSS unit value for ' + userProvidedProperty + ':' + value);
                    }
                }
            }
            return strVal + unit;
        }
    }]);

    return WebAnimationsStyleNormalizer;
}(AnimationStyleNormalizer);

var /** @type {?} */DIMENSIONAL_PROP_MAP = makeBooleanMap('width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent'.split(','));
/**
 * @param {?} keys
 * @return {?}
 */
function makeBooleanMap(keys) {
    var /** @type {?} */map = {};
    keys.forEach(function (key) {
        return map[key] = true;
    });
    return map;
}
var /** @type {?} */DASH_CASE_REGEXP = /-+([a-z0-9])/g;
/**
 * @param {?} input
 * @return {?}
 */
function dashCaseToCamelCase(input) {
    return input.replace(DASH_CASE_REGEXP, function () {
        for (var _len = arguments.length, m = Array(_len), _key = 0; _key < _len; _key++) {
            m[_key] = arguments[_key];
        }

        return m[1].toUpperCase();
    });
}

/**
 * @experimental
 */

var NoOpAnimationDriver = function () {
    function NoOpAnimationDriver() {
        _classCallCheck(this, NoOpAnimationDriver);
    }

    _createClass(NoOpAnimationDriver, [{
        key: 'animate',
        value: function animate(element, keyframes, duration, delay, easing) {
            var previousPlayers = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

            return new NoOpAnimationPlayer();
        }
    }]);

    return NoOpAnimationDriver;
}();
/**
 * @experimental
 */


var AnimationDriver = function AnimationDriver() {
    _classCallCheck(this, AnimationDriver);
};

AnimationDriver.NOOP = new NoOpAnimationDriver();

var /** @type {?} */ONE_SECOND = 1000;
/**
 * @param {?} exp
 * @param {?} errors
 * @return {?}
 */
function parseTimeExpression(exp, errors) {
    var /** @type {?} */regex = /^([\.\d]+)(m?s)(?:\s+([\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;
    var /** @type {?} */duration = void 0;
    var /** @type {?} */delay = 0;
    var /** @type {?} */easing = null;
    if (typeof exp === 'string') {
        var /** @type {?} */matches = exp.match(regex);
        if (matches === null) {
            errors.push('The provided timing value "' + exp + '" is invalid.');
            return { duration: 0, delay: 0, easing: null };
        }
        var /** @type {?} */durationMatch = parseFloat(matches[1]);
        var /** @type {?} */durationUnit = matches[2];
        if (durationUnit == 's') {
            durationMatch *= ONE_SECOND;
        }
        duration = Math.floor(durationMatch);
        var /** @type {?} */delayMatch = matches[3];
        var /** @type {?} */delayUnit = matches[4];
        if (delayMatch != null) {
            var /** @type {?} */delayVal = parseFloat(delayMatch);
            if (delayUnit != null && delayUnit == 's') {
                delayVal *= ONE_SECOND;
            }
            delay = Math.floor(delayVal);
        }
        var /** @type {?} */easingVal = matches[5];
        if (easingVal) {
            easing = easingVal;
        }
    } else {
        duration = exp;
    }
    return { duration: duration, delay: delay, easing: easing };
}
/**
 * @param {?} styles
 * @return {?}
 */
function normalizeStyles(styles) {
    var /** @type {?} */normalizedStyles = {};
    styles.forEach(function (data) {
        return copyStyles(data, false, normalizedStyles);
    });
    return normalizedStyles;
}
/**
 * @param {?} styles
 * @param {?} readPrototype
 * @param {?=} destination
 * @return {?}
 */
function copyStyles(styles, readPrototype) {
    var destination = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (readPrototype) {
        // we make use of a for-in loop so that the
        // prototypically inherited properties are
        // revealed from the backFill map
        for (var /** @type {?} */prop in styles) {
            destination[prop] = styles[prop];
        }
    } else {
        Object.keys(styles).forEach(function (prop) {
            return destination[prop] = styles[prop];
        });
    }
    return destination;
}

/**
 * @param {?} visitor
 * @param {?} node
 * @param {?} context
 * @return {?}
 */
function visitAnimationNode(visitor, node, context) {
    switch (node.type) {
        case 0 /* State */:
            return visitor.visitState( /** @type {?} */node, context);
        case 1 /* Transition */:
            return visitor.visitTransition( /** @type {?} */node, context);
        case 2 /* Sequence */:
            return visitor.visitSequence( /** @type {?} */node, context);
        case 3 /* Group */:
            return visitor.visitGroup( /** @type {?} */node, context);
        case 4 /* Animate */:
            return visitor.visitAnimate( /** @type {?} */node, context);
        case 5 /* KeyframeSequence */:
            return visitor.visitKeyframeSequence( /** @type {?} */node, context);
        case 6 /* Style */:
            return visitor.visitStyle( /** @type {?} */node, context);
        default:
            throw new Error('Unable to resolve animation metadata node #' + node.type);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */var /** @type {?} */ANY_STATE = '*';
/**
 * @param {?} transitionValue
 * @param {?} errors
 * @return {?}
 */
function parseTransitionExpr(transitionValue, errors) {
    var /** @type {?} */expressions = [];
    if (typeof transitionValue == 'string') {
        transitionValue.split(/\s*,\s*/).forEach(function (str) {
            return parseInnerTransitionStr(str, expressions, errors);
        });
    } else {
        expressions.push( /** @type {?} */transitionValue);
    }
    return expressions;
}
/**
 * @param {?} eventStr
 * @param {?} expressions
 * @param {?} errors
 * @return {?}
 */
function parseInnerTransitionStr(eventStr, expressions, errors) {
    if (eventStr[0] == ':') {
        eventStr = parseAnimationAlias(eventStr, errors);
    }
    var /** @type {?} */match = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
    if (match == null || match.length < 4) {
        errors.push('The provided transition expression "' + eventStr + '" is not supported');
        return expressions;
    }
    var /** @type {?} */fromState = match[1];
    var /** @type {?} */separator = match[2];
    var /** @type {?} */toState = match[3];
    expressions.push(makeLambdaFromStates(fromState, toState));
    var /** @type {?} */isFullAnyStateExpr = fromState == ANY_STATE && toState == ANY_STATE;
    if (separator[0] == '<' && !isFullAnyStateExpr) {
        expressions.push(makeLambdaFromStates(toState, fromState));
    }
}
/**
 * @param {?} alias
 * @param {?} errors
 * @return {?}
 */
function parseAnimationAlias(alias, errors) {
    switch (alias) {
        case ':enter':
            return 'void => *';
        case ':leave':
            return '* => void';
        default:
            errors.push('The transition alias value "' + alias + '" is not supported');
            return '* => *';
    }
}
/**
 * @param {?} lhs
 * @param {?} rhs
 * @return {?}
 */
function makeLambdaFromStates(lhs, rhs) {
    return function (fromState, toState) {
        var /** @type {?} */lhsMatch = lhs == ANY_STATE || lhs == fromState;
        var /** @type {?} */rhsMatch = rhs == ANY_STATE || rhs == toState;
        return lhsMatch && rhsMatch;
    };
}

/**
 * @param {?} keyframes
 * @param {?} duration
 * @param {?} delay
 * @param {?} easing
 * @return {?}
 */
function createTimelineInstruction(keyframes, duration, delay, easing) {
    return {
        type: 1 /* TimelineAnimation */
        , keyframes: keyframes,
        duration: duration,
        delay: delay,
        totalTime: duration + delay, easing: easing
    };
}

/**
 * @param {?} ast
 * @param {?=} startingStyles
 * @param {?=} finalStyles
 * @return {?}
 */
function buildAnimationKeyframes(ast) {
    var startingStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var finalStyles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var /** @type {?} */normalizedAst = Array.isArray(ast) ? sequence( /** @type {?} */ast) : ast;
    return new AnimationTimelineVisitor().buildKeyframes(normalizedAst, startingStyles, finalStyles);
}

var AnimationTimelineContext = function () {
    /**
     * @param {?} errors
     * @param {?} timelines
     * @param {?=} initialTimeline
     */
    function AnimationTimelineContext(errors, timelines) {
        var initialTimeline = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, AnimationTimelineContext);

        this.errors = errors;
        this.timelines = timelines;
        this.previousNode = {};
        this.subContextCount = 0;
        this.currentTimeline = initialTimeline || new TimelineBuilder(0);
        timelines.push(this.currentTimeline);
    }
    /**
     * @return {?}
     */


    _createClass(AnimationTimelineContext, [{
        key: 'createSubContext',
        value: function createSubContext() {
            var /** @type {?} */context = new AnimationTimelineContext(this.errors, this.timelines, this.currentTimeline.fork());
            context.previousNode = this.previousNode;
            context.currentAnimateTimings = this.currentAnimateTimings;
            this.subContextCount++;
            return context;
        }
        /**
         * @param {?=} newTime
         * @return {?}
         */

    }, {
        key: 'transformIntoNewTimeline',
        value: function transformIntoNewTimeline() {
            var newTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            this.currentTimeline = this.currentTimeline.fork(newTime);
            this.timelines.push(this.currentTimeline);
            return this.currentTimeline;
        }
        /**
         * @param {?} time
         * @return {?}
         */

    }, {
        key: 'incrementTime',
        value: function incrementTime(time) {
            this.currentTimeline.forwardTime(this.currentTimeline.duration + time);
        }
    }]);

    return AnimationTimelineContext;
}();

var AnimationTimelineVisitor = function () {
    function AnimationTimelineVisitor() {
        _classCallCheck(this, AnimationTimelineVisitor);
    }

    _createClass(AnimationTimelineVisitor, [{
        key: 'buildKeyframes',

        /**
         * @param {?} ast
         * @param {?} startingStyles
         * @param {?} finalStyles
         * @return {?}
         */
        value: function buildKeyframes(ast, startingStyles, finalStyles) {
            var /** @type {?} */context = new AnimationTimelineContext([], []);
            context.currentTimeline.setStyles(startingStyles);
            visitAnimationNode(this, ast, context);
            var /** @type {?} */normalizedFinalStyles = copyStyles(finalStyles, true);
            // this is a special case for when animate(TIME) is used (without any styles)
            // thus indicating to create an animation arc between the final keyframe and
            // the destination styles. When this occurs we need to ensure that the styles
            // that are missing on the finalStyles map are set to AUTO
            if (Object.keys(context.currentTimeline.getFinalKeyframe()).length == 0) {
                context.currentTimeline.properties.forEach(function (prop) {
                    var /** @type {?} */val = normalizedFinalStyles[prop];
                    if (val == null) {
                        normalizedFinalStyles[prop] = AUTO_STYLE;
                    }
                });
            }
            context.currentTimeline.setStyles(normalizedFinalStyles);
            var /** @type {?} */timelineInstructions = [];
            context.timelines.forEach(function (timeline) {
                // this checks to see if an actual animation happened
                if (timeline.hasStyling()) {
                    timelineInstructions.push(timeline.buildKeyframes());
                }
            });
            if (timelineInstructions.length == 0) {
                timelineInstructions.push(createTimelineInstruction([], 0, 0, ''));
            }
            return timelineInstructions;
        }
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitState',
        value: function visitState(ast, context) {}
        // these values are not visited in this AST

        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitTransition',
        value: function visitTransition(ast, context) {}
        // these values are not visited in this AST

        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitSequence',
        value: function visitSequence(ast, context) {
            var _this2 = this;

            var /** @type {?} */subContextCount = context.subContextCount;
            if (context.previousNode.type == 6 /* Style */) {
                    context.currentTimeline.forwardFrame();
                    context.currentTimeline.snapshotCurrentStyles();
                }
            ast.steps.forEach(function (s) {
                return visitAnimationNode(_this2, s, context);
            });
            // this means that some animation function within the sequence
            // ended up creating a sub timeline (which means the current
            // timeline cannot overlap with the contents of the sequence)
            if (context.subContextCount > subContextCount) {
                context.transformIntoNewTimeline();
            }
            context.previousNode = ast;
        }
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitGroup',
        value: function visitGroup(ast, context) {
            var _this3 = this;

            var /** @type {?} */innerTimelines = [];
            var /** @type {?} */furthestTime = context.currentTimeline.currentTime;
            ast.steps.forEach(function (s) {
                var /** @type {?} */innerContext = context.createSubContext();
                visitAnimationNode(_this3, s, innerContext);
                furthestTime = Math.max(furthestTime, innerContext.currentTimeline.currentTime);
                innerTimelines.push(innerContext.currentTimeline);
            });
            // this operation is run after the AST loop because otherwise
            // if the parent timeline's collected styles were updated then
            // it would pass in invalid data into the new-to-be forked items
            innerTimelines.forEach(function (timeline) {
                return context.currentTimeline.mergeTimelineCollectedStyles(timeline);
            });
            context.transformIntoNewTimeline(furthestTime);
            context.previousNode = ast;
        }
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitAnimate',
        value: function visitAnimate(ast, context) {
            var /** @type {?} */timings = ast.timings.hasOwnProperty('duration') ? ast.timings : parseTimeExpression( /** @type {?} */ast.timings, context.errors);
            context.currentAnimateTimings = timings;
            if (timings.delay) {
                context.incrementTime(timings.delay);
                context.currentTimeline.snapshotCurrentStyles();
            }
            var /** @type {?} */astType = ast.styles ? ast.styles.type : -1;
            if (astType == 5 /* KeyframeSequence */) {
                    this.visitKeyframeSequence( /** @type {?} */ast.styles, context);
                } else {
                context.incrementTime(timings.duration);
                if (astType == 6 /* Style */) {
                        this.visitStyle( /** @type {?} */ast.styles, context);
                    }
            }
            context.currentAnimateTimings = null;
            context.previousNode = ast;
        }
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitStyle',
        value: function visitStyle(ast, context) {
            // this is a special case when a style() call is issued directly after
            // a call to animate(). If the clock is not forwarded by one frame then
            // the style() calls will be merged into the previous animate() call
            // which is incorrect.
            if (!context.currentAnimateTimings && context.previousNode.type == 4 /* Animate */) {
                    context.currentTimeline.forwardFrame();
                }
            var /** @type {?} */normalizedStyles = normalizeStyles(ast.styles);
            var /** @type {?} */easing = context.currentAnimateTimings && context.currentAnimateTimings.easing;
            if (easing) {
                normalizedStyles['easing'] = easing;
            }
            context.currentTimeline.setStyles(normalizedStyles);
            context.previousNode = ast;
        }
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitKeyframeSequence',
        value: function visitKeyframeSequence(ast, context) {
            var /** @type {?} */MAX_KEYFRAME_OFFSET = 1;
            var /** @type {?} */limit = ast.steps.length - 1;
            var /** @type {?} */firstKeyframe = ast.steps[0];
            var /** @type {?} */offsetGap = 0;
            var /** @type {?} */containsOffsets = firstKeyframe.styles.find(function (styles) {
                return styles['offset'] >= 0;
            });
            if (!containsOffsets) {
                offsetGap = MAX_KEYFRAME_OFFSET / limit;
            }
            var /** @type {?} */startTime = context.currentTimeline.duration;
            var /** @type {?} */duration = context.currentAnimateTimings.duration;
            var /** @type {?} */innerContext = context.createSubContext();
            var /** @type {?} */innerTimeline = innerContext.currentTimeline;
            innerTimeline.easing = context.currentAnimateTimings.easing;
            ast.steps.forEach(function (step, i) {
                var /** @type {?} */normalizedStyles = normalizeStyles(step.styles);
                var /** @type {?} */offset = containsOffsets ? normalizedStyles['offset'] : i == limit ? MAX_KEYFRAME_OFFSET : i * offsetGap;
                innerTimeline.forwardTime(offset * duration);
                innerTimeline.setStyles(normalizedStyles);
            });
            // this will ensure that the parent timeline gets all the styles from
            // the child even if the new timeline below is not used
            context.currentTimeline.mergeTimelineCollectedStyles(innerTimeline);
            // we do this because the window between this timeline and the sub timeline
            // should ensure that the styles within are exactly the same as they were before
            context.transformIntoNewTimeline(startTime + duration);
            context.previousNode = ast;
        }
    }]);

    return AnimationTimelineVisitor;
}();

var TimelineBuilder = function () {
    /**
     * @param {?} startTime
     * @param {?=} _globalTimelineStyles
     */
    function TimelineBuilder(startTime) {
        var _globalTimelineStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, TimelineBuilder);

        this.startTime = startTime;
        this._globalTimelineStyles = _globalTimelineStyles;
        this.duration = 0;
        this.easing = '';
        this._keyframes = new Map();
        this._styleSummary = {};
        this._backFill = {};
        this._localTimelineStyles = Object.create(this._backFill, {});
        if (!this._globalTimelineStyles) {
            this._globalTimelineStyles = this._localTimelineStyles;
        }
        this._loadKeyframe();
    }
    /**
     * @return {?}
     */


    _createClass(TimelineBuilder, [{
        key: 'hasStyling',
        value: function hasStyling() {
            return this._keyframes.size > 1;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'fork',

        /**
         * @param {?=} currentTime
         * @return {?}
         */
        value: function fork() {
            var currentTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            return new TimelineBuilder(currentTime || this.currentTime, this._globalTimelineStyles);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_loadKeyframe',
        value: function _loadKeyframe() {
            this._currentKeyframe = this._keyframes.get(this.duration);
            if (!this._currentKeyframe) {
                this._currentKeyframe = Object.create(this._backFill, {});
                this._keyframes.set(this.duration, this._currentKeyframe);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'forwardFrame',
        value: function forwardFrame() {
            this.duration++;
            this._loadKeyframe();
        }
        /**
         * @param {?} time
         * @return {?}
         */

    }, {
        key: 'forwardTime',
        value: function forwardTime(time) {
            this.duration = time;
            this._loadKeyframe();
        }
        /**
         * @param {?} prop
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_updateStyle',
        value: function _updateStyle(prop, value) {
            if (prop != 'easing') {
                this._localTimelineStyles[prop] = value;
                this._globalTimelineStyles[prop] = value;
                this._styleSummary[prop] = { time: this.currentTime, value: value };
            }
        }
        /**
         * @param {?} styles
         * @return {?}
         */

    }, {
        key: 'setStyles',
        value: function setStyles(styles) {
            var _this4 = this;

            Object.keys(styles).forEach(function (prop) {
                if (prop !== 'offset') {
                    var /** @type {?} */val = styles[prop];
                    _this4._currentKeyframe[prop] = val;
                    if (prop !== 'easing' && !_this4._localTimelineStyles[prop]) {
                        _this4._backFill[prop] = _this4._globalTimelineStyles[prop] || AUTO_STYLE;
                    }
                    _this4._updateStyle(prop, val);
                }
            });
            Object.keys(this._localTimelineStyles).forEach(function (prop) {
                if (!_this4._currentKeyframe.hasOwnProperty(prop)) {
                    _this4._currentKeyframe[prop] = _this4._localTimelineStyles[prop];
                }
            });
        }
        /**
         * @return {?}
         */

    }, {
        key: 'snapshotCurrentStyles',
        value: function snapshotCurrentStyles() {
            copyStyles(this._localTimelineStyles, false, this._currentKeyframe);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'getFinalKeyframe',
        value: function getFinalKeyframe() {
            return this._keyframes.get(this.duration);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'mergeTimelineCollectedStyles',

        /**
         * @param {?} timeline
         * @return {?}
         */
        value: function mergeTimelineCollectedStyles(timeline) {
            var _this5 = this;

            Object.keys(timeline._styleSummary).forEach(function (prop) {
                var /** @type {?} */details0 = _this5._styleSummary[prop];
                var /** @type {?} */details1 = timeline._styleSummary[prop];
                if (!details0 || details1.time > details0.time) {
                    _this5._updateStyle(prop, details1.value);
                }
            });
        }
        /**
         * @return {?}
         */

    }, {
        key: 'buildKeyframes',
        value: function buildKeyframes() {
            var _this6 = this;

            var /** @type {?} */finalKeyframes = [];
            // special case for when there are only start/destination
            // styles but no actual animation animate steps...
            if (this.duration == 0) {
                var /** @type {?} */targetKeyframe = this.getFinalKeyframe();
                var /** @type {?} */firstKeyframe = copyStyles(targetKeyframe, true);
                firstKeyframe['offset'] = 0;
                finalKeyframes.push(firstKeyframe);
                var /** @type {?} */lastKeyframe = copyStyles(targetKeyframe, true);
                lastKeyframe['offset'] = 1;
                finalKeyframes.push(lastKeyframe);
            } else {
                this._keyframes.forEach(function (keyframe, time) {
                    var /** @type {?} */finalKeyframe = copyStyles(keyframe, true);
                    finalKeyframe['offset'] = time / _this6.duration;
                    finalKeyframes.push(finalKeyframe);
                });
            }
            return createTimelineInstruction(finalKeyframes, this.duration, this.startTime, this.easing);
        }
    }, {
        key: 'currentTime',
        get: function get() {
            return this.startTime + this.duration;
        }
    }, {
        key: 'properties',
        get: function get() {
            var /** @type {?} */properties = [];
            for (var /** @type {?} */prop in this._currentKeyframe) {
                properties.push(prop);
            }
            return properties;
        }
    }]);

    return TimelineBuilder;
}();

/**
 * @param {?} triggerName
 * @param {?} fromState
 * @param {?} toState
 * @param {?} isRemovalTransition
 * @param {?} fromStyles
 * @param {?} toStyles
 * @param {?} timelines
 * @return {?}
 */


function createTransitionInstruction(triggerName, fromState, toState, isRemovalTransition, fromStyles, toStyles, timelines) {
    return {
        type: 0 /* TransitionAnimation */
        , triggerName: triggerName,
        isRemovalTransition: isRemovalTransition,
        fromState: fromState,
        fromStyles: fromStyles,
        toState: toState,
        toStyles: toStyles,
        timelines: timelines
    };
}

var AnimationTransitionFactory = function () {
    /**
     * @param {?} _triggerName
     * @param {?} ast
     * @param {?} matchFns
     * @param {?} _stateStyles
     */
    function AnimationTransitionFactory(_triggerName, ast, matchFns, _stateStyles) {
        _classCallCheck(this, AnimationTransitionFactory);

        this._triggerName = _triggerName;
        this.matchFns = matchFns;
        this._stateStyles = _stateStyles;
        this._animationAst = ast.animation;
    }
    /**
     * @param {?} currentState
     * @param {?} nextState
     * @return {?}
     */


    _createClass(AnimationTransitionFactory, [{
        key: 'match',
        value: function match(currentState, nextState) {
            if (!oneOrMoreTransitionsMatch(this.matchFns, currentState, nextState)) return;
            var /** @type {?} */backupStateStyles = this._stateStyles['*'] || {};
            var /** @type {?} */currentStateStyles = this._stateStyles[currentState] || backupStateStyles;
            var /** @type {?} */nextStateStyles = this._stateStyles[nextState] || backupStateStyles;
            var /** @type {?} */timelines = buildAnimationKeyframes(this._animationAst, currentStateStyles, nextStateStyles);
            return createTransitionInstruction(this._triggerName, currentState, nextState, nextState === 'void', currentStateStyles, nextStateStyles, timelines);
        }
    }]);

    return AnimationTransitionFactory;
}();
/**
 * @param {?} matchFns
 * @param {?} currentState
 * @param {?} nextState
 * @return {?}
 */


function oneOrMoreTransitionsMatch(matchFns, currentState, nextState) {
    return matchFns.some(function (fn) {
        return fn(currentState, nextState);
    });
}

/**
 * @param {?} ast
 * @return {?}
 */
function validateAnimationSequence(ast) {
    return new AnimationValidatorVisitor().validate(ast);
}

var AnimationValidatorVisitor = function () {
    function AnimationValidatorVisitor() {
        _classCallCheck(this, AnimationValidatorVisitor);
    }

    _createClass(AnimationValidatorVisitor, [{
        key: 'validate',

        /**
         * @param {?} ast
         * @return {?}
         */
        value: function validate(ast) {
            var /** @type {?} */context = new AnimationValidatorContext();
            visitAnimationNode(this, ast, context);
            return context.errors;
        }
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitState',
        value: function visitState(ast, context) {}
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitTransition',
        value: function visitTransition(ast, context) {}
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitSequence',
        value: function visitSequence(ast, context) {
            var _this7 = this;

            ast.steps.forEach(function (step) {
                return visitAnimationNode(_this7, step, context);
            });
        }
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitGroup',
        value: function visitGroup(ast, context) {
            var _this8 = this;

            var /** @type {?} */currentTime = context.currentTime;
            var /** @type {?} */furthestTime = 0;
            ast.steps.forEach(function (step) {
                context.currentTime = currentTime;
                visitAnimationNode(_this8, step, context);
                furthestTime = Math.max(furthestTime, context.currentTime);
            });
            context.currentTime = furthestTime;
        }
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitAnimate',
        value: function visitAnimate(ast, context) {
            // we reassign the timings here so that they are not reparsed each
            // time an animation occurs
            context.currentAnimateTimings = ast.timings = parseTimeExpression( /** @type {?} */ast.timings, context.errors);
            var /** @type {?} */astType = ast.styles && ast.styles.type;
            if (astType == 5 /* KeyframeSequence */) {
                    this.visitKeyframeSequence( /** @type {?} */ast.styles, context);
                } else {
                context.currentTime += context.currentAnimateTimings.duration + context.currentAnimateTimings.delay;
                if (astType == 6 /* Style */) {
                        this.visitStyle( /** @type {?} */ast.styles, context);
                    }
            }
            context.currentAnimateTimings = null;
        }
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitStyle',
        value: function visitStyle(ast, context) {
            var /** @type {?} */styleData = normalizeStyles(ast.styles);
            var /** @type {?} */timings = context.currentAnimateTimings;
            var /** @type {?} */endTime = context.currentTime;
            var /** @type {?} */startTime = context.currentTime;
            if (timings && startTime > 0) {
                startTime -= timings.duration + timings.delay;
            }
            Object.keys(styleData).forEach(function (prop) {
                var /** @type {?} */collectedEntry = context.collectedStyles[prop];
                var /** @type {?} */updateCollectedStyle = true;
                if (collectedEntry) {
                    if (startTime != endTime && startTime >= collectedEntry.startTime && endTime <= collectedEntry.endTime) {
                        context.errors.push('The CSS property "' + prop + '" that exists between the times of "' + collectedEntry.startTime + 'ms" and "' + collectedEntry.endTime + 'ms" is also being animated in a parallel animation between the times of "' + startTime + 'ms" and "' + endTime + 'ms"');
                        updateCollectedStyle = false;
                    }
                    // we always choose the smaller start time value since we
                    // want to have a record of the entire animation window where
                    // the style property is being animated in between
                    startTime = collectedEntry.startTime;
                }
                if (updateCollectedStyle) {
                    context.collectedStyles[prop] = { startTime: startTime, endTime: endTime };
                }
            });
        }
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitKeyframeSequence',
        value: function visitKeyframeSequence(ast, context) {
            var _this9 = this;

            var /** @type {?} */totalKeyframesWithOffsets = 0;
            var /** @type {?} */offsets = [];
            var /** @type {?} */offsetsOutOfOrder = false;
            var /** @type {?} */keyframesOutOfRange = false;
            var /** @type {?} */previousOffset = 0;
            ast.steps.forEach(function (step) {
                var /** @type {?} */styleData = normalizeStyles(step.styles);
                var /** @type {?} */offset = 0;
                if (styleData.hasOwnProperty('offset')) {
                    totalKeyframesWithOffsets++;
                    offset = styleData['offset'];
                }
                keyframesOutOfRange = keyframesOutOfRange || offset < 0 || offset > 1;
                offsetsOutOfOrder = offsetsOutOfOrder || offset < previousOffset;
                previousOffset = offset;
                offsets.push(offset);
            });
            if (keyframesOutOfRange) {
                context.errors.push('Please ensure that all keyframe offsets are between 0 and 1');
            }
            if (offsetsOutOfOrder) {
                context.errors.push('Please ensure that all keyframe offsets are in order');
            }
            var /** @type {?} */length = ast.steps.length;
            var /** @type {?} */generatedOffset = 0;
            if (totalKeyframesWithOffsets > 0 && totalKeyframesWithOffsets < length) {
                context.errors.push('Not all style() steps within the declared keyframes() contain offsets');
            } else if (totalKeyframesWithOffsets == 0) {
                generatedOffset = 1 / length;
            }
            var /** @type {?} */limit = length - 1;
            var /** @type {?} */currentTime = context.currentTime;
            var /** @type {?} */animateDuration = context.currentAnimateTimings.duration;
            ast.steps.forEach(function (step, i) {
                var /** @type {?} */offset = generatedOffset > 0 ? i == limit ? 1 : generatedOffset * i : offsets[i];
                var /** @type {?} */durationUpToThisFrame = offset * animateDuration;
                context.currentTime = currentTime + context.currentAnimateTimings.delay + durationUpToThisFrame;
                context.currentAnimateTimings.duration = durationUpToThisFrame;
                _this9.visitStyle(step, context);
            });
        }
    }]);

    return AnimationValidatorVisitor;
}();

var AnimationValidatorContext = function AnimationValidatorContext() {
    _classCallCheck(this, AnimationValidatorContext);

    this.errors = [];
    this.currentTime = 0;
    this.collectedStyles = {};
};

/**
 * \@experimental Animation support is experimental.
 * @param {?} name
 * @param {?} definitions
 * @return {?}
 */


function buildTrigger(name, definitions) {
    return new AnimationTriggerVisitor().buildTrigger(name, definitions);
}
/**
 * \@experimental Animation support is experimental.
 */

var AnimationTrigger = function () {
    /**
     * @param {?} name
     * @param {?} states
     * @param {?} _transitionAsts
     */
    function AnimationTrigger(name, states, _transitionAsts) {
        var _this10 = this;

        _classCallCheck(this, AnimationTrigger);

        this.name = name;
        this._transitionAsts = _transitionAsts;
        this.transitionFactories = [];
        this.states = {};
        Object.keys(states).forEach(function (stateName) {
            _this10.states[stateName] = copyStyles(states[stateName], false);
        });
        var errors = [];
        _transitionAsts.forEach(function (ast) {
            var exprs = parseTransitionExpr(ast.expr, errors);
            var sequenceErrors = validateAnimationSequence(ast);
            if (sequenceErrors.length) {
                errors.push.apply(errors, _toConsumableArray(sequenceErrors));
            } else {
                _this10.transitionFactories.push(new AnimationTransitionFactory(_this10.name, ast, exprs, states));
            }
        });
        if (errors.length) {
            var LINE_START = '\n - ';
            throw new Error('Animation parsing for the ' + name + ' trigger have failed:' + LINE_START + errors.join(LINE_START));
        }
    }
    /**
     * @param {?} currentState
     * @param {?} nextState
     * @return {?}
     */


    _createClass(AnimationTrigger, [{
        key: 'createFallbackInstruction',
        value: function createFallbackInstruction(currentState, nextState) {
            var /** @type {?} */backupStateStyles = this.states['*'] || {};
            var /** @type {?} */currentStateStyles = this.states[currentState] || backupStateStyles;
            var /** @type {?} */nextStateStyles = this.states[nextState] || backupStateStyles;
            return createTransitionInstruction(this.name, currentState, nextState, nextState == 'void', currentStateStyles, nextStateStyles, []);
        }
        /**
         * @param {?} currentState
         * @param {?} nextState
         * @return {?}
         */

    }, {
        key: 'matchTransition',
        value: function matchTransition(currentState, nextState) {
            for (var /** @type {?} */i = 0; i < this.transitionFactories.length; i++) {
                var /** @type {?} */result = this.transitionFactories[i].match(currentState, nextState);
                if (result) return result;
            }
        }
    }]);

    return AnimationTrigger;
}();

var AnimationTriggerContext = function AnimationTriggerContext() {
    _classCallCheck(this, AnimationTriggerContext);

    this.errors = [];
    this.states = {};
    this.transitions = [];
};

var AnimationTriggerVisitor = function () {
    function AnimationTriggerVisitor() {
        _classCallCheck(this, AnimationTriggerVisitor);
    }

    _createClass(AnimationTriggerVisitor, [{
        key: 'buildTrigger',

        /**
         * @param {?} name
         * @param {?} definitions
         * @return {?}
         */
        value: function buildTrigger(name, definitions) {
            var _this11 = this;

            var /** @type {?} */context = new AnimationTriggerContext();
            definitions.forEach(function (def) {
                return visitAnimationNode(_this11, def, context);
            });
            return new AnimationTrigger(name, context.states, context.transitions);
        }
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitState',
        value: function visitState(ast, context) {
            context.states[ast.name] = normalizeStyles(ast.styles.styles);
        }
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitTransition',
        value: function visitTransition(ast, context) {
            context.transitions.push(ast);
        }
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitSequence',
        value: function visitSequence(ast, context) {}
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitGroup',
        value: function visitGroup(ast, context) {}
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitAnimate',
        value: function visitAnimate(ast, context) {}
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitStyle',
        value: function visitStyle(ast, context) {}
        /**
         * @param {?} ast
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'visitKeyframeSequence',
        value: function visitKeyframeSequence(ast, context) {}
    }]);

    return AnimationTriggerVisitor;
}();

var /** @type {?} */MARKED_FOR_ANIMATION = 'ng-animate';
var /** @type {?} */MARKED_FOR_REMOVAL = '$$ngRemove';

var AnimationEngine = function () {
    /**
     * @param {?} _driver
     * @param {?} _normalizer
     */
    function AnimationEngine(_driver, _normalizer) {
        _classCallCheck(this, AnimationEngine);

        this._driver = _driver;
        this._normalizer = _normalizer;
        this._flaggedInserts = new Set();
        this._queuedRemovals = new Map();
        this._queuedTransitionAnimations = [];
        this._activeTransitionAnimations = new Map();
        this._activeElementAnimations = new Map();
        this._elementTriggerStates = new Map();
        this._triggers = {};
        this._triggerListeners = new Map();
        this._flushId = 0;
        this._awaitingFlush = false;
    }
    /**
     * @return {?}
     */


    _createClass(AnimationEngine, [{
        key: 'registerTrigger',

        /**
         * @param {?} trigger
         * @return {?}
         */
        value: function registerTrigger(trigger) {
            var /** @type {?} */name = trigger.name;
            if (this._triggers[name]) {
                throw new Error('The provided animation trigger "' + name + '" has already been registered!');
            }
            this._triggers[name] = buildTrigger(name, trigger.definitions);
        }
        /**
         * @param {?} element
         * @param {?} domFn
         * @return {?}
         */

    }, {
        key: 'onInsert',
        value: function onInsert(element, domFn) {
            this._flaggedInserts.add(element);
            domFn();
        }
        /**
         * @param {?} element
         * @param {?} domFn
         * @return {?}
         */

    }, {
        key: 'onRemove',
        value: function onRemove(element, domFn) {
            element[MARKED_FOR_REMOVAL] = true;
            this._queuedRemovals.set(element, domFn);
        }
        /**
         * @param {?} element
         * @param {?} property
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setProperty',
        value: function setProperty(element, property, value) {
            var /** @type {?} */trigger = this._triggers[property];
            if (!trigger) {
                throw new Error('The provided animation trigger "' + property + '" has not been registered!');
            }
            var /** @type {?} */lookupRef = this._elementTriggerStates.get(element);
            if (!lookupRef) {
                this._elementTriggerStates.set(element, lookupRef = {});
            }
            var /** @type {?} */oldValue = lookupRef[property] || 'void';
            if (oldValue != value) {
                var /** @type {?} */instruction = trigger.matchTransition(oldValue, value);
                if (!instruction) {
                    // we do this to make sure we always have an animation player so
                    // that callback operations are properly called
                    instruction = trigger.createFallbackInstruction(oldValue, value);
                }
                this.animateTransition(element, instruction);
                lookupRef[property] = value;
            }
        }
        /**
         * @param {?} element
         * @param {?} eventName
         * @param {?} eventPhase
         * @param {?} callback
         * @return {?}
         */

    }, {
        key: 'listen',
        value: function listen(element, eventName, eventPhase, callback) {
            if (!eventPhase) {
                throw new Error('Unable to listen on the animation trigger "' + eventName + '" because the provided event is undefined!');
            }
            if (!this._triggers[eventName]) {
                throw new Error('Unable to listen on the animation trigger event "' + eventPhase + '" because the animation trigger "' + eventName + '" doesn\'t exist!');
            }
            var /** @type {?} */elementListeners = this._triggerListeners.get(element);
            if (!elementListeners) {
                this._triggerListeners.set(element, elementListeners = []);
            }
            validatePlayerEvent(eventName, eventPhase);
            var /** @type {?} */tuple = { triggerName: eventName, phase: eventPhase, callback: callback };
            elementListeners.push(tuple);
            return function () {
                var /** @type {?} */index = elementListeners.indexOf(tuple);
                if (index >= 0) {
                    elementListeners.splice(index, 1);
                }
            };
        }
        /**
         * @param {?} element
         * @return {?}
         */

    }, {
        key: '_onRemovalTransition',
        value: function _onRemovalTransition(element) {
            var _this12 = this;

            // when a parent animation is set to trigger a removal we want to
            // find all of the children that are currently animating and clear
            // them out by destroying each of them.
            var /** @type {?} */elms = element.querySelectorAll(MARKED_FOR_ANIMATION);

            var _loop = function _loop(i) {
                var /** @type {?} */elm = elms[i];
                var /** @type {?} */activePlayers = _this12._activeElementAnimations.get(elm);
                if (activePlayers) {
                    activePlayers.forEach(function (player) {
                        return player.destroy();
                    });
                }
                var /** @type {?} */activeTransitions = _this12._activeTransitionAnimations.get(elm);
                if (activeTransitions) {
                    Object.keys(activeTransitions).forEach(function (triggerName) {
                        var /** @type {?} */player = activeTransitions[triggerName];
                        if (player) {
                            player.destroy();
                        }
                    });
                }
            };

            for (var /** @type {?} */i = 0; i < elms.length; i++) {
                _loop(i);
            }
            // we make a copy of the array because the actual source array is modified
            // each time a player is finished/destroyed (the forEach loop would fail otherwise)
            return copyArray(this._activeElementAnimations.get(element));
        }
        /**
         * @param {?} element
         * @param {?} instruction
         * @return {?}
         */

    }, {
        key: 'animateTransition',
        value: function animateTransition(element, instruction) {
            var _this13 = this;

            var /** @type {?} */triggerName = instruction.triggerName;
            var /** @type {?} */previousPlayers = void 0;
            if (instruction.isRemovalTransition) {
                previousPlayers = this._onRemovalTransition(element);
            } else {
                previousPlayers = [];
                var /** @type {?} */existingTransitions = this._activeTransitionAnimations.get(element);
                var /** @type {?} */existingPlayer = existingTransitions ? existingTransitions[triggerName] : null;
                if (existingPlayer) {
                    previousPlayers.push(existingPlayer);
                }
            }
            // it's important to do this step before destroying the players
            // so that the onDone callback below won't fire before this
            eraseStyles(element, instruction.fromStyles);
            // we first run this so that the previous animation player
            // data can be passed into the successive animation players
            var /** @type {?} */totalTime = 0;
            var /** @type {?} */players = instruction.timelines.map(function (timelineInstruction) {
                totalTime = Math.max(totalTime, timelineInstruction.totalTime);
                return _this13._buildPlayer(element, timelineInstruction, previousPlayers);
            });
            previousPlayers.forEach(function (previousPlayer) {
                return previousPlayer.destroy();
            });
            var /** @type {?} */player = optimizeGroupPlayer(players);
            player.onDone(function () {
                player.destroy();
                var /** @type {?} */elmTransitionMap = _this13._activeTransitionAnimations.get(element);
                if (elmTransitionMap) {
                    delete elmTransitionMap[triggerName];
                    if (Object.keys(elmTransitionMap).length == 0) {
                        _this13._activeTransitionAnimations.delete(element);
                    }
                }
                deleteFromArrayMap(_this13._activeElementAnimations, element, player);
                setStyles(element, instruction.toStyles);
            });
            var /** @type {?} */elmTransitionMap = getOrSetAsInMap(this._activeTransitionAnimations, element, {});
            elmTransitionMap[triggerName] = player;
            this._queuePlayer(element, triggerName, player, makeAnimationEvent(element, triggerName, instruction.fromState, instruction.toState, null, // this will be filled in during event creation
            totalTime));
            return player;
        }
        /**
         * @param {?} element
         * @param {?} instructions
         * @param {?=} previousPlayers
         * @return {?}
         */

    }, {
        key: 'animateTimeline',
        value: function animateTimeline(element, instructions) {
            var _this14 = this;

            var previousPlayers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            var /** @type {?} */players = instructions.map(function (instruction) {
                var /** @type {?} */player = _this14._buildPlayer(element, instruction, previousPlayers);
                player.onDestroy(function () {
                    deleteFromArrayMap(_this14._activeElementAnimations, element, player);
                });
                player.init();
                _this14._markPlayerAsActive(element, player);
                return player;
            });
            return optimizeGroupPlayer(players);
        }
        /**
         * @param {?} element
         * @param {?} instruction
         * @param {?} previousPlayers
         * @return {?}
         */

    }, {
        key: '_buildPlayer',
        value: function _buildPlayer(element, instruction, previousPlayers) {
            return this._driver.animate(element, this._normalizeKeyframes(instruction.keyframes), instruction.duration, instruction.delay, instruction.easing, previousPlayers);
        }
        /**
         * @param {?} keyframes
         * @return {?}
         */

    }, {
        key: '_normalizeKeyframes',
        value: function _normalizeKeyframes(keyframes) {
            var _this15 = this;

            var /** @type {?} */errors = [];
            var /** @type {?} */normalizedKeyframes = [];
            keyframes.forEach(function (kf) {
                var /** @type {?} */normalizedKeyframe = {};
                Object.keys(kf).forEach(function (prop) {
                    var /** @type {?} */normalizedProp = prop;
                    var /** @type {?} */normalizedValue = kf[prop];
                    if (prop != 'offset') {
                        normalizedProp = _this15._normalizer.normalizePropertyName(prop, errors);
                        normalizedValue = _this15._normalizer.normalizeStyleValue(prop, normalizedProp, kf[prop], errors);
                    }
                    normalizedKeyframe[normalizedProp] = normalizedValue;
                });
                normalizedKeyframes.push(normalizedKeyframe);
            });
            if (errors.length) {
                var /** @type {?} */LINE_START = '\n - ';
                throw new Error('Unable to animate due to the following errors:' + LINE_START + errors.join(LINE_START));
            }
            return normalizedKeyframes;
        }
        /**
         * @param {?} element
         * @param {?} player
         * @return {?}
         */

    }, {
        key: '_markPlayerAsActive',
        value: function _markPlayerAsActive(element, player) {
            var /** @type {?} */elementAnimations = getOrSetAsInMap(this._activeElementAnimations, element, []);
            elementAnimations.push(player);
        }
        /**
         * @param {?} element
         * @param {?} triggerName
         * @param {?} player
         * @param {?} event
         * @return {?}
         */

    }, {
        key: '_queuePlayer',
        value: function _queuePlayer(element, triggerName, player, event) {
            var _this16 = this;

            var /** @type {?} */tuple = { element: element, player: player, triggerName: triggerName, event: event };
            this._queuedTransitionAnimations.push(tuple);
            player.init();
            element.classList.add(MARKED_FOR_ANIMATION);
            player.onDone(function () {
                element.classList.remove(MARKED_FOR_ANIMATION);
            });
            if (!this._awaitingFlush) {
                var /** @type {?} */flushId = this._flushId;
                AnimationEngine.raf(function () {
                    if (flushId == _this16._flushId) {
                        _this16._awaitingFlush = false;
                        _this16.flush();
                    }
                });
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_flushQueuedAnimations',
        value: function _flushQueuedAnimations() {
            var _this17 = this;

            var _loop2 = function _loop2() {
                var _queuedTransitionAnim = _this17._queuedTransitionAnimations.shift(),
                    player = _queuedTransitionAnim.player,
                    element = _queuedTransitionAnim.element,
                    triggerName = _queuedTransitionAnim.triggerName,
                    event = _queuedTransitionAnim.event;

                var /** @type {?} */parent = element;
                while (parent = parent.parentNode) {
                    // this means that a parent element will or will not
                    // have its own animation operation which in this case
                    // there's no point in even trying to do an animation
                    if (parent[MARKED_FOR_REMOVAL]) return 'continue|parentLoop';
                }
                // if a removal exists for the given element then we need cancel
                // all the queued players so that a proper removal animation can go
                if (_this17._queuedRemovals.has(element)) {
                    player.destroy();
                    return 'continue';
                }
                var /** @type {?} */listeners = _this17._triggerListeners.get(element);
                if (listeners) {
                    listeners.forEach(function (tuple) {
                        if (tuple.triggerName == triggerName) {
                            listenOnPlayer(player, tuple.phase, event, tuple.callback);
                        }
                    });
                }
                _this17._markPlayerAsActive(element, player);
                // in the event that an animation throws an error then we do
                // not want to re-run animations on any previous animations
                // if they have already been kicked off beforehand
                if (!player.hasStarted()) {
                    player.play();
                }
            };

            parentLoop: while (this._queuedTransitionAnimations.length) {
                var _ret2 = _loop2();

                switch (_ret2) {
                    case 'continue|parentLoop':
                        continue parentLoop;

                    case 'continue':
                        continue;}
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'flush',
        value: function flush() {
            var _this18 = this;

            this._flushId++;
            this._flushQueuedAnimations();
            var /** @type {?} */flushAgain = false;
            this._queuedRemovals.forEach(function (callback, element) {
                // an item that was inserted/removed in the same flush means
                // that an animation should not happen anyway
                if (_this18._flaggedInserts.has(element)) return;
                var /** @type {?} */parent = element;
                var /** @type {?} */players = [];
                while (parent = parent.parentNode) {
                    // there is no reason to even try to
                    if (parent[MARKED_FOR_REMOVAL]) {
                        callback();
                        return;
                    }
                    var /** @type {?} */match = _this18._activeElementAnimations.get(parent);
                    if (match) {
                        players.push.apply(players, _toConsumableArray(match));
                        break;
                    }
                }
                // the loop was unable to find an parent that is animating even
                // though this element has set to be removed, so the algorithm
                // should check to see if there are any triggers on the element
                // that are present to handle a leave animation and then setup
                // those players to facilitate the callback after done
                if (players.length == 0) {
                    // this means that the element has valid state triggers
                    var /** @type {?} */stateDetails = _this18._elementTriggerStates.get(element);
                    if (stateDetails) {
                        Object.keys(stateDetails).forEach(function (triggerName) {
                            var /** @type {?} */oldValue = stateDetails[triggerName];
                            var /** @type {?} */instruction = _this18._triggers[triggerName].matchTransition(oldValue, 'void');
                            if (instruction) {
                                players.push(_this18.animateTransition(element, instruction));
                                flushAgain = true;
                            }
                        });
                    }
                }
                if (players.length) {
                    optimizeGroupPlayer(players).onDone(callback);
                } else {
                    callback();
                }
            });
            this._queuedRemovals.clear();
            this._flaggedInserts.clear();
            // this means that one or more leave animations were detected
            if (flushAgain) {
                this._flushQueuedAnimations();
            }
        }
    }, {
        key: 'queuedPlayers',
        get: function get() {
            return this._queuedTransitionAnimations.map(function (q) {
                return q.player;
            });
        }
        /**
         * @return {?}
         */

    }, {
        key: 'activePlayers',
        get: function get() {
            var /** @type {?} */players = [];
            this._activeElementAnimations.forEach(function (activePlayers) {
                return players.push.apply(players, _toConsumableArray(activePlayers));
            });
            return players;
        }
    }]);

    return AnimationEngine;
}();

AnimationEngine.raf = function (fn) {
    return requestAnimationFrame(fn);
};
/**
 * @param {?} map
 * @param {?} key
 * @param {?} defaultValue
 * @return {?}
 */
function getOrSetAsInMap(map, key, defaultValue) {
    var /** @type {?} */value = map.get(key);
    if (!value) {
        map.set(key, value = defaultValue);
    }
    return value;
}
/**
 * @param {?} map
 * @param {?} key
 * @param {?} value
 * @return {?}
 */
function deleteFromArrayMap(map, key, value) {
    var /** @type {?} */arr = map.get(key);
    if (arr) {
        var /** @type {?} */index = arr.indexOf(value);
        if (index >= 0) {
            arr.splice(index, 1);
            if (arr.length == 0) {
                map.delete(key);
            }
        }
    }
}
/**
 * @param {?} element
 * @param {?} styles
 * @return {?}
 */
function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
        element.style[prop] = styles[prop];
    });
}
/**
 * @param {?} element
 * @param {?} styles
 * @return {?}
 */
function eraseStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
        // IE requires '' instead of null
        // see https://github.com/angular/angular/issues/7916
        element.style[prop] = '';
    });
}
/**
 * @param {?} players
 * @return {?}
 */
function optimizeGroupPlayer(players) {
    switch (players.length) {
        case 0:
            return new NoOpAnimationPlayer();
        case 1:
            return players[0];
        default:
            return new ɵAnimationGroupPlayer(players);
    }
}
/**
 * @param {?} source
 * @return {?}
 */
function copyArray(source) {
    return source ? source.splice(0) : [];
}
/**
 * @param {?} triggerName
 * @param {?} eventName
 * @return {?}
 */
function validatePlayerEvent(triggerName, eventName) {
    switch (eventName) {
        case 'start':
        case 'done':
            return;
        default:
            throw new Error('The provided animation trigger event "' + eventName + '" for the animation trigger "' + triggerName + '" is not supported!');
    }
}
/**
 * @param {?} player
 * @param {?} eventName
 * @param {?} baseEvent
 * @param {?} callback
 * @return {?}
 */
function listenOnPlayer(player, eventName, baseEvent, callback) {
    switch (eventName) {
        case 'start':
            player.onStart(function () {
                var /** @type {?} */event = copyAnimationEvent(baseEvent);
                event.phaseName = 'start';
                callback(event);
            });
            break;
        case 'done':
            player.onDone(function () {
                var /** @type {?} */event = copyAnimationEvent(baseEvent);
                event.phaseName = 'done';
                callback(event);
            });
            break;
    }
}
/**
 * @param {?} e
 * @return {?}
 */
function copyAnimationEvent(e) {
    return makeAnimationEvent(e.element, e.triggerName, e.fromState, e.toState, e.phaseName, e.totalTime);
}
/**
 * @param {?} element
 * @param {?} triggerName
 * @param {?} fromState
 * @param {?} toState
 * @param {?} phaseName
 * @param {?} totalTime
 * @return {?}
 */
function makeAnimationEvent(element, triggerName, fromState, toState, phaseName, totalTime) {
    return { element: element, triggerName: triggerName, fromState: fromState, toState: toState, phaseName: phaseName, totalTime: totalTime };
}

var AnimationRendererFactory = function () {
    /**
     * @param {?} delegate
     * @param {?} _engine
     */
    function AnimationRendererFactory(delegate, _engine) {
        _classCallCheck(this, AnimationRendererFactory);

        this.delegate = delegate;
        this._engine = _engine;
    }
    /**
     * @param {?} hostElement
     * @param {?} type
     * @return {?}
     */


    _createClass(AnimationRendererFactory, [{
        key: 'createRenderer',
        value: function createRenderer(hostElement, type) {
            var /** @type {?} */delegate = this.delegate.createRenderer(hostElement, type);
            if (!hostElement || !type) return delegate;
            var /** @type {?} */animationRenderer = type.data['__animationRenderer__'];
            if (animationRenderer && delegate == animationRenderer.delegate) {
                return animationRenderer;
            }
            var /** @type {?} */animationTriggers = type.data['animation'];
            animationRenderer = type.data['__animationRenderer__'] = new AnimationRenderer(delegate, this._engine, animationTriggers);
            return animationRenderer;
        }
    }]);

    return AnimationRendererFactory;
}();

AnimationRendererFactory.decorators = [{ type: Injectable }];
/** @nocollapse */
AnimationRendererFactory.ctorParameters = function () {
    return [{ type: RendererFactoryV2 }, { type: AnimationEngine }];
};

var AnimationRenderer = function () {
    /**
     * @param {?} delegate
     * @param {?} _engine
     * @param {?=} _triggers
     */
    function AnimationRenderer(delegate, _engine) {
        var _triggers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, AnimationRenderer);

        this.delegate = delegate;
        this._engine = _engine;
        this.destroyNode = null;
        this.destroyNode = this.delegate.destroyNode ? function (n) {
            return delegate.destroyNode(n);
        } : null;
        if (_triggers) {
            _triggers.forEach(function (trigger) {
                return _engine.registerTrigger(trigger);
            });
        }
    }
    /**
     * @return {?}
     */


    _createClass(AnimationRenderer, [{
        key: 'destroy',
        value: function destroy() {
            this.delegate.destroy();
        }
        /**
         * @param {?} name
         * @param {?=} namespace
         * @return {?}
         */

    }, {
        key: 'createElement',
        value: function createElement(name, namespace) {
            return this.delegate.createElement(name, namespace);
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'createComment',
        value: function createComment(value) {
            return this.delegate.createComment(value);
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'createText',
        value: function createText(value) {
            return this.delegate.createText(value);
        }
        /**
         * @param {?} selectorOrNode
         * @return {?}
         */

    }, {
        key: 'selectRootElement',
        value: function selectRootElement(selectorOrNode) {
            return this.delegate.selectRootElement(selectorOrNode);
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'parentNode',
        value: function parentNode(node) {
            return this.delegate.parentNode(node);
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'nextSibling',
        value: function nextSibling(node) {
            return this.delegate.nextSibling(node);
        }
        /**
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @param {?=} namespace
         * @return {?}
         */

    }, {
        key: 'setAttribute',
        value: function setAttribute(el, name, value, namespace) {
            this.delegate.setAttribute(el, name, value, namespace);
        }
        /**
         * @param {?} el
         * @param {?} name
         * @param {?=} namespace
         * @return {?}
         */

    }, {
        key: 'removeAttribute',
        value: function removeAttribute(el, name, namespace) {
            this.delegate.removeAttribute(el, name, namespace);
        }
        /**
         * @param {?} el
         * @param {?} name
         * @return {?}
         */

    }, {
        key: 'addClass',
        value: function addClass(el, name) {
            this.delegate.addClass(el, name);
        }
        /**
         * @param {?} el
         * @param {?} name
         * @return {?}
         */

    }, {
        key: 'removeClass',
        value: function removeClass(el, name) {
            this.delegate.removeClass(el, name);
        }
        /**
         * @param {?} el
         * @param {?} style
         * @param {?} value
         * @param {?} hasVendorPrefix
         * @param {?} hasImportant
         * @return {?}
         */

    }, {
        key: 'setStyle',
        value: function setStyle(el, style, value, hasVendorPrefix, hasImportant) {
            this.delegate.setStyle(el, style, value, hasVendorPrefix, hasImportant);
        }
        /**
         * @param {?} el
         * @param {?} style
         * @param {?} hasVendorPrefix
         * @return {?}
         */

    }, {
        key: 'removeStyle',
        value: function removeStyle(el, style, hasVendorPrefix) {
            this.delegate.removeStyle(el, style, hasVendorPrefix);
        }
        /**
         * @param {?} node
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setValue',
        value: function setValue(node, value) {
            this.delegate.setValue(node, value);
        }
        /**
         * @param {?} parent
         * @param {?} newChild
         * @return {?}
         */

    }, {
        key: 'appendChild',
        value: function appendChild(parent, newChild) {
            var _this19 = this;

            this._engine.onInsert(newChild, function () {
                return _this19.delegate.appendChild(parent, newChild);
            });
        }
        /**
         * @param {?} parent
         * @param {?} newChild
         * @param {?} refChild
         * @return {?}
         */

    }, {
        key: 'insertBefore',
        value: function insertBefore(parent, newChild, refChild) {
            var _this20 = this;

            this._engine.onInsert(newChild, function () {
                return _this20.delegate.insertBefore(parent, newChild, refChild);
            });
        }
        /**
         * @param {?} parent
         * @param {?} oldChild
         * @return {?}
         */

    }, {
        key: 'removeChild',
        value: function removeChild(parent, oldChild) {
            var _this21 = this;

            this._engine.onRemove(oldChild, function () {
                return _this21.delegate.removeChild(parent, oldChild);
            });
        }
        /**
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setProperty',
        value: function setProperty(el, name, value) {
            if (name.charAt(0) == '@') {
                this._engine.setProperty(el, name.substr(1), value);
            } else {
                this.delegate.setProperty(el, name, value);
            }
        }
        /**
         * @param {?} target
         * @param {?} eventName
         * @param {?} callback
         * @return {?}
         */

    }, {
        key: 'listen',
        value: function listen(target, eventName, callback) {
            if (eventName.charAt(0) == '@') {
                var /** @type {?} */element = resolveElementFromTarget(target);

                var _parseTriggerCallback = parseTriggerCallbackName(eventName.substr(1)),
                    _parseTriggerCallback2 = _slicedToArray(_parseTriggerCallback, 2),
                    name = _parseTriggerCallback2[0],
                    phase = _parseTriggerCallback2[1];

                return this._engine.listen(element, name, phase, callback);
            }
            return this.delegate.listen(target, eventName, callback);
        }
    }]);

    return AnimationRenderer;
}();
/**
 * @param {?} target
 * @return {?}
 */


function resolveElementFromTarget(target) {
    switch (target) {
        case 'body':
            return document.body;
        case 'document':
            return document;
        case 'window':
            return window;
        default:
            return target;
    }
}
/**
 * @param {?} triggerName
 * @return {?}
 */
function parseTriggerCallbackName(triggerName) {
    var /** @type {?} */dotIndex = triggerName.indexOf('.');
    var /** @type {?} */trigger = triggerName.substring(0, dotIndex);
    var /** @type {?} */phase = triggerName.substr(dotIndex + 1);
    return [trigger, phase];
}

var WebAnimationsPlayer = function () {
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @param {?=} previousPlayers
     */
    function WebAnimationsPlayer(element, keyframes, options) {
        var _this22 = this;

        var previousPlayers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

        _classCallCheck(this, WebAnimationsPlayer);

        this.element = element;
        this.keyframes = keyframes;
        this.options = options;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._initialized = false;
        this._finished = false;
        this._started = false;
        this._destroyed = false;
        this.time = 0;
        this.parentPlayer = null;
        this._duration = options['duration'];
        this._delay = options['delay'] || 0;
        this.time = this._duration + this._delay;
        this.previousStyles = {};
        previousPlayers.forEach(function (player) {
            var styles = player._captureStyles();
            Object.keys(styles).forEach(function (prop) {
                return _this22.previousStyles[prop] = styles[prop];
            });
        });
    }
    /**
     * @return {?}
     */


    _createClass(WebAnimationsPlayer, [{
        key: '_onFinish',
        value: function _onFinish() {
            if (!this._finished) {
                this._finished = true;
                this._onDoneFns.forEach(function (fn) {
                    return fn();
                });
                this._onDoneFns = [];
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'init',
        value: function init() {
            var _this23 = this;

            if (this._initialized) return;
            this._initialized = true;
            var /** @type {?} */keyframes = this.keyframes.map(function (styles) {
                var /** @type {?} */formattedKeyframe = {};
                Object.keys(styles).forEach(function (prop, index) {
                    var /** @type {?} */value = styles[prop];
                    if (value == AUTO_STYLE) {
                        value = _computeStyle(_this23.element, prop);
                    }
                    if (value != undefined) {
                        formattedKeyframe[prop] = value;
                    }
                });
                return formattedKeyframe;
            });
            var /** @type {?} */previousStyleProps = Object.keys(this.previousStyles);
            if (previousStyleProps.length) {
                var /** @type {?} */startingKeyframe = keyframes[0];
                var /** @type {?} */missingStyleProps = [];
                previousStyleProps.forEach(function (prop) {
                    if (startingKeyframe[prop] != null) {
                        missingStyleProps.push(prop);
                    }
                    startingKeyframe[prop] = _this23.previousStyles[prop];
                });
                if (missingStyleProps.length) {
                    var i;

                    (function () {
                        var /** @type {?} */self = _this23;
                        // tslint:disable-next-line

                        var _loop3 = function _loop3() {
                            var /** @type {?} */kf = keyframes[i];
                            missingStyleProps.forEach(function (prop) {
                                kf[prop] = _computeStyle(self.element, prop);
                            });
                        };

                        for ( /** @type {?} */i = 1; i < keyframes.length; i++) {
                            _loop3();
                        }
                    })();
                }
            }
            this._player = this._triggerWebAnimation(this.element, keyframes, this.options);
            this._finalKeyframe = _copyKeyframeStyles(keyframes[keyframes.length - 1]);
            // this is required so that the player doesn't start to animate right away
            this._resetDomPlayerState();
            this._player.addEventListener('finish', function () {
                return _this23._onFinish();
            });
        }
        /**
         * \@internal
         * @param {?} element
         * @param {?} keyframes
         * @param {?} options
         * @return {?}
         */

    }, {
        key: '_triggerWebAnimation',
        value: function _triggerWebAnimation(element, keyframes, options) {
            // jscompiler doesn't seem to know animate is a native property because it's not fully
            // supported yet across common browsers (we polyfill it for Edge/Safari) [CL #143630929]
            return element['animate'](keyframes, options);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'onStart',

        /**
         * @param {?} fn
         * @return {?}
         */
        value: function onStart(fn) {
            this._onStartFns.push(fn);
        }
        /**
         * @param {?} fn
         * @return {?}
         */

    }, {
        key: 'onDone',
        value: function onDone(fn) {
            this._onDoneFns.push(fn);
        }
        /**
         * @param {?} fn
         * @return {?}
         */

    }, {
        key: 'onDestroy',
        value: function onDestroy(fn) {
            this._onDestroyFns.push(fn);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'play',
        value: function play() {
            this.init();
            if (!this.hasStarted()) {
                this._onStartFns.forEach(function (fn) {
                    return fn();
                });
                this._onStartFns = [];
                this._started = true;
            }
            this._player.play();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'pause',
        value: function pause() {
            this.init();
            this._player.pause();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'finish',
        value: function finish() {
            this.init();
            this._onFinish();
            this._player.finish();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'reset',
        value: function reset() {
            this._resetDomPlayerState();
            this._destroyed = false;
            this._finished = false;
            this._started = false;
        }
        /**
         * @return {?}
         */

    }, {
        key: '_resetDomPlayerState',
        value: function _resetDomPlayerState() {
            if (this._player) {
                this._player.cancel();
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'restart',
        value: function restart() {
            this.reset();
            this.play();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'hasStarted',
        value: function hasStarted() {
            return this._started;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            if (!this._destroyed) {
                this._resetDomPlayerState();
                this._onFinish();
                this._destroyed = true;
                this._onDestroyFns.forEach(function (fn) {
                    return fn();
                });
                this._onDestroyFns = [];
            }
        }
        /**
         * @param {?} p
         * @return {?}
         */

    }, {
        key: 'setPosition',
        value: function setPosition(p) {
            this._player.currentTime = p * this.time;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'getPosition',
        value: function getPosition() {
            return this._player.currentTime / this.time;
        }
        /**
         * @return {?}
         */

    }, {
        key: '_captureStyles',
        value: function _captureStyles() {
            var _this24 = this;

            var /** @type {?} */styles = {};
            if (this.hasStarted()) {
                Object.keys(this._finalKeyframe).forEach(function (prop) {
                    if (prop != 'offset') {
                        styles[prop] = _this24._finished ? _this24._finalKeyframe[prop] : _computeStyle(_this24.element, prop);
                    }
                });
            }
            return styles;
        }
    }, {
        key: 'domPlayer',
        get: function get() {
            return this._player;
        }
    }]);

    return WebAnimationsPlayer;
}();
/**
 * @param {?} element
 * @param {?} prop
 * @return {?}
 */


function _computeStyle(element, prop) {
    return window.getComputedStyle(element)[prop];
}
/**
 * @param {?} styles
 * @return {?}
 */
function _copyKeyframeStyles(styles) {
    var /** @type {?} */newStyles = {};
    Object.keys(styles).forEach(function (prop) {
        if (prop != 'offset') {
            newStyles[prop] = styles[prop];
        }
    });
    return newStyles;
}

var WebAnimationsDriver = function () {
    function WebAnimationsDriver() {
        _classCallCheck(this, WebAnimationsDriver);
    }

    _createClass(WebAnimationsDriver, [{
        key: 'animate',

        /**
         * @param {?} element
         * @param {?} keyframes
         * @param {?} duration
         * @param {?} delay
         * @param {?} easing
         * @param {?=} previousPlayers
         * @return {?}
         */
        value: function animate(element, keyframes, duration, delay, easing) {
            var previousPlayers = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

            var /** @type {?} */playerOptions = { 'duration': duration, 'delay': delay, 'fill': 'forwards' };
            // we check for this to avoid having a null|undefined value be present
            // for the easing (which results in an error for certain browsers #9752)
            if (easing) {
                playerOptions['easing'] = easing;
            }
            var /** @type {?} */previousWebAnimationPlayers = previousPlayers.filter(function (player) {
                return player instanceof WebAnimationsPlayer;
            });
            return new WebAnimationsPlayer(element, keyframes, playerOptions, previousWebAnimationPlayers);
        }
    }]);

    return WebAnimationsDriver;
}();
/**
 * @return {?}
 */


function supportsWebAnimations() {
    return typeof Element !== 'undefined' && typeof Element.prototype['animate'] === 'function';
}

var InjectableAnimationEngine = function (_AnimationEngine) {
    _inherits(InjectableAnimationEngine, _AnimationEngine);

    /**
     * @param {?} driver
     * @param {?} normalizer
     */
    function InjectableAnimationEngine(driver, normalizer) {
        _classCallCheck(this, InjectableAnimationEngine);

        return _possibleConstructorReturn(this, (InjectableAnimationEngine.__proto__ || Object.getPrototypeOf(InjectableAnimationEngine)).call(this, driver, normalizer));
    }

    return InjectableAnimationEngine;
}(AnimationEngine);

InjectableAnimationEngine.decorators = [{ type: Injectable }];
/** @nocollapse */
InjectableAnimationEngine.ctorParameters = function () {
    return [{ type: AnimationDriver }, { type: AnimationStyleNormalizer }];
};
/**
 * @return {?}
 */
function instantiateSupportedAnimationDriver() {
    if (supportsWebAnimations()) {
        return new WebAnimationsDriver();
    }
    return new NoOpAnimationDriver();
}
/**
 * @return {?}
 */
function instantiateDefaultStyleNormalizer() {
    return new WebAnimationsStyleNormalizer();
}
/**
 * @param {?} renderer
 * @param {?} engine
 * @return {?}
 */
function instantiateRendererFactory(renderer, engine) {
    return new AnimationRendererFactory(renderer, engine);
}
/**
 * \@experimental Animation support is experimental.
 */

var BrowserAnimationModule = function BrowserAnimationModule() {
    _classCallCheck(this, BrowserAnimationModule);
};

BrowserAnimationModule.decorators = [{ type: NgModule, args: [{
        imports: [BrowserModule],
        providers: [{ provide: AnimationDriver, useFactory: instantiateSupportedAnimationDriver }, { provide: AnimationStyleNormalizer, useFactory: instantiateDefaultStyleNormalizer }, { provide: AnimationEngine, useClass: InjectableAnimationEngine }, {
            provide: RendererFactoryV2,
            useFactory: instantiateRendererFactory,
            deps: [ɵDomRendererFactoryV2, AnimationEngine]
        }]
    }] }];
/** @nocollapse */
BrowserAnimationModule.ctorParameters = function () {
    return [];
};

var Animation = function () {
    /**
     * @param {?} input
     */
    function Animation(input) {
        _classCallCheck(this, Animation);

        var ast = Array.isArray(input) ? sequence(input) : input;
        var errors = validateAnimationSequence(ast);
        if (errors.length) {
            var errorMessage = 'animation validation failed:\n' + errors.join("\n");
            throw new Error(errorMessage);
        }
        this._animationAst = ast;
    }
    /**
     * @param {?} startingStyles
     * @param {?} destinationStyles
     * @return {?}
     */


    _createClass(Animation, [{
        key: 'buildTimelines',
        value: function buildTimelines(startingStyles, destinationStyles) {
            var /** @type {?} */start = Array.isArray(startingStyles) ? normalizeStyles(startingStyles) : startingStyles;
            var /** @type {?} */dest = Array.isArray(destinationStyles) ? normalizeStyles(destinationStyles) : destinationStyles;
            return buildAnimationKeyframes(this._animationAst, start, dest);
        }
        /**
         * @param {?} injector
         * @param {?} element
         * @param {?=} startingStyles
         * @param {?=} destinationStyles
         * @return {?}
         */

    }, {
        key: 'create',
        value: function create(injector, element) {
            var startingStyles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var destinationStyles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            var /** @type {?} */instructions = this.buildTimelines(startingStyles, destinationStyles);
            // note the code below is only here to make the tests happy (once the new renderer is
            // within core then the code below will interact with Renderer.transition(...))
            var /** @type {?} */driver = injector.get(AnimationDriver);
            var /** @type {?} */normalizer = injector.get(AnimationStyleNormalizer);
            var /** @type {?} */engine = new AnimationEngine(driver, normalizer);
            return engine.animateTimeline(element, instructions);
        }
    }]);

    return Animation;
}();

export { BrowserAnimationModule, AnimationDriver, Animation as ɵAnimation, AnimationStyleNormalizer as ɵAnimationStyleNormalizer, AnimationEngine as ɵAnimationEngine, AnimationRenderer as ɵAnimationRenderer, AnimationRendererFactory as ɵAnimationRendererFactory, InjectableAnimationEngine as ɵa, instantiateDefaultStyleNormalizer as ɵc, instantiateRendererFactory as ɵd, instantiateSupportedAnimationDriver as ɵb, WebAnimationsStyleNormalizer as ɵe };
