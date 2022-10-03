import { Component, OnInit } from '@angular/core';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepService } from '../services/sleep.service';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  allSleepiness=StanfordSleepinessData.ScaleValues;
  sleepinessDataArr=SleepService.AllSleepinessData;
  sleepExtent: number = 1;
  context: string = this.allSleepiness[this.sleepExtent];
  date=(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);

  constructor(public modal:ModalController, private toast: ToastController) { }

  ngOnInit() {
    console.log(this.date)
  }

  async confirm () {
    // console.log(this.sleepExtent)
    this.sleepinessDataArr.push(new StanfordSleepinessData(this.sleepExtent, new Date(this.date)));
    // console.log(this.sleepinessDataArr);
    SleepService.AllSleepData.push(new StanfordSleepinessData(this.sleepExtent, new Date(this.date)))
    // console.log(SleepService.AllSleepData)
    var toast=await this.toast.create({
      message:'Your sleepiness has been recorded',
      duration:2000
    });
    toast.present();
    this.modal.dismiss(new StanfordSleepinessData(this.sleepExtent, new Date(this.date)));

  }
  

  async changeSleepiness(){
    this.context = this.allSleepiness[this.sleepExtent];
  }

  dismiss() {
    this.modal.dismiss()
  }

}
