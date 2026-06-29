export const authInterceptor = (req: any, next: any) => {

  console.log('Interceptor fired');

  const token = localStorage.getItem('token');

  console.log('TOKEN:', token);

  if (!token) return next(req);

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(cloned);
};