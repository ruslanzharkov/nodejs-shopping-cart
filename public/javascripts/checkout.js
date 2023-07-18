/** Publishable key is not secret, it's ok to store it here.
 * Check https://stripe.com/docs/keys
 */
const stripePublishableTestKey = null;
// your public key should be here for proper Stripe work
// otherwise app generates en error with alert message

if (!stripePublishableTestKey) {
  const error = 'Please add a Stripe.js public key';
  alert(error);
  throw new Error(error);
}

Stripe.setPublishableKey(stripePublishableTestKey);

const $form = $('#checkout-form');

$form.submit(function (event) {
  $('#charge-error').addClass('invisible');
  $form.find('button').prop('disabled', true);
  Stripe.card.createToken(
    {
      number: $('#card-number').val(),
      cvc: $('#card-cvc').val(),
      exp_month: $('#card-expiry-month').val(),
      exp_year: $('#card-expiry-year').val(),
      name: $('#name').val(),
    },
    stripeResponseHandler,
  );
  return false;
});

function stripeResponseHandler(status, response) {
  if (response.error) {
    // Show errors on the form and re-enable submission
    $('#charge-error').text(response.error.message);
    $('#charge-error').removeClass('invisible');
    $form.find('button').prop('disabled', false);
  } else {
    // Token has been created, we can proceed
    const token = response.id;

    // Insert the token into the form so it can be submitted to server:
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    $form.get(0).submit();
  }
}
