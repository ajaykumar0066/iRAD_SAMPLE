import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { AuthService, AuthResponseData } from '../../../commonpages/login/auth.service';
import { ApiService } from '../../../services/api.service';

import { AlertController, ModalController } from '@ionic/angular';
import { LogindetailsComponent } from './logindetails/logindetails.component';
import { CountdetailsComponent } from '../../../popups/countdetails/countdetails.component';

import { FilterdetailsComponent } from './filterdetails/filterdetails.component';
import { DatePipe } from '@angular/common';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('barChart', { static: false }) barChart;

  @ViewChild('lineCanvas', { static: false }) lineCanvas;

  @ViewChild('lineCanvas2', { static: false }) lineCanvas2;

  lineChart: any;  tl_flag:any; db_flag:any='GENERAL'; cf_flag:any='C1'; dev:boolean=false;
  lineChart2: any;  dashboardview:string='PD';

  selectedLanguage: string; params: any;
  selection = { 'state': '', 'district': '', 'station': '', 'year': '' };
  accid: any;
  data: any = null; fromdate:Date=null;todate:Date=null; today: String = new Date().toISOString();
  dead: number = 0; injured: number = 0; year: any = ''; totaccident: number = 0;
  ac_count: number[] = [0, 0, 0, 0, 0];
//-----------------------------------------
  role:any; dept:any;
  pendingflag:boolean=true;
  inprocessflag:boolean=true;
  submittedflag:boolean=true;
  toggle1:boolean = false;

  label:any = 'State';

  statename:any;
  rtoname:any;
  mviname:any;
  private userSub: Subscription;

