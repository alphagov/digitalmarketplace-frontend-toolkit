// REDUCED VARIANT OF https://github.com/alphagov/static/blob/master/app/assets/javascripts/report-a-problem.js
(function() {
  "use strict";
  window.GOVUK = window.GOVUK || {};
  window.GOVUK.GDM = window.GOVUK.GDM || {};

  var ReportAProblem = function ($container) {
    this.$container = $container;
    var $form = $container.find('form');

    $container.parent().on("click", ".js-report-a-problem-toggle", this.toggleForm.bind(this));

    this.addToggleLink();
  };

  ReportAProblem.init = function() {}

  ReportAProblem.prototype.addToggleLink = function() {
    this.$container.before('<div class="report-a-problem-toggle-wrapper js-footer">' +
        '<p class="report-a-problem-toggle">' +
          '<a href="" class="js-report-a-problem-toggle">Is there anything wrong with this page?</a>' +
        '</p>' +
      '</div>');
  };

  ReportAProblem.prototype.toggleForm = function(evt) {
    this.$container.toggle();

    if (this.$container.is(':visible')) {
      this.trackEvent('GOVUK Open Form');
    } else {
      this.trackEvent('GOVUK Close Form');
    }

    if ($(evt.target).is('a')) {
      evt.preventDefault();
    }
  };

  GOVUK.GDM.ReportAProblem = ReportAProblem;

  ReportAProblem.prototype.trackEvent = function(action){
    if (GOVUK.analytics && GOVUK.analytics.trackEvent) {
      GOVUK.analytics.trackEvent('Onsite Feedback', action, { label: '(not set)'} );
    }
  };

  $(document).ready(function() {
    new GOVUK.GDM.ReportAProblem($('.report-a-problem-container'));
  });
}());
