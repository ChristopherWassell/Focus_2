Feature: Login to SauceDemo

  Scenario: User logs in successfully
    Given I am on the SauceDemo login page
    When I enter valid SauceDemo credentials
    And I click the login button
    Then I should be taken to the inventory page
    And I should see the product listings

