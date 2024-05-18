// 예: src/custom.d.ts
declare module "*.png" {
  const value: string;
  export = value;
}
declare module "*.gif";
{
  const value: string; // 경로가 문자열로 주어진다.
  export = value; // import 할때 문자열을 써라.
}

//* declare 형님 => ts는 .ts, .tsx에 초점을 맞추고 있기 때문에 그 외에 것들은 declare 형님이 필요
