import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  let url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.jwt_secret });
  if (nextUrl.pathname == "/auth/employee/register" || nextUrl.pathname == "/auth/employee/SignIn") {
    if (token && token.type == "employee") {
      console.log("type employee in ")
      if(token.is_completed){
        console.log("isCompleted")
        url.pathname = "/employe/dashboard";

        return NextResponse.redirect(url);
      }else{
        console.log("notCompleted")
        url.pathname = "/employe/setfield";
       
        
        return NextResponse.redirect(url);
      }
     
    }
    return NextResponse.next();
  }else if(nextUrl.pathname == "/employe/dashboard"){
    if(token){
      return NextResponse.next()
    }
    url.pathname = "/auth/employee/SignIn"
    return NextResponse.redirect(url)
  }else if(nextUrl.pathname == "/"){
    url.pathname = "/auth/employee/SignIn"
    return NextResponse.redirect(url)
  }

  // return NextResponse.next();
}
