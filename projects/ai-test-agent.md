---
title: AI Test Agent
description: Claude-based agent built for an internal ServiceNow AI project that reads story acceptance criteria and generates, delivers and runs ATF tests, cutting the manual testing burden on implementation projects.
client: ServiceNow (Internal)
date: 2026-10-14T12:00:00.000Z
status: In Progress
icon: 🤖
tags:
  - ai
  - atf
  - claude
  - build agent
  - autonomous engineer
  - test agent
category: Automation
featured: true
order: 1
---

## Project Overview

An internal ServiceNow AI project aims to run ServiceNow-led implementations from a single, AI-powered instance, with AI tooling that assists delivery and reduces implementation time. As part of a small team, I helped take "Test Agent" from concept to a working product: a Claude-based agent that reviews a story and its development, then creates the ATF tests needed to cover it.

Following a successful build, leadership decided to merge the tool into the core Build Agent product. I am now part of the migration team moving our tooling into the mainline product as plugins.

The target audience is ServiceNow project teams: Engagement Managers, Business Process Consultants and Technical Consultants.

## Challenge

- Manual testing is a long-standing drag on implementation projects.
- Testing is assumed to be customer-owned, but customers are often unsure how to approach it.
- Project teams spend time helping customers write test plans, or training testers on how to test.
- Nothing existed to generate ATF tests programmatically, and there was no SDK support for it at the start of the build.

## Solution

Test Agent works from the story's Acceptance Criteria:

1. **Review**: the agent reads the story's acceptance criteria and the related development.
2. **Plan**: it generates a test plan providing pass/fail coverage for each criterion.
3. **Human review**: a Technical Consultant can revise the plan before anything is built.
4. **Build and deliver**: tests are built and delivered to the customer's dev instance as an update set.
5. **Run**: tests run headlessly through Cloud Runner.
6. **Report**: results return to the user on the story. The consultant can then move the story to complete, or request revisions.

Throughout, the agent resolves issues it encounters on its own as far as it can.

## Key Features

- **Acceptance-criteria driven**: coverage is traced directly to what the story must deliver.
- **Human in the loop**: consultants review and revise the plan before build.
- **Self-correcting**: the agent attempts to fix problems it hits during build and run.
- **Headless execution**: Cloud Runner runs tests with no manual steps, and results land back on the story.
- **Knowledge Repo**: a store the agent learns from to understand what a good ATF test looks like.
- **Test creation kit**: tooling to manage test creation and packaging into update sets.

## My Contribution

- Built a number of the agent's core skills.
- Created the **Knowledge Repo**, which teaches the agent the characteristics of a good ATF test, applying established ATF best practices.
- Worked as one of a small team of five from concept through to a working tool.
- Now working on the migration of the tool into Build Agent as plugins.

## Technologies Used

- Claude (agentic AI)
- ServiceNow Automated Test Framework (ATF)
- ServiceNow SDK
- Cloud Runner
- Update sets
- Docker (local development)

## Results

In progress. Test Agent was built successfully and is being absorbed into the Build Agent product. Moving a five-person team's work into a 300+ engineer product team also brings access to the latest SDK and native ATF APIs.

## Lessons Learned

- **Test in a real instance early.** Development and testing ran locally in Docker and worked well, but deploying to a shared dev instance surfaced numerous issues. None were caused by the agent. Five teams were building multiple tools on the same instance, and interference from other agents and work we couldn't see locally appeared. A real, shared environment exposes things a local setup cannot.
- **Build the missing tooling.** With no SDK support for ATF at the start, we created our own kit. Public SDKs now provide native ATF APIs, validating the need.
- **Keep a human in the loop.** Letting consultants review the plan before build keeps quality and trust high.
