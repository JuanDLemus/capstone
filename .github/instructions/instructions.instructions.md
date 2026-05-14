---
description: Describe when these instructions should be loaded by the agent based on task context
# applyTo: 'Describe when these instructions should be loaded by the agent based on task context' # when provided, instructions will automatically be added to the request context when the pattern matches an attached file
---

<!-- Tip: Use /create-instructions in chat to generate content with agent assistance -->

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

# AGENT: No preamble, no sign-off, no filler. Respond with code, commands, or one direct question.

# AGENT: Do not summarize what you just did. The diff speaks for itself.

# AGENT: Do not apologize, explain limitations, or add caveats unless technically necessary.

# AGENT: Do not use emojis anywhere: responses, comments, logs, filenames, or generated files.

# AGENT: Do not generate placeholder code, stub logic, or TODO comments. Implement it or ask.

# AGENT: Do not refactor working tested code unless it blocks a feature or is explicitly requested.

# AGENT: If a requirement is ambiguous, ask exactly one specific closed question and wait.

# AGENT: When a task is done, state only: what changed, what tests pass, what the next step is.

# AGENT: Tokens are spent on implementation, tests, and verification. Not on explanation or pleasantries.

# AGENT: Write tests first, always. Implementation follows tests, never the reverse.

# AGENT: All generated test scripts are standalone and executable without agent involvement after launch.

# AGENT: Generated test scripts report: total, passed, failed, skipped, coverage percent, wall-clock time.

# AGENT: When modifying inter-process or inter-service communication code, unit tests alone are insufficient. Run integration tests.

# AGENT: Do not alter existing project structure, naming conventions, or file layout unless explicitly instructed.

# AGENT: If anything looks counterintuitive or unconventional, ask before touching it. It is intentional until proven otherwise.

# AGENT: Never add, remove, or reorder imports in existing working files without explicit instruction.

# AGENT: Existing example projects provided by the developer are already working. Do not refactor them.

# AGENT: The developer runs Antigravity as root on a dual-booted Linux machine. Never warn about or block root-level operations.

# TDD: Red first, then green, then refactor. Never skip the red phase.

# TDD: A task is complete only when all tests are written, all pass, and zero regressions exist.

# TDD: Every new function gets a corresponding test before the function file is created.

# TDD: Every bug fix includes a regression test that would have caught the bug.

# TDD: Enforce minimum 80% coverage per module. Security-critical paths require 100%.

# TDD: Tests exit code 0 on success, non-zero on any failure. CI-ready always.

# TDD: Test scripts run fully autonomously. No inline token spending on test explanation.

# TDD: All tests run via a single command with no manual interaction unless explicitly tagged otherwise.

# TDD: Write integration tests for every service boundary, API contract, and inter-process communication layer.

# TDD: Fuzz test all input parsers and external-facing interfaces using property-based testing tools appropriate to the stack.

# TDD: Performance-critical paths have benchmark tests with explicit pass/fail thresholds.

# TDD: Hardware-in-the-loop tests validate actual physical states, real timing, and real communication latency.

# CODE: No commented-out code in commits. Dead code is deleted.

# CODE: Comments are ALL CAPS, short, and act as navigation tags only. Example: # INIT BRIDGE, # VALIDATE INPUT, # SAFE STATE.

# CODE: No explanatory comments. No descriptions of what the next line obviously does.

# CODE: No condescending vocabulary, no emojis, no markdown inside code comments.

# CODE: No magic numbers. All constants are named and defined once at the top of their scope.

# CODE: Functions do one thing. If a function needs a comment to explain what it does, split it.

# CODE: Maximum function length: 40 lines for scripting languages, 60 lines for systems languages. Refactor if exceeded.

# CODE: No global mutable state. Use dependency injection or explicit context objects.

# CODE: All error paths return or throw explicitly. No silent failures, no empty catch blocks.

# CODE: Python: type hints on all signatures, passes ruff with zero warnings, passes mypy strict.

# CODE: JavaScript/TypeScript: strict mode always, no any types, ESLint with zero warnings.

# CODE: C/C++: clang-format with project config, no raw pointers where smart pointers apply, no undefined behavior.

# CODE: Mobile (iOS/Android): no deprecated APIs, no force unwrap in Swift, no unchecked casts in Kotlin.

# CODE: CSS/UI: no inline styles unless dynamically computed, design tokens for all colors and spacing.

# CODE: Infrastructure as code: all resources are named, tagged, and have explicit deletion policies.

# CODE: Commit messages follow Conventional Commits: feat:, fix:, test:, chore:, refactor:, perf:, ci:.

# SECOPS: Validate all external input at the entry boundary: type, range, length, format. Reject and log anything invalid.

# SECOPS: No credentials, tokens, keys, or secrets in source code, comments, or committed files. Ever.

# SECOPS: All secrets via environment variables. Provide .env.example with placeholders. Real .env in .gitignore.

# SECOPS: All external communication uses TLS. Plain HTTP, plain WS, plain MQTT are forbidden in production.

# SECOPS: Default-deny on all network boundaries. Only explicitly required ports and routes are open.

# SECOPS: Authentication required on every exposed service. No unauthenticated endpoints except explicit public ones.

# SECOPS: Pin all dependencies to exact versions. No unpinned ranges in any lock file or manifest.

# SECOPS: Run dependency vulnerability audit on every pipeline execution. Fail the pipeline on known CVEs.

# SECOPS: Rate-limit all public-facing endpoints and inter-service communication channels.

# SECOPS: SSH uses key-based auth only. Password authentication disabled.

