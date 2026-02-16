import { Injectable } from '@angular/core';
import localforage from 'localforage';

@Injectable({ providedIn: 'root' })
export class MoviesPersistService {
  private key = 'movies-db';

  save(state: any) {
    return localforage.setItem(this.key, state);
  }

  load(): Promise<any | null> {
    return localforage.getItem(this.key);
  }
}
