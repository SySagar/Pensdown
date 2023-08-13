terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.69.0"
    }
  }
}

provider "azurerm" {
  skip_provider_registration = true # This is only required when the User, Service Principal, or Identity running Terraform lacks the permissions to register Azure Resource Providers.
  features {}
}

resource "azurerm_resource_group" "pensdown-rg" {
  name     = "pensdown-resource-group"
  location = "East US"
  tags = {
    environment = "dev"
  }
}

# resource "azurerm_virtual_network" "pensdown-vn" {
#   name                = "pensdown-network"
#   resource_group_name = azurerm_resource_group.pensdown-rg.name
#   location            = azurerm_resource_group.pensdown-rg.location
#   address_space       = ["10.0.0.0/16"]

#   tags = {
#     environment = "dev"
#   }
# }

resource "azurerm_container_registry" "pensdown-acr" {
  name                = "pensdownContainerRegistry"
  resource_group_name = azurerm_resource_group.pensdown-rg.name
  location            = azurerm_resource_group.pensdown-rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_service_plan" "pensdown-sp" {
  name                = "pensdown-service-plan"
  resource_group_name = azurerm_resource_group.pensdown-rg.name
  location            = azurerm_resource_group.pensdown-rg.location
  os_type             = "Linux"
  sku_name            = "P1v2"
}

resource "azurerm_linux_web_app" "pensdown-app" {
  name                = "pensdown-app"
  resource_group_name = azurerm_resource_group.pensdown-rg.name
  location            = azurerm_service_plan.pensdown-sp.location
  service_plan_id     = azurerm_service_plan.pensdown-sp.id

  site_config {}
}