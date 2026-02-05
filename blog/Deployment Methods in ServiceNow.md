---
title: Deployment methods in ServiceNow
date: 2026-02-05T12:00:00.000Z
author: Daniel O'Connor
description: Blog post on deployment methods
featured_image: /images/uploads/your-image.png
tags:
  - servicenow
  - devops
  - updatesets
  - studio
  - ide
  - pipeline
category: ServiceNow
draft: false
---

# Deployment Approaches in ServiceNow

## Intro

There are three core ways to move changes between ServiceNow environments today:

- **Update Sets**
- **Application Repository**
- **Source Control (Git)**

None of these are universally "best," despite what LinkedIn hot takes may claim. Each solves a different type of problem, and each has its own trade-offs. In reality, most organizations end up using a mix of them depending on maturity, work style, and the type of change being deployed.

This page outlines where each method fits, when it doesn't, and how they can work together.

> **Note:** The opinions and information below are presented as opinion by the author, and do not represent an Official Best Practice by ServiceNow.

---

## Update Sets

Update Sets are often the first deployment mechanism people learn in ServiceNow — and they're still the most broadly applicable. They capture platform configuration changes and allow them to be moved across instances (e.g., dev → test → prod).

### Good for:

- Quick fixes and incremental configuration
- Changes to global platform components (ACLs, dictionary, form layouts, notification templates, etc.)
- Prototyping and iterative admin work
- Smaller or newer teams without a complex DevOps workflow
- Making modifications or changes to ServiceNow products that were built in Global
- Update sets can be 'batched' resulting in a single update set deploy

### Less ideal for:

- No version control or natural branching model
- Easy to override someone else's configuration if not coordinated
- Manual dependency resolution
- Difficult to use for reusable or productized development
- Rolling back from a Batch can be difficult and messy

### Bottom line:

Update Sets aren't "dead" — they're just not ideal for structured, team-based app development. They *are* still the right tool for global configuration and one-off admin work.

---

## Application Repository

The App Repo exists for one main job: treating a scoped application as a versioned product.

When you publish an application version to the repository, it becomes a deployable artifact. This introduces lightweight governance: installation, rollback, comparison, and dependency tracking.

### Good for:

- Scoped applications with a clear lifecycle
- Shared or reusable modules/features
- Controlled releases (dev → test → prod)
- App Engine, store apps, enterprise modularization
- Simple and easy deployment and rollbacks

### Less ideal for:

- Global configuration
- Quick fixes
- Environments where no one owns version discipline

### Bottom line:

If you're building an application rather than configuring the platform, App Repo is usually the first "step up" from update sets.

---

## Source Control (Git)

Connecting ServiceNow applications to Git unlocks proper software engineering workflows: branching, merge requests, code reviews, history, and automation pipelines.

But Source Control only applies to things that *belong to an application*. It does **not** track most platform configuration.

> **Note:** Global Scoped applications have been added by ServiceNow where in theory you can create a scoped application within Global. And while there are success stories for this, there are also instances where Global Scoping has been adopted and resulted in significantly more complicated deployments and release management, so a word of caution here.

### Good for:

- Multi-developer app building
- Teams with DevOps processes already in place (branching, reviews, build pipelines)
- Environments planning automated promotion (CI/CD)

### Less ideal for:

- Steeper learning curve
- Requires governance and process discipline
- Organisations and customers with limited Developer experience and no/new DevOps process and governance

### Bottom line:

Source Control excels when ServiceNow development starts to look like software engineering rather than admin configuration.

---

## How They Fit Together

Below are some examples of how organisation can utilise all three deployment methods. Remembering there is no 'right' answer and no single best method, but understanding what is the best method for the maturity and capability of the team and people working with the platform.

| Type of Change | Best Method |
|---|---|
| Global configuration, UI Policies, ACLs, system properties | Update Set |
| Scoped application with controlled releases | App Repository |
| Scoped application with multiple developers + branching | Git + App Repository |
| Hotfix in production | Usually Update Set |
| Reusable enterprise modules or store-grade apps | Source Control → App Repo |

---

## Deployment Method Maturity

Below is an example of how an organisation may move through stages of using the varying deployment methods. Reaching Source Control is not a goal, however there is a typical pathway of getting there.

Obviously for customers or organisations who have an existing maturity, but are adopting ServiceNow for the first time they may move further and quicker through this pathway.

| Platform Maturity | Method |
|---|---|
| One or two products maintained by admins | Update Sets |
| Has started to adopt Agile and onboarded first developers | Update Sets with Batching |
| Acquired App Engine and starting to build custom applications | App Repository |
| Growth in development team working in established Agile method | Progression to Source Control |
| Wish to adopt high velocity deployment | Largely move into Source Control |

---

## Why This Matters

There's a growing narrative in the community that *"Update Sets are old and should never be used."* That's an oversimplification — and in many cases, wrong.

Update Sets remain essential because a huge amount of ServiceNow configuration **does not belong inside an app** and cannot practically be versioned in Git.

The real maturity journey isn't *update sets vs Git* — it's learning when each makes sense.

---

## ❓ FAQ Section

### Are update sets obsolete?

No. They're still required for a lot of platform configuration that doesn't live in scoped apps.

Update sets are still a preferred and dominant method of Deployment for many ServiceNow customers where extensive or mature DevOps structures are not in place.

So they're not "dead", they're just not the whole story anymore.

### Should everything be put into a scoped application?

No. Scoped apps are ideal for:

- Reusable modules
- Custom Applications that contain business process'
- Products / features with a lifecycle
- Things you might version, distribute or reuse

General platform configuration, small tweaks, and admin-level changes can still be done through Update Sets, and may be a preferred method.

Whilst there is now 'Global Scoped' applications that attempt to bridge legacy platform design (Everything went into Global) this still comes with challenges and in some cases difficulties.

### Why use both Git and Application Repository?

They solve different problems:

- **Git** → how developers work (branching, merging, reviews, history, CI)
- **Application Repository** → how app versions are installed and upgraded on ServiceNow instances

A common pattern is:

1. Developers work in Git
2. Changes are committed/merged
3. A version is published to the App Repo
4. That version is installed on test/prod

### Can I deploy platform configuration through Git?

Not in a first-class way.

Git is tied to scoped application artifacts. Most "pure configuration" (forms, ACLs, core system properties, etc.) still moves via update sets.

While it is possible to create Global Scoped applications to house customizations or changes to Global, it can still be preferred to manage through an Update set.

### Which method should I use for emergency hotfixes?

Most of the time: an update set.

- It's fast
- It doesn't require a full app release
- You can still follow your change management process, but with less ceremony than a full app version bump.

This guidance is going to heavily depend on your organisation, your DevOps process and maturity.

For organisations and teams well versed with Source Control and application handling, it can be just as quick to arrange a hotfix release through a Pipeline.

### Can one deployment method replace all the others?

No. And I would strongly disagree with anyone who advocates this.

While it's entirely possible to adopt just one single method of Deployment:

- **Update Sets** are still the workhorse for platform configuration.
- **Application Repository** is best for app packaging and installs/upgrades.
- **Git** is best for collaboration, history, and automation.

Maturity is about knowing when to use which — not about picking one winner.

---

## What Comes Next

Later sections will cover:

- CI/CD approaches and how they interact with the above
- ATF and test-driven deployment (Is test-driven deployment viable?)
- Suggested governance models depending on team size and maturity
