import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const jwt = localStorage.getItem("jwt");

  if(jwt) {

    const requeteAvecJwt = req.clone({
      headers: req.headers.append('Authorization', jwt)
    })
    
    return next(requeteAvecJwt)
  }

  return next(req);
};
