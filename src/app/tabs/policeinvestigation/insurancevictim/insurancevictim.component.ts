import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';

import { model_darinsurance } from '../../../models/model_darinsurance';
import { model_darinsurancedeath } from '../../../models/model_darinsurancedeath';
import { model_darinsuranceinjury } from '../../../models/model_darinsuranceinjury';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-insurancevictim',
  templateUrl: './insurancevictim.component.html',
  styleUrls: ['./insurancevictim.component.scss'],
})
export class InsurancevictimComponent implements OnInit {
  

  accident_id: any;
  liablityreason: any;
  liablityreasoninjury: any;
  
  death_income:any='';
  death_future_prospects:any='';
  death_less_personal_expenses:any='';
  death_monthly_loss_depedency:any;
  death_anual_loss_depedency:any;
  death_mulltiplier:any='';
  death_total_loss_dependency:any;
  death_medical_expenses:any='';
  death_loss_consortium:any='';
  death_loss_for_love_affection:any='';
  death_loss_estate:any='';
  death_loss_funeral_expenses:any='';
  death_total_compensation:any;
  death_interest:any;

  getdeathconfirmation:any;
  getdeathconfirmationinjury:any;
  getconficontent:any;
  yesno:any=0;
  yesnoinjury:any=0;

  

//----------------INJURY---------------------//
inj_treatment:any='';
inj_convenance:any='';
inj_special_diet:any='';
inj_cost_nursing_attendant:any='';
inj_cost_artificial_limp:any='';
inj_loss_erning_capacity:any='';
inj_loss_income:any='';
inj_any_other_loss:any='';
inj_com_mental_phy_shock:any='';
inj_pain_suffering:any='';
inj_loss_amenities:any='';
inj_disfiguration:any='';
inj_loss_of_marriage:any='';
inj_loss_ear_inc_har_dis:any='';
inj_total_copensation:any;


inj_personid:any;
inj_ptype:any;

inj_income:any='';
inj_natureofinjury:any;
inj_medical_treatment:any;
inj_permenant_disablity_details:any;

inj_permenant_disablity:any;

inj_disablity_percentage:any;
permanent_or_temporary_disablity:any;
inj_amenities_lifespan:any='';
inj_percentage_earning_capacity:any='';
multiplier:any=''

;
inj_loss_future_income:any;
inj_total_compensation_respondent:any;
inj_intrest:any;
//----------------INJURY---------------------//



  public darinsurancedeath:model_darinsurancedeath;
  public darinsuranceinjury:model_darinsuranceinjury;
  public darinsurance:model_darinsurance;
  selacc:any;
  flag:any;

  
  constructor(private api:ApiService, private modalctrl: ModalController) {
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;

   }

  vname:any;
  vehicle_reg_no:any;
  user:any;
  ngOnInit() {
    this.darinsurancedeath=new model_darinsurancedeath(); 
    this.darinsuranceinjury=new model_darinsuranceinjury(); 
    this.darinsurance=new model_darinsurance(); 
    // this.darinsurancedeath.death_future_prospects='1000';
    // this.darinsurancedeath.death_less_personal_expenses='2000'
    // this.darinsurancedeath.death_monthly_loss_depedency=this.darinsurancedeath.death_future_prospects * this.darinsurancedeath.death_less_personal_expenses;
    this.loadvehicle() ;
    this.ineman();
    this.user= JSON.parse(localStorage.getItem('userData'));
    console.log('--------->',this.user.office_id)
  }
 ineman(){

  this.darinsurancedeath.death_monthly_loss_depedency= (this.death_income * 1 + this.darinsurancedeath.death_future_prospects *1) - this.darinsurancedeath.death_less_personal_expenses;

 }

 addA(){
  this.death_income
 }
 addB(){
  this.darinsurancedeath.death_future_prospects
 }
 addC(){
  this.darinsurancedeath.death_less_personal_expenses
  this.darinsurancedeath.death_monthly_loss_depedency= (this.death_income * 1 + this.darinsurancedeath.death_future_prospects *1) - this.darinsurancedeath.death_less_personal_expenses;

 }

