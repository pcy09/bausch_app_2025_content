// 기존 origin code

// import { NextResponse } from 'next/server';

// export default function middleware(req) {
//   const { cookies } = req;
//   const token = cookies.get('accessToken')?.value;

//   if (!token) {
//     if (req.nextUrl.pathname !== '/admin/login') {
//       const url = req.nextUrl.clone();
//       url.pathname = '/admin/login';
//       return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
//   }
//   if (token) {
//     if (req.nextUrl.pathname === '/admin/login' || req.nextUrl.pathname === '/') {
//       const url = req.nextUrl.clone();
//       url.pathname = '/admin';
//       return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
//   }
// }

// export const config = {
//   matcher: [
//     '/',
//     '/main',
//     '/login',
//     '/users/:path*',
//     '/optician/:path*',
//     '/products/:path*',
//     '/reservation/:path*',
//     '/events/:path*',
//     '/support/:path*',
//     '/account-management/:path*',
//   ],
// };

import { NextResponse } from 'next/server';

export default function middleware(req) {
  const token = req.cookies.get('token')?.value;

  // 토큰이 없고, 로그인 페이지가 아닌경우
  if (!token && req.nextUrl.pathname !== '/admin/login') {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // 토큰이 있고, 로그인 페이지이거나 루트페이지인경우
  if (token && (req.nextUrl.pathname === '/admin/login' || req.nextUrl.pathname === '/')) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/admin',
    '/admin/:path*',
    // '/main',
    // '/admin/login',
    // '/users/:path*',
    // '/optician/:path*',
    // '/products/:path*',
    // '/reservation/:path*',
    // '/events/:path*',
    // '/support/:path*',
    // '/account-management/:path*',
  ],
};
