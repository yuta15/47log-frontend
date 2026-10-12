output "s3_bucket_name" {
  description = "配信ファイルのアップロード先。"
  value       = module.frontend.s3_bucket_name
}

output "s3_bucket_arn" {
  description = "配信用S3バケットのARN。"
  value       = module.frontend.s3_bucket_arn
}

output "cloudfront_distribution_id" {
  description = "キャッシュのInvalidationに使用するDistribution ID。"
  value       = module.frontend.cloudfront_distribution_id
}

output "cloudfront_domain_name" {
  description = "CloudFrontの標準ドメイン名。"
  value       = module.frontend.cloudfront_domain_name
}

output "frontend_url" {
  description = "フロントエンドのHTTPS配信URL。"
  value       = module.frontend.frontend_url
}
