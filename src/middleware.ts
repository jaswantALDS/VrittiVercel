import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  let url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.jwt_secret });
  console.log(token)
   if (
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register")
  ) {
    if (token) {
      url.pathname = "/hr";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } 
  
  else if (nextUrl.pathname == "/auth/employee/register ") {
    if (token && token.type == "employee") {
      if(token.is_completed){
        url.pathname = "/employe/dashboard";

        return NextResponse.redirect(url);
      }else{
        console.log("SDfs")
        url.pathname = "/employe/setfield";
       
        
        return NextResponse.redirect(url);
      }
     
    }
    return NextResponse.next();
  }else if(nextUrl.pathname == "/employe/dashboard"){
    if(token){
      return NextResponse.next()
    }
    url.pathname = "/auth/employee/register"
    return NextResponse.redirect(url)
  }else if(nextUrl.pathname == "/"){
    url.pathname = "/auth/employee/register"
    return NextResponse.redirect(url)
  }

  // return NextResponse.next();
}