policedata:boolean=false;

  statelist:any;
  rtolist:any;
  mvilist:any;
  fullvalue:any;
  result:any;
  policeresult:any;
  totalinspection:number=123456;

  //--------------------------------


  user: any;
  bars: any;
  colorArray: any;
  title: string=null;
  linedata = { label: [], value: [] ,fatal:[],grev:[],sih:[],sinh:[],ni:[]};

  linedatas = [{ label: [], value: [] }];


  public config = {
    animation: 'count',
    format: ',ddd',
    theme: 'default',
    value: 50,
    auto: true,
  }

   dashboard = {
    title: 'Loading ...',
    subtitle:'',
    fatal : 0,
    grevious:0,
    simple_injury_h:0,
    simple_injury_nh:0,
    no_injury:0,
    injured:0,
    dead:0,
    totaccident : 0,
    totalperson: 0
  };
  accdev: boolean;
  transportdata: any;
  transdata: any;
  transportdatatable: any;
  pieCanvas: any;
  hwdata: any;
  pending: number;
  highwaystable: any;
  hosdistrict: any;
  greeedHos: boolean;
  greeedDistHos: boolean;
  greeedHospitalist: boolean;
  hospitallist: any;
  healthData: any;
  patienttype: any;
  healthGender: any;
  hospitalregis: any;
  hospitalRegiscount: any;
  getSeverity: any;
  getTrauma: any;
  totalPatient: any;
  totalGender: any;
  totalSeverity: any;
  totalTrauma: any;
  getPMJAY: any;
  getAge: any;
  getReports: any;
  getPIS: any;
  totalAge: any;
  totalPIS: any;
  totalPMJAY: any;



  constructor(private translateConfigService: TranslateConfigService,
    private api: ApiService, private modalctrl: ModalController, private router: Router, public datepipe: DatePipe,
    private authService: AuthService,
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.tabLoading();
  }

  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    if(this.dept=='1') {this.dashboardview='PD'; this.loaddeatils();}
    else if(this.dept=='2') {this.dashboardview='PD'}
   // this.loaddeatils();
    
    if(this.dept=='2' && this.role=='31')
    {  this.loaddeatils();
     // this.cf_flag='C2';
     this.loadrto('1');
        
    }
    if(this.dept=='2' && this.role=='35')
    {  this.loaddeatils();
     // this.cf_flag='C2'
     this.loadmvi("1");
        
    }
    this.greeedHos = false;
    this.greeedDistHos = true;
    this.greeedHospitalist = true;
    //this.loadDashboard();
  }
  public loadrto(id){

    //    alert(this.user.state_code);
    if(id==1)
    {
      if(this.user.state_code!='')
      {
        this.statename=this.user.state_code;
      }
     
    }
        this.fullvalue=null;
    this.rtolist=null;
    let postDate = {
      mode: "load_rtobyintrest",
      statename:this.statename,
      level:'state'
    };
    
          this.api.post("dashboard.php", postDate).subscribe((data: any) => {
            this.rtolist=data.rtolist;
            this.fullvalue=data.total;
            if(data.policeflag=='1')
            {
            this.policedata=true;
            this.policeresult=data.station;
            }
            else
            {
              this.policedata=false;
              this.policeresult=null;
            }
            this.result=data.dataresult;
          //  this.statelist=data.state;
          this.label='RTO / DMTO';
    });
    
    }
    public changedata(){
      //alert("hiiiii");
      this.fullvalue=null;
    this.pendingflag=false;
    this.pendingflag=false;
      let postDate = {
        mode: "load_mvidata",
        rto:this.rtoname,
        state:this.statename,
        mvi:this.mviname
      };
      this.api.post("dashboard.php", postDate).subscribe((data: any) => {
        this.fullvalue=data.total;
        if(data.policeflag=='1')
        {
        this.policedata=true;
        this.policeresult=data.station;
        }
        else
        {
          this.policedata=false;
          this.policeresult=null;
        }
        this.result=data.dataresult;
    
      });
    }
    public loadmvi(id){
      if(id==1)
      {
        if(this.user.state_code!='')
          {
                   this.rtoname= this.user.office_id;
          }
      }
      this.fullvalue=null;
    //this.rtolist=null;
      //alert('hiii');
      //select name,username as id from master.irad_users where dept_code='2' and role_code='37' and office_id='TN23'
    this.pendingflag=false;
      let postDate = {
        mode: "load_mvibyintrest",
        rto:this.rtoname,
        state:this.user.state_code
      };
      
            this.api.post("dashboard.php", postDate).subscribe((data: any) => {
              this.mvilist=data.mvilist;
              this.fullvalue=data.total;
            if(data.policeflag=='1')
            {
            this.policedata=true;
            this.policeresult=data.station;
            }
            else
            {
              this.policedata=false;
              this.policeresult=null;
            }
            this.result=data.dataresult;
            this.label="MVI /MTO";
      });
    
    }
    public loaddeatils(){
    //return false;
       this.pendingflag=true;
       this.inprocessflag=true;
       this.submittedflag=true;
    
       this.statename = " ";
       this.rtoname = " ";
       this.mviname = " ";
    
      let postDate = {
        mode: "basicdetails",
      };
    
          this.api.post("dashboard.php", postDate).subscribe((data: any) => {
            this.fullvalue=data.total;
            if(data.policeflag=='1')
            {
            this.policedata=true;
            this.policeresult=data.station;
            }
            else
            {
              this.policedata=false;
              this.policeresult=null;
            }
            this.result=data.dataresult;
            this.statelist=data.state;
          
            console.log(this.fullvalue);
    
      });
    }
  tabLoading(){
  

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      console.log("---");
     console.log(user);
     this.user=user;
      this.dept=user.dept;
      this.role=user.role;
      this.statename=user.state_code;
      console.log("---");
      this.rtoname=user.office_id;
//        alert(user.office_id);
//alert(user.state_code);
//alert(user.dept);
//alert(user.role);
    
  });

}
  ngAfterViewInit() {
    let dtl=localStorage.getItem('dtl');
    this.dev = (localStorage.getItem('dev') === 'true');
    this.timeLine(dtl);
  }

  chartChange(flag)
  {
    //console.log("AJAY IS PREPARING ",flag);

    if(flag=='C1')
    {
     // console.log("AJAY IS PREPARING123 ",flag);
      this.lineChart.data.datasets.splice(1, 5);
     // this.linechartaddDataset('fatal');
     // this.linechartaddDataset('grev');
     // this.linechartaddDataset('sih');
     // this.linechartaddDataset('sinh');
     // this.linechartaddDataset('ni');

      // this.lineChart.data.datasets.splice(1, 5);
      // this.lineChart.update();
     // return false;
    }
    else if (flag=='C2')
    {
     // console.log("AJAY IS PREPARING456 ",flag);
      this.linechartaddDataset('fatal');
      this.linechartaddDataset('grev');
      this.linechartaddDataset('sih');
      this.linechartaddDataset('sinh');
      this.linechartaddDataset('ni');
      // console.log("BARCHART1",this.linedata.label);
      // console.log("BARCHART2",this.linedata.fatal);
      // console.log("BARCHART3",this.linedata.grev);
      // console.log("BARCHART4",this.linedata.sih);
      // console.log("BARCHART5",this.linedata.sinh);
      // console.log("BARCHART6",this.linedata.ni);
      if (this.lineChart) this.lineChart.destroy();
      this.lineChart = new Chart(this.lineCanvas.nativeElement, 
               
        {
        type: 'bar',
        data:
         {
          
          labels: this.linedata.label,
          
          datasets: [
            // {
            //   data: this.linedata.value,
            //   label: 'No. of Accidents',
            //   backgroundColor: '#013a6e',                      
            // },
            {
              data: this.linedata.fatal,
              label: 'fatal',
              backgroundColor: '#ff718e',
            },
            {
              data:this.linedata.grev,
              label: 'Grevious',
              backgroundColor: '#ffac59',
            },
            {
              data: this.linedata.sih,
              label: 'Simple Injury(H)',
              backgroundColor: '#ffd265',
            },
            {
              data: this.linedata.sinh,
              label: 'Simple Injury(Non H)',
              backgroundColor: '#79d9d9',
            },
            {
              data: this.linedata.ni,
              label: 'No Injury',
              backgroundColor: '#7dbfec',
            },
          ],
        },
        options : {
        responsive: true,
          scales: {      
             yAxes: [{
              ticks: {
                autoSkip: true,
                beginAtZero: true,
               // stepSize: 1,
                maxTicksLimit: 10
              },
              stacked: true,
              
             }],
             xAxes: [{
              ticks: {
                autoSkip: true,
                beginAtZero: true,
               // stepSize: 1,
                maxTicksLimit: 10
              },
                stacked: true,
             }]
          }
       }   
      });
    //    this.lineChart.data.datasets.splice(1, 5);
    //   this.linechartaddDataset('fatal');
    //   this.linechartaddDataset('grev');
    //   this.linechartaddDataset('sih');
    //   this.linechartaddDataset('sinh');
    //   this.linechartaddDataset('ni');
     }

    
     
  }
  
    



  
  timeLine(flag) {
   
    this.dashboard.title='Loading ...'; this.dashboard.subtitle='';
   this.dashboard.fatal=0;
   this.dashboard.grevious=0;
   this.dashboard.simple_injury_h=0;
   this.dashboard.simple_injury_nh=0;
   this.dashboard.no_injury=0;
   this.totaccident=0;
   this.dashboard.injured=0;
   this.dashboard.dead=0;
   this.dashboard.totalperson=0;


    console.log(flag);
    let xaxis;

    if (flag == '1D' || flag==null) {
      xaxis = "Today (by Hours)";
    } else if (flag == '1W') {
      xaxis = "Last 7 Days";
    } else if (flag == '1M') {
      xaxis = "Last 30 Days";
    } else if (flag == '3M') {
      xaxis = "Last 3 Months";
    } else if (flag == '6M') {
      xaxis = "Last 6 Months";
    } else if (flag == '1Y') {
      xaxis = "Last 1 Year";
    } else if (flag == 'ALL') {
      xaxis = "Since 1st January 2021";
    } else if(flag=='CUSTOM'){
      xaxis =' From '+ this.datepipe.transform(this.fromdate, 'd-MMM-yyyy') ;
      if(this.todate!=null){
        xaxis +=' To '+ this.datepipe.transform(this.todate, 'd-MMM-yyyy') ;
      }else{
        xaxis +=' To TODAY';
      }
    }else{
      flag = '1D';
      xaxis = "Today (by Hours)";
    }
    this.tl_flag=flag;
    localStorage.setItem('dtl',flag);
    let postDate = {
      mode: 'timeline',
      'range': flag,
      'selection': this.selection,
      'fromdate':this.fromdate,
      'todate':this.todate,
    }
    if(flag=='CUSTOM'){
        postDate = {
        mode: 'timeline',
        'range': flag,
        'selection': this.selection,
        'fromdate':this.fromdate,
        'todate':this.todate,
        
      }
    }
    this.api.post('dashboard.php', postDate).subscribe((data: any) => {

     
      if(data.error!=undefined){
        console.log('resdata',data);
        this.authService.logout();
        this.router.navigate(['/home']);
      }

      let label = new Array();
      let value = new Array(); let fatal = new Array(); let grev = new Array(); let sih = new Array(); let sinh = new Array(); let ni=new Array();
      let linedata = data.timeline;
      for (let i = 0; i < linedata.length; i++) {
        label[i] = linedata[i]['label'];
        value[i] = linedata[i]['value'];
        fatal[i] = linedata[i]['fatal'];
        grev[i] = linedata[i]['grev'];
        sih[i] = linedata[i]['sih'];
        sinh[i] = linedata[i]['sinh'];
        ni[i] = linedata[i]['ni'];
      }
      this.linedata.label = label;
      this.linedata.value = value;
      this.linedata.fatal = fatal;
      this.linedata.grev = grev;
      this.linedata.sih = sih;
      this.linedata.sinh = sinh;
      this.linedata.ni = ni;
      //console.clear();
     // console.log(this.linedata);
      

     if(this.cf_flag=='C1')
    {
       this.lineChartMethod(xaxis);

      this.lineChart.data.datasets.splice(1, 5);


     /* this.linechartaddDataset('fatal');
      this.linechartaddDataset('grev');
      this.linechartaddDataset('sih');
      this.linechartaddDataset('sinh');
      this.linechartaddDataset('ni');*/
    }


      let sevwise = data.severitywise;
      for (let i = 0; i < sevwise.length; i++) {
        if(sevwise[i].severity==1) this.dashboard.fatal=sevwise[i].count;
        if(sevwise[i].severity==2) this.dashboard.grevious=sevwise[i].count;
        if(sevwise[i].severity==3) this.dashboard.simple_injury_h=sevwise[i].count;
        if(sevwise[i].severity==4) this.dashboard.simple_injury_nh=sevwise[i].count;
        if(sevwise[i].severity==5) this.dashboard.no_injury=sevwise[i].count;
      }
     
       this.dashboard.totaccident= this.dashboard.fatal +  this.dashboard.grevious+this.dashboard.simple_injury_h+this.dashboard.simple_injury_nh+this.dashboard.no_injury;
       

      let personcount = data.personcount;
      this.dashboard.injured=personcount.injured;
      this.dashboard.dead=personcount.dead;
      this.dashboard.totalperson= this.dashboard.injured+this.dashboard.dead;
      this.dashboard.title=data.title;
      this.dashboard.subtitle=xaxis;
       

      this.chartChange(this.cf_flag);
    });

  }

  clickLineChart(flag)
  {
    console.log(flag);
    let dtl=localStorage.getItem('dtl');
    this.dev = (localStorage.getItem('dev') === 'true');
    this.timeLine(dtl);
   
  }


  lineChartMethod(xaxis)
   {
    if (this.lineChart) this.lineChart.destroy();
    this.lineChart = new Chart(this.lineCanvas.nativeElement, 
      {
      type: 'line',
      data: {
        labels: this.linedata.label,//['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'No. of Accidents',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(1, 58, 110,0.1)',
            borderColor: 'rgba(1, 58, 110,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(1, 58, 110,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(1, 58, 110,1)',
            pointHoverBorderColor: 'rgba(1, 58, 110,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: this.linedata.value, // [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,

          }
        ]
      },
      options: {

        legend: {
          display: true,
          fill:true,
          labels: {
            fontColor: '#666666',
           // fontStyle:"bold"
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              // Make labels vertical
              // https://stackoverflow.com/questions/28031873/make-x-label-horizontal-in-chartjs
              //minRotation: 90,

              // Limit number of labels
              // https://stackoverflow.com/questions/22064577/limit-labels-number-on-chartjs-line-chart
              autoSkip: true,
              maxTicksLimit: 10
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: xaxis
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              autoSkip: true,
              beginAtZero: true,
             // stepSize: 1,
              maxTicksLimit: 10
            },
            scaleLabel: {
              display: true,
              labelString: 'No. of Accidents'
            }
          }],
        }
      },
    });
  }

  linechartaddDataset(flag){

console.log(this.lineChart.data.datasets.length);
let ldata; let color='255, 99, 132'; let label='';
if(flag=='fatal'){
  label="Fatal";
  ldata=this.linedata.fatal;
  color='255, 99, 132';
   
}else if(flag=='grev'){
  label="Grievous";
   ldata=this.linedata.grev;
   color='245, 179, 121';
}else if(flag=='sih'){
  color="255, 210, 101"
  label="Simple Injury(H)";
   ldata=this.linedata.sih;
}else if(flag=='sinh'){
  color='121, 217, 217';
  label="Simple Injury(Non H)";
   ldata=this.linedata.sinh;
}else if(flag=='ni'){
  color='121, 161, 189';
  label="No Injury";
  ldata=this.linedata.ni;
}

   
      //this.lineChart.data.datasets.pop();

      for(let i=1;i<this.lineChart.data.datasets.length;i++){
        console.log(this.lineChart.data.datasets[i].label,'==',label);
        if(this.lineChart.data.datasets[i].label==label){ console.log('in');
          this.lineChart.data.datasets.splice(i, 1);
          this.lineChart.update(); return false;
          }

      }



     // this.lineChart.update();
   
   

      const newDataset = 
        {
          label: label,
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba('+color+',0.0)',
          borderColor: 'rgba('+color+',1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba('+color+',1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba('+color+',1)',
          pointHoverBorderColor: 'rgba('+color+',1)',
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 10,
          data: ldata ,// [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
          spanGaps: false,

        
      };
      this.lineChart.data.datasets.push(newDataset);
     // this.lineChart.update();
    
    this.lineChart.update();
  }


  lineChartMethod2(xaxis) {
    if (this.lineChart2) this.lineChart2.destroy();
    this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {
      type: 'line',
      data: {
        labels: this.linedata.label,//['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'No. of Accidents',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(255, 99, 132,0.1)',
            borderColor: 'rgba(255, 99, 132,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255, 99, 132,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255, 99, 132,1)',
            pointHoverBorderColor: 'rgba(255, 99, 132,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: this.linedatas[1].value, // [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,

          },

          {
            label: 'No. of Accidents',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(255, 99, 132,0.1)',
            borderColor: 'rgba(255, 99, 132,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255, 99, 132,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255, 99, 132,1)',
            pointHoverBorderColor: 'rgba(255, 99, 132,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: this.linedatas[2].value, // [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,

          }

        ]
      },
      options: {

        legend: {
          display: false,
          fill:true,
          labels: {
            fontColor: '#DF2B1D',
            fontStyle:"bold"
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              // Make labels vertical
              // https://stackoverflow.com/questions/28031873/make-x-label-horizontal-in-chartjs
              //minRotation: 90,

              // Limit number of labels
              // https://stackoverflow.com/questions/22064577/limit-labels-number-on-chartjs-line-chart
              autoSkip: true,
              maxTicksLimit: 10
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: xaxis
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              autoSkip: true,
              beginAtZero: true,
             // stepSize: 1,
              maxTicksLimit: 10
            },
            scaleLabel: {
              display: true,
              labelString: 'No. of Accidents'
            }
          }],
        }
      },
    });
  }


  loadDashboard1() {
    console.log('loadingdashboard');

    let postDate = {
      mode: 'accidentcount',
      'selection': this.selection
    }
    this.api.post('dashboard.php', postDate).subscribe((data: any) => { 
      //console.log(data.data.report.accidentcount); 
      // this.data=data.data.report; console.log('this.data',this.data);
      let count = data.data;
      if (count.report.accidentcount != undefined) {
        //  console.log(count); 
        for (let i = 0; i < count.report.accidentcount.length; i++) {
          this.ac_count[count.report.accidentcount[i].severity - 1] = count.report.accidentcount[i].count;
        }
        //console.log('this.ac_count',count);
        this.dead = count.report.personcount.dead;
        this.injured = count.report.personcount.injured;
        this.year = count.report.year;
        this.totaccident = count.report.acccount;
        this.title = count.report.title;
        if (this.year != 0) { this.title += ' - ' + this.year; }


      } else {

        for (let i = 0; i < 5; i++) {
          this.ac_count[i] = 0;
        }
        this.dead = 0;
        this.injured = 0;
        this.year = count.report.year;
        this.totaccident = count.report.acccount;
        this.title = count.report.title;
        if (this.year != 0) { this.title += ' - Year ' + this.year; }

      }
      // if(this.totaccident!=0){  this.createBarChart(); }
      //this.createBarChart();
    });
  }


  ionViewDidEnter() {
    //this.createBarChart();
    // this.loadDashboard();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    
    this.timeLine(localStorage.getItem('dtl'));
    //this.loadDashboard();
    refresher.target.complete();


  }



  createBarChart() {
    var horizontalBarChartData = {
      labels: ['S1', 'S2', 'S3', 'S4', 'S5'],
      datasets: [{
        label: 'No of Accidents ',
        borderWidth: 4,
        backgroundColor: [
          'rgb(255, 99, 132,0.5)',
          'rgb(255, 159, 64,0.5)',
          'rgb(255, 205, 86,0.5)',
          'rgb(75, 192, 192,0.5)',
          'rgb(54, 162, 235,0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132,1)',
          'rgb(255, 159, 64,1)',
          'rgb(255, 205, 86,1)',
          'rgb(75, 192, 192,1)',
          'rgb(54, 162, 235,1)',
        ],
        yAxisID: 'y-axis-1',
        data: this.ac_count

      }


      ]

    };

    var lineChartData = {
      labels: ['2015', '2016', '2017', '2018'],
      datasets: [
        {
          label: 'Fatal',
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255,255,255,0)',
          fill: false,
          data: [
            12, 4, 6, 2, 7
          ],
          yAxisID: 'y-axis-1',
        }, {
          label: 'Grievous',
          borderColor: "rgb(255, 205, 86)",
          backgroundColor: 'rgb(255,255,255,0)',
          fill: false,
          data: [
            3, 5, 7, 9, 4
          ],
          yAxisID: 'y-axis-2'
        }, {
          label: 'Simple (Inj H)',
          borderColor: "rgb(153, 102, 255)",
          backgroundColor: 'rgb(255,255,255,0)',
          fill: false,
          data: [
            29411, 30095, 34374, 35538
          ],
          yAxisID: 'y-axis-2'
        }, {
          label: 'Simple (Inj Non H)',
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: 'rgb(255,255,255,0)',
          fill: false,
          data: [
            1404, 1121, 1377, 1683
          ],
          yAxisID: 'y-axis-2'
        }
      ]
    };

    this.data = horizontalBarChartData;
    if (this.bars) this.bars.destroy();
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: horizontalBarChartData,
      options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
          display: true,
          text: 'Accidents Based on Serverity'
        },
        legend: {
          display: false,
          labels: {
            fontColor: 'rgb(255, 99, 132)'
          }
        },
        scales: {
          yAxes: [{
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'left',
            id: 'y-axis-1',
          }, {
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'right',
            id: 'y-axis-2',

            // grid line settings
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }],
        }
      }
    });
  }

  async funCounts() {

    const modalped = await this.modalctrl.create({
      component: CountdetailsComponent,
      componentProps: { 'selection': this.selection }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);

    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });
    
  }

  drilDown(){
    this.router.navigate(['/admintabs/tab6']);
  }

  async loginDetails() {
    //console.log("RTO values",i);

    const modalped = await this.modalctrl.create({
      component: LogindetailsComponent,
      componentProps: { 'selection': this.selection }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);

    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async openFilter() {
    const modalped = await this.modalctrl.create({
      component: FilterdetailsComponent,
      componentProps: { 'selection': this.selection }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);

      if (dataReturned.data != undefined) {
        this.selection = dataReturned.data
       // this.loadDashboard();
       let dtl=localStorage.getItem('dtl');
       this.timeLine(dtl);
      }
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

//--- new dev

doRefreshDB(refresher) {
  console.log('Begin async operation', refresher);
  
  if(this.db_flag=='TRANSPORT'){
  this.transportdata=undefined
  }
  this.showDB(this.db_flag);
  //this.loadDashboard();
  refresher.target.complete();


}

showDB(flag){

  console.log('showDB Flag' ,this.db_flag, flag);
  if(flag=='GENERAL')
  {
    let dtl=localStorage.getItem('dtl');
    this.timeLine(dtl);
    //this.clickLineChart('C1');
   // this.chartChange('C1');
  }else if(flag=='TRANSPORT'){
    this.dashboard.title='Transport'; this.dashboard.subtitle='';
    if(this.transportdata==undefined){
      this.loadTransport();
    }
     this.BarTransport();
  }else if(flag=='HIGHWAYS')  {
    this.dashboard.title='Highways'; this.dashboard.subtitle='';
    this.loadhighways();
    this.loadhighwaytable();
  }else if(flag=='HEALTH')
  {
    this.dashboard.title='Health'; this.dashboard.subtitle='';
    // this.loadhospital();
    this.healthBasicInfo();
  }

}



  public loadTransport() {
    let postDate = 
     {
      mode: "transportdashboard",
    };

    this.api.post("dashboard.php", postDate).subscribe((data: any) => {
      this.transportdata = data.data1;
      this.transdata = this.transportdata[0];
      console.log("TANSPORT DATA", this.transdata)
      this.transportdatatable = data.data3;

      console.log("TRANSPORT DATATABLE IS", this.transportdatatable.data3);
      
      this.BarTransport();

    });

  }


  PieTransport() {
    let received = this.transdata.received;
    let completed = this.transdata.completed;
    let pending = this.transdata.pending;
    let inspected = this.transdata.inspected;
    if (this.pieCanvas) this.pieCanvas.destroy();
    this.pieCanvas = new Chart(this.lineCanvas.nativeElement,
      {
        type: 'pie',
        data: {
          labels: ["Pending", "Inspected", "Completed"],
          datasets: [
            {
              label: 'Inspection Requests',
              backgroundColor: ['#ffbf96', '#1ebd9c', '#a5c72b'],
              data: [pending, inspected, completed]
            },

          ]
        },
        options: {
          animation:
          {
            animateScale: 5000
          }
        }

      });
  }

  BarTransport() {

    let received = this.transdata.received;
    let completed = this.transdata.completed;
    let pending = this.transdata.pending;
    let inspected = this.transdata.inspected;
    console.log("received", received);
    console.log("completed", completed);
    console.log("pending", pending);
    console.log("inspected", inspected);

    if (this.barChart) this.barChart.destroy();
    this.barChart = new Chart(this.lineCanvas.nativeElement,
      {
        type: "bar",
        data: {
          labels: [ "Pending", "Inspected", "Completed"],
          fontSize: 24,
          datasets: [
            {
              label: "",
              data: [ pending, inspected, completed],
              backgroundColor: [
                "#ffbf96",
                "#1ebd9c",
                "#a5c72b"

              ],
              borderColor: [
                "#ffbf96",
                "#1ebd9c",
                "#a5c72b"


              ],
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false},
          scales: {
            yAxes: [{
              stacked: true,
              ticks: {
                fontSize: 14,
                beginAtZero: true
              }
            }],
            xAxes: [{
              stacked: true,
              barPercentage:0.5,
              ticks: {
                fontSize: 14,
                beginAtZero: true
              }
            }]
          }
        }
        


      });
  }

  drilldownTransport(wing)
  {
    console.log("TAB**********",wing);
    localStorage.setItem('Transdet', JSON.stringify(wing));
  
    this.router.navigate(['/admintabs/tab8']);
  }


//--- end transport

  //-- HIGHWAYS:

 public loadhighways()
  {
    let postDate = 
    {
     //  mode: "highwayrequest",
     mode: "highwayrequest",
      
    };
  
        this.api.post("dashboard.php", postDate).subscribe((data: any) => 
        {
         this.hwdata=data.hwdata[0];
         this.pending = this.hwdata.total - this.hwdata.completed;
 
    });
  }

  drilDownHighways(wing)
  {
    console.log("THW WING OF HIGHWAY IS", wing);
    localStorage.setItem('highwaydet', JSON.stringify(wing));
    this.router.navigate(['/admintabs/tab7']);
  }

  public loadhighwaytable()
  {
    let postDate = 
    {
     //  mode: "highwayrequest",
     mode: "highwayrequest_roaddept",
    };
        this.api.post("dashboard.php", postDate).subscribe((data: any) => 
        {
         this.highwaystable=data.hwdata;
         
          console.log("highwaystable",this.highwaystable);        
    });
  }

  barCharthighways()
  {
    let received = this.hwdata.total;
    let completed = this.hwdata.completed;
    let pending = this.hwdata.pending;
   
    console.log("received",received);
    console.log("completed",completed);
    console.log("pending",pending);
   
    if (this.barChart) this.barChart.destroy();
    
    this.barChart = new Chart(this.lineCanvas.nativeElement,
      {
        type: "bar",
        data: {
          labels: [ "Request", "Pending", "Completed"],
          fontSize: 24,
          datasets: [
            {
              label:"",
              data:[received,pending,completed],
              backgroundColor: [
                
                  "#ff718e",
                  "#fea87f",
                  "#a5c72b"
                 
              ],
              borderColor: [
                
                  "#ff718e",
                  "#fea87f",
                  "#a5c72b"
                  
                 
              ],
              borderWidth: 2
            }
          ]
        },
        options : {
          responsive: true,
          legend: {
            display: false
          },
            scales: {     
              legend: {
                         display: false, 
              },
               yAxes: [{
                stacked: true,
                ticks: {
                  fontSize: 14,    
                   beginAtZero: true
                    }
               }],
               xAxes: [{
                  stacked: true,
                  barPercentage:0.5,
                  ticks: {
                       fontSize: 14,    
                        beginAtZero: true
                         }
               }]
            }
         } 
        
        
        
      });
  }

  pieCharthighways()
  {
    let received = this.hwdata.total;
    let completed = this.hwdata.completed;
    let pending = this.hwdata.pending;
   
    console.log("received",received);
    console.log("completed",completed);
    console.log("pending",pending);

    if (this.pieCanvas) this.pieCanvas.destroy();
    this.pieCanvas = new Chart(this.lineCanvas.nativeElement,
      {
        type: 'pie',
        data: {
          labels: ["Request", "Pending", "Completed"],
          datasets: [
            {
              label: 'Inspection Requests',
              backgroundColor: ['#ff718e', '#fea87f', '#a5c72b'],
              data: [received, pending, completed]
            },

          ]
        },
        options: {
          animation:
          {
            animateScale: 5000
          }
        }

      });
  }


  //HEALTH

  public healthBasicInfo()
  {
  let postDate = 
  {
   mode: "basicinformation",
  };
      this.api.post("dashboard_health.php", postDate).subscribe((data: any) => 
      {
        // this.healthData=data.hospitaldata;
        this.hospitalRegiscount = data.count;
        this.getPMJAY = data.pmjay;
        this.patienttype = data.patientype;
        this.healthGender = data.gender;
        this.hospitalregis = data.hospitaltype;
        this.getSeverity = data.severity;
        this.getTrauma = data.trauma;
        this.getAge = data.ageclassfication;
        this.getReports = data.reports;
        this.getPIS = data.pis;
        console.log("TOTAL AGE",this.getReports);
       this.totalPatient = this.patienttype[0].count + this.patienttype[1].count;
       this.totalGender = this.healthGender[0].count + this.healthGender[1].count + this.healthGender[2].count;
       console.log("TOTAL GENDER",this.totalGender);
       this.totalSeverity = this.getSeverity[0].count +  this.getSeverity[1].count + this.getSeverity[2].count + this.getSeverity[3].count;
       this.totalTrauma = this.getTrauma[0].count + this.getTrauma[1].count + this.getTrauma[2].count + this.getTrauma[3].count;
       this.totalAge = this.getAge[0].children + this.getAge[0].working + this.getAge[0].oldage;
       console.log("TOTAL AGE",this.totalAge);
       this.totalPIS =  this.getPIS[0].requested + this.getPIS[0].responded;
       this.totalPMJAY = this.getPMJAY[0].count + this.getPMJAY[1].count;
  });
  }
  
  public loadhospital()
{
  let postDate = 
  {
   mode: "statehospitalcount",
  };
      this.api.post("dashboard.php", postDate).subscribe((data: any) => 
      {
        this.healthData=data.hospitaldata;
  
  });
}

 public ClickHospitalDistrict(winghos)
{

  console.log(winghos);
      let hosdict = winghos;
      let statehos = winghos.state;
      console.log("statehosstatehos",statehos);
      console.log("AASWESDSDEWDSCEDEDSCSCDSDS", hosdict);
          let postDate = 
     {
       mode: 'districthospitalcount',
       state: statehos
     }
     this.api.post('dashboard.php', postDate).subscribe((data: any) =>
      {
        console.log("HIGHWAYDIVISION&&*(*(*^*&*%*%*%",data); 
      
       this.hosdistrict=data.hospitaldata;
         
          console.log("HIGHWAYDIVISION",this.hosdistrict); 
   
     });
     this.greeedHos = true;
     this.greeedDistHos = false;
     this.greeedHospitalist = true;
}

public ClickHospitalList(winghos)
{
  console.log("winghoswinghoswinghos",winghos);
  let winghosState = winghos.state;
  let winghosdistrict = winghos.district;
  let postDate = 
  {
    mode: 'hospitallist',
    state: winghosState,
    district: winghosdistrict
  }
  this.api.post('dashboard.php', postDate).subscribe((data: any) =>
   {
    console.log("HIGHWAYDIVISION&&*(*(*^*&*%*%*%",data); 
    // this.loading=true;
    this.hospitallist=data.hospitaldata;
       console.log("HIGHWAYDIVISION",this.hospitallist); 
  });
  this.greeedHos = true;
  this.greeedDistHos = true;
  this.greeedHospitalist = false;
}
closeModalHospital()
{
  this.greeedHos = false;
  this.greeedDistHos = true;
}

closeModalHospitalList()
{
  this.greeedHos = true;
  this.greeedDistHos = false;
  this.greeedHospitalist = true;
}

}