 accid:any;
 vehicle:any;
 victim:any;
 loadvehicle(){
  let postDate = {

      mode: "loadinsuredvehiclebycompany",
      accid:this.accid,

  }
   this.api.post("datas", postDate).subscribe((rec: any) => {
   this.vehicle=rec.dataset;

   });



}


loadvictimdetails(event:any){

  if(event.target.value.marriage=="Married"){
    this.inj_loss_of_marriage= 0;
  }
console.log("------>",event.target.value);

            if(event.target.value.injury_severity=='1')
            {
              this.flag=1;
            }
            else
            {
              this.flag=2;
            }

            this.inj_ptype=event.target.value.ptype;
            this.inj_personid=event.target.value.id;

}
resetvalue(event:any){
  if(event.target.value)
  {


    this.yesno=event.target.value;
  }
  else
  {

    this.yesno=event.target.value;

  }

  }
    loadvehicledetail(event:any){




  let postDate = {

                      mode: "loadvictimsbyvehicle",
                      accid:this.accid,
                      vehicleid:event.target.value

                }



 this.api.post("datas", postDate).subscribe((rec: any) => {

                    this.victim=rec.victims;

 });
 
  
    }



  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }
  savebutton(){
    let postData={
   mode: 'addinsurance',
   id_insurance:this.user.office_id,
   inj_income:this.inj_income,
   inj_natureofinjury:this.inj_natureofinjury,
   inj_medical_treatment:this.inj_medical_treatment,
   inj_permenant_disablity:this.inj_permenant_disablity,
   inj_permenant_disablity_details:this.inj_permenant_disablity_details,
   vehicle_id:this.vehicle_reg_no,
   accident_id:this.accid,
   person_id:this.inj_personid,
   person_type:this.inj_ptype,
   inj_treatment:this.inj_treatment,
   inj_convenance:this.inj_convenance,
   inj_special_diet:this.inj_special_diet,
   inj_cost_nursing_attendant:this.inj_cost_nursing_attendant,
   inj_cost_artificial_limp:this.inj_cost_artificial_limp,
   inj_loss_erning_capacity:this.inj_loss_erning_capacity,
   inj_loss_income:this.inj_loss_income,
   inj_any_other_loss:this.inj_any_other_loss,
   inj_com_mental_phy_shock:this.inj_com_mental_phy_shock,


   inj_pain_suffering:this.inj_pain_suffering,
   inj_loss_amenities:this.inj_loss_amenities,
   inj_disfiguration:this.inj_disfiguration,
   inj_loss_of_marriage:this.inj_loss_of_marriage,
   inj_loss_ear_inc_har_dis:this.inj_loss_ear_inc_har_dis,
   inj_total_copensation: this.inj_treatment * 1 +  this.inj_convenance * 1  +this.inj_special_diet * 1 + this.inj_cost_nursing_attendant * 1 + this.inj_cost_artificial_limp * 1  + this.inj_loss_erning_capacity * 1 + this.inj_loss_income * 1 +this. inj_any_other_loss * 1  + this.inj_com_mental_phy_shock * 1 + this.inj_pain_suffering * 1 + this.inj_loss_amenities * 1 +this. inj_disfiguration * 1 + this. inj_loss_of_marriage * 1 + this.inj_loss_ear_inc_har_dis * 1,
   inj_disablity_percentage:this.inj_disablity_percentage,
   permanent_or_temporary_disablity:this.permanent_or_temporary_disablity,
   inj_amenities_lifespan:this.inj_amenities_lifespan,
   inj_percentage_earning_capacity:this.inj_percentage_earning_capacity,
   multiplier:this.multiplier,
   inj_loss_future_income:this.inj_income * (this.inj_percentage_earning_capacity / 100 )* this.multiplier,
   inj_total_compensation_respondent:this.inj_treatment * 1 +  this.inj_convenance * 1  +this.inj_special_diet * 1 + this.inj_cost_nursing_attendant * 1 +  this.inj_loss_income * 1 + this.inj_cost_artificial_limp * 1  + this.inj_any_other_loss * 1 + this.inj_com_mental_phy_shock * 1 + this.inj_pain_suffering * 1 +  this.inj_loss_amenities * 1 + this.inj_disfiguration * 1 + this.inj_loss_of_marriage * 1 + this.inj_loss_ear_inc_har_dis * 1 + this.inj_amenities_lifespan * 1 + (this.inj_income * (this.inj_percentage_earning_capacity / 100 )* this.multiplier),
   inj_intrest:this.inj_intrest,
   liablityreason:null



 }
 this.api.darsave("saveInsuranceInjured", postData).subscribe((rec: any) => {
  alert(rec.Message);
 });
 

 console.log("--------------",postData);
}

