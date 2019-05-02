import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SettingsService {

  constructor(private http: HttpClientService) {

  }

  listReferalIndicators() {
    return Observable.create(observer => {
      this.http.getOpenSRP('get-indicators')
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  listReferalServices(): Observable<any> {
    return Observable.create(observer => {
      this.http.getOpenSRP('get-referral-services')
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  addReferalIndicators(data) {
    return Observable.create(observer => {
      this.http.postOpenSRP('add-referral-indicators', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error(`Some error occurred: ${error.statusText}`);
          });
    });
  }

  addReferalServices(data) {
    return Observable.create(observer => {
      this.http.postOpenSRP('add-referral-services', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });

    });
  }

  editReferalIndicators(data, id) {
    return Observable.create(observer => {
      this.http.postOpenSRP('edit-referral-services', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  editReferalServices(data, id) {
    return Observable.create(observer => {
      this.http.postOpenSRP('', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  deleteReferalIndicators(data, id) {
    return Observable.create(observer => {
      this.http.deleteOpenSRP('', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  deleteReferalServices(data, id) {
    return Observable.create(observer => {
      this.http.deleteOpenSRP('', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  listServiceIndicatorMerge() {
    return Observable.create(observer => {
      this.http.getOpenSRP('boresha-afya-services')
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  createServiceIndicatorMerge(data) {
    return Observable.create(observer => {
      this.http.postOpenSRP('add-referral-service-indicators', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  deleteServiceIndicatorMerge(id) {
    return Observable.create(observer => {
      this.http.deleteOpenSRP('', '')
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }


  drawChart(
    categories: string[],
    series: { name: string; data: any[] }[],
    yAxisLabel: string,
    title: string = '',
    subtitle: string = '',
    type: string = 'column'
  ) {
    return {
      credits: {
        enabled: false
      },
      chart: {
        type
      },
      events: {
        load(chart) {
          setTimeout(() => {
            chart.target.reflow();
          }, 0);
        }
      },
      title: {
        text: title
      },
      subtitle: {
        text: subtitle
      },
      xAxis: {
        categories,
        crosshair: true,
        labels: {
          rotation: -45,
          style: {
            fontSize: '10px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: yAxisLabel
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} ' +
          yAxisLabel +
          ' </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series
    };
  }

  drawPieChart(
    data: {name: string, y: number}[],
    title: string,
    tooltipLabel: string = '',
  ) {
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: title
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: tooltipLabel,
        colorByPoint: true,
        data
      }]
    };
  }

}
