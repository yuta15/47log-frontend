SHELL := /bin/bash

TERRAFORM ?= terraform
PNPM ?= pnpm
AWS ?= aws
DEVELOP_DIR := $(CURDIR)/terraform/develop
DIST_DIR := $(CURDIR)/dist

.PHONY: develop develop-destroy develop-deploy

develop:
	$(TERRAFORM) -chdir="$(DEVELOP_DIR)" init -lockfile=readonly
	$(TERRAFORM) -chdir="$(DEVELOP_DIR)" apply -auto-approve

# 配信用バケットはforce_destroy=falseのため、先にファイルを削除する。
develop-destroy:
	$(TERRAFORM) -chdir="$(DEVELOP_DIR)" init -lockfile=readonly
	@set -euo pipefail; \
	bucket=$$($(TERRAFORM) -chdir="$(DEVELOP_DIR)" output -raw s3_bucket_name); \
	: "$${bucket:?配信用S3バケット名を取得できませんでした}"; \
	$(AWS) s3 rm "s3://$$bucket/" --recursive; \
	$(TERRAFORM) -chdir="$(DEVELOP_DIR)" destroy -auto-approve

develop-deploy:
	@set -euo pipefail; \
	bucket=$$($(TERRAFORM) -chdir="$(DEVELOP_DIR)" output -raw s3_bucket_name); \
	distribution_id=$$($(TERRAFORM) -chdir="$(DEVELOP_DIR)" output -raw cloudfront_distribution_id); \
	: "$${bucket:?配信用S3バケット名を取得できませんでした}"; \
	: "$${distribution_id:?CloudFront Distribution IDを取得できませんでした}"; \
	$(PNPM) build --mode development; \
	$(AWS) s3 sync "$(DIST_DIR)/" "s3://$$bucket/" \
		--exclude 'index.html' --exclude 'assets/*' --cache-control 'no-cache'; \
	$(AWS) s3 sync "$(DIST_DIR)/assets/" "s3://$$bucket/assets/" \
		--cache-control 'public, max-age=31536000, immutable'; \
	$(AWS) s3 cp "$(DIST_DIR)/index.html" "s3://$$bucket/index.html" \
		--cache-control 'no-cache' --content-type 'text/html'; \
	$(AWS) cloudfront create-invalidation --distribution-id "$$distribution_id" \
		--paths '/*' --no-cli-pager
