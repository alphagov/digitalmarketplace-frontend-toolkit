# Digital Marketplace front-end toolkit changelog

Records breaking changes from major version bumps

## 36.0.0

PR: [489](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/489)

* Changes the layout of the footer

We want our footer to look more like the footer from GOV.UK and GOV.UK Deisgn System, so we can swap the components on
an app by app basis in the future. We also wanted to simplify the content in the footer, and reduce the number of
columns.

This release changes the footer to a two column-layout; the "Contact" and "About" columns have been merged.
Additionally Digital Outcomes and Specialists is now abbreviated as DOS in the footer links.

## 35.0.0

PR: [480](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/480)

* Adds a linked tracker domain ID for www.gov.uk.
* Adds support for multiple domains
* Adds support for stripping PII data from URLs 

To implement the above, three new analytics files have been copied in from the deprecated `govuk_frontend_toolkit`. 
Make sure the analytics files and test manifests for any frontend apps are updated when pulling in this version.

Old paths to remove:

    '../node_modules/govuk_frontend_toolkit/javascripts/govuk/analytics/google-analytics-universal-tracker.js',
    '../node_modules/govuk_frontend_toolkit/javascripts/govuk/analytics/analytics.js',

New paths to include:

    '../node_modules/digitalmarketplace-frontend-toolkit/toolkit/javascripts/analytics/_pii.js',
    '../node_modules/digitalmarketplace-frontend-toolkit/toolkit/javascripts/analytics/_googleAnalyticsUniversalTracker.js',
    '../node_modules/digitalmarketplace-frontend-toolkit/toolkit/javascripts/analytics/_govukAnalytics.js',


## 34.0.0

Remove the short-lived `GOVUK.xhr_semaphore` as `jQuery.active` makes it unnecessary.

## 33.0.0

Remove the "report a problem" form from the base page template.

## 32.0.0

PR: [466](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/466)

Bumps the engine to `node == 8.12.0` and gulp to `4.0.0`.
Recommend thoroughly testing before pulling into a frontend app.

## 31.0.0

PR: [442](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/442)

### What changed
This removes `toolkit/templates/custom-dimensions.html` from the toolkit and replaces it with 
`toolkit/templates/layouts/_custom_dimensions.html`. It also removes the `custom_meta` block as it is not longer used.

This change will break any place where `custom_meta` block or `custom-dimensions.html` is used.

## 30.0.0

PR: [441](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/441)

### What changed
User research consent banner will now show on every page that uses the new shared layouts (toolkit/templates/layouts/_base_page.html).
This will also require each app to include the following files:
- toolkit/javascripts/user-research-consent-banner.js
- toolkit/scss/_user-research-consent-banner.scss

## 29.0.0

PR: [439](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/439)

### What changed
The validation masthead in `toolkit.forms.validation` is now an h2 rather than an h1. This may break associated unit and functional tests. Manual review will be needed here.

The pattern now expects to reference a variable called `errors`, so you will need to pass all form errors into the templating engine as `errors=errors` or `errors=get_errors_from_wtform(form)` when calling `render_template()`.

A new utility function has been added to `dmutils.forms` called `get_errors_from_wtform`. Wherever we use WTForms to do form validation, we should use this method to collect errors from the form and pass them into the Jinja templating engine with `render_template(..., errors=errors, ...)`.

Old code sample 1 (template):
```Jinja2
  {% if errors %}
    {% with errors = errors.values() %}
      {% include 'toolkit/forms/validation.html' %}
    {% endwith %}
  {% endif %}
```

New code sample 1 (template):
```Jinja2
{% include 'toolkit/forms/validation.html' %}
```

Old code sample 2 (python):
```python
form_errors = [
    {'question': form[field].label.text, 'input_name': form[field].name} for field in form.errors.keys()
]
return render_template('blah.html', form_errors=form_errors)
```

New code sample 2 (python):
```python
from dmutils.forms import get_errors_from_wtform
return render_template('blah.html', errors=get_errors_from_wtform(form))
```

## 28.0.0

