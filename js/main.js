var activityTimes = [];
var activityPrice;
var $totalCost = $('<div class = "totalCost"> </div>');
var $name = $('#name');
var $email = $('#mail');
var $activities = $('.activities');
var emailRegexp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
var $payment = $('#payment');

  // Focus first input box on load
  $('form input').first().focus();
  // On change of job role drop down
  $("#title").change(function() {
    //if other is selected
    if ($(this).val() == "other") {
      // Other input box fadein
      $('#other-title').fadeIn();
    } else {
      // Other input box fadeOut
      $('#other-title').fadeOut();
    }
  }); /*-- Job role End */
   // show only the color options for the right theme
    var color = $('#color');
    var options = color.find('option');
    options.each(function() {
        var text = $(this).text().split("(");
        if (text[1].indexOf("JS Puns") > -1) {
            $(this).attr('data-theme', 'js-puns');
            $(this).text(text[0]);
        } else {
            $(this).attr('data-theme', 'i-heart-js');
            $(this).text(text[0]);
        }
    });

    var placeholder_option = $('<option value="" data-theme="no-selection" selected><-- Please select a T-shirt theme</option>');
    var js_puns_options = $('[data-theme="js-puns"]');
    var i_heart_js_options = $('[data-theme="i-heart-js"]');

    color.prepend(placeholder_option);
    js_puns_options.hide();
    i_heart_js_options.hide();

    $('#design').on('change', function() {
        if ($(this).val() === 'js puns') {
            placeholder_option.hide().first().attr('selected', false);
            i_heart_js_options.hide().first().attr('selected', false);
            js_puns_options.show().first().attr('selected', true);
        } else if ($(this).val() === 'heart js') {
            placeholder_option.hide().first().attr('selected', false);
            i_heart_js_options.show().first().attr('selected', true);
            js_puns_options.hide().first().attr('selected', false);
        } else {
            placeholder_option.show().first().attr('selected', true);
            i_heart_js_options.hide().first().attr('selected', false);
            js_puns_options.hide().first().attr('selected', false);
        }
    });

  // Activites - get parts of text
  // Each activity label
  $('.activities label').each(function() {
    // label text
    var text = $(this).text();
    // Get text after $
    var cost = parseInt(text.split("$")[1]);
    // give the cost section a anme
    $(this).attr("cost", cost);
    // Check if comma in text
    if (text.includes(',')) {
      // Get text from - to comma
      var activityTime = text.split(" — ")[1].split(", $")[0];
      // Give time the attr
      $(this).attr("time", activityTime);
    }
  });
  // Add total cost div to activities
  $activities.append($totalCost);

  // On click of activites check boxes
  $activities.on("click", "input", function() {
    // Clear array
    activityTimes = [];
    // Set price to 0
    activityPrice = 0;
    // Check each of the checked boxes
    $('.activities label:has(input:checked)').each(function() {
      // Set cost to money of text
      var cost = parseInt($(this).attr("cost"));
      // Add cost to activityPrice counter
      activityPrice += cost;
      // Add the times to activityTimes array
      activityTimes.push($(this).attr("time"));
    });
    // Up date the text of the price under activities
    // if price is greater than 0
    if (activityPrice > 0) {
      // update the text of price
      $totalCost.text('$' + activityPrice);
      //  show the div
      $totalCost.show();
    } else {
      // hide the div
      $totalCost.hide();
    }

    // Activitie labels that have not been checked
    $('.activities label:has(input:not(:checked))').each(function() {
      // If activty time matches one of the checked boxes
      if (activityTimes.indexOf($(this).attr("time")) > -1) {
        // Disable check box
        $(this).children().attr("disabled", true);
      } else {
        // Do not disable check box
        $(this).children().attr("disabled", false);
      }

    });
    // If check box has been disabled add the css
    $('label:has(input:disabled)').css('text-decoration', 'line-through');
    // If check box has not been disabled add the css
    $('label:has(input:not(:disabled))').css('text-decoration', 'none');

  });

  // The"Credit Card" payment option should be selected by default
  $('#payment option[value="credit card"]').attr("selected", true);
  // Show credit card div
  $('#credit-card').show();
  // Hide paypal and bit coin
  $('.payPalInfo, .bitCoinInfo').hide();
  // On change of payment drop down
  $("#payment").change(function() {

    if ($(this).val() == "paypal") {

      $('#credit-card').hide();
      $('.payPalInfo').show();

    } else if ($(this).val() == "credit card") {

      $('.payPalInfo, .bitCoinInfo').hide();
      $('#credit-card').show();
    } else {
      $('.bitCoinInfo').show();
      $('.payPalInfo, #credit-card').hide();
    }

  });

//Is name validated?
function nameValidated() {
  var $nameValidationMessage = $('<span class="validation"> Please enter a name</span>');

  if ($name.val()) {
    return true;
  } else {
    $name.prev().append($nameValidationMessage);
    return false;
  }
}

//is email validated?
function emailValidated() {
  var $emailValidationMessage = $('<span class="validation"> Please enter an email</span>');
  if ($email.val().match(emailRegexp)) {
    return true;
  } else {
    $email.prev().append($emailValidationMessage);
    return false;
  }
}
// is activities validated?
function activitiesValidated() {
  $activitiesValidationMessage = $('<span class="validation"> Please select at least one activity</span>');
  // check at least one box is checked
  if ($('.activities input:checked').length > 0) {
    return true;
  } else {
    $activities.find('legend').append($activitiesValidationMessage);
    return false;
  }

}


function paymentValidated() {
  $paymentValidationMessage = $('<span class="validation"></span>');
  $paymentValidationMessage.text(" Please select a payment method");
  //if credit card selected, validate CC fields
  if ($payment.val()==='bitcoin' || $payment.val()==='paypal') {
    return true;
  } else if ($payment.val()==='credit card') {
    var $ccNum = $('#cc-num');
    var $zip = $('#zip');
    var $cvv = $('#cvv');
    if ($ccNum.val() && $zip.val() && $cvv.val()) {
      return true;
    } else {
      if (!$ccNum.val()){
        $ccValidationMessage = $('<span class="validation"></span>');
        $ccValidationMessage.text(" valid num required");
        $ccNum.prev().append($ccValidationMessage);
      }
      if (!$zip.val()){
        $zipValidationMessage = $('<span class="validation"></span>');
        $zipValidationMessage.text(' required');
        $zip.prev().append($zipValidationMessage);
      }
      if (!$cvv.val()){
        $cvvValidationMessage = $('<span class="validation"></span>');
        $cvvValidationMessage.text(' required');
        $cvv.prev().append($cvvValidationMessage);
      }
      return false;
    }
  } else {
    $payment.prev().append($paymentValidationMessage);
    return false;
  }

}
// On submit of form
$('form').submit(function () {
  // Remove error messages
  $('span.validation').remove();
  var nameVal = nameValidated();
  var emailVal = emailValidated();
  var activitiesVal = activitiesValidated();
  var paymentVal = paymentValidated();
  // If all validate and return true - submit form
  if (nameVal && emailVal && activitiesVal && paymentVal) {
    return true;
    // If any are false - do not allow submission
  } else {
    return false;
  }
});


