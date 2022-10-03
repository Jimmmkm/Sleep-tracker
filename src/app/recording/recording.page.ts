import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@capacitor/storage';
import { HomePage } from '../home/home.page';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-recording',
  templateUrl: './recording.page.html',
  styleUrls: ['./recording.page.scss'],
})


export class RecordingPage implements OnInit {
  allData=SleepService.AllSleepData;
  
  allSleepiness=StanfordSleepinessData.ScaleValues;
  overnightSleepDataArray=SleepService.AllOvernightData;
  sleepinessDataArr=SleepService.AllSleepinessData;
  recent=this.allData[this.allData.length-1];
  boolSleep=false;
  boolOvernight=false;
  boolCard=false;

  

  constructor(public modal: ModalController, private toast: ToastController) { }
  

  ngOnInit() {
  }

  filterOvernight() {
    this.boolOvernight=true;
    this.boolSleep=false;
  }

  filterSleepiness() {
    this.boolOvernight=false;
    this.boolSleep=true;
  }

  reset() {
    this.boolSleep=false;
    this.boolOvernight=false;
  }

  dismiss() {
    this.modal.dismiss()
  }

  async clear() {
    Storage.keys().then((data) => {
      console.log(data)
      data.keys.forEach((result) => {
        if (result != '0') {
          Storage.remove({key: result})
        }
      })
    })
    var toast=await this.toast.create({
      message:'All of your records have successfully been deleted!',
      duration:2000
    });
    toast.present();
    SleepService.AllSleepData=[]
    this.allData=SleepService.AllSleepData;
    SleepService.AllSleepinessData=[];
    this.sleepinessDataArr=SleepService.AllSleepinessData;
    SleepService.AllOvernightData=[];
    this.overnightSleepDataArray=SleepService.AllOvernightData;
    HomePage.reset();
    console.log(this.allData)
    this.modal.dismiss();
  }



}
