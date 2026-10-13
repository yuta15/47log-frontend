terraform {
  required_version = "~> 1.16.4"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 6.0, < 7.0"
    }
  }

  backend "s3" {
    key          = "47log/production/frontend/terraform.tfstate"
    encrypt      = true
    use_lockfile = true
  }
}
