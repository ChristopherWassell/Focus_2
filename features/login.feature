Feature: Login to SauceDemo

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I login with valid credentials
    Then I should be redirected to the inventory page
    And I should see the product listings



