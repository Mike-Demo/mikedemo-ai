# Authentication

How AI agents and developers authenticate with mikedemo.dev.

## Discover

mikedemo.dev is a static portfolio site. Most content is public and requires no authentication.

## Pick a method

- **Public content** (projects, skills, site pages): no authentication required. All endpoints are read-only.
- **No API keys**: this site does not issue API keys or require registration.

## Register

No registration is needed. Browse https://mikedemo.dev/projects to explore.

## Claim

Not applicable — no credentials to claim.

## Exchange

Not applicable — no token exchange.

## Use the access_token

Not applicable — no access tokens are issued.

## Errors

All endpoints return standard HTTP status codes. There are no authenticated endpoints that return 401.

## Revocation

Not applicable — no credentials to revoke.

## agent_auth

- `identity_endpoint`: not applicable (no authentication)
- `identity_types_supported`: ["anonymous"]
