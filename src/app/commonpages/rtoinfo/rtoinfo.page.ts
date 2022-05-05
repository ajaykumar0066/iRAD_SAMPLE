import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  ToastController,
  ModalController,
} from "@ionic/angular";
import { ApiService } from "../../services/api.service";
import { Location } from "../../models/location.model";
import { SelectlocationComponent } from "./selectlocation/selectlocation.component";
import { Router } from "@angular/router";
import { AuthService } from "../login/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-rtoinfo',
  templateUrl: './rtoinfo.page.html',
  styleUrls: ['./rtoinfo.page.scss'],
})
export class RtoinfoPage implements OnInit {
  rtoinfo = {
    name: "",
    rto_code:'',
    landline: "",
    email: "",
    location: "",
    state:'',
    address: "",
    latitude: "",
    longitude: "",
    remarks: "",
  };
  location: Location = new Location();
  locdisable: boolean = false;
  accloc: string;
  roaddisp: any;
  editflag = false;
  private userSub: Subscription; isAuthenticated = false; user:any;

  constructor(
    private modalctrl: ModalController,  private router: Router,
    private toastController: ToastController,
    private api: ApiService,private authService: AuthService,
  ) {}

  ngOnInit() {

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
      // console.log('user'); console.log(user);
      if (this.isAuthenticated) {
        console.log(user);
        this.user = user;


      }

    });

    this.loadpsinfo();
  }

  doRefresh(event) {
    this.loadpsinfo();
    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 1000);
  }

  rtoEdit() {
    this.editflag = true;
  }
  closeModal() {
    this.editflag = false;
  }

  viewLocation() {
    //this.router.navigate(["/viewaccloc"]);
  }

  public loadpsinfo() {
    let postDate = {
      mode: "loadrtoinfo",
    };
    this.api.post("profile.php", postDate).subscribe((data: any) => {
      let valuedata = data;
      console.log("----->", valuedata);
      console.log("----->", valuedata.data[0].rto_name);
      this.rtoinfo.name = valuedata.data[0].rto_name;
      this.rtoinfo.rto_code = valuedata.data[0].rto_code;
      this.rtoinfo.state = valuedata.data[0].state_name;
      this.rtoinfo.address = valuedata.data[0].address;
      this.rtoinfo.email = valuedata.data[0].email;
      this.rtoinfo.landline = valuedata.data[0].landline;
      this.rtoinfo.remarks = valuedata.data[0].remarks;
      this.rtoinfo.latitude = valuedata.data[0].latitude;
     
      this.rtoinfo.longitude = valuedata.data[0].longitude;

      this.location.lat = 11.66; //valuedata.data[0].latitude;
      this.location.lng = 22.66; //valuedata.data[0].longitude;

      if(this.location.lat!=null) {
      this.accloc = "Lat:" + this.rtoinfo.latitude + ",       Long:" +  this.rtoinfo.longitude;
      }
    });
  }

  public saveInfo() {
    let postDate = {
      mode: "rtoinfo",
      rtoinfo: this.rtoinfo,
    };
    this.api.post("profile.php", postDate).subscribe((data: any) => {
      console.log(data);
      this.editflag = false;
    });
  }

  public formSubmit() {

    this.rtoinfo.name =this.rtoinfo.name .trim();
    console.log(this.rtoinfo);
    if (this.rtoinfo.name =='') {
      this.presentToast("Name Should be at least 3 Characters");
      return false;
    }

    if(this.rtoinfo.latitude==null){
      this.presentToast("Please Select Police Station Location");
      return false;
    }
    this.saveInfo();

    
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 3000,
    });
    toast.present();
  }

  public checkname($event) {
    let username = $event.target.value;
    console.log("username" + $event.target.value);
    username.trim;
    this.rtoinfo.name = username;
  }

  async pickLoc() {
    this.locdisable = true;
    console.log("pick Loc");
    console.log("location", this.location);
    const modalped = await this.modalctrl.create({
      component: SelectlocationComponent,
      componentProps: { location: this.location },
      /* componentProps: {
           'visibility':this.data.accinfo.visibilty,
           'refhp':'test',
         }*/
    });

    modalped.onWillDismiss().then((dataReturned) => {
      this.locdisable = false;
      //   this.histroyreturn = dataReturned.data;
      console.log("Receive: ", dataReturned.data);
      //   console.log(this.location);

      this.rtoinfo.latitude = dataReturned.data.lat.toFixed(6);
      this.rtoinfo.longitude = dataReturned.data.lng.toFixed(6);
      if(this.rtoinfo.latitude!=null) {
        this.accloc =
        "Lat:" +
        this.rtoinfo.latitude +
        ",       Long:" +
        this.rtoinfo.longitude;
        }
     
      /*
        if (dataReturned.data ==true) {
          this.accloc='Lat:'+this.location.lat.toFixed(6)+',       Long:'+this.location.lng.toFixed(6);
          console.log('acclocsdfsdfsdfsdf',this.accloc);

          this.rtoinfo.latitude=this.location.lat.toFixed(6);  
          this.rtoinfo.longitude=this.location.lng.toFixed(6);   
        }
        */
    });
    return await modalped.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }
}