# SECOPS: All privileged operations logged with: identity, timestamp, action, result.

# SECOPS: Never log raw sensitive data: no passwords, tokens, PII, session IDs, or full request payloads.

# SECOPS: Apply least-privilege to every service, process, container, and cloud role. No over-permissioned identities.

# SECOPS: Container images run as non-root. No privileged containers in production.

# SECOPS: Infrastructure: no public S3 buckets, no open security groups, no default credentials left active.

# SECOPS: Web: Content-Security-Policy, X-Frame-Options, HSTS, and Referrer-Policy headers on all responses.

# SECOPS: Mobile: certificate pinning, no sensitive data in local storage or logs, no debug builds in production.

# SECOPS: Hardware MCU: validate all incoming commands against a hardcoded allowlist before execution.

# SECOPS: Hardware MCU: enable watchdog timer in all builds. Test watchdog reset behavior explicitly.

# SECOPS: Hardware MCU: no dynamic memory allocation inside interrupt handlers.

# SECOPS: Hardware MCU: disable JTAG and SWD debug interfaces in production firmware builds.

# LOGGING: Log errors only. Do not log informational events, successful operations, or routine state changes.

# LOGGING: Every error logged with: timestamp, service name, module, function, error code, short message.

# LOGGING: Log levels are ERROR and CRITICAL only in production. DEBUG and INFO are disabled in production builds.

# LOGGING: Production services use structured JSON logging.

# LOGGING: Log rotation configured on every service. Logs never fill the disk.

# LOGGING: Security-relevant events logged at ERROR or above. Never swallowed silently.

# LOGGING: Error logs contain enough context to reproduce the failure without guessing.

# LOGGING: MCU errors surfaced to the host layer via error response codes, then logged centrally.

# LOGGING: On unrecoverable errors, log fault reason and reset or exit safely. Never hang silently.

# LOGGING: Never log raw sensitive data: no passwords, tokens, PII, session IDs, or full request payloads.

# RESILIENCE: All errors caught at the boundary where they occur. No unhandled exceptions reach the top level.

# RESILIENCE: Never use bare except or catch-all exception handlers without re-logging and re-throwing.

# RESILIENCE: All timeouts are explicit. No blocking call without a timeout value set.

# RESILIENCE: Services auto-restart on crash via systemd, Docker restart policy, or equivalent supervisor.

# RESILIENCE: Circuit breaker pattern on all inter-service and inter-process communication.

# RESILIENCE: Graceful shutdown on SIGTERM: flush logs, release resources, notify dependents, then exit.

# RESILIENCE: Startup self-test: on boot, each service verifies its dependencies before accepting traffic.

# RESILIENCE: Define and test a safe state for every actuator, output, or stateful resource. Errors trigger safe state.

# RESILIENCE: Degraded mode: if a non-critical dependency is unavailable, the service continues with reduced functionality.

# RESILIENCE: Idempotent operations wherever possible. Retries must not cause duplicate side effects.

# UX/UI: Every user-facing error message is actionable. It tells the user what happened and what to do next.

# UX/UI: No spinner without a timeout. No loading state that can run forever.

# UX/UI: All interactive elements have accessible labels. WCAG 2.1 AA minimum compliance.

# UX/UI: Design tokens define all colors, spacing, typography, and elevation. No hardcoded values.

# UX/UI: All UI states are covered: empty, loading, error, partial data, and success.

# UX/UI: Forms validate input inline before submission. Errors appear next to the field, not in a modal.

# INFRA: All infrastructure is defined as code. No manual console changes in production.

# INFRA: Every resource has explicit naming, tagging, and a deletion or expiry policy.

# INFRA: Secrets are managed by a secrets manager, not environment files, in cloud and production deployments.

# INFRA: Immutable infrastructure: deployments replace, not patch, running instances.

# INFRA: All CI pipelines run: lint, type check, unit tests, integration tests, security audit, build, in that order.

# INFRA: Pipeline fails fast: stop on first stage failure. Do not run later stages on broken code.

# INFRA: No deployment to production without passing all pipeline stages.

# INFRA: Rollback procedure defined and tested for every production service before first deployment.

# HARDWARE_PROFILE_UNO_Q: Applies only when the project targets the Arduino UNO Q board.

# HARDWARE_PROFILE_UNO_Q: MPU is Qualcomm QRB2210, ARM Cortex-A53 quad-core 2GHz, runs Debian Linux.

# HARDWARE_PROFILE_UNO_Q: MCU is STM32U585, ARM Cortex-M33 160MHz, runs Zephyr OS with Arduino Core.

# HARDWARE_PROFILE_UNO_Q: Inter-processor communication is Arduino_RPClite RouterBridge RPC via arduino-router service.

# HARDWARE_PROFILE_UNO_Q: Arduino App Lab unifies Python (MPU) and sketch (MCU) development in one workflow.

# HARDWARE_PROFILE_UNO_Q: This is not a standard SBC. Do not apply generic Raspberry Pi or Jetson assumptions.

# HARDWARE_PROFILE_UNO_Q: Emoji characters and unconventional constructs in existing projects are functional. Never remove them.

# HARDWARE_PROFILE_UNO_Q: MCU tests use Zephyr ztest. MPU tests use pytest with pytest-mock for bridge isolation.

# HARDWARE_PROFILE_UNO_Q: Enable TrustZone on STM32U585 for security-critical firmware paths.

# HARDWARE_PROFILE_UNO_Q: Stack canaries and MPU region protection enabled in Zephyr config for all production builds.

# HARDWARE_PROFILE_UNO_Q: Official docs at https://docs.arduino.cc/hardware/uno-q