---
title: Email Notification - Clean Minimal
date: 2026-02-25T12:00:00.000Z
author: Daniel O'Connor
description: Email Notification template - Clean Minimal design
type: Script
# type options: Script, Widget, Component, Template, Theme, Flow, Integration
platform: ServiceNow
# platform options: ServiceNow, General, JavaScript, etc.
version: 1.0.0
category: Notification
# category options: ITSM, Employee Center, App Engine, CMDB, Portal, Integration, Notification
featured_image: portfolio-website/images/assets/clean_minimal.png
tags:
  - servicenow
  - script
  - notifications
draft: false
---

## Overview

Clean Minimal email notification. This HTML design you can bring into your instance into either a notification in full, or break up in modular design using Email Templates and Layouts.

 ![Screenshot](portfolio-website/images/assets/clean_minimal.png)

## Features

- Clean Minimal Design
- Beutiful layout of varaibles and content
- Button press actions

## Requirements

- Some fine tuning may be required in your instance depending on use of email scripts.
- Note that buttons may bleed in specific URL/href tags, please read section on this

## Installation

Use source code function on an email notification to directly paste in the HTML code for the layout. 
For a more modular approach you can use Email templates and layouts. 

## Information based Notification

```html
// If the asset is a script, paste the full code here
// Use appropriate language tag: javascript, xml, css, html, etc.
```
## Approval based Notification
Add this block into your HTML to configure a beautiful display of approval buttons

```html
<!-- ════════════════════════════════════════════════
             APPROVE / DECLINE ACTION CARD
             ════════════════════════════════════════════════ -->
<table style="background-color: #ebf4fc; border-radius: 8px; margin-bottom: 24px;" border="0" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 22px 24px;">
<p style="margin: 0 0 4px 0; color: #265173; font-size: 13px; font-weight: bold; font-family: Arial,sans-serif;">Your Response Required</p>
<p style="margin: 0 0 18px 0; color: #6b7280; font-size: 13px; font-family: Arial,sans-serif; line-height: 1.5;">Please review the request details above and select an action. Clicking a button will open a pre-addressed email &mdash; simply send it to record your decision.</p>
<!-- Approve + Decline buttons side by side -->
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr><!-- APPROVE -->
<td style="padding-right: 12px;"><span class="btn inverse" style="border-radius: 6px; background-color: #336697; padding: 11px 28px; font-family: Arial,sans-serif; font-size: 13px; font-weight: bold; color: #ffffff !important; letter-spacing: 0.02em;">✓&nbsp;&nbsp;${mailto:mailto.btn.approval}</span></td>
<!-- REJECT -->
<td><span class="btn" style="border-radius: 6px; border: 2px solid #336697; padding: 9px 28px; font-family: Arial,sans-serif; font-size: 13px; font-weight: bold; color: #336697 !important; letter-spacing: 0.02em;">✕&nbsp;&nbsp;${mailto:mailto.btn.rejection}</span></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
```

## Configure to your branding or preference

### Replace text placeholders
[YOUR_LOGO_URL]	URL of your logo uploaded in System UI › Images
[YOUR_COMPANY]	Your company or team name
[YOUR_ADDRESS]	Your company postal address
[YEAR]	Current copyright year, e.g. 2026
YOURINSTANCE	ServiceNow subdomain (in the View Ticket button href)

### Apply your brand colors
Change hexcodes in the HTML to align your branding and colour preference. 

### Styling Buttons
Additional html may be required to style the buttons correctly and avoid <a> wrapping 

### Style buttons
Add this style block to the top of your html to ensure buttons keep styling
```html
<style>
td a { color: #ffffff !important; text-decoration: none !important; }
</style>
```

### Style approval buttons
Add this style block to the top of your html to ensure approval buttons keep styling 

```html
<style>
.btn.inverse a { color: #ffffff !important; text-decoration: none !important; }
.btn a { color: #336697 !important; text-decoration: none !important; }
td a { color: #ffffff !important; text-decoration: none !important; }
</style>
```

## Changelog

**v1.0.0** — Initial release

## License

Free to use and modify. Attribution appreciated but not required.
