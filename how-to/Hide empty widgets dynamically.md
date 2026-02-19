---
title: How to dynamically hide empty widgets in Employee Center
date: 2026-02-05T12:00:00.000Z
author: Daniel O'Connor
description: Step-by-step guide to dynamically hide widgets
difficulty: Advanced
time: 15 minutes
featured_image: images/howto/hide_widget.png
tags:
  - tutorial
  - servicenow
  - guide
  - widget
  - esc
category: ESC
draft: false
---

## Overview

In this How to article, we will learn how to dynamically hide empty widgets on Employee Center. When we say dynamic, we mean that the widget does not just hide itself, but we can reclaim the space on the page to reposition other widgets, dynamically. 
Typically widgets can be hidden OOTB, however they retain their position in the page which can sometimes lead to dead space or weight widget alignment. 

## Prerequisites

- ServiceNow instance access
- Admin rights (if needed)
- Basic knowledge of Widgets and Employee Center

## Step 1: Clone desired OOTB Widget

It is important to not directly update the provided out of the box widgets, and instead create a clone of your own widget to use. This method requires HTML updates so cannot be accomplished through instances of a widget. 

## Step 2: Update HTML in widget

The HTML section of the widget is where we will control when it renders, and how it hides in terms of space allocation.

In this example we will be using the Announcement widget, as it is a common widget asked to hide when no content. 

This line specifically controls the display based on there being no announcements

```<div ng-if="c.totalAnnouncements > 0" ng-class="...">```

Here is the full HTML you can use in the widget

```
<div ng-if="c.totalAnnouncements > 0" ng-class="['panel', 'panel-{{::c.options.color}}', 'b', 'spw-announcements-root', '{{::c.wid}}', {'accessibility-off': c.accessibilityOff}]">
<div class="panel-heading">
<h3 class="h4 panel-title"><span ng-if="c.options.glyph"><fa class="flip-icon-rtl m-r-sm" name="{{::c.options.glyph}}"></fa></span>{{::c.options.title}}</h3>
</div>
<ul class="list-group" style="max-height: none; overflow-y: auto;">
<li ng-class="['list-group-item', {'can-expand': a.canExpand, expanded: a.expanded}, cssId]" ng-repeat="a in c.announcements" ng-init="::(cssId = 'announcement-' + a.id + '-' + c.wid)">
<style ng-if="::c.options.use_display_style" ng-init="::(ds = c.getDisplayStyle(a))">
li.{{::cssId}} {
background-color: {{::ds.backgroundColor}};
text-align: {{::ds.alignment.toLowerCase()}};
}

li.{{::cssId}},
li.{{::cssId}} .details div.title div,
li.{{::cssId}} .details div.title a,
li.{{::cssId}} .details a.info-link {
color: {{::ds.foregroundColor}} !important;
}

li.{{::cssId}} .details p {
font-weight: 100;
}

li.{{::cssId}}:hover .details div.title a,
li.{{::cssId}} .details a.info-link {
text-decoration: underline;
}
</style>
<div class="details" ng-init="c.linkSetup(a)">
<div ng-if="a.canExpand" class="title" ng-class="{'expanded': !a.expanded}" data-aid="{{::a.id}}" ng-click="c.toggleDetails(a)" tabindex="0" role="button" aria-expanded="{{a.expanded}}" ng-attr-aria-controls="{{a.canExpand ? c.wid+'-'+a.id+'-summary' : undefined}}">
<div ng-if="a.linkType !== 'title'" ng-bind="::a.title" id="{{::c.wid}}-{{::a.id}}-title"></div>
<a ng-if="a.linkType === 'title'" ng-bind="::a.title" ng-href="{{::a.targetLink}}" target="{{::a.linkTarget}}" id="{{::c.wid}}-{{::a.id}}-title" tabindex="0"></a>
<span ng-if="a.canExpand" class="glyphicon glyphicon-menu-down" role="button" aria-label="{{a.expanded ? '${Hide details}' : '${Show details}'}}"></span>
</div>

<div ng-if="!a.canExpand" class="title" data-aid="{{::a.id}}">
<div ng-if="a.linkType !== 'title'" ng-bind="::a.title" id="{{::c.wid}}-{{::a.id}}-title"></div>
<a ng-if="a.linkType === 'title'" ng-bind="::a.title" ng-href="{{::a.targetLink}}" target="{{::a.linkTarget}}" id="{{::c.wid}}-{{::a.id}}-title" tabindex="0"></a>
</div>

<div ng-if="a.canExpand" id="{{::c.wid}}-{{::a.id}}-summary" aria-labelledby="{{::c.wid}}-{{::a.id}}-title" role="region" aria-hidden={{!a.expanded}}>
<p ng-if="::a.summary" ng-bind="::a.summary"></p>
<a class="info-link" ng-if="a.linkType === 'normal'" ng-bind="::a.targetLinkText" ng-href="{{::a.targetLink}}" target="{{a.linkTarget}}" aria-label="{{a.targetLinkText}}" tabindex="{{a.expanded ? 0 : -1}}"></a>
</div>
</div>
</li>
</ul>
<div class="panel-footer" ng-if="c.totalPages > 1">
<div ng-if="::c.options.paginate" class="btn-toolbar m-r pull-left">
<div class="btn-group">
<a ng-disabled="c.currentPage === 1" href="javascript&colon;void(0)" ng-click="c.currentPage === 1 ? null : c.goToPage(c.currentPage - 1)" class="btn btn-default" aria-label="${Previous page}" role="button"><i class="fa fa-chevron-left flip-icon-rtl"></i></a>
</div>
<div ng-if="c.totalPages > 1 && c.totalPages < 3" class="btn-group">
<a ng-repeat="i in c.getNumArray(c.totalPages) track by $index" ng-click="c.goToPage($index + 1)" href="javascript&colon;void(0)" ng-class="{active: ($index + 1) === c.currentPage}" type="button" class="btn btn-default" aria-label="${Page} {{$index + 1}}" role="button">{{$index + 1}}</a>
</div>
<div class="btn-group">
<a ng-disabled="c.currentPage === c.totalPages" href="javascript&colon;void(0)" ng-click="c.currentPage === c.totalPages ? null : c.goToPage(c.currentPage + 1)" class="btn btn-default" aria-label="${Next page}" role="button"><i class="fa fa-chevron-right flip-icon-rtl"></i></a>
</div>
</div>
<div ng-if="::c.options.paginate" class="m-t-xs panel-title pull-left">{{c.getPageInfo()}}</div>
<div ng-if="::(!c.options.paginate)" class="m-t-xs panel-title pull-left no-margin">${First {{::c.totalAnnouncements}} of {{::c.totalRecords}}}</div>
<a ng-if="::(c.options.view_all_page && !c.isViewAllPage())" ng-class="['pull-right', {'push-margin': c.options.paginate}]" ng-href="?id={{::c.options.view_all_page}}" role="link">${View all}</a>
<span class="clearfix"></span>
</div>
</div>
```

## Step 3: Deploy widget

With HTML updated, you can now deploy your widget. 


## Conclusion
This method can be used for multiple widgets, just requiring definition of how we count content. This example uses the Announcement widget. 

Here we can see what the widget looks like normally when empty 

images/howto/shown_widget.png

This is how it will appear after the changes

images/howto/hide_widget.png
