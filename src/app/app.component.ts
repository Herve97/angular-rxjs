import { Component, OnInit } from '@angular/core';
import {
  Observable,
  Subscription,
  filter,
  from,
  interval,
  map,
  of,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // private subscriptions: Subscription[] = [];
  private subscriptions: Subscription = new Subscription();
  ngOnInit(): void {
    // const observer = {
    //   next: (item: unknown) => console.log(`Une boite arrive ${item}`),
    //   error: (err: unknown) => console.log(`oups il y a une erreur ${err}`),
    //   complete: () => console.log('Terminé...plus rien'),
    // };

    // const stream = new Observable((myObserver) => {
    //   myObserver.next('Boite 1');
    //   myObserver.next('Boite 2');
    //   myObserver.next('Boite 3');
    //   myObserver.complete();
    // });

    // stream.subscribe(observer);
    // const subscription: Subscription = stream.subscribe(
    //   (item) => console.log(`Une boite arrive ${item}`),
    //   (err) => console.log(`oups il y a une erreur ${err}`),
    //   () => console.log('Terminé...plus rien')
    // );

    // subscription.unsubscribe();

    // const double = (source: Observable<number>) =>
    //   new Observable<number>((subscriber) => {
    //     const subscription: Subscription = source.subscribe({
    //       next: (value: number) => subscriber.next(2 * value),
    //       error: (err: any) => subscriber.error(err),
    //       complete: () => subscriber.complete(),
    //     });

    //     return () => {
    //       subscription.unsubscribe();
    //     };
    //   });

    // of(1, 2, 3, 4).pipe(double, double).subscribe(console.log);

    // function multiplier(item: number): number {
    //   return 2 * item;
    // }

    from([0, 1, 2, undefined, 12, 13, 14, 15])
      .pipe(
        // tap((elem) => console.log('first tap: ', elem)),
        filter((elem) => elem !== 0 && elem !== undefined)
        // map((elem) => elem * 2),
        // take(2),
        // map((elem) => elem - 3),
        // tap((elem) => console.log('third tap: ', elem))
      )
      .subscribe(
        (item: number | undefined) => console.log(`ma valeur ${item}`),
        (err: unknown) => console.error(err),
        () => console.log('Terminé')
      );
  }

  public start(): void {
    this.subscriptions.add(
      interval(1000).subscribe(
        (value) => console.log('Ma valeur: ', value),
        (error) => console.log(error),
        () => console.log('Terminé')
      )
    );

    this.subscriptions.add(
      interval(1000).subscribe(
        (value) => console.warn('=== Ma valeur ===: ', value),
        (error) => console.error(error),
        () => console.warn('=== Terminé... ===')
      )
    );
  }

  public stop() {
    // this.subscriptions.forEach((elem) => elem.unsubscribe());
    this.subscriptions.unsubscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
