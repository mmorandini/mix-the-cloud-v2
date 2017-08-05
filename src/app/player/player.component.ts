import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
// import 'rxjs/add/operator/map';
import { Song } from '../interfaces/Song';
import { Constants } from '../app.constants';

declare const window;


@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})


export class PlayerComponent implements OnInit {
	results = [];
	player1;
  player2;
  playA = false;
  playB = false;
  // soundCloudPlayer1 = document.getElementById("player-1");
  // soundCloudPlayer2 = document.getElementById("player-2");

  constructor(private http: HttpClient) {}


  	ngOnInit() {
      // console.log(this.soundCloudPlayer2);
  	}

  	playPause(deck){
      if (deck == 1 ){
        if (this.playA == false){
          this.player1.play();
          this.playA = true;
        } else if (this.playA == true){
          this.player1.pause();
          this.playA = false;
        }
      } else if (deck == 2 ){
        if (this.playB == false){
          this.player2.play();
          this.playB = true;
        } else if (this.playB == true){
          this.player2.pause();
          this.playB = false;
        }
      }
    }

  	loadToDeck(deck, song){
      const id = song.idFromProvider;
      const uri = `https://api.soundcloud.com/tracks/${id}/stream?client_id=${Constants.API_KEY}`
      if (deck == 1){
        this.player1 = new Audio(uri);
      } else if (deck == 2){
        this.player2 = new Audio(uri);
      }
    }

  	searchSoundCloud(query: string) {
    	const maxResults = 100;
    	query = encodeURIComponent(query.replace(/ /gi, '+'));
    	const url = `https://api.soundcloud.com/tracks.json?client_id=${Constants.API_KEY}&q=${query}&limit=${maxResults}&linked_partitioning=1`;
    	this.http
    	.get(url)
    	.map(res => this.handleResponse(res))
    	.catch((error) => {
    		if (error.status === 500) {
            	return Observable.throw(new Error(error.status));
        	}
        	else if (error.status === 400) {
           		return Observable.throw(new Error(error.status));
        	}
        	else if (error.status === 409) {
            	return Observable.throw(new Error(error.status));
        	}
        	else if (error.status === 406) {
            	return Observable.throw(new Error(error.status));
        	}
    	})
    	.subscribe((result: any) => {
        this.results = result;
        // console.log(this.results);
    	})
    }

   	handleResponse(res: any): any{
		let data = res;
		let result = [];
    console.log(data);

		if (data && data.collection) {
			data.collection.forEach(function(item) {
				var song: Song = <Song>{};
				song.streamUrl = item.stream_url;
				song.title = item.title;
				song.artist = item.artist; /// Undefined -> the response does not have an artist property.
				song.provider = 1;
				song.idFromProvider = item.id;
				song.duration = item.duration;
				song.imageUrl = item.artwork_url;
				song.link = item.permalink_url;
				song.waveform_url = item.waveform_url;
				song.format = item.original_format;
				result.push(song);

			});
		}
      console.log(result);
		return result;

	}
}
