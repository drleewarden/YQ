variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-1"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "restaurant-menu"
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_allocated_storage" {
  description = "Allocated storage for RDS in GB"
  type        = number
  default     = 20
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "restaurant_menu"
}

variable "db_username" {
  description = "Database username"
  type        = string
  sensitive   = true
  default     = "postgres"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "container_port" {
  description = "Container port"
  type        = number
  default     = 3000
}

variable "container_image" {
  description = "Docker image URL"
  type        = string
}

variable "stripe_public_key" {
  description = "Stripe public key"
  type        = string
  sensitive   = true
}

variable "stripe_secret_key" {
  description = "Stripe secret key"
  type        = string
  sensitive   = true
}

variable "nextauth_secret" {
  description = "NextAuth secret"
  type        = string
  sensitive   = true
}

variable "github_id" {
  description = "GitHub OAuth app ID"
  type        = string
  sensitive   = true
  default     = ""
}

variable "github_secret" {
  description = "GitHub OAuth app secret"
  type        = string
  sensitive   = true
  default     = ""
}
