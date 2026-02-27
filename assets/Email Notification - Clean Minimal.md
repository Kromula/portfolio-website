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
featured_image: images/assets/clean_minimal.png
tags:
  - servicenow
  - script
  - notifications
draft: false
---

## Overview

Clean Minimal email notification. This HTML design you can bring into your instance into either a notification in full, or break up in modular design using Email Templates and Layouts.

 ![Screenshot](images/assets/clean_minimal.png)

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

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ServiceNow Notification</title>
</head>
<body style="margin:0;padding:0;background:#F4F4F4;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background:#F4F4F4;padding:40px 20px;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;
                 box-shadow:0 4px 24px rgba(0,0,0,0.14);">

          <!-- 6px gradient top strip -->
          <tr>
            <td height="6" style="background:linear-gradient(90deg,#265173 0%,#336697 25%,#5D93CD 55%,#84ADD8 80%,#ACC7E2 100%);
                                  font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- ═══ WHITE HEADER ═══ -->
          <tr>
            <td style="background-color:#ffffff;padding:22px 40px;border-bottom:1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color:#F4F4F4;border:2px dashed #ACC7E2;border-radius:6px;padding:8px 18px;">
                          <p style="margin:0;color:#84ADD8;font-size:12px;font-weight:700;font-family:Arial,sans-serif;letter-spacing:0.05em;">[ YOUR LOGO ]</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle">
                    <span style="color:#6b7280;font-size:12px;font-family:Arial,sans-serif;">
                      IT Service Notification
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          
        <!-- ═══ BODY ═══ -->
        <tr>
          <td style="background-color:#ffffff;padding:28px 40px 32px;">

            <h2 style="margin:0 0 5px 0;color:#111827;font-size:17px;font-weight:600;font-family:Arial,sans-serif;">
              Your ticket has been updated
            </h2>
            <p style="margin:0 0 20px 0;color:#6b7280;font-size:12px;font-family:Arial,sans-serif;">
              Incident ${number} &bull; ${opened_at}
            </p>

            <p style="margin:0 0 10px 0;color:#374151;font-size:14px;font-family:Arial,sans-serif;">
              Hello <strong>${caller_id.first_name}</strong>,
            </p>
            <p style="margin:0 0 20px 0;color:#374151;font-size:14px;line-height:1.6;font-family:Arial,sans-serif;">
              Your incident ticket has been updated with new information. Please review the changes and take any necessary action.
            </p>

            <!-- Ticket Info Card -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0"
              style="background-color:#F4F4F4;border-left:4px solid #5D93CD;border-radius:6px;margin-bottom:22px;">
              <tr>
                <td style="padding:16px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="50%" style="padding-bottom:12px;vertical-align:top;">
                        <p style="margin:0 0 2px 0;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;font-family:Arial,sans-serif;">Status</p>
                        <p style="margin:0;color:#111827;font-size:13px;font-weight:600;font-family:Arial,sans-serif;">${state}</p>
                      </td>
                      <td width="50%" style="padding-bottom:12px;vertical-align:top;">
                        <p style="margin:0 0 2px 0;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;font-family:Arial,sans-serif;">Priority</p>
                        <p style="margin:0;color:#111827;font-size:13px;font-weight:600;font-family:Arial,sans-serif;">${priority}</p>
                      </td>
                    </tr>
                    <tr>
                      <td width="50%" style="vertical-align:top;">
                        <p style="margin:0 0 2px 0;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;font-family:Arial,sans-serif;">Assigned To</p>
                        <p style="margin:0;color:#111827;font-size:13px;font-weight:600;font-family:Arial,sans-serif;">${assigned_to.name}</p>
                      </td>
                      <td width="50%" style="vertical-align:top;">
                        <p style="margin:0 0 2px 0;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;font-family:Arial,sans-serif;">Updated</p>
                        <p style="margin:0;color:#111827;font-size:13px;font-weight:600;font-family:Arial,sans-serif;">${sys_updated_on}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Action Button -->
            <!-- ⚠ Replace YOURINSTANCE with your ServiceNow instance name (e.g. companyname) -->
            <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
              <tr>
                <td bgcolor="#336697" style="border-radius:6px;mso-padding-alt:0;">
                  <a href="https://YOURINSTANCE.service-now.com${URI}"
                    style="display:inline-block;color:#ffffff;font-family:Arial,sans-serif;font-size:13px;font-weight:600;text-decoration:none;padding:11px 26px;border-radius:6px;">
                    View Ticket Details
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 20px 0;color:#6b7280;font-size:13px;font-family:Arial,sans-serif;">
              If you have any questions, please contact our support team.
            </p>

            <!-- Sign-off -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0"
              style="border-top:1px solid #e5e7eb;">
              <tr>
                <td style="padding-top:16px;">
                  <p style="margin:0 0 3px 0;color:#6b7280;font-size:12px;font-family:Arial,sans-serif;">Best regards,</p>
                  <p style="margin:0;color:#111827;font-size:13px;font-weight:600;font-family:Arial,sans-serif;">ServiceNow Support Team</p>
                </td>
              </tr>
            </table>

          </td>
        </tr>
          
        <tr>
          <td style="background-color:#336697;padding:28px 40px 26px;border-radius:0 0 12px 12px;">
            <p style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 10px 0;font-family:Arial,sans-serif;">Thank you</p>
            <p style="color:rgba(255,255,255,0.72);font-size:12px;margin:0 0 3px 0;font-family:Arial,sans-serif;">[YOUR COMPANY ADDRESS]</p>
            <p style="color:rgba(255,255,255,0.72);font-size:12px;margin:0 0 22px 0;font-family:Arial,sans-serif;">&copy; [YEAR] [YOUR COMPANY]. All rights reserved.</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle">
                  <a href="${mail_preferences_link}" style="color:#ffffff;font-size:12px;font-family:Arial,sans-serif;text-decoration:underline;">Manage Notification Preferences</a>
                </td>
                <td align="right" valign="middle">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding-left:6px;">
                        <a href="#" style="display:block;width:28px;height:28px;background:rgba(255,255,255,0.18);border-radius:4px;text-align:center;line-height:28px;color:rgba(255,255,255,0.80);font-size:11px;font-family:Arial,sans-serif;font-weight:700;text-decoration:none;">in</a>
                      </td>
                      <td style="padding-left:6px;">
                        <a href="#" style="display:block;width:28px;height:28px;background:rgba(255,255,255,0.18);border-radius:4px;text-align:center;line-height:28px;color:rgba(255,255,255,0.80);font-size:12px;font-family:Arial,sans-serif;font-weight:700;text-decoration:none;">&#120143;</a>
                      </td>
                      <td style="padding-left:6px;">
                        <a href="#" style="display:block;width:28px;height:28px;background:rgba(255,255,255,0.18);border-radius:4px;text-align:center;line-height:28px;color:rgba(255,255,255,0.80);font-size:11px;font-family:Arial,sans-serif;font-weight:700;text-decoration:none;">&#9654;</a>
                      </td>
                      <td style="padding-left:6px;">
                        <a href="#" style="display:block;width:28px;height:28px;background:rgba(255,255,255,0.18);border-radius:4px;text-align:center;line-height:28px;color:rgba(255,255,255,0.80);font-size:12px;font-family:Arial,sans-serif;font-weight:700;text-decoration:none;">f</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
```
## Approval based Notification
Add this block into your HTML to configure a beautiful display of approval buttons

![Screenshot](images/assets/approvals.png)

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
