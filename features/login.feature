Feature: Login to SauceDemo

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I login with valid credentials
    Then I should be redirected to the inventory page
    And I should see the product listings



# Feature: Purchase a product

#   Scenario: Successful product purchase flow

# Given I am on the product catalog page (https://www.saucedemo.com/inventory.html) 
# When I click the "Add to cart" button for a chosen item (e.g., "Sauce Labs Backpack") 
# Then the item should be added to my shopping cart, indicated by the shopping cart icon showing a '1' (or increasing count).

# Given I have an item in my shopping cart 
# When I click the shopping cart icon 
# Then I should be navigated to the "Your Cart" page (https://www.saucedemo.com/cart.html) 
# And I should see the selected item listed in my cart.

# Given I am on the "Your Cart" page When I click the "Checkout" button 
# Then I should be navigated to the "Checkout: Your Information" page (https://www.saucedemo.com/checkout-step-one.html).

# Given I am on the "Checkout: Your Information" page 
# When I enter valid shipping information (e.g., First Name, Last Name, Postal Code) 
# And I click the "Continue" button 
# Then I should be navigated to the "Checkout: Overview" page (https://www.saucedemo.com/checkout-step-two.html).

# Given I am on the "Checkout: Overview" page 
# When I review the order summary (items, payment info, shipping info) 
# And I click the "Finish" button 
# Then I should be navigated to the "Checkout: Complete!" page (https://www.saucedemo.com/checkout-complete.html) 
# And I should see a confirmation message (e.g., "Thank you for your order!").

