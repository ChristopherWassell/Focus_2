Feature: Purchase a product


Scenario: Add item to cart
Given I am a registered user and have logged in successfully
And I am on the product catalog page
When I add "Sauce Labs Backpack" to the cart
Then the cart badge should show "1"


Scenario: Check Cart
Given I am a registered user and have logged in successfully
And I am on the product catalog page
And I add "Sauce Labs Backpack" to the cart
When I go to the shopping cart
And I am on the cart page
Then I should see "Sauce Labs Backpack" in the cart


Scenario: Go to checkout page
Given I am a registered user and have logged in successfully
And I am on the product catalog page
And I add "Sauce Labs Backpack" to the cart
When I go to the shopping cart
And I am on the cart page
When I proceed to checkout
Then I continue to checkout information page

@smoke
Scenario: Enter shipping information and proceed to overview
Given I am a registered user and have logged in successfully
And I am on the product catalog page
And I add "Sauce Labs Backpack" to the cart
When I go to the shopping cart
And I am on the cart page
When I proceed to checkout
And I continue to checkout information page
When I enter valid shipping information 
And I continue to overview
Then I should be navigated to the "Checkout: Overview" page (https://www.saucedemo.com/checkout-step-two.html).


Scenario: Review order and complete purchase
Given I am on the "Checkout: Overview" page 
When I review the order summary (items, payment info, shipping info) 
And I click the "Finish" button 
Then I should be navigated to the "Checkout: Complete!" page (https://www.saucedemo.com/checkout-complete.html) 
And I should see a confirmation message (e.g., "Thank you for your order!").