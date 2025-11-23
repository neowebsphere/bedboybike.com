# Docker Setup Guide

This project includes Docker configurations for both **production** and **development** environments.

## 🚀 Quick Start

### Development Mode (with Live Reload)

For development with automatic page reload on file changes:

```bash
# Build and start development container
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop container
docker-compose -f docker-compose.dev.yml down
```

**Features:**
- ✅ Automatic page reload when files change
- ✅ Files are mounted from your local directory
- ✅ No need to rebuild container after changes
- ✅ Access at `http://localhost:8080`

### Production Mode

For production deployment:

```bash
# Build and start production container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop container
docker-compose down
```

**Features:**
- ✅ Optimized nginx configuration
- ✅ Gzip compression enabled
- ✅ Static asset caching
- ✅ Security headers
- ✅ Access at `http://localhost:8080`

## 📝 Usage Examples

### Development Workflow

1. Start development container:
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. Open browser: `http://localhost:8080`

3. Edit files in your project - changes will automatically reload in the browser!

4. When done, stop the container:
   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

### Rebuild Containers

If you need to rebuild (after Dockerfile changes):

**Development:**
```bash
docker-compose -f docker-compose.dev.yml up -d --build
```

**Production:**
```bash
docker-compose up -d --build
```

## 🔧 Configuration Files

- `Dockerfile` - Production image (nginx)
- `Dockerfile.dev` - Development image (live-server)
- `docker-compose.yml` - Production configuration
- `docker-compose.dev.yml` - Development configuration
- `nginx.conf` - Nginx configuration for production
- `.dockerignore` - Files excluded from Docker build

## 📦 What's Included

### Development Container
- Node.js 18 Alpine
- live-server (automatic reload)
- Volume mounting for live updates

### Production Container
- Nginx Alpine (lightweight)
- Optimized configuration
- Gzip compression
- Static asset caching

## 🐛 Troubleshooting

### Port Already in Use
If port 8080 is already in use, change it in docker-compose files:
```yaml
ports:
  - "3000:8080"  # Use port 3000 instead
```

### Files Not Updating
- Make sure you're using `docker-compose.dev.yml` for development
- Check that volumes are mounted correctly
- Restart container: `docker-compose -f docker-compose.dev.yml restart`

### Container Won't Start
- Check logs: `docker-compose logs`
- Verify Docker is running
- Try rebuilding: `docker-compose up -d --build`

