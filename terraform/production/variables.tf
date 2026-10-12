variable "aws_region" {
  description = "productionの配信用S3バケットを作成するAWSリージョン。"
  type        = string
  default     = "ap-northeast-1"
  nullable    = false
}

variable "project_name" {
  description = "配信用S3バケットとCloudFront関連リソースの名前。環境ごとに一意な名前を指定する。"
  type        = string
  nullable    = false
}