PR: [#397](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/397)

### What changed

- Changes existing header to product page style header.
- Product page Github: https://github.com/alphagov/product-page-example
- To get this working on a frontend application, do the following:
  - in _base_page.html:
    - Remove:
      ```python
        {% include "toolkit/phase-banner.html" %}
      ```
    - Add:
      ```python
        {% block inside_header %}
          {% include "toolkit/inside-header.html" %}
        {% endblock %}
      ```
  - Update the frontend toolkit to version 28.0.0
  - Update the dmutils module to version 33.0.1 and above

## 27.0.0

PR: [#395](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/395)

### What changed

- Updates some of our javascript dependencies and node to the same version we have in production.

## 26.0.0

PR: [#391](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/391)

### What changed

- 'link-button' removed and so apps will no longer be able to import those files that have been deleted

## 25.0.0

PR: [#388](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/388)

### What changed

- 'notification-banner' template macro now takes `banner-content` instead of `content` to avoid clashing with
   a commonly used context variable of the same name.

## 24.0.0

PR: [#367](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/367)

### What changed

- 'media-down' IE helper mixin has been moved to a '_conditionals2.scss' stylesheet, which is consistent
  with its location in the equivalent gov.uk repository;
- this means we can use it even if we aren't using the next/previous navigation stylesheet.
- non-breaking change: "report-a-problem" JS/CSS/HTML for feedback forms feature.

###

Example app change:

app/assets/scss/application.scss
```diff
+@import "toolkit/shared_scss/_conditionals2.scss";
```

## 23.0.0

PR: [#353](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/353)

### What changed

- GOV.UK Elements is now a dependency and will need to be added to package.json for frontend apps.
- The markup is different so custom javascript relying on the old markup such as the checkbox tree in the supplier app will have to be changed.

## 22.0.0

PR: [#313](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/313)

### What changed

- The `fake-full-width` [Sass mixin](http://sass-lang.com/guide#topic-6) is now required to compile the `_pricing.scss` file.
  This means a new shared placeholder in the apps that use the frontend toolkit

#### Breaking changes

Old:
```scss
/* Blocks shared between multiple selectors */
@import "toolkit/shared_placeholders/_temporary-messages.scss";
@import "toolkit/shared_placeholders/_placeholders.scss";
@import "toolkit/shared_placeholders/_dm-typography.scss";

// Digital Marketplace Front-end toolkit styles
@import "toolkit/forms/_pricing.scss";
```

New:
```scss
/* Blocks shared between multiple selectors */
@import "toolkit/shared_placeholders/_temporary-messages.scss";
@import "toolkit/shared_placeholders/_placeholders.scss";
@import "toolkit/shared_placeholders/_dm-typography.scss";
@import "toolkit/shared_placeholders/_mixins.scss";

// Digital Marketplace Front-end toolkit styles
@import "toolkit/forms/_pricing.scss";
``````

## 21.0.0

PR: [#304](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/304)

### What changed

- The format of the followup questions has changed, so toolkit form macros need to pass in
  the `content_question.values_followup` instead of the `content_question.followup`
- Since radio and checkbox questions can have followups too the related macros need to set
  `followup=content_question.values_followup`
- Radio, boolean and list-entry questions can be follow-up questions, so related macros
  need to set `hidden=question_content.hidden`
- We need to vendor a version of `show-hide-content.js` with added support for multiple
  follow-up inputs, so it has to be used instead of the GOV.UK toolkit one
- The IDs for input elements (e.g. booleans) now has a numeric suffix rather than a string
  (e.g. yes/no -> 1/2)

### Example app change

#### Loading the `show-hide-content.js` with support for multiple follow-up questions

Old:
```
//= include ../../../node_modules/govuk_frontend_toolkit/javascripts/govuk/show-hide-content.js
```

New:
```
//= include ../../../bower_components/digitalmarketplace-frontend-toolkit/toolkit/javascripts/show-hide-content.js
```

#### Updating application `form_toolkit` macros

Old:
```jinja
{% macro boolean(question_content, service_data, errors, question_number=None, get_question=None) -%}
  {%
     with
     ...
     followup=question_content.followup,
     ...
  %}
    {% include "toolkit/forms/selection-buttons.html" %}
  {% endwith %}
{%- endmacro %}
```

New:
```jinja
{% macro boolean(question_content, service_data, errors, question_number=None, get_question=None) -%}
  {%
     with
     ...
     followup=question_content.values_followup,
     hidden=question_content.hidden,
     ...
  %}
    {% include "toolkit/forms/selection-buttons.html" %}
  {% endwith %}
{%- endmacro %}
```

#### Updating tests

Old:
```assert len(doc.xpath("//*[@id='input-yesNo-" + str(i) + "-yes']")) == 1```

New:
```assert len(doc.xpath("//*[@id='input-yesNo-" + str(i) + "-1']")) == 1```


## 20.0.0

PR: [#302](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/302)

## What changed

We've updated the govuk_frontend_toolkit, so most of these changes are driven from that.
The good news is that the changes are very minor and mostly don't affect our frontend apps.

- The selected and focused classes for our selection buttons are now just `.selected` and `.focused` instead of what they were before (`.selection-button-focused` and `.selection-button-selected`, respectively).

#### Breaking change

Old:
```ruby
find(
    :xpath,
    "//*[contains(text(), 'Service status')]/following-sibling::*[@class='selection-button selection-button-selected'][text()]"
  ).text().should have_content("#{service_status}")

```

New:
```ruby
find(
    :xpath,
    "//*[contains(text(), 'Service status')]/following-sibling::*[@contains(@class, 'selection-button selected')][text()]"
  ).text().should have_content("#{service_status}")
```

<br />
<br />

- The `.question-heading-with-hint` class has been deprecated because our vertical spacing for question meta elements doesn't care about this distinction anymore.

#### Breaking change

Old:
```jinja
{{ form.email_address.label(class="question-heading-with-hint") }}
```

New:
```jinja
{{ form.email_address.label(class="question-heading") }}
```

<br />
<br />

The following are also changes to classnames but they don't appear to be in the frontend apps.
Means we don't have to worry about them, happily.

- The `.selection-button-boolean` class has been removed in favour of `.selection-button-radio`, which is consistent with those in [govuk_elements](https://github.com/alphagov/govuk_elements/blob/677f7cfd009cd8035aa856ea0456c9fcf3c9e18e/app/views/snippets/form_radio_inline_yes_no.html#L11).

- The `phase-banner` stuff no longer has phase-dependent colours.  Means we no longer have `.phase-banner-alpha` and `.phase-banner-beta` classes, but simply `.phase-banner`.


## 19.0.0

PR: [#285](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/285)

## What changed

- The `beta-banner` pattern has been renamed to `phase-banner`.  This will affect exactly nothing because nobody has ever used the `beta-banner` pattern, but I guess technically this is a breaking change.

#### Breaking changes

Old:
```jinja
{% import toolkit/beta-banner.html %}
```

New:
```jinja
{% import toolkit/phase-banner.html %}
```


## 18.0.0

PR: [#286](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/286)

### What changed

- Removed the `|markdown` and `|safe` filters from being used by templates.
Going forward, none of the templates will allow literal HTML or markdown in passed-in strings; instead, our apps will be responsible for processing values before they get to the templates.
- Removed two outdated patterns that we've stopped using.

#### Templates where `|safe` has been removed

- `beta-banner`
- `browse-list`
- `notification-banner`
- `search-summary`
- `temporary-message`

#### Templates where `|markdown` has been removed

- `list-entry`
- `pricing`
- `selection-buttons`
- `textbox`
- `upload`

#### Templates which have been removed altogether

- `framework-notice`
- `search-results`


## 17.0.0

PR: [#270](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/270)

### What changed

- Added the option for first field of summary tables to be two-thirds width.

#### Breaking changes

Changed `.summary-item-field-first-wider` style to `.summary-item-field-first-half` for summary tables.

Any fontend apps that explicitly call `.summary-item-field-first-wider` will need to change to use
`.summary-item-field-first-half` instead.

## 16.0.0

PR: [#268](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/268)

### What changed

- Removed `extra` key from instruction list; using `top` and `bottom` keys instead [in
  #268](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/268)

#### Breaking changes

In order to have more flexibility when building our instruction list items, we removed the `extra` key in favour of `top` and `bottom` keys.

Adding a `top` will create an unstyled paragraph as the first thing in an instruction list section.  Adding a `bottom` will create a paragraph with `top-margin` of `10px` as the almost last thing in an instruction list section (if you include an `important` key, that one will be the final thing in a section).


## 15.0.0

PR: [#213](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/213)

### What changed

- new notification banner format
  [#211](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/211)
(breaking change)
- changes to temporary messages example page
  [#212](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/212)
- separation of temporary message style into
  placeholder [in
- ability to add pattern-level grids [in
  #212](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/pull/212)

#### Breaking changes

The base temporary message styles were split out into a placeholder block to allow use across multiple patterns (by [extending](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/blob/main/toolkit/scss/_notification-banners.scss#L69) it):

https://github.com/alphagov/digitalmarketplace-frontend-toolkit/blob/main/toolkit/scss/shared_placeholders/_temporary-messages.scss

This means the existing temporary message pattern will break unless the new placeholder block is included in the main stylesheet of apps that use it.
