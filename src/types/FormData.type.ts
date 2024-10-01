export type FormData = {
    name:string,
    type:string,
    address:{
      line1:string,
      line2?:string,
      city:string,
      state:string,
      zip:string
    },
    contact:{
      firstName:string,
      lastName:string,
      email:string,
      phone:string
    }
}