---
title: Popular Topic Widget
date: 2026-02-25T12:00:00.000Z
author: Daniel O'Connor
description: Modern design for Popular Topic widget that pulls banner images into the widget. 
type: Widget
# type options: Script, Widget, Component, Template, Theme, Flow, Integration
platform: ServiceNow
# platform options: ServiceNow, General, JavaScript, etc.
version: 1.0.0
category: Employee Center
# category options: ITSM, Employee Center, App Engine, CMDB, Portal, Integration
featured_image: images/assets/populartopic.png
tags:
  - servicenow
  - script
  - widget
  - esc
  - employee center
draft: false
---

## Overview

Updated Popular Topics widget to show Topic banner images on the widget, with some modern styling and interactions.

 ![Screenshot](images/assets/populartopic.png)  

## Features

- Render topic banners in widget
- Modern layout
- Animation when hovering over topic
- Instance options

## Requirements

- Employee Center

## Installation

Copy the coding blocks for the widget into a new Widget you create in your instance, then drag that widget onto your page.

### HTML

```html
<div class="popular-topic-panel panel panel-default panel-wrapper b" ng-if="(isLoading || data.popularTopics && data.popularTopics.length > 0) || data.options.show_empty_state === 'true' || data.isNodeUnderHeavyLoad">
  <div class="popular-topic-heading panel-heading b-b">
    <h2  id="{{data.instanceId}}-widget-title" class="panel-title">{{data.widgetTitle}}</h2>
  </div>
  <div class="popular-topic-body-container" ng-if="isLoading">
    <div class="skeleton-loader-wrapper">
      <div class="skeleton-loader" ng-repeat = "item in [1,2]"></div>
    </div>
  </div>
  <div class="popular-topic-panel-body" ng-if = "!isLoading">
    <div class="popular-topic-empty-state" ng-if="data.options.show_empty_state === 'true' && (!data.popularTopics || data.popularTopics.length === 0) && !data.isNodeUnderHeavyLoad">
      <p class="popular-topic-empty-text">
        ${We don't have any popular topics to show you yet.}
      </p>
    </div>
    <div class="popular-topic-empty-state" ng-if="data.isNodeUnderHeavyLoad">
      <div class="degraded-icon">
        <i class="fa fa-exclamation-triangle"></i>
      </div>
      <p class="popular-topic-empty-text">
        ${We're currently experiencing heavy usage. Try again later.}
      </p>
    </div>
    <div class="popular-topic-body-container"
         ng-class="{'small': data.isSmall, 'no-icon': !data.icon, 'fixed': isFixed }" 
         ng-if="data.popularTopics && data.popularTopics.length > 0 && !data.isNodeUnderHeavyLoad"
         aria-labelledby="{{data.instanceId}}-widget-title"
         role="region">

      <div class="popular-topic-body" ng-class="getClass()" ng-style="getStyle()"
           ng-repeat="topic in data.popularTopics">
        <a class="popular-topic-link" ng-class="{'small': data.isSmall}" data-ng-attr-aria-label="{{topic.topic}}"
           ng-href="{{topic.topicUrl}}" ng-keydown="c.keydownAction($event)">
          <div class="topic-banner-image" ng-if="topic.bannerImage" 
			ng-style="{'background-image': 'url(' + topic.bannerImage + ')'}">
			</div>
			<img ng-if="!topic.bannerImage" ng-src="{{topic.icon}}" alt="" />
          <div class="popular-topic-caption">
            <span class = "popular-topic-title" data-toggle="tooltip" title="{{topic.topic}}">
              {{topic.topic}}
            </span>
          </div>
        </a>
        <div ng-class="{'mesp-favorite': data.isMobileApp, 'small': data.isSmall}" class="popular-topic-favorite-container">
          <sp-widget widget="topic.favoriteWidget"></sp-widget>
        </div>
      </div>
    </div>
  </div>
</div>
```

### CSS

