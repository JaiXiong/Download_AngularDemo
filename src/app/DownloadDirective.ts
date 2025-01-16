import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Directive, OnDestroy, Input, ElementRef, HostListener, HostBinding } from "@angular/core";
import { Subject, takeUntil, map } from "rxjs";

@Directive({
    selector: '[appDownloadDirective]',
    standalone: true
})
export class DownloadDirective implements OnDestroy {
    @Input() _jobProfileId: string = '';
    //_jobProfileId: string = '';
    private destroy$: Subject<void> = new Subject<void>();
    _loading = false;

    constructor(private ref: ElementRef, private http: HttpClient) {}

    @HostListener('click')
    onClick(): void {
        if (this._loading) {
            return; // Prevent multiple clicks
          }

        this._loading = true;
        const token = 
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW4iLCJqdGkiOiJlZmQ3NzdkYS0wNDFmLTQ4MWItYjM5OC0xNmNhOTQxZjQyOGQiLCJleHAiOjE3MzcwNTQ0NzUsImlzcyI6IlRlc3QuY29tIiwiYXVkIjoiVGVzdEF1ZGllbmNlIn0.fwkvSNv26g1fQe2EfPSXEWOHs7DN1pXHfA2Xiiqlavk';
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http.get(`http://localhost:5001/api/JobTracker/downloadpdf/${this._jobProfileId}`, { headers, responseType: 'blob' })//{ responseType: 'blob' })
            .pipe(
                takeUntil(this.destroy$),
                map(response => new Blob([response], { type: 'application/pdf' })),
            )
            .subscribe((pdf: Blob) => {
              // this.ref.nativeElement.href = window.URL.createObjectURL(pdf);
              // this.ref.nativeElement.click();
              // this._loading = false;
              const url = window.URL.createObjectURL(pdf);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'download.pdf'; // You can set the file name here
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
              this._loading = false;
            },
              () => {
                this._loading = false;
              //};);
              });

    }
    
    // your loading custom class
    @HostBinding('class.btn-loading') get loading() {
        return this._loading;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}