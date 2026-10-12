module "frontend" {
  source = "git::https://github.com/yuta15/47log-infra.git//terraform/modules/frontend?ref=3a5c9c1c92957008e4038b70aae26b4eb4b0612d"

  project_name = var.project_name
  tags = {
    Project     = var.project_name
    Environment = "production"
  }
}
