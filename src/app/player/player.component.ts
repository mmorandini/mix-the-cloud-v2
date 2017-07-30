import { Component, OnInit } from '@angular/core';
import {Song} from '../interfaces/Song';
import { HttpClient } from '@angular/common/http';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
// import 'rxjs/add/operator/map';

import { Constants } from '../app.constants';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
	query;
  	results;
  	constructor(private http: HttpClient) {}

  	ngOnInit() {
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
        console.log(result);
    	})
    }

   	handleResponse(res: any): any{
		var data = res;
		var result = [];
		if (data && data.collection) {
			data.collection.forEach(function(item) {
				var song: Song = <Song>{};
				song.streamUrl = item.stream_url;
				song.name = item.title;
				song.artist = item.user.username;
				song.provider = 1;
				song.idFromProvider = item.id;
				song.duration = item.duration;
				song.imageUrl = item.artwork_url;
				song.link = item.permalink_url;
				result.push(song);
			});
		}

		return result;
	}
}
