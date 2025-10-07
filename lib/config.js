export const MY_API = typeof window !== 'undefined'
  ? (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3001/api'
      : 'https://api.xovan.fun/api')
  : 'https://api.xovan.fun/api'; // fallback for SSR