savebuttonliablity(){

  let postData={
 mode: 'addinsurance',
 id_insurance:this.user.office_id,
 inj_income:this.inj_income,
 inj_natureofinjury:this.inj_natureofinjury,
 inj_medical_treatment:this.inj_medical_treatment,
 inj_permenant_disablity:this.inj_permenant_disablity,
 inj_permenant_disablity_details:this.inj_permenant_disablity_details,
 vehicle_id:this.vehicle_reg_no,
 accident_id:this.accid,
 person_id:this.inj_personid,
 person_type:this.inj_ptype,
 
 inj_treatment:0,
 inj_convenance:0,
 inj_special_diet:0,
 inj_cost_nursing_attendant:0,
 inj_cost_artificial_limp:0,
 inj_loss_erning_capacity:0,
 inj_loss_income:0,
 inj_any_other_loss:0,
 inj_com_mental_phy_shock:this.inj_com_mental_phy_shock,


 inj_pain_suffering:0,
 inj_loss_amenities:0,
 inj_disfiguration:0,
 inj_loss_of_marriage:0,
 inj_loss_ear_inc_har_dis:0,
 //id_insurance:'23432',
 inj_total_copensation:0,
 inj_disablity_percentage:this.inj_disablity_percentage,
 permanent_or_temporary_disablity:null,
 inj_amenities_lifespan:0,
 inj_percentage_earning_capacity:0,
 multiplier:this.multiplier,
 inj_loss_future_income:0,
 inj_total_compensation_respondent:0,
 inj_intrest:0,
 liablityreason:this.liablityreasoninjury
 
}
this.api.darsave("saveInsuranceInjured", postData).subscribe((rec: any) => {
alert(rec.Message);
});


console.log("--------------",postData);
}
flagyesorno()
{

if(this.getdeathconfirmation==1)
{

this.yesno=1;

}
else
{
this.yesno=0;
}

}
flagyesornoinjured()
{

if(this.getdeathconfirmationinjury==1)
{

this.yesnoinjury=1;

}
else
{
this.yesnoinjury=0;
}

}

savebutton2only(){
  let postData={
//getconficontent
    

    mode: 'addinsurance',
    id_insurance:this.user.office_id,
    vehicle_id:this.vehicle_reg_no,
    accident_id:this.accid,
    person_id:this.inj_personid,
    person_type:this.inj_ptype,
    getconficontent:this.getconficontent,
    
    death_income:0,
    death_future_prospects:0,
    death_less_personal_expenses:0,
    death_monthly_loss_depedency:0,
    death_anual_loss_depedency:0,
    death_mulltiplier:this.death_mulltiplier,
    death_total_loss_dependency:0,
    death_medical_expenses:0,
    death_loss_consortium:0,
    death_loss_for_love_affection:0,
    death_loss_estate:0,
    death_loss_funeral_expenses:0,
    death_total_compensation:0,
    death_interest:0,
    liablityreason:this.liablityreason
   }

   console.log("All Zero----->",postData);
 //  return false;


   this.api.darsave("saveInsuranceDeceased", postData).subscribe((rec: any) => {
    //alert(rec.Message);
    alert("sucess");
    this.modalctrl.dismiss();
  });
}
savebutton2(){
  let postData={
 mode: 'addinsurance',
 id_insurance:this.user.office_id,
 vehicle_id:this.vehicle_reg_no,
 accident_id:this.accid,
 death_income:this.death_income,
 death_future_prospects:this.death_future_prospects,
 death_less_personal_expenses:this.death_less_personal_expenses,
 death_monthly_loss_depedency: (this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses,
 death_anual_loss_depedency:((this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses)*12,
 death_mulltiplier:this.death_mulltiplier,
 death_total_loss_dependency:((this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses)*12*this.death_mulltiplier,
 death_medical_expenses:this.death_medical_expenses,
 death_loss_consortium:this.death_loss_consortium,
 death_loss_for_love_affection:this.death_loss_for_love_affection,
 death_loss_estate:this.death_loss_estate,
 death_loss_funeral_expenses:this.death_loss_funeral_expenses,
 death_total_compensation:((this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses)*12*this.death_mulltiplier * 1 + this.death_medical_expenses * 1  + this.death_loss_consortium  * 1 + this.death_loss_for_love_affection  * 1 + this.death_loss_estate * 1  + this.death_loss_funeral_expenses *1,
death_interest:this.death_interest,
 person_id:this.inj_personid,
 person_type:this.inj_ptype,
 getconficontent:null,
 liablityreason:null

}

this.api.darsave("saveInsuranceDeceased", postData).subscribe((rec: any) => {
      //alert(rec.Message);
      alert("sucess");
      this.modalctrl.dismiss();
    });




console.log("--------------",postData);
}
}
