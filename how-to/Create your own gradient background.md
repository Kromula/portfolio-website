---
title: How to Create your own gradient backgrounf for Employee Center
date: 2026-02-05T12:00:00.000Z
author: Daniel O'Connor
description: Step-by-step guide to setup a new background for ec_standard_home page
difficulty: Intermediate
featured_image: /images/uploads/your-image.png
tags:
  - tutorial
  - servicenow
  - guide
  - employee center
  - portal
category: Employee Center
draft: false
---

## Overview

This How to guide outlines how you can add your own gradient image, to replace the standard out of the box green shaded background for Employee Center standard.

## Step 1: Explaining the setup

Employee Center standard utilises the ec_standard_home page, which by default comes with a gradient green style background. This background behaves in a dynamic fashion and adds a nice, modern look to the landing page. 

![Screenshot](images/howto/custombackground/ootb.png)  

Finding this background was be a little confusing. 

Background images are stored on the actual page record, as attachments.
  
![Screenshot](images/howto/custombackground/ec_page.png)  

The attachments on this record, are found at /sys_attachment_list. Show Matching on table sp_page to quickly return the attachments we need.  
There are multiple gradient backgrounds shipped out of the box. 

![Screenshot](images/howto/custombackground/attachments.png)  

The sys_id of these records, is what we see defined as a .iix variable on the ec_standard_page  

![Screenshot](images/howto/custombackground/variable.png)  

## Step 2: Creating your own background  

You will notice from the shipped out of the box background, these are .svg files. There file types are images with code within them, to structure the image using vectors.  

This is the .svg code shipped with the out of the box gradient background 

''' <svg width="1440" height="700" viewBox="0 0 1440 700" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
<g clip-path="url(#clip0_58_14388)">
<mask id="mask0_58_14388" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="700">
<path d="M1440 0H0V700H1440V0Z" fill="url(#paint0_linear_58_14388)"/>
</mask>
<g mask="url(#mask0_58_14388)">
<g opacity="0.33" filter="url(#filter0_f_58_14388)">
<path d="M1539.18 182.491C1537.83 -80.6678 1169.77 -292.118 717.086 -289.797C264.405 -287.476 -101.471 -72.2618 -100.121 190.897C-98.7717 454.055 269.292 665.506 721.972 663.184C1174.65 660.863 1540.53 445.649 1539.18 182.491Z" fill="#63DF4E"/>
</g>
<g opacity="0.15" filter="url(#filter1_f_58_14388)">
<path d="M1494.26 -134.279C1492.91 -397.437 1144.96 -608.991 717.085 -606.797C289.214 -604.603 -56.5506 -389.492 -55.2012 -126.333C-53.8517 136.825 294.101 348.379 721.972 346.185C1149.84 343.991 1495.61 128.88 1494.26 -134.279Z" fill="#00FF33"/>
</g>
<g opacity="0.25" filter="url(#filter2_f_58_14388)">
<path d="M708 338C1053.73 338 1334 154.66 1334 -71.5005C1334 -297.661 1053.73 -481 708 -481C362.27 -481 82 -297.661 82 -71.5005C82 154.66 362.27 338 708 338Z" fill="#52B8FF"/>
</g>
<g opacity="0.16" filter="url(#filter3_f_58_14388)">
<path d="M720 272C958.035 272 1151 117.762 1151 -72.5002C1151 -262.762 958.035 -417 720 -417C481.965 -417 289 -262.762 289 -72.5002C289 117.762 481.965 272 720 272Z" fill="#52B8FF"/>
</g>
</g>
</g>
<defs>
<filter id="filter0_f_58_14388" x="-200.125" y="-389.816" width="1839.31" height="1153.02" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_58_14388"/>
</filter>
<filter id="filter1_f_58_14388" x="-155.205" y="-706.814" width="1749.47" height="1153.02" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_58_14388"/>
</filter>
<filter id="filter2_f_58_14388" x="-48" y="-611" width="1512" height="1079" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="65" result="effect1_foregroundBlur_58_14388"/>
</filter>
<filter id="filter3_f_58_14388" x="209" y="-497" width="1022" height="849" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_58_14388"/>
</filter>
<linearGradient id="paint0_linear_58_14388" x1="1033" y1="-4.52473e-05" x2="1032.99" y2="455" gradientUnits="userSpaceOnUse">
<stop stop-color="#F6F6F8"/>
<stop offset="1" stop-color="#F6F6F8" stop-opacity="0"/>
</linearGradient>
<clipPath id="clip0_58_14388">
<rect width="1440" height="700" fill="white"/>
</clipPath>
</defs>
</svg> '''  

What you may notice from this code, is you can see Hexcode being defined at various points. This is where you can define your color scheme, for the gradient effect.

### AI Tip  
You can add this code to your AI tool of choice, with your hexcodes and ask it to structure your version to save time!

## Step 3: Add your background image  

Like we saw earlier, we need to take your newely constructed .svg file and add it as an attachment to the ec_standard_page.

## Step 4: Get the attachment sys_id  

Once you have attached, go to sys_attachment we learned earlier (sort by created date to quickly find yours) and right click to select 'Copy sys_id'.  

## Step 5: Update your background variable  

Finally, go back to the ec_standard_home page and change the sys_id for $background-desktop: with yours (remember the .iix) 

## Conclusion

When next loading your Employee Center, you will now see your new background gradient image in effect. 
