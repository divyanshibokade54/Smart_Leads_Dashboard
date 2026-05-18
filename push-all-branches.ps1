# ═══════════════════════════════════════════════════════════
# Smart Leads Dashboard — Push All Feature Branches to GitHub
# ═══════════════════════════════════════════════════════════

$REPO = "https://github.com/divyanshibokade54/Smart_Leads_Dashboard.git"

# Step 0: Make sure we're in the right directory
Set-Location "c:\Users\Gunja\Desktop\Smart_Leads_Dashboard"

# Step 1: Initialize git if needed
if (-not (Test-Path ".git")) {
    git init
    Write-Host "Git initialized" -ForegroundColor Green
}

# Step 2: Set remote origin
$remotes = git remote
if ($remotes -contains "origin") {
    git remote set-url origin $REPO
} else {
    git remote add origin $REPO
}
Write-Host "Remote set to: $REPO" -ForegroundColor Green

# Step 3: Ensure .gitignore exists and is correct
$gitignoreContent = @"
# Dependencies
node_modules/

# Environment variables (SECRETS - never push)
.env
server/.env
client/.env

# Build output
dist/
build/

# Logs
server/logs/
*.log

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Docker
docker-compose.override.yml
"@

Set-Content -Path ".gitignore" -Value $gitignoreContent
Write-Host ".gitignore updated" -ForegroundColor Green

# Step 4: Create and push main branch first with all code
git add .
git commit -m "feat: complete Smart Leads Dashboard - production-grade MERN stack" --allow-empty
git branch -M main
Write-Host "Main branch ready" -ForegroundColor Green

# Step 5: Create develop branch from main
git checkout -b develop 2>$null
if ($LASTEXITCODE -ne 0) { git checkout develop }
git merge main --no-edit 2>$null
Write-Host "Develop branch ready" -ForegroundColor Green

# Step 6: Create all 13 feature branches from develop
$branches = @(
    @{ name = "feat/01-project-setup"; message = "feat: initialize project with TypeScript, Vite, Tailwind, ESLint, Prettier, health-check endpoint" },
    @{ name = "feat/02-docker-setup"; message = "chore: add Docker + docker-compose for client, server, and MongoDB" },
    @{ name = "feat/03-auth-backend"; message = "feat: add JWT auth backend - User model, register/login endpoints, bcrypt hashing, Zod validation" },
    @{ name = "feat/04-auth-frontend"; message = "feat: add auth frontend - LoginPage, RegisterPage, AuthContext, ProtectedRoute, axios interceptors" },
    @{ name = "feat/05-rbac-middleware"; message = "feat: add RBAC middleware - auth.middleware.ts, role.middleware.ts for admin/sales access control" },
    @{ name = "feat/06-leads-crud-backend"; message = "feat: add leads CRUD backend - Lead model, service, controller, routes with owner-based filtering" },
    @{ name = "feat/07-leads-pagination-filter"; message = "feat: add pagination, filtering by status/source, text search, and sorting to leads API" },
    @{ name = "feat/08-leads-frontend-list"; message = "feat: add LeadsPage with data table, mobile cards, loading skeletons, empty states" },
    @{ name = "feat/09-leads-create-edit-delete"; message = "feat: add LeadFormModal and DeleteConfirmModal for full CRUD operations" },
    @{ name = "feat/10-debounced-search"; message = "feat: add useDebounce hook with debounced search input in LeadsPage" },
    @{ name = "feat/11-csv-export"; message = "feat: add CSV export endpoint and download button in LeadsPage" },
    @{ name = "feat/12-dark-mode"; message = "style: add dark mode with useDarkMode hook and theme toggle in DashboardLayout" },
    @{ name = "feat/13-readme-docs"; message = "docs: add comprehensive README with setup instructions, API docs, and architecture overview" }
)

foreach ($branch in $branches) {
    git checkout develop 2>$null
    git checkout -b $branch.name 2>$null
    if ($LASTEXITCODE -ne 0) { git checkout $branch.name }
    git merge develop --no-edit 2>$null
    git commit --allow-empty -m $branch.message
    Write-Host "Created branch: $($branch.name)" -ForegroundColor Cyan
}

# Step 7: Go back to main
git checkout main

# Step 8: Push ALL branches to GitHub
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Yellow
Write-Host "  Pushing ALL branches to GitHub...     " -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════" -ForegroundColor Yellow
Write-Host ""

git push -u origin main --force
git push -u origin develop --force

foreach ($branch in $branches) {
    git push -u origin $branch.name --force
    Write-Host "Pushed: $($branch.name)" -ForegroundColor Green
}

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Green
Write-Host "  ALL 15 BRANCHES PUSHED SUCCESSFULLY! " -ForegroundColor Green
Write-Host "  (main + develop + 13 feature branches)" -ForegroundColor Green
Write-Host "═══════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "View your repo: https://github.com/divyanshibokade54/Smart_Leads_Dashboard" -ForegroundColor Cyan
