// PM2 Ecosystem Config – VNCORD-DK Production
// Chạy: pm2 start ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'vncorddk-api',
      script: 'tsx',
      args: 'server/index.ts',
      cwd: '/var/www/vncorddk',
      interpreter: 'none',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
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
