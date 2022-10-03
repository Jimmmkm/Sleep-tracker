import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {OvernightSleepData} from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-login-overnight',
  templateUrl: './login-overnight.page.html',
  styleUrls: ['./login-overnight.page.scss'],
})
export class LoginOvernightPage implements OnInit {
  startTime = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
  endTime  = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
  sleepTime: OvernightSleepData;
  overnightSleepDataArray=SleepService.AllOvernightData;
  
  constructor(private modal:ModalController, private toast:ToastController) { }

  ngOnInit() {
    console.log(this.startTime)
  }

  async setDate() {
    console.log(this.overnightSleepDataArray)
    if (new Date(this.startTime) > new Date(this.endTime)) {
      var toast=await this.toast.create({
        message:'Please check your times again! Did you really want to wake up before falling asleep?',
        duration:2000
      });
      toast.present(); 
    }
    else {
      var toast=await this.toast.create({
        message:'Your overnight sleep has successfully been recorded!',
        duration:2000
      });
      toast.present(); 
      this.overnightSleepDataArray.push(new OvernightSleepData(new Date(this.startTime), new Date(this.endTime)));
      SleepService.AllSleepData.push(new OvernightSleepData(new Date(this.startTime), new Date(this.endTime)))
      this.modal.dismiss(new OvernightSleepData(new Date(this.startTime), new Date(this.endTime)))
    }
    console.log(this.overnightSleepDataArray)
  
  }


  dismiss() {
    this.modal.dismiss()
  }

}
