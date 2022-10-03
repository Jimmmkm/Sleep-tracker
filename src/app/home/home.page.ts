import { Component, Input } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { LoginOvernightPage } from '../login-overnight/login-overnight.page';
import { SleepinessPage } from '../sleepiness/sleepiness.page';
import { RecordingPage } from '../recording/recording.page';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	today=new Date();
	public static num=1;
	username=undefined;
	loggedIn=false;
	overnightSleepDataArray=SleepService.AllOvernightData;
	sleepinessDataArr=SleepService.AllSleepinessData;
	allSleepiness=StanfordSleepinessData.ScaleValues;
	recent=this.allSleepData[this.allSleepData.length-1]
	bool=this.recent instanceof OvernightSleepData;
	constructor(public sleepService:SleepService, public modal:ModalController) {
		Storage.get({key: '0'}).then((user) => {
			console.log(user);
			if (user.value) {
				this.username=user.value;
				this.loggedIn=true;
			  }
		  })
	}
	ngOnInit() {
		this.clock();
		this.mostRecent()
		Storage.keys().then((data) => {
		  data.keys.sort((a, b)=> {
			return parseInt(a)-parseInt(b)
		  });
		  HomePage.num+=data.keys.length
		  data.keys.forEach(x => {
			Storage.get({key: x}).then((result) =>{
			if (x!='0' && result.value!='undefined'){
				var info = JSON.parse(result.value);
				if (info.type == "Overnight Sleep" ){
					var OvernightInfo = new OvernightSleepData(new Date(info.sleepStart), new Date(info.sleepEnd));
					this.allSleepData.push(OvernightInfo);
					this.overnightSleepDataArray.push(OvernightInfo);
					
				} else {
					var SleepInfo = new StanfordSleepinessData(info.loggedValue, new Date(info.loggedAt));
					this.allSleepData.push(SleepInfo);
					this.sleepinessDataArr.push(SleepInfo);
				}

			}
			})
			
		  });
		  
		});

	}

	public static reset() {
		HomePage.num=1;
	}

	logIn() {
		if (this.username) {
		  Storage.set({key: '0', value: this.username}).then(() => {
			this.loggedIn=true;
		  });
		}
		
	  }

	mostRecent() {
		setInterval(() => {
			if (SleepService.AllSleepData.length-1<0) {
				this.recent=SleepService.AllSleepData[0];
			} else {
				this.recent=SleepService.AllSleepData[SleepService.AllSleepData.length-1];
			}
			this.bool=this.recent instanceof OvernightSleepData;
		})
	}
	
	clock() {
		setInterval(() => {
		  this.today = new Date();
		})}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	async overnightSleep() {
		var loginOvernight=await this.modal.create({
			component: LoginOvernightPage,
			componentProps: {
			} 
		});
		loginOvernight.onWillDismiss().then((dataReturned) => {
			
			Storage.set({key:HomePage.num+'', value: JSON.stringify(dataReturned.data)});
		})
		HomePage.num++;
		
		loginOvernight.present()
	}

	async sleepiness() {
		var sleep=await this.modal.create({
			component:SleepinessPage
		});

		sleep.onWillDismiss().then((dataReturned) => {
			Storage.set({key:HomePage.num+'', value: JSON.stringify(dataReturned.data)});
		});
		HomePage.num++;
		sleep.present();
	}

	async record() {
		console.log(this.sleepinessDataArr)
		console.log(this.allSleepData)
		var records=await this.modal.create({
			component: RecordingPage
		});
		records.present();
	}

	dismiss() {
		Storage.remove({key:'0'}).then(() => {
			this.loggedIn = false;
		});
	}

}
