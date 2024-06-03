// export const authFetch = (url, options = {}) => {
//     // JWT 토큰을 로컬 스토리지에서 가져오기
//     const token = localStorage.getItem('jwtToken');
//     // 헤더에 JWT 토큰 추가
//     const headers = {
//       ...options.headers,
//       Authorization: `Bearer ${token}`,
//     };
//     return fetch(url, { ...options, headers })
//       .then(response => {
//         // 응답 가로채기 처리
//         if (response.status === 401) {
//           // 예를 들어, 401 응답이 오면 사용자에게 알림을 주거나 로그아웃 처리
//           console.log('Unauthorized access - maybe redirect to login');
//           // 로그아웃 처리 예시:
//           // localStorage.removeItem('jwtToken');
//           // window.location.href = '/login';
//         }
//         return response;
//       })
//       .catch(error => {
//         console.error('Fetch error:', error);
//         throw error;
//       });
//   };
//# sourceMappingURL=jwtExpired.js.map