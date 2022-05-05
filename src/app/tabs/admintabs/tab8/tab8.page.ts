import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/shared.service';

@Component({
  selector: 'app-tab8',
  templateUrl: './tab8.page.html',
  styleUrls: ['./tab8.page.scss'],
})
export class Tab8Page implements OnInit {
  transdetails: any;
  mvidata1: any;
  getthis: any;
  mviOfficewise: any;
  mviPolicewise: any;
  getmvicount: any;

  constructor(private api: ApiService,private authService:AuthService,private router:Router,
    private shserv:UsersService,) { }

  ngOnInit() {
    this.transdetails = JSON.parse(localStorage.getItem("Transdet"));
   
   
  }

  ionViewDidEnter()
  {
    this.transdetails = JSON.parse(localStorage.getItem("Transdet"));
    console.log("transdetails",this.transdetails); 
    this.getmvidetails();  
  }

  public getmvidetails()
  {
    let rtocode = this.transdetails.rto_code;
    let postDate =
    {
      mode: "unitofficeandps",
        rto: rtocode
      };
           this.api.post("dashboard.php", postDate).subscribe((data: any) => 
           {
             console.log(data);
            this.mvidata1=data.data1;
            this.mviOfficewise = data.data2;
            this.mviPolicewise = data.data3;
            console.log("MVIDATA1 IS",this.mvidata1 );
            console.log("mviOfficewise IS",this.mviOfficewise );
            console.log("mviPolicewise IS",this.mviPolicewise );
            for(let i=0; i<this.mvidata1.length;i++)
            {
              this.mvidata1[i].mvicounts =JSON.parse(this.mvidata1[i].mvicounts);
              this.getmvicount =  this.mvidata1[i].mvicounts;
              console.log("YGUSGDUSDFSUDSFDUGSDFSUYDFSUIDYSTFDIUSYTDFSIUDYTFSIUT",this.getmvicount);
            }
           
                  
     });
     
    
  }


  viewProfile(usrname) {
  
    console.log(usrname);
    this.shserv.viewProfile(usrname);
  
  }

}
