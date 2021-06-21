import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postStudent(data : any){
    return this.http.post<any>("https://localhost:44324/api/Student", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getStudent(data : any){
    return this.http.get<any>("https://localhost:44324/api/Student", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateStudent(data : any){
    return this.http.put<any>("https://localhost:44324/api/Student", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteStudent(id : number){
    return this.http.delete<any>("https://localhost:44324/api/Student/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
