import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private http = inject(HttpClient);
  protected readonly title = signal<string>('Dating App');
  protected members = signal<any>([]);

  async ngOnInit() {
    /**this.http.get('https://localhost:5001/api/members').subscribe({
      next: response => this.members.set(response),
      error: error => console.log(error),
      complete: () => console.log('Request complete')

    })*/
    this.members.set(await this.getMembers())
  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'))
    }
    catch (error) {
      console.log(error)
      throw error
    }

  }

}