```css
/*** Variables declaration **/
$border-radius: 8px;
$card-height: 180px;
$banner-height: 120px;
$rm: 10px;
$text-primary: #181a1f !default;
$headings-font-weight: 600 !default;
$sp-panel-box-shadow: 0 4px 12px 0 rgba(23, 40, 52, 0.12) !default;

.popular-topic-panel * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.popular-topic-panel {
  background-color: transparent;
  border-radius: $border-radius;
  margin-bottom: $rm * 1.6;
  color: $text-primary;
}

.popular-topic-panel > .popular-topic-heading {
  word-wrap: break-word;
  padding: $rm * 2.4 0;
  color: $text-primary;
  background: none;
  
  .panel-title {
    font-size: 24px;
    font-weight: $headings-font-weight;
  }
}

.popular-topic-body-container {
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Changed from auto-fill to auto-fit */
  grid-gap: 2rem;
  justify-content: start; /* Align items to start if not enough to fill */
}

.popular-topic-body {
  margin-bottom: 0;
  background-color: #F4F4F4 !important;
  border-radius: $border-radius;
  position: relative;
  overflow: hidden;
  height: $card-height;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.popular-topic-body:hover {
  transform: translateY(-4px);
  box-shadow: $sp-panel-box-shadow;
}

.popular-topic-body > .popular-topic-link {
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
  color: $text-primary;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: $border-radius;
  overflow: hidden;
}

/* Banner Image Styling */
.topic-banner-image {
  width: 100%;
  height: $banner-height;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-shrink: 0;
}

/* Caption/Title Section */
.popular-topic-caption {
  background-color: #F4F4F4 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;
}

.popular-topic-caption .popular-topic-title {
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #181A1F !important;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.4;
}

/* Favorite Icon */
.popular-topic-favorite-container {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  
  button {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    padding: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

/* Empty State */
.popular-topic-empty-state {
  height: 15 * $rm;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.4rem;
  text-align: center;
  flex-direction: column;
  
  .popular-topic-empty-text {
    font-size: 16px;
    color: #666;
  }
}

/* Responsive Grid */
@media (max-width: 768px) {
  .popular-topic-body-container {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .popular-topic-body-container {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
  
  .popular-topic-body {
    height: 160px;
  }
  
  .topic-banner-image {
    height: 100px;
  }
}

/* Loading Skeleton */
.skeleton-loader {
  animation: progress 2s ease-in-out infinite;
  background: rgb(239, 241, 246) no-repeat;
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0));
  border-radius: $border-radius;
  width: 100%;
  height: $card-height;
}

.skeleton-loader-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 2rem;
}

/* Setup:

1. Cards are taller (180px) to accommodate banner images
2. Banner image takes top portion** (120px) with proper aspect ratio
3. Title goes below banner in clean white section
4. Hover effect - cards lift up slightly
5. Responsive grid - adjusts columns based on screen size
6. Modern design - rounded corners, nice shadows
7. Fallback - shows icon if no banner image

Card Structure:

┌─────────────────────┐
│                     │
│   Banner Image      │ 120px
│   (cover, centered) │
│                     │
├─────────────────────┤
│                     │
│   Topic Title       │ 60px
│   (centered)        │
│                     │
└─────────────────────┘
Total: 180px height */
```



### Client Script

