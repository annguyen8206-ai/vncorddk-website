// PM2 Ecosystem Config – VNCORD-DK Production
// Chạy: pm2 start ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'vncorddk-api',
      script: 'server-dist/server.mjs',
      cwd: '/var/www/vncorddk-website',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        // Persistent path OUTSIDE the deploy directory so rebuilds/redeploys
        // never delete or reset admin-edited data (packages, leads, settings...).
        DB_FILE_PATH: '/var/lib/vncorddk/vncord-data.json',
      },
      // Tự động restart nếu crash
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      // Log
      out_file: '/var/log/vncorddk/api-out.log',
      error_file: '/var/log/vncorddk/api-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
