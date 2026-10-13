---
title: ATF Advisory and Best Practices
description: Advisory engagement to mature a customer's Automated Test Framework usage, breaking large manual tests into granular server-side ATF tests that roll up into regression suites and support a test-driven development approach.
date: 2026-10-14T12:00:00.000Z
status: In Progress
featured_image:
tags:
  - atf
  - testing
  - tdd
  - upgrade
category: Automated Test Framework
featured: false
order: 0
---

## Project Overview

A large IT services provider already used the Automated Test Framework (ATF) but held a high volume of manual regression tests in a separate tool (Spiro). Upgrades were slowed by this manual effort. I was engaged as an advisor to help the customer expand ATF coverage to support faster, more complete regression testing, and to introduce Test Driven Development (TDD) as a delivery practice.

## Challenge

- Large volume of legacy manual tests held outside the platform.
- Manual tests were long, monolithic scripts (50+ steps) written as click-by-click user instructions.
- Existing ATF tests mirrored those scripts, leaning heavily on client-side UI steps.
- Upgrade regression depended on manual effort, slowing the upgrade process.
- No test-first development habit, so tests were written after the fact, if at all.

## Solution

Rather than convert manual scripts one-to-one, I advised the customer to rethink what a test is for. ATF is not only about validating UI/UX; it is a way to verify functionality and process, much of which can run server-side.

**1. Break tests down by outcome**
Identify each distinct test outcome or acceptance criterion and make it its own test. A 50+ step manual Incident test becomes separate, isolated tests for assignment rules, SLAs, state transitions and so on.

**2. Roll granular tests up into suites**
Small tests are grouped into Test Suites that map back to the customer's existing manual processes. The "Incident Confidence" manual test is now a suite of 5+ isolated tests covering the same process, so familiar regression coverage is kept while failures become far easier to pinpoint.

**3. Shift from client-side to server-side**
Where the manual steps told a user where to click, the ATF equivalent can often create and update records and exercise logic server-side. This is faster, more stable and less sensitive to UI changes. Client-side steps are kept only where the UI itself is the thing under test.

**4. Introduce TDD**
Write the ATF test first, knowing it will fail, then develop until it passes. The test becomes the executable acceptance criteria and, once green, a permanent regression asset feeding the suites.

## Key Features

- **Outcome-based test design**: one acceptance criterion per test.
- **Suite-based regression**: granular tests aggregated to mirror existing business processes.
- **Server-side first**: client-side steps used only where UI behaviour is the target.
- **Test-first workflow**: failing test first, build to green.

## ATF Best Practices Advised

1. **Avoid the Impersonate User step by default.** Create a test user within the test and run as that user if needed. Reserve impersonation for testing security, permissions and ACLs.
2. **Keep test data inside the test.** Do not reference existing instance data. Create everything the test needs so it is repeatable across instances and survives refreshes and upgrades.
3. **Prefer server-side over client-side tests** wherever the goal is validating function or process.
4. **Do not test out-of-the-box ServiceNow functionality.** ServiceNow already tests it. Focus effort on customisations, configuration and business-specific process.

## Technologies Used

- ServiceNow Automated Test Framework (ATF)
- ATF Test Suites
- Server-side ATF steps
- Test Driven Development (TDD)

## Results

Engagement in progress. Customer is moving legacy manual tests into granular ATF tests and suites, and adopting a test-first approach for new development.

## Lessons Learned

- Converting manual scripts step-for-step carries over their weaknesses. Redesign around outcomes instead.
- Granular tests make failures diagnosable, and suites keep stakeholders' familiar view of "the Incident test".
- Moving server-side reframes ATF from "automated clicking" to "automated verification of process".
- Test isolation (own users, own data) is what makes a regression suite trustworthy across upgrades.