```javascript
api.controller = function($scope) {
    var CONST = {
        'BORDER_COLOR': 'border-color',
        'TOPIC_SELECTOR': '.popular-topic-body-container',
        'FN_RESIZE': 'resizePopularTopicWidget',
        'CONTAINER': '.container',
        'SMALL': 'small',
        'NO_ICON': 'no-icon',
        'POPULAR_TOPIC_BODY': '.popular-topic-body',
        'IE_PREFIX': 'Trident/',
        'IE': 'ie',
        'MARGIN': 'mr-0',
        'H5_SELECTOR': '.popular-topic-caption .popular-topic-title',
        'FONT_SIZE': 'font-size',
        'FIXED_COUNT': 4,
        'LIMIT': 12
    };
    var c = this;
    $scope.isLoading = false;
    var data = c.data;
    $scope.isFixed = false;
    var isIE = window.navigator.userAgent.indexOf(CONST.IE_PREFIX) !== -1;

    /**
     * Return the theme class
     * @return  {string} themeClass - Theme class
     *
     */
    $scope.getClass = function() {
        var isHex = data && data.isHex || false;
        return !isHex ? getThemeClass(data.borderColor) : "";
    };

    /**
     * Return the style object
     * @return  {object} style - Style object
     *
     */
    $scope.getStyle = function() {
        var style = {};
        style[CONST.BORDER_COLOR] = data && data.hexcode;
        var isHex = data && data.isHex || false;
        return isHex ? style : {};
    };

    var registered = false;
    var resizeEvents = $._data(window, "events").resize;
    if (resizeEvents) {
        resizeEvents.forEach(function(callback) {
            var handler = callback.handler;
            var name = handler.name;
            if (name === CONST.FN_RESIZE) {
                registered = true;
            }
        });
    }

    if (!registered) {
        $(window).resize(resizePopularTopicWidget);
    }

    $scope.$evalAsync(resizePopularTopicWidget);
    $scope.$evalAsync(topicTooltip);

    /**
     * Return theme class name based on option
     * @return  {string} theme-class - theme class name
     *
     */
    function getThemeClass(background) {
        var THEME = {
            'border-primary': 'primary-color',
            'border-secondary': 'secondary-color',
            'border-tertiary': 'tertiary-color'
        };
        var result = 'tertiary-color';
        if (background in THEME)
            result = THEME[background];

        return result;
    }

    /**
     * Resize the topic column based on the width
     */
    function resizePopularTopicWidget() {
        var topicCont = $(CONST.TOPIC_SELECTOR);
        if (isIE) {
            resizeWidgetIE(topicCont);
        }
        topicTooltip();
    }

    /**
     * IE responsive support
     */
    function resizeWidgetIE(topicCont) {
        var MIN_TOPIC_WIDTH = 150;
        var MAX_TOPIC_WIDTH = 250;
        var PADDING = 16;
        var MIN_BREAK_POINT = 330;
        var MOBILE_WIDTH = 400;
        $(CONST.TOPIC_SELECTOR).addClass(CONST.IE);
        topicCont.each(function(i, container) {
            var availablePanelWidth = getPanelWidth(container);
            var isSmall = $(container).hasClass(CONST.SMALL);
            var noIcon = $(container).hasClass(CONST.NO_ICON);
            var limit = CONST.LIMIT;
            var numberOfTopic = Math.min(Math.round(availablePanelWidth / MIN_TOPIC_WIDTH), limit);
            numberOfTopic = calcTopicCount(numberOfTopic, MIN_TOPIC_WIDTH, availablePanelWidth, PADDING, true);
            isSmall = true;
            if (availablePanelWidth <= MOBILE_WIDTH) {
                numberOfTopic = 2;
                if ((isSmall && !noIcon) || (availablePanelWidth <= MIN_BREAK_POINT)) {
                    numberOfTopic = 1;
                }
            }
            var topicWidth = Math.floor((availablePanelWidth - ((numberOfTopic) * PADDING) - 1) / numberOfTopic);
            topicWidth = (numberOfTopic === 1 && isSmall && !noIcon) ? availablePanelWidth : Math.min(topicWidth, MAX_TOPIC_WIDTH);
            var topicList = $(CONST.POPULAR_TOPIC_BODY, container);
            topicList.each(function(j, topic) {
                $(topic).css('width', topicWidth);
                if (isSmall && !noIcon) {
                    $(topic).css('max-width', 'inherit');
                }
            });
        });
    }

    /**
     * Calculating topic count to be shown
     */
    function calcTopicCount(topicCount, minTopicWidth, maxWidth, padWidth, isIE) {
        var calcWidth = calculateWidth(minTopicWidth, padWidth, topicCount, isIE);
        while ((topicCount > 0) && (calcWidth > maxWidth)) {
            topicCount--;
            calcWidth = calculateWidth(minTopicWidth, padWidth, topicCount, isIE);
        }
        return topicCount;
    }

    /**
     * Calacuate width based on available space
     */
    function calculateWidth(minTopicWidth, padWidth, topicCount, isIE) {
        var calcWidth = 0;
        var gridGapCount = topicCount - 1;
        if (isIE) {
            gridGapCount = topicCount;
        }
        calcWidth = (minTopicWidth * topicCount) + (gridGapCount * padWidth);
        return calcWidth;
    }

    /**
     * Get panel space of widget
     */
    function getPanelWidth(topicPanel) {
        var panelWidth = $(topicPanel).width();
        var parentWidth = $(topicPanel).parents(CONST.CONTAINER).width() || panelWidth;
        return Math.min(parentWidth, panelWidth);
    }

    /**
     * Checking ellipsis applied to topic names
     */
    function checkEllipsis(tooltip) {
        if (isIE) {
            return tooltip.scrollWidth > $(tooltip).parent().width();
        }
        var fontSize = parseFloat($(tooltip).css(CONST.FONT_SIZE));
        return (($(tooltip).height() + fontSize / 2) < tooltip.scrollHeight);
    }

    /**
     * Applying tooltip to ellipsis elements
     */
    function topicTooltip() {
        var topics = $(CONST.H5_SELECTOR);
        topics.tooltip('enable');
        topics.each(function(i, tooltip) {
            if (!checkEllipsis(tooltip)) {
                $(tooltip).tooltip('disable');
            }
        });
    }

    c.asyncGet = function() {
        $scope.isLoading = true;
        c.data.action = "loadData";
        c.server.update().then(function(response) {
            fetchPopularTopicsData();
        });
    }
    var fetchPopularTopicsData = function() {
        $scope.isLoading = false;
        $scope.isFixed = (data.popularTopics && (data.popularTopics.length < CONST.FIXED_COUNT)) || false;
        setTimeout(resizePopularTopicWidget);
        setTimeout(topicTooltip);
    };

    var load_config = c.data.load_config;
    if (load_config === "async" && !data.asyncLoad)
        setTimeout(c.asyncGet);
    else
        fetchPopularTopicsData();
}
```

