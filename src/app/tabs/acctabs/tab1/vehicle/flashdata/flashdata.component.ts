import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../../../../../environments/environment';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-flashdata',
  templateUrl: './flashdata.component.html',
  styleUrls: ['./flashdata.component.scss'],
})
export class FlashdataComponent implements OnInit {
  @Input() servicedata:any; params:any;
  @Input() type:any;
  id:any;
  ln: any;

  constructor(private api:ApiService,private alertCtrl: AlertController,
    private modalctrl: ModalController) { 
      this.ln = localStorage.getItem("ln");
    }

    public matching(ser,val){

      let backtopage={
        ser:ser,
        val:val
      }
      this.modalctrl.dismiss(backtopage);

    }
  ngOnInit() {
   
    if(this.type=='VEHICLE')
    {
      this.id=this.servicedata.rc_regn_no;
    }
    if(this.type=='DRIVER')
    {
      this.id=this.servicedata.dlOldLicnum;
    }

 // console.log('----------------->',this.servicedata);
  }

}