## Server Script

```javascript
(function() {
    if (options.widget_behavior_during_high_load === 'lite_view' && new sn_ex_emp_fd.PortalPerformanceUtil().getNodeStatus()) {
        data.isNodeUnderHeavyLoad = true;
        data.isLoading = false;
        var title = [options.widget_title];
        data.widgetTitle = gs.getMessage(title);
        return;
    }
    data.load_config = options.load_config;
    data.asyncLoad = options.async_load || false;
    data.options = options;
    populateOptions(data);
    if (data.load_config === "async" && !input && !data.asyncLoad)
        return;
    var limit = options.topic_limit;
    var taxonomy = $sp.getTaxonomies();
    data.instanceId = $sp.getDisplayValue("sys_id");
    if (!taxonomy || taxonomy.length === 0) {
        return;
    }

    var stats = {};
    stats.callerId = data.instanceId;
    stats.textPrefix = 'Popular topics';
    stats.startTime = new GlideDateTime();
    stats.shortDesc = 'Load Data';
    stats.guid = gs.generateGUID();

    var session = gs.getSession();
    var popularTopicsDataKey = 'sn_ex_sp_popular_topics_data' + taxonomy + session.getLanguage() + gs.getUserID();
    var popularTopicsData = JSON.parse(session.getClientData(popularTopicsDataKey));
    if (popularTopicsData === null || popularTopicsData.length != limit) {
        data.popularTopics = new PopularTopicsUtil().getPopularTopics(taxonomy, limit, false, data.instanceId, stats.guid);
        
        // ADD BANNER IMAGES - Override icon with banner image
        data.popularTopics.forEach(function(topic) {
            var topicGR = new GlideRecord('topic');
            if (topicGR.get(topic.topicId)) {
                if (topicGR.banner_image) {
                    topic.bannerImage = topicGR.banner_image.getDisplayValue();
                }
            }
        });
        
        session.putClientData(popularTopicsDataKey, JSON.stringify(data.popularTopics));
    } else {
        data.popularTopics = popularTopicsData;
    }
    addFavoriteWidget(data.popularTopics);

    new sn_ex_sp.PerformanceIndicatorUtil().postInstanceHotspot(stats);
})();

function addFavoriteWidget(popularTopics) {
    popularTopics.map(function(a) {
        a.favoriteWidget = $sp.getWidget('ec_favorite', {
            'table': 'topic',
            'sys_id': a.topicId,
            'common_page': true
        });
    });
}

/**
 * Read and initialize the options
 * @param {object} data - Data object
 *
 */
function populateOptions(data) {
    var CONST = {
        'HEX': 'hexcode',
        'NORMAL': 'normal',
        'SMALL': 'small',
        'TRUE': 'true',
        'FALSE': 'false',
        'DEFAULT_COLOR': '#FFFFFF',
        'DEFAULT_BORDER_OPTION': 'border-tertiary',
        'REGEX': /^#([0-9A-F]{3}){1,2}$/i
    };
    var option = data.options;
    data.isNormal = (option.display_size.toLowerCase() === CONST.NORMAL);
    data.isSmall = (option.display_size.toLowerCase() === CONST.SMALL);
    data.borderColor = option.border_color.toLowerCase();
    data.icon = option.icon.toLowerCase() === CONST.TRUE;
    data.isHex = (data.borderColor === CONST.HEX);
    data.hexcode = option.hexcode;
    var title = [option.widget_title];
    data.widgetTitle = gs.getMessage(title);

    if (data.isHex) {
        if (!CONST.REGEX.test(option.hexcode)) {
            data.borderColor = CONST.DEFAULT_BORDER_OPTION;
            data.isHex = false;
        }
    }
}
```

## Additional Options

```json
{
	"widget_title": {
		"value": "Popular Topics",
		"displayValue": "Popular Topics"
	},
	"topic_limit": {
		"value": "4",
		"displayValue": "4"
	},
	"display_size": {
		"value": "Normal",
		"displayValue": "Normal"
	},
	"border_color": {
		"value": "Border-tertiary",
		"displayValue": "Border-tertiary"
	},
	"hexcode": {
		"value": "",
		"displayValue": ""
	},
	"icon": {
		"value": "true",
		"displayValue": "true"
	},
	"load_config": {
		"value": "async",
		"displayValue": "Asynchronous"
	},
	"show_empty_state": {
		"value": "false",
		"displayValue": "false"
	},
	"widget_behavior_during_high_load": {
		"value": "lite_view",
		"displayValue": "Less detailed view to improve performance"
	}
}
```


## Changelog

**v1.0.0** — Initial release

## License

Free to use and modify. Attribution appreciated but not required.
